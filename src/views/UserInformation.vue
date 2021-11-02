<template>
  <div class="layout">
    <!-- User Information -->
    <UserProfileCard 
      v-if="userInformation.profile"
      :profile="userInformation.profile" 
    />
    <va-divider />
    <div class="layout gutter--lg">
      <div class="row">
        <!-- Statistics -->
        <div class="flex lg12 md12 sm12 xs12" >
          <UserStatisticsCard 
            v-if="userInformation.elo"
            :elo="userInformation.elo"
          />
        </div>

        <!-- Recent games -->
        <div class="flex lg12 md12 sm12 xs12">
          <UserGameResultsCard 
            v-if="userInformation.gameResults"
            :gameResults="userInformation.gameResults" 
          />
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

import { fetchUserInformationFromApi } from "@/plugins/gameresult-api.js";

export default defineComponent({
  props: {
    userName: {
      type: String,
      required: true,
    }
  },
  components: {
    UserGameResultsCard,
    UserProfileCard,
    UserStatisticsCard,
  },
  setup(props) {
    const userInformation = ref({});

    onMounted(() => {
      setTimeout(() => {
        userInformation.value = fetchUserInformationFromApi(props.userName);
      }, 100)
    });

    return {
      userInformation,
    };
  },
});
</script>

<style scoped>
</style>