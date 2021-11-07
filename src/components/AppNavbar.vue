<template>
  <va-navbar text-color="light">
    <template #center>
      <va-navbar-item>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item v-if="isNotHomePage">
        <AppSearchBar />
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import AppSearchBar from "@/components/AppSearchBar.vue";

export default defineComponent({
  components: {
    AppSearchBar,
  },
  setup() {
    const route = useRoute();
    const isNotHomePage = computed(() => {
      return route.path != "/";
    });
    return {
      isNotHomePage,
    };
  },
});
</script>

<style scoped>
</style>