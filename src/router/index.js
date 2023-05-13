// import { createRouter, createWebHistory } from "vue-router";
import { createRouter,createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: function () {
        return import ("../components/Home.vue")
    },
  },
  {
    path: "/showDetails",
    name: "showDetails",
    component: function () {
        return import ("../views/showDetails.vue")
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
