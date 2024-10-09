<template>

	<div>
		 <view>
		      <u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="changeTab"></u-tabs>
		    </view>
		
		    <div v-if="currentTab === 0" class="suggestions-container">
		      <div class="suggestion-card" v-for="(suggestion, index) in storageSuggestions" :key="index">
		        <h3>{{ suggestion.title }}</h3>
		        <p>{{ suggestion.content }}</p>
		      </div>
		    </div>
		
		    <div v-else-if="currentTab === 1" class="chat-container">
		      <div class="chat-window">
		        <div class="messages" v-for="(msg, index) in chatHistory" :key="index">
		          <div v-if="msg.role === 'user'" class="message user">
		            <span>{{ msg.content }}</span>
		            <img src="../../static/icon/user-avatar.png" alt="User Avatar" class="avatar user-avatar">
		          </div>
		          <div v-if="msg.role === 'assistant'" class="message assistant">
		            <img src="../../static/icon/assistant-avatar.png" alt="Assistant Avatar" class="avatar assistant-avatar">
		            <span>{{ msg.content }}</span>
		          </div>
		        </div>
		      </div>
		      <div class="input-area">
		        <div class="input-wrapper">
		          <div class="left-icon"></div>
		          <input v-model="inputText" class="input" placeholder="请输入你的问题..." />
		        </div>
		        <button @click="sendToSpark" class="send-button">发送</button>
		      </div>
		    </div>
		  </div>
</template>



<script>
	import * as base64 from "base-64";
	import CryptoJS from '../../static/crypto-js/crypto-js.js';
	import parser from '../../static/fast-xml-parser/src/parser';
	import * as utf8 from "utf8";
	import URL from 'url';


  

	export default {
		data() {
			return {
				inputText: '',
				httpUrl: "https://spark-api.xf-yun.com/v4.0/chat",
				modelDomain: '4.0Ultra',
				APPID: '1575c1ba',
				APISecret: 'YzMxY2Y1OGFmZjI2OWNiYTE1ZjIwMGE4',
				APIKey: '432ff6a9c11bf7e8ba524ebecce32ba1',
				sparkResult: '',
				socket: null,
				tempRes: '',
				chatHistory: [],
				defaultAssistantMessage: "欢迎咨询收纳问题！",
				 tabList: [
				        { name: '收纳建议' },
				        { name: '智能问答' }
				      ],
				 currentTab: 0,
				 storageSuggestions: [
				         { title: '如何有效利用空间', content: '使用墙面架子可以增加储物空间...' },
				         { title: '收纳箱的选择', content: '选择透明的收纳箱能方便你查看里面的物品...' },
				         // 更多收纳建议
				       ]
			}
		},
		mounted() {
		  // 添加默认助手消息
		  this.chatHistory.push({
		    role: "assistant",
		    content: this.defaultAssistantMessage
		  });
		},
		methods: {
			changeTab(index) {
			      this.currentTab = index;
			    },
			async sendToSpark() {
				let myUrl = await this.getWebSocketUrl();
				this.tempRes = "";
				let realThis = this;
				this.socketTask = uni.connectSocket({
					url: myUrl,
					method: 'GET',
					success: res => {
						realThis.wsLiveFlag = true;
					}
				});
				realThis.socketTask.onError((res) => {
					console.log("连接发生错误，请检查appid是否填写", res);
				});
				realThis.socketTask.onOpen((res) => {
					this.chatHistory.push({
						"role": "user",
						"content": this.inputText
					});
					let params = {
						"header": {
							"app_id": this.APPID,
							"uid": "1575c1ba"
						},
						"parameter": {
							"chat": {
								"domain": this.modelDomain,
								"temperature": 0.5,
								"max_tokens": 1024
							}
						},
						"payload": {
							"message": {
								"text": this.chatHistory
							}
						}
					};
					realThis.socketTask.send({
						data: JSON.stringify(params),
						success() {
							console.log('第一帧发送成功');
							realThis.inputText = ''; // 这里清空输入框的内容
						}
					});
				});
				realThis.socketTask.onMessage((res) => {
					let obj = JSON.parse(res.data);
					let dataArray = obj.payload.choices.text;
					for (let i = 0; i < dataArray.length; i++) {
						realThis.sparkResult = realThis.sparkResult + dataArray[i].content;
						realThis.tempRes = realThis.tempRes + dataArray[i].content;
					}
					let temp = JSON.parse(res.data);
					if (temp.header.code !== 0) {
						realThis.socketTask.close({
							success(res) {
								realThis.wsLiveFlag = false;
							},
							fail(err) {
								console.log('关闭失败', err);
							}
						});
					}
					if (temp.header.code === 0) {
						if (res.data && temp.header.status === 2) {
							this.chatHistory.push({
								"role": "assistant",
								"content": this.tempRes
							});
							setTimeout(() => {
								realThis.socketTask.close({
									success(res) {
										console.log('关闭成功', res);
									}
								});
							}, 1000);
						}
					}
				});
			},
			getWebSocketUrl() {
				var httpUrlHost = (this.httpUrl).substring(8, 28);
				var httpUrlPath = (this.httpUrl).substring(28);
				switch (httpUrlPath) {
					case "/v1.1/chat":
						this.modelDomain = "general";
						break;
					case "/v2.1/chat":
						this.modelDomain = "generalv2";
						break;
					case "/v3.1/chat":
						this.modelDomain = "generalv3";
						break;
					case "/v3.5/chat":
						this.modelDomain = "generalv3.5";
						break;
					case "/v4.0/chat":
						this.modelDomain = "4.0Ultra";
						break;
				}
				return new Promise((resolve) => {
					var url = "wss://" + httpUrlHost + httpUrlPath;
					var host = "spark-api.xf-yun.com";
					var apiKeyName = "api_key";
					var date = new Date().toGMTString();
					var algorithm = "hmac-sha256";
					var headers = "host date request-line";
					var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrlPath} HTTP/1.1`;
					var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.APISecret);
					var signature = CryptoJS.enc.Base64.stringify(signatureSha);
					var authorizationOrigin =
						`${apiKeyName}="${this.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
					var authorization = base64.encode(authorizationOrigin);
					url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;
					resolve(url);
				});
			
			}
		}
	};
	

