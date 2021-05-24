<template>
  <div class="base-socket">
    <vue-snotify></vue-snotify>
    <van-popup
      :close-on-click-overlay="false"
      class="no-bg"
      style="overflow: visible"
      v-model="showPop"
      v-if="showPop"
      ref="baseSocketNotify"
    >
      <div
        class="position-re flex flex-direction white-view vw-90 border-radius-sm bounceInDown"
        style="overflow: visible"
      >
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="readNotify"
          v-if="showClose"
        />
        <component
          :is="notifyComponent"
          :notify="popData"
          @read="readNotify"
          @close="closePop"
          @more="toNotifications"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Base } from "@/mixins";
import { Icon, Popup } from "vant";
import { Toast } from "mand-mobile";
import config from "@/config";
import BaseNotify from "@/components/notifies/BaseNotify";
import DepositSuccessNotify from "./notifies/DepositSuccessNotify";
import TransferPassNotify from "./notifies/TransferPassNotify";
import TransferRejectNotify from "./notifies/TransferRejectNotify";
import CommissionNotify from "./notifies/CommissionNotify";
import VipCommissionNotify from "./notifies/VipCommissionNotify";
import YesterdayProfitNotify from "./notifies/YesterdayProfitNotify";
import TaskCommissionNotify from "./notifies/TaskCommissionNotify";
import TaskFinishNotify from "./notifies/TaskFinishNotify";
import { mapState } from "vuex";

