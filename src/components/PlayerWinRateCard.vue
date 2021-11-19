<template>
  <div>
    <va-card square outlined>
      <va-card-title>Win Rate</va-card-title>
      <va-card-content>
        <div class="row">
          <div class="flex xl4 lg4 md4 sm6 xs6">
            <table style="width:100%; height:100%">
              <colgroup>
                <col width=30%/>
                <col width=70%/>
              </colgroup>
              <tbody>
                <tr v-for="row in rankSheet" :key="row.title">
                  <th>{{ row.title }}</th>
                  <td>
                    <div class="sheet-data">
                      <va-badge text="G" color="primary"/>
                      <span>&nbsp;{{ row.value.games }}&nbsp;</span>
                      <va-badge text="W" color="success"/>
                      <span>&nbsp;{{ row.value.wins }}&nbsp;</span>
                      <va-badge v-if="row.value.rank == 1"
                        text="1st" color="#FFD700"
                      />
                      <va-badge v-else-if="row.value.rank == 2"
                        text="2nd" color="#C0C0C0"
                      />
                      <va-badge v-else-if="row.value.rank == 3"
                        text="3rd" color="#CD7F32"
                      />
                      <va-badge v-else
                        :text="`${row.value.rank}th`" color="#000000"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex xl8 lg8 md8 sm6 xs6">
            <BarChart 
              v-if="rankChartData"
              :chartData="rankChartData" 
              :options="options" 
              :plugins="plugins" 
              :height="309"
            />
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>

import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { BarChart } from "vue-chart-3";
import ChartDataLabels from "chartjs-plugin-datalabels";

import getCustomVuesticConfig from "@/plugins/custom-vuestic-config.js";

export default defineComponent({
  props: {
    aggregatedResult: {
      type: Object,
      required: true,
    },
    rank: {
      type: Object,
      required: true
    }
  },
  components: {
    BarChart,
  },
  setup(props) {
    const rankChartData = ref(null);
    const rankData = ref(null);
    const options = ref(null);
    const plugins = [
      ChartDataLabels
    ];
    const rankSheet = ref(null);

    onMounted(() => {
      parseWinRate();
      initializeChart();
    });

    onUpdated(() => {
      parseWinRate();
      initializeChart();
    });
     
    const parseWinRate = () => {
      rankData.value = [];
      rankData.value.push(
        { name: "개인전", value : props.aggregatedResult.melee.total.rate },
        { name: "팀전", value : props.aggregatedResult.topAndBottom.rate },
        { name: "vs P", value : props.aggregatedResult.melee.P.rate },
        { name: "vs T", value : props.aggregatedResult.melee.T.rate },
        { name: "vs Z", value : props.aggregatedResult.melee.Z.rate }
      )
      rankSheet.value = [];
      rankSheet.value.push(
        { 
          title: "개인전",
          value: {
            games: props.aggregatedResult.melee.total.games,
            wins: props.aggregatedResult.melee.total.wins,
            rank: props.rank.melee_win_count_rank
          }
        },
        {
          title: "팀전",
          value: {
            games: props.aggregatedResult.topAndBottom.games,
            wins: props.aggregatedResult.topAndBottom.wins,
            rank: props.rank.top_and_bottom_win_count_rank
          }
        },
        {
          title: "vs P",
          value: {
            games: props.aggregatedResult.melee.P.games,
            wins: props.aggregatedResult.melee.P.wins,
            rank: props.rank.versus_protoss_win_count_rank
          }
        },
        {
          title: "vs T",
          value: {
            games: props.aggregatedResult.melee.T.games,
            wins: props.aggregatedResult.melee.T.wins,
            rank: props.rank.versus_terran_win_count_rank
          }
        },
        {
          title: "vs Z",
          value: {
            games: props.aggregatedResult.melee.Z.games,
            wins: props.aggregatedResult.melee.Z.wins,
            rank: props.rank.versus_zerg_win_count_rank
          }
        },
      );
    };

    const initializeChart = () => {
      const config = getCustomVuesticConfig();
      rankChartData.value = {
        datasets: [{
          data: rankData.value,
          backgroundColor: [
            config.colors.success,
            config.colors.info,
            config.colors.protoss,
            config.colors.terran,
            config.colors.zerg
          ]
        }]
      };
      options.value = {
        animation: false,
        borderColor: "#babfc2",
        indexAxis: "y",
        layout: {
          padding: {
            right: 50,
          }
        },
        parsing: {
          xAxisKey: "value",
          yAxisKey: "name"
        },
        plugins: {
          datalabels: {
            align: "end",
            anchor: "end",
            clamp: true,
            display: "auto",
            formatter(data) {
              return `${data.value}%`;
            },
            offset: 4
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100
          }
        }
      };
    };
    
    return {
      rankChartData,
      options,
      plugins,
      rankSheet
    };
  },
});
</script>

<style scoped>
th, td {
  vertical-align: middle;
}
th {
  text-align: center;
  background-color: darkgrey;
  color: white;
}
td {
  padding: 0.5rem;
}
tbody, td, th {
  border: solid 1px lightgray;
}
.sheet-data {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>