<template>
  <div id="app" :class="system.default_currency">
    <nprogress-container />
    <install-pwa />
    <base-socket />
    <template v-if="isLoading">
      <div
        class="
          flex flex-direction
          align-center
          justify-center
          vw-100
          vh-100
          bg-primary
        "
      >
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <router-view v-if="$route.meta && $route.meta.no_cache === true" />

      <keep-alive>
        <router-view v-if="$route.meta && !$route.meta.no_cache" />
      </keep-alive>

      <first-task />
      <shares />
      <sign-in-up />
      <zalo-share />

      <template
        v-if="
          !['TaskShare', 'Beginner', 'HomeMessage', 'AdShow'].includes(
            $route.name
          )
        "
      >
        <contact />
      </template>

      <template
        v-if="
          $route.name &&
          $route.name.startsWith('Home') &&
          $route.name !== 'HomeVip'
        "
      >
        <pwa-banner />
      </template>

      <template v-if="$route.name && $route.name.startsWith('Home')">
        <app-bottom-nav-bar style="z-index: 1" />
      </template>
    </template>
  </div>
</template>

<script>
import utils from "@/utils";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import InstallPwa from "@/components/InstallPwa";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
import AppBottomNavBar from "./components/AppBottomNavBar";
import SignInUp from "./components/SignInUp";
import Shares from "./components/Shares";
import BaseSocket from "./components/BaseSocket";
import FirstTask from "./components/guide/FirstTask";
import PwaBanner from "./components/PwaBanner";
import Contact from "./components/Contact";
import ZaloShare from "./components/ZaloShare";

