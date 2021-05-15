<template>
  <div
      class="user-banner"
      @click="clickBanner"
  >
    <div class="flex align-stretch" v-if="isLogin">
      <img :src="user.name | avatar" class="size-32 border-radius-50 margin-right-xs">
      <div class="flex align-center justify-between">
<!--        <div class="flex align-center">-->
<!--          <span class="font-bold margin-right-xs text-nowrap text-ellipsis overflow-hidden" style="max-width:4.6rem">{{user.name}}</span>-->
<!--        </div>-->
        <div class="border-radius-xl padding-lr-sm fs-15 font-bold flex align-center overflow-hidden" style="height:0.85rem;width:fit-content;min-width:3.6rem;max-width:5rem;background:rgba(255, 255, 255, 0.85)">
          <money-number class="money-number" :value="wallet.balance || wallet.wallet_count.balance_earnings"/>
        </div>
      </div>
    </div>
    <div class="flex align-center padding-lr-xs" style="height:30px" v-else>
      {{$t('LOGIN','登录')}}
    </div>
  </div>
</template>

<script>
import {Base} from "@/mixins";

import MoneyNumber from "@/components/MoneyNumber";
import {Icon, Swipe, SwipeItem} from "vant";

export default {
  components: {
    MoneyNumber,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,

  },
  mixins: [Base],
  methods: {
    clickBanner() {
      this.$webEvent('点击顶部的钱包', this.$route.name+'页面')
      this.$toRouter({name: 'HomeUser'})
    }
  }
}
</script>

<style lang="scss">
.user-banner {

}
</style>