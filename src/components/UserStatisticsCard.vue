<template>
  <div>
    <va-card>
      <va-card-title>Statistics</va-card-title>
      <va-card-content>
        <!-- Statistics summary -->
        <div class="row align--center justify--center text--center">
          <!-- Win rate chart -->
          <div class="flex lg6 md12 sm12 xs12">
            <div class="row align--center justify--center ">
              <!-- Total win rate chart -->
              <div class="flex md4 sm4 xs4">
                <BaseCircularPercentageChart
                  :percentage="Math.round(Math.random() * 100)"
                  :radius="40"
                  title="총 9전 6승 3패"
                />
              </div>
              <!-- Total win rate by race chart -->
              <div class="flex md8 sm8 xs8">
                <div class="row">
                  <!-- player versus protoss -->
                  <div class="flex md4 sm4 xs4">
                    <BaseCircularPercentageChart
                      :percentage="Math.round(Math.random() * 100)"
                      :radius="40"
                      color="#ecd039"
                      title="vs 프로토스"
                    />
                  </div>
                  <!-- player versus terran -->
                  <div class="flex md4 sm4 xs4">
                    <BaseCircularPercentageChart
                      :percentage="Math.round(Math.random() * 100)"
                      :radius="40"
                      color="#1d73dd"
                      title="vs 테란"
                    />
                  </div>
                  <!-- player versus zerg -->
                  <div class="flex md4 sm4 xs4">
                    <BaseCircularPercentageChart
                      :percentage="Math.round(Math.random() * 100)"
                      :radius="40"
                      color="#7424ae"
                      title="vs 저그"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ELO Chart -->
          <div class="flex lg6 md12 sm12 xs12">
            <BaseEloChart v-if="elo" :elo="elo"/>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import BaseCircularPercentageChart from "@/components/BaseCircularPercentageChart.vue";
import BaseEloChart from "@/components/BaseEloChart.vue";

export default defineComponent({
  components: {
    BaseCircularPercentageChart,
    BaseEloChart,
  },
  props: {
    // winRates: {
    //   type: Array,
    //   required: true
    // },
    elo: {
      type: Array,
      required: true
    }
  },
  setup() {
  },
});
</script>
