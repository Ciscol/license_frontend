<template>
  <el-container>
    <el-header>License生成模拟器</el-header>
    <el-main>
      <el-form label-width="120px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" maxlength="10" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="有效时长（秒）">
          <el-input-number v-model="form.valid_seconds" :step="10" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="选择模块">
          <el-checkbox-group v-model="form.modules">
            <el-checkbox label="A" name="A"></el-checkbox>
            <el-checkbox label="B" name="B"></el-checkbox>
            <el-checkbox label="C" name="C"></el-checkbox>
            <el-checkbox label="D" name="D"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="generate" type="primary" round>点击生成</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>模拟License生成，与实际应用环境下License生成过程不完全一致</el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "linyangbin",
        valid_seconds: 60,
        modules: []
      }
    };
  },
  methods: {
    generate() {
      this.$http
        .post("generate", {data:this.form})
        .then(response => {
          if (response) {
            this.$router.push("/verify");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.el-input{
  max-width: 300px;
}
.el-form{
  text-align: left;
  width: 500px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>