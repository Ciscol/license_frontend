<template>
  <el-container>
    <el-header>License验证登录</el-header>
    <el-main>
      <el-button class="btn-verify" @click="verify" circle>点击自动验证</el-button>
    </el-main>
    <el-footer>license验证通过则登录成功，并跳转到首页</el-footer>
  </el-container>
</template>
<script>
export default {
  methods: {
    verify() {
      const loading = this.$loading({
        lock: true,
        text: "验证中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .post("login", {})
        .then(response => {
          let { token } = response.data;
          if (token) {
            localStorage.setItem("license-verification-Authorization", token);
            this.$router.push("/home");
          }
        })
        .catch(() => {
          this.$confirm("前往获取license", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$router.push("/generate");
            })
            .catch(() => {});
        })
        .finally(() => {
          loading.close();
        });
    }
  }
};
</script>
<style scoped>
.btn-verify {
  margin-top: 120px;
  height: 120px;
  width: 120px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-header,
.el-footer {
  background-color: #89bef3;
  color: #303133;
}
</style>