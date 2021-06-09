<template>
  <div class="task-detail-page app-appbar flex flex-direction">
    <van-nav-bar
      class="no-border-bar shadow"
      style="z-index: 3"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="toMyTasks"
    >
      <template #title>
        <div class="fc-default">
          {{ $t("TASK_DETAIL", "任务详情") }}
        </div>
      </template>
      <template #right>
        <span>{{ $t("MY_TASK", "我的任务") }}</span>
      </template>
    </van-nav-bar>

    <div class="flex flex-direction position-re flex-sub" v-if="isLoading">
      <loading-view />
    </div>

    <div class="flex flex-direction" v-else>
      <div
        class="
          padding-lr-sm padding-top
          white-view
          flex flex-direction
          margin-bottom-sm
        "
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
              <!--              <money-number class="money-number" :value="task.money"/>-->
              <num-change class="money-number" :value="task.money" />
            </span>
          </div>

          <template
            v-if="task.rest_count || user_ad_task.status == 'InProgress'"
          >
            <div class="flex justify-between align-center margin-bottom-xs">
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
          </template>

          <template v-else>
            <div
              class="
                fs-20
                fc-accent
                font-bold
                text-center
                padding-xs
                margin-bottom-xs
              "
            >
              {{ $t("TASK_IS_ENDED", "任务已结束") }}
            </div>
          </template>
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

      <div class="white-view padding-sm flex flex-direction">
        <template v-if="task.rest_count || user_ad_task.status == 'InProgress'">
          <!-- <div class="font-bold margin-bottom-xs">
            {{ $t("TASK_REQUIREMENTS", "任务要求") }}
          </div>
          <div
            class="
              border-radius-sm
              padding-sm
              bg-f1f1f1
              fs-12
              fc-error
              flex
              align-center
              margin-bottom
            "
          >
            <img
              src="../assets/images/icon_26@2x.png"
              style="height: 0.46rem"
              class="margin-right-sm"
            />
            <span>{{
              $t(
                "TASK_REQUIREMENTS_CONTENT_N_CLICK",
                [task.complete_click_number],
                "分享完成之后N个有效好友点击链接即可完成任务，奖励将自动发放到您的账户"
              )
            }}</span>
          </div> -->
          <div class="font-bold margin-bottom-xs">
            {{ $t("TASK_STEPS", "任务步骤") }}
          </div>

          <!-- 步骤1 -->
          <div
            :class="[
              'task-step-item',
              { 'task-step-item__active': activeStep == 1 },
            ]"
            id="task-step-1"
          >
            <div class="font-bold flex align-start margin-bottom">
              <div
                class="
                  size-18
                  bg-dark
                  fc-fff
                  border-radius-50
                  flex
                  align-center
                  justify-center
                  fs-10
                  margin-right-xs
                "
                style="margin-top: 0.04rem"
              >
                1
              </div>
              <span>{{
                $t("CLICK_RECEIVE_TASK", "点击下放按钮接取任务")
              }}</span>
            </div>
            <van-button
              class="bg-primary font-bold fs-16 no-border border-radius-xs"
              @click="startTask"
              id="guide-task-detail-step-2"
            >
              <span v-if="user_ad_task.status == 'InProgress'">{{
                $t("HAS_RECEIVED", "正在代言...")
              }}</span>
              <span v-else>{{ $t("RECEIVE_TASK", "立刻开始代言") }}</span>
            </van-button>
          </div>

          <!-- 步骤2 -->
          <div
            :class="[
              'task-step-item',
              { 'task-step-item__active': activeStep > 1 },
            ]"
            id="task-step-2"
          >
            <div class="font-bold flex align-start margin-bottom">
              <div
                class="
                  size-18
                  bg-dark
                  fc-fff
                  border-radius-50
                  flex
                  align-center
                  justify-center
                  fs-10
                  margin-right-xs
                "
                style="margin-top: 0.04rem"
              >
                2
              </div>
              <span>{{
                $t(
                  "AFTER_RECEIVE_TASK_N_HOURS",
                  [task.valid_hour],
                  "开始代理任务后，请在1个小时内观看视频，点击下方按钮进行观看"
                )
              }}</span>
            </div>
            <div
              class="
                margin-bottom-sm
                border-radius-xs
                flex
                align-center
                justify-center
                overflow-hidden
              "
              style="border: 1px solid #ddd"
            >
              <img :src="task.data.share_image" style="width: 100%" />
            </div>
            <!--            <div class="margin-bottom-sm text-center fc-accent font-bold">{{$t('LONG_TOUCH_IMG_TO_SAVE','长按此图保存宣传图片')}}</div>-->
            <div
              class="
                border-radius-sm
                padding-sm
                bg-f1f1f1
                fs-12
                flex
                align-center
                margin-bottom
              "
            >
              <span v-if="task.data.share_content">{{
                task.data.share_content.replace("{URL}", "")
              }}</span>
            </div>
            <van-button
              class="
                bg-primary
                font-bold
                fs-16
                no-border
                border-radius-xs
                position-re
              "
              @click="startCopy('cp')"
              id="guide-task-detail-step-3"
            >
              {{ $t("COPY_SHARE_TEXT", "复制您的专属代言词") }}
            </van-button>
          </div>

          <!-- 步骤3 -->
          <!-- <div
            :class="[
              'task-step-item',
              { 'task-step-item__active': activeStep > 1 },
              { 'flash-share': showFlashShare },
            ]"
            id="task-step-3"
          >
            <div class="font-bold flex align-start margin-bottom-sm">
              <div
                class="
                  size-18
                  bg-dark
                  fc-fff
                  border-radius-50
                  flex
                  align-center
                  justify-center
                  fs-10
                  margin-right-xs
                "
                style="margin-top: 0.04rem"
              >
                3
              </div>
              <span>{{
                $t(
                  "MANUAL_CONTROL_TO_SHARE",
                  "手动或点击 whatsaapp fb等一键分享图标进行 分享。"
                )
              }}</span>
            </div>
            <div
              class="margin-bottom-sm text-center fc-error"
              v-if="!showShareDetail"
            >
              {{ $t("CLICK_TO_QUICK_SHARE", "点击图标快速分享给朋友") }}
            </div>
            <div
              class="flex align-center justify-around margin-top-sm"
              id="guide-task-detail-step-4"
            >
              <div class="border-radius-sm padding-sm margin-lr-sm bg-f1f1f1">
                <img
                  src="../assets/images/icon_17@2x.png"
                  style="height: 1.4rem"
                  @click="copyPlat('fb')"
                />
              </div>

              <div class="border-radius-sm padding-sm margin-lr-sm bg-f1f1f1">
                <img
                  src="../assets/images/line.jpg"
                  style="height: 1.4rem"
                  @click="copyPlat('line')"
                />
              </div>
              <div class="border-radius-sm padding-sm margin-lr-sm bg-f1f1f1">
                <img
                  src="../assets/images/icon_19@2x.png"
                  style="height: 1.4rem"
                  @click="copyPlat('tg')"
                />
              </div>
            </div>
            <div
              class="margin-top fc-error text-center font-bold bounce"
              v-if="showShareDetail"
            >
              {{
                $t(
                  "CLICK_TO_QUICK_SHARE",
                  "您还没有分享给好友您的代言信息，快点分享给好友领取代言奖金吧"
                )
              }}
            </div>
          </div> -->

          <!-- 步骤4 -->
          <!-- <div
            :class="[
              'task-step-item',
              { 'task-step-item__active': activeStep > 1 },
            ]"
            id="task-step-4"
          >
            <div class="font-bold flex align-start margin-bottom">
              <div
                class="
                  size-18
                  bg-dark
                  fc-fff
                  border-radius-50
                  flex
                  align-center
                  justify-center
                  fs-10
                  margin-right-xs
                "
                style="margin-top: 0.04rem"
              >
                4
              </div>
              <span>{{
                $t(
                  "TASK_AUTO_FINISHED_N_FRIEND",
                  [task.complete_click_number.toString()],
                  "分享后，有N个好友点击观看后，即可自动获取奖金。"
                )
              }}</span>
            </div>

            <div
              class="
                flex flex-direction
                align-center
                justify-center
                margin-lr-xs
              "
              v-if="user_ad_task.status == 'InProgress'"
            >
              <div
                class="
                  flex
                  align-center
                  justify-between
                  bg-fef3ee
                  padding-tb-sm padding-lr-sm
                  margin-bottom-xs
                  border-radius-xs
                "
                style="width: 100%"
              >
                <span class="fc-secondary">{{
                  $t("TASK_END_COUNT_DOWN", "任务结束倒计时")
                }}</span>
                <div class="flex-sub" />
                <van-count-down
                  millisecond
                  :time="user_ad_task.expired_time * 1000"
                  @finish="taskExpired"
                  class="font-bold"
                  style="color: #ff0018; font-size: 0.48rem"
                  format="HH:mm:ss:S"
                />
              </div>

              <div
                class="
                  flex
                  align-center
                  justify-between
                  bg-fef3ee
                  padding-tb-sm padding-lr-sm
                  margin-bottom-xs
                  border-radius-xs
                "
                style="width: 100%"
              >
                <span class="fc-secondary">{{
                  $t("CAN_GET_AWARD", "可获得奖金")
                }}</span>
                <div class="flex-sub" />
                <money-number
                  class="font-bold fs-18 money-number bounce"
                  :value="task.money"
                />
              </div>

              <div
                class="
                  flex
                  align-center
                  justify-between
                  bg-fef3ee
                  padding-tb-sm padding-lr-sm
                  margin-bottom-xs
                  border-radius-xs
                "
                style="width: 100%"
              >
                <span class="fc-secondary">{{
                  $t("CLICKED_NUM", "已点击次数")
                }}</span>
                <div class="flex-sub" />
                <div class="font-bold fs-18 flex align-center montserrat">
                  <span class="fc-secondary">{{ now_click_number }}</span>
                  <span class="margin-lr-xs">/</span>
                  <span>{{ task.complete_click_number }}</span>
                </div>
              </div>

              <div class="margin-bottom" />

              <div
                class="
                  border-radius-sm
                  padding-sm
                  bg-f1f1f1
                  fs-12
                  fc-error
                  margin-bottom
                "
              >
                <span>{{
                  $t(
                    "TIP_LET_YOUR_FRIEND_CLICK_YOUR_LINK",
                    "小提示：让您的好友快快浏览下您分享过去的内容链接，即可快速获得奖金"
                  )
                }}</span>
              </div>
            </div>
          </div> -->
        </template>
        <div class="margin-bottom margin-lr-xs">
          <van-button
            class="bg-dark fc-fff border-radius-xs font-bold"
            block
            @click="viewOtherTasks(false)"
            >{{
              $t("DO_OTHER_GET_MORE_PROFIT", "我要代言更多品牌")
            }}</van-button
          >
        </div>
      </div>
    </div>

    <!-- 接取成功 -->
    <van-popup v-model="showStartSuccess" class="vw-80 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="closeStartSuccess"
        />

        <img
          src="../assets/images/icon_11@2x.png"
          alt=""
          class="margin-bottom size-52"
        />
        <div class="font-bold fs-18 margin-bottom-xs text-center">
          {{ $t("RECEIVE_SUCCESS", "接取成功") }}
        </div>
        <div class="fs-16 margin-bottom fc-accent text-center">
          <span
            >{{ $t("FINISHED_TASK_CAN_GET_N", [""], "完成任务可获得") }}
          </span>
          <money-number class="money-number font-bold" :value="task.money" />
        </div>
        <van-button
          class="bg-dark fc-fff border-radius-sm"
          block
          @click="closeStartSuccess"
          >{{ $t("CONTINUE", "继续") }}</van-button
        >
      </div>
    </van-popup>

    <!-- 还未分享，确定跳转 -->
    <van-popup v-model="showConfirmJump" class="vw-90 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showConfirmJump = false"
        />
        <img
          src="../assets/images/warning.png"
          alt=""
          class="margin-bottom size-52"
        />
        <div class="font-bold margin-bottom text-center flex flex-direction">
          <span>{{
            $t(
              "TASK_NOT_SHARED",
              "当前代言任务尚未完成分享，是否确定查看其他代言信息?"
            )
          }}</span>
        </div>
        <div class="flex align-stretch justify-between" style="width: 100%">
          <div style="width: 40%" class="padding-right-xs">
            <van-button
              class="border-radius-xs font-bold"
              style="border: 1px solid #ccc"
              block
              @click="viewOtherTasks(true)"
              >{{ $t("CONTINUE", "继续") }}</van-button
            >
          </div>
          <div class="flex-sub" style="width: 60%">
            <van-button
              class="bg-primary border-radius-xs font-bold"
              block
              @click="flashShareStep(true)"
              >{{ $t("GO_SHARE", "去分享") }}</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 等级不足 -->
    <van-popup v-model="showLessThenLevel" class="vw-80 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showLessThenLevel = false"
        />

        <!--        <img src="../assets/images/icon_10@2x.png" alt="" class="margin-bottom-sm size-52">-->
        <img
          :src="task.icon"
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
            :value="task.money"
          />
        </div>
        <div class="fs-16 margin-bottom fc-accent text-center">
          {{
            $t(
              "CURRENT_TASK_ONLY_VIP_N",
              [task.vip_level.toString()],
              "升级到Lv{0}即可代言该品牌"
            )
          }}
        </div>
        <van-button
          class="bg-dark fc-fff border-radius-sm"
          block
          @click="toUpgradeLevel(task.vip_level)"
          >{{
            $t(
              "UPGRADE_VIP_N_GET_MORE_MONEY",
              [task.vip_level.toString()],
              "立即获得Lv{0}资格"
            )
          }}</van-button
        >
      </div>
    </van-popup>

    <!-- 次数不足 -->
    <van-popup v-model="showShortCount" class="vw-80 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showShortCount = false"
        />

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
          @click="toBuyTaskNum"
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

    <!-- 引导更多任务 -->
    <van-popup
      v-model="showRandomTask"
      class="no-bg vh-100 vw-100 flex align-center justify-center"
    >
      <div
        class="
          padding
          flex flex-direction
          align-center
          position-re
          vw-80
          border-radius-sm
          white-view
          bounceInDown
        "
      >
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showRandomTask = false"
        />

        <div class="fs-16 font-bold margin-bottom-sm">
          {{ $t("DO_OTHER_GET_MORE_PROFIT", "我要代言更多品牌") }}
        </div>

        <template v-for="(ad, i) in randomTasks">
          <ad-card
            :ad="ad"
            :key="'random-ad' + i"
            :showButton="false"
            style="width: 100%"
            class="bg-fef3ee margin-top-sm"
          />
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Button, NavBar, Popup, Icon, Steps, Step, CountDown } from "vant";
import { Toast } from "mand-mobile";
import MoneyNumber from "../components/MoneyNumber";
import { Base } from "../mixins";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import LoadingView from "../components/LoadingView";
import NumChange from "../components/NumChange";
import AdCard from "../components/AdCard";

