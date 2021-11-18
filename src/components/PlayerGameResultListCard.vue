<template>
  <div>
    <va-card square outlined>
      <va-card-title>
        <div>Recent Games</div>
      </va-card-title>
      <va-card-content>
        <!-- Game result list -->
        <div v-for="gameResult in paginatedGameResultList" :key="gameResult.id">
          <div class="row game-result" :style="gameResult.winStateDecorator">
            <!-- date, league, description -->
            <div class="flex xl3 lg3 md3 sm3">
              <div class="league">
                {{ gameResult.league }} {{ gameResult.description }}
              </div>
              <div class="date">
                {{ gameResult.date }}
              </div>
            </div>

            <!-- player A -->
            <div class="flex xl3 lg3 md3 sm3 ">
              <div class="player-a" v-for="player in gameResult.playerA" :key="player.name">
                <div
                  :class="{
                    'you': player.name == you,
                    'not-you': player.name != you,
                  }"
                >
                  <router-link :to="{path: '/player/' + player.name,}">
                    {{ player.name }} ({{ player.race }})
                  </router-link>
                  &nbsp;
                  <va-badge v-if="player.win_state" text="W" color="primary"/>
                  <va-badge v-else text="L" color="danger"/>
                </div>
              </div>
            </div>

            <!-- map -->
            <div class="flex xl2 lg2 md2 sm2">
              {{ gameResult.map }}
            </div>

            <!-- player B -->
            <div class="flex xl3 lg3 md3 sm3">
              <div class="player-b" v-for="player in gameResult.playerB" :key="player.name">
                <div
                  :class="{
                    'you': player.name == you,
                    'not-you': player.name != you,
                  }"
                >
                  <va-badge v-if="player.win_state" text="W" color="primary"/>
                  <va-badge v-else text="L" color="danger"/>&nbsp;
                  <router-link :to="{ path: '/player/' + player.name }">
                    {{ player.name }} ({{ player.race }})
                  </router-link>
                </div>
              </div>
            </div>

            <!-- remarks -->
            <div class="flex xl1 lg1 md1 sm1">
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
import { ref, computed, defineComponent, onUpdated, onMounted } from "vue";

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
    const itemsInPageCount = 5;
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

    onMounted(() => {
      decorateGameResult();
      splitPlayersToTwoGroup();
    });
    onUpdated(() => {
      decorateGameResult();
      splitPlayersToTwoGroup();
    });

    const decorateGameResult = () => {
      if (props.you != undefined) {
        const isPlayerWin = (players, playerName) => {
          return players.some((e) => e["name"] == playerName && e["win_state"]);
        };
        props.gameResultList.forEach((gameResult) => {
          if (isPlayerWin(gameResult.players, props.you)) {
            gameResult.winStateDecorator = {
              "border-left": "solid 0.5rem #007bff",
              "border-right": "solid 0.5rem #007bff",
            };
          } else {
            gameResult.winStateDecorator = {
              "border-left": "solid 0.5rem #dc3545",
              "border-right": "solid 0.5rem #dc3545",
            };
          }
        });
      }
    };

    const splitPlayersToTwoGroup = () => {
      props.gameResultList.forEach((gameResult) => {
        gameResult.playerA = [];
        gameResult.playerB = [];
        gameResult.players.forEach((player, index) => {
          if(index%2 == 0){ //even
            gameResult.playerA.push(player);
          }
          else{
            gameResult.playerB.push(player);
          }
        });
      });
    }

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
  margin: 0.25rem;
}

.game-result .not-you {
  color: grey;
  margin: 0.25rem;
}

.game-result .player-a {
  display: flex;
  justify-content: flex-end;
}
.game-result .player-b {
  display: flex;
  justify-content: flex-start;
}
</style>