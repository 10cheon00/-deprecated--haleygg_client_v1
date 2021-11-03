<template>
  <div class="row align--center justify--center">
    <div class="flex md12 sm12 xs12 title">{{ title }}</div>
    <div class="flex md12 sm12 xs12">
      <svg class="percentage-bar" :viewBox="viewBox" style="max-height: 140px">
        <path
          fill="none"
          stroke-linecap="straight"
          :stroke-width="strokeWidth"
          stroke="#EEEEEE"
          :stroke-dasharray="maxLength"
          :d="pathCommand"
        />
        <path
          fill="none"
          stroke-linecap="straight"
          :stroke-width="strokeWidth"
          :stroke="color"
          :stroke-dasharray="strokeLength"
          :d="pathCommand"
        />
        <text
          text-anchor="middle"
          dominant-baseline="middle"
          x="50%"
          y="52%"
          style="font: 0.5rem; font-weight: bold;"
        >
          {{ percentage }}%
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    percentage: {
      type: Number,
      required: true,
      validator: (value) => {
        return 0 <= value && value <= 100;
      },
    },
    color: {
      type: String,
      default: "#28A745",
    },
    size: {
      type: Number,
      default: 50,
    },
  },
  setup(props) {
    //M50 20  Move to (50,20) ... 50 = x value of center of circle , 20 = y value of center of circle substract radius
    //a 30 30 0 0 1 0 60  a is angle. 30 30 is (30, 30) (radius, radius) 0 0 1 0 .. what is this. last element is double radius
    //a 30 30 0 0 1 0 -60
    const radius = props.size * 0.8;
    const viewBox = ref(`0 0 ${props.size * 2} ${props.size * 2}`);
    const maxLength = radius * 2 * Math.PI;
    const strokeWidth = ref(radius * 0.375);
    const strokeLength = computed(() => {
      return `${(maxLength / 100) * props.percentage} ${maxLength}`;
    });
    const pathCommand = ref(
      `M${props.size} ${props.size - radius} 
      a ${radius} ${radius} 0 0 1 0 ${radius * 2} 
      a ${radius} ${radius} 0 0 1 0 ${radius * -2}`
    );
    return {
      viewBox,
      pathCommand,
      strokeWidth,
      strokeLength,
      maxLength,
    };
  },
});
</script>

<style scoped>
.title {
  color: var(--va-dark);
  font: 0.5rem;
  font-weight: bold;
}
</style>