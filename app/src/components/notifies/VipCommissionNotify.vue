<template>
  <div class="vip-commission-notify flex flex-direction align-center padding padding-top-xs">
    <img src="../../assets/images/icon_27@2x.png" class="margin-bottom-xs" style="height:2.18rem">
    <div class="font-bold fs-18 margin-bottom">
      <span v-if="notify.params.is_no_commission">{{$t('CAN_NOT_GET_COMMISSION','无法获得佣金')}}</span>
      <span v-else>{{$t('COMMISSION_ARRIVED_NOTIFY','佣金到账通知')}}</span>
    </div>

    <!-- 没有获得下级的广告任务佣金 -->
    <div class="margin-bottom flex flex-direction bg-fef3ee border-radius-sm" v-if="notify.params.is_no_commission" style="width:100%">
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span class="fs-12">{{$t('YOUR_FRIEND_BUY_VIP_SPEND','您的N级好友N购买VIP花费了')}}</span>
        <money-number :value="notify.params.buy_money" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span class="fs-12">{{$t('BECAUSE_YOU_DO_NOT_BUY_VIP','由于您没有购买VIP')}}</span>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm">
        <span class="fs-12">{{$t('SO_YOU_CANNOT_GOT_IT','所以您无法获得佣金')}}</span>
        <money-number :value="notify.params.all_fee" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
    </div>

    <!-- 获得下级全部的广告任务佣金 -->
    <div class="margin-bottom flex flex-direction bg-fef3ee border-radius-sm" v-else-if="notify.params.is_get_all_commission" style="width:100%">
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span>{{$t('YOUR_FRIEND_BUY_VIP_SPEND','您的N级好友N购买VIP花费了')}}</span>
        <money-number :value="notify.params.buy_money" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm">
        <span>{{$t('CONGRATULATIONS_YOU_GOT','恭喜您获得了')}}</span>
        <money-number :value="notify.params.all_fee" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
    </div>

    <!-- 获得下级部分的广告任务佣金 -->
    <div class="margin-bottom flex flex-direction bg-fef3ee border-radius-sm" v-else style="width:100%">
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span class="fs-12">{{$t('YOUR_FRIEND_BUY_VIP_SPEND','您的N级好友N购买VIP花费了')}}</span>
        <money-number :value="notify.params.buy_money" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span class="fs-12">{{$t('YOU_CAN_GET_COMMISSION','您可获得佣金')}}</span>
        <money-number :value="notify.params.all_fee" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom">
        <span class="fs-12">{{$t('BECAUSE_YOU_BUY_VIP_SPEND','由于您购买VIP总共消费')}}</span>
        <money-number :value="notify.params.my_vip_buy_money_count" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
      <div class="flex align-center justify-between padding-lr padding-tb-sm">
        <span class="fs-12">{{$t('SO_YOU_ONLY_GET','所以您只能获得')}}</span>
        <money-number :value="notify.params.fee" class="money-number font-bold text-nowrap margin-left-xs"/>
      </div>
    </div>

    <van-button class="font-bold border-radius-sm bg-dark fc-fff margin-bottom-sm" block @click="startNow">
      <span v-if="notify.params.is_no_commission">{{$t('BUY_VIP','开通VIP')}}</span>
      <span v-else-if="!notify.params.is_get_all_commission">{{$t('UPGRADE_VIP','升级VIP')}}</span>
      <span v-else>{{$t('INVITE_FRIEND_GET_MORE_AWARD','邀请好友获取更多奖励')}}</span>
    </van-button>
<!--    <van-button class="font-bold border-radius-sm" color="#212328" plain block>{{$t('AWARD_RULE','奖励规则')}}</van-button>-->
  </div>
</template>

<script>
import {Button} from "vant"
import MoneyNumber from "../MoneyNumber";
import {Base} from "../../mixins";
export default {
  name: "VipCommissionNotify",
  components: {
    MoneyNumber,
    [Button.name]:Button
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  mixins: [Base],
  methods: {
    startNow() {
      this.$emit('read')
      if (this.notify.params.is_no_commission || !this.notify.params.is_get_all_commission) {
        this.$toRouter({name:'HomeVip'})
      } else {
        this.$toRouter({name:'Invite'})
      }
    }
  }
}
</script>

<style lang="scss">
.vip-commission-notify {

  .vip-chip {
    background:#3f434d;
    color:#ffdb99;
    height:0.5rem;
    line-height:0.5rem;
    display: flex;
    align-items: center;
    padding-right: 0.1rem;
    font-size: 14px;
    font-weight: 900;
    border-radius: 0.08rem;
  }
}
</style>