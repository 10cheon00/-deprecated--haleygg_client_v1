<template>
  <div>
    <va-card square outlined>
      <va-card-title>Elo Chart</va-card-title>
      <va-card-content>
        <LineChart :chartData="testData" :options="options" />
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
    const testData = {
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
      testData,
      options,
    };
  },
});
</script>
