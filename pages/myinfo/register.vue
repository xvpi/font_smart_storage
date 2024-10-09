<template>
	<view class="wrap">
		<u-form :model="user" ref="uForm">
			<u-form-item label-width="150" label="昵称" prop="xingming">
				<u-input placeholder="请输入昵称" v-model="users.xingming" type="text"></u-input>
			</u-form-item>
			<!-- 写用户栏 -->
			<u-form-item label-width="150" label="账号" prop="zhanghao">
				<u-input type="text" v-model="users.username" placeholder="请输入账号"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="users.mima" placeholder="请输入密码"></u-input>
			</u-form-item>
			<!-- 写密码栏 -->
			<u-form-item label-width="150" label="确认密码" prop="Tpassword">
				<u-input :password-icon="true" type="password" v-model="users.rmima" placeholder="请再次确认密码"></u-input>
			</u-form-item>
			<!-- 手机号 -->
			<u-form-item label-width="130" label-position="left" label="电话" prop="phone">
				<u-input :border="border" placeholder="请输入电话号码" v-model="users.phone" type="text"></u-input>
			</u-form-item>
			<view class="form-container">
			<u-form-item label-width="0" label-position="left" class="verification-form-item">
				<u-input :border="border" placeholder="请输入验证码" v-model="users.captcha" type="text"
					class="verification-input"></u-input>
				<u-button type="primary" @click="getVerificationCode" class="get-code-button">获取验证码</u-button>
			</u-form-item>
			    <!-- <view class="wrap1">
			      <u-toast ref="uToast"></u-toast>
			      <u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
			      @change="codeChange"></u-verification-code>
			      <u-button @tap="getCode">{{tips}}</u-button>
			    </view> -->
			  </view>
			<u-button @click="submit()">提交</u-button>
		</u-form>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 变量定义
				border: true,
				users: {
					xingming: '',
					username: '',
					mima: '',
					rmima: '',
					phone: "",
					captcha: "",
				}
			}
		},
		methods: {
			submit() {
				if (this.users.mima != this.users.rmima) {
					this.$u.toast("两次输入密码不同")
					return
				}
				console.log("密码检验通过，提交注册信息")
				//如果成功，返回
				uni.request({
					url: "/api/users",
					data: this.users,
					method: "POST", //与服务器代码保持一致
					success: (res) => {
						//输出结果
						console.log(res.data.code)
						if (response.data.code === 1) {
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