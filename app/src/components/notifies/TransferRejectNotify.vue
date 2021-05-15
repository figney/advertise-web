<template>
  <div class="transfer-reject-notify flex flex-direction align-center padding">
    <img src="../../assets/images/icon_10@2x.png" class="margin-bottom-sm" style="height:1.45rem">
    <div class="font-bold fs-18 margin-bottom-sm">{{$t('TRANSFER_FAILED','转账失败')}}</div>
    <div class="fc-accent margin-bottom text-center">{{notify.content}}</div>
    <van-button class="font-bold border-radius-sm bg-dark fc-fff" block>{{$t('VIEW_DETAIL','查看详情')}}</van-button>
  </div>
</template>

<script>
import {Button} from "vant"
export default {
  name: "TransferRejectNotify",
  components: {
    [Button.name]:Button
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
}
</script>

<style lang="scss">
.transfer-reject-notify {

}
</style>