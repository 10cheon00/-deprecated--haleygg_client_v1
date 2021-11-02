<template>
  <div class="layout">
    <!-- User Information -->
    <UserProfileCard :userInformation="userInformation" />
    <va-divider />
    <div class="layout gutter--lg">
      <div class="row">
        <!-- Statistics -->
        <div class="flex lg12 md12 sm12 xs12" >
          <UserStatisticsCard />
        </div>

        <!-- Recent games -->
        <div class="flex lg12 md12 sm12 xs12">
          <UserGameResultsCard :gameResults="gameResults" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";

import UserGameResultsCard from "@/components/UserGameResultsCard.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
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
    UserGameResultsCard,
    UserProfileCard,
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