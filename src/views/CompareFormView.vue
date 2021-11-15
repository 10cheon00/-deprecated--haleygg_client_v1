<template>
  <div>
    <div class="row items">
      <va-input
        placeholder="Player Name"
        type="text"
        v-model="playerName"
        class="flex md4"
      >
      </va-input>
      <div class="flex md1 text--center">Versus</div>
      <va-input
        placeholder="Player Name"
        type="text"
        class="flex md4"
        v-model="opponentName"
      >
      </va-input>
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const playerName = ref("");
    const opponentName = ref("");
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

    return {
      playerName,
      opponentName,
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