<template>
  <div>
    <AppNavbar/>
    <div class="main">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

import AppNavbar from '@/components/AppNavbar.vue'

export default defineComponent({
  components: {
    AppNavbar
  },
  setup() {},
})
</script>

<style>
a{
  color: inherit;
}
</style>
