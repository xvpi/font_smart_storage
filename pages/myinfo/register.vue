<template>
  <view class="container">
    <u-form ref="form" :model="form" label-width="80">
      <u-form-item label="用户名">
        <u-input v-model="form.username" placeholder="请输入用户名" />
      </u-form-item>
      <u-form-item label="手机号">
        <u-input v-model="form.phone" placeholder="请输入手机号" type="number" />
      </u-form-item>
      <u-form-item label="验证码">
        <view class="captcha-container">
          <u-input v-model="form.captcha" placeholder="请输入验证码" />
          <u-button type="primary" @click="getCaptcha" :disabled="countdown > 0">
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </u-button>
        </view>
      </u-form-item>
      <u-form-item label="密码">
        <u-input v-model="form.password" placeholder="请输入密码" type="password" />
      </u-form-item>
      <u-button type="primary" @click="register">注册</u-button>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        phone: '',
        password: '',
        captcha: ''
      },
      countdown: 0
    };
  },
  methods: {
    async getCaptcha() {
      if (!this.form.phone) {
        return uni.showToast({ title: '请输入手机号', icon: 'none' });
      }
      try {
        const [error, res] = await uni.request({
          url: `http://napbad.com:8080/user/captcha/get?phone=${this.form.phone}`,
          method: 'POST'
        });
        this.startCountdown();
        uni.showToast({ title: '验证码已发送', icon: 'success' });
		console.log('验证码响应:', res);
      } catch (error) {
        uni.showToast({ title: '验证码发送失败', icon: 'none' });
      }
    },
    startCountdown() {
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) clearInterval(timer);
      }, 1000);
    },
    async register() {
      if (!this.form.username || !this.form.phone || !this.form.password || !this.form.captcha) {
        return uni.showToast({ title: '请填写完整信息', icon: 'none' });
      }
    
      try {
        const [error, res] = await uni.request({
          url: 'http://napbad.com:8080/user/register',
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          data: this.form
        });
    
        console.log('注册响应:', res);
    
        if (res.statusCode === 200 && res.data.id) {
          uni.showToast({ title: '注册成功，请登录', icon: 'success' });
    
          setTimeout(() => {
            uni.reLaunch({
              url: 'login' // 自动填充用户名
            });
          }, 1000);
        } else {
          uni.showToast({ title: res.data.message || '注册失败', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '请求失败，请检查网络', icon: 'none' });
      }
    }

  }
};
</script>

<style>
.container {
  padding: 20px;
}
.captcha-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
