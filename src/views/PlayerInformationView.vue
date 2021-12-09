<template>
  <div>
    <div v-if="playerInformation.isFetched">
      <!-- Player Information -->
      <PlayerProfileCard :profile="playerInformation.profile" />

      <va-divider />

      <div class="row">
        <!-- Winning Rate -->
        <div class="flex xl4 lg4 md12 sm12 xs12">
          <PlayerStatisticsCard
            class="data"
            :rawStatistics="playerInformation.statistics"
            :ranking="playerInformation.ranking"
          />
        </div>

        <!-- Elo -->
        <div class="flex xl8 lg8 md12 sm12 xs12">
          <PlayerEloCard class="data" :elo="playerInformation.Elo" />
        </div>

        <!-- Recent games -->
        <div class="flex lg12 md12 sm12 xs12">
          <PlayerGameResultListCard
            class="data"
            :gameResultList="playerInformation.gameResultList"
            :you="playerInformation.profile.name"
          />
        </div>
      </div>
    </div>
    <div v-else class="row justify--center align--center" style="height:500px;">
      <va-progress-circle indeterminate />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, provide } from "vue";
import { useRouter } from "vue-router";

import PlayerGameResultListCard from "@/components/PlayerGameResultListCard.vue";
import PlayerProfileCard from "@/components/PlayerProfileCard.vue";
import PlayerStatisticsCard from "@/components/PlayerStatisticsCard.vue";
import PlayerEloCard from "@/components/PlayerEloCard.vue";

import AxiosInstance from "@/plugins/axios-wrapper.js";


export default defineComponent({
  props: {
    playerName: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayerProfileCard,
    PlayerStatisticsCard,
    PlayerEloCard,
    PlayerGameResultListCard,
  },
  setup(props) {
    const router = useRouter();

    const playerInformation = ref({
      profile: null,
      gameResultList: null,
      statistics: null,
      Elo: null,
      isFetched: false,
    });

    onMounted(async () => {
      playerInformation.value.isFetched = false;
      await fetchInformationFromAPI();
      playerInformation.value.isFetched = true;
    });

    const fetchInformationFromAPI = async () => {
      try {
        await fetchProfile();
        await fetchGameResultList();
        await fetchStatistics();
        await fetchRanking();
        fetchElo();
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
    };

    const fetchProfile = async () => {
      if (playerInformation.value.profile == undefined) {
        const response = await AxiosInstance({
          method: "GET",
          url: `/profiles/${props.playerName}`
        });
        playerInformation.value.profile = response.data;
      }
    };

    const fetchGameResultList = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/game-results?players=${props.playerName}`
      });
      playerInformation.value.gameResultList = response.data.results;
      playerInformation.value.nextGameResultListURL = response.data.next;
    };

    const fetchStatistics = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${props.playerName}/statistics`
      });
      playerInformation.value.statistics = response.data[0];
    };

    const fetchRanking = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/profiles/ranks`
      });
      playerInformation.value.ranking = response.data.find(
        (ranking) => ranking.player_name == playerInformation.value.profile.name
      );
    };

    const fetchElo = async () => {
      playerInformation.value.Elo = [
        { date: "2021-10-21", value: 1200 },
        { date: "2021-10-22", value: 1200 },
        { date: "2021-10-23", value: 1200 },
      ]; // dummy data
    };

    provide("isNextURLExists", () => {
      return playerInformation.value.nextGameResultListURL != null;
    });
    provide("fetchNextGameResultList", async() => {
      if (playerInformation.value.nextGameResultListURL != null){
        const response = await AxiosInstance({
          method:"GET",
          url: playerInformation.value.nextGameResultListURL
        });
        playerInformation.value.gameResultList = 
          playerInformation.value.gameResultList.concat(response.data.results);
        
        playerInformation.value.nextGameResultListURL = response.data.next;
      }
    });

    return {
      playerInformation,
    };
  }, 
});
</script>

<style scoped>
.data {
  padding: 0.25rem;
}
</style>