export default {
  components: {
    ZaloShare,
    Contact,
    PwaBanner,
    FirstTask,
    BaseSocket,
    Shares,
    SignInUp,
    AppBottomNavBar,
    InstallPwa,
    NprogressContainer,
  },

  data: () => {
    return {
      isLoading: true,
      loadingRandom: -1,
    };
  },
  mixins: [Base],
  created() {
    localStorage.setItem("LastReload", Date.now());
    this.loadingRandom = Math.random();

    let urlInfo = utils.getUrlKey(location.href);

    if (urlInfo.token) {
      let token = urlInfo.token;
      localStorage.setItem("TOKEN", token);
      location.href = utils.updateQueryStringParameter(
        location.href,
        "token",
        ""
      );
      return;
    }

    // 邀请码
    if (urlInfo.t) {
      localStorage.setItem("Invitation", urlInfo.t);
    }

    // 来源
    if (urlInfo.s) {
      localStorage.setItem("Source", urlInfo.s);
    }

    // 推广链接ID
    if (urlInfo.cl) {
      localStorage.setItem("PremoteLinkID", urlInfo.cl);
    }

    // 渠道ID
    if (urlInfo.ch) {
      localStorage.setItem("ChannelID", urlInfo.ch);
    }

    // 来源地址在 public/index.html 中

    this.getToken();
  },
  mounted() {
    this.registerDevice();
    this.getVipList();
    //this.mountSocket();
  },
  methods: {
    mounteRecaptcha() {
      const scriptId = "__RECAPTCHA_SCRIPT";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://www.google.com/recaptcha/api.js?render=${this.system.web_recaptcha_key}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    },
    mountSocket() {
      //socket
      this.$socket.on("connect", () => {
        this.$store.commit("setState", { key: "dynamic_init", value: false });
        setTimeout(() => {
          this.$store.commit("setState", { key: "dynamic_init", value: true });
        }, 500);
        //注册用户
        if (this.user.hash) {
          this.$socket.invoke("SigninAsync", this.user.id);
        }
        console.log("socket connect");
      });
      this.$socket.on("reconnect", () => {
        if (this.user.hash) {
          this.$socket.invoke("SigninAsync", this.user.id);
        }
      });
    },
    registerDevice() {
      if (!localStorage.getItem("isRegisterd")) {
        this.$http
          .post("v1/device", {
            channel_id: Number(localStorage.getItem("ChannelID") || 0),
            link_id: Number(localStorage.getItem("PremoteLinkID") || 0),
            invite_id: localStorage.getItem("Invitation") || 0,
            source: localStorage.getItem("Source") || "_",
            source_url: localStorage.getItem("SourceUrl") || "_",
          })
          .then((res) => {
            localStorage.setItem("isRegisterd", true);
          })
          .catch((err) => {});
      }
    },
    async getToken() {
      this.$http
        .get("v1/init", {
          // params: {
          //   channel_id: Number(localStorage.getItem('ChannelID') || 0),
          //   link_id: Number(localStorage.getItem('PremoteLinkID') || 0),
          // }
        })
        .then((res) => {
          if (res.data.user && res.data.user.hash) {
            this.$store.dispatch("updateUser", res.data.user);
            this.$socket.invoke("SigninAsync", res.data.user.id);
          }
          this.$store.commit("setState", {
            key: "money_bao_rate",
            value: res.data.money_bao_rate,
          });
          this.$store.commit("setState", {
            key: "left_secs",
            value: Math.floor(res.data.left_secs),
          });
          this.$store.commit("setState", {
            key: "coin_unit",
            value: res.data.coin_unit,
          });
          this.$store.commit("setState", {
            key: "free_task_num",
            value: res.data.free_task_num,
          });
          this.$i18n.mergeLocaleMessage("en", res.data.i18n);
          delete res.data.user;
          delete res.data.money_bao_rate;
          delete res.data.left_secs;
          delete res.data.coin_unit;
          delete res.data.i18n;
          delete res.data.free_task_num;
          this.$store.commit("setState", { key: "system", value: res.data });
          this.$store.dispatch("startSystemTimer");
          this.mounteRecaptcha();
          this.checkLanguage();
          this.isLoading = false;

          setTimeout(() => {
            if (this.isLogin) {
              this.$bus.emit("getForceNotifications");
            }
          }, 100);
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    checkLanguage() {
      let lang = localStorage.getItem("language");
      if (lang !== this.system.default_lang && !this.getLanguageName(lang)) {
        localStorage.setItem("language", this.system.default_lang);
        location.reload();
      }
    },
    getLanguageName(l) {
      for (let lang of this.system.lang_list) {
        if (l === lang.slug) {
          return lang.slug;
        }
      }
      return "";
    },
    getVipList() {
      this.$http
        .get("v1/getVipList")
        .then((res) => {
          let vips = this.handleVipList(res.data.list);
          this.$store.commit("setState", { key: "vips", value: vips });
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
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
  },
  sockets: {
    connectAsync(message) {
      console.log(message);
      this.$store.commit("setState", { key: "dynamic_init", value: false });
      setTimeout(() => {
        this.$store.commit("setState", { key: "dynamic_init", value: true });
      }, 500);
      if (this.user.hash) {
        this.$socket.invoke("SigninAsync", this.user.id);
      }
    },
    disconnectAsync() {
      console.log("socket disconnect");
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.money-number,
.money-number-small {
  white-space: nowrap;
  font-family: Montserrat, sans-serif;
}

.money-number::before {
  color: #ff8900;
  font-size: 100%;
  margin-right: 0.06rem;
}

.money-number::after {
  color: #ff8900;
  font-size: 100%;
  margin-left: 0.06rem;
}

.money-number-small::before {
  font-size: 60%;
  margin-right: 0.06rem;
}

.money-number-small::after {
  font-size: 60%;
  margin-left: 0.06rem;
}

.₫ {
  .money-number::before,
  .money-number-small::before {
    font-size: 100% !important;
    content: "₫";
  }
}

.Rp {
  .money-number::before,
  .money-number-small::before {
    content: "Rp";
  }
}

// loading 动画
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: hidden;

  // Modernizr no-js fallback
  .no-js & {
    display: none;
  }
}

#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #212328;
  animation: spin 2s linear infinite;
  z-index: 11;

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #e74c3c;
    animation: spin-reverse 1s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #16a085;
    animation: spin 1.5s linear infinite;
  }
}

// Bourbon mixins
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* Loaded styles */

.loaded #loader-wrapper .loader-section.section-left {
  transform: translateX(-100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded #loader-wrapper .loader-section.section-right {
  transform: translateX(100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded #loader {
  opacity: 0;
  transition: all 0.3s ease-out;
}

.loaded #loader-wrapper {
  visibility: hidden;
  transform: translateY(-100%);
  transition: all 0.3s 1s ease-out;
}
</style>
