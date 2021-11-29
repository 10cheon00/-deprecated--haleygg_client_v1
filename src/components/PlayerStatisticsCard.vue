<template>
  <div class="row">
    <div class="flex md12 win-rate">
      <va-card square outlined stripe>
        <va-card-title>Total Win Rate</va-card-title>
        <va-card-content>
          <div class="row text--center">
            <div class="flex md6 summary summary-melee">
              <div class="summary-title">밀리</div>
              <div class="summary-value">
                {{ summary.melee_winning_rate }}%
              </div>
            </div>
            <div class="flex md6 summary">
              <div class="summary-title">팀플</div>
              <div class="summary-value">
                {{ summary.top_and_bottom_winning_rate }}%
              </div>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
    <div class="flex md12">
      <va-card square outlined stripe>
        <va-card-title>Statistics</va-card-title>
        <va-card-content>
          <va-divider dashed/>
          <div v-for="statistic in statistics" :key="statistic.title">
            <div class="statistics">
              <span class="statistic-title">
                {{ statistic.title }}
              </span>
              <span class="statistic-value">
                {{ statistic.value }}
              </span>
            </div>
            <va-divider dashed/>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from "vue";

export default defineComponent({
  props: {
    rawStatistics: {
      type: Object,
      required: true,
    },
    ranking: {
      type: Object,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const statistics = ref(null);
    const summary = ref({});

    const calculateStatistics = () => {
      statistics.value = props.rawStatistics;
      calculateMeleeStatistics();
      calculateTopAndBottomStatistics();
      calculateProtossStatistics();
      calculateTerranStatistics();
      calculateZergStatistics();
    };

    const calculateMeleeStatistics = () => {
      statistics.value.melee_lose_count =
        statistics.value.melee_game_count - statistics.value.melee_win_count;
      statistics.value.melee_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.melee_win_count,
        statistics.value.melee_game_count
      );
    };

    const calculateTopAndBottomStatistics = () => {
      statistics.value.top_and_bottom_lose_count =
        statistics.value.top_and_bottom_game_count -
        statistics.value.top_and_bottom_win_count;
      statistics.value.top_and_bottom_winning_rate =
        calculatePercentageWithWinAndLose(
          statistics.value.top_and_bottom_win_count,
          statistics.value.top_and_bottom_game_count
        );
    };

    const calculateProtossStatistics = () => {
      statistics.value.pvp_lose_count =
        statistics.value.pvp_game_count - statistics.value.pvp_win_count;
      statistics.value.pvt_lose_count =
        statistics.value.pvt_game_count - statistics.value.pvt_win_count;
      statistics.value.pvz_lose_count =
        statistics.value.pvz_game_count - statistics.value.pvz_win_count;

      statistics.value.protoss_total_win_count =
        statistics.value.pvp_win_count +
        statistics.value.pvt_win_count +
        statistics.value.pvz_win_count;

      statistics.value.protoss_total_lose_count =
        statistics.value.pvp_lose_count +
        statistics.value.pvt_lose_count +
        statistics.value.pvz_lose_count;

      statistics.value.protoss_total_game_count =
        statistics.value.protoss_total_lose_count +
        statistics.value.protoss_total_win_count;

      statistics.value.pvp_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.pvp_win_count,
        statistics.value.pvp_game_count
      );
      statistics.value.pvt_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.pvt_win_count,
        statistics.value.pvt_game_count
      );
      statistics.value.pvz_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.pvz_win_count,
        statistics.value.pvz_game_count
      );
      statistics.value.protoss_total_winning_rate =
        calculatePercentageWithWinAndLose(
          statistics.value.protoss_total_win_count,
          statistics.value.protoss_total_game_count
        );
    };

    const calculateTerranStatistics = () => {
      statistics.value.tvp_lose_count =
        statistics.value.tvp_game_count - statistics.value.tvp_win_count;
      statistics.value.tvt_lose_count =
        statistics.value.tvt_game_count - statistics.value.tvt_win_count;
      statistics.value.tvz_lose_count =
        statistics.value.tvz_game_count - statistics.value.tvz_win_count;

      statistics.value.terran_total_win_count =
        statistics.value.tvp_win_count +
        statistics.value.tvt_win_count +
        statistics.value.tvz_win_count;

      statistics.value.terran_total_lose_count =
        statistics.value.tvp_lose_count +
        statistics.value.tvt_lose_count +
        statistics.value.tvz_lose_count;

      statistics.value.terran_total_game_count =
        statistics.value.terran_total_lose_count +
        statistics.value.terran_total_win_count;

      statistics.value.tvp_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.tvp_win_count,
        statistics.value.tvp_game_count
      );
      statistics.value.tvt_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.tvt_win_count,
        statistics.value.tvt_game_count
      );
      statistics.value.tvz_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.tvz_win_count,
        statistics.value.tvz_game_count
      );

      statistics.value.terran_total_winning_rate =
        calculatePercentageWithWinAndLose(
          statistics.value.terran_total_win_count,
          statistics.value.terran_total_game_count
        );
    };

    const calculateZergStatistics = () => {
      statistics.value.zvp_lose_count =
        statistics.value.zvp_game_count - statistics.value.zvp_win_count;
      statistics.value.zvt_lose_count =
        statistics.value.zvt_game_count - statistics.value.zvt_win_count;
      statistics.value.zvz_lose_count =
        statistics.value.zvz_game_count - statistics.value.zvz_win_count;

      statistics.value.zerg_total_win_count =
        statistics.value.zvp_win_count +
        statistics.value.zvt_win_count +
        statistics.value.zvz_win_count;

      statistics.value.zerg_total_lose_count =
        statistics.value.zvp_lose_count +
        statistics.value.zvt_lose_count +
        statistics.value.zvz_lose_count;

      statistics.value.zerg_total_game_count =
        statistics.value.zerg_total_lose_count +
        statistics.value.zerg_total_win_count;

      statistics.value.zvp_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.zvp_win_count,
        statistics.value.zvp_game_count
      );
      statistics.value.zvt_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.zvt_win_count,
        statistics.value.zvt_game_count
      );
      statistics.value.zvz_winning_rate = calculatePercentageWithWinAndLose(
        statistics.value.zvz_win_count,
        statistics.value.zvz_game_count
      );

      statistics.value.zerg_total_winning_rate =
        calculatePercentageWithWinAndLose(
          statistics.value.zerg_total_win_count,
          statistics.value.zerg_total_game_count
        );
    };

    const calculatePercentageWithWinAndLose = (wins, games) => {
      const result = Math.floor((wins / games) * 1000) / 10;
      if (isNaN(result)) {
        return 0;
      }
      return result;
    };

    const summaryStatistics = () => {
      summary.value.melee_winning_rate = statistics.value.melee_winning_rate;
      summary.value.top_and_bottom_winning_rate =
        statistics.value.top_and_bottom_winning_rate;
    };

    const combineStatisticsToString = () => {
      const result = [];
      result.push({
        title: `밀리 다승`,
        value: `${props.ranking.melee_win_count_rank}등`
      });

      result.push({
        title: `팀플 다승`,
        value: `${props.ranking.top_and_bottom_win_count_rank}등`
      })

      result.push({
        title: `밀리`,
        value: `
          ${statistics.value.melee_win_count}승
          ${statistics.value.melee_lose_count}패`,
      });

      result.push({
        title: `팀플`,
        value: `
          ${statistics.value.top_and_bottom_win_count}승
          ${statistics.value.top_and_bottom_lose_count}패`,
      });

      result.push({
        title: `프로토스 승률`,
        value: `
        ${statistics.value.protoss_total_winning_rate}%,
        ${statistics.value.protoss_total_win_count}승 
        ${statistics.value.protoss_total_lose_count}패`,
      });

      result.push({
        title: `테란 승률`,
        value: `
        ${statistics.value.terran_total_winning_rate}%,
        ${statistics.value.terran_total_win_count}승 
        ${statistics.value.terran_total_lose_count}패`,
      });

      result.push({
        title: `저그 승률`,
        value: `
        ${statistics.value.zerg_total_winning_rate}%,
        ${statistics.value.zerg_total_win_count}승 
        ${statistics.value.zerg_total_lose_count}패`,
      });

      statistics.value = result;
    };

    onMounted(() => {
      calculateStatistics();
      summaryStatistics();
      combineStatisticsToString();
    });

    onUpdated(() => {
      calculateStatistics();
      summaryStatistics();
      combineStatisticsToString();
    });

    return {
      statistics,
      summary,
    };
  },
});
</script>

<style scoped>
.win-rate {
  margin-bottom: 0.5rem;
}
.summary {
  font-weight: bold;
}
.summary-title {
  margin-bottom: 0.5rem;
}
.summary-ranking {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.summary-value {
  font-size: 2.5rem;
}
.summary-melee {
  border-right: dashed 1px lightgray;
}
.statistics {
  display: flex;
  justify-content: space-between;
}
.statistic-value {
  font-weight: bold;
}
</style>