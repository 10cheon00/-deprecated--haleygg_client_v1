<template>
  <div>
    <va-card
      class="player-information light"
      :style="{ 'background-image': 'url(' + loadImageByRace(profile.most_race) + ')'}"
    >
      <va-card-title class="flex align--start">
        <div class="player-name">
          {{ profile.name }}
        </div>
        <div class="signup-date">
          Signup date : {{ profile.signup_date }}
        </div>
      </va-card-title>
      <va-card-content class="background--light">
        {{ profile.career }}
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    profile: {
      name: String,
      most_race: String,
      signup_date: String,
      career: String,
      required: true
    }
  },
  setup() {
    const loadImageByRace = (race) => {
      const raceImageUrls = {
        protoss:
          "https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg",
        terran:
          "https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg",
        zerg: "https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg",
      };
      return raceImageUrls[race];
    };

    return {
      loadImageByRace
    };
  },
});
</script>

<style scoped>
.player-information {
  background-repeat: no-repeat;
  background-size: 100%;
  color: #f8f9fa;
}
.player-name {
  font-size: 3rem;
  text-transform: none;
}
.signup-date {
  text-align: right;
}
</style>