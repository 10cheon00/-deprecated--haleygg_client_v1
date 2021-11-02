<template>
  <div>
    <div class="row">
      <div class="flex md12">Elo</div>
      <div class="flex md12">
        <LineChart style="height:200px" :chartData="testData" :options="options" />
      </div>
    </div>
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
      pointRadius: 10
    };

    return {
      testData,
      options,
    };
  },
});
</script>
