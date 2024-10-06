<template>
	<view>
		<!-- 根据if的判断显示不同的界⾯ -->
		<view v-if="logined">
			<u-navbar :is-back="false" title=" " :border-bottom="false">
				<view class="u-flex u-row-right" style="width: 100%;">
					<view class="camera u-flex u-row-center">
						<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
					</view>
				</view>
			</u-navbar>
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-10">
				<view class="u-m-r-10">
					<u-avatar :src="pic" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<!-- 标签内使用变量 -->
					<view class="u-font-18 u-p-b-20">{{yonghu.xingming}}</view>
					<view class="u-font-14 u-tips-color">微信号:{{yonghu.xingming}}2024</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="scan" color="#969799" size="28"></u-icon>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28" @click="goRevise(yonghu.id)"></u-icon>
				</view>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="rmb-circle" title="付款"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="star" title="收藏"></u-cell-item>
					<u-cell-item icon="photo" title="相册"></u-cell-item>
					<u-cell-item icon="coupon" title="卡券"></u-cell-item>
					<u-cell-item icon="heart" title="关注"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="setting" title="设置"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<!-- 图标集https://www.uviewui.com/components/icon.html -->
					<u-cell-item icon="arrow-left-double" title="退出" @click="quit()"></u-cell-item>
				</u-cell-group>
			</view>
		</view>

		<!-- else处理,如果没有登录那么我不显示具体的微信跟相关信息 -->
		<view v-else>
			<u-navbar :is-back="false" title=" " :border-bottom="false">
				<view class="u-flex u-row-right" style="width: 100%;">
					<view class="camera u-flex u-row-center">
						<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
					</view>
				</view>
			</u-navbar>
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
				<view class="u-m-r-10">
					<u-avatar :src="pic" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">游客</view>
					<view class="u-font-14 u-tips-color">请登录</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<!-- alt+鼠标左键换颜色 -->
					<u-icon name="scan" color="#969799" size="28"></u-icon>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>

			<view class="u-m-t-20">
				<u-cell-group>
					<!-- 图标集https://www.uviewui.com/components/icon.html -->
					<u-cell-item icon="man-add" title="登录" @click="goLogin()"></u-cell-item>
				</u-cell-group>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				logined:false
			}
		},
		onLoad() {},
		onShow() {
			console.log("我的信息页面展示了")
			//userinfo有值说明登陆了
			const value = uni.getStorageSync("userinfo")
			console.log(value)
			if (value) {
				//有值，说明登录
				console.log("登录状态")
				//更新用户值
				this.yonghu = value
				this.logined = false
				this.logined = true
			} else {
				this.logined = false
			}
		},
		methods: {
			// 跳转
			//封装：定义一个方法来执行一段代码
			/*
			 *方法名(参数){代码}
			 */
			goLogin() {
				uni.navigateTo({
					url: 'login'
				})
			},
			quit() {
				//退出清值
				uni.setStorageSync("userinfo", "")
				//切换页面
				this.logined = false
			},
			goRevise(yhid) {	//需要传入id参数便于修改对应id的用户信息
				uni.navigateTo({
					url: `revise?id=${yhid}`//用${}来传递后端所需要的参数,注意url用`括起,注意是=，若==会被识别为string
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>