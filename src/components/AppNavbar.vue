<template>
  <va-navbar text-color="light">
    <template #left>
      <va-navbar-item>LOGO</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link
          :to="{ name: 'PlayerInformation', params: { userName: 'Dave' } }"
        >Dave
        </router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link
          :to="{ name: 'PlayerInformation', params: { userName: 'Kevin' } }"
        >Kevin
        </router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>
        <va-input placeholder="username">
          <template #appendInner>
            <va-icon name="search" />
          </template>
        </va-input>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
