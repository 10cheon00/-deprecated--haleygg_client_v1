<template>
  <div v-if="isPlayerInformationFetched">
    <!-- Player Information -->
    <PlayerProfileCard :profile="profile" />

    <va-divider/>
    <!-- League Selector -->
    <!--
    <div class="">
      <LeagueSelector/>
    </div>
     -->

    <div class="row">
      <!-- Winning Rate -->
      <div class="flex xl8 lg8 md12 sm12 xs12" style="height: 100%">
        <PlayerWinRateCard
          class="data"
          :winRates="aggregatedResult"
        />
      </div> 

      <!-- Elo -->
      <div class="flex xl4 lg4 md12 sm12 xs12">
        <PlayerEloCard
          class="data"
          :elo="Elo"
        />
      </div>

      <!-- Recent games -->
      <div class="flex lg12 md12 sm12 xs12">
        <PlayerGameResultListCard
          class="data"
          :gameResultList="gameResultList"
          :you="profile.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";

import PlayerGameResultListCard from "@/components/PlayerGameResultListCard.vue";
import PlayerProfileCard from "@/components/PlayerProfileCard.vue";
import PlayerWinRateCard from "@/components/PlayerWinRateCard.vue";
import PlayerEloCard from "@/components/PlayerEloCard.vue";
// import LeagueSelector from "@/components/LeagueSelector.vue";

import HaleyGGAPI from "@/plugins/player-information-fetcher.js";

export default defineComponent({
  props: {
    playerName: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayerProfileCard,
    // LeagueSelector,
    PlayerWinRateCard,
    PlayerEloCard,
    PlayerGameResultListCard,
  },
  setup(props) {
    const profile = ref(null);
    const gameResultList = ref([]);
    const aggregatedResult = ref(null);
    const isPlayerInformationFetched = ref(false);
    const rank = ref(null);
    const Elo = ref(null);

    // const currentLeague = ref("");
    // const leagueList = ref([]);
    // const selectLeague = (league) => {
    //   currentLeague.value = league
    // }
    // provide("leagueList", leagueList);
    // provide("selectLeague", selectLeague);

    onMounted(async () => {
      const router = useRouter();
      isPlayerInformationFetched.value = false;

      try {
        const responseOfProfile = await HaleyGGAPI.fetchProfile(props.playerName);
        const responseOfGameResultList = 
          await HaleyGGAPI.fetchGameResult({
            'league': 'HPL 1',
            'players': [props.playerName]
          })
        const responseOfRank = await HaleyGGAPI.fetchRankOfLeague("HPL 1");
        profile.value = responseOfProfile.data;
        gameResultList.value = responseOfGameResultList.data;
        rank.value = responseOfRank.data;
    
        Elo.value = [
          { date: "2021-10-21", value: 1200 },
          { date: "2021-10-22", value: 1200 },
          { date: "2021-10-23", value: 1200 }
        ]; // dummy data

        aggregatedResult.value = {
          melee: {
            total: { games: 0, wins: 0, rate: 0 },
            P: { games: 0, wins: 0, rate: 0 },
            T: { games: 0, wins: 0, rate: 0 },
            Z: { games: 0, wins: 0, rate: 0 },
          },
          topAndBottom: { games: 0, wins: 0, rate: 0 },
        }
      } catch (error) {
        console.log(error)
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
      aggregateGameResultListToWinningRate();
      calculateWinningRate();

      isPlayerInformationFetched.value = true;
    });

    const aggregateGameResultListToWinningRate = () => {
      let opponentRace = "";
      const findOpponentRace = (players, playerName) => {
        if(players[0].name == playerName){
          opponentRace = players[1].race;
        }
        else{
          opponentRace = players[0].race;
        }
      };
      const isPlayerWin = (players, playerName) => {
        return players.some((e) => e["name"] == playerName && e["win_state"]);
      };
      gameResultList.value.forEach(gameResult => {
        // count win, games by game type, races.
        findOpponentRace(gameResult.players);

        if (gameResult.game_type == "melee") {
          if (isPlayerWin(gameResult.players, profile.value.name)) {
            aggregatedResult.value.melee[opponentRace].wins++;
          }
          aggregatedResult.value.melee[opponentRace].games++;
        } else {
          if (isPlayerWin(gameResult.players, profile.value.name)) {
            aggregatedResult.value.topAndBottom.wins++;
          }
          aggregatedResult.value.topAndBottom.games++;
        }
      });

      aggregatedResult.value.melee.total.games =
        aggregatedResult.value.melee.P.games +
        aggregatedResult.value.melee.T.games +
        aggregatedResult.value.melee.Z.games;
      aggregatedResult.value.melee.total.wins =
        aggregatedResult.value.melee.P.wins +
        aggregatedResult.value.melee.T.wins +
        aggregatedResult.value.melee.Z.wins;
    };

    const calculateWinningRate = () => {
      const calculatePercentage = (obj) => {
        obj.rate = Math.floor((obj.wins / obj.games) * 1000) / 10;
        if (isNaN(obj.rate)) {
          obj.rate = 0;
        }
        return obj;
      };
      aggregatedResult.value.melee.total = calculatePercentage(
        aggregatedResult.value.melee.total
      );
      aggregatedResult.value.melee.P = calculatePercentage(
        aggregatedResult.value.melee.P
      );
      aggregatedResult.value.melee.T = calculatePercentage(
        aggregatedResult.value.melee.T
      );
      aggregatedResult.value.melee.Z = calculatePercentage(
        aggregatedResult.value.melee.Z
      );
      aggregatedResult.value.topAndBottom = calculatePercentage(
        aggregatedResult.value.topAndBottom
      );
    };

    return {
      profile,
      gameResultList,
      aggregatedResult,
      isPlayerInformationFetched,
      Elo,
      // currentLeague,
    };
  },
});
</script>

<style scoped>
.data {
  padding: 0.25rem;
}
</style>