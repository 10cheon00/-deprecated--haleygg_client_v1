<template>
  <div class="layout" v-if="playerInformation.fetched">
    <!-- Player Information -->
    <PlayerProfileCard
      :profile="playerInformation.profile"
    />
    <va-divider />
    <div class="row justify--center">
      <!-- Statistics -->
      <div class="flex xl6 lg6 md12 sm12 xs12" style="height: 100%">
        <PlayerWinRateCard
          class="data"
          :winRates="playerInformation.winningRates"
        />
      </div>
      <div class="flex xl6 lg6 md12 sm12 xs12">
        <PlayerEloCard
          hidden
          class="data"
          :elo="playerInformation.elo"
        />
      </div>

      <!-- Recent games -->
      <div class="flex lg12 md12 sm12 xs12">
        <PlayerGameResultListCard
          class="data"
          :gameResultList="playerInformation.gameResultList"
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

import { fetchPlayerInformationUsingAxios } from "@/plugins/player-information-fetcher.js";

export default defineComponent({
  props: {
    playerName: {
      type: String,
      required: true,
    }
  },
  components: {
    PlayerGameResultListCard,
    PlayerProfileCard,
    PlayerWinRateCard,
    PlayerEloCard,
  },
  setup(props) {
    const playerInformation = ref({
      fetched: false,
      profile: null,
      gameResultList: [],
      winningRates: {
        melee: {
          total: { games: 0, wins: 0, rate: 0 },
          protoss: { games: 0, wins: 0, rate: 0 },
          terran: { games: 0, wins: 0, rate: 0 },
          zerg: { games: 0, wins: 0, rate: 0 }
        },
        topAndBottom: { games: 0, wins: 0, rate: 0 }
      }
    });
    onMounted(async () => {
      const router = useRouter();
      playerInformation.value.fetched = false;

      try {
        const response = await fetchPlayerInformationUsingAxios(props.playerName);
        playerInformation.value.profile = response.data.profile;
        playerInformation.value.gameResultList = response.data.game_result_list;
        playerInformation.value.elo = [];  // dummy data

        aggregateGameResultListToWinningRate();
        calculateWinningRate();
        

        playerInformation.value.fetched = true;
      } catch (error) {
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }
    });

    const aggregateGameResultListToWinningRate = () => {
      const isPlayerWin = (username, winners) => {
        return winners.some(e => e["name"] == username);
      }

      playerInformation.value.gameResultList.forEach(game => {
        if (game["game_type"] == "melee") {
          // presume user loses.
          let opponentRace = game["winners"][0]["race"];
          if (isPlayerWin(playerInformation.value.profile.name, game["winners"])) {
            // but user wins, change opponent race.
            opponentRace = game["losers"][0]["race"];
            playerInformation.value.winningRates["melee"][opponentRace].wins++;
          }
          playerInformation.value.winningRates["melee"][opponentRace].games++;
        }
        else {
          // Top and bottom games doesn't count by race.
          // Does only count win.
          if (isPlayerWin(playerInformation.value.profile.name, game["winners"])) {
            playerInformation.value.winningRates["topAndBottom"].wins++;
          }
          playerInformation.value.winningRates["topAndBottom"].games++;
        }
      });
      playerInformation.value.winningRates["melee"]["total"].games =
        playerInformation.value.winningRates["melee"]["protoss"].games +
        playerInformation.value.winningRates["melee"]["terran"].games +
        playerInformation.value.winningRates["melee"]["zerg"].games;

      playerInformation.value.winningRates["melee"]["total"].wins =
        playerInformation.value.winningRates["melee"]["protoss"].wins +
        playerInformation.value.winningRates["melee"]["terran"].wins +
        playerInformation.value.winningRates["melee"]["zerg"].wins;
    };

    const calculateWinningRate = () => {
      const calculatePercentage = (obj) => {
        obj.rate = Math.floor(obj.wins / obj.games * 1000) / 10;
        if (isNaN(obj.rate)) {
          obj.rate = 0;
        }
        return obj;
      }

      playerInformation.value.winningRates["melee"]["total"] = calculatePercentage(playerInformation.value.winningRates["melee"]["total"]);
      playerInformation.value.winningRates["melee"]["protoss"] = calculatePercentage(playerInformation.value.winningRates["melee"]["protoss"]);
      playerInformation.value.winningRates["melee"]["terran"] = calculatePercentage(playerInformation.value.winningRates["melee"]["terran"]);
      playerInformation.value.winningRates["melee"]["zerg"] = calculatePercentage(playerInformation.value.winningRates["melee"]["zerg"]);
      playerInformation.value.winningRates["topAndBottom"] = calculatePercentage(playerInformation.value.winningRates["topAndBottom"]);
    };

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