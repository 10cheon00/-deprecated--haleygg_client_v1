<template>
  <div class="layout">
    <!-- User Information -->
    <UserInfoCard :userInformation="userInformation" />
    <va-divider />
    <div class="layout gutter--md">
      <div class="row flex">
        <!-- Recent games -->
        <div class="lg8 md12 sm12 xs12">
          <GameResultsCard :gameResults="gameResults" />
        </div>

        <!-- Statistics -->
        <div class="lg4 md12 sm12 xs12">
          <UserStatisticsCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";

import GameResultsCard from "@/components/GameResultsCard.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import UserStatisticsCard from "@/components/UserStatisticsCard.vue";

import {
  fetchGameResultFromApi,
  fetchUserInformationFromApi,
} from "@/plugins/gameresult-api.js";

export default defineComponent({
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  components: {
    GameResultsCard,
    UserInfoCard,
    UserStatisticsCard,
  },
  setup(props) {
    const gameResults = ref([]);
    const userInformation = ref({});

    onMounted(() => {
      gameResults.value = fetchGameResultFromApi();
      userInformation.value = fetchUserInformationFromApi(props.userName);
    });

    return {
      gameResults,
      userInformation,
    };
  },
});
</script>

<style scoped>
</style>