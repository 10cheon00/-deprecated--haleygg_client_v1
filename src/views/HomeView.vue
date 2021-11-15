<template>
  <div>
    <va-card>
      <va-card-content>
        <AppSearchBar />
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import AppSearchBar from "@/components/AppSearchBar.vue";

export default defineComponent({
  name: 'Home',
  components: {
    AppSearchBar
  },
  setup(){
  }
});
</script>
