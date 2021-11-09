<template>
  <div>
    <va-tabs v-model="currentLeague">
      <template #tabs>
        <va-tab
          v-for="league in leagueList"
          :key="league"
          :name="league"
          @click="selectLeague(league)"
        >
          {{ league }}
        </va-tab>
      </template>
    </va-tabs>

  </div>
</template>

<script>
import { inject, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const leagueList = inject("leagueList");
    const selectLeague = inject("selectLeague")
    const currentLeague = ref(leagueList.value[0]);
    return {
      selectLeague,
      leagueList,
      currentLeague
    };
  },
});
</script>
