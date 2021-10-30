<template>
  <div>
    <va-card>
      <va-card-title>Statistics</va-card-title>
      <VueChartRenderer/>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import VueChartRenderer from "@/plugins/vue-chartjs-renderer"

export default defineComponent({
  components: {
    VueChartRenderer
  },
  setup() {
    return {
    }
  },
});
</script>