<template>
	<view>
		<view>
			<u-collapse>
				<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
					{{item.body}}
				</u-collapse-item>
			</u-collapse>
		</view>
		<br />
		<view>
			<p style="font-size: 10px;">解决不了的问题？/给我们的建议</p>
			<div class="input-container">
				<u-input v-model="value" :type="type" :border="border"
					style="width: 90%; height: 80px; font-size: 16px; margin: 0 auto;" />
			</div>
			<u-button type="primary" style="width: 15%; height: 40px; font-size: 20px;">提交</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true,
				itemList: [{
					head: "怎么修改密码",
					body: "设置->账号安全",
					open: true,
					disabled: true
				}, {
					head: "我更换不了物品的位置",
					body: "xxx",
					open: false,
				}],
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>