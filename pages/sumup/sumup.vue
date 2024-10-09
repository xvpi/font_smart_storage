<template>
  <view class="container">
    <u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="changeTab" />
    
    <view v-if="currentTab === 0" class="stats-section">
      <view class="charts-box">
        <qiun-data-charts 
          type="pie"
          :opts="opts"
          :chartData="chartData"
        />
      </view>
      <view class="legend">
        <view v-for="(item, index) in chartData.series[0].data" :key="index" class="legend-item">
          <view :style="{ backgroundColor: opts.color[index] }" class="color-box"></view>
          <text>{{ item.name }}: {{ ((item.value / totalItems) * 100).toFixed(2) }}% 记录{{ item.value }}</text>
        </view>
      </view>
    </view>

    <view v-else class="summary-section">
      <text class="summary-title">收纳喜好和习惯分析</text>
      <view class="summary-content">
        <text>您在过去一年内的收纳习惯如下：</text><br />
        <text class="summary-item">1. 最常使用的房间是：<text class="highlight">{{ favoriteRoom }}</text></text><br />
        <text class="summary-item">2. 收纳最多的物品类型是：<text class="highlight">{{ favoriteType }}</text></text><br />
        <text class="summary-item">3. 收纳最少的房间是：<text class="highlight">{{ leastUsedRoom }}</text></text><br />
        <text class="summary-item">4. 您的收纳习惯是：<text class="highlight">{{ summaryHabit }}</text></text><br />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabList: [
        { name: '统计' },
        { name: '总结' }
      ],
      chartData: {},
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      },
      totalItems: 0,
      favoriteRoom: '书房',
      favoriteType: '书籍',
      leastUsedRoom: '厨房',
      summaryHabit: '喜欢将物品按照用途分类存放'
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据
        let res = {
          series: [
            {
              data: [
                { "name": "书房", "value": 5 },
                { "name": "寝室", "value": 3 },
                { "name": "客厅", "value": 0 },
                { "name": "厨房", "value": 0 }
              ]
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
        this.totalItems = this.chartData.series[0].data.reduce((sum, item) => sum + item.value, 0);
      }, 500);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.stats-section {
  margin-top: 20px;
}

.charts-box {
  width: 100%;
  height: 300px;
}

.legend {
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.summary-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.summary-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.summary-content {
  margin-top: 10px;
}

.summary-item {
  font-size: 16px;
  margin: 5px 0;
  color: #555;
}

.highlight {
  font-weight: bold;
  color: #1890FF;
}
</style>
