<template>
  <view class="container">
    <u-tabs :list="tabList" v-model="activeTab" :current="activeTab" @change="changeTab"></u-tabs>
    
    <u-form ref="form" :model="form" label-width="80">
      <view v-if="activeTab === 0">
        <u-form-item label="账号">
          <u-input v-model="form.account" placeholder="请输入用户名或手机号" />
        </u-form-item>
        <u-form-item label="密码">
          <u-input v-model="form.password" placeholder="请输入密码" type="password" />
        </u-form-item>
      </view>
      
      <view v-if="activeTab === 1">
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
      </view>
      
      <u-button type="primary" @click="login">登录</u-button>
      <u-button type="info" @click="goToRegister">注册</u-button>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabList: [{ name: '密码登录' }, { name: '验证码登录' }],
      form: {
        account: '',
        password: '',
        phone: '',
        captcha: ''
      },
      countdown: 0
    };
  },
  methods: {
    changeTab(index) {
				 this.activeTab=index;
			  },
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
    async login() {
      let url = '';
      let data = {};
      if (this.activeTab === 0) {
        url = 'http://napbad.com:8080/user/login/password';
        data = { account: this.form.account, password: this.form.password };
      } else {
        url = 'http://napbad.com:8080/user/login/captcha';
        data = { phone: this.form.phone, captcha: this.form.captcha };
      }
    
      try {
        const [error, res] = await uni.request({
          url,
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          data
        });
    
        console.log('登录响应:', res);
    
        if (res.statusCode === 200 && res.data.success) {
          uni.setStorageSync('token', res.data.message);  // 存储JWT令牌
          uni.setStorageSync('userInfo', JSON.stringify(res.data.data)); // 存储用户信息
          uni.showToast({ title: '登录成功', icon: 'success' });
    
          setTimeout(() => {
            uni.reLaunch({ url: 'myinfo' }); // 跳转到个人信息页面
          }, 1000);
        } else {
          uni.showToast({ title: res.data.message || '登录失败', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '请求失败，请检查网络', icon: 'none' });
      }
    },

    goToRegister() {
      uni.navigateTo({ url: 'register' });
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
