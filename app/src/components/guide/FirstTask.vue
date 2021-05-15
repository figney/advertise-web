<template>
  <div class="first-task">
    <van-popup
      v-model="show"
      :close-on-click-overlay="false"
      style="overflow:visible"
      class="no-bg"
    >
      <div class="flex flex-direction border-radius white-view vw-80 bounceInDown overflow-hidden position-re" style="overflow:visible">

        <div class="flex flex-direction padding bg-primary border-radius-top">
<!--          <div class="text-center fs-16 font-bold margin-bottom-sm">{{$t('WELCOME_TO_PLATFORM','欢迎来到A2广告分享平台')}}</div>-->
          <div class="text-center fs-16 font-bold margin-bottom-sm">
            <span>{{$t('WELCOME_TO_PROMOTE_PLATFORM','欢迎来到全民代言平台')}}</span>
          </div>
          <div class="">
            <span>{{$t('SHARE_AD_EVERY_DAY_CAN_MAKE_MONEY','全球各大知名品牌商都集中在这里，每天代言5分钟，即可享受免费领取100年代言费的资格。赶紧开始代言形象大使之旅吧！')}}</span>
          </div>
        </div>
        <div class="flex flex-direction padding-lr padding-top-xs">
          <div class="margin-bottom-sm text-center font-bold fc-ec4416 flash-title">
            <!--            <span>{{$t('GET_FIRST_AWARD_NOW','现在立刻开始赚第一桶金')}}</span>-->
            <span>{{$t('FREE_GET_MONEY','免费领钱')}}</span>
            <span class="fs-18" style="margin:0 0.06rem">100</span>
            <span>{{$t('YEAR','年')}}</span>
          </div>

          <div class="flex align-center border-radius-sm bg-fef3ee padding-lr-sm padding-tb-sm margin-bottom margin-lr-sm">
            <img :src="task.icon" class="size-48 border-radius-xs">
            <div class="flex flex-direction margin-left-sm">
              <div class="font-bold">{{task.data.title}}</div>
              <div class="flex align-center fc-error font-bold fs-16">
                <span class="margin-right-xs montserrat">+</span>
                <num-change class="money-number custom-unit-color" :value="task.money"/>
              </div>
            </div>
          </div>
        </div>
        <div class="padding-lr padding-bottom">
          <van-button
            class="border-radius-sm bg-primary font-bold fs-16 breath-btn wrap-btn"
            @click="startDoTask"
            block
          >
<!--            {{$t('START_SHARE_MAKE_MONEY','立刻开始分享赚钱')}}-->
            {{$t('FREE_GET_MONEY_NOW','立即成为代言人')}}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {Button, Icon, Popup} from "vant";
import MoneyNumber from "../MoneyNumber";
import {Toast} from "mand-mobile";
import NumChange from "../NumChange";

export default {
  components: {
    NumChange,
    MoneyNumber,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data: ()=> {
    return {
      show: false,
      task: {
        data: {}
      },
    }
  },
  mounted() {
    this.$bus.on('showFirstTask',()=>{
      if (!localStorage.getItem('GuideFirstTask')) {
        localStorage.setItem('GuideFirstTask',true)
        this.getData()
      }
    })
  },
  methods: {
    getData() {
      Toast.loading('loading')
      this.$http.get('v1/adTaskDetails',{
        params: {id:0,free:true}
      }).then(res=>{
        this.task = res.data.ad_task
        this.show = true
        Toast.hide()
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    startDoTask() {
      this.show =false
      this.$toRouter({name:'TaskDetail',query: { id:this.task.id }})
    },
  }
}
</script>

<style lang="scss">
.first-task {

  .flash-title {
    animation-delay: 1s;
    animation: swing 1.8s linear infinite;
  }

  .custom-unit-color {
    &::before,&::after {
      color: #ff0000 !important;
    }
  }

  @keyframes swing {
    10% {
      transform: rotate3d(0, 0, 1, 11deg);
    }

    20% {
      transform: rotate3d(0, 0, 1, -7deg) scale(1.02);
    }

    30% {
      transform: rotate3d(0, 0, 1, 3deg)  scale(1.04);
    }

    40% {
      transform: rotate3d(0, 0, 1, -3deg)  scale(1.02);
    }

    50%,100% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }
}
</style>