<template>
  <div>
    <!-- Top 3 players -->
    <va-card outlined square class="mb-3">
      <va-card-content>
        <div class="row align--center">
          <div class="flex md6 sm12 mb-3">
            1st
            <div class="player-name">
              {{ firstPlacePlayer.user_name }}
            </div>
            <div class="player-stats">
              {{ firstPlacePlayer.elo }} / {{ firstPlacePlayer.wins }}W - {{ firstPlacePlayer.loses }}L
            </div>
          </div>
          <div class="flex md6 row side-podium">
            <div class="flex md12 sm12 mb-3">
              2nd
              <div class="player-name">
                {{ secondPlacePlayer.user_name }}
              </div>
              <div class="player-stats">
                {{ secondPlacePlayer.elo }} / {{ secondPlacePlayer.wins }}W - {{ secondPlacePlayer.loses }}L
              </div>
            </div>
            <div class="flex md12 sm12">
              3rd
              <div class="player-name">
                {{ thirdPlacePlayer.user_name }}
              </div>
              <div class="player-stats">
                {{ thirdPlacePlayer.elo }} / {{ thirdPlacePlayer.wins }}W - {{ thirdPlacePlayer.loses }}L
              </div>
            </div>
          </div>
        </div>
      </va-card-content>
    </va-card>

    <!-- Elo Table -->
    <va-data-table class="elo-table" :items="eloDataList" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const eloDataList = [
      { user_name: "ABC", elo: 1000.0, wins: 30, loses: 16 },
      { user_name: "DEF", elo: 1020.2, wins: 2, loses: 1 },
      { user_name: "gaga", elo: 953.7, wins: 4, loses: 6 },
      { user_name: "13t", elo: 1209.3, wins: 17, loses: 5 },
      { user_name: "ba", elo: 945.5, wins: 3, loses: 8 },
    ];

    eloDataList.forEach((item, index) => {
      item.id = index + 1;
    });

    const firstPlacePlayer = eloDataList[0];
    const secondPlacePlayer = eloDataList[1];
    const thirdPlacePlayer = eloDataList[2];

    return {
      eloDataList,
      firstPlacePlayer,
      secondPlacePlayer,
      thirdPlacePlayer,
    };
  },
});
</script>

<style scoped>
.player-elo {
  font-size: 1.5em;
}
.player-name {
  font-weight: bold;
  font-size: 6em;
  margin-bottom: 1rem;
}
.player-stats {
  font-size: 1.5em;
}
.side-podium {
  font-size: 0.5rem;
}
</style>