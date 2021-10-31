<template>
  <div>
    <va-card>
      <va-card-title>Statistics</va-card-title>
      <va-card-content>
        <div class="row">
          <!-- Statistics Summary -->
          <div class="flex md4">
            <div class="row align--center">
              <div class="flex md6 sm12 xs12">
                <circular-percentage
                  :percentage="Math.round(Math.random() * 100)"
                  :radius="40"
                />
              </div>
              <div class="flex md6 sm12 xs12 text--center">최근 N경기 M승 L패</div>
            </div>
          </div>
          <!-- ELO Chart -->
          <div class="flex md8">

          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import CircularPercentageSvg from "@/components/CircularPercentageSvg.vue";

export default defineComponent({
  components: {
    "circular-percentage": CircularPercentageSvg,
  },
  setup() {},
});
</script>
