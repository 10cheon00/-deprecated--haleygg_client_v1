<template>
  <div>
    <div class="row justify--center">
      <va-card outlined square class="flex md6">
        <va-card-content>
          <va-form 
            tag="form" 
            ref="form"
            @submit.prevent="signIn"
          >
            <div class="row">
              <va-input
                outline
                class="flex md12"
                placeholder="아이디"
                v-model="id"
                :rules="[value => (value.length > 0) || '아이디를 입력해주세요.']"
              />
              <va-input
                outline
                class="flex md12"
                placeholder="비밀번호"
                type="password"
                v-model="password"
                :rules="[value => (value.length > 0) || '비밀번호를 입력해주세요.']"
              />
              <div class="flex md12 signin-buttons row">
                <div class="flex md6">
                  <va-button 
                    color="success"
                    icon="login"
                    type="submit"
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
                    @click="navigateToSignUpPage()"
                  >
                    Sign Up
                  </va-button>
                </div>
              </div>
            </div>
          </va-form>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const form = ref(null);
    const id = ref("");
    const password = ref("");

    const signIn = () => {
      const isValidate = form.value.validate();
      if(isValidate){
        alert("seems to good");
      }
    };
    const navigateToSignUpPage = () => {
      
    }
    
    return {
      id,
      form,
      password,
      navigateToSignUpPage,
      signIn
    };
  },
});
</script>

<style scoped>
.signin-buttons {
  margin-top: 1rem;
}
</style>