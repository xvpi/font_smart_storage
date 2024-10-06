<template>
  <view class="container">
    <view class="header">
      <text class="title">编辑物品</text>
    </view>
    <view class="form">
      <input v-model="item.length" placeholder="长度" />
      <input v-model="item.width" placeholder="宽度" />
      <input v-model="item.height" placeholder="高度" />
      <input v-model="item.quantity" placeholder="数量" />
      <button @click="saveItem">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      item: {
        id: null,
        length: '1',
        width: '',
        height: '',
        quantity: ''
      }
    };
  },
  onLoad(options) {
    this.fetchItem(options.id);
  },
  methods: {
    fetchItem(id) {
      uni.request({
        url: `/api/items/${id}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.item = res.data.data;
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }
        }
      });
    },
    saveItem() {
      uni.request({
        url: '/api/items',
        method: 'PUT',
        data: this.item,
        success: (res) => {
          if (res.data.code === 1) {
            uni.showToast({
              title: '物品信息更新成功',
              icon: 'success'
            });
            uni.navigateBack();
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }
        }
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.header {
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.form {
  margin-top: 20px;
}

.form input {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form button {
  padding: 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