</script>


<style>
	.suggestions-container {
	  padding: 20px;
	}
	
	.suggestion-card {
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  padding: 15px;
	  margin-bottom: 15px;
	  background-color: #f9f9f9;
	}
	
	.chat-container {
	  display: flex;
	  flex-direction: column;
	  height: 93vh;
	  width: 100%;
	  max-width: 600px;
	  margin: 0 auto;
	  border: 1px solid #ccc;
	  border-radius: 10px;
	  overflow: hidden;
	}
	
	.chat-window {
	  flex: 1;
	  padding: 10px;
	  overflow-y: auto;
	  background-color: #f9f9f9;
	}
	
	.messages {
	  display: flex;
	  flex-direction: column;
	  margin-bottom: 10px;
	}
	
	.message {
	  display: flex;
	  align-items: center;
	  max-width: 70%;
	  padding: 10px;
	  border-radius: 10px;
	  margin-bottom: 10px;
	  word-wrap: break-word;
	}
	
	.user {
	  align-self: flex-end;
	  background-color: #dcf8c6;
	}
	
	.assistant {
	  align-self: flex-start;
	  background-color: #fff;
	  border: 1px solid #ccc;
	}
	
	.avatar {
	  width: 32px;
	  height: 32px;
	  border-radius: 50%;
	  margin-right: 8px;
	}
	
	.input-area {
	  display: flex;
	  padding: 10px;
	  border-top: 1px solid #ccc;
	  background-color: #fff;
	}
	
	.send-button {
	  padding: 10px 20px;
	  background-color: blue;
	  color: white;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	  height: 40px;
	  width: 80px;
	}
	
	.input-wrapper {
	  position: relative;
	  display: inline-block;
	  width: 100%;
	}
	
	.left-icon {
	  position: absolute;
	  left: 10px;
	  top: 50%;
	  transform: translateY(-50%);
	  width: 30px;
	  height: 30px;
	  background-image: url('../../static/icon/shurukuang.png');
	  background-size: cover;
	}
	
	.input {
	  padding-left: 42px;
	  width: 100%;
	  height: 40px;
	  font-size: 16px;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  box-sizing: border-box;
	}
	</style>