export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [BaseNotify.name]: BaseNotify,
    [DepositSuccessNotify.name]: DepositSuccessNotify,
    [TransferPassNotify.name]: TransferPassNotify,
    [TransferRejectNotify.name]: TransferRejectNotify,
    [VipCommissionNotify.name]: VipCommissionNotify,
    [YesterdayProfitNotify.name]: YesterdayProfitNotify,
    [TaskCommissionNotify.name]: TaskCommissionNotify,
    [TaskFinishNotify.name]: TaskFinishNotify,
  },
  data() {
    return {
      // 所有通知类型的 map
      notifyModels: {
        BaseNotification: "BaseNotify",

        // 充值成功订单通知
        RechargeOrderSuccessNotification: "DepositSuccessNotify",

        // 转账审核通过通知
        TransferVoucherPassNotification: "TransferPassNotify",

        // 转账审核失败通知
        TransferVoucherRejectNotification: "TransferRejectNotify",

        // 用户VIP佣金通知
        UserVipCommissionNotification: "VipCommissionNotify",

        // 用户广告任务佣金通知
        UserAdTaskCommissionNotification: "TaskCommissionNotify",

        // 用户广告任务完成通知
        UserAdTaskFinishedNotification: "TaskFinishNotify",

        // 昨日收益通知
        UserYesterdayProfitNotification: "YesterdayProfitNotify",

        get: function (key) {
          return this[key] || "BaseNotify";
        },
      },
      notifyComponent: "BaseNotify",
      showPop: false,
      freezePop: false,
      MAX_FORCE: 3, // 未阅读的通知超过三条，直接加一个按钮，查看其他通知
      current_count: 0,
      forceNotifications: [],
      forceMap: {},
      notifyInterval: null,
      popData: { type: null, title: null, share: false },
      page: 0,
      showClose: true,
    };
  },
  mixins: [Base],
  computed: {
    ...mapState(["vips"]),
  },
  mounted() {
    this.$bus.on("refreshUserAndNotify", this.refreshUserAndNotify);
    this.$bus.on("readNotify", this.onReadNotify);
    this.$bus.on("getForceNotifications", this.getUnReadForceNotifications);
    this.$socket.on("notification", this.onNotify);
    this.$socket.on("user_invite", this.onInvite);
    this.$socket.on("ad_task_click", this.onAdTaskClick);
    this.$socket.on("rate_quotation", this.onRateQuotation);
    this.$socket.on("reload", this.onReload);
    this.$socket.on("version", this.onVersion);
    this.startNotifyInterval();
  },
  methods: {
    refreshUserAndNotify() {
      this.getUnReadForceNotifications();
      this.$store.dispatch("refreshUser");
    },
    startGuide() {
      if (!localStorage.getItem("GuideNotify")) {
        this.showClose = false;
        localStorage.setItem("GuideNotify", true);
      } else {
        this.showClose = true;
      }
    },
    toNotifications() {
      this.closePop();
      this.$toRouter({ name: "Notification" });
    },
    canPop() {
      return (
        !this.showPop &&
        !this.freezePop &&
        this.forceNotifications.length != 0 &&
        this.$route.name != "Notification"
      );
    },
    onInvite(msg = {}) {
      this.updateUserInfo(msg);
      // 弹窗展示一个 "您有新的好友加入，开通VIP后即可获得 xxx 金额奖励"
      let money = 500000;
      if (this.vips.length) {
        let item = this.vips[this.vips.length - 1];
        if (item.task_num_money_list.length) {
          money = item.task_num_money_list[0].money;
        }
      }
      money = Math.floor(money * 0.15);
      let html = `<div class="padding-sm line-height-15" >
<div class="fs-16 flex align-center">${this.$t(
        "YOUR_NEW_FRIEND_JOINEDYOUR_NEW_FRIEND_JOINED",
        [money.toString()],
        "您有新的好友加入，开通VIP后即可获得 {0} 金额奖励"
      )}</div>
</div>`;
      this.$snotify.html(html, msg.title);
    },
    onAdTaskClick(msg) {
      this.updateUserInfo(msg);
      this.$bus.emit("taskClick", {
        id: msg.ad_task_id,
        now_click_number: msg.now_click_number,
        complete_click_number: complete_click_number,
      });
    },
    onNotify(msg) {
      this.updateUserInfo(msg);

      // 强弱提醒
      if (msg.forced) {
        this.addForceNotify(msg);
      } else {
        this.showLiteNotify(msg);
      }
    },
    updateUserInfo(msg) {
      // 更新用户信息
      if (msg.user_info && msg.user_info.hash) {
        this.$store.dispatch(
          "updateUser",
          JSON.parse(JSON.stringify(msg.user_info))
        );
      }

      // 刷新用户的任务列表
      this.$bus.emit("refreshTask");

      // 更新未读通知数量
      if (msg.notifications_count != undefined) {
        this.$store.commit(
          "updateUnreadNotificationCount",
          msg.notifications_count
        );
      }
    },
    onRateQuotation(data) {
      this.$store.commit("updateMoneyRate", data.rate);
    },
    onReload() {
      location.reload();
    },
    onVersion({ version }) {
      if (version && version != config.version) {
        setTimeout(() => {
          location.reload();
        }, Math.random() * 1000 * 20);
      }
    },
    getUnReadForceNotifications() {
      this.$http
        .get("v1/notifications", {
          params: {
            forced: true,
            read: "un_read",
            page: ++this.page,
            page_size: 10,
          },
        })
        .then((res) => {
          if (res.data.length) {
            for (let notify of res.data) {
              if (res.data.length > this.MAX_FORCE) {
                notify.see_all = true;
              }
              this.addForceNotify(notify);
            }
          }
          if (res.data.length == 10) {
            this.getUnReadForceNotifications();
          }
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    addForceNotify(notify) {
      if (!this.forceMap[notify.id]) {
        this.forceMap[notify.id] = 1;
        this.forceNotifications.push(notify);
      }
    },
    startNotifyInterval() {
      clearInterval(this.notifyInterval);
      this.notifyInterval = setInterval(() => {
        if (this.canPop()) {
          this.openPop(this.forceNotifications.shift());
        }
      }, 1000);
    },
    showLiteNotify(data) {
      let html = `<div class="padding-sm line-height-15" >
                    <div class="fs-16 flex align-center">
                        <i class="van-icon van-icon-bell fc-432af5"></i>
                        <span class="margin-left-xs">${data.title}</span>
                    </div>
                    <div class="fs-14 fc-6f margin-top-xs">${data.content}</div>
                    </div>`;
      const toast = this.$snotify.html(html, data.title);
      toast.on("click", (toast) => {
        this.$router.push({ name: "HomeMessage" });
      });

      this.$store.commit(
        "updateUnreadNotificationCount",
        data.notifications_count
      );
    },
    readNotify() {
      this.$http
        .post("v1/notificationRead", {
          ids: [this.popData.id],
          all: false,
          isDelete: false,
        })
        .then((res) => {
          if (res.data) {
            this.$store.commit("updateUnreadNotificationCount", res.data.count);
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.failed(err.data.message);
        })
        .finally(() => {
          this.closePop();
        });
    },
    onReadNotify(id) {
      if (id == "all") {
        this.forceNotifications = [];
      } else {
        for (let i = 0; i < this.forceNotifications.length; i++) {
          if (this.forceNotifications[i].id == id) {
            this.forceNotifications.splice(i, 1);
            break;
          }
        }
      }
    },
    openPop(data) {
      this.startGuide();
      delete this.forceMap[this.popData.id];
      this.popData = data;
      if (data.type != "UserEarningsNotification") {
        this.notifyComponent = this.notifyModels.get(data.type);
        this.showPop = true;
        this.freezePop = true;
      }
    },
    closePop() {
      this.$closeModel(this.$refs.baseSocketNotify.$el);
      setTimeout(() => {
        this.showPop = false;
      }, 300);
      setTimeout(() => {
        this.freezePop = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.base-socket {
  .close-icon {
    z-index: 1;
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }
}
</style>
