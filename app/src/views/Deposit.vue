<template>
  <div class="deposit-page app-appbar">
    <van-nav-bar
      style="z-index: 1"
      class="no-border-bar shadow"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$toRouter({ name: 'WalletHistory' })"
    >
      <template #title>
        <div class="fc-default font-bold">{{ $t("DEPOSIT_WEB", "充值") }}</div>
      </template>
      <template #right>
        <div class="fc-accent">{{ $t("HISTORY", "记录") }}</div>
      </template>
    </van-nav-bar>

    <div class="padding flex flex-direction">
      <div
        class="white-view border-radius-sm padding flex flex-direction margin-bottom"
      >
        <div class="fs-16 font-bold margin-bottom-sm">
          {{ $t("SELECT_PAYMENT", "选择充值方式") }}
        </div>
        <van-radio-group
          v-model="currentChannel"
          class="margin-bottom"
          @change="currentChannelChange"
        >
          <van-radio
            checked-color="#FF7214"
            class="padding-tb-sm"
            v-for="(ch, i) in channel"
            :key="'deposit-way' + i"
            :name="ch"
          >
            <template #icon="props">
              <img
                src="../assets/images/checked.png"
                class="size-20"
                style="margin-top: -0.06rem"
                v-if="props.checked"
              />
              <div
                class="border-radius-50 size-20"
                style="border: 1px solid #bfbfbf"
                v-else
              />
            </template>
            <template #default="">
              <div
                :class="[
                  { 'fc-accent font-bold ': currentChannel.id == ch.id },
                ]"
              >
                {{ ch.title }}
              </div>
            </template>
          </van-radio>
        </van-radio-group>

        <div class="fs-16 font-bold margin-bottom-sm">
          {{ $t("DEPOSIT_AMOUNT", "充值金额") }}
        </div>

        <div
          class="flex align-center margin-bottom-xs bg-field border-radius-sm"
        >
          <div
            class="padding-left-sm padding-tb-sm font-bold montserrat fs-16"
            style="height: 100%"
          >
            {{ system.default_currency }}
          </div>

          <!--            :formatter="depositAmountFormatter"-->
          <van-field
            type="number"
            v-model="amount"
            center
            class="no-bg padding-lr-sm font-bold fs-16"
            clearable
            :placeholder="$t('ENTER_DEPOSIT_AMOUNT', '请输入充值金额')"
          ></van-field>
        </div>

        <!--        <div class="margin-bottom-xs flex flex-wrap justify-between">-->
        <!--          <div-->
        <!--            v-for="(i,j) in selectList"-->
        <!--            :class="['per-deposit-item money-number ',{'deposit-item__active':(i==amount)}]"-->
        <!--            :key="'select-item'+j"-->
        <!--            @click="amount=i"-->
        <!--          >-->
        <!--            {{i}}-->
        <!--          </div>-->
        <!--        </div>-->
      </div>

      <van-button
        class="bg-dark fc-fff font-bold border-radius-sm margin-bottom"
        :disabled="!allowDeposit"
        @click="startDeposit"
      >
        {{ $t("PAY_NOW", "立即支付") }}
      </van-button>

