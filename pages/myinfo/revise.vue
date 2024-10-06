<template>
	<!-- 网页内容 -->
	<view class="wrap">
		<!-- 写一个表单form 可复制一个components用于代码提示-->
		<u-form :model="user" ref="uForm">
			<!-- 写item -->
			<!-- 写姓名 -->
			<u-form-item label-width="150" label="姓名" prop="xingming">
				<u-input placeholder="请输入姓名" v-model="user.xingming" type="text"></u-input>
			</u-form-item>
			<!-- 写用户栏 -->
			<u-form-item label-width="150" label="用户名" prop="zhanghao">
				<u-input type="text" v-model="user.zhanghao" placeholder="请输入账号"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="原密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="user.mima" placeholder="请输入密码"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="新密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="user.xmima" placeholder="请输⼊新密码"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="确认密码" prop="Tpassword">
				<u-input :password-icon="true" type="password" v-model="user.rxmima" placeholder="请再次确认密码"></u-input>
			</u-form-item>
			<u-form-item label-width="150" label="年龄" prop="age">
				<u-input type="number" v-model="user.age" placeholder="请输入年龄"></u-input>
			</u-form-item>
			<u-form-item label-width="140" label-position="left" label="用户类别" prop="leibie">
				<u-radio-group v-model="user.leibie" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.val"
						:disabled="item.disabled">
						{{item.txt}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-button @click="submit()">确认修改</u-button>
			<u-link :href="href">帮助文档</u-link>
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
				user: {},
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
		onLoad(canshu){
			//onload可以用户接收传过来的参数
			console.log('接收到的用户id：',canshu)
			//通过id，请求得到对应用户的全部信息，而不是在uniapp端用storage存储
			uni.request({
				url: `http://localhost:8090/queryYongHuById?id=${canshu.id}`,	//用${}来传递后端所需要的参数,注意url用`括起
				success: (res) =>{
					console.log('信息码：',res.data.code)
					if (res.data.code == 200) {
						//查询成功
						//存信息
						console.log(res.data)
						this.user=res.data.result;
					} else {
						//查找失败
						this.$u.toast("查找id对应用户信息失败")
					}
				}
			})

		},
		methods: {
			submit() {
				if (this.user.xmima != this.user.rxmima) {
					this.$u.toast("两次输入密码不同")
					return
				}
				this.user.mima=this.user.xmima;	//不加此句，密码不会对应更新
				console.log("密码检验通过，可以进行修改")
				//如果成功，返回
				uni.request({
					url: "http://localhost:8090/updateyonghu",
					data: this.user,
					method: "POST", //与服务器代码保持一致
					success: (res) => {
						//输出结果
						console.log(res.data.code)
						if (res.data.code * 1 == 200) {
							console.log(res.data.result)	
							uni.setStorageSync("userinfo", res.data.result)
							//存信息加回退
							console.log("修改完成，回退test")
								uni.navigateBack()
						} else {
							//登陆失败
							this.$u.toast("修改失败")
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