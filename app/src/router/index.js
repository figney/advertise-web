import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "HomeIndex",
    // meta: { no_cache: true },
    component: () => import("@/views/home/Index"),
    // component: () => import("@/views/SubmitCertifications"),
  },
  {
    path: "/tasks",
    name: "HomeTasks",
    meta: { no_cache: true },
    component: () => import("@/views/home/Task"),
  },
  {
    path: "/message",
    name: "HomeMessage",
    meta: { no_cache: true },
    component: () => import("@/views/home/Message"),
  },
  {
    path: "/vip",
    name: "HomeVip",
    // meta: { no_cache: true },
    component: () => import("@/views/home/Vip"),
  },
  {
    path: "/user",
    name: "HomeUser",
    // meta: { no_cache: true },
    component: () => import("@/views/home/User"),
  },
  {
    path: "/my_task",
    name: "MyTask",
    meta: { no_cache: true },
    component: () => import("@/views/MyTask"),
  },
  {
    path: "/task_detail",
    name: "TaskDetail",
    meta: { no_cache: true },
    component: () => import("@/views/TaskDetail"),
  },
  {
    path: "/task_share",
    name: "TaskShare",
    meta: { no_cache: true },
    component: () => import("@/views/TaskShare"),
  },
  {
    path: "/advertise",
    name: "Advertise",
    meta: { no_cache: true },
    component: () => import("@/views/Advertise"),
  },
  {
    path: "/ad_show",
    name: "AdShow",
    meta: { no_cache: true },
    component: () => import("@/views/AdShow"),
  },
  {
    path: "/beginner",
    name: "Beginner",
    // meta: { no_cache: true },
    component: () => import("@/views/Beginner.bak2"),
  },
  {
    path: "/team",
    name: "Team",
    meta: { no_cache: true },
    component: () => import("@/views/Team"),
  },
  // {
  //   path: "/buy_vip",
  //   name: "BuyVip",
  //   meta: {no_cache: true},
  //   component: () => import("@/views/BuyVip"),
  // },
  {
    path: "/wallet_history",
    name: "WalletHistory",
    meta: { no_cache: true },
    component: () => import("@/views/WalletHistory"),
  },
  {
    path: "/invite",
    name: "Invite",
    component: () => import("@/views/Invite"),
  },
  {
    path: "/deposit",
    name: "Deposit",
    meta: { no_cache: true },
    component: () => import("@/views/Deposit"),
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    meta: { no_cache: true },
    component: () => import("@/views/Withdraw"),
  },
  {
    path: "/order",
    name: "Order",
    meta: { no_cache: true },
    component: () => import("@/views/Order"),
  },
  {
    path: '/bank_transfer',
    name: 'BankTransfer',
    meta: { no_cache: true },
    component: () => import("@/views/BankTransfer")
  },
  {
    path: '/rank',
    name: 'Rank',
    meta: { no_cache: true },
    component: () => import("@/views/Rank")
  },
  {
    path: '/about',
    name: 'About',
    meta: { no_cache: true },
    component: () => import("@/views/About")
  },
  {
    path: '/tool',
    name: 'Tool',
    meta: { no_cache: true },
    component: () => import("@/views/Tool")
  },
  {
    path: "*",
    name: "Empty",
    redirect: { name: "HomeIndex" },
  },
];

if (process.env.NODE_ENV === 'production') {
  routes.splice(routes.length - 2, 1)
}

const router = new VueRouter({
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

export default router;