export default {
  components: {
    AdCard,
    NumChange,
    LoadingView,
    MoneyNumber,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Steps.name]: Steps,
    [Step.name]: Step,
    [CountDown.name]: CountDown,
  },
  data: () => {
    return {
      shared: false,
      isLoading: true,
      showStartSuccess: false,
      showTaskExpired: false,
      showLessThenLevel: false,
      showShortCount: false,
      showShareDetail: true,
      now_click_number: 0,
      activeStep: 1,
      user_ad_task: {},
      showGuide: false,
      showGuide2: false,
      driver: null,
      driver2: null,
      randomTasks: [],
      showRandomTask: false,
      clickedShareIcon: false,
      showConfirmJump: false,
      showFlashShare: false,
      task: {
        vip_level: "",
        complete_click_number: "",
        money: "",
        data: {},
      },
    };
  },
  mixins: [Base],
  created() {
    if (this.$route.query.id) {
      this.getData();
    } else {
      Toast.failed(this.$t("NOT_TASK", "暂无此任务"));
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },
  mounted() {
    this.$bus.on("taskClick", (data) => {
      this.friendClicked(data);
    });
    this.$bus.on("taskFinished", (id) => {
      if (id == this.task.id) {
        this.$bus.off("taskFinished");
        this.finishTask();
      }
    });
  },
  beforeDestroy() {
    try {
      this.$bus.off("taskFinished");
      this.$bus.off("taskClick");
      if (this.driver) {
        this.driver.reset();
      }
      if (this.driver2) {
        this.driver2.reset();
      }
    } catch (e) {}
  },
  methods: {
    flashShareStep(op) {
      if (op) {
        this.showConfirmJump = false;
      }
      this.toStep(3);
      this.showFlashShare = true;
      this.showShareDetail = true;
    },
    friendClicked(data) {
      if (data.id == this.task.id) {
        this.now_click_number = data.now_click_number || 0;
      }
    },
    addStyle(selector, cls) {
      let el = document.querySelector(selector);
      try {
        if (el) {
          el.classList.add(cls);
        }
      } catch (e) {}
    },
    removeStyle(selector, cls) {
      let el = document.querySelector(selector);
      try {
        if (el) {
          el.classList.remove(cls);
        }
      } catch (e) {
        console.log(e);
      }
    },
    startLastGuide() {
      if (this.shared) {
        // has clicked shared
        this.guideRandomTasks();
      } else {
        // not click the share icon
        this.flashShareStep();
      }
    },
    guideRandomTasks() {
      this.showRandomTask = true;
    },
    getRandomTasks() {
      this.$http
        .get("v1/adTaskList", {
          params: { random: true, page_size: 2 },
        })
        .then((res) => {
          this.randomTasks = res.data.list;
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    startGuide() {
      if (!localStorage.getItem("GuideTaskDetail")) {
        localStorage.setItem("GuideTaskDetail", true);
        this.showGuide = true;
        setTimeout(() => {
          this.driver = new Driver({
            allowClose: false,
            opacity: 0.7,
            padding: 5,
            nextBtnText: this.$t("NEXT", "下一步"),
            prevBtnText: this.$t("PREVOUS", "上一步"),
            doneBtnText: this.$t("I_SEE", "我知道了"),
            closeBtnText: this.$t("JUMP", "跳过"),
            onNext: () => {
              this.$webEvent("点击下一步", this.$route.name + "页面");
              console.log(this.driver.currentStep);
              if (this.driver.currentStep == 0) {
                this.addStyle("#guide-task-detail-step-2", "flash-btn");
              } else if (this.driver.currentStep == 1) {
                this.removeStyle("#guide-task-detail-step-2", "flash-btn");
                this.addStyle("#guide-task-detail-step-3", "flash-btn");
              } else if (this.driver.currentStep == 2) {
                this.removeStyle("#guide-task-detail-step-3", "flash-btn");
              }
            },
            onReset: () => {
              this.$webEvent("点击我知道了", this.$route.name + "页面");
              this.showGuide = false;
            },
          });

          this.driver.defineSteps([
            {
              element: "#guide-task-detail-step-1",
              popover: {
                title: `${this.$t(
                  "TASK_DETAIL_GUIDE_TITLE1",
                  "这里是代言的任务次数和奖励明细"
                )}`,
                description: "",
                position: "bottom-center",
              },
            },
            {
              element: "#guide-task-detail-step-2",
              popover: {
                title: `${this.$t(
                  "TASK_DETAIL_GUIDE_TITLE2",
                  "第一步，点击按钮即可领取代言任务"
                )}`,
                description: "",
                showButtons: false,
                className: "custom-driver-popover",
                position: "bottom-center",
              },
            },
          ]);
          try {
            this.driver.start();
          } catch (err) {
            console.log(err);
          }
        }, 500);
      }
    },
    startGuide2() {
      if (!localStorage.getItem("GuideTaskDetail2")) {
        localStorage.setItem("GuideTaskDetail2", true);
        this.getRandomTasks();
        setTimeout(() => {
          this.driver2 = new Driver({
            allowClose: false,
            opacity: 0.7,
            padding: 5,
            nextBtnText: this.$t("NEXT", "下一步"),
            prevBtnText: this.$t("PREVOUS", "上一步"),
            doneBtnText: this.$t("I_SEE", "我知道了"),
            closeBtnText: this.$t("JUMP", "跳过"),
            onNext: () => {
              this.$webEvent("点击下一步", this.$route.name + "页面");
              console.log(this.driver.currentStep);
              if (this.driver.currentStep == 0) {
                this.addStyle("#guide-task-detail-step-2", "flash-btn");
              } else if (this.driver.currentStep == 1) {
                this.removeStyle("#guide-task-detail-step-2", "flash-btn");
                this.addStyle("#guide-task-detail-step-3", "flash-btn");
              } else if (this.driver.currentStep == 2) {
                this.removeStyle("#guide-task-detail-step-3", "flash-btn");
              }
            },
            onReset: () => {
              this.$webEvent("点击我知道了", this.$route.name + "页面");
              this.showGuide2 = false;
              this.startLastGuide();
            },
          });

          this.driver2.defineSteps([
            {
              element: "#guide-task-detail-step-3",
              popover: {
                title: `${this.$t("TASK_DETAIL_GUIDE_TITLE3", "第二步")}`,
                description: "",
                showButtons: false,
                className: "custom-driver-popover",
                position: "bottom-center",
              },
            },
            {
              element: "#guide-task-detail-step-4",
              popover: {
                title: `${this.$t(
                  "TASK_DETAIL_GUIDE_TITLE4",
                  "第三步，将您的专属代言词通过社交媒体软件分享给您的好友 (粘贴即可)."
                )}`,
                description: "",
                // showButtons: false,
                // className: 'custom-driver-popover',
                position: "bottom-center",
              },
            },
            {
              element: "#task-step-4",
              popover: {
                title: `${this.$t(
                  "TASK_DETAIL_GUIDE_TITLE5",
                  "代言是有时间限制的哦！’3个好友点击链接即可助力你成为代言形象大使，免费领取你的代言奖励"
                )}`,
                description: "",
                position: "top-center",
              },
            },
          ]);
          try {
            this.driver2.start();
          } catch (err) {
            console.log(err);
          }
        }, 500);
      }
    },
    toUpgradeLevel(level) {
      this.showLessThenLevel = false;
      this.$toRouter({ name: "HomeVip", query: { lv: level } });
    },
    toBuyTaskNum() {
      this.showShortCount = false;
      this.$toRouter({ name: "HomeVip" });
    },
    refresh() {
      this.getData(false);
    },
    getData(scroll = true) {
      //Toast.loading("loading");
      this.isLoading = true;
      this.$http
        .get("v1/adTaskDetails", {
          params: { id: this.$route.query.id },
        })
        .then((res) => {
          res.data.ad_task.complete_click_number = res.data.ad_task
            .complete_click_number
            ? res.data.ad_task.complete_click_number
            : 0;
          this.task = res.data.ad_task;
          this.$set(this.task, "rest_count", this.task.total - this.task.rest);
          this.user_ad_task = this.task.user_ad_task || {};
          if (
            scroll &&
            this.user_ad_task &&
            this.user_ad_task.status == "InProgress"
          ) {
            this.now_click_number = this.user_ad_task.now_click_number;

            if (!this.now_click_number) {
              this.flashShareStep();
            } else {
              this.shared = true;
            }
          }
          setTimeout(() => {
            this.startGuide();
          }, 300);
          //Toast.hide();
          this.isLoading = false;
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    toWithdraw() {
      this.$toRouter({ name: "Withdraw" });
    },
    toMyTasks() {
      this.$toRouter({ name: "MyTask" });
    },
    viewOtherTasks(confirm) {
      if (confirm) {
        this.showConfirmJump = false;
      }

      if (this.shared || confirm) {
        this.$toRouter({ name: "HomeTasks" });
      } else {
        this.showConfirmJump = true;
      }
    },
    // 滚动到顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    resetTask() {
      setTimeout(() => {
        this.getData();
        this.scrollToTop();
      }, 500);
      setTimeout(() => {
        this.activeStep = 1;
      }, 1000);
    },
    // 任务过期
    taskExpired() {
      this.showTaskExpired = true;
      this.resetTask();
    },
    // 完成任务
    finishTask() {
      this.user_ad_task.status = "Finished";
      this.user_ad_task.now_click_number = this.task.complete_click_number;
      this.resetTask();
    },
    // 开始任务
    startTask() {
      if (this.user_ad_task.status == "InProgress") {
        return;
      }
      //Toast.loading("loading");
      this.$http
        .post("v1/takeTheAdTask", {
          id: this.task.id,
        })
        .then((res) => {
          //Toast.hide();
          this.user_ad_task = res.data.user_ad_task;
          if (this.showGuide) {
            // Toast.info(this.$t('RECEIVE_SUCCESS','接取成功'))
            this.beforeGuideStep2();
            this.showGuide = false;
          } else {
            this.showStartSuccess = true;
          }
          this.$store.dispatch("refreshFinishedTasks");
          this.toStep(2);
        })
        .catch((err) => {
          if (this.showGuide) {
            this.showGuide = false;
          }
          if (err.data.message == "10001") {
            this.showLessThenLevel = true;
            //Toast.hide();
          } else if (err.data.message == "10002") {
            this.showShortCount = true;
            //Toast.hide();
          } else {
            Toast.failed(err.data.message);
          }
        });
    },
    beforeGuideStep2() {
      try {
        this.driver.reset();
      } catch (e) {}
      this.showGuide2 = true;
      this.showStartSuccess = true;
    },
    closeStartSuccess() {
      this.showStartSuccess = false;
      if (this.showGuide2) {
        this.startGuide2();
      }
    },
    copyPlat(plat) {
      if (this.activeStep == 1) {
        this.scrollToTop();
        return;
      }
      this.shared = true;
      this.removeStyle("#task-step-3", "flash-card");
      //let url = this.getShareUrl(plat);
      if (this.task.data.share_content.includes("{URL}")) {
        this.$copyText(this.task.data.share_content.replace("{URL}", url));
      } else {
        this.$copyText(this.task.data.share_content + " " + url);
      }

      if (this.showGuide2) {
        this.driver2.moveNext();
      }

      // 跳转对应的平台
      let encodeUrl = encodeURIComponent(url);
      switch (plat) {
        case "fb":
          this.$webEvent("facebook分享点击", "分享活动页");
          this.$openLink(`https://www.facebook.com/sharer.php?u=${encodeUrl}`);
          break;
        case "za":
          this.$webEvent("za分享点击", "分享活动页");
          this.$bus.emit("zaloShare", encodeUrl);
          break;
        case "tw":
          this.$webEvent("twitter分享点击", "分享活动页");
          this.$openLink(`https://twitter.com/intent/tweet?url=${encodeUrl}`);
          break;
        case "tg":
          this.$webEvent("Telegram分享点击", "分享活动页");
          this.$openLink(`tg://msg_url?url=${encodeUrl}`);
          break;
        case "wa":
          this.$webEvent("Whatsapp分享点击", "分享活动页");
          this.$openLink(`whatsapp://send?text=${encodeUrl}`);
          break;
        case "line":
          this.$webEvent("Line分享点击", "分享活动页");
          this.$openLink(`line://msg/text/${encodeUrl}`);
          break;
      }

      this.toStep(4);
    },
    startCopy() {
      if (this.activeStep == 1) {
        this.scrollToTop();
        return;
      }
      console.log(this.user_ad_task.id)
      console.log(this.task.id)
      this.$router.push({ path: "/advertise", query: {uat: this.user_ad_task.id} });

      //let url = this.getShareUrl();
      //let url = this.user_ad_task.url || "";
      
      
      //let endUrl = url + "#/advertise"
      //console.log(endUrl)
      //this.$openLink(endUrl);
      
      return;
      if (this.task.data.share_content.includes("{URL}")) {
        this.$copyText(this.task.data.share_content.replace("{URL}", url));
      } else {
        this.$copyText(this.task.data.share_content + " " + url);
      }
      this.toStep(3);

      if (this.showGuide2) {
        this.driver2.moveNext();
      }
    },
    // getShareUrl(type = "cp") {
    //   let lang = localStorage.getItem("language");
    //   let url = this.user_ad_task.url || "";
    //   url = `${url}${
    //     url.includes("?") ? "&go_router=advertise" : "?go_router=advertise"
    //   }`;
    //   url = `${url}&s=${type}&lang=${lang}`;
    //   if (this.user.c_id) {
    //     url += `&ch=${this.user.c_id}`;
    //   }
    //   if (this.user.l_id) {
    //     url += `&cl=${this.user.l_id}`;
    //   }
    //   if (this.user.id) {
    //     url += `&t=${this.user.id}`;
    //   }
    //   return url;
    // },
    toStep(n) {
      if (n <= 5) {
        if (this.showGuide) {
          this.activeStep = n;
        } else {
          setTimeout(() => {
            let el = document.getElementById("task-step-" + n);
            if (el) {
              window.scrollTo({
                top: el.offsetTop - 60,
                behavior: "smooth",
              });
            }
          }, 50);
          setTimeout(() => {
            this.activeStep = n;
          }, 350);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.task-detail-page {
  min-height: 100vh;

  .custom-unit-color {
    &,
    &::before,
    &::after {
      color: rgba(255, 0, 24, 1);
      font-weight: 900;
    }
  }

  .task-inprogress {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background: #f7feff;

    .van-count-down {
      font-size: 22px;
      font-weight: bold;
      color: rgb(255, 0, 24);
    }
  }

  .task-step-item__active {
    opacity: 1 !important;
    //background: #FFF3E0 !important;
  }

  .task-step-item {
    transition: all 0.3s;
    opacity: 0.4;
    display: flex;
    flex-direction: column;
    //padding: 15px 10px;
    padding: 15px 5px;
    //border-radius: 8px;
    margin-bottom: 15px;
    border-top: 1px solid #dddddd;
    //background: #f3f3f3;
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
    border-radius: 0.08rem;
  }

  .van-step {
    &::after {
      display: none;
    }
  }

  .van-step__line {
    background: #f1f1f1 !important;
  }

  .refresh-btn {
    transition: all 0.3s;

    &:active {
      opacity: 0.8;
    }
  }

  .in-progress-bg {
    opacity: 0.4;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 12px;
    background-image: linear-gradient(
      45deg,
      #ff8900 25%,
      #f7f9ff 25%,
      #f7f9ff 50%,
      #ff8900 50%,
      #ff8900 75%,
      #f7f9ff 75%,
      #f7f9ff 100%
    );
    background-size: 12px 100%;
    background-repeat: repeat-x;
    animation: animateProgress 1.5s linear infinite;
  }

  @keyframes animateProgress {
    0% {
      background-position: 12px 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .flash-card {
    animation: flashCard 1s linear infinite;

    #guide-task-detail-step-4 > div {
      background: #ffffff;
    }
  }

  @keyframes flashCard {
    0%,
    100% {
      background: #f4f8fa;
    }
    50% {
      background: #f4f8fa;
    }
  }

  .flash-share {
    border-radius: 4px;
    animation: flashShare 1.5s ease-in infinite;

    #guide-task-detail-step-4 > div {
      animation: flashShareIcon 1.5s ease-in infinite;
    }
  }

  @keyframes flashShare {
    0%,
    100% {
      border: 2px solid #ffd8d8;
    }
    50% {
      border: 2px solid #f67373;
    }
  }

  @keyframes flashShareIcon {
    0%,
    100% {
      background: #fff;
    }
    30%,
    70% {
      background: #fdc8c8;
    }
  }
}
</style>
