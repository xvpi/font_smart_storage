<template>
	<!-- 修改测试 -->
  <view class='container'>
    <!-- 搜索框区域 -->
    <view class="search-box">
      <input type="text" placeholder="搜索物品..." v-model="searchQuery" />
      <button @click="searchItems">搜索</button>
      <image class="icon" src="/static/index/optimize.png" @click="navigateToOptimizePage" />
    </view>

    <!-- 滚动提醒区域 -->
    <view class="center">
      <u-toast :type="type" ref="uToast"></u-toast>
      <u-notice-bar :autoplay="true" :playState="play" :speed="160" :mode="horizontal" :type="warning"
        :list="this.infoList" :moreIcon="false" :volumeIcon="true" :duration="2000" :isCircular="false">
      </u-notice-bar>
    </view>

    <!-- 标签索引区域 -->
    <view class="tab">
      <button :class="{ active: currentTab === 'items' }" @click="currentTab = 'items'">物品</button>
      <button :class="{ active: currentTab === 'areas' }" @click="currentTab = 'areas'">区域</button>
    </view>

    <!-- 搜索结果区域 -->
    <view v-if="searchResults.length > 0" class="search-results">
      <view v-for="(item, index) in searchResults" :key="index" @click="navigateToDetailPage(item)">
        <text>{{ item.name }}</text>
      </view>
    </view>

    <!-- 主体内容展示 -->
    <view v-if="currentTab === 'items'">
      <view class="item-list">
        <view class="item" v-for="(item, index) in items" :key="index" @click="navigateToItemDetail(item)">
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view v-else>
      <view class="area-list">
        <view class="area" v-for="(area, index) in areas" :key="index" @click="navigateToAreaDetail(area)">
          <image :src="area.photo" />
          <text>{{ area.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infoList: ['test1','test2'],  // 滚动消息
      searchQuery: '',  // 搜索框的输入内容
      searchResults: [],  // 搜索结果
      currentTab: 'items',  // 当前展示的标签: 'items' 或 'areas'
      items: [ { id: 1, name: '物品1' },
        { id: 2, name: '物品2' }],  // 物品列表
      areas: [{ id: 1, name: '区域1', photo: '/static/test/quyu1.png' },
        { id: 2, name: '区域2', photo: '/static/test/quyu2.png' }]  // 区域列表
    };
  },
  onLoad() {
    // 页面加载时获取滚动提醒
    this.getNotices();
    // 获取物品和区域数据
    this.getItems();
    this.getAreas();
  },
  methods: {
    // 获取滚动提醒数据
	fetchNotice() {
		uni.request({
			url: 'http://localhost:8090/index/fetchNotice', // 模拟后端接口URL  
			success: (res) => {
				if (res.data) {
					// 假设后端返回的数据结构中有data字段包含通知列表  
					this.infoList = [res.data.result];
	
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
    // 搜索物品
    searchItems() {
      // 模拟搜索结果
      this.searchResults = this.items.filter(item => item.name.includes(this.searchQuery));
    },
    // 获取物品数据
    getItems() {
      // 模拟后端数据
      this.items = [
        { id: 1, name: '物品1' },
        { id: 2, name: '物品2' }
      ];
    },
    // 获取区域数据
    getAreas() {
      // 模拟后端数据
      this.areas = [
        { id: 1, name: '区域1', photo: '/static/test/quyu1.png' },
        { id: 2, name: '区域2', photo: '/static/test/quyu2.png' }
      ];
    },
    // 跳转到物品详情页
    navigateToItemDetail(item) {
      uni.navigateTo({
        url: `/pages/itemDetail/itemDetail?id=${item.id}`
      });
    },
    // 跳转到区域详情页
    navigateToAreaDetail(area) {
      uni.navigateTo({
        url: `/pages/areaDetail/areaDetail?id=${area.id}`
      });
    },
    // 跳转到优化页面
    navigateToOptimizePage() {
      uni.navigateTo({
        url: '/pages/optimize/optimize'
      });
    }
  }
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

.area image {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
</style>
