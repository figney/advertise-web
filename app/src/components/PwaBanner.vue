<template>
  <div class="pwa-banner flex align-center zoomIn" v-if="show && ifPwa" id="pwa-install-banner">
    <img src="../assets/images/icon_close@2x.png" style="height:0.45rem" class="margin-left-sm" @click="closeBanner">
    <div class="padding-sm fc-fff flex-sub">{{$t('INSTALL_APP','添加到主屏幕')}}</div>
    <van-button
      class="fc-fff bg-secondary no-border margin-lr-sm border-radius-xs font-bold"
      style="height:unset;padding:0.18rem 0.36rem"
      @click="install"
    >
      {{$t('SURE','确定')}}
    </van-button>
  </div>
</template>

<script>
import {Button} from "vant";
import {mobileApp} from "../mixins";
import {mapState} from "vuex";

export default {
  components: {
    [Button.name]:Button,
  },
  data: ()=>{
    return {
      show: false
    }
  },
  watch: {
    ifPwa() {
      let el = document.querySelector('#app')
      if (!this.ifPwa) {
        el.classList.remove('banner-safe-bottom')
      }

    },
    show() {
      let el = document.querySelector('#app')
      if (this.show) {
        el.classList.add('banner-safe-bottom')
      } else {
        el.classList.remove('banner-safe-bottom')
      }
    }
  },
  computed: {
    ...mapState(["ifPwa"])
  },
  mixins: [mobileApp],
  mounted() {
    this.$bus.on('showPwaBanner',()=>{
      this.show = true
      this.$bus.off('showPwaBanner')
    })
    setTimeout(()=>{
      this.show = true
    }, 3000)
  },
  methods: {
    closeBanner() {
      let el = document.getElementById('pwa-install-banner')
      if (el) {
        el.classList.remove('zoomIn')
        this.$nextTick(()=>{
          el.classList.add('zoomOut')
        })
      }
      setTimeout(()=>{
        this.show = false
      },360)
    },
    install() {
      this.saveApp()
      this.closeBanner()
    },
  }
}
</script>

<style lang="scss">

.banner-safe-bottom {
  .index-page,
  .message-page,
  .vip-page,
  .user-page {
    padding-bottom: 1.5rem;
  }
}

.pwa-banner {
  z-index: 4;
  position: fixed;
  bottom: 1.6rem;
  left: 0.5rem;
  right: 0.5rem;
  min-height: 1.3rem;
  border-radius: 8px;
  background: rgba(33, 35, 40, 0.85);
  box-shadow: 0 1px 15px 2px rgba(0,0,0,0.3);
  backdrop-filter: blur(5px);
}
</style>