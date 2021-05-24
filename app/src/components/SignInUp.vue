<template>
  <van-popup
    class="sign-in-up no-bg"
    style="overflow: visible"
    v-model="show"
    closeable
  >
    <div
      class="flex flex-direction vw-90 padding border-radius-sm bounceInDown white-view"
    >
      <template v-if="currentType == 'register'">
        <div class="flex flex-direction">
          <div class="margin-bottom">
            <div class="font-bold fs-18 text-center padding-lr">
              {{ $t("SIGN_UP_AND_GET_MONEY_NOW", "立即注册,免费领钱100年") }}
            </div>
          </div>
          <div
            class="flex-sub white-view padding-lr-xs padding-bottom-xs flex flex-direction signInUpModel"
          >
            <div class="margin-bottom-xs fc-secondary fs-12">
              <span>{{ $t("NICK_NAME", "昵称") }}</span>
              <span class="margin-left-xs opacity-60"
                >({{ $t("LESS_4_MORE_32", "4到32个字符") }})</span
              >
            </div>
            <div class="flex align-center margin-bottom-sm">
              <van-field
                class="border-radius-sm bg-field font-bold margin-right-xs focus-effect"
                style="padding: 0.186rem 0.4rem"
                clearable
                v-model="register.nickName"
                :placeholder="$t('ENTER_NICK_NAME', '请输入昵称')"
              >
                <!--                <template #right-icon>-->

                <!--                  <van-button-->
                <!--                      class="text-nowrap no-border padding-0 no-bg"-->
                <!--                      :loading="isGetting"-->
                <!--                      :disabled="isGetting"-->
                <!--                      size="small"-->
                <!--                      style="height:unset"-->
                <!--                      @click="getRandomNickname"-->
                <!--                  >-->
                <!--  &lt;!&ndash;                  <span>{{ $t("RANDOM", "随机") }}</span>&ndash;&gt;-->
                <!--                    <van-icon name="replay" size="18"/>-->
                <!--                  </van-button>-->
                <!--                </template>-->
              </van-field>
            </div>

            <div class="margin-bottom-xs fc-secondary fs-12">
              {{ $t("PHONE", "手机号") }}
            </div>

            <div class="flex align-center margin-bottom-sm">
              <van-field
                type="tel"
                class="border-radius-sm bg-field font-bold focus-effect"
                style="padding: 0.186rem 0.4rem"
                v-model="register.phone"
                clearable
                :maxlength="15"
                :formatter="phoneFormatter"
                :placeholder="$t('ENTER_PHONE', '请输入手机号')"
              >
                <template #left-icon>
                  <van-popover
                    v-model="showDropdown"
                    class="flex align-center justify-center margin-right-xs"
                    trigger="click"
                    :actions="generateCountryCode"
                    placement="bottom-start"
                    @select="currentCountryChange"
                  >
                    <template #reference>
                      <van-button
                        class="no-border font-bold text-nowrap fc-secondary no-bg padding-0"
                        style="height: unset"
                        >+ {{ currentCallingCode }}</van-button
                      >
                    </template>
                  </van-popover>
                </template>
              </van-field>
            </div>

            <template v-if="system.is_sms_reg">
              <div class="margin-bottom-xs fc-secondary fs-12">
                {{ $t("VERIFY_CODE", "验证码") }}
              </div>
              <div class="flex align-center margin-bottom-sm">
                <van-field
                  class="border-radius-sm bg-field font-bold margin-right-xs focus-effect"
                  style="padding: 0.186rem 0.4rem"
                  clearable
                  v-model="register.verifyCode"
                  :placeholder="$t('ENTER_VERIFY_CODE', '请输入验证码')"
                >
                </van-field>
                <van-button
                  class="border-radius-sm text-nowrap bg-primary"
                  style="padding: 0.265rem 0.4rem; height: unset"
                  plain
                  v-if="sendTime > 0"
                >
                  {{ sendTime }}
                </van-button>

                <van-button
                  class="border-radius-sm text-nowrap bg-primary"
                  style="padding: 0.265rem 0.4rem; height: unset"
                  :disabled="!register.phone"
                  :loading="isSending"
                  @click="sendVerifyCode"
                  v-else
                >
                  {{ $t("SEND", "发送") }}
                </van-button>
              </div>
            </template>

            <div class="margin-bottom-xs fc-secondary fs-12">
              {{ $t("PASSWORD", "密码") }}
            </div>
            <van-field
              type="password"
              class="border-radius-sm bg-field margin-bottom-sm font-bold focus-effect"
              style="padding: 0.186rem 0.4rem"
              clearable
              v-model="register.password"
              :placeholder="$t('ENTER_PASSWORD', '请输入密码')"
            ></van-field>

            <!--            <template v-if="!system.is_sms_reg">-->
            <!--              <div class="margin-bottom-xs fc-secondary fs-12">-->
            <!--                {{ $t("PASSWORD_AGAIN", "确认密码") }}-->
            <!--              </div>-->
            <!--              <van-field-->
            <!--                  type="password"-->
            <!--                  class="border-radius-sm bg-field margin-bottom-sm font-bold focus-effect"-->
            <!--                  style="padding: 0.186rem 0.4rem"-->
            <!--                  clearable-->
            <!--                  v-model="register.passwordAgain"-->
            <!--                  :placeholder="$t('ENTER_PASSWORD_AGAIN', '请输入确认密码')"-->
            <!--              ></van-field>-->
            <!--            </template>-->

            <template v-if="source != 'ad'">
              <div class="margin-bottom-xs fc-secondary fs-12">
                {{ $t("REFERRAL_CODE", "邀请码") }}
              </div>
              <van-field
                class="border-radius-sm bg-field margin-bottom-sm font-bold focus-effect"
                style="padding: 0.186rem 0.4rem"
                clearable
                :readonly="register.inviteReadonly"
                v-model="register.inviteCode"
                :placeholder="$t('ENTER_REFERRAL_CODE', '请输入邀请码')"
              />
            </template>

            <div class="margin-bottom-xs" />

            <van-button
              :disabled="!allowRegister"
              :loading="loadingRegister"
              :class="[
                'margin-bottom-sm border-radius-sm font-bold no-border bg-primary wrap-btn ',
                { 'breath-btn': allowRegister && !loadingRegister },
              ]"
              @click="startRegister"
            >
              <!--            {{ $t("SIGN_UP", "注册") }}-->
              {{ $t("SIGN_UP_AND_GET_MONEY_NOW", "立即注册,免费领钱100年") }}
            </van-button>

            <van-button
              class="border-radius-sm opacity-90 wrap-btn"
              color="rgba(33, 35, 40, 0.6)"
              plain
              @click="changeCurrentType('login')"
              >{{ $t("HAS_ACCOUNT_SIGN_IN", "已有账号，登录") }}</van-button
            >
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-direction">
          <div class="margin-bottom">
            <div class="font-bold fs-18 text-center padding-lr">
              {{ $t("SIGN_IN", "登录") }}
            </div>
          </div>
          <div
            class="flex-sub white-view padding-lr-xs padding-bottom-xs flex flex-direction signInUpModel"
          >
            <div class="margin-bottom-xs fc-secondary fs-12">
              {{ $t("PHONE", "手机号") }}
            </div>

            <div class="flex align-center margin-bottom-sm">
              <van-field
                type="tel"
                class="border-radius-sm bg-field font-bold focus-effect"
                style="padding: 0.186rem 0.4rem"
                v-model="login.phone"
                clearable
                :maxlength="15"
                :formatter="phoneFormatter"
                :placeholder="$t('ENTER_PHONE', '请输入手机号')"
              >
                <template #left-icon>
                  <van-popover
                    v-model="showDropdown"
                    class="flex align-center justify-center margin-right-xs"
                    trigger="click"
                    :actions="generateCountryCode"
                    placement="bottom-start"
                    @select="currentCountryChange"
                  >
                    <template #reference>
                      <van-button
                        class="no-border font-bold text-nowrap fc-secondary no-bg padding-0"
                        style="height: unset"
                        >+ {{ currentCallingCode }}</van-button
                      >
                    </template>
                  </van-popover>
                </template>
              </van-field>
            </div>

            <div class="margin-bottom-xs fc-secondary fs-12">
              {{ $t("PASSWORD", "密码") }}
            </div>
            <van-field
              type="password"
              class="border-radius-sm bg-field margin-bottom-sm font-bold focus-effect"
              style="padding: 0.186rem 0.4rem"
              clearable
              v-model="login.password"
              :placeholder="$t('ENTER_PASSWORD', '请输入密码')"
            ></van-field>

            <div class="margin-bottom-xs"></div>

            <van-button
              :disabled="!allowLogin"
              :loading="loadingLogin"
              :class="[
                'bg-primary margin-bottom-sm border-radius-sm font-bold no-border wrap-btn',
                { 'breath-btn': allowLogin && !loadingLogin },
              ]"
              style="letter-spacing: 0.05rem"
              @click="startLogin"
            >
              {{ $t("SIGN_IN", "登录") }}
            </van-button>

            <van-button
              class="border-radius-sm wrap-btn wrap-btn"
              color="rgba(33, 35, 40, 0.6)"
              plain
              @click="changeCurrentType('register')"
            >
              <!--            {{ $t("SIGN_UP", "注册") }}-->
              {{ $t("SIGN_UP_AND_GET_MONEY_NOW", "立即注册,免费领钱100年") }}
            </van-button>
          </div>
        </div>
      </template>
    </div>
  </van-popup>
