import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/graph/index.vue";
import create from "../components/graph/create.vue";
import edit from "../components/graph/edit.vue";
import view from "../components/graph/view.vue";

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
   {
    path: "/graphs/:id/edit",
    name: "edit",
    component: edit
  }, 
  {
    path: "/graphs/:id",
    name: "view",
    component: view
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
