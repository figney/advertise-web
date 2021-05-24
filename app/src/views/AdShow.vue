<template>
  <div class="task-share-page flex flex-direction">
    <div class="flex flex-direction ad-content padding">
      <div class="flex align-center margin-bottom">
        <img :src="task.icon" class="margin-right-xs" style="height:0.8rem">
        <div class="font-bold fs-18">{{task.data.title}}</div>
      </div>
      <div class="margin-bottom render-html" v-html="task.data.content"/>
    </div>

    <!-- <div class="fixed-platform white-view shadow padding">
      <div class="text-center font-bold fc-error margin-top-xs margin-bottom bounce">{{$t('CLICK_ABOVE_MAKE_MONEY','日赚1000超简单,免费领钱100年')}}</div>
      <van-button class="bg-primary border-radius-sm font-bold breath-btn margin-bottom-xs" style="animation-delay:3s" block @click="startNow">{{$t('START_MAKE_MONEY_FREE','立刻开始免费赚钱')}}</van-button>
    </div> -->

<!--    <div class="fixed-finger">-->
<!--      <img src="../assets/images/icon_hand@2x.png" alt="">-->
<!--    </div>-->

  </div>
</template>

<script>
import utils from "@/utils"
import { Button, Icon } from "vant"
import {Toast} from "mand-mobile";
import {Base} from "../mixins";

export default {
  components: {
    [Button.name]:Button,
    [Icon.name]:Icon,
  },
  data: ()=> {
    return {
      task: {
        icon: '',
        data: {
          title: '',
          content: '',
        }
      }
    }
  },
  mixins: [Base],
  mounted() {
    let urlInfo = utils.getUrlKey(location.href)
    if (urlInfo.uat) {
      this.getData(urlInfo.uat)
    } else {
      this.$toRouter({name:'Beginner'})
    }
  },
  methods: {
    getData(uat) {
      Toast.loading('loading')
      this.$http.post('v1/adTaskCheck',{
        uat: uat
      }).then(res=>{
        this.task = res.data.user_ad_task.ad_task
        Toast.hide()
      }).catch(err=>{
        this.$toRouter({name:'Beginner'})
        Toast.hide()
      })
    },
    startNow() {
      if (this.isLogin) {
        this.$toRouter({name:'HomeIndex'})
      } else {
        this.$toRouter({name:'Beginner'})
      }
    }
  }
}
</script>

<style lang="scss">
.task-share-page {
  min-height: 100vh;

  .ad-content {
    position: relative;
    padding-bottom: 3.36rem;

    &::before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.08) 100%);
    }
  }

  .fixed-platform {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    animation-delay: 1s;
    animation-name: slideUp;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
  }

  .fixed-finger {
    z-index: 2;
    position: fixed;
    bottom: -0.2rem;
    right: 1rem;
    transform-origin: 100% 50%;
    animation: flashHand 0.8s linear infinite;

    img {
      height: 1.5rem;
    }
  }

  @keyframes slideUp {
    from {
      transform: translate(0, 100%);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @keyframes flashHand {
    0%,100% {
      transform: rotate3d(0,0,1,10deg);
    }
    50% {
      transform: rotate3d(0,0,1,0deg);
    }
  }
}
</style>