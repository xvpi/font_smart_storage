<template>
  <view class="container">
    <u-form @submit.prevent="updateRoom">
      <u-form-item label="房间名称" prop="name">
        <u-input v-model="room.name" placeholder="请输入房间名称" />
      </u-form-item>
      <u-form-item label="长度" prop="length">
        <u-input v-model.number="room.length" type="number" placeholder="请输入房间长度" />
      </u-form-item>
      <u-form-item label="宽度" prop="width">
        <u-input v-model.number="room.width" type="number" placeholder="请输入房间宽度" />
      </u-form-item>
      <u-form-item label="高度" prop="height">
        <u-input v-model.number="room.height" type="number" placeholder="请输入房间高度" />
      </u-form-item>
      <u-form-item label="位置X" prop="positionX">
        <u-input v-model.number="room.positionX" type="number" placeholder="请输入位置X" />
      </u-form-item>
      <u-form-item label="位置Y" prop="positionY">
        <u-input v-model.number="room.positionY" type="number" placeholder="请输入位置Y" />
      </u-form-item>
      <u-form-item label="位置Z" prop="positionZ">
        <u-input v-model.number="room.positionZ" type="number" placeholder="请输入位置Z" />
      </u-form-item>
      <u-button type="primary" native-type="submit">更新房间信息</u-button>
    </u-form>
    <text v-if="message">{{ message }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      room: {
        id: null,
        name: '',
        length: null,
        width: null,
        height:null,
        positionX:null,
        positionY:null,
        positionZ:null
      },
      message: ''
    };
  },
  onLoad(options) {
    //this.fetchRoom(options.room_id); // 假设从路由中获取房间ID
	this.fetchRoom(1); 
  },
  methods: {
    fetchRoom(roomId) {
      uni.request({
        url: `/api/rooms/${roomId}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.room = { ...res.data.data };
          } else {
            this.message = res.data.message;
          }
		  console.log(this.message);
        },
        fail: () => {
          this.message = '获取房间信息失败';
		  console.log(this.message);
        }
      });
    },
    updateRoom() {
      uni.request({
        url: '/api/rooms',
        method: 'PUT',
        data: this.room,
        success: (res) => {
          if (res.data.code === 1) {
            this.message = '房间信息修改成功';
          } else {
            this.message = res.data.message;
          }
        },
        fail: () => {
          this.message = '更新房间信息失败';
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
