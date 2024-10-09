<template>
  <view class="container-details">
    <view class="header">
      <text class="title">容器详情</text>
      <button @click="editContainer" class="edit-button">编辑容器</button>
    </view>
    
    <view class="container-info">
      <text>位置: {{ container.position_x }}, {{ container.position_y }}, {{ container.position_z }}</text><br />
      <text>尺寸: {{ container.length }} x {{ container.width }} x {{ container.height }}</text><br />
      <text>房间: {{ container.room.name }}</text>
    </view>

    <view class="items-section">
      <text class="section-title">容器内物品</text>
      <view v-if="container.item.length > 0" class="item-list">
        <view v-for="item in container.item" :key="item.id" class="item" @click="navigateToEditItem(item)">
          <text class="item-name">{{ item.id }}</text><br />
          <text class="item-quantity">数量: {{ item.quantity }}</text>
        </view>
      </view>
      <view v-else>
        <text>没有物品</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      containerId: null,
      container: {
        position_x: '',
        position_y: '',
        position_z: '',
        length: '',
        width: '',
        height: '',
        room: {
          name: ''
        },
        item: []
      }
    };
  },
  onLoad(options) {
    // 获取容器ID
    this.containerId = options.id;
    this.fetchContainerDetails();
  },
  methods: {
    fetchContainerDetails() {
      uni.request({
        url: `/api/containers/${this.containerId}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.container = res.data.data;
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '获取容器信息失败',
            icon: 'none'
          });
        }
      });
    },
    navigateToEditItem(item) {
      // 跳转到编辑物品页面
      uni.navigateTo({
        url: `/pages/index/editItem?id=${item.id}`
      });
    },
    editContainer() {
      // 跳转到编辑容器信息页面
      uni.navigateTo({
        url: `/pages/index/editContainer?id=${this.containerId}`
      });
    }
  }
};
</script>

<style scoped>
.container-details {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.edit-button {
  background-color: #007aff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.container-info {
  margin: 10px 0;
}

.items-section {
  margin-top: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
}

.item-list {
  margin-top: 10px;
}

.item {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
}

.item-quantity {
  font-size: 14px;
  color: #666;
}
</style>