</template>

<script>
import { Popup, Field, Button, Popover, Icon } from "vant";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";

export default {
  components: {
    // VuePhoneNumberInput,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popover.name]: Popover,
    [Icon.name]: Icon,
  },
  data: () => {
    return {
      show: false,
      showDropdown: false,
      currentType: "register",
      currentCallingCode: "",
      isGetting: false,
      isSending: false,
      sendTime: 0,
      sendVerifyCodeTimer: null,
      register: {
        phone: "",
        nickName: "",
        verifyCode: "",
        password: "",
        passwordAgain: "",
        inviteCode: "",
        inviteReadonly: false,
      },
      login: {
        phone: "",
        password: "",
      },
      loadingLogin: false,
      loadingRegister: false,
      source: "",
    };
  },
  watch: {
    system() {
      if (this.system.country_code.length) {
        this.currentCallingCode = this.$getCallingCode(
          this.system.country_code[0]
        );
      }
    },
  },
  computed: {
    allowLogin() {
      return !!this.login.phone && !!this.login.password;
    },
    allowRegister() {
      if (this.system.is_sms_reg) {
        return (
          !!this.register.phone &&
          !!this.register.verifyCode &&
          !!this.register.nickName &&
          this.register.nickName.length >= 4 &&
          this.register.nickName.length <= 32 &&
          !!this.register.password
        );
      } else {
        return (
          !!this.register.phone &&
          !!this.register.nickName &&
          this.register.nickName.length >= 4 &&
          this.register.nickName.length <= 32 &&
          !!this.register.password
        );
      }
    },
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
    this.$bus.on("login", () => {
      this.show = true;
      // this.loadOpenAnimate()
      // 是否注册过，如果注册过显示登录，否则显示注册
      const hasAccount = localStorage.getItem("REGISTERED");
      if (hasAccount) {
        this.currentType = "login";
        this.changeCurrentType("login", true);
      } else {
        this.changeCurrentType("register", true);
      }

      // 来源, 如果来源是ad的话，不需要填写邀请码， 其他的情况注册需要填写邀请码
      this.source = localStorage.getItem("Source");
    });

    this.$nextTick(() => {
      if (this.system.country_code.length) {
        this.currentCallingCode = this.$getCallingCode(
          this.system.country_code[0]
        );
      }
      this.register.inviteCode = localStorage.getItem("Invitation");
      if (this.register.inviteCode) {
        this.register.inviteReadonly = true;
      }
    });
  },
  methods: {
    loadOpenAnimate() {
      //  .signInUpModel
      this.$nextTick(() => {
        let els = document.querySelectorAll(".signInUpModel");
        try {
          for (let el of els) {
            el.classList.add("bounce-up-btn");
            setTimeout(() => {
              el.classList.remove("bounce-up-btn");
            }, 1000);
          }
        } catch (err) {
          // console.log('add animate error',err)
        }
      });
    },
    async sendVerifyCode() {
      if (this.sendTime > 0) {
        return;
      }
      this.$webEvent(`点击发送验证码`, this.$route.name + "页面");
      this.isSending = true;
      this.$startRecaptcha("verify_code").then((g_token) => {
        if (g_token) {
          this.$http
            .post("v1/sendRegisterSms", {
              national_number: this.register.phone,
              country_code: this.$getCountryCode(this.currentCallingCode),
              g_token: g_token,
            })
            .then((res) => {
              // if (res.data.code) {
              //   this.register.verifyCode = res.data.code
              //   Toast.info(res.data.code)
              // }
              this.startSendTimer();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(() => {
              this.isSending = false;
            });
        }
      });
    },
    startSendTimer() {
      clearInterval(this.sendVerifyCodeTimer);
      this.sendTime = 60;
      this.sendVerifyCodeTimer = setInterval(() => {
        if (this.sendTime > 0) {
          --this.sendTime;
        } else {
          clearInterval(this.sendVerifyCodeTimer);
        }
      }, 1000);
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
    async startLogin() {
      if (!this.allowLogin) {
        return;
      }
      this.$webEvent(`点击登录`, this.$route.name + "页面");
      this.loadingLogin = true;
      this.$startRecaptcha("login").then((g_token) => {
        if (g_token) {
          this.$http
            .post("v1/login", {
              national_number: this.login.phone,
              country_code: this.$getCountryCode(this.currentCallingCode),
              password: this.login.password,
              g_token: g_token,
            })
            .then((res) => {
              localStorage.setItem("WELCOME_TO", true);
              localStorage.setItem("REGISTERED", true);
              localStorage.setItem("TOKEN", res.data.token);
              location.reload();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(() => {
              this.loadingLogin = false;
            });
        }
      });
    },
    async startRegister() {
      if (!this.allowRegister) {
        return;
      }
      this.$webEvent(`点击注册`, this.$route.name + "页面");
      this.loadingRegister = true;
      this.$startRecaptcha("register").then((g_token) => {
        if (g_token) {
          let inviteId = this.register.inviteCode;
          if (this.source == "ad") {
            inviteId = localStorage.getItem("Invitation") || 0;
          }
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
              this.$fbq("Lead");
              localStorage.setItem("WELCOME_TO", true);
              localStorage.setItem("REGISTERED", "1");
              localStorage.setItem("TOKEN", res.data.token);
              location.reload();
            })
            .catch((err) => {
              Toast.failed(err.data.message);
            })
            .finally(() => {
              this.loadingRegister = false;
            });
        }
      });
    },
    changeCurrentType(type, auto = false) {
      if (!auto) {
        this.$webEvent(
          `切换到${type == "register" ? "注册" : "登录"}`,
          this.$route.name + "页面"
        );
      }
      this.currentType = type;
      if (type == "register") {
        this.login = {
          phone: "",
          password: "",
        };
        // if (!this.register.nickName) {
        //   this.getRandomNickname()
        // }
      } else {
        this.register = {
          phone: "",
          nickName: "",
          verifyCode: "",
          password: "",
        };
      }
    },
  },
};
</script>

<style lang="scss">
.sign-in-up {
  .van-popup__close-icon {
    color: currentColor;
    font-size: 18px;
  }

  .van-popover__action {
    padding: 0;
    width: 2.4rem;
  }

  .van-field__left-icon,
  .van-field__right-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.grecaptcha-badge {
  display: none !important;
}

.signInUpModel {
  //transform: translate3d(0, 100%, 0);
  position: relative;

  //&::after {
  //  z-index: 1;
  //  content: "";
  //  background: #fff;
  //  position: absolute;
  //  left: 0;
  //  right: 0;
  //  height: 2rem;
  //  bottom: 0;
  //  transform: translate3d(0,100%,0);
  //}
}

.bounce-up-btn {
  animation-name: bounceInUpBtn;
  animation-duration: 1s;
}

.focus-effect {
  &:hover {
    box-shadow: 0 0 0 2px #fed32a !important;
  }
}

@keyframes bounceInUpBtn {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0) scaleY(3);
    transform: translate3d(0, 3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.92);
    transform: translate3d(0, -20px, 0) scaleY(0.92);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.99);
    transform: translate3d(0, -5px, 0) scaleY(0.99);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
