<template>
  <div v-if="isPlayerInformationFetched">
    <!-- Player Information -->
    <PlayerProfileCard :profile="playerInformation.profile" />

    <va-divider/>
    <!-- League Selector -->
    <div class="row justify--end">
      <LeagueSelector/>
    </div>

    <div class="row">
      <!-- Winning Rate -->
      <div class="flex xl4 lg4 md12 sm12 xs12">
        <PlayerWinRateCard
          class="data"
          :rawStatistics="playerInformation.statistics"
        />
      </div> 

      <!-- Elo -->
      <div class="flex xl8 lg8 md12 sm12 xs12">
        <PlayerEloCard
          class="data"
          :elo="playerInformation.Elo"
        />
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
</template>

<script>
import { ref, onMounted, defineComponent, provide } from "vue";
import { useRouter } from "vue-router";

import PlayerGameResultListCard from "@/components/PlayerGameResultListCard.vue";
import PlayerProfileCard from "@/components/PlayerProfileCard.vue";
import PlayerWinRateCard from "@/components/PlayerWinRateCard.vue";
import PlayerEloCard from "@/components/PlayerEloCard.vue";
import LeagueSelector from "@/components/LeagueSelector.vue";

import HaleyGGAPI from "@/plugins/haleygg-api.js";


export default defineComponent({
  props: {
    playerName: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayerProfileCard,
    LeagueSelector,
    PlayerWinRateCard,
    // TODO
    // aggregator를 이용해 만든 데이터를 어떻게 활용할 것인지, 
    // BaseCircularChart를 개조해 종족별 승률을 표시할 것.
    // 막대그래프 쳐내고 숫자로만 표시할 것.
    PlayerEloCard,
    PlayerGameResultListCard,
  },
  setup(props) {
    const router = useRouter();

    const playerInformation = ref({
      profile: null,
      gameResultList: null,
      statistics: null,
      Elo: null
    });
    const isPlayerInformationFetched = ref(false);

    const currentLeague = ref("");
    const leagueList = ref(null);
    const selectLeague = async (league) => {
      currentLeague.value = league;
      // TODO
      // When current league changed, 
      // below fetchDataFromAPI method fetch data from api
      // despite already request before.
      // Check that it loads to api.
      // If it does, fetch all league data.
      await fetchInformationFromAPI();
    };
    provide("leagueList", leagueList);
    provide("selectLeague", selectLeague);

    onMounted(async () => {
      isPlayerInformationFetched.value = false;

      await fetchInformationFromAPI();
      
      isPlayerInformationFetched.value = true;
    });

    const fetchInformationFromAPI = async () => {
      try {
        await fetchProfile();
        await fetchLeagueList();
        await fetchGameResultList();
        await fetchStatistics();
        fetchElo();
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
    }

    const fetchProfile = async () => {
      if(playerInformation.value.profile == undefined){
        const response = 
          await HaleyGGAPI.fetchProfile(props.playerName);
        playerInformation.value.profile = response.data;
      }
    };

    const fetchLeagueList = async () => {
      if(leagueList.value == undefined){
        const response = await HaleyGGAPI.fetchLeagueList();
        
        leagueList.value = [];
        response.data.forEach(league => {
          leagueList.value.push(league.name);
        });
        currentLeague.value = leagueList.value[0];
      }
    };

    const fetchGameResultList = async () => {
      const response = await HaleyGGAPI.fetchGameResult({
          'league': currentLeague.value,
          'players': [props.playerName]
        });
      playerInformation.value.gameResultList = response.data;
    };

    const fetchStatistics = async () => {
      const response = await HaleyGGAPI.fetchStatistics({
          'league': currentLeague.value,
          'player': props.playerName
        });
      playerInformation.value.statistics = response.data[0];
    };

    const fetchElo = async () => {
      playerInformation.value.Elo = [
        { date: "2021-10-21", value: 1200 },
        { date: "2021-10-22", value: 1200 },
        { date: "2021-10-23", value: 1200 }
      ]; // dummy data
    };

    return {
      playerInformation,
      isPlayerInformationFetched,
    };
  },
});
</script>

<style scoped>
.data {
  padding: 0.25rem;
}
</style>