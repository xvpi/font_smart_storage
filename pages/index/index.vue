<template>
  <view class='tcontainer'>
    <view>
      <u-tabs :list="tabList" :is-scroll="false" :current="currentTabIndex" @change="changeTab"></u-tabs>
    </view>

    <view class="search-box">
      <input type="text" :placeholder="searchPlaceholder" v-model="searchQuery" />
      <button @click="search">搜索</button>
    </view>

    <!-- 滚动提醒区域 -->
    <view class="center">
      <u-toast :type="type" ref="uToast"></u-toast>
      <u-notice-bar :autoplay="true" :playState="play" :speed="160" :mode="horizontal" :type="warning"
        :list="infoList" :moreIcon="false" :volumeIcon="true" :duration="2000" :isCircular="false">
      </u-notice-bar>
    </view>

    <!-- 物品展示 -->
    <view v-if="currentTab === 'items'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="item in searchResults" :key="item.id" @click="navigateToEditItem(item)">
          <text class="item-name">{{ item.id }}</text>
        </view>
      </view>
      <view class="item-list">
        <view class="item" v-for="item in items" :key="item.id" @click="navigateToEditItem(item)">
          <text class="item-name">{{ item.id }}</text><br />
          <text class="item-position">位置: [{{ item.position_x }}, {{ item.position_y }}, {{ item.position_z }}]</text><br />
          <text class="item-quantity">数量: {{ item.quantity }}</text>
        </view>
      </view>
    </view>

    <!-- 容器展示 -->
    <view v-if="currentTab === 'containers'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="container in searchResults" :key="container.id" @click="navigateToContainerDetail(container)">
          <text class="container-name">{{ container.container_id }}</text>
        </view>
      </view>
      <view class="container-list">
        <view class="container" v-for="container in containers" :key="container.id" @click="navigateToContainerDetail(container)">
          <text class="container-name">{{ container.container_id }}</text><br />
          <text class="container-position">位置: [{{ container.position_x }}, {{ container.position_y }}, {{ container.position_z }}]</text><br />
          <text class="container-items">包含 {{ container.item.length }} 个物品</text>
        </view>
      </view>
    </view>

    <!-- 房间展示 -->
    <view v-if="currentTab === 'rooms'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="room in searchResults" :key="room.id" @click="navigateToRoomDetail(room)">
          <text class="room-name">{{ room.name }}</text>
        </view>
      </view>
      <view class="room-list">
        <view class="room" v-for="room in rooms" :key="room.id" @click="navigateToRoomDetail(room)">
          <text class="room-name">{{ room.id }}</text><br />
          <text class="room-containers">包含 {{ room.container.length }} 个容器</text>
        </view>
      </view>
    </view>

    <view @click="navigateToOptimizePage" class="floating-icon2">
      <u-icon name="integral" size="40" color="#c7ddff"></u-icon>
    </view>
    <view @click="goAddup(currentTabIndex)" class="floating-icon">
      <u-icon name="plus" size="40" color="#c7ddff"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      currentTab: 'items',
      items: [],
      containers: [],
      rooms: [],
      tabList: [
        { name: '物品' },
        { name: '容器' },
        { name: '房间' },
      ],
      infoList: ['test1', 'test2'], // 滚动消息
      currentTabIndex: 0 // 0: items, 1: containers, 2: rooms
    };
  },
  computed: {
    searchPlaceholder() {
      return this.currentTabIndex === 0 ? '搜索物品...' :
             this.currentTabIndex === 1 ? '搜索容器...' : '搜索房间...';
    }
  },
  mounted() {
    this.fetchData();
    this.fetchNotices();
  },
  methods: {
    fetchNotices() {
      // 获取通知的API
      uni.request({
        url: '/api/fetchNotices', // 模拟后端接口URL  
        success: (res) => {
          if (res.data) {
            this.infoList = res.data.data; // 假设这里是数组
            console.log(res.data)
          } else {
            uni.showToast({
              title: '获取通知失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    },
    fetchData() {
      this.getItems();
      this.getContainers();
      this.getRooms();
    },
    getItems() {
      // 获取物品数据
      uni.request({
        url: '/api/query-item',
        method: 'POST',
        success: (res) => {
          if (res.data && res.data.data) {
            this.items = res.data.data.rows;
          } else {
            uni.showToast({
              title: '获取物品失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    },
    getContainers() {
      // 获取容器数据
      uni.request({
        url: '/api/query-container',
        method: 'POST',
        success: (res) => {
          if (res.data && res.data.data) {
            this.containers = res.data.data.rows;
          } else {
            uni.showToast({
              title: '获取容器失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    },
    getRooms() {
      // 获取房间数据
      uni.request({
        url: '/api/query-room',
        method: 'POST',
        success: (res) => {
          if (res.data && res.data.data) {
            this.rooms = res.data.data.rows;
          } else {
            uni.showToast({
              title: '获取房间失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    },
    search() {
      if (this.searchQuery.trim() === '') {
        return;
      }
      
      if (this.currentTab === 'items') {
        this.searchResults = this.items.filter(item => item.room.name.includes(this.searchQuery));
      } else if (this.currentTab === 'containers') {
        this.searchResults = this.containers.filter(container => String(container.container_id).includes(this.searchQuery));
      } else if (this.currentTab === 'rooms') {
        this.searchResults = this.rooms.filter(room => room.name.includes(this.searchQuery));
      }
    },
    navigateToEditItem(item) {
      uni.navigateTo({ url: `/pages/index/editItem?id=${item.id}` });
    },
    navigateToContainerDetail(container) {
      uni.navigateTo({ url: `/pages/index/containerDetail?id=${container.id}` });
    },
    navigateToRoomDetail(room) {
      uni.navigateTo({ url: `/pages/index/roomDetail?id=${room.id}` });
    },
    navigateToOptimizePage() {
      uni.navigateTo({ url: '/pages/index/optimize' });
    },
	goAddup(index) {
	  uni.navigateTo({ url: `/pages/index/addup?currentTab=${index}` });
	},
    changeTab(index) {
      this.currentTabIndex = index;
      this.currentTab = index === 0 ? 'items' : index === 1 ? 'containers' : 'rooms';
      this.searchResults = [];
    }
  }
};
</script>

<style>
.tcontainer {
  padding: 20px;
}

.center {
  justify-content: center;
  text-align: center;
  margin: 10px;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 10px;
}

.search-box input {
  flex: 5;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px; /* 圆角矩形框 */
  margin-right: 10px;
}

.search-box button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #007aff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 5px; /* 调整按钮间距 */
}

.tab {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px; /* 圆角 */
  background-color: #f0f0f0;
  margin: 0 5px; /* 调整按钮间距 */
}

.tab button.active {
  background-color: #42b983; /* 激活的标签背景 */
  color: white; /* 激活的标签文字颜色 */
}

.item-list, .container-list, .room-list {
  margin: 10px 0;
}

.item, .container, .room {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.item:hover, .container:hover, .room:hover {
  background-color: #f0f0f0; /* 悬停效果 */
}

.item-name, .container-name, .room-name {
  font-size: 18px;
  font-weight: bold;
}

.item-position,.container-position, .room-position,.item-quantity, .container-items, .room-containers {
  font-size: 14px;
  color: #666;
}

.floating-icon2 {
		position: fixed;
		bottom: 140px;
		right: 10px;
		width: 50px;
		height: 50px;
		background-color: #007aff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		cursor: pointer;
	}
	
.floating-icon {
		position: fixed;
		bottom: 80px;
		right: 10px;
		width: 50px;
		height: 50px;
		background-color: #007aff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		cursor: pointer;
	}
</style>
