<template>
  <ParentLayout>
    <div slot="sidebar-top"></div>
    <div slot="sidebar-bottom"></div>
    <Weather slot="page-top" class="page-top" />
    <Valines slot="page-bottom" />
  </ParentLayout>
</template>

<script>
import ParentLayout from "@parent-theme/layouts/Layout.vue";
import Weather from "../components/Weather.vue";
export default {
  components: {
    ParentLayout,
    Weather
  }
};
</script>

<style lang="stylus">
.page-top {
  margin-top: 3.6rem;
}
</style>

