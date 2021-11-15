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
        <thead>
        </thead>
        <tbody>
          <!-- TODO 클래스 주입으로 css적용 -->
          <tr>
            <td :class="{'superier': superier[0]}" >3승 0패</td>
            <td>상대 전적</td>
            <td :class="{'superier': !superier[0]}">0승 3패</td>
          </tr>
          <tr>
            <td :class="{'superier': superier[1]}">1위</td>
            <td>다승 순위</td>
            <td :class="{'superier': !superier[1]}">22위</td>
          </tr>
          <tr>
            <td :class="{'superier': superier[2]}">30.4%</td>
            <td>상대 종족전 승률</td>
            <td :class="{'superier': !superier[2]}">93.5%</td>
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
import { fetchPlayerInformationRelatedWithOpponentUsingAxios } from "@/plugins/player-information-fetcher.js";

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
    const relatedGameResultList = ref([]);
    const isFetched = ref(false);
    const playerWinningRate = 15.3;
    const opponentWinningRate = 100 - playerWinningRate;
    let superier = [true, false, true];

    onMounted(async () => {
      const response = 
        await fetchPlayerInformationRelatedWithOpponentUsingAxios(
          props.playerName,
          props.opponentName
        );
      relatedGameResultList.value = response.data.game_result_list;

      isFetched.value = true;
    });

    return {
      isFetched,
      relatedGameResultList,
      playerWinningRate,
      opponentWinningRate,
      superier
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
th, td{
  text-align: center;
  border: solid 1px lightgray;
  padding: 0.5rem;
}
.superier {
  background-color: lightblue
}
</style>
