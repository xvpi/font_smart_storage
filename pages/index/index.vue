<template>
  <view class='container'>
    <view>
      <u-tabs :list="tabList" :is-scroll="false" :current="currentTabIndex" @change="changeTab"></u-tabs>
    </view>

    <view class="search-box">
      <input type="text" :placeholder="searchPlaceholder" v-model="searchQuery" />
      <button @click="search">搜索</button>
    </view>

    <view class="center">
      <u-toast :type="type" ref="uToast"></u-toast>
      <u-notice-bar :list="infoList" :autoplay="true" :playState="play" :speed="160" />
    </view>

    <view v-if="currentTab === 'items'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="item in searchResults" :key="item.id" @click="navigateToEditItem(item)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <view class="item-list">
        <view class="item" v-for="item in items" :key="item.id" @click="navigateToEditItem(item)">
          <text>{{ item.name }}</text>
          <text>{{ item.position }}</text>
          <text>{{ item.quantity }}</text>
        </view>
      </view>
    </view>

    <view v-if="currentTab === 'containers'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="container in searchResults" :key="container.id" @click="navigateToContainerDetail(container)">
          <text>{{ container.name }}</text>
        </view>
      </view>
      <view class="container-list">
        <view class="container" v-for="container in containers" :key="container.id" @click="navigateToContainerDetail(container)">
          <text>{{ container.name }}</text>
          <text>{{ container.items.length }} 个物品</text>
        </view>
      </view>
    </view>

    <view v-if="currentTab === 'rooms'">
      <view v-if="searchResults.length > 0" class="search-results">
        <view v-for="room in searchResults" :key="room.id" @click="navigateToRoomDetail(room)">
          <text>{{ room.name }}</text>
        </view>
      </view>
      <view class="room-list">
        <view class="room" v-for="room in rooms" :key="room.id" @click="navigateToRoomDetail(room)">
          <text>{{ room.name }}</text>
          <text>{{ room.containers.length }} 个容器</text>
        </view>
      </view>
    </view>

    <view @click="navigateToOptimizePage" class="floating-icon2">
      <u-icon name="integral" size="40" color="#c7ddff"></u-icon>
    </view>
    <view @click="goAddup" class="floating-icon">
      <u-icon name="plus" size="40" color="#c7ddff"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infoList: [],
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
      currentTabIndex: 0, // 0: items, 1: containers, 2: rooms
    };
  },
  computed: {
    searchPlaceholder() {
      return this.currentTab === 'items' ? '搜索物品...' :
             this.currentTab === 'containers' ? '搜索容器...' : '搜索房间...';
    }
  },
  mounted() {
    this.fetchData();
    this.fetchNotices();
  },
  methods: {
    fetchNotices() {
      // 获取通知的API
    },
    fetchData() {
      this.getItems();
      this.getContainers();
      this.getRooms();
    },
    getItems() {
      // API调用获取物品
    },
    getContainers() {
      // API调用获取容器
    },
    getRooms() {
      // API调用获取房间
    },
    search() {
      if (this.currentTab === 'items') {
        this.searchResults = this.items.filter(item => item.name.includes(this.searchQuery));
      } else if (this.currentTab === 'containers') {
        this.searchResults = this.containers.filter(container => container.name.includes(this.searchQuery));
      } else if (this.currentTab === 'rooms') {
        this.searchResults = this.rooms.filter(room => room.name.includes(this.searchQuery));
      }
    },
    changeTab(index) {
      this.currentTabIndex = index;
      this.currentTab = this.tabList[index].name.toLowerCase(); // 'items', 'containers', 'rooms'
      this.searchResults = []; // 清空搜索结果
      this.searchQuery = ''; // 清空搜索框
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
    goAddup() {
      uni.navigateTo({ url: '/pages/index/addup' });
    },
  },
};
</script>

<style>
.container {
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

.search-box .icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
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
  background-color: #42b983; /* 活动按钮的背景颜色 */
  color: white;
  font-weight: bold;
}

.item-list, .area-list {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 10px; /* 添加间距 */
}

.item, .area {
  flex: 1 1 calc(50% - 10px); /* 每行两个 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px; /* 圆角 */
  cursor: pointer;
  display: flex;
  align-items: center;
}

.area image, .item image {
  width: 100px;
  height: 100px;
  margin-right: 10px;
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
