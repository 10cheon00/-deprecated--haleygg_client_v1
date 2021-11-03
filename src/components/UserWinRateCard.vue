<template>
  <div>
    <va-card >
      <va-card-title>Win Rate</va-card-title>
      <va-card-content>
        <div class="row align--center text--center">
          <!-- Total top and bottom win rate chart -->
          <div class="flex md6 sm6 xs6">
            <BaseCircularPercentageChart
              :percentage="winRates.melee.total.rate"
              :title="winRateOfMeleeTitle"
            />
          </div>

          <div class="flex md6 sm6 xs6">
            <!-- Total melee win rate -->
            <BaseCircularPercentageChart
              :percentage="winRates.topAndBottom.rate"
              :title="winRateOfTopAndBottomTitle"
            />
          </div>
          <va-divider dashed class="flex xl12 lg12 md12 sm12 xs12" />

          <!-- Win rate by race chart -->
          <div class="flex md12 sm12 xs12">
            <div class="row">
              <!-- player versus protoss -->
              <div class="flex md4 sm4 xs4">
                <BaseCircularPercentageChart
                  color="#ECD039"
                  :percentage="winRates.melee.protoss.rate"
                  :title="winRateOfProtossTitle"
                />
              </div>
              <!-- player versus terran -->
              <div class="flex md4 sm4 xs4">
                <BaseCircularPercentageChart
                  color="#1D73DD"
                  :percentage="winRates.melee.terran.rate"
                  :title="winRateOfTerranTitle"
                />
              </div>
              <!-- player versus zerg -->
              <div class="flex md4 sm4 xs4">
                <BaseCircularPercentageChart
                  color="#7424AE"
                  :percentage="winRates.melee.zerg.rate"
                  :title="winRateOfZergTitle"
                />
              </div>
            </div>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>


<script>
import { defineComponent } from "vue";

import BaseCircularPercentageChart from "@/components/BaseCircularPercentageChart.vue";

export default defineComponent({
  props: {
    winRates: {
      melee: {
        protoss: {
          type: Number,
          default: 0,
          required: true,
        },
        terran: {
          type: Number,
          default: 0,
          required: true,
        },
        zerg: {
          type: Number,
          default: 0,
          required: true,
        },
      },
      topAndBottom: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
  components: {
      BaseCircularPercentageChart
  },
  setup(props) {
    const winRateOfMeleeTitle = `개인전 총
      ${props.winRates.melee.total.games}전 
      ${props.winRates.melee.total.wins}승`;

    const winRateOfTopAndBottomTitle = `팀플전 총
      ${props.winRates.topAndBottom.games}전 
      ${props.winRates.topAndBottom.wins}승`;

    const winRateOfProtossTitle = `프로토스전 총
      ${props.winRates.melee.protoss.games}전 
      ${props.winRates.melee.protoss.wins}승`;

    const winRateOfTerranTitle = `테란전 총
      ${props.winRates.melee.terran.games}전 
      ${props.winRates.melee.terran.wins}승`;

    const winRateOfZergTitle = `저그전 총
      ${props.winRates.melee.zerg.games}전 
      ${props.winRates.melee.zerg.wins}승`;

    
    
    return {
      winRateOfMeleeTitle,
      winRateOfTopAndBottomTitle,
      winRateOfProtossTitle,
      winRateOfTerranTitle,
      winRateOfZergTitle,

    }
  },
});
</script>
