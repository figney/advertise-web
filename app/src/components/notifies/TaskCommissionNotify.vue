<template>
  <div
    class="task-commission-notify flex flex-direction align-center padding padding-top-xs"
  >
    <img
      src="../../assets/images/icon_27@2x.png"
      class="margin-bottom-xs"
      style="height: 2.18rem"
    />
    <div class="font-bold fs-18 margin-bottom-sm text-center">
      <span v-if="notify.params.is_no_commission">{{
        $t("CAN_NOT_GET_COMMISSION", "无法获得佣金")
      }}</span>
      <span v-else>{{
        $t("CONGRATULATIONS_YOU_GOT_COMMISSION", "恭喜您获得了佣金")
      }}</span>
    </div>

    <!-- 没有获得下级的广告任务佣金 -->
    <div
      class="margin-bottom flex flex-direction bg-fef3ee border-radius-sm"
      v-if="notify.params.is_no_commission"
      style="width: 100%"
    >
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t("YOUR_FRIEND_FINISH_TASK_LEVEL", "您的N级好友N完成的任务级别")
        }}</span>
        <span class="text-nowrap margin-left-sm font-bold fc-accent"
          >VIP{{ notify.params.ad_task_level }}</span
        >
      </div>
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t("YOU_CAN_GET_COMMISSION", "您可获得佣金")
        }}</span>
        <money-number
          :value="notify.params.all_fee"
          class="money-number font-bold text-nowrap margin-left-sm"
        />
      </div>
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t("BECAUSE_YOU_DO_NOT_BUY_VIP", "由于您没有开通VIP")
        }}</span>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm">
        <span class="fs-12">{{
          $t("SO_YOU_CANNOT_GOT_IT", "所以您无法获得佣金")
        }}</span>
        <money-number
          :value="notify.params.fee"
          class="money-number font-bold text-nowrap margin-left-sm"
        />
      </div>
    </div>

    <!-- 获得下级全部的广告任务佣金 -->
    <div
      class="margin-bottom flex flex-direction align-center justify-center padding-tb-sm"
      v-else-if="notify.params.is_get_all_commission"
      style="width: 100%"
    >
      <span>{{ $t("YOUR_FRIEND_FINISH_TASK", "您的N级好友N完成了任务") }}</span>
      <div class="margin-top-xs">
        <span class="margin-right-xs">{{
          $t("CONGRATULATIONS_YOU_GOT", "恭喜您获得了")
        }}</span>
        <money-number
          :value="notify.params.all_fee"
          class="money-number font-bold fs-20 fc-accent"
        />
      </div>
    </div>

    <!-- 获得下级部分的广告任务佣金 -->
    <div
      class="margin-bottom flex flex-direction bg-fef3ee border-radius-sm"
      v-else
      style="width: 100%"
    >
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t(
            "YOUR_FRIEND_FINISH_TASK_LEVEL",
            [
              notify.params.level.toString(),
              notify.params.ad_task_level.toString(),
            ],
            "您的N级好友N完成的任务级别"
          )
        }}</span>
        <span class="font-bold fc-accent text-nowrap margin-left-sm"
          >VIP{{ notify.params.ad_task_level }}</span
        >
      </div>
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t("YOU_CAN_GET_COMMISSION", "您可获得佣金")
        }}</span>
        <money-number
          :value="notify.params.all_fee"
          class="money-number font-bold text-nowrap margin-left-sm"
        />
      </div>
      <div
        class="flex align-center justify-between padding-lr padding-tb-sm border-bottom"
      >
        <span class="fs-12">{{
          $t("BECAUSE_YOUR_VIP_LEVEL_IS", "由于您的VIP等级是")
        }}</span>
        <span class="font-bold fc-accent text-nowrap margin-left-sm">{{
          notify.params.my_vip_level
        }}</span>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm">
        <span class="fs-12">{{ $t("SO_YOU_ONLY_GET", "所以您只能获得") }}</span>
        <money-number
          :value="notify.params.fee"
          class="money-number font-bold text-nowrap margin-left-sm"
        />
      </div>
    </div>

    <van-button
      class="font-bold border-radius-sm bg-dark fc-fff wrap-btn"
      block
      @click="startNow"
    >
      <span v-if="notify.params.is_no_commission">{{
        $t("BUY_VIP_GET_ALL_COMMISSION", "开通VIP领取佣金")
      }}</span>
      <span v-else-if="!notify.params.is_get_all_commission">{{
        $t("UPGRADE_VIP_GET_ALL_COMMISSION", "升级VIP领取全部佣金")
      }}</span>
      <span v-else>{{
        $t("DO_TASK_GET_MORE_AWARD", "做任务获取更多奖励")
      }}</span>
    </van-button>
  </div>
</template>

<script>
import { Button } from "vant";
import MoneyNumber from "../MoneyNumber";
import { Base } from "../../mixins";
export default {
  name: "TaskCommissionNotify",
  components: {
    MoneyNumber,
    [Button.name]: Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object,
    },
  },
  mixins: [Base],
  methods: {
    startNow() {
      this.$emit("read");
      if (
        this.notify.params.is_no_commission ||
        !this.notify.params.is_get_all_commission
      ) {
        this.$toRouter({ name: "HomeVip" });
      } else {
        this.$toRouter({ name: "HomeTask" });
      }
    },
  },
};
</script>
