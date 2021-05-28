<template>
  <div class="buy-vip-page app-appbar white-view">
    <van-nav-bar
      class="no-border-bar shadow"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default">
          {{ $t("BUY_VIP", "开通会员") }}
        </div>
      </template>
    </van-nav-bar>

    <div class="padding-tb-sm flex flex-direction">
      <div class="fs-16 font-bold margin-lr margin-bottom">
        {{ $t("SELECT_VIP_LEVEL", "选择会员等级") }}
      </div>
    </div>

    <div class="margin-bottom">
      <splide :options="options" ref="vipSplide" v-if="vips.length">
        <splide-slide v-for="(vip, i) in vips" :key="'vip-slide' + i">
          <div
            class="padding-lr-sm padding-tb-xs vip-wrap border-radius"
            :style="
              'background:url(' +
              vip.bg_image +
              ');color:' +
              vip.dev_config.color
            "
            @click="switchVip(i)"
          >
            <div class="flex align-center margin-bottom-xs">
              <span class="fs-20 font-bold margin-right-sm">{{
                vip.title
              }}</span>
              <img :src="vip.icon" style="height: 0.6rem" />
            </div>

            <div class="margin-bottom-xs fs-12">
              <span class="margin-right-xs">
                {{ $t("TASK_NUM", "任务次数") }}:
              </span>
              <span>{{ vip.task_num * amount }}</span>
            </div>

            <template v-for="(attr, j) in vip.attrs">
              <div
                class="margin-bottom-xs fs-12"
                :key="'vip-attr-' + i + '-' + j"
                v-if="!attr.key.startsWith('DAY_PROFIT')"
              >
                <span class="margin-right-xs">{{ $t(attr.key) }}:</span>
                <span>{{ attr.value | i18n }}</span>
              </div>
            </template>

            <div class="margin-bottom-xs fs-12">
              <span class="margin-right-xs">
                {{ $t("DAY_PROFIT", "日收益") }}:
              </span>
              <money-number
                class="money-number"
                :value="vip.day_min * amount"
              />
              <span class="margin-lr-xs">~</span>
              <money-number
                class="money-number"
                :value="vip.day_max * amount"
              />
            </div>

            <div class="margin-bottom-xs fs-12">
              <span class="margin-right-xs">
                {{ $t("YEAR_PROFIT", "年收益") }}:
              </span>
              <money-number
                class="money-number"
                :value="vip.day_min * 365 * amount"
              />
              <span class="margin-lr-xs">~</span>
              <money-number
                class="money-number"
                :value="vip.day_max * 365 * amount"
              />
            </div>

            <div class="margin-bottom-xs" />

            <img class="select-icon" src="../assets/images/icon_21@2x.png" />
          </div>
        </splide-slide>
      </splide>
    </div>

    <div class="margin-lr margin-bottom-sm">
      <div class="fs-16 font-bold">{{ $t("TASK_PACKAGE", "任务套餐") }}</div>
    </div>

    <div
      class="margin-lr margin-bottom border-radius-sm padding bg-ecd8af flex align-center justify-between"
    >
      <div class="fs-24 font-bold">
        <span>{{
          $t("N_TIMES", [(amount * currentVip.task_num).toString()], "N次")
        }}</span>
      </div>

      <money-number
        class="font-bold fs-24 money-number"
        :value="amount * currentVip.task_num_money"
      />
    </div>

    <div class="flex align-center justify-between margin-lr margin-bottom">
      <div class="fs-16 font-bold">{{ $t("PACKAGE_NUM", "套餐数量") }}</div>
      <div class="flex align-center">
        <div
          class="flex align-center justify-center border-radius-xs bg-dark size-29"
          @click="subAmount"
        >
          <van-icon color="#ffffff" name="minus" />
        </div>

        <van-field
          v-model="amount"
          type="digit"
          size="small"
          class="margin-lr-xs padding-0 border-radius-xs"
        />

        <div
          class="flex align-center justify-center border-radius-xs bg-dark size-29"
          @click="addAmount"
        >
          <van-icon color="#ffffff" name="plus" />
        </div>
      </div>
    </div>

    <div
      class="margin-lr margin-bottom padding border-radius-sm bg-e8e8e8 fs-12 font-bold render-html"
      v-html="buyVipRule"
    ></div>

    <!--    <div class="margin-lr margin-bottom-sm">-->
    <!--      <div class="fs-16 font-bold">{{$t('SELECT_BUY_TIME','选择开通时长')}}</div>-->
    <!--    </div>-->
    <!--    <div class="flex align-stretch justify-between flex-wrap margin-lr margin-bottom-sm">-->
    <!--      <div-->
    <!--          v-for="(t,i) in currentVip.day_money"-->
    <!--          :key="'day-time'+currentVip.id+'-'+i"-->
    <!--          :class="['time-card',{'time-card__active':(currentTimeType.day==t.day)}]"-->
    <!--          @click="currentTimeType=t"-->
    <!--      >-->
    <!--        <div class="time-title">{{t.day}} DAY</div>-->
    <!--        <div class="flex align-center justify-between" v-if="t.p_money>0">-->
    <!--          <money-number class="time-line fs-14 margin-right-sm money-number" :value="t.p_money"/>-->
    <!--          <div class="border-radius-xs fs-12 font-bold fc-fff padding-lr-xs" style="background:#FF0000">{{ Math.floor((1 - t.money/t.p_money) * 100) }}% OFF</div>-->
    <!--        </div>-->
    <!--        <money-number class="time-desc fs-16 font-bold money-number" :value="t.money"/>-->
    <!--        <img src="../assets/images/icon_21@2x.png" class="time-badge">-->
    <!--      </div>-->
    <!--    </div>-->

    <div style="height: 3.223rem" />

    <div class="fixed-bottom shadow">
      <div
        class="margin-bottom-xs flex align-center justify-between padding-lr-xs"
      >
        <span>{{ $t("AVAILABLE", "可用余额") }}</span>
        <money-number class="font-bold money-number" :value="wallet.balance" />
      </div>

      <div
        class="margin-bottom-sm flex align-center justify-between fc-accent padding-lr-xs"
      >
        <span>{{ $t("NEED_PAY", "需支付") }}</span>
        <money-number
          class="font-bold money-number"
          :value="amount * currentVip.task_num_money"
        />
      </div>

      <van-button
        class="border-radius-sm bg-dark fc-fff font-bold"
        @click="startDeposit"
        block
        >{{ $t("BUY_NOW", "立即开通") }}</van-button
      >
    </div>

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
          src="../assets/images/icon_11@2x.png"
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
          @click="$toRouter({ name: 'HomeTasks' })"
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
          src="../assets/images/icon_10@2x.png"
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
import { Toast } from "mand-mobile";
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Cell, NavBar, List, Empty, Button, Popup, Icon, Field } from "vant";
import { mapState } from "vuex";

