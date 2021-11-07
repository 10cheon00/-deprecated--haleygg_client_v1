<template>
  <div class="layout">
    <va-card>
      <va-card-content>
        <form @submit.prevent="searchUser"> 
          <va-input 
            placeholder="User Name"
            @click-append-inner="searchUser()"
            type="text"
            v-model="searchUserName"
          >
            <template #appendInner>
              <va-icon name="search"/>
            </template>
          </va-input>
        </form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup(){
    const router = useRouter();
    const searchUserName = ref("");
    const searchUser = () => {
      router.push('/player/' + searchUserName.value)
    }
    return {
      searchUserName,
      searchUser
    }
  }
});
</script>
