<template>
  <div>
    <svg class="percentage-bar" viewBox="0 0 100 100" >
      <path
        fill="none"
        stroke-linecap="round"
        stroke-width="8"
        stroke="#28a745"
        :stroke-dasharray="strokeLength"
        :d="pathCommand"
      />
      <text text-anchor="middle" dominant-baseline="middle" x="50%" y="50%" style="font-weight: bold;">{{ percentage }}%</text>
    </svg>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  props: {
    radius: {
      type: Number,
      required: true,
      validator: (value) => {
        return 0 <= value && value <= 50;
      },
    },
    percentage: {
      type: Number,
      required: true,
      validator: (value) => {
        return 0 <= value && value <= 100;
      },
    },
  },
  setup(props) {
    //M50 20  Move to (50,20) ... 50 = x value of center of circle , 20 = y value of center of circle substract radius
    //a 30 30 0 0 1 0 60  a is angle. 30 30 is (30, 30) (radius, radius) 0 0 1 0 .. what is this. last element is double radius
    //a 30 30 0 0 1 0 -60
    const maxLength = props.radius * 2 * Math.PI;
    const length = maxLength / 100 * props.percentage;
    const strokeLength = ref(length.toString() + " " + maxLength.toString());
    const pathCommand = ref(String);
    pathCommand.value = "M" + 50 + " " + (50-props.radius).toString() + " ";
    pathCommand.value += "a " + props.radius.toString() + " " + props.radius.toString() + " 0 0 1 0 " + (props.radius * 2).toString() + " ";
    pathCommand.value += "a " + props.radius.toString() + " " + props.radius.toString() + " 0 0 1 0 " + (props.radius * -2).toString() + " ";
    return {
      pathCommand,
      strokeLength
    };
  },
});
</script>
