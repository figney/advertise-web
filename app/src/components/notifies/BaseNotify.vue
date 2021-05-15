<template>
  <div class="base-notify flex flex-direction">
    <!-- 通知标题 -->
    <div class="margin-lr padding-tb-sm text-center fs-16 font-bold" v-html="notify.title"/>

    <!-- 通知内容 -->
    <div class="margin-lr margin-bottom text-center" v-html="notify.content"/>

    <!--  底部按钮-->
    <div class="margin-lr margin-bottom">
      <van-button
          block
          class="border-radius-xs no-border bg-dark fc-fff font-bold"
          @click="$emit('read')"
      >
        {{$t('SURE','确定')}}
      </van-button>
    </div>

  </div>
</template>

<script>
import {Button} from "vant"

export default {
  name: "BaseNotify",
  components: {
    [Button.name]:Button,
  },
  props: {
    notify: {
      type: Object,
      default: Object
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.base-notify {

}
</style>