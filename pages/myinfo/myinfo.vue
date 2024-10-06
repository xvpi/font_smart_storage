<template>
	<view>
		<!-- 根据if的判断显示不同的界面 -->
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
					<u-avatar :src="pic" size="140" @click="goSelectheadpic()"></u-avatar>
				</view>
				<view class="u-flex-1">
					<!-- 标签内使用变量 -->
					<view class="u-font-18 u-p-b-20" @click="openModal">111</view>
					<u-modal v-model="showModal" :show-title="true" title="请输入新的昵称" :show-confirm-button="true"
						:show-cancel-button="true" @confirm="handleConfirm" @cancel="handleCancel">
						<template #title>
							<div>请输入新昵称</div>
						</template>
						<template #default>
							<div style="width: 100px; height: 10px; margin: 20px auto;">  
							    <input v-model="newUsername" type="text" />  
							</div>
						</template>
						<template #footer>
							<div>
								<button @click="confirmModal">确认</button>
								<button @click="cancelModal">取消</button>
							</div>
						</template>
					</u-modal>
					<view class="u-font-14 u-tips-color">帐号:1112024</view>
				</view>
				<!-- <view class="u-m-l-10 u-p-10">
					<u-icon name="scan" color="#969799" size="28"></u-icon>
				</view> -->
				<!-- <view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28" @click="goRevise(yonghu.id)"></u-icon>
				</view> -->
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="home" title="家庭成员" @click="goFamily()"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="setting" title="设置" @click="goSetting()"></u-cell-item>
					<u-cell-item icon="order" title="问题反馈" @click="goQuestion()"></u-cell-item>
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
				show: false,
				logined: false,
				showModal: false,
				inputValue: '',
				newUsername: '',
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
				this.logined = true
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
			goSetting() {
				uni.navigateTo({
					url: 'setting'
				})
			},
			goQuestion() {
				uni.navigateTo({
					url: 'question'
				})
			},
			goSelectheadpic() {
				uni.navigateTo({
					url: 'selectheadpic'
				})
			},
			goFamily() {
				uni.navigateTo({
					url: 'family'
				})
			},
			openModal() {
				this.showModal = true;
			},
			handleConfirm() {
				// 处理确认逻辑  
				console.log('确认按钮被点击', this.inputValue);
				this.showModal = false;
			},
			handleCancel() {
				// 处理取消逻辑  
				console.log('取消按钮被点击');
				this.showModal = false;
			},
			confirmModal() {
				// this.handleConfirm();
				// 发送请求到后端更新昵称  
				axios.put('/api/user', {
						username: this.newUsername,
						// 如果需要，还可以包含其他标识符，如用户ID  
						// userId: this.userId // 假设您已经有一个用户ID变量  
					})
					.then(response => {
						// 处理成功响应  
						console.log('昵称更新成功:', response.data);
						// 可以关闭模态框或进行其他UI更新  
					})
					.catch(error => {
						// 处理错误响应  
						console.error('昵称更新失败:', error);
						// 可以显示错误消息或进行其他错误处理  
					});
			},
			cancelModal() {
				this.handleCancel();
			},
			quit() {
				//退出清值
				uni.setStorageSync("userinfo", "")
				//切换页面
				this.logined = false
			},
			goRevise(yhid) { //需要传入id参数便于修改对应id的用户信息
				uni.navigateTo({
					url: `revise?id=${yhid}` //用${}来传递后端所需要的参数,注意url用`括起,注意是=，若==会被识别为string
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