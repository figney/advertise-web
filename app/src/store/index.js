import Vue from "vue";
import Vuex from "vuex";
import config from "@/config";
import model from "./model";
import http from "@/plugins/axios"
import { Toast } from "mand-mobile";

let systemInterval = null

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    banners: model.banners,

    user: model.user,
    all_property: model.all_property,
    money_bao: model.money_bao,
    product_data: model.product_data,
    money_bao_rate: model.money_bao_rate,
    wallet: model.wallet,
    system: model.system,
    left_secs: model.left_secs,
    init: model.init,
    dynamic_init: model.dynamic_init,
    coin_unit: model.coin_unit,
    free_task_num: 1,
    baseNotice: model.baseNotice,
    share: model.share,
    products: model.products,
    vips: model.vips,
    ifPwa: false,
    showPwa: true,
    productSep: 100,
    userVipInfo: [],
    userVipFinishedCount: {},
    hotTasks: [],
    vipTasks: {
      vip0: [],
      vip1: [],
      vip2: [],
      vip3: [],
      vip4: [],
      vip5: [],
      vip6: []
    },
    aboutContent: {},
    inviteContent: {},
    buyVipRule: {},
    // 免费会员一次任务多少钱
    free_task_money: 5,
  },
  getters: {
    version() {
      return config.version;
    },
    isLogin: state => {
      return !!state.user.hash;
    },
  },
  mutations: {
    // 更新未读消息的数量
    updateUnreadNotificationCount(state, count) {
      state.user.unread_notifications_count = count
    },
    updateMoneyRate(state, rate) {
      if (rate) {
        state.system.usdt_money_rate = rate
      }
    },
    setVipTask(state, { level, tasks }) {
      state.vipTasks['vip' + level] = tasks
    },
    setState(state, data) {
      state[data.key] = data.value
    },
  },
  actions: {
    // 更新用户对象
    updateUser(ctx, user) {
      if (user && user.hash) {
        ctx.commit('setState', { key: 'wallet', value: user.wallet })
        ctx.commit('setState', { key: 'money_bao', value: user.money_bao })
        ctx.commit('setState', { key: 'all_property', value: user.all_property })
        ctx.commit('setState', { key: 'product_data', value: user.product_data })
        delete user.wallet
        delete user.money_bao
        delete user.all_property
        delete user.product_data
        ctx.commit('setState', { key: 'user', value: user })
      }
    },
    refreshVipInfo(ctx) {
      http.get('v1/userVipInfo')
        .then(res => {
          ctx.commit('setState', { key: 'userVipInfo', value: res.data.vip })
          ctx.commit('setState', { key: 'userVipFinishedCount', value: res.data.ad_task_data || {} })
        })
        .catch(err => {
          console.log('refresh user vip info:', err)
        })
    },
    refreshUser(ctx) {
      http.get('v1/user')
        .then(res => {
          ctx.dispatch('updateUser', res.data.user)
        })
        .catch(err => {
          console.log('refresh user:', err)
        })
    },
    refreshFinishedTasks(ctx) {
      http.get('v1/userVipInfo')
        .then(res => {
          ctx.commit('setState', { key: 'userVipInfo', value: res.data.vip })
          ctx.commit('setState', { key: 'userVipFinishedCount', value: res.data.ad_task_data || {} })
        })
        .catch(err => {
          console.log('refresh finished tasks:', err)
        })
    },
    startSystemTimer(ctx) {
      if (systemInterval) {
        clearInterval(systemInterval)
        systemInterval = null
      }
      ctx.commit('setState', { key: 'init', value: true })

      systemInterval = setInterval(() => {
        if (ctx.state.left_secs > 0) {
          ctx.commit('setState', { key: 'left_secs', value: ctx.state.left_secs - 1 })
        } else {
          ctx.commit('setState', { key: 'left_secs', value: 86400 })
          ctx.dispatch('refreshUser')
        }
      }, 1000)
    },
  },
  modules: {
  },
});
