<template>
  <div>
    <!-- title -->
    <va-card outlined square class="title-card">
      <va-card-content style="text-align: start">
        <h2 class="display-2">회원가입</h2>
      </va-card-content>
    </va-card>

    <va-card outlined square>
      <va-card-content>
        <va-form 
          tag="form"
          ref="form"
          @submit.prevent="signUp"
        >
          <va-input
            class="mb-3"
            placeholder="* 아이디"
            v-model="userInformation.account_id"
            :rules="[
              value => (value.length > 0) || '이 항목은 필수로 입력해야합니다.'
            ]"
          />
          <va-input
            class="mb-3"
            placeholder="* 비밀번호"
            type="password"
            v-model="userInformation.password"
            :rules="[
              value => (value.length > 0) || '이 항목은 필수로 입력해야합니다.'
            ]"
          />
          <va-input
            class="mb-3"
            placeholder="* 비밀번호 확인"
            type="password"
            v-model="verificationPassword"
            :rules="[
              value => (value.length > 0) || '이 항목은 필수로 입력해야합니다.',
              password => (password == userInformation.password) || '비밀번호가 같지 않습니다.'
            ]"
          />
          <va-input
            class="mb-3"
            placeholder="* 스타 닉네임"
            v-model="userInformation.nick_name"
            :rules="[
              value => (value.length > 0) || '이 항목은 필수로 입력해야합니다.'
            ]"
          />
          <va-select
            class="mb-3"
            placeholder="* 선호 종족"
            v-model="userInformation.favorate_race"
            :options="raceList"
            :rules="[
              value => (value.length > 0) || '이 항목은 필수로 입력해야합니다.'
            ]"
          />
          <div class="row justify--end">
            <va-button 
              icon="how_to_reg" 
              type="submit"
              :rounded="false"
            >
              가입하기
            </va-button>
          </div>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const userInformation = ref({
      account_id: "",
      password: "",
      nick_name: "",
      favorate_race: "",
    });
    const form = ref(null)
    const raceList = [ "테란", "저그", "프로토스" ];
    const verificationPassword = ref("");

    const signUp = () => {
      const isValidate = form.value.validate();
      if(isValidate){
        // do Sign Up
        alert("seems to good")
      }
    }
    
    return {
      form,
      raceList,
      userInformation,
      verificationPassword,
      signUp
    };
  },
});
</script>

<style scoped>
.title-card {
  margin-bottom: 0.5rem;
}
</style>