export default {
  components: {
    [Splide.name]: Splide,
    [SplideSlide.name]: SplideSlide,
    MoneyNumber,
    [Empty.name]: Empty,
    [List.name]: List,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data: () => {
    return {
      buyVipRule:
        "1.购买任务套餐后自动开通当前等级会员，套餐可无限制叠加永久有效。\n2.4个等级的会员可同时开通，每级会员等级任务数量独立计算。\n3.高等级会员可完成低等级会员任务，低等级会员无法完成高等级会员任务。",
      amount: 1,
      currentVip: 0,
      showShortBalance: false,
      showBuySuccess: false,
      options: {
        start: 0,
        type: "loop",
        gap: "0.43rem",
        arrows: false,
        autoHeight: true,
        padding: "1.5rem",
      },
    };
  },
  computed: {
    ...mapState(["vips"]),
  },
  mixins: [Base],
  created() {
    let id = parseInt(localStorage.getItem("VipID"));
    localStorage.removeItem("VipID");
    id = isNaN(id) ? 0 : id - 1;
    this.options.start = id || 0;
  },
  mounted() {
    this.getVipList();
  },
  methods: {
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
            this.currentVip = this.vips[this.options.start];
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      } else {
        this.currentVip = this.vips[this.options.start];
      }
    },
    handleVipList(vips) {
      for (let i = 0; i < vips.length; i++) {
        vips[i].attrs.sort((a, b) => {
          return a.order - b.order;
        });
        for (let j = 0; j < vips[i].attrs.length; j++) {
          if (vips[i].attrs[j].key == "PREDICT_DAY_PROFIT") {
            vips[i].day_profit = parseFloat(vips[i].attrs[j].value);
          } else {
          }
        }
      }
      return vips;
    },
    switchVip(index) {
      this.$refs.vipSplide.go(index);
      if (this.vips[index].id != this.currentVip.id) {
        this.currentVip = this.vips[index];
      }
    },
    startDeposit() {
      if (this.wallet.balance < this.amount * this.currentVip.task_num_money) {
        this.showShortBalance = true;
        return;
      }
      Toast.loading("loading");
      this.$http
        .post("v1/userBuyVip", {
          id: this.currentVip.id,
          number: this.amount,
        })
        .then((res) => {
          this.$store.dispatch("updateUser", res.data.user);
          this.showBuySuccess = true;
          Toast.hide();
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    toDeposit() {
      localStorage.setItem("NextAction", "Vip");
      localStorage.setItem("NextId", this.currentVip.id);
      localStorage.setItem("NextData", JSON.stringify({ number: this.amount }));
      this.$toRouter({ name: "Deposit" });
    },
  },
};
</script>

<style lang="scss">
.buy-vip-page {
  overflow-x: hidden;
  min-height: 100vh;

  // 滑块
  .splide__pagination {
    display: none;
  }

  .splide__track {
    overflow: visible;

    .splide__slide {
      opacity: 0.55;
    }

    .is-active {
      opacity: 1;

      .vip-wrap {
        box-shadow: 0 0 15px 5px rgba(168, 166, 150, 0.5);
        transform: scale(1.04) !important;

        .select-icon {
          display: block !important;
        }
      }
    }
  }

  // vip卡片
  .vip-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    .select-icon {
      display: none;
      position: absolute;
      right: 10px;
      top: 14px;
      width: 24px;
      height: 24px;
    }
  }

  .van-field {
    width: 1.8rem;
    height: 0.8rem;
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

  // 选择时长样式
  .time-card__active {
    opacity: 1 !important;
    border: 2px solid #ff8900 !important;
    box-shadow: 0 0 15px 0 #ff8900;

    .time-title {
      color: #d9a346 !important;
    }

    .time-badge {
      display: block !important;
    }
  }

  .time-card {
    opacity: 0.8;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    padding: 6px 14px;
    margin-bottom: 12px;
    border: 2px solid rgba(178, 183, 188, 0.4);

    .time-title {
      font-size: 18px;
      font-weight: bold;
      color: #bd893a;
    }

    .time-desc {
      color: #a26c19;
    }

    .time-line {
      color: #a26c19;
      text-decoration: line-through;
      text-decoration-color: rgba(162, 108, 25, 0.5);
    }

    .time-badge {
      display: none;
      position: absolute;
      right: 8px;
      top: 5px;
      width: 20px;
      height: 20px;
    }
  }

  .fixed-bottom {
    background: #fff;
    padding: 0.2667rem 0.4rem;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
