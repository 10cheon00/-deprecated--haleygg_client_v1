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
            <tr v-for="gameResult in paginatedGameResultList" :key="gameResult.id">
              <td>{{ gameResult.date }}</td>
              <td>{{ gameResult.league }}</td>
              <td>{{ gameResult.description }}</td>
              <td>
                <div v-for="player in gameResult.winners" :key="player">
                  <p>{{ player.name }} ({{ player.race }})</p>
                </div>
              </td>
              <td>
                <div v-for="player in gameResult.losers" :key="player">
                  <p>{{ player.name }} ({{ player.race }})</p>
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
            :pages="gameResultListLength"
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
    gameResultList: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const itemsInPageCount = 10;
    const pageNumber = ref(1);
    const gameResultListLength = computed(() => {
      return Math.ceil(props.gameResultList.length / itemsInPageCount);
    });
    const paginatedGameResultList = computed(() => {
      if (Array.isArray(props.gameResultList)) {
        return props.gameResultList.slice(
          itemsInPageCount * pageNumber.value - itemsInPageCount,
          itemsInPageCount * pageNumber.value
        );
      } else {
        return [];
      }
    });

    return {
      gameResultListLength,
      paginatedGameResultList,
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