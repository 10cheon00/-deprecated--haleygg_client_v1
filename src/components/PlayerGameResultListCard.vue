<template>
  <div>
    <va-card>
      <va-card-title class="user-gameresult">Recent Games</va-card-title>
      <va-card-content>
        <div
          v-for="gameResult in gameResultList"
          :key="gameResult.id"
        >
          <div
            class="row game-result"
            :style="gameResult.winStateDecorator"
          >
            <div class="flex xl4 lg4 md4 sm4">
              <div class="league">
                {{ gameResult.league }} {{ gameResult.description }}
              </div>
              <div class="date">
                {{ gameResult.date }}
                </div>
            </div>
            <div class="flex xl2 lg2 md2 sm2">
              <div v-for="player in gameResult.winners" :key="player.name">
                <div v-if="player.name == you" class="you">
                  {{ player.name }} ({{ player.race }})
                </div>
                <div v-else class="notYou">
                  {{ player.name }} ({{ player.race }})
                </div>
              </div>
            </div>
            <div class="flex xl2 lg2 md2 sm2">
              {{ gameResult.map }}
            </div>
            <div class="flex xl2 lg2 md2 sm2">
              <div v-for="player in gameResult.losers" :key="player.name">
                <div v-if="player.name == you" class="you">
                  {{ player.name }} ({{ player.race }})
                </div>
                <div v-else class="notYou">
                  {{ player.name }} ({{ player.race }})
                </div>
              </div>
            </div>
            <div class="flex xl2 lg2 md2 sm2">
              {{ gameResult.remarks }}
            </div>
          </div>
        </div>

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
import { ref, computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  components: {},
  props: {
    gameResultList: {
      type: Array,
      required: true,
    },
    you: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    onMounted(() => {
      if (props.you != undefined) {
        const isPlayerWin = (username, winners) => {
          return winners.some((e) => e["name"] == username);
        };
        props.gameResultList.forEach((gameResult) => {
          if (isPlayerWin(props.you, gameResult.winners)) {
            gameResult.winStateDecorator = {
              "border-left": "solid 0.25rem #007bff",
            };
          } else {
            gameResult.winStateDecorator = {
              "border-left": "solid 0.25rem #dc3545",
            };
          }
        });
      }
    });

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
.game-result {
  height: 5rem;
  align-items: center;
  text-align: center;
  margin-top: 0.25rem;
  background-color: #f8f9fa;
}

.game-result .date {
  font-size: 80%;
  color: grey;
  margin-top: 0.25rem;
}

.game-result .you {
  font-weight: bold;
}

.game-result .notYou {
  color: grey;
}
</style>