<template>
  <div class="task-share-page padding flex flex-direction">
    <div class="flex align-center margin-bottom">
      <img :src="task.icon" class="margin-right-xs" style="height:0.8rem">
      <div class="font-bold fs-18">{{task.data.title}}</div>
    </div>
    <div class="margin-bottom render-html" v-html="task.data.content"/>
<!--    <div class="margin-bottom border-radius-sm overflow-hidden">-->
<!--      <img :src="task.data.share_image" style="width:100%">-->
<!--    </div>-->
<!--    <div class="margin-bottom render-html" v-html="task.data.share_content"/>-->

    <div class="fixed-platform white-view shadow padding">
      <div class="text-center font-bold fc-error margin-bottom-sm">{{$t('CLICK_ABOVE_MAKE_MONEY','日赚1000超简单,免费领钱100年')}}</div>
      <van-button class="bg-primary border-radius-sm font-bold breath-btn" block @click="startNow">{{$t('START_MAKE_MONEY_FREE','立刻开始免费赚钱')}}</van-button>
    </div>

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
  padding-bottom: 3.36rem;

  .fixed-platform {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>