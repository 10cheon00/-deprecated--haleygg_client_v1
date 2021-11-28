<template>
  <div>
    <AppNavbar/>
    <div class="layout">
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
body{
  background-color:lightgray;
}

a{
  color: inherit;
}

.layout{
  background-color: white;
}
</style>
