<template>
  <view class="room-details">
    <view class="header">
      <text class="title">房间详情</text>
      <button @click="editRoom" class="edit-button">编辑房间</button>
    </view>
    
    <view class="room-info">
      <text>位置: {{ room.positionX }}, {{ room.positionY }}, {{ room.positionZ }}</text><br />
      <text>尺寸: {{ room.length }} x {{ room.width }} x {{ room.height }}</text><br />
    </view>

    <view class="containers-section">
      <text class="section-title">房间内容器</text>
      <view v-if="room.containers.length > 0" class="container-list">
        <view v-for="container in room.containers" :key="container.id" class="container" @click="navigateToContainerDetail(container)">  
		  <text class="container-id">容器 ID: {{ container.id }}</text><br />
          <text class="container-dimensions">尺寸: {{ container.length }} x {{ container.width }} x {{ container.height }}</text>
        </view>
      </view>
      <view v-else>
        <text>没有容器</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      roomId: null,
      room: {
        positionX: '',
        positionY: '',
        positionZ: '',
        length: '',
        width: '',
        height: '',
        containers: []
      }
    };
  },
  onLoad(options) {
    // 获取房间ID
    this.roomId = options.id;
    this.fetchRoomDetails();
  },
  methods: {
    fetchRoomDetails() {
      uni.request({
        url: `/api/rooms/${this.roomId}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.room = res.data.data;
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '获取房间信息失败',
            icon: 'none'
          });
        }
      });
    },
    navigateToContainerDetail(container) {
      // 跳转到编辑容器页面
      uni.navigateTo({
        url: `/pages/index/containerDetail?id=${container.id}`
      });
    },
    editRoom() {
      // 跳转到编辑房间信息页面
      uni.navigateTo({
        url: `/pages/index/editArea?id=${this.roomId}`
      });
    }
  }
};
</script>

<style scoped>
.room-details {
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

.room-info {
  margin: 10px 0;
}

.containers-section {
  margin-top: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
}

.container-list {
  margin-top: 10px;
}

.container {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.container-id {
  font-size: 16px;
  font-weight: bold;
}

.container-dimensions {
  font-size: 14px;
  color: #666;
}
</style>
