<template>
  <div>
    <div class="row justify--center">
      <va-card outlined square class="flex md6">
        <va-card-content>
          <div class="row">
            <va-input
              outline
              class="flex md12"
              placeholder="아이디"
              v-model="id"
            />
            <va-input
              outline
              class="flex md12"
              placeholder="비밀번호"
              type="password"
              v-model="password"
            />
            <div class="flex md12 signin-buttons row">
              <div class="flex md6">
                <va-button 
                  color="success"
                  icon="login"
                  :rounded="false"
                >
                  Sign In
                </va-button>
              </div>
              <div class="flex md6">
                <va-button 
                  color="primary"
                  icon="person_add" 
                  :rounded="false"
                >
                  Sign Up
                </va-button>
              </div>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const id = ref("");
    const password = ref("");
    return {
      id,
      password
    };
  },
});
</script>

<style scoped>
.signin-buttons {
  margin-top: 1rem;
}
</style>