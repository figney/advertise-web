<template>
  <div class="deposit-success-notify flex flex-direction align-center padding">
    <img src="../../assets/images/icon_11@2x.png" class="margin-bottom-sm" style="height:1.45rem">
    <div class="font-bold fs-18 margin-bottom-sm">{{$t('DEPOSIT_SUCCESS','充值成功')}}</div>
    <div class="fc-accent margin-bottom text-center">{{$t('DEPOSIT_N_CASH_ARRIVED', [notify.params.amount.toString()],'你充值的N现金已到账!')}}</div>
    <van-button class="font-bold border-radius-sm bg-dark fc-fff" block @click="startNow">{{$t('DO_TASK_MAKE_MONEY','立刻做任务赚钱')}}</van-button>
  </div>
</template>

<script>
import {Button} from "vant"
import {Base} from "../../mixins";
export default {
  name: "DepositSuccessNotify",
  components: {
    [Button.name]:Button
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  mixins: [Base],
  mounted() {
    this.$nextTick(()=>{
      this.$fbq('Purchase', {currency:this.system.fiat_code, value:this.notify.params.amount})
    })
  },
  methods: {
    startNow() {
      this.$emit('read')
      this.$toRouter({name:'Task'})
    },
  }
}
</script>

<style lang="scss">
.deposit-success-notify {

}
</style>