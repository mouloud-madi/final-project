<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import navbar from "./components/layouts/navbar";
export default {
  name: "App",
  components: {
    navbar
  }
};
</script>
