<template>
  <div>
    <p>HOME PAGE</p>
    <p>NETWORK TEST: Random number from backend: {{ randomNumber }}</p>
    <button @click="getRandom">New random number</button>
  </div>
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