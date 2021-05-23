<template>
  <div class="beginner-bak-page">
    <div class="beginner-title">
      {{$t('SHARE_AD_GET_CASH','分享广告赚现金')}}
    </div>

    <div class="beginner-girl">
      <img src="../assets/images/beginner_girl.png">
    </div>

    <div class="banners-wrap">
      <div class="flex-sub overflow-hidden scroll-wrap">
        <vue-seamless-scroll
            :data="notice"
            :class-option="{hoverStop:false}"
        >
          <div class="scroll-item" v-for="(item, index) in notice" :key="'beginner-notice-item'+index">
            <img :src="item.who | avatar" class="size-36 margin-right-sm avatar border-radius-50">
            <div class="text-wrap">
              <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
              <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[item.amount+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>
              <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>
              <span v-else-if="item.action=='award'">{{item.who}} {{$t('GETTED_N_AWARD',[item.fee+system.default_currency],'获得了N奖励')}}</span>
              <span v-else></span>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
      <div class="start-btn animate-btn" @click="startNow">{{$t('MAKE_MONEY_NOW','立即赚钱')}}</div>
      <div class="start-hand">
        <img src="../assets/images/icon_hand@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {Toast} from "mand-mobile"
import VueSeamlessScroll from "vue-seamless-scroll";
import {Base} from "../mixins";

export default {
  components: {
    VueSeamlessScroll
  },
  data: ()=> {
    return {
      notice: []
    }
  },
  computed: {
    ...mapState(['baseNotice']),
  },
  mixins: [Base],
  mounted() {
    this.getNotices()
  },
  methods: {
    startNow() {
      console.log(this.isLogin)
      if (this.isLogin) {
        this.$toRouter({name:'HomeIndex'})
      } else {
        this.$bus.emit('login')
      }
    },
    randomInt(min=1, max=3) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getNotices() {
      if (this.baseNotice.length>0) {
        this.notice = this.baseNotice
      } else {
        this.$http.get('v1/annunciation')
            .then(res=>{
              this.$store.commit('setState',{key:'baseNotice',value:res.data})
              res.data.forEach(e=>{
                if (e.action=='deposit') {
                  e.amount = e.amount ? e.amount : e.fee * this.randomInt()
                }
              })
              this.notice = res.data
            })
            .catch(err=>{
              console.log(err)
              Toast.failed(err.data.message)
            })
      }
    },
  }
}
</script>

<style lang="scss">
.beginner-bak-page {
  min-height: 100vh;
  background: url("../assets/images/beginner_bg.png") no-repeat #f65a4e;
  background-size: 100% auto;
  position: relative;

  .beginner-title {
    z-index: 3;
    position: fixed;
    top: 28px;
    left: 28px;
    font-weight: bold;
    font-size: 30px;
    color: #FFFFFF;
    text-shadow: 1px 4px 5px #f65a4e;
  }

  .beginner-girl {
    z-index: 2;
    position: fixed;
    right: -0.45em;
    top: 0.2rem;
    width: 4rem;

    img {
      width: 100%;
    }
  }

  .banners-wrap {
    z-index: 1;
    position: fixed;
    left: 1.2rem;
    right: 1.2rem;
    top: 3.95rem;
    bottom: 1.2rem;
    //background: #FDD5BE;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding-bottom: 48px;
    overflow: hidden;

    &::before {
      z-index: 2;
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0,0);
    }

    .scroll-wrap {
      z-index: 1;
      overflow: hidden;

      .scroll-item {
        border-radius: 1.5vw;
        padding: 2vw 3vw;
        background: #fff;
        backdrop-filter: blur(10px) saturate(2);
        display: flex;
        align-items: center;
        margin: 0 5vw 5vw !important;
        color: #f65a4e;

        img {
          width: 36px;
          height: 36px;
          min-width: 36px;
        }
      }
    }

    .start-btn {
      z-index: 2;
      position: fixed;
      bottom: 1.2rem;
      left: 1rem;
      right: 1rem;
      padding: 0.3rem 0.53rem;
      text-align: center;
      font-weight: bold;
      color: #FFFFFF;
      background: #f65a4e;
      border-radius: 24px;
      animation: animateBtn 0.8s linear infinite 0.1s;
    }

    .start-hand {
      z-index: 3;
      position: fixed;
      bottom: 0.2rem;
      right: 1.5rem;
      animation: animateHand 0.8s linear infinite 0.1s;

      img {
        width: 1.2rem;
      }
    }
  }

  @keyframes animateBtn {
    0% {
      box-shadow: 0 0 0 8px rgba(253, 216, 181, 0.8);
    }

    75%, 100% {
      box-shadow: 0 0 0 15px rgba(253, 216, 181, 0.05);
    }
  }

  @keyframes animateHand {
    0% {
      opacity: 1;
      transform: translate(0, -0.1rem);
    }

    75%, 100% {
      opacity: 0.1;
    }
  }
}
</style>