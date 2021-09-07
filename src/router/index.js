import { createRouter, createWebHistory } from "@ionic/vue-router";

import Characters from "../views/Characters.vue";
import Memories from "../views/Memories.vue";
import Tabs from "../views/Tabs.vue";

const routes = [
  // {
  //   path: "/",
  //   redirect: "/characters/1",
  // },
  {
    path: "/",
    redirect: "/memories",
  },
  {
    path: "/characters/:id",
    component: Characters,
  },
  {
    path: "/character/:id",
    component: () => import("@/views/CharacterDetail.vue"),
  },
  {
    path: "/memories",
    component: Memories,
  },
  {
    path: "/memories/:id",
    component: () => import("@/views/MemoriesDetail.vue"),
  },
  {
    path: "/memories/add",
    component: () => import("@/views/MemoriesAdd.vue"),
  },
  {
    path: "/memories/update/:id",
    component: () => import("@/views/MemoriesUpdate.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
