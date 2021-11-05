<template>
  <div class="layout">
    <!-- Player Information -->
    <PlayerProfileCard 
      v-if="userInformation.profile"
      :profile="userInformation.profile" 
    />
    <va-divider />
    <div class="layout gutter--lg">
      <div class="row justify--center">
        <!-- Statistics -->
        <div class="flex xl6 lg6 md12 sm12 xs12" style="height:100%">
          <PlayerWinRateCard 
            v-if="userInformation.winRates"
            :winRates="userInformation.winRates"
          />
        </div>
        <div  class="flex xl6 lg6 md12 sm12 xs12">
          <PlayerEloCard 
            v-if="userInformation.elo"
            :elo="userInformation.elo"
          />
        </div>

        <!-- Recent games -->
        <div class="flex lg12 md12 sm12 xs12">
          <PlayerGameResultsCard 
            v-if="userInformation.game_results"
            :gameResults="userInformation.game_results" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";

import PlayerGameResultsCard from "@/components/PlayerGameResultsCard.vue";
import PlayerProfileCard from "@/components/PlayerProfileCard.vue";
import PlayerWinRateCard from "@/components/PlayerWinRateCard.vue";
import PlayerEloCard from "@/components/PlayerEloCard.vue";

import { fetchPlayerInformationFromApi } from "@/plugins/gameresult-api.js";

export default defineComponent({
  props: {
    userName: {
      type: String,
      required: true,
    }
  },
  components: {
    PlayerGameResultsCard,
    PlayerProfileCard,
    PlayerWinRateCard,
    PlayerEloCard,
  },
  setup(props) {
    const userInformation = ref({
      profile: null,
      game_results: null,
      winRates: null,
      elo: null
    });

    onMounted(() => {
      fetchPlayerInformationFromApi(props.userName, userInformation);
    });

    return {
      userInformation,
    };
  },
});
</script>

<style scoped>
</style>