<template>
  <div>
    <va-select
      v-model="currentLeague"
      :options="options"
      @update:model-value="selectLeague(currentLeague)"
    />
  </div>
</template>

<script>
import { inject, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const leagueList = inject("leagueList");
    const selectLeague = inject("selectLeague")
    const currentLeague = ref(leagueList.value[0]);
    const options = ref(leagueList);
    return {
      currentLeague,
      options,
      selectLeague,
    };
  },
});
</script>
