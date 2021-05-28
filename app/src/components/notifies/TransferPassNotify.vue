<template>
  <div class="transfer-pass-notify flex flex-direction align-center padding">
    <img
      src="../../assets/images/icon_11@2x.png"
      class="margin-bottom-sm"
      style="height: 1.45rem"
    />
    <div class="font-bold fs-18 margin-bottom-sm text-center">
      {{ $t("DEPOSIT_SUCCESS", "充值成功") }}
    </div>
    <div class="fc-accent margin-bottom text-center">
      {{
        $t(
          "DEPOSIT_N_CASH_ARRIVED",
          [notify.params.amount.toString()],
          "你充值的N现金已到账!"
        )
      }}
    </div>
    <van-button
      class="font-bold border-radius-sm bg-dark fc-fff wrap-btn"
      block
      >{{ $t("BUY_VIP", "开通会员") }}</van-button
    >
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "TransferPassNotify",
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
