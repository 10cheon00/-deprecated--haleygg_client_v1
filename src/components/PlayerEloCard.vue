<template>
  <div>
    <va-card square outlined stripe>
      <va-card-title>Elo Chart</va-card-title>
      <va-card-content>
        <LineChart class="chart" :chartData="eloData" :options="options"/>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    elo: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const eloData = {
      datasets: [
        {
          data: props.elo,
          backgroundColor: ["#77CEFF"],
        },
      ],
    };
    const options = {
      animation: false,
      borderColor: "#babfc2",
      parsing: {
        xAxisKey: "date",
        yAxisKey: "value",
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return {
      eloData,
      options,
    };
  },
});
</script>

<style scoped>
.chart{
  min-height: 394px;
  max-height: 394px;
}
</style>