import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "GameResultFormView",
    component: () => import("@/views/GameResultFormView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router