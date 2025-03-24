<template>
  <view class='tcontainer'>
    <view>
      <u-tabs :list="tabList" :is-scroll="false" :current="currentTabIndex" @change="changeTab"></u-tabs>
    </view>

    <view class="header">
      <text class="title">房间详情</text>
      <button @click="editRoom" class="edit-button">编辑房间</button>
    </view>

    <view class="room-info">
      <text>位置: {{ room.positionX }}, {{ room.positionY }}, {{ room.positionZ }}</text><br />
      <text>尺寸: {{ room.length }} x {{ room.width }} x {{ room.height }}</text><br />
    </view>

    <view class="room-details" v-if="currentTabIndex === 0"> <!-- 图示 Tab -->
      <a-scene class="scene">
        <!-- 添加光源 -->
        <a-light type="ambient" color="#FFF"></a-light>
        <a-light type="directional" position="-1 1 1" intensity="0.5"></a-light>
        <a-text value="点击并拖动物体" position="0 2 0" align="center"></a-text>
        
        <!-- 创建房间模型（透明部分 + 边缘线） -->
        <a-box position="0 1 -5" depth="5" height="2" width="5" color="#4CC3D2" opacity="0.3"></a-box>
        <a-box position="0 1 -5" depth="5" height="2" width="5" color="#000" opacity="0.1" wireframe></a-box> <!-- 边缘线 -->
        
        <a-box position="-1 0.5 -3" depth="1" height="1" width="1" color="#4CC3D2" draggable></a-box>
        <a-box position="1 0.5 -3" depth="0.5" height="1" width="1" color="#EF2D5E" draggable></a-box>
        <a-sphere position="0 1 -3" radius="0.5" color="#FFC65D" draggable></a-sphere>

        <!-- 在房间内部添加不同颜色的容器 -->
        <view v-for="container in room.containers" :key="container.id">
          <a-box
            :position="`${container.positionX} ${container.positionY} ${container.positionZ}`"
            depth="0.5"
            height="1"
            width="1"
            :color="getColor(container.id)"
            draggable> <!-- 保留可拖拽 -->
          </a-box>
        </view>
        
        <!-- 添加摄像机 -->
        <a-camera position="0 2.5 0"></a-camera>
      </a-scene>
    </view>

    <view class="room-details" v-if="currentTabIndex === 1"> <!-- 列表 Tab -->
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
  </view>
</template>

<script>
import 'aframe'; // 引入 A-Frame
import Mock from 'mockjs'; // 确保引入 Mock.js

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
      },
      tabList: [
        { name: '图示'},
        { name: '列表'},
      ],
      currentTabIndex: 1 // 默认选中图示 Tab
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
    },
    changeTab(index) {
      this.currentTabIndex = index; // 更新当前选中的 tab
    },
    getColor(containerId) {
      const colors = ['#EF2D5E', '#FFC65D', '#7ED321', '#D81B60'];
      return colors[containerId % colors.length]; // 根据容器 ID 选择颜色
    }
  }
};
</script>

<style scoped>
.tcontainer {
  padding: 20px;
}

.room-details {
  padding: 20px;
  position: relative; /* 为了确保子元素绝对定位 */
}

.scene {
  height: 300px; /* 限制 a-scene 高度 */
  width: 100%; /* 宽度自适应 */
  display: block; /* 确保正常显示 */
  margin-top: 10px; /* 为 a-scene 添加一些顶部间距 */
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
