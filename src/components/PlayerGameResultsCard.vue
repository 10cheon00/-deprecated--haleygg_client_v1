<template>
  <div>
    <va-card>
      <va-card-title class="user-gameresult">Recent Games</va-card-title>
      <va-card-content>
        <table
          class="va-table va-table--striped va-table--hoverable"
          style="width: 100%"
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>League</th>
              <th>Description</th>
              <th>Winners</th>
              <th>Losers</th>
              <th>Map</th>
              <th>remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gameResult in paginatedGameResults" :key="gameResult.id">
              <td>{{ gameResult.date }}</td>
              <td>{{ gameResult.league }}</td>
              <td>{{ gameResult.description }}</td>
              <td>
                <div v-for="player in gameResult.winners" :key="player">
                  <p>{{ player.user }} ({{ player.race }})</p>
                </div>
              </td>
              <td>
                <div v-for="player in gameResult.losers" :key="player">
                  <p>{{ player.user }} ({{ player.race }})</p>
                </div>
              </td>
              <td>{{ gameResult.map }}</td>
              <td>{{ gameResult.remarks }}</td>
            </tr>
          </tbody>
        </table>
        <va-divider />
        <!-- Paginator -->
        <div class="row justify--center">
          <va-pagination
            flat
            size="small"
            v-model="pageNumber"
            :pages="gameResultsLength"
            :visible-pages="5"
          />
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    gameResults: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const itemsInPageCount = 4;
    const pageNumber = ref(1);
    const gameResultsLength = computed(() => {
      return Math.ceil(props.gameResults.length / itemsInPageCount);
    });
    const paginatedGameResults = computed(() => {
      if (Array.isArray(props.gameResults)) {
        return props.gameResults.slice(
          itemsInPageCount * pageNumber.value - itemsInPageCount,
          itemsInPageCount * pageNumber.value
        );
      } else {
        return [];
      }
    });

    return {
      gameResultsLength,
      paginatedGameResults,
      pageNumber,
    };
  },
});
</script>

<style scoped>
th,
td {
  text-align: center;
  vertical-align: middle;
}

td {
  height: 5rem;
}
</style>