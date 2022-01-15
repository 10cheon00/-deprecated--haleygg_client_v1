<template>
  <div>
    <va-card square outlined class="game-result-form">
      <va-card-title>게임 결과</va-card-title>
      <va-card-content>
        <div class="row">
          <va-date-input
            class="flex md4 sm12"
            placeholder="날짜"
            v-model="formResult.date"
          />
          <va-select
            class="flex md4 sm12"
            placeholder="리그"
            v-model="formResult.league"
            :options="clanData.leagueList"
          />
          <va-input
            class="flex md4 sm12"
            placeholder="라운드"
            v-model="formResult.title"
          />
        </div>
        <va-divider dashed />
        <div class="row align--start">
          <div class="flex md4">
            <div class="row justify--center">
              <va-select
                class="flex md12 player-name"
                placeholder="승자"
                v-model="formResult.winners"
                :options="clanData.playerList"
              />
              <va-button-toggle
                class="flex"
                flat
                size="small"
                v-model="formResult.winnersRace"
                :options="raceList"
                :rounded="false"
              />
            </div>
          </div>
          <div class="flex md4">
            <div class="row justify--center">
              <va-select
                class="flex md12 player-name"
                placeholder="패자"
                v-model="formResult.losers"
                :options="clanData.playerList"
              />
              <va-button-toggle
                class="flex"
                flat
                size="small"
                v-model="formResult.losersRace"
                :options="raceList"
                :rounded="false"
              />
            </div>
          </div>
          <va-select
            class="flex md4"
            placeholder="맵"
            v-model="formResult.map"
            :options="clanData.mapList"
          />
        </div>
        <va-divider dashed />

        <div class="row">
          <va-input
            class="flex"
            placeholder="비고 (예: 기권승)"
            v-model="formResult.remark"
          />
          <va-button 
            class="flex" 
            color="danger" 
            icon="delete" 
            :rounded="false"
            @click="$emit('onDelete')"
          >
            이 게임 결과 삭제
          </va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";

export default defineComponent({
  props:{
    formTarget: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formResult = ref(props.formTarget);
    const raceList = [
      { label: "테란", value: "terran" },
      { label: "프로토스", value: "protoss" },
      { label: "저그", value: "zerg" },
    ];
    const clanData = inject("clanData");
    return {
      clanData,
      raceList,
      formResult
    };
  },
});
</script>

<style scoped>
.game-result-form {
  margin-bottom: 0.5rem;
}
.player-name {
  padding-bottom: 0.25rem;
}
</style>