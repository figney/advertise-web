<template>
  <div class="white-view ad-card border-radius flex position-re" @click="toTask" style="padding:0.18rem">

    <div class="vip-level-card">
      <div class="vip-chip" v-if="ad.vip_level">
        <img src="../assets/images/icon_vip@2x.png" style="height:0.5rem">
        <span style="padding-bottom:0.04rem;margin-left:-0.06rem">{{ad.vip_level}}</span>
      </div>
      <div class="vip-chip vip-chip-free" v-else>
        <div style="padding:0 0.1rem 0 0.2rem">FREE</div>
      </div>
    </div>

    <div class="size-72 avatar border-radius-sm overflow-hidden flex align-center justify-center" style="margin-right:0.18rem">
      <img :src="ad.icon" style="width:100%" class="opacity-80">
    </div>

    <div class="flex flex-direction flex-sub" style="padding:0.04rem 0">
      <div class="font-bold fs-14 text-nowrap text-ellipsis overflow-hidden" style="max-width:6.4rem">{{ad.data.title}}</div>
      <div class="flex align-end">
        <div class="flex flex-direction flex-sub">
          <div class="fc-secondary flex align-center" style="margin-top:0.05rem">
            <div class="flex align-center font-bold fs-14 fc-accent">
              <div class="margin-right-sm fs-12 fc-secondary font-400">{{$t('PROMOTE_COMMISSION','奖励')}}:</div>
              <span class="font-bold" style="margin-right:0.04rem">+</span>
              <money-number class="money-number font-bold" :value="ad.money"/>
            </div>
          </div>
          <div class="fc-secondary fs-12 flex align-center" style="margin-top:0.05rem">
            <span class="margin-right-sm">{{$t('REST','剩余次数')}}:</span>
            <template v-if="ad.total">
<!--              <span class="font-bold fc-default">{{ad.total - ad.rest}}</span>-->
              <num-change class="font-bold fc-default" :value="ad.total - ad.rest" :from="ad.total"/>
              <span style="margin:0 0.04rem">/</span>
              <span class="font-bold">{{ad.total}}</span>
            </template>
            <template v-else>
              <span class="fc-default">{{$t('NOT_LIMIT','无限制')}}</span>
            </template>
          </div>
        </div>
        <div class="receive-btn" v-if="showButton">
          <span class="fs-12 font-bold text-wrap" v-if="end">{{$t('FINISH_TASK','完成任务')}}</span>
          <span class="fs-12 font-bold" v-else-if="finished">{{$t('DO_AGAIN','再做一次')}}</span>
          <span class="fs-12 font-bold" v-else>{{$t('RECEIVE_TASK','接取任务')}}</span>
          <div class="flex align-center" v-if="!end && !again && ad.total">
            <div class="margin-right-xs task-progress">
              <div class="finished-line" :style="'width:'+ Math.floor(100 * ad.rest/ad.total) + '%'" v-if="ad.rest"/>
            </div>
            <span class="fc-fff font-bold fs-8">{{Math.floor(100 * ad.rest/ad.total)}}%</span>
          </div>
          <div style="padding-top:0.085rem" v-else></div>
        </div>
      </div>
    </div>


    <!-- 上边的标题 -->
<!--    <div class="flex flex-direction flex-sub margin-bottom-sm">-->
<!--      <div class="font-bold margin-bottom-xs flex align-start justify-between">-->
<!--        <span class="margin-right-sm" v-if="ad.data">{{ad.data.title}}</span>-->
<!--        <div class="vip-chip">-->
<!--          <template v-if="ad.vip_level">-->
<!--            <img src="../assets/images/icon_vip@2x.png" style="height:0.5rem">-->
<!--            <span style="padding-bottom:0.04rem;margin-left:-0.06rem">{{ad.vip_level}}</span>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <div style="padding:0 0.1rem 0 0.2rem">FREE</div>-->
<!--          </template>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="font-bold fs-18 fc-accent flex align-center">-->
<!--        <span>+</span>-->
<!--        <money-number class="money-number" :value="ad.money"/>-->
<!--        <div class="flex-sub"/>-->
<!--        <div class="flex align-center" v-if="end">-->
<!--          <img src="../assets/images/icon_16@2x.png" class="margin-right-xs" style="height:0.36rem">-->
<!--          <van-count-down class="fs-12 font-bold" :time="time*1000" style="color:#ff0018"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!-- 下边的按钮 -->
<!--    <div class="flex flex-direction align-center justify-around">-->
<!--      <div class="bg-primary border-radius-xl text-center" style="width:100%;padding:0.22rem 0.48rem" @click="toTask">-->
<!--        <span class="fs-14 font-bold" v-if="end">{{$t('FINISH_TASK','完成任务')}}</span>-->
<!--        <span class="fs-14 font-bold" v-else-if="again">{{$t('DO_AGAIN','再做一次')}}</span>-->
<!--        <span class="fs-14 font-bold" v-else>{{$t('RECEIVE_TASK','接取任务')}}</span>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>

import {Button, CountDown} from "vant";
import MoneyNumber from "./MoneyNumber";
import NumChange from "./NumChange";

export default {
  components: {
    NumChange,
    MoneyNumber,
    [Button.name]: Button,
    [CountDown.name]: CountDown
  },
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    end: {
      type: Boolean,
      default: false
    },
    again: {
      type: Boolean,
      default: false
    },
    ad: {
      type: Object,
      default: Object
    },
    time: {
      type: Number,
      default: 0,
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toTask() {
      if (!this.finished) {
        this.$toRouter({name:'TaskDetail', query: { id: this.ad.id }})
      }
    }
  }
}
</script>

<style lang="scss">
.ad-card {
  position: relative;

  .vip-level-card {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    //left: 0.2667rem;
    //top: 0.2667rem;
    border-radius: 0 0.2667rem 0 0.2667rem;
    overflow: hidden;
    //box-shadow: 0 0 2px 1px rgba(254, 211, 42, 0.9);
  }

  .vip-chip {
    background: #3f434d;
    color:#ffdb99;
    height:0.5rem;
    line-height:0.5rem;
    display: flex;
    align-items: center;
    padding-right: 0.1rem;
    font-size: 14px;
    font-weight: 900;
  }

  .vip-chip-free {
    background: #5e6370;
    color: #f1f1f1 !important;
    font-size: 12px !important;
  }

  .receive-btn {
    background: linear-gradient(to right, #feb02a, #ff8900);
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0.12rem 0.16rem 0.05rem;
    width:2.1rem;
    border-radius: 0.1rem;
    color: #fff;
  }

  .task-progress {
    flex-grow: 1;
    height: 0.08rem;
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.4);
    border-radius: 0.1333rem;

    .finished-line {
      border-radius: 0.1333rem;
      background: rgba(255,255,255,1);
      height: 0.08rem;
      max-width: 100%;
      min-width: 10%;
    }
  }
}
</style>