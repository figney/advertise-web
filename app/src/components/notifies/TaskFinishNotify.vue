<template>
  <div
    class="task-finish-notify flex flex-direction align-center padding padding-top-xs"
  >
    <img
      src="../../assets/images/icon_27@2x.png"
      class="margin-bottom-xs"
      style="height: 2.18rem"
    />
    <div class="font-bold fs-18 margin-bottom-sm text-center">
      {{ $t("AD_TASK_AWARD_ARRIVED", "恭喜您获得广告任务奖励") }}
    </div>
    <div class="fc-accent margin-bottom text-center font-bold fs-22">
      <span class="margin-right-xs">+</span>
      <money-number :value="notify.params.fee" class="money-number" />
    </div>

    <van-button
      class="font-bold border-radius-sm bg-dark fc-fff wrap-btn"
      block
      @click="startNow"
      >{{ $t("DO_TASK_GET_MORE_AWARD", "做任务获取更多奖励") }}</van-button
    >
  </div>
</template>

<script>
import { Button } from "vant";
import MoneyNumber from "../MoneyNumber";
import { Base } from "../../mixins";
export default {
  name: "TaskFinishNotify",
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
  mounted() {
    this.$nextTick(() => {
      this.$bus.emit("taskFinished", this.notify.params.ad_task_id);
    });
  },
  methods: {
    startNow() {
      this.$emit("read");
      this.$toRouter({ name: "HomeTask" });
    },
  },
};
</script>

<style lang="scss">
.task-finish-notify {
}
</style>
