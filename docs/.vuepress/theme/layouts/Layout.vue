<template>
  <ParentLayout>
    <div slot="sidebar-top">this is sidebar-top slot</div>
    <div slot="sidebar-bottom">this is sidebar-bottom slot</div>
    <div slot="page-top" class="page-top">this is page-top slot</div>
    <div slot="page-bottom">this is page-bottom slot</div>
  </ParentLayout>
</template>

<script>
  import ParentLayout from '@parent-theme/layouts/Layout.vue'
export default {
  components: {
    ParentLayout
  }
}
</script>

<style lang="stylus">
  .page-top{
    margin-top:3.6rem;
  }
</style>

