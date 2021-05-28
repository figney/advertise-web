<template>
  <div
    class="commission-notify flex flex-direction align-center padding padding-top-xs"
  >
    <img
      src="../../assets/images/icon_27@2x.png"
      class="margin-bottom-xs"
      style="height: 2.18rem"
    />
    <div class="font-bold fs-18 margin-bottom-sm">
      {{ $t("COMMISSION_HAS_ARRIVED", "佣金已到账") }}
    </div>
    <div class="fc-accent margin-bottom text-center">{{ notify.content }}</div>

    <van-button
      class="font-bold border-radius-sm bg-dark fc-fff wrap-btn"
      block
      >{{ $t("GET_MORE_AWARD", "获取更多奖励") }}</van-button
    >
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "CommissionNotify",
  components: {
    [Button.name]: Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object,
    },
  },
};
</script>
