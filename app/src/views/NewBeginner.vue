<template>
  <div class="beginner-page-wrap">
    <div class="beginner-page">
      <div class="beginner-title">{{ $app_name }}</div>
      <div class="beginner-subtitle fc-fff">
        <span class="fs-18 text-wrap">{{
          $t("FREE_GET_MONEY", "免费领钱")
        }}</span>
        <!-- <span class="margin-lr-sm fc-primary fs-24">100</span> -->
        <!-- <span class="fs-18">{{ $t("YEAR", "年") }}</span> -->
      </div>

      <!--      <div class="beginner-describe">{{$t('PROMOTE_BEGINNER_DESC','代言一个品牌即可获得 $20, 门槛低, 秒提现')}}</div>-->

      <div
        class="beginner-award flex flex-direction align-center justify-center"
      >
        <div class="flex align-center margin-top-xs">
          <span style="margin-right: 0.1rem; font-size: 100%">{{
            system.default_currency
          }}</span>
          <counter />
          <span style="margin-left: 0.1rem; font-size: 85%" class="fc-secondary"
            >K</span
          >
        </div>
        <div class="fs-18 fc-accent margin-top-xs">
          {{ $t("HAS_BEEN_CLAIMED", "已被领取") }}
        </div>
      </div>

      <div class="register-get text-nowrap">
        <div class="flex align-center">
          <span>{{ $t("N_USER_JOINED", "已参与") }}</span>
          <num-change
            :value="joined"
            style="margin: 0 0.1rem; font-size: 0.6rem; color: #ffffff"
          />
          <span>{{ $t("PEOPLE", "人") }}</span>
        </div>
      </div>

      <div class="beginner-bottom-wrap flex flex-direction">
        <!-- 滚动条 -->
        <div class="flex-sub overflow-hidden scroll-wrap margin-bottom">
          <vue-seamless-scroll
            :data="notice"
            :class-option="{ hoverStop: false, step: 0.6 }"
          >
            <div
              class="scroll-item"
              v-for="(item, index) in notice"
              :key="'beginner-notice-item' + index"
            >
              <img
                :src="item.who | avatar"
                class="size-36 margin-right-xs avatar border-radius-50"
              />
              <div class="text-wrap fs-13">
                <!--                <span v-if="item.action=='invite'">{{item.who}} {{$t('INVITED_SOMEONE',[item.friend],'邀请了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>-->
                <!--                <span v-else-if="item.action=='deposit'">{{item.who}} {{$t('DEPOSIT_N_BALANCE',[item.amount+system.default_currency],'充值了N')}} {{$t('GETTED_N_GIVE',[item.fee+system.default_currency],'获得了N赠送金')}}</span>-->
                <!--                <span v-else-if="item.action=='profit'">{{item.who}} {{$t('GETTED_N_PROFIT',[item.fee+system.default_currency],'获得了N收益')}}</span>-->
                <span v-if="item.action == 'award'"
                  >{{ item.who }}
                  {{
                    $t(
                      "GETTED_N_AWARD",
                      [item.fee + system.default_currency],
                      "获得了{0}代言收入"
                    )
                  }}</span
                >
                <span v-else-if="item.action == 'profit'"
                  >{{ item.who }}
                  {{
                    $t(
                      "GETTED_N_AWARD",
                      [item.fee + system.default_currency],
                      "获得了{0}代言收入"
                    )
                  }}</span
                >
                <span v-else
                  >{{ item.who }}
                  {{
                    $t(
                      "SUCCESS_WITHDRAW_N",
                      [system.default_currency + " " + item.fee],
                      "成功提现了{0}"
                    )
                  }}</span
                >
              </div>
            </div>
          </vue-seamless-scroll>
        </div>

        <!--        <van-field-->
        <!--          class="white-view margin-bottom-sm border-radius-xs font-bold"-->
        <!--          :placeholder="$t('ENTER_YOUR_TELEPHONE','输入您的手机号码')"-->
        <!--          type="digit"-->
        <!--          v-model="register.phone"-->
        <!--          :formatter="phoneFormatter"-->
        <!--          ref="telephone"-->
        <!--        >-->
        <!--          <template #left-icon>-->
        <!--            <van-popover-->
        <!--                v-model="showDropdown"-->
        <!--                class="flex align-center justify-center"-->
        <!--                get-container=".beginner-page-wrap"-->
        <!--                :offset="[0,2]"-->
        <!--                style="width:100%;height:100%"-->
        <!--                trigger="click"-->
        <!--                :actions="generateCountryCode"-->
        <!--                placement="top"-->
        <!--                @select="currentCountryChange"-->
        <!--            >-->
        <!--              <template #reference>-->
        <!--                <div class="padding-lr-sm flex align-center justify-center" style="color:#E22F30">+ {{ currentCallingCode }}</div>-->
        <!--              </template>-->
        <!--            </van-popover>-->
        <!--          </template>-->
        <!--        </van-field>-->
        <!--        <van-field-->
        <!--          class="white-view margin-bottom-sm border-radius-xs font-bold"-->
        <!--          :placeholder="$t('SET_YOUR_PASSWORD','设置您的账号密码')"-->
        <!--          type="password"-->
        <!--          v-model="register.password"-->
        <!--          ref="password"-->
        <!--        >-->
        <!--          <template #left-icon>-->
        <!--            <van-icon name="lock" size="22" color="#E22F30"/>-->
        <!--          </template>-->
        <!--        </van-field>-->
        <!--        <van-button class="margin-bottom bg-primary fs-16 font-bold border-radius-sm no-border" @click="registerNow">{{$t('GET_CASH_NOW','秒拿现金')}}</van-button>-->

        <contact :begginer="true" />
        <van-button
          class="
            bg-primary
            fs-16
            font-bold
            border-radius-sm
            no-border
            breath-btn
            wrap-btn
            beginner-btn
          "
          @click="startNow"
        >
          {{ $t("REG_NOW_GET_MONEY", "立即开始领钱") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mand-mobile";
import VueSeamlessScroll from "vue-seamless-scroll";
import { Base } from "../mixins";
import MoneyNumber from "../components/MoneyNumber";
import { Button, Field, Icon, Popover } from "vant";
import Counter from "../components/Counter";
import NumChange from "../components/NumChange";
import Contact from "../components/Contact";

export default {
  components: {
    NumChange,
    Counter,
    Contact,
    MoneyNumber,
    VueSeamlessScroll,
    [Button.name]: Button,
    [Field.name]: Field,
    [Popover.name]: Popover,
    [Icon.name]: Icon,
  },
  data: () => {
    return {
      register: {
        phone: "",
        nickName: "",
        verifyCode: "",
        password: "",
        passwordAgain: "",
        inviteCode: "",
        inviteReadonly: false,
      },
      currentCallingCode: "",
      showDropdown: false,
      source: "",
      notice: [],
      defaultNum: 60247,
      joined: 0,
    };
  },
  computed: {
    ...mapState(["baseNotice"]),
    generateCountryCode() {
      let lst = [];
      if (this.system.country_code.length) {
        for (let code of this.system.country_code) {
          lst.push({
            text: this.$getCallingCode(code),
          });
        }
      }
      return lst;
    },
  },
  mixins: [Base],
  mounted() {
    this.calcCurrentNum();
    this.startMachine();
    this.getNotices();
    // this.getRandomNickname()
    this.$nextTick(() => {
      if (this.system.country_code.length) {
        this.currentCallingCode = this.$getCallingCode(
          this.system.country_code[0]
        );
      }
      this.source = localStorage.getItem("Source");
      this.register.inviteCode = localStorage.getItem("Invitation");
      if (this.register.inviteCode) {
        this.register.inviteReadonly = true;
      }
    });
  },
  methods: {
    calcCurrentNum() {
      let t = Date.now() % 86400000;
      this.joined = Math.floor(t / 1000) + this.defaultNum;
    },
    startMachine() {
      clearInterval(this.dynamicInterval);
      this.dynamicInterval = setInterval(() => {
        this.joined = this.joined + 4;
      }, 2000);
    },
    phoneFormatter(mobile) {
      var value = mobile.replace(/\D/g, "");
      var valueLen = value.length;
      if (valueLen > 3 && valueLen < 8) {
        value = `${value.substr(0, 3)} ${value.substr(3)}`;
      } else if (valueLen >= 8) {
        value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(
          7
        )}`;
      }
      return value;
    },
    currentCountryChange(item) {
      this.currentCallingCode = item.text;
    },
    getRandomNickname() {
      this.isGetting = true;
      this.$http
        .get("v1/getName")
        .then((res) => {
          this.register.nickName = res.data.name;
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        })
        .finally(() => {
          this.isGetting = false;
        });
    },
    startNow() {
      this.$webEvent(`click btn [Get money now]`, this.$route.name + " page");
      this.$toRouter({ name: "HomeIndex" });
    },
    registerNow() {
      if (!this.register.phone) {
        this.$refs.telephone.focus();
        return;
      }
      if (!this.register.password) {
        this.$refs.password.focus();
        return;
      }
      //Toast.loading(this.$t("IS_GETTING", "正在领取中"));
      this.$startRecaptcha("register").then((g_token) => {
        if (g_token) {
          let inviteId = localStorage.getItem("Invitation") || 0;

          if (!inviteId && this.source != "ad") {
            this.$webEvent(`注册时没有邀请ID`, this.$route.name + "页面");
          }
          this.$http
            .post("v1/register", {
              name: this.register.nickName,
              national_number: this.register.phone,
              country_calling_code: this.currentCallingCode,
              country_code: this.$getCountryCode(this.currentCallingCode),
              sms_code: this.system.is_sms_reg ? this.register.verifyCode : 0,
              invite_id: inviteId || 0,
              source: this.source || 0,
              channel_id: Number(localStorage.getItem("ChannelID") || 0),
              link_id: Number(localStorage.getItem("PremoteLinkID") || 0),
              password: this.register.password,
              password_confirmation: this.register.password,
              g_token: g_token,
            })
            .then((res) => {
              localStorage.setItem("WELCOME_TO", true);
              localStorage.setItem("REGISTERED", "1");
              localStorage.setItem("TOKEN", res.data.token);
              location.reload();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            });
        }
      });
    },
    randomInt(min = 1, max = 3) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getNotices() {
      if (this.baseNotice.length > 0) {
        this.notice = this.baseNotice;
      } else {
        this.$http
          .get("v1/annunciation")
          .then((res) => {
            this.$store.commit("setState", {
              key: "baseNotice",
              value: res.data,
            });
            res.data.forEach((e) => {
              if (e.action == "deposit") {
                e.amount = e.amount ? e.amount : e.fee * this.randomInt();
              }
            });
            this.notice = res.data;
          })
          .catch((err) => {
            console.log(err);
            Toast.failed(err.data.message);
          });
      }
    },
    contact() {
      this.$openLink(this.system.service.url);
    },
  },
};
</script>

<style lang="scss">
.beginner-page-wrap {
  background: #fb3d3a;
  overflow: hidden;
  position: relative;

  .van-popover__arrow {
    display: none !important;
  }

  .van-popover__action {
    width: 2.4rem;
  }
}

.beginner-page {
  height: 100vh;
  background: url("../assets/images/beginner_bg.png") no-repeat #fb3d3a;
  background-size: 100% auto;
  position: relative;

  .beginner-title {
    position: absolute;
    top: 0.3rem;
    left: 0.4rem;
    //color: #FFFFFF;
    color: #ffe84e;
    font-weight: 900;
    font-size: 0.9rem;
    font-family: Montserrat;
    text-shadow: 0.02rem 0.02rem 3px rgba(50, 50, 51, 0.32),
      -0.02rem -0.02rem 3px rgba(50, 50, 51, 0.32),
      0.02rem -0.02rem 3px rgba(50, 50, 51, 0.32),
      -0.02rem 0.02rem 3px rgba(50, 50, 51, 0.52);
    -webkit-text-stroke: unset;
  }

  .beginner-subtitle {
    position: absolute;
    //text-align: center;
    left: 0.4rem;
    right: 0.4rem;
    top: 1.73rem;
    font-weight: bold;
    white-space: nowrap;
    line-height: 1;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
  }

  .beginner-describe {
    position: absolute;
    //text-align: center;
    left: 0.4rem;
    right: 0.4rem;
    top: 2.4rem;
    font-weight: bold;
    color: #f1f1f1;
  }

  .beginner-award {
    position: absolute;
    top: 3.7rem;
    left: 1.2rem;
    right: 1.2rem;
    height: 2.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ff0000;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .register-get {
    position: absolute;
    top: 7.4rem;
    left: 2rem;
    right: 2rem;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #642b05;
    font-weight: bold;
    font-size: 0.46rem;
  }

  .beginner-btn {
    z-index: 1;
    position: fixed;
    bottom: 0.5rem;
    left: 0.8rem;
    right: 0.8rem;
    width: 8.4rem;
  }

  .beginner-bottom-wrap {
    position: absolute;
    left: 0.8rem;
    right: 0.8rem;
    top: 9.7rem;

    .scroll-wrap {
      z-index: 1;
      overflow: hidden;
      //max-height: 36vw;
      max-height: calc(100vh - 11rem);
      background: rgba(229, 85, 85, 1);
      border-radius: 8px;
      position: relative;

      &::before {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        content: "";
        z-index: 1;
        background: rgba(255, 255, 255, 0);
      }

      .scroll-item {
        border-radius: 6px;
        padding: 2vw;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: saturate(2);
        display: flex;
        align-items: center;
        margin: 0 3vw 3vw !important;
        color: #ffffff;

        img {
          width: 32px;
          height: 32px;
          min-width: 32px;
        }
      }
    }
  }

  .van-field {
    display: flex;
    padding: 0;

    &::after {
      display: none;
    }

    input {
      padding: 7px 15px;
      transition: all 0.3s;
      background: #ffece0;

      &:focus {
        background: #ffffff !important;
      }
    }

    .van-field__left-icon {
      width: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fdd5be;
      margin-right: 0;

      &::after {
        display: none;
      }
    }
  }
}
</style>
