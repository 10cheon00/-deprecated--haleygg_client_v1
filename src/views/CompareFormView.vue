<template>
  <div>
    <div class="row items">
      <va-select
        placeholder="Player Name"
        type="text"
        v-model="playerName"
        :options="removedSelectedOpponentNameList"
        class="flex md4"
      >
      </va-select>
      <div class="flex md1 text--center">Versus</div>
      <va-select
        placeholder="Player Name"
        type="text"
        class="flex md4"
        v-model="opponentName"
        :options="removedSelectedPlayerNameList"
      >
      </va-select>
      <div class="flex row md3 justify--center">
        <va-button 
          class="flex md10"
          :rounded="false"
          @click="compare()"
        >Compare</va-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import HaleyGGAPI from "@/plugins/haleygg-api.js";

export default defineComponent({
  setup() {
    const router = useRouter();
    const playerName = ref("");
    const opponentName = ref("");
    const playerNameList = ref([]);
    const removedSelectedPlayerNameList = computed(() => {
      return playerNameList.value.filter(name => {
        return name != playerName.value
      });
    });
    const removedSelectedOpponentNameList = computed(() => {
      return playerNameList.value.filter(name => {
        return name != opponentName.value
      });
    });

    const compare = () => {
      if(playerName.value.length > 0 &&
       opponentName.value.length > 0){
        router.push({
          name: "ComparedResultView",
          params: {
            playerName: playerName.value,
            opponentName: opponentName.value
          }
        });
      }
    };

    onMounted(async () => {
      try{
        const response = await HaleyGGAPI.fetchProfileList();
        response.data.forEach(profile => {
          playerNameList.value.push(profile.name);
        });
      } catch(error){
        console.log(error);
        if (error.response.status == 404) {
          router.push("/ErrorOnPage");
        }
      }
    });


    return {
      playerName,
      opponentName,
      removedSelectedPlayerNameList,
      removedSelectedOpponentNameList,
      compare
    };
  },
});
</script>

<style scoped>
.items {
  margin: 1rem;
}
</style>