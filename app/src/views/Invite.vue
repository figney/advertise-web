<template>
  <div class="invite-page flex flex-direction padding">
    <img class="girl-img" src="../assets/images/bak_invitation1@2x.png"/>
    <div class="margin-bottom">
      <img src="../assets/images/icon_return01@2x.png" style="height:0.42rem" @click="$router.go(-1)">
    </div>
    <base-notice-bar class="invite-notice-bar margin-bottom"/>
    <div class="invite-title-text">
      <span>{{$t('INVITE_FRIEND_DO_TASK_TOGETHER','邀请好友一起做任务')}}</span>
      <span>{{$t('ENJOY_FRIEND_YEAR_PROFIT','享受好友30%任务收益')}}</span>
    </div>

    <div style="height:0.72rem"/>

    <div class="white-view border-radius-sm padding flex flex-direction shadow margin-bottom">
      <div class="flex margin-bottom justify-center padding-lr-xs">
        <div class="flex flex-direction align-center text-center margin-lr-xs" style="width:1.5rem;overflow:visible">
          <div class="size-52 border-radius-50 avatar flex align-center justify-center margin-bottom-sm">
            <img src="../assets/images/icon_22@2x.png" style="width:56%">
          </div>
          <div class="text-wrap font-bold fs-12" style="min-width:2.667rem">{{$t('INVITE_FRIEND','邀请好友')}}</div>
        </div>
        <div class="bg-secondary flex-sub" style="height:0.05rem;margin-top:0.7733rem"></div>
        <div class="flex flex-direction align-center text-center margin-lr-xs" style="width:1.5rem;overflow:visible">
          <div class="size-52 border-radius-50 avatar flex align-center justify-center margin-bottom-sm">
            <img src="../assets/images/icon_23@2x.png" style="width:56%">
          </div>
          <div class="text-wrap font-bold fs-12" style="min-width:2.667rem">{{$t('FRIEND_FINISH_TASH','好友完成任务')}}</div>
        </div>
        <div class="bg-secondary flex-sub" style="height:0.05rem;margin-top:0.7733rem"></div>
        <div class="flex flex-direction align-center text-center margin-lr-xs" style="width:1.5rem;overflow:visible">
          <div class="size-52 border-radius-50 avatar flex align-center justify-center margin-bottom-sm">
            <img src="../assets/images/icon_24@2x.png" style="width:56%">
          </div>
          <div class="text-wrap font-bold fs-12" style="min-width:2.667rem">{{$t('GET_AWARD','获得奖励')}}</div>
        </div>
      </div>
      <van-button class="bg-dark fc-fff font-bold border-radius-sm" @click="inviteNow">{{$t('INVITE_NOW','立即邀请')}}</van-button>
    </div>

    <div class="white-view shadow padding-sm border-radius-sm flex flex-direction margin-bottom">
      <div class="fs-16 font-bold flex align-center justify-between margin-bottom-sm" @click="$toRouter({name:'Team'})">
        <span>{{$t('MY_TEAM','我的团队')}}</span>
        <van-icon name="arrow"/>
      </div>
      <div class="flex align-center margin-bottom-xs">
        <div class="flex-sub flex flex-direction padding-sm border-radius-xs" style="width:30%;background:#FFEBE3">
          <div class="margin-bottom-xs">{{$t('INVITE_AMOUNT','邀请人数')}}</div>
          <div class="fs-16 font-bold">{{user.invite.total}}</div>
        </div>
        <div class="padding-lr-xs"/>
        <div class="flex-sub flex flex-direction padding-sm border-radius-xs" style="width:30%;background:#FFEBE3">
          <div class="margin-bottom-xs">{{$t('TOTAL_PROFIT','累计收益')}}</div>
          <div class="fs-16 fc-ec4416 font-bold">
            <money-number :value="user.invite_award" class="money-number"/>
          </div>
        </div>
      </div>
    </div>

    <div class="white-view shadow padding-lr-sm padding-tb-xs border-radius-sm flex flex-direction margin-bottom">
      <div class="fs-16 font-bold margin-bottom-sm">
        <span>{{$t('INVITE_RULE','邀请规则')}}</span>
      </div>
      <div class="render-html fs-12 margin-bottom" v-html="inviteContent.content" v-if="inviteContent"/>
    </div>


  </div>
</template>

<script>
import BaseNoticeBar from "../components/BaseNoticeBar"
import {Button, Icon} from "vant"
import MoneyNumber from "../components/MoneyNumber";
import {Base} from "../mixins";
import {mapState} from "vuex";
import {Toast} from "mand-mobile";

export default {
  components: {
    MoneyNumber,
    BaseNoticeBar,
    [Button.name]:Button,
    [Icon.name]:Icon,
  },
  computed: {
    ...mapState(['inviteContent'])
  },
  mixins: [Base],
  mounted() {
    this.getInviteContent()
  },
  methods: {
    getInviteContent() {
      if (!this.inviteContent.content) {
        this.$http.post('v1/getArticle',{
          slug: 'INVITE_RULE'
        }).then(res=>{
          this.$store.commit('setState',{key:'inviteContent',value:res.data.articles})
        }).catch(err=>{
          Toast.failed(err.data.message)
        })
      }
    },
    inviteNow() {
      this.$bus.emit('share')
    }
  }
}
</script>

<style lang="scss">
.invite-page {
  min-height: 100vh;
  background: url("../assets/images/bak_invitation2@2x.png") no-repeat #f7f7f6;
  background-size: 100% auto;
  position: relative;
  overflow-x: hidden;

  .girl-img {
    z-index: 3;
    position: absolute;
    right: -0.1rem;
    top: 0.6rem;
    height: 4.4rem;
  }

  .invite-notice-bar {
    padding: 0 0.3rem;
    width: 6rem;
    max-height: 0.82rem;
    background-color: rgba(0,0,0,0.6) !important;
    border-radius: 0.5rem !important;

    img {
      display: none;
    }

    .md-swiper {
      min-height: 0.82rem !important;
      line-height: 0.41rem !important;

      .md-swiper-item {
        font-size: 10px !important;
        color: #FFFFFF !important;
        min-height: 0.82rem !important;
      }
    }
  }

  .invite-title-text {
    z-index: 4;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    text-shadow: 1px 3px 2px #EC4416;
  }
}
</style>