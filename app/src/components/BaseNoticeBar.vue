<template>
  <van-notice-bar
      :class="['border-radius-sm flex-sub base-notice-bar ',{'bg-dark ':(theme=='dark')}, {'white-view ':(theme!='dark')}]"
      :scrollable="false"
      :wrapable="true"
      @replay="replay"
      style="min-height:1.07rem"
  >
    <template #left-icon>
<!--      <img class="size-18 margin-right-xs" src="../assets/images/icon4@2x.png" alt="" v-if="blueIcon">-->
<!--      <img class="size-18 margin-right-xs" src="../assets/images/icon5@2x.png" alt="" v-else>-->
      <img src="../assets/images/icon_1@2x.png" class="margin-right-xs" style="height:0.76rem">
    </template>
    <loading-view v-if="loadingNoticeBar" style="height:1.07rem" iconTheme="light" :vertical="false" color="#ffffff"/>
    <md-swiper
        class="fs-13 position-re"
        vertical
        :dragable="false"
        :touchable="false"
        :autoplay="3000"
        transition="slideY"
        :is-prevent="false"
        :has-dots="false"
        style="height:1.07rem;line-height:0.52rem"
        :show-indicators="false"
        v-else
    >
      <md-swiper-item
          v-for="(item,i) in notice"
          :key="i"
          :class="['flex align-center ',{'fc-fff':(theme=='dark')},{'fc-default':(theme!='dark')}]"
      >
        <div class="text-nowrap text-ellipsis van-overflow-hidden" style="max-width:8rem">
          <span class="fs-13">{{item.who}} {{$t('SUCCESS_WITHDRAW_N',[system.default_currency +' '+ item.fee],'成功提现了N')}}</span>
          <!--          <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>-->
          <!--          <span v-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[(item.amount?item.amount:item.fee*randomInt())+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>-->
          <!--          <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>-->
          <!--          <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>-->
          <!--          <span v-else></span>-->
        </div>
      </md-swiper-item>
    </md-swiper>
  </van-notice-bar>
</template>

<script>
import {NoticeBar} from 'vant'
import {Swiper, SwiperItem, Toast} from 'mand-mobile'
import {Base} from "@/mixins";
import {mapState} from "vuex";
import LoadingView from "./LoadingView";

export default {
  components: {
    LoadingView,
    [NoticeBar.name]: NoticeBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  props: {
    blueIcon: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data: () => {
    return {
      loadingNoticeBar: true,
      s_notice: [],
      notice: [
        // {
        //   who: 'Tom',
        //   action: 'invite',
        //   friend: 'Jerry',
        //   fee: 200
        // },
        // {
        //   who: 'Jerry',
        //   action: 'deposit',
        //   amount: 1000,
        //   fee: 200
        // },
        // {
        //   who: 'Tom',
        //   action: 'profit',
        //   fee: 300
        // },
        // {
        //   who: 'Tom',
        //   action: 'award',
        //   fee: 200
        // },
      ]
    }
  },
  mixins: [Base],
  computed: {
    ...mapState(['baseNotice'])
  },
  mounted() {
    this.getNotices()
  },
  methods: {
    getNotices() {
      this.loadingNoticeBar = true
      if (this.baseNotice.length>0) {
        this.notice = this.baseNotice
        this.s_notice = this.notice
        this.loadingNoticeBar = false
      } else {
        this.$http.get('v1/annunciation')
            .then(res=>{
              this.$store.commit('setState',{key:'baseNotice',value:res.data})
              this.notice = res.data
              this.s_notice = this.notice
              this.loadingNoticeBar = false
            })
            .catch(err=>{
              Toast.failed(err.data.message)
            })
      }
    },
    replay() {
      this.notice = this.s_notice
    },
    randomInt(min=1, max=3) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
}
</script>

<style lang="scss">
.base-notice-bar {
  padding-top: 0;
  padding-left: 0.2rem;
  padding-bottom: 0;
  max-height: 1.07rem;

  .van-notice-bar__wrap {
    min-height: 1.07rem;

    .van-notice-bar__content {
      min-height: 1.07rem;
      width: 100%;
    }
  }
}
</style>
