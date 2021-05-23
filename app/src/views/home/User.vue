<template>
  <div class="user-page flex flex-direction">
    <div class="flex flex-direction bg-primary">
      <div class="flex align-stretch padding-lr padding-tb-sm margin-bottom-xs">
        <img
          :src="user.name | avatar"
          class="size-52 margin-right-sm border-radius-50"
        />

        <div
          class="flex flex-direction justify-between"
          style="padding: 0.04rem 0"
        >
          <div class="flex align-center">
            <div class="fs-15 font-bold">{{ user.name }}</div>
            <!--            <img :src="user.vip.vip_info.icon" class="margin-left-xs" style="height:0.5rem" v-if="user.vip"/>-->
          </div>
          <div
            class="fs-12 fc-secondary flex align-center bg-fef3ee padding-lr-sm border-radius-xs"
            style="
              width: fit-content;
              padding: 0.06rem 0.2667rem;
              margin-left: -0.08rem;
            "
            @click="$copyText(user.id)"
          >
            <span>ID: {{ user.id }}</span>
            <img
              class="margin-left-sm"
              src="../../assets/images/copy_w@2x.png"
              style="height: 0.42rem"
            />
          </div>
          <!--          <van-button round size="mini" style="margin-top:0.04rem;margin-left:-0.05rem;background:rgba(255,255,255,0.85);width:fit-content" class="no-border padding-tb-xs" @click="$toRouter({name:'Task'})">-->
          <!--            <div class="fc-accent padding-lr-sm flex align-center fs-10">-->
          <!--              <span>{{$t('GET_MORE_PROFIT','赚取更多收益')}}</span>-->
          <!--              <van-icon name="arrow" size="12" class="margin-left-xs"/>-->
          <!--            </div>-->
          <!--          </van-button>-->
        </div>
      </div>
      <div style="height: 2rem" />
    </div>

    <div
      class="white-view border-radius padding-lr padding-tb-sm margin-lr margin-bottom flex flex-direction shadow"
      style="margin-top: -2rem"
    >
      <div class="flex align-center justify-between margin-bottom">
        <span class="fs-16 font-bold">
          {{ $t("MY_WALLET", "我的钱包") }}
        </span>
        <div
          class="fc-secondary flex align-center"
          @click="$toRouter({ name: 'WalletHistory' })"
        >
          <img
            src="../../assets/images/icon_4@2x.png"
            class="margin-right-xs"
            style="height: 0.28rem"
          />
          <span class="fs-14">{{ $t("WALLET_HISTORY", "收支记录") }}</span>
          <van-icon name="arrow" size="15" />
        </div>
      </div>
      <div class="flex align-stretch justify-between">
        <div
          class="flex flex-direction align-center justify-between margin-right-sm"
          style="width: 30%; flex-grow: 1"
        >
          <div class="fs-19 margin-bottom-xs text-nowrap">
            <money-number
              class="font-bold money-number"
              :value="wallet.balance"
            />
          </div>
          <div class="margin-bottom-sm fc-secondary">
            {{ $t("ACCOUNT_BALANCE", "账户余额") }}
          </div>
          <van-button
            class="border-radius-sm bg-dark padding-lr-xs"
            block
            style="margin-left: -0.05rem"
            @click="$toRouter({ name: 'Withdraw' })"
          >
            <span class="font-bold fs-16 fc-fff">{{
              $t("WITHDRAW_WEB", "提现")
            }}</span>
          </van-button>
        </div>
        <div
          class="flex flex-direction align-center justify-between margin-left-sm"
          style="width: 30%; flex-grow: 1"
        >
          <div class="fs-19 margin-bottom-xs text-nowrap">
            <num-change
              class="font-bold money-number"
              :value="wallet.wallet_count.balance_earnings"
            />
            <!--            <money-number class="font-bold money-number" :value="wallet.wallet_count.balance_earnings"/>-->
          </div>
          <div class="margin-bottom-sm fc-secondary">
            {{ $t("TOTAL_EARNINGS", "累计收益") }}
          </div>
          <van-button
            class="border-radius-sm bg-dark padding-lr-xs"
            block
            style="margin-right: -0.05rem"
            @click="$toRouter({ name: 'HomeVip' })"
          >
            <span class="font-bold fs-16 fc-fff">{{
              $t("BUY_VIP", "购买VIP")
            }}</span>
          </van-button>
        </div>
      </div>
    </div>

    <div
      class="white-view border-radius flex flex-direction margin-lr margin-bottom padding-lr padding-tb-sm shadow"
    >
      <div class="flex align-center justify-between margin-bottom">
        <span class="fs-16 font-bold">
          {{ $t("MY_TASKS", "我的任务") }}
        </span>
        <div
          class="fc-secondary flex align-center"
          @click="$toRouter({ name: 'MyTask' })"
        >
          {{ $t("ALL_TASKS", "全部任务") }}
          <van-icon name="arrow" size="15" />
        </div>
      </div>
      <div class="flex align-center justify-between">
        <div
          class="flex flex-direction align-center justify-center flex-sub padding-top-xs"
          style="width: 30%"
          @click="$toRouter({ name: 'MyTask', query: { tag: 'inprogress' } })"
        >
          <img src="../../assets/images/icon_12@2x.png" style="height: 1rem" />
          <span class="margin-top-xs fc-secondary">{{
            $t("INPROGRESS", "进行中")
          }}</span>
        </div>
        <!--        <div-->
        <!--            class="flex flex-direction align-center justify-center flex-sub padding-top-xs"-->
        <!--            style="width:30%"-->
        <!--        >-->
        <!--          <img src="../../assets/images/icon_13@2x.png" style="height:1rem">-->
        <!--          <span class="margin-top-xs fc-secondary">{{$t('CHECKING','审核中')}}</span>-->
        <!--        </div>-->
        <div
          class="flex flex-direction align-center justify-center flex-sub padding-top-xs"
          style="width: 30%"
          @click="$toRouter({ name: 'MyTask', query: { tag: 'finished' } })"
        >
          <img src="../../assets/images/icon_14@2x.png" style="height: 1rem" />
          <span class="margin-top-xs fc-secondary">{{
            $t("FINISHED", "已完成")
          }}</span>
        </div>
      </div>
    </div>

    <!--    <div class="margin-lr padding-lr padding-tb-sm border-radius-top my-vip-card">-->
    <!--      <div class="flex flex-direction margin-right">-->
    <!--        <div class="flex align-center margin-bottom-sm">-->
    <!--          <img src="../../assets/images/icon_15@2x.png" class="margin-right-xs" style="height:0.45rem">-->
    <!--        </div>-->
    <!--        <div class="fc-fff flex flex-direction fs-12">-->
    <!--          <span>{{$t('BUY_VIP_GET_MORE_PROFIT','开通会员可接取专享高额任务')}}</span>-->
    <!--          <span>{{$t('HIGH_LEVEL_HIGH_GAINED','等级越高,赚的越多')}}</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <van-button class="border-radius bg-ecd8af no-border padding-sm line-height-15" style="width:2.4rem;height:unset" @click="$toRouter({name:'HomeVip'})">-->
    <!--        <span class="font-bold">{{$t('BUY_NOW','立即开通')}}</span>-->
    <!--      </van-button>-->
    <!--    </div>-->

    <div class="white-view shadow margin-bottom">
      <div class="padding-top padding-lr padding-bottom-xs">
        <div class="border-radius my-invite-card overflow-hidden">
          <div
            class="flex-sub flex flex-direction align-end padding-lr padding-top-sm padding-bottom"
            style="z-index: 2"
          >
            <div
              class="fs-18 font-bold fc-fff margin-bottom-sm text-nowrap text-ellipsis overflow-hidden"
              style="max-width: 8rem"
            >
              {{ $t("INVITE_FRIEND_TOGETHER", "邀请好友一起赚") }}
            </div>
            <van-button
              class="no-bg"
              color="#fff"
              round
              size="small"
              @click="$toRouter({ name: 'Invite' })"
              style="width: fit-content"
            >
              <div class="fc-fff padding-lr flex align-center font-bold">
                <span class="padding-left-xs">{{
                  $t("INVITE_NOW", "立即邀请")
                }}</span>
                <van-icon name="arrow" size="12" class="margin-left-xs" />
              </div>
            </van-button>
          </div>
        </div>
      </div>
      <!--      <van-cell-->
      <!--          class="no-bg border-bottom padding-tb"-->
      <!--          :border="false"-->
      <!--          is-link-->
      <!--          to="/rank"-->
      <!--      >-->
      <!--        <template #title>-->
      <!--          <span class="font-bold fs-15">{{$t('RANKING','排行榜')}}</span>-->
      <!--        </template>-->
      <!--      </van-cell>-->
      <van-cell
        class="no-bg border-bottom padding-tb"
        :border="false"
        is-link
        to="/team"
      >
        <template #title>
          <span class="font-bold fs-15">{{ $t("MY_TEAM", "我的团队") }}</span>
        </template>
      </van-cell>

      <van-cell
        class="no-bg border-bottom padding-tb"
        :border="false"
        is-link
        to="/wallet_history"
      >
        <template #title>
          <span class="font-bold fs-15">{{
            $t("WALLET_HISTORY", "收支记录")
          }}</span>
        </template>
      </van-cell>

      <van-cell
        class="no-bg border-bottom padding-tb"
        :border="false"
        is-link
        @click="contact"
      >
        <template #title>
          <span class="font-bold fs-15">{{
            $t("CONTACT_US", "在线客服")
          }}</span>
        </template>
      </van-cell>

      <van-cell
        class="no-bg border-bottom padding-tb"
        :border="false"
        is-link
        to="/about"
      >
        <template #title>
          <span class="font-bold fs-15">{{ $t("ABOUT_US", "关于我们") }}</span>
        </template>
      </van-cell>

      <van-cell
        class="no-bg border-bottom padding-tb"
        :border="false"
        is-link
        @click="$toRouter({ name: 'HomeMessage', query: { type: 'help' } })"
      >
        <template #title>
          <span class="font-bold fs-15">{{ $t("HELP", "帮助中心") }}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Button,
  Cell,
  Collapse,
  CollapseItem,
  Badge,
  Col,
  Row,
  Tabs,
  Tab,
  Popover,
} from "vant";
import { Base } from "@/mixins";
import MoneyNumber from "../../components/MoneyNumber";
import NumChange from "../../components/NumChange";

export default {
  components: {
    NumChange,
    MoneyNumber,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Badge.name]: Badge,
    [Col.name]: Col,
    [Row.name]: Row,
    [Popover.name]: Popover,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  mixins: [Base],
  data: () => {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.currentWalletType = this.system.wallet_type[0].key;
    });
  },
  methods: {
    login() {
      this.$bus.emit("login");
    },
    contact() {
      this.$openLink(this.system.service.url);
    },
  },
};
</script>

<style lang="scss">
.user-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;

  .my-vip-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url("../../assets/images/banner_vip@2x.png") no-repeat;
    background-size: 100% auto;
  }

  .my-invite-card {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: url("../../assets/images/banner_invitation@2x.png") no-repeat
      center;
    background-size: 100% auto;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
