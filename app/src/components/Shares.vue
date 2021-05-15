<template>
  <div class="share-com">
    <van-popup v-model="show" class="border-radius-xs">
      <div class="padding flex flex-direction vw-90">
        <div class="text-center margin-bottom">{{$t('CLICK_BTN_AUTO_COPY','点击按钮自动复制分享链接')}}</div>
        <div class="flex align-center margin-bottom">
          <div class="padding-tb-sm padding-lr-sm bg-e8e8e8 border-radius-xs flex-sub margin-right-sm">{{share.url}}</div>
          <div class="bg-primary padding-tb-sm padding-lr-lg border-radius-xs" @click="startCopy('cp')">{{$t('COPY','复制')}}</div>
        </div>
        <div class="text-center margin-bottom">{{$t('CLICK_ICON_SHARE_FRIEND','点击下方图标分享给好友')}}</div>
        <div class="flex align-center justify-around margin-tb">
          <div class="flex flex-direction align-center" v-for="(item,i) in options" @click="onSelect(item)" :key="'share-item'+i">
            <img :src="item.icon" class="size-48 margin-bottom-xs">
            <div class="">{{item.name}}</div>
          </div>

        </div>
        <van-button class="bg-dark fc-fff font-bold border-radius-xs" @click="show=false">{{ $t('CANCEL','取消') }}</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {Button, Popup} from 'vant'
import {Toast} from "mand-mobile";
import {Base} from "../mixins";

export default {
  components: {
    [Popup.name]:Popup,
    [Button.name]:Button,
  },
  data: ()=> {
    return {
      show: false,
      options: [
        {
          name: 'Whatsapp',
          icon: require('../assets/images/icon_18@2x.png'),
          type: 'wa',
        },
        {
          name: 'Telegram',
          icon: require('../assets/images/icon_19@2x.png'),
          type: 'tg',
        },
        {
          name: 'Facebook',
          icon: require('../assets/images/icon_17@2x.png'),
          type: 'fb',
        },
      ],
    }
  },
  mixins: [Base],
  mounted(){
    this.$bus.on('share',()=>{
      if (!this.share.url) {
        this.getShareInfo()
      } else {
        this.showShare()
      }
    })
  },
  methods: {
    onSelect(item) {
      this.startCopy(item.type)
      let url = ''
      let lang = localStorage.getItem('language')
      switch (item.type) {
        case 'fb':
          this.$webEvent('facebook分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareUrl(item.type)}`)
          this.$openLink(`https://www.facebook.com/sharer.php?u=${url}`)
          break;
        case 'tw':
          this.$webEvent('twitter分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareUrl(item.type)}`)
          this.$openLink(`https://twitter.com/intent/tweet?url=${url}`)
          break;
        case 'tg':
          this.$webEvent('Telegram分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareText()} ${this.getShareUrl(item.type)}`)
          this.$openLink(`tg://msg_url?url=${url}`)
          break;
        case 'wa':
          this.$webEvent('Whatsapp分享点击', '分享活动页')
          url = encodeURIComponent(`${this.getShareText()} ${this.getShareUrl(item.type)}`)
          this.$openLink(`whatsapp://send?text=${url}`)
          break;
      }
    },
    getShareInfo() {
      Toast.loading('loading')
      this.$http.get('v1/shareInfo')
          .then(res=>{
            Toast.hide()
            this.$store.commit('setState',{key:'share',value: {
                url: res.data.url,
                contents: res.data.contents
              }})

            this.showShare()
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
    },
    getShareText() {
      let text = ''
      try {
        text = this.share.contents[Math.floor(Math.random() * (this.share.contents.length - 1))].title || ''
      } catch (e) {

      }
      return text
    },
    getShareUrl(type='cp') {
      let lang = localStorage.getItem('language')
      let url = `${this.share.url}&s=${type}&lang=${lang}`
      if (this.user.c_id) {
        url += `&ch=${this.user.c_id}`
      }
      if (this.user.l_id) {
        url += `&cl=${this.user.l_id}`
      }
      return url
    },
    showShare() {
      this.show = true
    },
    startCopy(type) {
      let url = this.getShareUrl(type)
      this.$copyText(this.getShareText() + ' ' + url)
    }
  }
}
</script>

<style lang="scss">

</style>