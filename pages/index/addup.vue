<template>
	<view class="container">
		<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="changeTab"></u-tabs>

		<view v-if="currentTab === 0">
			<u-form :model="item" ref="itemForm" :label-width="160">
				<u-form-item label="长度" prop="length" left-icon="list">
					<u-input v-model="item.length" placeholder="请输入长度" type="number" />
				</u-form-item>
				<u-form-item label="宽度" prop="width" left-icon="list">
					<u-input v-model="item.width" placeholder="请输入宽度" type="number" />
				</u-form-item>
				<u-form-item label="高度" prop="height" left-icon="list">
					<u-input v-model="item.height" placeholder="请输入高度" type="number" />
				</u-form-item>
				<u-form-item label="位置 X" prop="position_x" left-icon="grid">
					<u-input v-model="item.position_x" placeholder="请输入位置 X" type="number" />
				</u-form-item>
				<u-form-item label="位置 Y" prop="position_y" left-icon="grid">
					<u-input v-model="item.position_y" placeholder="请输入位置 Y" type="number" />
				</u-form-item>
				<u-form-item label="位置 Z" prop="position_z" left-icon="grid">
					<u-input v-model="item.position_z" placeholder="请输入位置 Z" type="number" />
				</u-form-item>
				<u-form-item label="数量" prop="quantity" left-icon="order">
					<u-input v-model="item.quantity" placeholder="请输入数量" type="number" />
				</u-form-item>
				<u-form-item label="选择形状" prop="shape_id" left-icon="edit-pen">
					<u-input v-model="shape_name" type="select" @click="showShapePicker=true" placeholder="请选择形状" />
					<u-action-sheet :list="shapeOptions" v-model="showShapePicker" @click="selectShape" />
				</u-form-item>
				<u-form-item label="阈值" prop="threshold" left-icon="bell">
					<u-input v-model="item.threshold" placeholder="请输入阈值" type="number" />
				</u-form-item>
				<u-form-item label="容器 ID" prop="container_id" left-icon="shopping-cart-fill">
					<u-input v-model="item.container_id" placeholder="请输入容器 ID" type="number" />
				</u-form-item>
				<u-form-item label="特征" prop="feature" left-icon="star">
					<u-input v-model="newFeature" placeholder="请输入特征内容" />
					<u-button @click.prevent="addFeature" type="primary" size="mini">添加特征</u-button>
				</u-form-item>
				
			</u-form>
			<view class="feature-section">
				<text>已添加特征:</text>
				<view class="feature-list">
					<u-tag
						v-for="(feature, index) in item.feature"
						:key="feature.id"
						type="info"
						class="feature-tag"
					>
						{{ feature.feature ? (feature.feature.length > 5 ? feature.feature.substring(0, 5) + '...' : feature.feature) : '无内容' }}
						<u-icon name="minus" class="remove-icon" @click.prevent="removeFeature(feature.id, index)" />
					</u-tag>
				</view>
				<u-button @click="addItem" type="primary">添加物品</u-button>
			</view>

		</view>

		<view v-else-if="currentTab === 1">
			<u-form :model="container" ref="containerForm" :label-width="160">
				<u-form-item label="位置 X" prop="position_x" left-icon="grid">
					<u-input v-model="container.position_x" placeholder="请输入位置 X" type="number" />
				</u-form-item>
				<u-form-item label="位置 Y" prop="position_y" left-icon="grid">
					<u-input v-model="container.position_y" placeholder="请输入位置 Y" type="number" />
				</u-form-item>
				<u-form-item label="位置 Z" prop="position_z" left-icon="grid">
					<u-input v-model="container.position_z" placeholder="请输入位置 Z" type="number" />
				</u-form-item>
				<u-form-item label="长度" prop="length" left-icon="list">
					<u-input v-model="container.length" placeholder="请输入长度" type="number" />
				</u-form-item>
				<u-form-item label="宽度" prop="width" left-icon="list">
					<u-input v-model="container.width" placeholder="请输入宽度" type="number" />
				</u-form-item>
				<u-form-item label="高度" prop="height" left-icon="list">
					<u-input v-model="container.height" placeholder="请输入高度" type="number" />
				</u-form-item>
				<u-form-item label="房间 ID" prop="room_id" left-icon="home">
					<u-input v-model="container.room_id" placeholder="请输入房间 ID" type="number" />
				</u-form-item>
				<u-form-item label="父级 ID" prop="parent_id" left-icon="home">
					<u-input v-model="container.parent_id" placeholder="请输入父级 ID" type="number" />
				</u-form-item>
				
				<!-- 特征部分 -->
				<u-form-item label="柜子特征">
					<u-input v-model="newContainerFeature" placeholder="请输入特征内容" />
					<u-button @click.prevent="addContainerFeature" type="primary" size="mini">添加特征</u-button>
					
				</u-form-item>
				<view class="feature-list">
					<u-tag
						v-for="(feature, index) in containerFeatures"
						:key="index"
						type="info"
						class="feature-tag"
					>
						{{ feature.feature ? (feature.feature.length > 5 ? feature.feature.substring(0, 5) + '...' : feature.feature) : '无内容' }}
						<u-icon name="minus" class="remove-icon" @click.prevent="removeContainerFeature(index)" />
					</u-tag>
				</view>
		
				<u-button @click="addContainer" type="primary">添加柜子</u-button>
			</u-form>
		</view>


		<view v-else-if="currentTab === 2">
			<u-form :model="room" ref="roomForm" :label-width="160">
				<u-form-item label="房间名称" prop="name" left-icon="home">
					<u-input v-model="room.name" placeholder="请输入房间名称" />
				</u-form-item>
				<u-form-item label="长度" prop="length" left-icon="list">
					<u-input v-model="room.length" placeholder="请输入房间长度" type="number" />
				</u-form-item>
				<u-form-item label="宽度" prop="width" left-icon="list">
					<u-input v-model="room.width" placeholder="请输入房间宽度" type="number" />
				</u-form-item>
				<u-form-item label="高度" prop="height" left-icon="list">
					<u-input v-model="room.height" placeholder="请输入房间高度" type="number" />
				</u-form-item>
				<u-button @click="addRoom" type="primary">添加房间</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				tabList: [
					{ name: '创建物品' },
					{ name: '创建柜子' },
					{ name: '创建房间' },
				],
				item: {
					length: null,
					width: null,
					height: null,
					position_x: null,
					position_y: null,
					position_z: null,
					quantity: null,
					shape_id: null,
					threshold: null,
					container_id: null,
					feature: []
				},
				container: {
					position_x: null,
					position_y: null,
					position_z: null,
					length: null,
					width: null,
					height: null,
					room_id: null,
					parent_id: null,
					container_type_id:null,
					container_feature: []
				},
				room: {
					name: '',
					length: 6000,
					width: 6000,
					height: 4000,
				},
				newFeature: '',
				newContainerFeature: '', // 新增特征输入
				message: '',
				showShapePicker: false,
				shapeOptions: [],
				shape_name: '',
				containerFeatures: [] // 独立管理柜子特征
			};
		},
		methods: {
			changeTab(index) {
				this.currentTab = index; // 更新当前选中的标签索引
			},
			fetchShapes() {
				uni.request({
					url: '/api/item_shapes',
					method: 'GET',
					success: (res) => {
						const result = res.data;
						if (result.code === 1) {
							this.shapeOptions = result.data.map(shape => ({
								text: shape.name
							}));
						} else {
							this.message = result.message;
						}
					},
					fail: (error) => {
						this.message = '获取形状信息失败';
					}
				});
			},
			selectShape(index) {
				this.shape_name = this.shapeOptions[index].text;
				this.item.shape_id = index + 1; 
				this.showShapePicker = false; 
			},
			addFeature() {
				if (this.newFeature) {
					this.item.feature.push({ id: Date.now(), feature: this.newFeature });
					this.newFeature = ''; // 清空输入框
				}
			},
			removeFeature(id, index) {
				this.item.feature.splice(index, 1);
			},
			addContainerFeature() {
				this.containerFeatures.push({ id: null }); // 添加新特征
			},
			removeContainerFeature(index) {
				this.containerFeatures.splice(index, 1); // 删除特征
			},
			addItem() {
				uni.request({
					url: '/api/items',
					method: 'POST',
					data: this.item,
					success: (res) => {
						if (res.data.code === 1) {
							uni.showToast({ title: '物品添加成功', icon: 'success' });
							this.resetItem();
						} else {
							uni.showToast({ title: res.data.message, icon: 'none' });
						}
					},
					fail: () => {
						uni.showToast({ title: '添加物品失败', icon: 'none' });
					}
				});
			},
			addContainer() {
				this.container.container_feature = this.containerFeatures;
				uni.request({
					url: '/api/containers',
					method: 'POST',
					data: this.container,
					success: (res) => {
						if (res.data.code === 1) {
							uni.showToast({ title: '柜子添加成功', icon: 'success' });
							this.resetContainer();
						} else {
							uni.showToast({ title: res.data.message, icon: 'none' });
						}
					},
					fail: () => {
						uni.showToast({ title: '添加柜子失败', icon: 'none' });
					}
				});
			},
			addRoom() {
				uni.request({
					url: '/api/rooms',
					method: 'POST',
					data: this.room,
					success: (res) => {
						if (res.data.code === 1) {
							uni.showToast({ title: '房间添加成功', icon: 'success' });
							this.resetRoom();
						} else {
							uni.showToast({ title: res.data.message, icon: 'none' });
						}
					},
					fail: () => {
						uni.showToast({ title: '添加房间失败', icon: 'none' });
					}
				});
			},
			resetItem() {
				this.item = {
					length: null,
					width: null,
					height: null,
					position_x: null,
					position_y: null,
					position_z: null,
					quantity: null,
					shape_id: null,
					threshold: null,
					container_id: null,
					feature: []
				};
			},
			resetContainer() {
				this.container = {
					position_x: null,
					position_y: null,
					position_z: null,
					length: null,
					width: null,
					height: null,
					room_id: null,
					parent_id: null,
					container_feature: []
				};
			},
			resetRoom() {
				this.room = {
					name: '',
					length: 6000,
					width: 6000,
					height: 4000,
				};
			}
		},
		onLoad() {
			this.fetchShapes(); // 加载形状信息
		}
	};
</script>

<style lang="scss" scoped>
	.container {
			padding-left: 20px; /* 左边距 */
			padding-right: 20px; /* 右边距 */
		}

	.feature-section {
		margin-top: 20px;
	}
	.feature-list {
		display: flex;
		flex-wrap: wrap;
	}
	.feature-tag {
		margin-right: 5px;
	}
	.remove-icon {
		cursor: pointer;
		margin-left: 5px;
	}
</style>
