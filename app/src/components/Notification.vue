<template>
  <div class="notification-page">
    <van-list
      v-model="loading"
      :finished="finished"
      :loading-text="$t('LOADING', '加载中...')"
      :error-text="$t('LOAD_FAILED', '加载失败')"
      @load="getEmails"
    >
      <template #finished>
        <van-empty
          :style="emails.length == 0 ? 'min-height:calc(100vh - 5.1rem)' : ''"
          :image="require('../assets/images/default1@2x.png')"
          :description="$t('NO_MORE', '没有更多了')"
          v-if="emails.length === 0"
        />
        <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
      </template>
      <van-cell
        v-for="(item, index) in emails"
        :border="false"
        class="padding border-bottom"
        :style="item.read ? 'opacity:0.625' : ''"
        :key="'email-' + index"
        @click="read(index)"
      >
        <template #icon>
          <img
            class="size-40 margin-right-sm"
            :src="icons[item.type] || require('../assets/images/icon_9@2x.png')"
          />
        </template>
        <template #title>
          <span class="font-bold">{{ item.title }}</span>
        </template>
        <template #label>
          <span class="fs-12 fc-888">
            {{ item.content }}
          </span>
        </template>
        <template #right-icon>
          <div class="flex flex-direction align-end justify-between">
            <div class="fs-12">{{ $formatTime("MM:SS", item.created_at) }}</div>
            <div
              class="size-13 border-radius-50 bg-error"
              v-if="!item.read"
            ></div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, Badge, Empty, Icon, Button, Dialog } from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";

export default {
  components: {
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell,
    [Badge.name]: Badge,
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
  data: () => {
    return {
      loading: false,
      finished: false,
      emails: [],
      page: 0,
      icons: {
        UserAdTaskCommissionNotification: require("../assets/images/icon_9@2x.png"),
        BaseNotification: require("../assets/images/icon_9@2x.png"),
        RechargeOrderSuccessNotification: require("../assets/images/icon_11@2x.png"),
        TransferVoucherPassNotification: require("../assets/images/icon_11@2x.png"),
        TransferVoucherRejectNotification: require("../assets/images/icon_10@2x.png"),
        UserAwardNotification: require("../assets/images/icon_9@2x.png"),
        UserDeductAwardNotification: require("../assets/images/icon_9@2x.png"),
        UserEarningsNotification: require("../assets/images/icon_9@2x.png"),
        UserFriendDeductAwardNotification: require("../assets/images/icon_9@2x.png"),
        UserProductCommissionNotification: require("../assets/images/icon_9@2x.png"),
        UserProductCommissionV2Notification: require("../assets/images/icon_9@2x.png"),
        UserProductOverNotification: require("../assets/images/icon_9@2x.png"),
        UserWithdrawRefundNotification: require("../assets/images/icon_9@2x.png"),
        UserWithdrawRejectNotification: require("../assets/images/icon_10@2x.png"),
        UserWithdrawToPayErrorNotification: require("../assets/images/icon_10@2x.png"),
        UserWithdrawToPayNotification: require("../assets/images/icon_9@2x.png"),
        UserWithdrawToPaySuccessNotification: require("../assets/images/icon_11@2x.png"),
        UserYesterdayProfitNotification: require("../assets/images/icon_9@2x.png"),
        UserVipCommissionNotification: require("../assets/images/icon_9@2x.png"),
      },
    };
  },
  mixins: [Base],
  methods: {
    clearAll() {
      Dialog.confirm({
        title: this.$t("CLEAR_ALL_NOTIFY", "清空所有通知"),
        confirmButtonText: this.$t("SURE", "确认"),
        cancelButtonText: this.$t("CANCEL", "取消"),
      })
        .then(() => {
          this.read(-1, true, true);
        })
        .catch(() => {});
    },
    getEmails() {
      this.loading = true;
      this.$http
        .get("v1/notifications", {
          params: {
            page: ++this.page,
            page_size: 10,
          },
        })
        .then((res) => {
          if (res.data.length) {
            this.emails = this.emails.concat(res.data);
            if (res.data.length < 10) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        })
        .catch((res) => {
          this.finished = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    readAll() {
      if (this.user.unread_notifications_count > 0) {
        this.read(-1, true);
      }
    },
    read(index = -1, is_all = false, del = false) {
      if (this.emails.length == 0) {
        return;
      }
      if (index != -1 && this.emails[index].read && !del) {
        return;
      }
      //Toast.loading("loading");
      this.$http
        .post("v1/notificationRead", {
          ids: index == -1 ? [] : [this.emails[index].id],
          all: is_all,
          isDelete: del,
        })
        .then((res) => {
          if (is_all) {
            this.$bus.emit("readNotify", "all");
            this.emails.forEach((e) => {
              e.read = true;
            });
            if (del) {
              this.emails = [];
            }
          } else {
            this.$bus.emit("readNotify", this.emails[index].id);
            this.emails[index].read = true;
            if (del) {
              this.emails.splice(index, 1);
            }
          }
          if (res.data) {
            this.$store.commit("updateUnreadNotificationCount", res.data.count);
          }
          ////Toast.hide();
        })
        .catch((err) => {
          console.log(err);
          Toast.failed(err.data.message);
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss">
.notification-page {
  .van-cell__label {
    margin-top: 0;
  }

  .van-cell {
    .delete-icon {
      width: 0.38rem;

      i {
        display: none;
      }
    }

    &:hover .delete-icon i {
      display: inline-block;
    }
  }
}
</style>
