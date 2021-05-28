<template>
  <div class="index-page flex flex-direction">
    <div class="primary-wrap flex flex-direction padding">
      <div
        class="flex align-center margin-bottom justify-between"
        style="z-index: 2"
      >
        <balance-banner />
        <div class="flex align-center text-nowrap margin-left">
          <select-lang />
        </div>
      </div>

      <base-swipe-ad-banner
        class="margin-bottom border-radius overflow-hidden"
        style="z-index: 1"
      />

      <base-notice-bar theme="dark" style="z-index: 1" />
    </div>

    <div class="flex align-center margin-lr margin-bottom-sm">
      <img
        src="../../assets/images/ad_logo.png"
        class="margin-right-xs"
        style="height: 0.58rem"
      />
      <div class="fs-18 font-bold">{{ $t("ABOUT_US", "关于我们") }}</div>
      <div class="flex-sub" />
      <div class="flex align-center" @click="$toRouter({ name: 'About' })">
        <span class="fc-secondary">{{ $t("SEE_MORE", "查看更多") }}</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div
      class="margin-lr margin-bottom-sm border-radius bg-dark fc-primary font-bold fs-12 padding-lr padding-tb-sm position-re"
      style="min-height: 1.52rem"
    >
      <loading-view v-if="loadingAbout" iconTheme="light" :vertical="false" />
      <div
        class="render-html three-lines"
        v-html="aboutContent.content"
        v-else
      />
    </div>

    <div class="margin-lr margin-bottom-sm border-radius shadow-sm white-view">
      <van-tabs color="#fed32a" line-width="50%" v-model="activeTab">
        <van-tab name="task_data">
          <template #title>
            <div class="font-bold fs-16">{{ $t("TASK_DATA", "任务数据") }}</div>
          </template>
          <template #default>
            <div class="flex flex-direction padding">
              <div class="flex align-center justify-between margin-bottom">
                <span class="fc-secondary">{{
                  $t("FREE_TASK_COUNT", "免费任务次数")
                }}</span>
                <div class="font-bold flex align-center fc-secondary">
                  <span class="fc-accent">{{
                    free_task_num - getFinishedCount(0)
                  }}</span>
                  <span class="margin-lr-xs">/</span>
                  <span>{{ free_task_num }}</span>
                </div>
              </div>
              <template v-for="(info, i) in userVipInfo">
                <div
                  class="flex align-center justify-between margin-bottom"
                  :key="'user-vipinfo-' + i"
                  v-if="info.vip_info"
                >
                  <span class="fc-secondary"
                    >{{ info.vip_info.title }}
                    {{ $t("TASK_COUNT", "任务次数") }}</span
                  >
                  <div class="font-bold flex align-center fc-secondary">
                    <span class="fc-accent">{{
                      info.task_num - getFinishedCount(info.level)
                    }}</span>
                    <span class="margin-lr-xs">/</span>
                    <span>{{ info.task_num }}</span>
                  </div>
                </div>
              </template>
              <div
                class="margin-tb text-center fc-secondary fs-16"
                v-if="userVipInfo.length == 0"
              >
                {{ $t("YOU_NOT_BUY_VIP", "您暂未开通VIP") }}
              </div>
              <van-button
                class="bg-primary font-bold fs-14 padding-tb-xs line-height-15 wrap-btn"
                style="min-height: 1.17334rem; height: unset"
                round
                @click="$toRouter({ name: 'HomeVip' })"
                >{{ $t("GET_MORE_COUNT", "开通VIP获取更多次数") }}</van-button
              >
            </div>
          </template>
        </van-tab>
        <van-tab name="day_data">
          <template #title>
            <div class="font-bold fs-16">{{ $t("DAY_DATA", "每日数据") }}</div>
          </template>
          <template #default>
            <div class="flex flex-direction">
              <div class="flex align-stretch">
                <div class="flex flex-direction padding" style="width: 50%">
                  <div class="flex flex-direction">
                    <money-number
                      class="font-bold fs-18 margin-bottom-xs money-number"
                      :value="user.day_interest.today"
                    />
                    <span class="fc-secondary fs-12">{{
                      $t("TODAY_PROFIT", "今日收益")
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-direction padding" style="width: 50%">
                  <div class="flex flex-direction margin-bottom-sm">
                    <money-number
                      class="font-bold fs-18 margin-bottom-xs money-number"
                      :value="wallet.wallet_count.balance_earnings"
                    />
                    <span class="fc-secondary fs-12">{{
                      $t("TOTAL_PROFIT", "累计收益")
                    }}</span>
                  </div>
                </div>
              </div>
              <van-button
                class="margin-lr margin-bottom bg-primary font-bold fs-14 wrap-btn"
                round
                @click="$toRouter({ name: 'HomeTasks' })"
                >{{ $t("DO_TASK_NOW", "做任务") }}</van-button
              >
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>

    <div class="flex align-center margin-lr margin-bottom-sm">
      <div class="fs-18 font-bold">{{ $t("RECOMMEND_TASK", "推荐任务") }}</div>
      <div class="flex-sub" />
      <div
        class="flex align-center fc-secondary"
        @click="toMoreTask"
        id="guide-index-step-1"
      >
        <span>{{ $t("MORE_TASK", "更多任务") }}</span>
        <van-icon class="margin-left-xs" name="arrow" />
      </div>
    </div>

    <div class="flex flex-direction margin-lr margin-bottom">
      <template v-for="(ad, i) in hotTasks">
        <ad-card
          :key="'index-ad-' + i"
          class="margin-bottom-sm shadow-sm"
          :ad="ad"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Toast, Swiper, SwiperItem } from "mand-mobile";
import { Button, Tab, Tabs, Row, Col, Icon } from "vant";
import { Base } from "@/mixins";
import BalanceBanner from "../../components/BalanceBanner";
import BaseSwipeAdBanner from "../../components/BaseSwipeAdBanner";
import BaseNoticeBar from "../../components/BaseNoticeBar";
import AdCard from "../../components/AdCard";
import MoneyNumber from "../../components/MoneyNumber";
import SelectLang from "../../components/SelectLang";
import { mapState } from "vuex";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import LoadingView from "../../components/LoadingView";

export default {
  components: {
    LoadingView,
    SelectLang,
    MoneyNumber,
    AdCard,
    BaseNoticeBar,
    BaseSwipeAdBanner,
    BalanceBanner,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  data: () => {
    return {
      activeTab: "day_data", // task_data
      currentLang: localStorage.getItem("language") || "EN",
      loadingHome: true,
      taskFinished: {},
      driver: null,
      loadingAbout: true,
    };
  },
  computed: {
    ...mapState([
      "hotTasks",
      "userVipInfo",
      "userVipFinishedCount",
      "aboutContent",
      "banners",
    ]),
    languageName() {
      for (let lang of this.system.lang_list) {
        if (this.currentLang === lang.slug) {
          return lang.name || lang.slug;
        }
      }
      return this.currentLang;
    },
  },
  watch: {
    activeTab() {
      localStorage.setItem("IndexActiveTab", this.activeTab);
    },
  },
  mixins: [Base],
  created() {
    this.activeTab = localStorage.getItem("IndexActiveTab") || "day_data";
  },
  mounted() {
    this.getData();
    this.getHotTasks();
    this.getUserVipInfo();
    this.getAboutContent();
  },
  methods: {
    getAboutContent() {
      this.loadingAbout = true;
      if (!this.aboutContent.content) {
        this.$http
          .post("v1/getArticle", {
            slug: "INDEX_ABOUT",
          })
          .then((res) => {
            this.$store.commit("setState", {
              key: "aboutContent",
              value: res.data.articles,
            });
            this.loadingAbout = false;
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      } else {
        this.loadingAbout = false;
      }
    },
    getFinishedCount(level) {
      return this.userVipFinishedCount["l_" + level] || 0;
    },
    getUserVipInfo() {
      if (!this.userVipInfo.length) {
        this.$store.dispatch("refreshVipInfo");
      }
    },
    getData() {
      if (!this.banners.length) {
        this.loadingHome = true;
        this.$http
          .get("v1/home")
          .then((res) => {
            this.$store.commit("setState", {
              key: "banners",
              value: res.data.banners,
            });
            this.loadingHome = false;
            setTimeout(() => {
              this.$bus.emit("showFirstTask");
            }, 300);
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      } else {
        this.loadingHome = false;
      }
    },
    getHotTasks() {
      if (!this.hotTasks.length) {
        this.$http
          .get("v1/adTaskList", {
            params: { tag: "hot", page_size: 10 },
          })
          .then((res) => {
            this.$store.commit("setState", {
              key: "hotTasks",
              value: res.data.list,
            });
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      }
    },
    toMoreTask() {
      try {
        this.driver.reset();
      } catch (e) {}
      this.$toRouter({ name: "HomeTasks" });
    },
  },
};
</script>

<style lang="scss">
.index-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;

  .primary-wrap {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      background: #fed32a;
      top: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 0.4rem 0.4rem;
      height: 55%;
    }
  }

  .see-btn {
    padding: 0.06rem 0.1333rem;
    width: fit-content;
    border: 1px solid currentColor;
    border-radius: 14px;
    cursor: pointer;
  }

  .title-dot {
    display: flex;
    align-items: center;
    margin-left: -0.05rem;

    &::before {
      content: "";
      margin-right: 0.12rem;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f8d333;
    }
  }

  .none-dot {
    display: flex;
    align-items: center;
    margin-left: -0.05rem;

    &::before {
      content: "";
      margin-right: 0.12rem;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
</style>
