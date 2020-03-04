<template>
  <div>
    <p>LICENSE VERIFICATION</p>
    <button @click="login">start verify</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: ""
    };
  },
  methods: {
    login() {
      this.$http
        .post('login', {})
        .then(response => {
          // console.log(response.data);
          let { state, token, message } = response.data;
          state === 1
            ? this.verifySuccess({ token })
            : this.verifyFail({ message });
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* 验证通过 */
    verifySuccess({ token }) {
      // save in localStorage
      console.log("token: ", token);
      localStorage.setItem('license-verification-Authorization', token);
      this.$router.push('/home');
    },
    /* 验证失败 */
    verifyFail({ message }) {
      console.log("message: ", message);
    }
  },
};
</script>