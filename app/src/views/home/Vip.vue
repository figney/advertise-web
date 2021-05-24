<template>
  <div class="vip-page app-navbar white-view">
    <div class="fs-16 font-bold bg-primary padding margin-bottom">
      {{ $t("VIP_CENTER", "会员中心") }}
    </div>

    <div
      class="margin-lr margin-bottom-sm padding-sm border-radius bg-field flex align-stretch"
      :style="
        currentVip.bg_image === undefined
          ? 'min-height:1.653rem;'
          : 'min-height:1.653rem;background-image:url(' +
            currentVip.bg_image +
            ')'
      "
    >
      <div class="flex align-center margin-right-sm">
        <img
          :src="myCurrentVip.icon"
          style="height: 0.96rem"
          v-if="myCurrentVip"
        />
      </div>
      <template v-if="userVipInfo.length">
        <div class="flex flex-direction justify-center flex-sub">
          <span
            class="font-bold"
            style="margin-bottom: 0.07rem"
            v-if="myCurrentVip"
          >
            {{
              $t("HELLO_VIP_N", [myCurrentVip.level.toString()], "已开通 VIPN!")
            }}
          </span>
          <!--          <div class="fs-12 fc-secondary">-->
          <!--            <span class="margin-right-xs">{{$t('OWEN_DAY_TASK_AMOUNT','已拥有每日任务次数')}}:</span>-->
          <!--            <span>{{'10'}}</span>-->
          <!--          </div>-->
        </div>

        <!--        <van-icon name="arrow"/>-->
      </template>

      <template v-else>
        <div class="flex flex-direction justify-center">
          <span class="font-bold" style="margin-bottom: 0.07rem">{{
            $t("YOU_RE_FREE_VIP_NOW", "您当前属于普通VIP")
          }}</span>
          <!--          <span class="font-bold" style="margin-bottom:0.07rem">{{$t('NOT_BUY_VIP_N',[currentVip.level.toString()],'暂未开通 VIPN')}}</span>-->
        </div>
      </template>
    </div>

    <div class="margin-lr margin-bottom flex align-center">
      <van-tabs
        style="width: 100%; background: #fff3e8"
        class="border-radius"
        color="rgba(0,0,0,0)"
        line-width="33%"
        v-model="currentVipTab"
        @change="currentVipChange"
        swipeable
      >
        <van-tab name="free">
          <template #title>
            <span
              :class="[
                { 'font-bold fs-16 fc-default ': currentVipTab == 'free' },
                { 'opacity-70': currentVipTab != 'free' },
              ]"
            >
              {{ $t("FREE_VIP", "普通VIP") }}
            </span>
          </template>
          <template #default>
            <div
              class="flex flex-direction border-radius overflow-hidden shadow-sm"
            >
              <div
                class="padding-tb-sm padding-lr-sm flex flex-direction border-radius"
                style="background: #ff791a"
              >
                <div class="flex align-stretch fc-fff">
                  <div
                    class="flex flex-direction justify-between flex-sub"
                    style="width: 30%"
                  >
                    <span class="opacity-90 fs-12 margin-bottom-sm">{{
                      $t("DO_TASK_LEVEL", "可接任务等级")
                    }}</span>
                    <span class="fs-16 font-bold">FREE</span>
                  </div>

                  <div
                    class="bg-e8e8e8 opacity-50 margin-lr-xs"
                    style="width: 0.01rem"
                  ></div>

                  <div
                    class="flex flex-direction justify-between padding-left-xs flex-sub"
                    style="width: 30%"
                  >
                    <span class="opacity-90 fs-12 margin-bottom-sm">{{
                      $t("DAY_TASK_NUM", "每日任务次数")
                    }}</span>
                    <num-change
                      class="fs-16 font-bold"
                      :value="free_task_num"
                    />
                  </div>
                </div>
              </div>

              <div
                class="padding-sm flex flex-direction padding-lr padding-tb-xs"
              >
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_DAY_PROFIT", "预估日收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="free_task_num * free_task_money * amount || 0"
                  />
                </div>
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_MONTH_PROFIT", "预估月收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="free_task_num * free_task_money * 30 * amount || 0"
                  />
                </div>
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_YEAR_PROFIT", "预估年收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="free_task_num * free_task_money * 365 * amount || 0"
                  />
                </div>
                <!--                <div class="flex align-center" style="padding: 0.0667rem 0">-->
                <!--                  <span class="fs-12 fc-secondary margin-right-sm">{{$t('PREDICT_TOTAL_PROFIT','预估总收益')}}:</span>-->
                <!--&lt;!&ndash;                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount * currentTimeItem.day) || 0"/>&ndash;&gt;-->
                <!--                  <num-change class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount * currentTimeItem.day) || 0"/>-->
                <!--                </div>-->
              </div>
            </div>
          </template>
        </van-tab>

        <van-tab v-for="(vip, i) in vips" :key="'vip-tab' + i" :name="i">
          <template #title>
            <span
              :class="[
                { 'font-bold fs-16 fc-default ': currentVipTab == i },
                { 'opacity-70': currentVipTab != i },
              ]"
            >
              {{ vip.title }}
            </span>
          </template>
          <template #default>
            <div
              class="flex flex-direction border-radius overflow-hidden shadow-sm"
            >
              <div
                class="padding-tb-sm padding-lr-sm flex flex-direction border-radius"
                style="background: #ff791a"
              >
                <div class="flex align-stretch fc-fff">
                  <div
                    class="flex flex-direction justify-between flex-sub"
                    style="width: 30%"
                  >
                    <span class="opacity-90 fs-12 margin-bottom-sm">{{
                      $t("DO_TASK_LEVEL", "可接任务等级")
                    }}</span>
                    <span class="fs-16 font-bold">{{
                      $t(
                        "VIP_N_AND_BELOW",
                        [vip.level.toString()],
                        "VIP_N及以下"
                      )
                    }}</span>
                  </div>

                  <div
                    class="bg-e8e8e8 opacity-50 margin-lr-xs"
                    style="width: 0.01rem"
                  ></div>

                  <div
                    class="flex flex-direction justify-between padding-left-xs flex-sub"
                    style="width: 30%"
                  >
                    <span class="opacity-90 fs-12 margin-bottom-sm">{{
                      $t("DAY_TASK_NUM", "每日任务次数")
                    }}</span>
                    <num-change
                      class="fs-16 font-bold"
                      :value="vip.task_num * amount"
                    />
                  </div>
                </div>
              </div>

              <div
                class="padding-sm flex flex-direction padding-lr padding-tb-xs"
              >
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_DAY_PROFIT", "预估日收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="vip.task_profit * vip.task_num * amount || 0"
                  />
                </div>
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_MONTH_PROFIT", "预估月收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="vip.task_profit * 30 * vip.task_num * amount || 0"
                  />
                </div>
                <div class="flex align-center" style="padding: 0.0667rem 0">
                  <span class="fs-12 fc-secondary margin-right-sm"
                    >{{ $t("PREDICT_YEAR_PROFIT", "预估年收益") }}:</span
                  >
                  <!--                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount) || 0"/>-->
                  <num-change
                    class="money-number fs-16 font-bold"
                    :value="vip.task_profit * 365 * vip.task_num * amount || 0"
                  />
                </div>
                <!--                <div class="flex align-center" style="padding: 0.0667rem 0">-->
                <!--                  <span class="fs-12 fc-secondary margin-right-sm">{{$t('PREDICT_TOTAL_PROFIT','预估总收益')}}:</span>-->
                <!--&lt;!&ndash;                  <money-number class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount * currentTimeItem.day) || 0"/>&ndash;&gt;-->
                <!--                  <num-change class="money-number fs-16 font-bold" :value="(vip.task_profit * vip.task_num * amount * currentTimeItem.day) || 0"/>-->
                <!--                </div>-->
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>

    <!--    <div class="font-bold fs-16 margin-lr margin-bottom-sm">{{$t('SELECT_BUY_TIME','选择开通时长')}}</div>-->

    <!--    <div class="flex flex-direction justify-between margin-lr margin-bottom-xs">-->
    <!--&lt;!&ndash;      {'vip-time-item__active':(currentTimeItem.day==item.day)}&ndash;&gt;-->
    <!--      <div-->
    <!--        v-for="(item,j) in currentVip.task_num_money_list"-->
    <!--        :key="'task-num-'+j"-->
    <!--        :class="['vip-time-item border-radius margin-bottom-sm ']"-->
    <!--        @click="currentTimeItem=item"-->
    <!--      >-->
    <!--        <span class="fs-16">{{$t('N_DAY',[item.day.toString()],'N天')}}</span>-->
    <!--        <div class="flex-sub"/>-->

    <!--&lt;!&ndash;        <template v-if="currentTimeItem.day==item.day"></template>&ndash;&gt;-->

    <!--        <div class="flex flex-direction justify-end">-->
    <!--          <money-number class="text-right money-number" :value="item.money * amount"/>-->
    <!--&lt;!&ndash;          <num-change class="text-right money-number" :value="item.money * amount"/>&ndash;&gt;-->
    <!--          <div class="flex align-center" style="margin-top:0.08rem">-->
    <!--            <span class="margin-right-xs fs-12">{{$t('EACH_DAY','每天')}}</span>-->
    <!--            <span>{{$t('N_TIMES',[(currentVip.task_num * amount).toString()],'N次')}}</span>-->
    <!--&lt;!&ndash;            <num-change :value="currentVip.task_num * amount"/>&ndash;&gt;-->
    <!--&lt;!&ndash;            <span style="margin-left:0.1rem">{{$t('N_TIMES',[''],'N次')}}</span>&ndash;&gt;-->
    <!--          </div>-->
    <!--        </div>-->

    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="flex align-center justify-between margin-lr margin-bottom">-->
    <!--      <div class="fs-16 font-bold">{{$t('PACKAGE_NUM','叠加次数')}}</div>-->
    <!--      <div class="flex align-center">-->
    <!--        <div class="flex align-center justify-center border-radius-xs bg-dark size-27" @click="subAmount">-->
    <!--          <van-icon color="#ffffff" name="minus" />-->
    <!--        </div>-->

    <!--        <van-field-->
    <!--            v-model="amount"-->
    <!--            type="digit"-->
    <!--            size="small"-->
    <!--            :formatter="formatBuyAmount"-->
    <!--            class="margin-lr-xs padding-0 border-radius-xs"-->
    <!--        />-->

    <!--        <div class="flex align-center justify-center border-radius-xs bg-dark size-27" @click="addAmount">-->
    <!--          <van-icon color="#ffffff" name="plus" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <template v-if="currentVipTab != 'free'">
      <div
        class="margin-lr margin-bottom-xs flex align-center justify-between padding-lr-xs"
      >
        <span class="fs-12 fc-secondary">{{
          $t("AVAILABLE", "可用余额")
        }}</span>
        <money-number
          class="fc-accent font-bold money-number"
          :value="wallet.balance"
        />
      </div>

      <div
        class="margin-lr margin-bottom-xs flex align-center justify-between fc-accent padding-lr-xs"
      >
        <span class="fs-12">{{ $t("NEED_PAY", "开通价格") }}</span>
        <money-number
          class="font-bold money-number"
          :value="amount * currentTimeItem.money"
        />
        <!--      <num-change class="font-bold money-number" :value="amount * currentTimeItem.money"/>-->
      </div>

      <div class="margin-lr margin-bottom">
        <van-button
          class="bg-primary font-bold fs-16 border-radius-sm"
          block
          @click="startDeposit"
          >{{ $t("BUY_NOW", "立即开通") }}</van-button
        >
      </div>
    </template>

    <!--    <div class="font-bold fs-16 margin-lr margin-bottom-sm">{{$t('RULES_AND_DESC','规则与说明')}}</div>-->
    <div class="font-bold fs-16 margin-lr margin-bottom-sm" v-if="buyVipRule">
      {{ buyVipRule.title }}
    </div>

    <div
      class="padding-sm fc-secondary bg-f1f1f1 margin-lr margin-bottom border-radius fs-12 render-html"
      v-html="buyVipRule.content"
      v-if="buyVipRule"
    />

    <!-- 购买成功 -->
    <van-popup v-model="showBuySuccess" class="vw-80 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showBuySuccess = false"
        />

        <img
          src="../../assets/images/icon_11@2x.png"
          alt=""
          class="margin-bottom size-52"
        />
        <div class="font-bold fs-18 margin-bottom-xs text-center">
          {{ $t("BUY_SUCCESS", "开通成功") }}
        </div>
        <div class="fs-16 margin-bottom fc-accent text-center">
          {{ $t("BUY_N_SUCCESS", [currentVip.title], "恭喜你成功开通N!") }}
        </div>
        <van-button
          class="bg-dark fc-fff border-radius-sm"
          block
          @click="doTask"
          >{{ $t("DO_TASK_NOW", "马上接取任务赚钱") }}</van-button
        >
      </div>
    </van-popup>

    <!-- 余额不足 -->
    <van-popup v-model="showShortBalance" class="vw-80 border-radius-sm">
      <div class="padding flex flex-direction align-center position-re">
        <van-icon
          size="0.52rem"
          name="cross"
          class="position-ab close-icon"
          @click="showShortBalance = false"
        />

        <img
          src="../../assets/images/icon_10@2x.png"
          alt=""
          class="margin-bottom size-52"
        />
        <div class="font-bold fs-18 margin-bottom-xs text-center">
          {{ $t("BUY_FAILED", "开通失败") }}
        </div>
        <div class="fs-16 margin-bottom fc-accent text-center">
          {{ $t("ACCOUNT_SHORT_BALANCE", "账户可用余额不足") }}
        </div>
        <van-button
          class="bg-dark fc-fff border-radius-sm"
          block
          @click="toDeposit"
          >{{ $t("TO_DEPOSIT", "去充值") }}</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Base } from "../../mixins";
