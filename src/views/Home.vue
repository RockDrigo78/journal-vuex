<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Hola Ro</h1>
    <button class="btn btn-primary" @click="goToDaybook">Primary</button>
    <button class="btn btn-secondary" @click="goToDaybook">Secondary</button>
    <button class="btn btn-success" @click="goToDaybook">Daybook</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    goToDaybook() {
      this.$router.push({ name: "daybook" });
    },
  },
};
</script>
