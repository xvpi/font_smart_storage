<template>
  <view class="container">
    <u-form @submit.prevent="updateContainer">
      <u-form-item label="容器ID" prop="id">
        <u-input v-model="container.id" disabled />
      </u-form-item>
      <u-form-item label="位置X" prop="position_x">
        <u-input v-model.number="container.position_x" type="number" placeholder="请输入位置X" />
      </u-form-item>
      <u-form-item label="位置Y" prop="position_y">
        <u-input v-model.number="container.position_y" type="number" placeholder="请输入位置Y" />
      </u-form-item>
      <u-form-item label="位置Z" prop="position_z">
        <u-input v-model.number="container.position_z" type="number" placeholder="请输入位置Z" />
      </u-form-item>
      <u-form-item label="长度" prop="length">
        <u-input v-model.number="container.length" type="number" placeholder="请输入容器长度" />
      </u-form-item>
      <u-form-item label="宽度" prop="width">
        <u-input v-model.number="container.width" type="number" placeholder="请输入容器宽度" />
      </u-form-item>
      <u-form-item label="高度" prop="height">
        <u-input v-model.number="container.height" type="number" placeholder="请输入容器高度" />
      </u-form-item>
      <u-form-item label="容器类型" prop="container_type">
        <u-input v-model="container.container_type.type" disabled />
      </u-form-item>
      <u-button type="primary" native-type="submit">更新容器信息</u-button>
      <u-button @click="cancel" style="margin-top: 20px;">取消修改</u-button>
      <text v-if="message" style="color: red;">{{ message }}</text>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      container: {
        id: null,
        position_x: null,
        position_y: null,
        position_z: null,
        length: null,
        width: null,
        height: null,
        container_type: {
          id: null,
          type: ''
        }
      },
      originalContainer: {},
      message: ''
    };
  },
  onLoad(options) {
    // 这里假设通过参数获取容器ID
    this.fetchContainer(1); // 这里用1作为示例，可以根据实际情况调整
  },
  methods: {
    fetchContainer(containerId) {
      uni.request({
        url: `/api/containers/${containerId}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.container = { ...res.data.data };
            this.originalContainer = { ...this.container }; // 备份原始数据
          } else {
            this.message = res.data.message;
          }
        },
        fail: () => {
          this.message = '获取容器信息失败';
        }
      });
    },
    cancel() {
      this.container = { ...this.originalContainer }; // 取消修改
      this.message = '修改已取消';
    },
    updateContainer() {
      uni.request({
        url: '/api/containers',
        method: 'PUT',
        data: this.container,
        success: (res) => {
          if (res.data.code === 1) {
            this.message = '容器信息修改成功';
          } else {
            this.message = res.data.message;
          }
        },
        fail: () => {
          this.message = '更新容器信息失败';
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
