import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import(/* webpackChunkName: "about" */ "@/views/HomeView.vue"),
  },
  {
    path: "/player/:playerName",
    name: "PlayerInformationView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/PlayerInformationView.vue"),
    props: true
  },
  {
    path: "/player/:playerName/versus/:opponentName",
    name: "ComparedResultView",
    component: () => import("@/views/ComparedResultView.vue"),
    props: true
  },
  {
    path: "/compare",
    name: "CompareFormView",
    component: () => import("@/views/CompareFormView.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404NotFoundView.vue"),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
