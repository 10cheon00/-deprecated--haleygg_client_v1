<template>
  <div>
    <div v-if="isFetched">
      <!-- Title -->
      <va-card square outlined>
        <va-card-content>
          <div class="row">
            <div class="flex md5 sm5 player-name">
              <span>{{ playerProfile.name }}</span>
              <span class="race">({{ playerProfile.most_race }})</span>
            </div>
            <div class="flex md2 sm2 versus">VS</div>
            <div class="flex md5 sm5 player-name">
              <span>{{ opponentProfile.name }}</span>
              <span class="race">({{ opponentProfile.most_race }})</span>
            </div>
          </div>
        </va-card-content>
      </va-card>

      <!-- Statistics -->
      <va-card square outlined stripe>
        <va-card-title>STATISTICS</va-card-title>
        <va-card-content>
          <va-divider />
          <div v-for="row in statisticsList" :key="row.title">
            <div class="row statistics">
              <div class="flex md5">
                {{ row.playerData }}
              </div>
              <div class="flex md2">{{ row.title }}</div>
              <div class="flex md5">
                {{ row.opponentData }}
              </div>
            </div>
            <va-divider />
          </div>
        </va-card-content>
      </va-card>

      <!-- Related game result list -->
      <PlayerGameResultListCard :gameResultList="relatedGameResultList" />
    </div>
    <div v-else class="row justify--center align--center" style="height: 500px">
      <va-progress-circle indeterminate />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, provide } from "vue";

import PlayerGameResultListCard from "@/components/PlayerGameResultListCard.vue";
import AxiosInstance from "@/plugins/axios-wrapper.js";
import { useRouter } from "vue-router";

import { calculatePercentage } from "@/utils/statistics.js";

export default defineComponent({
  props: {
    playerName: {
      type: String,
      required: true,
    },
    opponentName: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayerGameResultListCard,
  },
  setup(props) {
    const router = useRouter();

    const isFetched = ref(false);
    const relatedGameResultList = ref([]);
    const statisticsList = ref(null);
    const playerProfile = ref(null);
    const opponentProfile = ref(null);
    let playerRankData;
    let opponentRankData;
    let playerWinningRate;
    let opponentWinningRate;
    let playerRecord;

    onMounted(async () => {
      await fetchInformationFromAPI();
      convertStatisticsToString();
      isFetched.value = true;
    });

    const fetchInformationFromAPI = async () => {
      try {
        await fetchProfiles();
        await fetchWinningRates();
        await fetchRelatedStatistics();
        await fetchRelatedGameResultList();
        await fetchRanking();
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
    };

    const fetchProfiles = async () => {
      let response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${props.playerName}`,
      });
      playerProfile.value = response.data;
      response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${props.opponentName}`,
      });
      opponentProfile.value = response.data;
    };

    const fetchWinningRates = async () => {
      let playerMostRace = playerProfile.value.most_race.toLowerCase();
      let opponentMostRace = opponentProfile.value.most_race.toLowerCase();

      let response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${playerProfile.value.name}/statistics`,
      });
      playerWinningRate = calculatePercentage(
        response.data[0][`${playerMostRace}v${opponentMostRace}_win_count`],
        response.data[0][`${playerMostRace}v${opponentMostRace}_game_count`]
      );

      response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${opponentProfile.value.name}/statistics`,
      });
      opponentWinningRate = calculatePercentage(
        response.data[0][`${opponentMostRace}v${playerMostRace}_win_count`],
        response.data[0][`${opponentMostRace}v${playerMostRace}_game_count`]
      );
    };

    const fetchRelatedGameResultList = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/game-results?game-type=melee&players=${playerProfile.value.name},${opponentProfile.value.name}`,
      });
      relatedGameResultList.value = response.data.results;
      relatedGameResultList.value.nextGameResultListURL = response.data.next;
    };

    const fetchRelatedStatistics = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/profiles/${playerProfile.value.name}/statistics?opponent=${opponentProfile.value.name}`,
      });
      playerRecord = {
        games: response.data.melee_game_count,
        wins: response.data.melee_win_count,
        loses: response.data.melee_lose_count,
      };
    };

    const fetchRanking = async () => {
      const response = await AxiosInstance({
        method: "GET",
        url: `/profiles/ranks`,
      });

      playerRankData = response.data.find((rank) => {
        return rank.player_name == playerProfile.value.name;
      });
      opponentRankData = response.data.find((rank) => {
        return rank.player_name == opponentProfile.value.name;
      });
    };

    const convertStatisticsToString = () => {
      statisticsList.value = [];
      statisticsList.value.push({
        title: "상대 전적",
        playerData: `${playerRecord.games}전 ${playerRecord.wins}승 ${playerRecord.loses}패`,
        opponentData: `${playerRecord.games}전 ${playerRecord.loses}승 ${playerRecord.wins}패`,
      });

      statisticsList.value.push({
        title: "다승 랭킹",
        playerData: `${playerRankData.melee_win_count_rank}위`,
        opponentData: `${opponentRankData.melee_win_count_rank}위`,
      });

      statisticsList.value.push({
        title: "대종족전 승률",
        playerData: `v${opponentProfile.value.most_race} ${playerWinningRate}%`,
        opponentData: `v${playerProfile.value.most_race} ${opponentWinningRate}%`,
      });
    };

    provide("isNextURLExists", () => {
      return relatedGameResultList.value.nextGameResultListURL != null;
    });
    provide("fetchNextGameResultList", async () => {
      if (relatedGameResultList.value.nextGameResultListURL != null) {
        const response = await AxiosInstance({
          method: "GET",
          url: relatedGameResultList.value.nextGameResultListURL,
        });
        relatedGameResultList.value = relatedGameResultList.value.concat(
          response.data.results
        );

        relatedGameResultList.value.nextGameResultListURL = response.data.next;
      }
      convertStatisticsToString();
    });

    return {
      isFetched,
      relatedGameResultList,
      playerProfile,
      opponentProfile,
      statisticsList
    };
  },
});
</script>

<style scoped>
.va-card {
  margin-bottom: 0.5rem;
}
.player-name {
  align-self: center;
  text-align: center;
  font-size: 3rem;
}
.race {
  font-size: 1rem;
  align-self: center;
}
.versus {
  font-size: 2rem;
  align-self: center;
  text-align: center;
}
.statistics {
  text-align: center;
  height: 2rem;
}
.superier {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
