<template>
  <div>
    <form @submit.prevent="searchUser">
      <va-input
        placeholder="User Name"
        @click-append-inner="searchUser()"
        type="text"
        v-model="userName"
      >
        <template #appendInner>
          <va-icon name="search" @click="searchUser()" />
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
    const userName = ref("");
    const searchUser = () => {
      router.push('/player/' + userName.value)
    };
    return {
      searchUser,
      userName,
    }
  },
})
</script>
