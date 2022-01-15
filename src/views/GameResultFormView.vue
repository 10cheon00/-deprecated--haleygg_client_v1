<template>
  <div>
    <!-- title -->
    <va-card square outlined class="title-card">
      <va-card-content style="text-align: start">
        <h2 class="display-2">전적 추가</h2>
      </va-card-content>
    </va-card>

    <!-- Form -->
    <div
      v-for="value in gameResultFormList"
      :key="value.index">
      <game-result-form-card 
        :formTarget="value"
        @onDelete="deleteGameResultFormOfIndex(value.index)"
      />
    </div>

    <!-- buttons -->
    <div class="row justify--space-between">
      <va-button :rounded="false" icon="add" @click="addNewGameResultForm()">
        새 결과 추가
      </va-button>
      <va-button 
        color="success" 
        icon="save"
        :rounded="false"
      >
        저장
      </va-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, provide, ref } from "vue";
import GameResultFormCard from '@/components/GameResultFormCard.vue';


export default defineComponent({
  components: { 
    GameResultFormCard
  },
  setup() {
    const leagueList = ["A", "B", "C"];
    const mapList = ["A", "B", "C"];
    const playerList = ["AB", "BC", "CD"];
    provide('clanData', {
      'leagueList': leagueList,
      'mapList': mapList,
      'playerList': playerList
    });

    const gameResultFormCount = ref(0);
    const gameResultFormList = ref([]);
    // GameResultForm을 새로 추가하면... 각 객체마다 clanData를 주입해야하는데
    // provide로 원형을 제공하고 생성된 객체가 inject로 받아가는 방법을 생각함.
    // 그런데 GameResultForm을 어떻게 새로 추가하는지 모르겠다.
    // 리스트에 추가해서 관리하고 싶은데 리스트에 있는 gameREsultForm들을 어떻게
    // 템플릿에서 렌더할지도 모르겠다.
    const addNewGameResultForm = () => {
      const gameResultForm = {
        date: "",
        league: "",
        title: "",
        map: "",
        winners: null,
        winnersRace: "",
        losers: null,
        losersRace: "",
        remark: "",
      };
      gameResultFormList.value.push({
        'index': gameResultFormCount.value,
        'value': gameResultForm
      });
      gameResultFormCount.value += 1;
    };
    const deleteGameResultFormOfIndex = (index) => {
      gameResultFormList.value = gameResultFormList.value.filter(item => item.index != index);
    }

    return {
      gameResultFormList,
      addNewGameResultForm,
      deleteGameResultFormOfIndex
    };
  },
});
</script>

<style scoped>
.title-card {
  margin-bottom: 0.5rem;
}
</style>
