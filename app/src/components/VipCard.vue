<template>
  <div
      class="padding vip-card border-radius shadow"
      :style="'background:url('+vip.bg_image+') #fff;color:'+vip.dev_config.color"
  >
    <div class="flex align-center margin-bottom-sm">
      <span class="fs-18 font-bold margin-right-sm">{{vip.title}}</span>
      <img :src="vip.icon" style="height:0.56rem">
    </div>

    <div
        class="margin-bottom-xs fs-12 flex align-center"
    >
      <span class="margin-right-xs flex-sub">
        {{$t('TASK_NUM','任务次数')}}:
      </span>
      <span class="font-bold">{{vip.task_num * amount}}</span>
    </div>

    <template v-for="(attr,j) in vip.attrs">
      <div
        class="margin-bottom-xs fs-12 flex align-center"
        :key="'my-vip-attr-'+j"
        v-if="!attr.key.startsWith('DAY_PROFIT')"
      >
        <span class="margin-right-xs flex-sub">{{$t(attr.key)}}:</span>
        <span class="font-bold">{{attr.value | i18n}}</span>
      </div>
    </template>

    <div
        class="margin-bottom-xs fs-12 flex align-center"
    >
      <span class="margin-right-xs flex-sub">
        {{$t('DAY_PROFIT','日收益')}}:
      </span>
      <money-number class="money-number font-bold" :value="vip.day_min * amount"/>
      <span class="margin-lr-xs">~</span>
      <money-number class="money-number font-bold" :value="vip.day_max * amount"/>
    </div>

    <div
        class="margin-bottom-xs fs-12 flex align-center"
    >
      <span class="margin-right-xs flex-sub">
        {{$t('YEAR_PROFIT','年收益')}}:
      </span>
      <money-number class="money-number font-bold" :value="vip.day_min * 365 * amount"/>
      <span class="margin-lr-xs">~</span>
      <money-number class="money-number font-bold" :value="vip.day_max * 365 * amount"/>
    </div>
  </div>
</template>

<script>
import MoneyNumber from "./MoneyNumber";

export default {
  components: {
    MoneyNumber,
  },
  props: {
    vip: {
      type: Object,
      default: Object,
    },
    amount: {
      type: [Number,String],
      default: 1,
    }
  }
}
</script>

<style lang="scss">
.vip-card {
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>