<template>
  <div>
    <div
      class="white-view ad-card border-radius flex position-re"
      @click="getTaskTheAdTask(status, uatid)"
      style="padding: 0.18rem"
    >
      <div class="vip-level-card">
        <div class="vip-chip" v-if="ad.vip_level">
          <img src="../assets/images/icon_vip@2x.png" style="height: 0.5rem" />
          <span style="padding-bottom: 0.04rem; margin-left: -0.06rem">{{
            ad.vip_level
          }}</span>
        </div>
        <div class="vip-chip vip-chip-free" v-else>
          <div style="padding: 0 0.1rem 0 0.2rem">FREE</div>
        </div>
      </div>

      <div
        class="
          size-72
          avatar
          border-radius-sm
          overflow-hidden
          flex
          align-center
          justify-center
        "
        style="margin-right: 0.18rem"
      >
        <img :src="ad.icon" style="width: 100%" class="opacity-80" />
      </div>

      <div class="flex flex-direction flex-sub" style="padding: 0.04rem 0">
        <div
          class="font-bold fs-14 text-nowrap text-ellipsis overflow-hidden"
          style="max-width: 6.4rem"
        >
          {{ ad.data.title }}
        </div>
        <div class="flex align-end">
          <div class="flex flex-direction flex-sub">
            <div
              class="fc-secondary flex align-center"
              style="margin-top: 0.05rem"
            >
              <div class="flex align-center font-bold fs-14 fc-accent">
                <div class="margin-right-sm fs-12 fc-secondary font-400">
                  {{ $t("PROMOTE_COMMISSION", "奖励") }}:
                </div>
                <span class="font-bold" style="margin-right: 0.04rem">+</span>
                <money-number
                  class="money-number font-bold"
                  :value="ad.money"
                />
              </div>
            </div>
            <div
              class="fc-secondary fs-12 flex align-center"
              style="margin-top: 0.05rem"
            >
              <span class="margin-right-sm">{{ $t("REST", "剩余次数") }}:</span>
              <template v-if="ad.total">
                <!--              <span class="font-bold fc-default">{{ad.total - ad.rest}}</span>-->
                <num-change
                  class="font-bold fc-default"
                  :value="ad.total - ad.rest"
                  :from="ad.total"
                />
                <!--              <span style="margin:0 0.04rem">/</span>-->
                <!--              <span class="font-bold">{{ad.total}}</span>-->
              </template>
              <template v-else>
                <span class="fc-default">{{ $t("NOT_LIMIT", "无限制") }}</span>
              </template>
            </div>
          </div>
          <div class="receive-btn" v-if="showButton">
            <span class="fs-12 font-bold text-wrap" v-if="end">{{
              $t("FINISH_TASK", "完成任务")
            }}</span>
            <span class="fs-12 font-bold" v-else-if="finished">{{
              $t("DO_AGAIN", "再做一次")
            }}</span>
            <span class="fs-12 font-bold" v-else>{{
              $t("RECEIVE_TASK", "接取任务")
            }}</span>
            <div class="flex align-center" v-if="!end && !again && ad.total">
              <div class="margin-right-xs task-progress">
                <div
                  class="finished-line"
                  :style="
                    'width:' + ((ad.rest / ad.total) * 100).toFixed(3) + '%'
                  "
                  v-if="ad.rest"
                />
              </div>
              <span class="fc-fff font-bold fs-8"
                >{{ ((ad.rest / ad.total) * 100).toFixed(3) }}%</span
              >
            </div>
            <div style="padding-top: 0.085rem" v-else></div>
          </div>
        </div>
      </div>
    </div>
    <div class="white-view">
      <!-- 等级不足 -->
      <van-popup v-model="showLessThenLevel" class="vw-80 border-radius-sm">
        <div class="padding flex flex-direction align-center position-re">
          <!-- @click="showLessThenLevel = false" -->

          <!--        <img src="../assets/images/icon_10@2x.png" alt="" class="margin-bottom-sm size-52">-->
          <img
            :src="ad.icon"
            class="margin-bottom-sm size-52 border-radius"
            style="height: 1.39rem"
          />

          <!--        <div class="font-bold fs-18 margin-bottom-xs text-center">{{$t('UPGRADE_VIP','升级VIP')}}</div>-->
          <div class="font-bold margin-bottom-xs text-center fs-18 font-bold">
            <span class="font-400 fc-secondary fs-16 margin-right-xs"
              >{{ $t("PROMOTE_COMMISSION", "奖励") }}:</span
            >
            <money-number
              class="money-number custom-unit-color"
              :value="ad.money"
            />
          </div>
          <div class="fs-16 margin-bottom fc-accent text-center">
            {{
              $t(
                "CURRENT_TASK_ONLY_VIP_N",
                [ad.vip_level.toString()],
                "升级到Lv{0}即可代言该品牌"
              )
            }}
          </div>
          <van-button
            class="bg-dark fc-fff border-radius-sm"
            block
            @click="toUpgradeLevel(ad.vip_level)"
            >{{
              $t(
                "UPGRADE_VIP_N_GET_MORE_MONEY",
                [ad.vip_level.toString()],
                "立即获得Lv{0}资格"
              )
            }}</van-button
          >
        </div>
      </van-popup>

      <!-- 次数不足 -->
      <van-popup v-model="showShortCount" class="vw-80 border-radius-sm">
        <div class="padding flex flex-direction align-center position-re">
          <!-- @click="showShortCount = false" -->

          <img
            src="../assets/images/icon_10@2x.png"
            alt=""
            class="margin-bottom size-52"
          />
          <div class="font-bold fs-18 margin-bottom-xs text-center">
            {{ $t("TASK_COUNT_SHORT", "接取任务次数不足") }}
          </div>
          <div class="fs-16 margin-bottom fc-accent text-center">
            {{
              $t(
                "TASK_COUNT_SHORT_THAN_CONTINUE",
                "接取任务次数不足，购买次数继续"
              )
            }}
          </div>
          <van-button
            class="bg-dark fc-fff border-radius-sm"
            block
            @click="toBuyTaskNum(ad.vip_level)"
            >{{ $t("BUY_COUNT", "购买次数") }}</van-button
          >
        </div>
      </van-popup>

      <!-- 任务过期 -->
      <van-popup v-model="showTaskExpired" class="vw-80 border-radius-sm">
        <div class="padding flex flex-direction align-center position-re">
          <van-icon
            size="0.52rem"
            name="cross"
            class="position-ab close-icon"
            @click="showTaskExpired = false"
          />

          <img
            src="../assets/images/icon_10@2x.png"
            alt=""
            class="margin-bottom size-52"
          />
          <div class="font-bold fs-18 margin-bottom-xs text-center">
            {{ $t("TASK_EXPIRED", "任务超时") }}
          </div>
          <div class="fs-16 margin-bottom fc-accent text-center">
            {{ $t("PLEASE_FINISH_TASK_ON_TIME", "请在规定时间之内完成任务") }}
          </div>
          <van-button
            class="bg-dark fc-fff border-radius-sm"
            block
            @click="showTaskExpired = false"
            >{{ $t("RECEIVE_AGAIN", "重新接取") }}</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Button, CountDown, Popup, Icon } from "vant";