import { mapState } from "vuex";
import { Toast } from "mand-mobile";
import { Button, Field, Icon, Popup, Tab, Tabs } from "vant";
import MoneyNumber from "../../components/MoneyNumber";
import VipCard from "../../components/VipCard";
import NumChange from "../../components/NumChange";

export default {
  components: {
    NumChange,
    VipCard,
    MoneyNumber,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  data: () => {
    return {
      vipMap: {},
      isLoading: true,
      currentVipTab: 0,
      currentVip: {
        level: "",
        dev_config: {},
      },
      currentTimeItem: {},
      amount: 1,
      showBuySuccess: false,
      showShortBalance: false,
      myCurrentVip: {
        level: "FREE",
        icon: require("../../assets/images/icon_s_member_1@2x.png"),
      },
    };
  },
  watch: {
    userVipInfo() {
      this.calcMyCurrentVip();
    },
  },
  computed: {
    ...mapState([
      "vips",
      "userVipInfo",
      "buyVipRule",
      "free_task_num",
      "free_task_money",
    ]),
  },
  mixins: [Base],
  activated() {
    if (this.$route.query.lv) {
      let lv = this.$route.query.lv - 1;
      this.currentVipTab = isNaN(lv) ? 0 : lv;
      if (lv < this.vips.length) {
        this.selectVip(this.vips[lv]);
      }
    }
  },
  mounted() {
    this.getVipList();
    this.getUserVipInfo();
    this.getBuyVipContent();
    if (this.$route.query.lv) {
      let lv = this.$route.query.lv - 1;
      this.currentVipTab = isNaN(lv) ? 0 : lv;
      if (lv < this.vips.length) {
        this.selectVip(this.vips[lv]);
      }
    }
  },
  methods: {
    calcMyCurrentVip() {
      try {
        if (this.userVipInfo.length) {
          let lv = this.userVipInfo[this.userVipInfo.length - 1].level;
          let vip = this.vipMap[lv.toString()];
          if (vip) {
            this.myCurrentVip = vip;
          }
        }
      } catch (e) {}
    },
    getBuyVipContent() {
      if (!this.buyVipRule.content) {
        this.$http
          .post("v1/getArticle", {
            slug: "VIP_RULE",
          })
          .then((res) => {
            this.$store.commit("setState", {
              key: "buyVipRule",
              value: res.data.articles,
            });
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      }
    },
    isBuyVip(level) {
      for (let vip of this.user.vip) {
        if (vip.level == level) {
          return true;
        }
      }
      return false;
    },
    getUserVipInfo() {
      if (!this.userVipInfo.length) {
        this.$http
          .get("v1/userVipInfo")
          .then((res) => {
            this.$store.commit("setState", {
              key: "userVipInfo",
              value: res.data.vip,
            });
            this.$store.commit("setState", {
              key: "userVipFinishedCount",
              value: res.data.ad_task_data || {},
            });
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      }
    },
    doTask() {
      this.showBuySuccess = false;
      setTimeout(() => {
        localStorage.setItem("TaskBackHome", true);
        this.$toRouter({ name: "Task", query: { lv: this.currentVip.level } });
      }, 200);
    },
    formatBuyAmount(v) {
      if (!v) {
        return 1;
      } else {
        return v;
      }
    },
    subAmount() {
      if (this.amount > 1) {
        --this.amount;
      }
    },
    addAmount() {
      ++this.amount;
    },
    getVipList() {
      if (!this.vips.length) {
        Toast.loading("loading");
        this.$http
          .get("v1/getVipList")
          .then((res) => {
            let vips = this.handleVipList(res.data.list);
            this.$store.commit("setState", { key: "vips", value: vips });
            this.vipToMap();
            this.isLoading = false;
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      } else {
        this.vipToMap();
        this.isLoading = false;
      }
      this.calcMyCurrentVip();
    },
    vipToMap() {
      for (let vip of this.vips) {
        this.vipMap[vip.level] = vip;
      }
      this.selectVip(this.vips[0]);
      this.currentVipTab = 0;
    },
    handleVipList(vips) {
      for (let i = 0; i < vips.length; i++) {
        vips[i].attrs.sort((a, b) => {
          return a.order - b.order;
        });
        for (let j = 0; j < vips[i].attrs.length; j++) {
          if (vips[i].attrs[j].key == "PREDICT_TASK_PROFIT") {
            vips[i].task_profit = parseFloat(vips[i].attrs[j].value);
          } else {
          }
        }
        vips[i].task_num_money_list = [vips[i].task_num_money_list[0]];
      }
      return vips;
    },
    currentVipChange(index) {
      if (index != "free") {
        this.selectVip(this.vips[index]);
        this.currentVipTab = index;
      }
    },
    selectVip(vip) {
      this.amount = 1;
      this.currentVip = vip;
      this.currentTimeItem = this.currentVip.task_num_money_list[0];
    },
    startDeposit() {
      if (this.wallet.balance < this.amount * this.currentTimeItem.money) {
        this.showShortBalance = true;
        return;
      }
      Toast.loading("loading");
      this.$http
        .post("v1/userBuyVip", {
          id: this.currentVip.id,
          day: this.currentTimeItem.day,
          number: this.amount,
        })
        .then((res) => {
          this.$store.dispatch("refreshVipInfo");
          this.$store.dispatch("updateUser", res.data.user);
          this.showBuySuccess = true;
          Toast.hide();
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    toDeposit() {
      this.showShortBalance = false;
      setTimeout(() => {
        localStorage.setItem("NextAction", "Vip");
        localStorage.setItem("NextId", this.currentVip.id);
        localStorage.setItem(
          "NeedMoney",
          this.amount * this.currentTimeItem.money
        );
        localStorage.setItem(
          "NextData",
          JSON.stringify({ number: this.amount, day: this.currentTimeItem.day })
        );
        this.$toRouter({ name: "Deposit" });
      }, 200);
    },
  },
};
</script>

<style lang="scss">
.vip-page {
  min-height: 100vh;

  .van-tabs__wrap {
    height: 42px;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-field {
    width: 2rem;
    height: 0.86rem;
    background: rgba(33, 35, 40, 0.1);

    .van-field__body {
      height: 100%;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        height: 100%;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
    }
  }

  .vip-time-item__active {
    background: rgba(254, 211, 42, 0.2);
    border: 2px solid #fed32a !important;
    color: #ff8900 !important;
  }

  .vip-time-item {
    //color: rgba(33, 35, 40, 0.6);
    color: rgba(33, 35, 40, 1);
    font-weight: bold;
    min-height: 1.5rem;
    display: flex;
    align-items: center;
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.375);
    padding: 0.1rem 0.32rem;
  }
}
</style>
