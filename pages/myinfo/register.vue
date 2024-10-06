<template>
	<!-- 网页内容 -->
	<view class="wrap">
		<!-- 写一个表单form 可复制一个components用于代码提示-->
		<u-form :model="user" ref="uForm">
			<!-- 写item -->
			<!-- 写姓名 -->
			<u-form-item label-width="150" label="昵称" prop="xingming">
				<u-input placeholder="请输入昵称" v-model="user.xingming" type="text"></u-input>
			</u-form-item>
			<!-- 写用户栏 -->
			<u-form-item label-width="150" label="用户名" prop="zhanghao">
				<u-input type="text" v-model="user.zhanghao" placeholder="请输入用户名"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="user.mima" placeholder="请输⼊密码"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="确认密码" prop="Tpassword">
				<u-input :password-icon="true" type="password" v-model="user.rmima" placeholder="请再次确认密码"></u-input>
			</u-form-item>
			<!-- <u-form-item label-width="150" label="年龄" prop="age">
				<u-input type="number" v-model="user.age" placeholder="请输入年龄"></u-input>
			</u-form-item> -->
			<!-- <u-form-item label-width="140" label-position="left" label="用户类别" prop="leibie">
				<u-radio-group v-model="user.leibie" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.val"
						:disabled="item.disabled">
						{{item.txt}}
					</u-radio>
				</u-radio-group>
			</u-form-item> -->
			<u-button @click="submit()">提交</u-button>
			<!-- <u-link :href="href">帮助文档</u-link> -->
			<!-- 前面加冒号，说明填写的是变量 -->
		</u-form>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 变量定义
				border: true,
				href: "http://www.uviewui.com",
				user: {
					id:'',
					xingming: '',
					zhanghao: '',
					mima: '',
					rmima: '',
					age: ''
				},
				list: [{
						val: '1',
						txt: "超级⽤户",
						disabled: false
					},
					{
						val: '2',
						txt: "普通⽤户",
						disabled: false
					},
					{
						val: '3',
						txt: "电影推介",
						disabled: false
					}
				]
			}
		},
		methods: {
			submit() {
				if (this.user.mima != this.user.rmima) {
					this.$u.toast("两次输入密码不同")
					return
				}
				console.log("密码检验通过，提交注册信息")
				//如果成功，返回
				uni.request({
					url: "http://localhost:8090/doRegister",
					data: this.user,
					method: "POST", //与服务器代码保持一致
					success: (res) => {
						//输出结果
						console.log(res.data.code)
						if (res.data.code * 1 == 200) {
							//登陆成功
							//存信息加回退
							console.log("注册回退test"),
								uni.navigateBack()
						} else {
							//登陆失败
							this.$u.toast("注册失败，请更换用户名尝试")
						}
					}
				});
			},
			radioChange(e) {
				console.log(e, "radio", this.user.leibie)
			},
			radioGroupChange(e) {
				console.log(e, "group", this.user.leibie)
			}
		}
	}
</script>
<style>
	.u-demo-area {
		cursor: pointer;
	}
</style>