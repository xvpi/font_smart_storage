<template>
  <view class="container">
    <u-form :model="item" ref="uForm" :label-width="160">
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
        <u-input v-model="shape_name" type="select" @click="showShapePicker = true" placeholder="请选择形状" />
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

    <view>
      <text>已添加特征:</text>
      <u-tag v-for="(feature, index) in item.feature" :key="feature.id" type="info" class="feature-tag">
        {{ feature.feature ? (feature.feature.length > 5 ? feature.feature.substring(0, 5) + '...' : feature.feature) : '无内容' }}
        <u-icon name="minus" @click.prevent="removeFeature(feature.id)" />
        <u-icon name="edit" @click.prevent="editFeature(feature.id)" />
      </u-tag>
    </view>

    <u-button @click="updateItem" type="primary" style="margin-top: 20px;">确认修改</u-button>
    <u-button @click="cancel" style="margin-top: 20px;">取消修改</u-button>
    <text v-if="message" style="color: red;">{{ message }}</text>

    <u-popup v-model="editPopupVisible" mode="bottom">
      <view class="edit-popup">
        <u-input v-model="editFeatureContent" placeholder="编辑特征内容" />
        <u-button @click="updateFeature" type="primary">更新特征</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
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
        shape_name: '',
        newFeature: '',
        message: '',
        showShapePicker: false,
        shapeOptions: [],
        editPopupVisible: false,
        editFeatureId: null,
        editFeatureContent: '',
        originalItem: {} // 用于存储未修改前的原始数据
      };
    },
    methods: {
      fetchItem() {
        uni.request({
          url: '/api/items/1', // 假设获取ID为1的物品
          method: 'GET',
          success: (res) => {
            const result = res.data;
            if (result.code === 1) {
              this.item = { ...result.data }; // 填充表单
              this.originalItem = { ...result.data }; // 保存未修改前的数据
              this.shape_name = result.data.shape.shape; // 获取形状名称
            } else {
              this.message = result.message;
            }
          },
          fail: () => {
            this.message = '获取物品信息失败';
          }
        });
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
          this.newFeature = '';
        }
      },
      updateFeature() {
        const index = this.item.feature.findIndex(f => f.id === this.editFeatureId);
        if (index !== -1) {
          this.item.feature[index].feature = this.editFeatureContent;
          this.editPopupVisible = false;
          this.editFeatureContent = '';
        }
      },
      updateItem() {
        uni.request({
          url: `/api/items/${this.item.id}`, // 更新物品信息
          method: 'PUT',
          data: this.item,
          success: (res) => {
            if (res.data.code === 1) {
              this.message = '物品信息更新成功';
            } else {
              this.message = res.data.message;
            }
          },
          fail: () => {
            this.message = '更新物品信息失败';
          }
        });
      },
      cancel() {
        this.item = { ...this.originalItem }; // 取消修改
        this.message = '修改已取消';
      }
    },
    mounted() {
      this.fetchItem(); // 页面加载时获取物品信息
      this.fetchShapes(); // 获取形状选项
    }
  };
</script>

<style scoped>
  .container {
    padding: 16px;
  }

  .feature-tag {
    display: inline-flex;
    align-items: center;
    margin: 10px;
    color: #000;
  }

  .edit-popup {
    padding: 20px;
  }
</style>
