<template>
  <div class="layout">
    <va-card>
      <va-card-title>
        <va-icon name="warning" color="warning" />&nbsp;
        <div>
          <p>404 Not Found</p>
          <p class="path">{{ path }}</p>
        </div>
      </va-card-title>
      <va-divider/>
      <va-card-content>
        <p>잘못된 접근입니다. </p>
        <p>2초 후 메인페이지로 이동합니다.</p>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props:{
    pathMatch: Array
  },
  setup(props) {
    const router = useRouter();
    let path = "";
    props.pathMatch.forEach(s => {
      path += `/${s} `;
    });

    setTimeout(() => {
      router.push('/');
    }, 2000);

    return {
      path
    }
  },
});
</script>

<style scoped>
.path{
  text-transform: none;
}
</style>