<template>
  <div>
    <va-card square outlined stripe>
      <va-card-title>
        <div>Recent Games</div>
      </va-card-title>
      <va-card-content>
        <!-- Game result list -->
        <div v-for="gameResult in gameResultList" :key="gameResult.id">
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
            <div class="flex xl2 lg2 md2 sm2">
              <div v-for="player in gameResult.playerA" :key="player.name">
                <div
                  :class="{
                    you: player.name == you,
                    'not-you': player.name != you,
                    'player-a': true,
                  }"
                >
                  <router-link :to="{ path: '/player/' + player.name }">
                    {{ player.name }} ({{ player.race }})
                  </router-link>
                  &nbsp;
                  <va-badge v-if="player.win_state" text="W" color="primary" />
                  <va-badge v-else text="L" color="danger" />
                </div>
              </div>
            </div>

            <!-- map -->
            <div class="flex xl2 lg2 md2 sm2">
              {{ gameResult.map }}
            </div>

            <!-- player B -->
            <div class="flex xl2 lg2 md2 sm2">
              <div v-for="player in gameResult.playerB" :key="player.name">
                <div
                  :class="{
                    you: player.name == you,
                    'not-you': player.name != you,
                    'player-b': true,
                  }"
                >
                  <va-badge v-if="player.win_state" text="W" color="primary" />
                  <va-badge v-else text="L" color="danger" />&nbsp;
                  <router-link :to="{ path: '/player/' + player.name }">
                    {{ player.name }} ({{ player.race }})
                  </router-link>
                </div>
              </div>
            </div>

            <!-- remarks -->
            <div class="flex xl3 lg3 md3 sm3">
              {{ gameResult.remarks }}
            </div>
          </div>
        </div>

        <!-- Load more button -->
        <div 
          v-if="isNextURLExists()" 
          class="load-more-button" 
          @click="callFetchNextGameResultListMethod"
        >
          <div v-if="isNextGameResultFetched">
            <va-icon size="large" name="update" />
            <span>Load more</span>
          </div>
          <div v-else>
            <va-progress-circle indeterminate />
          </div>
        </div>
        <va-divider />
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent, onUpdated, onMounted, inject, ref } from "vue";

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
    
    const isNextURLExists = inject("isNextURLExists", false);
    const fetchNextGameResultList = inject("fetchNextGameResultList");
    const isNextGameResultFetched = ref(true);

    onMounted(() => {
      decorateGameResult();
      splitPlayersToTwoGroup();
      console.log(props.gameResultList)
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
          if (index % 2 == 0) {
            //even
            gameResult.playerA.push(player);
          } else {
            gameResult.playerB.push(player);
          }
        });
      });
    };

    const callFetchNextGameResultListMethod = async () => {
      isNextGameResultFetched.value = false;
      await fetchNextGameResultList();
      isNextGameResultFetched.value = true;
    };

    return {
      isNextGameResultFetched,
      isNextURLExists,
      callFetchNextGameResultListMethod
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

.player-a {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.player-b {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.load-more-button {
  margin-top: 0.25rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px lightgray;
  background-color: Gainsboro;
}
</style>