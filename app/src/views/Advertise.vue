<template>
  <div class="task-share-page flex flex-direction">
    <div class="flex flex-direction ad-content overflow-hidden">
      <div class="margin-top margin-lr-sm">
        <!-- <img  @click-left="$router.go(-1)" src="../assets/images/icon_return@2x.png" alt="" style="width:0.75rem;"> -->
        <van-nav-bar
          class="no-border-bar shadow"
          style="z-index: 3"
          fixed
          left-arrow
          @click-left="$router.go(-1)"
        >
          <template #title>
            <div class="fc-default">
              {{ $t("ADVERTISE_DETAIL", "广告详情") }}
            </div>
          </template>
        </van-nav-bar>
      </div>

      <!-- 广告详情 -->

      <div
        class="
          padding-lr-sm padding-top
          white-view
          flex flex-direction
          margin-bottom-sm
        "
        style="margin-top:1rem;"
      >
        <div
          class="
            border-radius-sm
            padding-tb-sm padding-lr
            bg-dark
            flex flex-direction
            fc-fff
            margin-bottom-sm
          "
          id="guide-task-detail-step-1"
        >
          <div class="flex align-center margin-bottom-sm">
            <img :src="task.icon" class="size-32 margin-right-sm" />
            <span class="fs-14 font-bold flex-sub margin-right-sm">{{
              task.data.title
            }}</span>
            <div class="vip-chip">
              <template v-if="task.vip_level">
                <img
                  src="../assets/images/icon_vip@2x.png"
                  style="height: 0.5rem"
                />
                <span style="padding-bottom: 0.04rem; margin-left: -0.06rem">{{
                  task.vip_level
                }}</span>
              </template>
              <span v-else style="padding-left: 0.1rem">FREE</span>
            </div>
          </div>

          <div class="flex justify-between align-center">
            <span class="fs-12">{{ $t("TASK_AWARD", "任务奖励") }}</span>
            <span class="font-bold fc-accent3 fs-19">
              <!-- <money-number class="money-number" :value="task.money"/> -->
              <num-change class="money-number" :value="task.money" />
            </span>
          </div>

         
          <div class="flex justify-between align-center margin-bottom-xs" >
            <span class="fs-12">{{ $t("TOTAL_TASK", "需要人数") }}</span>
            <span class="font-bold" v-if="task.total">{{ task.total }}</span>
            <span class="font-bold" v-else>{{
              $t("NOT_LIMIT", "无限制")
            }}</span>
          </div>
          <div
            class="flex justify-between align-center margin-bottom-xs"
            v-if="task.rest_count > 0"
          >
            <span class="fs-12">{{ $t("REST_TASK", "剩余人数") }}</span>
            <span class="font-bold">{{ task.rest_count }}</span>
          </div>
          <div class="flex justify-between align-center">
            <span class="fs-12">{{ $t("TASK_TIME", "代言时间") }}</span>
            <span class="font-bold">
              <span>{{ task.valid_hour }}</span>
              <span style="margin-left: 0.05rem">h</span>
            </span>
          </div>   
        </div>

        <template v-if="task.data.describe">
          <div class="font-bold margin-bottom-xs">
            {{ $t("TASK_DESC", "任务描述") }}
          </div>
          <div class="margin-bottom fs-12 fc-secondary">
            {{ task.data.describe }}
          </div>
        </template>
      </div>


<!-- 后台获取广告信息 check-->
      <div
        class="flex align-center margin-bottom"
        style="z-index: 2; "
      >
        <!-- <img :src="task.icon" class="margin-right-xs" style="height: 0.8rem" /> -->
        <div class="font-bold fs-18 padding-sm">{{ advertise.title }}</div>
      </div>
      <div
        class="padding-sm margin-bottom render-html"
        style="z-index: 2"
        v-html="advertise.content"
      />
    </div>

    <div class="fixed-platform white-view shadow padding">
      <van-button
        class="
          bg-primary
          border-radius-sm
          font-bold
          breath-btn
          margin-bottom-xs
          clickdown
        "
        style="animation-delay: 3s"
        block
        @click="startNow"
        >{{ $t("START_MAKE_MONEY_FREE", "立刻加入代言人") }}</van-button
      >
    </div>

    <div class="fixed-finger">
      <img src="../assets/images/icon_hand@2x.png" alt="" />
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import { Button, Icon, NavBar } from "vant";
import { Toast } from "mand-mobile";
import { Base } from "../mixins";
import MoneyNumber from "../components/MoneyNumber";
import NumChange from "../components/NumChange";
import AdCard from "../components/AdCard";

export default {
  components: {
    utils,
    AdCard,
    MoneyNumber,
    NumChange,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
  },
  data: () => {
    return {
      advertise: {
        title: "",
        content: "",
      },
      time: 15,
      clockInterval: {},
      task: {
        vip_level: "",
        complete_click_number: "",
        money: "",
        data: {},
      },
    };
  },
  mixins: [Base],
  mounted() {
    this.getAdvertise();
    this.countdown();

  },
  methods: {
    countdown() {
      window.clearInterval(this.clockInterval);
      this.clockInterval = setInterval(() => {
        if (--this.time <= 0) {
          window.clearInterval(this.clockInterval);
          this.getData();
        }
      }, 1000);
    },

    getData() {
      //Toast.loading("loading");
      this.$http
        .post("v1/adTaskCheck", {
          uat: this.$route.query.uat,
        })
        .then((res) => {
          if(res.data.user_ad_task.status == 'Finished'){
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAdvertise() {
      let lang = window.localStorage.getItem("language");
      this.$http
        .get("v1/at1", {
          params: {
            uat: this.$route.query.uat,
            lang: lang,
          },
        })
        .then((res) => {
         
          this.advertise = res;
        })
        .catch((err) => {
          
        });
    },

    startNow() {
      //this.$webEvent(`点击加入我是代言人`, this.$route.name + "页面");
      this.getData();
      this.$toRouter({ name: "HomeTasks" });
    },
  },
  beforeDestroy() {
    window.clearInterval(this.clockInterval);
  },
};
</script>

<style lang="scss">
.task-share-page {
  min-height: 100vh;

  .ad-content {
    position: relative;
    padding-bottom: 3.36rem;

    //&::before {
    //  position: absolute;
    //  content: "";
    //  left: 0;
    //  right: 0;
    //  top: 0;
    //  bottom: 0;
    //  background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.08) 100%);
    //}
  }

  .fixed-platform {
    z-index: 3;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    animation-delay: 2s;
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
    0%,
    100% {
      transform: rotate3d(0, 0, 1, 10deg);
    }
    50% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }
}
</style>
