<template>
  <el-container>
    <el-header>License验证登录</el-header>
    <el-main>
      <el-button @click="verify">点击自动验证</el-button>
    </el-main>
    <el-footer>license验证通过则登录成功，并跳转到首页</el-footer>
  </el-container>
</template>
<script>
export default {
  methods: {
    verify() {
      this.$http
        .post('login', {})
        .then(response => {
          let { token } = response.data;
          if (token) {
            localStorage.setItem('license-verification-Authorization', token);
            this.$router.push('/home');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>