import MoneyNumber from "./MoneyNumber";
import NumChange from "./NumChange";
import { Toast } from "mand-mobile";

export default {
  components: {
    NumChange,
    MoneyNumber,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  data: () => {
    return {
      uat: "",
      showLessThenLevel: false,
      showShortCount: false,
      user_ad_task: {},
      showTaskExpired: false,
    };
  },
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    end: {
      type: Boolean,
      default: false,
    },
    again: {
      type: Boolean,
      default: false,
    },
    ad: {
      type: Object,
      default: Object,
    },
    time: {
      type: Number,
      default: 0,
    },
    uatid: {
      type: Number,
      default: 0,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    status: "",
  },
  mounted() {},
  methods: {
    toUpgradeLevel(level) {
      this.showLessThenLevel = false;
      this.$toRouter({ name: "HomeVip", query: { lv: level } });
    },
    toBuyTaskNum(level) {
      this.showShortCount = false;
      this.$toRouter({ name: "HomeVip", query: { lv: level } });
    },
    getTaskTheAdTask(status, uatid) {
      if (status == "InProgress") {
        this.$toRouter({
          name: "Advertise",
          query: { id: this.ad.id, uat: uatid },
        });
        return;
      }
      this.$http
        .post("v1/takeTheAdTask", {
          id: this.ad.id,
        })
        .then((res) => {
          this.uat = res.data.user_ad_task.id;
          //this.$toRouter({ name: "Advertise", query: { id: this.ad.id, uat: this.uat } });
          if (!this.finished) {
            this.$toRouter({
              name: "Advertise",
              query: { id: this.ad.id, ad: this.ad, uat: this.uat },
            });
          } else {
            console.log(res);
            this.$toRouter({
              name: "Advertise",
              query: { id: this.ad.id, ad: this.ad, uat: this.uat },
            });
          }
        })
        .catch((err) => {
          //等级不足
          if (err.data.message == "10001") {
            this.showLessThenLevel = true;
            //Toast.hide();
          } else if (err.data.message == "10002") {
            //次数不足
            this.showShortCount = true;
          } else {
            Toast.failed(err.data.message);
          }
        });
    },
    getadTaskDetails() {
      this.$http
        .get("v1/adTaskDetails", {
          params: { id: this.ad.id },
        })
        .then((res) => {
          // res.data.ad_task.complete_click_number = res.data.ad_task
          //   .complete_click_number
          //   ? res.data.ad_task.complete_click_number
          //   : 0;
          this.task = res.data.ad_task;
          this.$set(this.task, "rest_count", this.task.total - this.task.rest);
          this.user_ad_task = this.task.user_ad_task || {};
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
  },
};
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
    color: #ffdb99;
    height: 0.5rem;
    line-height: 0.5rem;
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
    width: 2.1rem;
    border-radius: 0.1rem;
    color: #fff;
  }

  .task-progress {
    flex-grow: 1;
    height: 0.08rem;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 0.1333rem;

    .finished-line {
      border-radius: 0.1333rem;
      background: rgba(255, 255, 255, 1);
      height: 0.08rem;
      max-width: 100%;
      min-width: 10%;
    }
  }
}
</style>
