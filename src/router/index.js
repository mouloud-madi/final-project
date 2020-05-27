import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/graph/index.vue";
import create from "../components/graph/create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
   {
    path: "/create",
    name: "create",
    component: create
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
