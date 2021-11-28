<template>
  <div>
    <form @submit.prevent="searchPlayer">
      <va-input
        placeholder="Player Name"
        @click-append-inner="searchPlayer()"
        type="text"
        v-model="playerName"
      >
        <template #appendInner>
          <va-icon name="search"/>
        </template>
      </va-input>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const playerName = ref("");
    const searchPlayer = () => {
      router.push('/player/' + playerName.value)
      playerName.value = ""
    };
    return {
      searchPlayer,
      playerName,
    }
  },
})
</script>
