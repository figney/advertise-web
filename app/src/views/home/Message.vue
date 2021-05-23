<template>
  <div class="message-page flex flex-direction">
    <div class="bg-primary padding flex align-center">
      <img
        src="../../assets/images/icon_6@2x.png"
        class="margin-right-sm"
        style="height: 0.5rem"
      />
      <div class="fs-18 font-bold">{{ $t("MESSAGE_CENTER", "消息中心") }}</div>
      <div class="flex-sub" />
      <div
        @click="readAll"
        :class="[{ 'fc-secondary': !user.unread_notifications_count }]"
        v-if="currentType == 'notification'"
      >
        {{ $t("READ_ALL", "全部已读") }}
      </div>
    </div>

    <div class="flex align-stretch white-view shadow" style="z-index: 1">
      <div
        class="flex align-center justify-center flex-sub padding"
        style="width: 30%"
        @click="currentType = 'notification'"
      >
        <img
          src="../../assets/images/icon_7@2x.png"
          class="margin-right-sm"
          style="height: 0.54rem"
        />
        <div :class="[{ 'fc-accent': currentType == 'notification' }]">
          {{ $t("MESSAGE_CENTER", "消息中心") }}
        </div>
      </div>
      <div style="width: 1px; background: #eaeaea" />
      <div
        class="flex align-center justify-center flex-sub padding"
        style="width: 30%"
        @click="currentType = 'help'"
      >
        <img
          src="../../assets/images/icon_8@2x.png"
          class="margin-right-sm"
          style="height: 0.54rem"
        />
        <div :class="[{ 'fc-accent': currentType == 'help' }]">
          {{ $t("HELP_CENTER", "帮助中心") }}
        </div>
      </div>
    </div>

    <div
      class="padding-tb"
      style="height: calc(100vh - 4.25rem); overflow: auto"
    >
      <div
        class="white-view position-re"
        style="min-height: 100%"
        v-if="currentType == 'notification'"
      >
        <notification ref="notification" />
      </div>

      <div
        class="white-view position-re"
        style="min-height: 100%"
        v-if="currentType == 'help'"
      >
        <help />
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Cell, Row, Col, Popup, Tab, Tabs } from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import Notification from "../../components/Notification";
import Help from "../../components/Help";

export default {
  components: {
    Help,
    Notification,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
  },
  data: () => {
    return {
      currentType: "notification",
    };
  },
  mixins: [Base],
  created() {
    if (this.$route.query.type == "help") {
      this.currentType = "help";
    }
  },
  methods: {
    readAll() {
      if (this.user.unread_notifications_count > 0) {
        this.$refs.notification.readAll();
      }
    },
  },
};
</script>

<style lang="scss">
.message-page {
  min-height: 100vh;
  //min-height: calc(100vh - 1.35rem);
  //margin-bottom: 1.35rem;

  .van-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;

    .van-tabs__content,
    .van-tab__pane {
      height: calc(100vh - 2.5233rem);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .van-tab__pane {
      overflow: auto;
    }
  }
}
</style>
