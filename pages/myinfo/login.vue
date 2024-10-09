<template>
	<view>
		<u-form :model="user" ref="uForm">
			<u-form-item left-icon="account" label-width="120" label="账号" prop="name">
				<u-input placeholder="请输入账号" v-model="user.zhanghao" type="text"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item left-icon="lock" label-width="120" label="密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="user.mima" placeholder="请输入密码"></u-input>
			</u-form-item>
			<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch vmodel="model.remember"></u-switch>，将会左对⻬ -->
			<u-form-item label="记住密码" prop="remember" label-width="150">
				<u-switch v-model="user.remember" slot="right"></u-switch>
			</u-form-item>
		</u-form>
		<u-button @click="submit()">登录</u-button>
		<u-button @click="goRegister()">注册</u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 变量定义
				user: {}
			}
		},
		onLoad() {

		},
		onShow() {
			
		},
		methods: {
			submit() {
				console.log("提交成功"),
					console.log(this.user),
					// 发送请求给服务器
					uni.request({
						url: "/api/users/login",
						data: this.user,
						method: "POST", //与服务器代码保持一致
						success: (res) => {
							//输出结果
							console.log(res.data.code)
							console.log(res.data.result)
							if (response.data.code === 1) {
								//登陆成功
								//存信息加回退
								console.log("登录回退test")
								uni.setStorageSync("userinfo", res.data.result),
								uni.navigateBack()
							} else {
								//登陆失败
								this.$u.toast("登陆失败")
							}
						}
					})
			},
			goRegister() {
				uni.navigateTo({
					url: 'register'
				});
			}
		}
	}
</script>
<style>
	.u-demo-area {
		cursor: pointer;
	}
</style>