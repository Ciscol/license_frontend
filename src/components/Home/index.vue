<template>
  <el-container>
    <el-header>功能主页</el-header>
    <el-main>
      <div>
        <div>
          <p>License 有效期至：{{valid_date}}</p>
        </div>
        <p>
          <el-button class="get-random" @click="getRandom" circle :loading="gettingRandom">
            <p>获取随机数</p>
            <p>{{ randomNumber }}</p>
          </el-button>
        </p>
      </div>
      <el-tabs type="border-card" tab-position="left" :before-leave="beforeSwitch">
        <el-tab-pane v-for="(item, idx) in allModules" :key="idx" :name="item">
          <span slot="label">
            <i class="el-icon-lock" v-if="openedModules[item].disabled"></i>
            模块——{{item}}
          </span>
          <p>模块{{item}} 模块{{item}} 模块{{item}}</p>
          <p>模块{{item}} 模块{{item}} 模块{{item}}</p>
          <p>模块{{item}} 模块{{item}} 模块{{item}}</p>
          <p>模块{{item}} 模块{{item}} 模块{{item}}</p>
          <p>模块{{item}} 模块{{item}} 模块{{item}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>项目的功能主页，展示了license有效期，并演示了功能模块的部分开放</el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      randomNumber: 0,
      gettingRandom: false,
      modules: [],
      allModules: ["A", "B", "C", "D"],
      valid_date: null
    };
  },
  computed: {
    openedModules() {
      let result = {};
      this.allModules.forEach(value => {
        result[value] = {
          disabled: true
        };
      });
      this.modules.forEach(value => {
        result[value].disabled = false;
      });
      return result;
    }
  },
  methods: {
    beforeSwitch(activeName) {
      // if (activeName === "Normal" || activeName == 0) return Promise.resolve();
      return new Promise((resolve, reject) => {
        this.$http
          .post("moduleAccess", {
            data: {
              moduleName: activeName
            }
          })
          .then(response => {
            if (response.data && response.data.access) {
              return resolve(response);
            } else {
              // this.$message("模块未开放");
              reject();
            }
          });
      });
    },
    getLicenseMassage() {
      this.$http
        .get("licenseMassage")
        .then(response => {
          this.modules = response.data.modules;
          this.valid_date = response.data.valid_date;
        })
        .catch(() => {});
    },
    getRandom() {
      this.gettingRandom = true;
      this.$http
        .get("random")
        .then(response => {
          this.randomNumber = response.data.randomNumber;
        })
        .catch(() => {})
        .finally(() => {
          this.gettingRandom = false;
        });
    }
  },
  created() {
    this.getRandom();
    this.getLicenseMassage();
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: rgb(20, 121, 216);
  color: aliceblue;
}
.get-random {
  height: 120px;
  width: 120px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>