<template>
  <div
    class="yesterday-profit-notify flex flex-direction align-center padding-sm padding-top-xs"
  >
    <img
      src="../../assets/images/icon_27@2x.png"
      class="margin-bottom-xs"
      style="height: 2.18rem"
    />
    <div class="font-bold fs-18 margin-bottom-sm text-center">
      {{ $t("YESTERDAY_PROFIT_NOTIFY", "昨日收益通知") }}
    </div>
    <div class="margin-bottom text-center" style="word-break: break-all">
      <span>{{ $t("YOU_GOT_COMMISSION_YESTERDAY", "您昨日获得了收入") }}</span>
      <money-number
        :value="notify.params.commission"
        class="money-number fc-accent font-bold fs-16 margin-left-xs"
      />
    </div>

    <div class="margin-xs" style="width: 100%">
      <van-button
        class="font-bold border-radius-sm bg-dark fc-fff wrap-btn"
        block
        @click="startNow"
        >{{ $t("DO_TASK_GET_MORE_AWARD", "做任务获取更多奖励") }}</van-button
      >
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import { Base } from "../../mixins";
import MoneyNumber from "../MoneyNumber";
export default {
  name: "YesterdayProfitNotify",
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
      this.$toRouter({ name: "HomeTask" });
    },
  },
};
</script>

<style lang="scss">
.yesterday-profit-notify {
}
</style>
