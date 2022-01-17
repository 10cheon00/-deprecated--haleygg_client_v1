import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/add-game-result",
    name: "GameResultFormView",
    component: () => import("@/views/GameResultFormView.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("@/views/SignInView.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/SignUpView.vue")
  },
  {
    path: "/elo-rank",
    name: "EloRank",
    component: () => import("@/views/EloRankView.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router