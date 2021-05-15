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
    >
      <template v-if="!loadingOrder">
        <template v-if="order.order_status=='Paying' || order.order_status==undefined">
          <img
              class="margin-bottom"
              src="../assets/images/icon_20@2x.png"
              style="width:2.25rem"
          />
          <div class="margin-bottom-sm font-bold fs-24 text-center">
            {{ $t("ORDER_PAYING", "订单处理中") }}
          </div>
          <div class="margin-bottom fc-888 text-center">
            {{ $t("PLEASE_WAIT", "请稍候") }}
          </div>
        </template>

        <template v-else-if="order.order_status=='PaySuccess'">
          <img
              class="margin-bottom"
              src="../assets/images/icon_21@2x.png"
              style="width:2.25rem"
          />
          <div class="margin-bottom-sm font-bold fs-24 text-center">
            {{ $t("DEPOSIT_SUCCESS", "充值成功") }}
          </div>
          <div class="margin-bottom fc-888 text-center">
            {{ $t("SUCCESS_DEPOSIT_IN_N_TO_BALANCE",[order.amount+' '+order.wallet_type=='balance'?system.default_currency:'USDT'], "成功充值 N 余额") }}
          </div>
          <div class="margin padding-lr" style="width:100%">
            <van-button
                class="border-radius-xs font-bold bg-dark fc-fff"
                block
                @click="finishDeposit"
            >{{ $t("FINISH", "完成") }}</van-button
            >
          </div>
        </template>

        <template v-else>
          <img
              class="margin-bottom"
              src="../assets/images/icon_10@2x.png"
              style="width:2.25rem"
          />
          <div class="margin-bottom-sm font-bold fs-24 text-center">
            {{ $t("DEPOSIT_FAILED", "充值失败") }}
          </div>
          <div class="margin-bottom fc-888 text-center">
            {{ $t("DEPOSIT_NOT_ARRIVE", "充值未到账") }}
          </div>
          <div class="margin padding-lr" style="width:100%">
            <van-button
                class="border-radius-xs font-bold bg-dark fc-fff"
                block
                @click="finishDeposit"
            >{{ $t("CONTACT_CS", "联系客服") }}</van-button
            >
          </div>
        </template>
      </template>

      <loading-view :text="$t('QUERYING_ORDER','正在查询订单')" v-else/>
    </div>
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
      order: {},
      getTimer: null,
      loadingOrder: false,
    }
  },
  mounted() {
    this.getOrder(true);
  },
  beforeDestroy() {
    clearTimeout(this.getTimer)
  },
  methods: {
    getOrder(toast=false) {
      if (toast) {
        this.loadingOrder = true
      }
      this.$http.get('v1/getUserRechargeOrder',{
        params: {
          order_sn: this.$route.query.id
        }
      }).then(res=>{
        this.order = res.data
        if (this.order.order_status=='Paying') {
          this.getTimer = setTimeout(this.getOrder, 10000)
        }
        this.loadingOrder = false
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
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
