<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div>
        在verify后获取modules和valid_date，在本页中显示
        <el-button @click="getRandom">功能测试：获取随机数</el-button>
        <p>随机数: {{ randomNumber }}</p>
      </div>
      modules分可用和禁用，但是在后台依然要做鉴权
      <el-tabs type="border-card" tab-position="left">
        <el-tab-pane label="模块A">模块A</el-tab-pane>
        <el-tab-pane label="模块B">模块B</el-tab-pane>
        <el-tab-pane label="模块C">模块C</el-tab-pane>
        <el-tab-pane label="模块D">模块D</el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      randomNumber: 0
    };
  },
  methods: {
    getRandom() {
      this.getRandomFromBackend();
    },
    getRandomFromBackend() {
      this.$http
        .get('random')
        .then(response => {
          this.randomNumber = response.data.randomNumber;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getRandom();
  }
};
</script>