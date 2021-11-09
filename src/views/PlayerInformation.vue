<template>
  <div class="layout" v-if="isPlayerInformationFetched">
    <!-- Player Information -->
    <PlayerProfileCard :profile="profile" />

    <va-divider/>
    <!-- League Selector -->
    <div class="">
      <LeagueSelector/>
    </div>

    <!-- Winning Rate -->
    <div class="flex xl6 lg6 md12 sm12 xs12" style="height: 100%">
      <PlayerWinRateCard
        class="data"
        :winRates="gameResultGroup[currentLeague].aggregatedResult"
      />
    </div> 

    <!-- Elo -->
    <div class="flex xl6 lg6 md12 sm12 xs12">
      <PlayerEloCard
        hidden
        class="data"
        :elo="elo"
      />
    </div>

    <!-- Recent games -->
    <div class="flex lg12 md12 sm12 xs12">
      <PlayerGameResultListCard
        class="data"
        :gameResultList="gameResultGroup[currentLeague].list"
        :you="profile.name"
      />
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

import { fetchPlayerInformationUsingAxios } from "@/plugins/player-information-fetcher.js";

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
    PlayerEloCard,
    PlayerGameResultListCard,
  },
  setup(props) {
    let gameResultList = null;
    const profile = ref(null);
    const gameResultGroup = ref({});
    const isPlayerInformationFetched = ref(false);
    const Elo = ref(null);

    const currentLeague = ref("");
    const leagueList = ref([]);
    const selectLeague = (league) => {
      currentLeague.value = league
    }
    provide("leagueList", leagueList);
    provide("selectLeague", selectLeague);

    onMounted(async () => {
      const router = useRouter();
      isPlayerInformationFetched.value = false;

      try {
        const response = await fetchPlayerInformationUsingAxios(
          props.playerName
        );
        profile.value = response.data.profile;
        gameResultList = response.data.game_result_list;
        Elo.value = []; // dummy data
      } catch (error) {
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
      
      groupGameResultListByLeague();
      aggregateGameResultListToWinningRateByLeague();
      calculateWinningRateByLeague();

      leagueList.value = Object.keys(gameResultGroup.value);
      currentLeague.value = leagueList.value[0];

      isPlayerInformationFetched.value = true;
    });

    const groupGameResultListByLeague = () => {
      gameResultList.forEach((gameResult) => {
        if (gameResult.league in gameResultGroup.value == false) {
          gameResultGroup.value[gameResult.league] = {
            list: [],
            aggregatedResult: {
              melee: {
                total: { games: 0, wins: 0, rate: 0 },
                P: { games: 0, wins: 0, rate: 0 },
                T: { games: 0, wins: 0, rate: 0 },
                Z: { games: 0, wins: 0, rate: 0 },
              },
              topAndBottom: { games: 0, wins: 0, rate: 0 },
            },
          };
        }
        gameResultGroup.value[gameResult.league].list.push(gameResult);
      });
      gameResultList = null;
    };

    const aggregateGameResultListToWinningRateByLeague = () => {
      const isPlayerWin = (username, winners) => {
        return winners.some((e) => e["name"] == username);
      };
      for (const key in gameResultGroup.value) {
        let group = gameResultGroup.value[key];
        group.list.forEach((gameResult) => {
          let opponentRace = gameResult.winners[0].race;
          if (gameResult.game_type == "melee") {
            if (isPlayerWin(profile.value.name, gameResult.winners)) {
              opponentRace = gameResult.losers[0].race;
              group.aggregatedResult.melee[opponentRace].wins++;
            }
            group.aggregatedResult.melee[opponentRace].games++;
          } else {
            if (isPlayerWin(profile.value.name, gameResult.winners)) {
              group.aggregatedResult.topAndBottom.wins++;
            }
            group.aggregatedResult.topAndBottom.games++;
          }
        });
        group.aggregatedResult.melee.total.games =
          group.aggregatedResult.melee.P.games +
          group.aggregatedResult.melee.T.games +
          group.aggregatedResult.melee.Z.games;
        group.aggregatedResult.melee.total.wins =
          group.aggregatedResult.melee.P.wins +
          group.aggregatedResult.melee.T.wins +
          group.aggregatedResult.melee.Z.wins;
      }
    };

    const calculateWinningRateByLeague = () => {
      const calculatePercentage = (obj) => {
        obj.rate = Math.floor((obj.wins / obj.games) * 1000) / 10;
        if (isNaN(obj.rate)) {
          obj.rate = 0;
        }
        return obj;
      };
      for (const key in gameResultGroup.value) {
        let group = gameResultGroup.value[key];
        group.aggregatedResult.melee.total = calculatePercentage(
          group.aggregatedResult.melee.total
        );
        group.aggregatedResult.melee.P = calculatePercentage(
          group.aggregatedResult.melee.P
        );
        group.aggregatedResult.melee.T = calculatePercentage(
          group.aggregatedResult.melee.T
        );
        group.aggregatedResult.melee.Z = calculatePercentage(
          group.aggregatedResult.melee.Z
        );
        group.aggregatedResult.topAndBottom = calculatePercentage(
          group.aggregatedResult.topAndBottom
        );
      }
    };

    

    return {
      profile,
      gameResultGroup,
      isPlayerInformationFetched,
      Elo,
      currentLeague,
    };
  },
});
</script>

<style scoped>
.data {
  padding: 0.25rem;
}
</style>