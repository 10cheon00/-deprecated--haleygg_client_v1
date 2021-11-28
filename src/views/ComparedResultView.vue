<template>
  <div class="row" v-if="isFetched">
    <!-- TODO
      어떻게 구성할 것인지 생각 필요
      -->
    <div class="flex md12 sm12 xs12">
      <va-card square outlined>
        <va-card-content>
          <!-- Title -->
          <div class="row">
            <div class="flex md5 sm5 player-name">{{ playerName }}</div>
            <div class="flex md2 sm2 versus">VS</div>
            <div class="flex md5 sm5 player-name">{{ opponentName }}</div>
          </div>
        </va-card-content>
      </va-card>
    </div>

    <!-- Statistics -->
    <div class="row flex">
      <table style="width: 100%">
        <colgroup>
          <col width="40%" />
          <col width="20%" />
          <col width="40%" />
        </colgroup>
        <thead></thead>
        <tbody>
          <!-- TODO 클래스 주입으로 css적용 -->
          <tr v-for="row in statistics" :key="row.title">
            <td :class="{ superier: row.condition }">
              {{ row.playerData }}
            </td>
            <td>{{ row.title }}</td>
            <td :class="{ superier: !row.condition }">
              {{ row.opponentData }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Related game result list -->
    <PlayerGameResultListCard
      class="flex md12 sm12"
      :gameResultList="relatedGameResultList"
    />
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import PlayerGameResultListCard from "@/components/PlayerGameResultListCard.vue";
import HaleyGGAPI from "@/plugins/haleygg-api.js";
import { useRouter } from "vue-router";

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

    const relatedGameResultList = ref([]);
    const isFetched = ref(false);
    const statistics = ref(null);
    // let playerProfile;
    // let opponentProfile;
    let playerWins = 0;
    let opponentWins = 0;
    let playerRankData;
    let opponentRankData;

    onMounted(async () => {
      try {
        let response = await HaleyGGAPI.fetchProfile(props.playerName);
        // playerProfile = response.data;
        // response = await HaleyGGAPI.fetchProfile(props.opponentName);
        // opponentProfile = response.data;

        response = await HaleyGGAPI.fetchGameResult({
          players: [props.playerName, props.opponentName],
        });
        relatedGameResultList.value = response.data;

        response = await HaleyGGAPI.fetchStatistics({
          category: "win_count_rank"
        });
        playerRankData = response.data.find(rank => {
          return rank.player_name == props.playerName
        });
        opponentRankData = response.data.find(rank => {
          return rank.player_name == props.opponentName
        });
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          router.push("/PlayerDoesNotExist");
        }
      }

      // TODO
      // utils에 있는 aggregator를 이용하기
      // 이용하려면 각 플레이어의 전체 데이터를 갖고와야하는데,
      // relatedGameResultList와 겹치지 않는지?
      aggregateGameResultList();
      aggregateStatistics();

      isFetched.value = true;
    });

    const aggregateGameResultList = () => {
      let totalGames = 0;
      relatedGameResultList.value.forEach(gameResult => {
        if(gameResult.game_type != "melee"){
          return;
        }
        
        totalGames++;
        if((gameResult.players[0].win_state && gameResult.players[0] == props.playerName) ||
          (gameResult.players[1].win_state && gameResult.players[1] == props.playerName)){
          playerWins++;
        }
      });
      opponentWins = totalGames - playerWins;
    };

    const aggregateStatistics = () => {

      statistics.value = [];

      statistics.value.push({
        title: "상대 전적",
        playerData: `${playerWins}승 ${opponentWins}패`,
        opponentData: `${opponentWins}승 ${playerWins}패`,
        condition: playerWins > opponentWins
      });

      
      statistics.value.push({
        title: "다승 랭킹",
        playerData: `${playerRankData.melee_win_count_rank}위`,
        opponentData: `${opponentRankData.melee_win_count_rank}위`,
        condition: playerRankData.melee_win_count_rank >
                   opponentRankData.melee_win_count_rank
      });

      statistics.value.push({
        title: "대종족전 승률",
        playerData: ``,
        opponentData: ``,
        condition: false
      });
    };



    return {
      isFetched,
      relatedGameResultList,
      statistics
    };
  },
});
</script>

<style scoped>
.flex {
  padding: 0.25rem;
}
.player-name {
  align-self: center;
  text-align: center;
  font-size: 3rem;
}
.versus {
  font-size: 2rem;
  align-self: center;
  text-align: center;
}
th,
td {
  text-align: center;
  border: solid 1px lightgray;
  padding: 0.5rem;
}
.superier {
  background-color: lightblue;
}
</style>
