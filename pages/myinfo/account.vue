<template>
	<view>
		<u-cell-group>
			<u-cell-item title="忘记登录密码" @click="gochpass()"></u-cell-item>
			<u-cell-item title="修改登录密码" @click="goforpass()"></u-cell-item>
			<u-cell-item title="更换手机号" @click="gochphone()"></u-cell-item>
			<u-cell-item title="更换邮箱"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gochpass() {
				uni.navigateTo({
					url: 'changePassword'
				})
			},
			goforpass() {
				uni.navigateTo({
					url: 'forgotPassword'
				})
			},
			gochphone() {
				uni.navigateTo({
					url: 'changePhone'
				})
			},
		}
	}
</script>

<style>

</style>
