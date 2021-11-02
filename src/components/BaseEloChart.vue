<template>
  <div>
    <vue-chart height="200px" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  components: {
    "vue-chart": VueApexCharts,
  },
  setup() {
    return {
      chartOptions: {
        title: {
          text: "Elo",
          align: "center",
          style: {
            fontFamily: 'Source Sans Pro'
          }
        },
        chart: {
          type: "line",
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: false,
          },
        },
        markers: {
          size: [5],
        },
        xaxis: {
          type: "datetime",
          // labels: {
          //   format: {

          //   }
          // }
          min: new Date("2021-10-21").getTime(),
          max: new Date("2021-10-29").getTime()
        },
      },
      series: [
        {
          name: "Elo",
          data: [
            [new Date("2021-10-21").getTime(), 1220],
            [new Date("2021-10-22").getTime(), 1210],
            [new Date("2021-10-23").getTime(), 1190],
            [new Date("2021-10-24").getTime(), 1205],
            [new Date("2021-10-25").getTime(), 1205],
            [new Date("2021-10-26").getTime(), 1234],
            [new Date("2021-10-27").getTime(), 1199],
            [new Date("2021-10-28").getTime(), 1302],
            [new Date("2021-10-29").getTime(), 1255]
          ],
        },
      ],
    };
  },
});
</script>
