<template>
  <div class="deposit-result-page app-appbar flex flex-direction">
    <van-nav-bar
        :title="$t('ORDER_DETAIL', '订单详情')"
        class="no-border-bar shadow"
        fixed
        left-arrow
        @click-left="finishDeposit"
    />
    <div
        class="margin border-radius-sm white-view flex-sub flex flex-direction align-center justify-center position-re"
        v-if="toPay"
    >
      <img
          class="margin-bottom-lg"
          src="../assets/images/icon_20@2x.png"
          style="width:2rem"
      />
      <div class="margin-bottom-sm font-bold fs-20 text-center">
        {{ $t("ORDER_PAYING", "正在查询支付结果") }}
      </div>
      <div class="margin-bottom fc-888 text-center">
        {{ $t("PLEASE_WAIT", "请稍候") }}
      </div>
      <van-button class="font-bold wrap-btn border-radius-sm bg-dark fc-fff margin-bottom" style="width:6rem;min-height:1.2rem" @click="finishDeposit">{{$t('BACK_HOME','回到首页')}}</van-button>
    </div>

    <loading-view :text="$t('QUERYING_ORDER','正在查询订单')" v-else/>
  </div>
</template>

<script>
import { Button, NavBar } from "vant";
import { Toast } from 'mand-mobile';
import LoadingView from "@/components/LoadingView";
export default {
  components: {
    LoadingView,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
  },
  data: ()=> {
    return {
      toPay: false
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if (localStorage.getItem('GO_PAY')) {
        this.toPay = true
        localStorage.removeItem("GO_PAY");
      } else {
        Toast.failed(this.$t('SEARCH_ORDER_NO_RESULT','暂未查询到订单,请稍候再试'))
        setTimeout(()=>{
          this.$toRouter({name:'HomeUser'})
        },1500)
      }
    })
  },
  methods: {
    finishDeposit() {
      this.$toRouter({name:'HomeUser'});
    },
  },
};
</script>

<style lang="scss">
.deposit-result-page {
  min-height: 100vh;
}
</style>
