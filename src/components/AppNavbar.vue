<template>
  <va-navbar text-color="light">
    <template #center>
      <va-navbar-item>LOGO</va-navbar-item>
      <va-navbar-item>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item v-if="isNotHomePage">
        <form @submit.prevent="searchUser">
          <va-input placeholder="username">
            <template #appendInner>
              <va-icon name="search" />
            </template>
          </va-input>
        </form>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
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