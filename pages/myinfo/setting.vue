<template>
	<view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="账号安全" :arrow="true" arrow-direction="right" @click="goAccount()"></u-cell-item>
				<u-cell-item title="外观" :arrow="true" arrow-direction="right" @click="goTheme()"></u-cell-item>
				<u-select v-model="LanguageSelector" :list="list"></u-select>
				<u-cell-item title="语言" :arrow="true" arrow-direction="right"
					@click="LanguageSelector = true"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				LanguageSelector: false,
				list: [{
						value: '1',
						label: '简体中文'
					},
					{
						value: '2',
						label: '繁體中文'
					},
					{
						value: '3',
						label: 'English'
					},
				],

			}
		},
		methods: {
			goAccount() {
				uni.navigateTo({
					url: 'account'
				})
			},
			goTheme() {
				uni.navigateTo({
					url: 'theme'
				})
			},
		}
	}
</script>

<style>

</style>