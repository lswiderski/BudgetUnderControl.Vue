<template>
  <div>
    <ToastContainer />
    <template v-if="IsLoggedAndActivated()">
      <MainLayout />
    </template>
    <template v-if="!IsLoggedAndActivated()">
      <UnloggedLayout />
    </template>
  </div>
</template>
<script>
import MainLayout from "./layout/MainLayout.vue";
import UnloggedLayout from "./layout/UnloggedLayout.vue";
import ToastContainer from "./components/toast/ToastContainer";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    IsLoggedAndActivated() {
      return (
        this.$store.state.authentication.token &&
        this.$store.state.authentication.user != null &&
        this.$store.state.authentication.user.isActivated
      );
    },
  },
  components: {
    MainLayout,
    UnloggedLayout,
    ToastContainer,
  },
};
</script>

<style lang="scss">
</style>
