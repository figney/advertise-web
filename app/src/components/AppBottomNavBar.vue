<template>
  <div
    :class="['flex align-center', { 'tab-tip-overlay': showGuide }]"
    @click="clickOverlay"
  >
    <van-tabbar v-model="active" route active-color="#212328" class="shadow">
      <van-tabbar-item
        name="index"
        :replace="replace"
        :to="{ name: 'HomeIndex' }"
        :class="['text-center', { 'tab-item-overlay': showGuide }]"
      >
        <span class="">{{ $t("HOME", "首页") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/nav_home_2@2x.png" />
          <img v-else src="../assets/images/nav_home_1@2x.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        name="tasks"
        :replace="replace"
        :to="{ name: 'HomeTasks' }"
        :class="['text-center', { 'tab-item-overlay': showGuide }]"
      >
        <span class="">{{ $t("TASKS", "任务") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/nav_tasks_2@2x.png" />
          <img v-else src="../assets/images/nav_tasks_1@2x.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        name="money"
        :replace="replace"
        :to="{ name: 'HomeVip' }"
        :class="['text-center', { 'tab-item-overlay': showGuide }]"
      >
        <span class="">{{ $t("VIP", "VIP") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/nav_vip_2@2x.png" />
          <img v-else src="../assets/images/nav_vip_1@2x.png" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item
        name="message"
        :replace="replace"
        :to="{ name: 'HomeMessage' }"
        :badge="
          user.unread_notifications_count > 0
            ? user.unread_notifications_count
            : ''
        "
        :class="['text-center', { 'tab-item-overlay': showGuide }]"
      >
        <span class="">{{ $t("MESSAGE", "消息") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/nav_news_2@2x.png" />
          <img v-else src="../assets/images/nav_news_1@2x.png" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item
        name="user"
        :replace="replace"
        :to="{ name: 'HomeUser' }"
        :class="['text-center', { 'tab-item-overlay': showGuide }]"
      >
        <span class="">{{ $t("MY", "我的") }}</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/mine_2@2x.png" />
          <img v-else src="../assets/images/mine_1@2x.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!--    <div class="over-tip" v-if="showGuide">{{$t('TAB_MONEY_TASK','这里有大量免费获得赠送金的活动，无需存钱，0投资就可赚钱，快快行动吧！')}}</div>-->
  </div>
</template>

<script>
import { Base } from "@/mixins";
import { Icon } from "mand-mobile";
import { Tabbar, TabbarItem, Popover } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Popover.name]: Popover,
  },
  data() {
    return {
      active: 0,
      replace: false,
      showGuide: false,
    };
  },
  mixins: [Base],
  created() {
    this.$bus.on("closeTaskTabGuide", () => {
      this.showGuide = false;
    });
    this.$bus.on("showTaskTabGuide", () => {
      this.startGuide();
    });
  },
  methods: {
    startGuide() {
      this.showGuide = true;
    },
    clickOverlay() {
      this.showGuide = false;
      this.$emit("closeTaskTabGuide");
    },
  },
};
</script>

<style lang="scss">
.van-tabbar {
  border: none !important;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);

  .van-tabbar-item--active {
    background-color: unset;
  }
}

.tab-tip-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.tab-item-overlay {
  position: relative;

  &::before {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
}

.over-tip {
  z-index: 1;
  position: fixed;
  bottom: 1.9rem;
  width: 70vw;
  left: 50%;
  transform: translate(-50%, 0);
  background: #fff;
  color: #122134;
  padding: 0.2667rem 0.42rem;
  border-radius: 0.2667rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0.26rem;
    height: 0.26rem;
    background: #fff;
    transform: translate(-50%, 46%) rotate(45deg);
  }
}
</style>