<!--      <van-button class="bg-primary font-bold border-radius-sm margin-bottom">{{$t('HOW_TO_PAY','如何支付')}}?</van-button>-->
      <div class="margin-lr margin-bottom">
        <van-button class="border-radius-xs" color="#432af5" plain block @click="openVideo">{{$t('HOW_TO_DEPOSIT','如何充值')}}</van-button>
      </div>

    </div>

    <!-- 快捷支付选择银行列表 -->
    <van-popup
      v-model="showQuickPay"
      position="bottom"
      class="margin-tb-sm border-radius no-bg padding-lr-sm border-radius-sm"
    >
      <div class="flex flex-direction">
        <div
          class="flex flex-direction white-view box-shadow margin-bottom-sm border-radius-sm van-overflow-hidden"
          style="max-height: 80vh"
        >
          <div
            class="fs-16 text-center font-bold white-view padding-top margin-bottom-sm"
          >
            {{ $t("SELECT_BANK", "选择银行") }}
          </div>
          <div class="font-bold fs-14 text-center fc-accent margin-bottom-sm">
            <span class="margin-right-xs">{{ $t("NEED_PAY", "需支付") }}</span>
            <money-number :value="amount" class="money-number" />
          </div>
          <div class="flex flex-direction padding-bottom" style="overflow-y:auto">
            <div class="margin-lr margin-bottom">
              <van-button class="border-radius-xs" color="#432af5" plain block @click="openVideo">{{$t('HOW_TO_DEPOSIT','如何充值')}}</van-button>
            </div>
            <div
              class="flex flex-direction padding-tb-sm padding-lr bank-btn border-top"
              @click="bankPay(bank)"
              v-for="(bank, i) in currentChannel.channel_list"
              :key="'bank-pay' + i"
            >
              <div class="font-bold fs-14 flex align-center justify-between">
                <span>{{ bank.bank_name }}</span>
                <van-icon name="arrow" />
              </div>
              <div class="margin-top-xs flex flex-direction fs-10 fc-secondary">
                <div
                  class="flex align-center justify-between text-nowrap flex-sub"
                >
                  <span class="fc-666 margin-right-xs"
                    >{{ $t("MIN_DEPOSIT", "最小充值金额") }}:</span
                  >
                  <div v-if="bank.min_money">
                    <money-number
                      :value="bank.min_money"
                      class="fc-ff3636 font-bold money-number"
                    />
                  </div>
                  <div class="fc-ff3636 font-bold" v-else>
                    {{ $t("NOT_LIMIT", "无限制") }}
                  </div>
                </div>
                <div
                  class="flex align-center justify-between text-nowrap flex-sub"
                >
                  <span class="fc-666 margin-right-xs"
                    >{{ $t("MAX_DEPOSIT", "最大充值金额") }}:</span
                  >
                  <div v-if="bank.max_money">
                    <money-number
                      :value="bank.max_money"
                      class="fc-ff3636 font-bold money-number"
                    />
                  </div>
                  <div class="fc-ff3636 font-bold" v-else>
                    {{ $t("NOT_LIMIT", "无限制") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <van-button
          class="bg-dark fc-fff font-bold no-border border-radius-xs"
          @click="showQuickPay = false"
        >
          {{ $t("CANCEL", "取消") }}
        </van-button>
      </div>
    </van-popup>

    <!-- 嵌入的 Youtube 视频 -->
    <van-popup position="bottom" v-model="showVideo">
      <div class="white-view padding-top padding-lr flex flex-direction position-re vh-100 vw-100">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#432af5"
            class="position-ab close-icon"
            @click="showVideo=false"
        />
        <div class="fs-18 font-bold text-center padding-bottom-sm margin-bottom" style="border-bottom:1px solid #EEECFA">{{$t('HOW_TO_DEPOSIT','如何充值')}}</div>
        <div class="border-radius-xs bg-f2f2f6 van-overflow-hidden flex flex-direction">
          <template>                        
            <iframe :key="'Pay_video'" width="100%" height="195px" src="https://www.youtube.com/embed/v-TyB3flQCs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </template>
        </div>        
      </div>
    </van-popup>

    <!-- 选择子银行列表 -->
    <van-popup position="bottom" v-model="showSonBank">
      <div class="white-view flex flex-direction position-re vh-100 vw-100">
        <van-icon
          size="0.52rem"
          name="cross"
          class="close-icon fc-secondary"
          @click="showSonBank = false"
        />
        <div
          class="fs-18 font-bold text-center padding-tb-lg"
          style="border-bottom: 1px solid #eeecfa"
        >
          {{ $t("SELECT_BANK", "选择银行") }}
        </div>
        <div
          class="flex flex-direction flex-sub position-re son-bank-list"
          style="overflow: auto"
        >
          <div
            class="flex align-center justify-between padding-tb padding-lr bank-btn border-bottom"
            v-for="(bank, i) in currentBank.son_bank_list"
            @click="startPay(currentBank.id, bank.code)"
            :key="'bank-pay' + i"
          >
            <span class="font-bold text-nowrap">{{ bank.name }}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Icon, NavBar, RadioGroup, Radio, Button, Field, Popup } from "vant";
import { Toast } from "mand-mobile";
import { Base } from "../mixins";
import MoneyNumber from "../components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Field.name]: Field,
    [Popup.name]: Popup,
  },
  data: () => {
    return {
      amount: "",
      selectList: [],
      currentChannel: {},
      channel: [],
      showQuickPay: false,
      currentBank: {},
      showSonBank: false,
      next_action: "Wallet",
      showVideo: false,
      next_id: 0,
      next_data: {},
    };
  },
  computed: {
    allowDeposit() {
      return this.amount && this.currentChannel.id;
    },
  },
  mixins: [Base],
  created() {
    this.next_action = localStorage.getItem("NextAction") || "Wallet";
    localStorage.removeItem("NextAction");

    this.next_id = localStorage.getItem("NextId") || 0;
    localStorage.removeItem("NextId");

    let next_data = localStorage.getItem("NextData");
    try {
      this.next_data = JSON.parse(next_data) || {};
    } catch (e) {
      this.next_data = {};
    }
    localStorage.removeItem("NextData");
  },
  mounted() {
    this.getDepositInfo();
  },
  methods: {
    depositAmountFormatter(v) {
      return v;

      if (!v) {
        return "";
      }
      if (v < this.currentChannel.min_money) {
        return this.currentChannel.min_money;
      } else if (
        this.currentChannel.max_money != 0 &&
        v > this.currentChannel.max_money
      ) {
        return this.currentChannel.max_money;
      } else {
        return Math.floor(v);
      }
    },
    openVideo() {
      this.showVideo = true
    },
    currentChannelChange() {
      let needMoney = localStorage.getItem("NeedMoney");
      localStorage.removeItem("NeedMoney");
      if (needMoney) {
        this.amount = needMoney;
      } else {
        this.amount = this.currentChannel.min_money;
      }
    },
    getDepositInfo() {
      Toast.loading("loading");
      this.$http
        .get("v1/rechargeBegin")
        .then((res) => {
          this.channel = res.data.channel;
          this.selectList = res.data.select_list;
          // this.amount = this.selectList.length > 1 ? this.selectList[1] : this.selectList[0]

          if (this.channel.length) {
            this.currentChannel = this.channel[0];
            Toast.hide();
          } else {
            Toast.failed(this.$t("NO_DEPOSIT_CHANNEL", "暂无可用充值渠道"));
          }
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    startDeposit() {
      if (this.currentChannel.type == "OnLine") {
        // 快捷支付
        this.startQuickPay();
      } else if (this.currentChannel.type === "TransferAccounts") {
        // 银行卡转账
        if (this.currentChannel.channel_list.length) {
          let receiverInfo = this.currentChannel.channel_list[0];
          receiverInfo.next_action = this.next_action;
          receiverInfo.next_id = this.next_id;
          receiverInfo.next_data = this.next_data;
          receiverInfo.title = this.currentChannel.title;
          localStorage.setItem("TransferInfo", JSON.stringify(receiverInfo));
          this.$toRouter({ name: "BankTransfer" });
        } else {
          Toast.failed(
            this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
          );
        }
      } else {
        console.log("unknown payment");
      }
    },
    startQuickPay() {
      if (!this.currentChannel.select_bank) {
        Toast.loading("loading");
        this.$http
          .post("v1/putInInOnlineOrder", {
            channel_id: this.currentChannel.id,
            channel_item_id: 0,
            amount: this.amount,
            son_code: 0,
            next_action: this.next_action,
            next_id: this.next_id,
            next_data: this.next_data,
            redirect_url: location.origin + "/#/order?id=ORDER_SN",
          })
          .then((res) => {
            this.$fbq("InitiateCheckout");
            location.href = res.data.pay_url;
            Toast.hide();
          })
          .catch((err) => {
            Toast.failed(err.data.message);
          });
      } else if (this.currentChannel.channel_list.length) {
        this.showQuickPay = true;
      } else {
        Toast.failed(this.$t("NO_QUICK_CHANNEL", "暂无可用快捷支付渠道"));
      }
    },
    bankPay(bank) {
      // 判断是否超过最大最小的限制
      let max = Math.min(bank.max_money, this.currentChannel.max_money),
        min = Math.max(bank.min_money, this.currentChannel.min_money);

      if (this.amount < min) {
        Toast.failed(
          this.$t(
            "MIN_DEPOSIT_N",
            [min + this.system.default_currency],
            "最低充值金额为N"
          )
        );
        return;
      }
      if (this.amount > max && max != 0) {
        Toast.failed(
          this.$t(
            "MAX_DEPOSIT_N",
            [max + this.system.default_currency],
            "最高充值金额为N"
          )
        );
        return;
      }
      if (bank.son_bank_list.length) {
        this.currentBank = bank;
        if (bank.son_bank_list.length == 1) {
          this.startPay(bank.id, bank.son_bank_list[0].code);
        } else {
          this.showSonBank = true;
        }
      } else {
        this.startPay(bank.id);
      }
    },
    startPay(bankId, son_code = "") {
      Toast.loading("loading");
      this.$http
        .post("v1/putInInOnlineOrder", {
          channel_id: this.currentChannel.id,
          channel_item_id: bankId,
          amount: this.amount,
          son_code: son_code,
          next_action: this.next_action,
          next_id: this.next_id,
          next_data: this.next_data,
          redirect_url: location.origin + "/#/order?id=ORDER_SN",
        })
        .then((res) => {
          localStorage.setItem(
            "PAY_PATH",
            JSON.stringify({
              name: this.$route.name,
              query: this.$route.query,
            })
          );
          localStorage.setItem("GO_PAY", true);
          this.showSonBank = false;
          this.showQuickPay = false;
          if (typeof res.data.pay_url == "string") {
            // 如果是字符串，跳转到支付地址
            Toast.hide();
            this.$openLink(res.data.pay_url);
          } else {
            // 如果是对象，提交支付表单
            this.submitPayForm(res.data.pay_url);
          }
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    submitPayForm(data) {
      let post_url = data.post_url;
      delete data.post_url;
      let form = document.createElement("form");
      form.style.position = "fixed";
      form.style.zIndex = "-1";
      form.style.top = "500%";
      form.style.opacity = 0;
      form.action = post_url;
      form.method = "post";
      for (let k of Object.keys(data)) {
        let item = document.createElement("input");
        item.name = k;
        item.value = data[k];
        form.appendChild(item);
      }
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      Toast.hide();
      this.$toRouter({ name: "Order" });
    },
  },
};
</script>

<style lang="scss">
.deposit-page {
  min-height: 100vh;

  .deposit-item__active {
    border: 2px solid rgba(255, 137, 0, 0.8) !important;
    background: rgba(254, 243, 238, 1) !important;
  }

  .van-field {
    input {
      color: #ff7214;
    }
  }

  .per-deposit-item {
    width: calc(50% - 0.2rem);
    background: rgba(254, 243, 238, 0.71);
    border-radius: 5px;
    border: 2px solid #fef3ee;
    text-align: center;
    margin-bottom: 0.4rem;
    padding: 0.16rem;
    color: #a26c19;
    font-weight: bold;
  }
}
</style>
