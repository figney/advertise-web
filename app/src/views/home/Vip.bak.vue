<template>
  <div class="vip-bak-page flex flex-direction bg-dark">
    <template v-if="!isLoading">
      <div class="flex flex-direction padding-lr padding-top">
        <div class="font-bold margin-bottom fs-18 fc-accent2 flex align-center">
          <img class="margin-right-sm" src="../../assets/images/icon_5@2x.png" style="height:0.44rem"/>
          <span>{{$t('MY_VIP','我的会员')}}</span>
        </div>

        <template v-if="user.vip.length">
          <div
              v-for="(v,i) in user.vip"
              :key="'my-vip-item'+i"
              class="padding vip-wrap border-radius margin-bottom"
              :style="'background:url('+vipMap[v.level].bg_image+');color:'+vipMap[v.level].dev_config.color"
              @click="toBuyVip(vipMap[v.level])"
          >
            <div class="flex align-center margin-bottom-sm">
              <span class="fs-20 font-bold margin-right-sm">{{vipMap[v.level].title}}</span>
              <img :src="vipMap[v.level].icon" style="height:0.6rem">
            </div>

            <div
                class="margin-bottom-xs fs-12"
            >
              <span class="margin-right-xs">
                {{$t('TASK_NUM','任务次数')}}:
              </span>
              <span>{{vipMap[v.level].task_num}}</span>
            </div>

            <template v-for="(attr,j) in vipMap[v.level].attrs">
              <div
                  class="margin-bottom-xs fs-12"
                  :key="'my-vip-attr-'+i+'-'+j"
                  v-if="!attr.key.startsWith('DAY_PROFIT')"
              >
                <span class="margin-right-xs">{{$t(attr.key)}}:</span>
                <span>{{attr.value | i18n}}</span>
              </div>
            </template>

            <div
                class="margin-bottom-xs fs-12"
            >
              <span class="margin-right-xs">
                {{$t('DAY_PROFIT','日收益')}}:
              </span>
              <money-number class="money-number" :value="vipMap[v.level].day_min"/>
              <span class="margin-lr-xs">~</span>
              <money-number class="money-number" :value="vipMap[v.level].day_max"/>
            </div>

            <div
                class="margin-bottom-xs fs-12"
            >
              <span class="margin-right-xs">
                {{$t('YEAR_PROFIT','年收益')}}:
              </span>
              <money-number class="money-number" :value="vipMap[v.level].day_min * 365"/>
              <span class="margin-lr-xs">~</span>
              <money-number class="money-number" :value="vipMap[v.level].day_max * 365"/>
            </div>

            <!-- :style="'background:'+vip.dev_config.btn_bg" -->
            <div
              :style="'background:'+vipMap[v.level].dev_config.btn_bg"
              class="vip-btn shadow"
            >
              {{$t('BUY_AGAIN','叠加购买')}}
            </div>
          </div>
        </template>

        <div class="padding vip-wrap no-vip border-radius position-re" v-else>
          <div class="flex align-center margin-bottom-sm">
            <span class="fs-20 font-bold margin-right-sm">{{$t('NOT_BUY_VIP','未开通会员')}}</span>
  <!--          <img src="../../assets/images/no_vip.png" style="height:0.6rem">-->
          </div>
          <div class="margin-bottom-xs">{{$t('TASK_NUM','每日可接取任务数')}}: 1</div>
          <div class="margin-bottom-xs">{{$t('TASK_LEVEL','可接取任务等级')}}: 0</div>

          <div class="position-ab flex flex-direction" style="bottom:0;left:0;right:0">
            <img src="../../assets/images/current_vip_bottom@2x.png" style="width:100%">
          </div>
        </div>

      </div>

      <!-- 立即开通 -->
      <div class="flex align-center margin-tb">
        <div class="flex-sub" style="border-bottom:1px solid #F2D1A9"/>
        <div class="margin-lr-sm fs-18 font-bold fc-accent2">{{$t('BUY_VIP','开通会员')}}</div>
        <div class="flex-sub" style="border-bottom:1px solid #F2D1A9"/>
      </div>

      <!-- 会员列表 -->
      <template v-for="(vip,i) in vips">
        <div
            v-if="!isBuyVip(vip.level)"
            :key="'vip-item'+i"
            class="padding vip-wrap border-radius margin-lr margin-bottom"
            :style="'background:url('+vip.bg_image+');color:'+vip.dev_config.color"
            @click="toBuyVip(vip)"
        >
          <div class="flex align-center margin-bottom-sm">
            <span class="fs-20 font-bold margin-right-sm">{{vip.title}}</span>
            <img :src="vip.icon" style="height:0.6rem">
          </div>

          <div
              class="margin-bottom-xs fs-12"
          >
              <span class="margin-right-xs">
                {{$t('TASK_NUM','任务次数')}}:
              </span>
            <span>{{vip.task_num}}</span>
          </div>

          <template v-for="(attr,j) in vip.attrs">
            <div
                class="margin-bottom-xs fs-12"
                :key="'my-vip-attr-'+i+'-'+j"
                v-if="!attr.key.startsWith('DAY_PROFIT')"
            >
              <span class="margin-right-xs">{{$t(attr.key)}}:</span>
              <span>{{attr.value | i18n}}</span>
            </div>
          </template>

          <div
              class="margin-bottom-xs fs-12"
          >
              <span class="margin-right-xs">
                {{$t('DAY_PROFIT','日收益')}}:
              </span>
            <money-number class="money-number" :value="vip.day_min"/>
            <span class="margin-lr-xs">~</span>
            <money-number class="money-number" :value="vip.day_max"/>
          </div>

          <div
              class="margin-bottom-xs fs-12"
          >
              <span class="margin-right-xs">
                {{$t('YEAR_PROFIT','年收益')}}:
              </span>
            <money-number class="money-number" :value="vip.day_min * 365"/>
            <span class="margin-lr-xs">~</span>
            <money-number class="money-number" :value="vip.day_max * 365"/>
          </div>

          <div class="vip-status" :style="'background:'+vip.dev_config.btn_bg">{{$t('NOT_BUY','未开通')}}</div>
          <div class="vip-btn shadow" :style="'background:'+vip.dev_config.btn_bg">{{$t('BUY_NOW','立即开通')}}</div>
        </div>
      </template>

      <!-- 规则与说明 -->
      <div class="flex align-center margin-tb">
        <div class="flex-sub" style="border-bottom:1px solid #F2D1A9"/>
        <div class="margin-lr-sm fs-18 font-bold fc-accent2">{{$t('RULES_AND_DESC','规则与说明')}}</div>
        <div class="flex-sub" style="border-bottom:1px solid #F2D1A9"/>
      </div>

      <!-- 规则与说明内容 -->
      <div class="margin-lr margin-bottom-xl render-html fc-accent2" v-html="vipRule"/>
    </template>
  </div>
</template>

<script>
import {mapState} from "vuex";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import {Button, Row, Col, Icon, Popover, Tabs, Tab, Popup, Cell, CountDown} from "vant";
import MoneyNumber from "../../components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popover.name]: Popover,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CountDown.name]: CountDown,
  },
  data: () => {
    return {
      isLoading: true,
      vipMap: {},
      vipRule: `1. 会员购买后立即生效,不做退费处理,请了解详情后购买.\n2. 若已购会员未到期,重复购买同等级会员可直接续期,重复购买不同等级会员,优先享有高等级会员权益,低等级会员有效期顺延,在高等级会员有效期结束后,会员权益,直至有效期结束.`
    };
  },
  mixins: [Base],
  computed: {
    ...mapState(['products','vips']),
  },
  mounted() {
    this.getVipList()
  },
  methods: {
    isBuyVip(level) {
      for (let vip of this.user.vip) {
        if (vip.level == level) {
          return true
        }
      }
      return false
    },
    getVipList() {
      if (!this.vips.length) {
        Toast.loading('loading')
        this.$http.get('v1/getVipList')
          .then(res=>{
            for (let i = 0; i < res.data.list.length; i++) {
              res.data.list[i].attrs.sort((a,b)=>{
                return a.order - b.order
              })
              for (let j = 0; j < res.data.list[i].attrs.length; j++) {
                if (res.data.list[i].attrs[j].key == 'DAY_PROFIT_MIN') {
                  res.data.list[i].day_min = parseFloat(res.data.list[i].attrs[j].value)
                } else if (res.data.list[i].attrs[j].key == 'DAY_PROFIT_MAX') {
                  res.data.list[i].day_max = parseFloat(res.data.list[i].attrs[j].value)
                } else {}
              }
            }
            this.$store.commit('setState',{key: 'vips', value: res.data.list})
            this.vipToMap()
            this.isLoading = false
            Toast.hide()
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
      } else {
        this.vipToMap()
        this.isLoading = false
      }
    },
    vipToMap() {
      for (let vip of this.vips) {
        this.vipMap[vip.level] = vip
      }
    },
    toBuyVip(item) {
      localStorage.setItem('VipID',item.id)
      this.$toRouter({name:'BuyVip'})
    },
  },
};
</script>

<style lang="scss">
.vip-bak-page {
  min-height: calc(100vh - 1.35rem);
  margin-bottom: 1.35rem;

  .vip-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.8rem;
  }

  .no-vip {
    color: rgba(33, 35, 40, 0.6);
    background: #f1f1f1;

    img {

    }
  }

  .vip-status {
    //font-weight: bold;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0.8rem;
    transform: translate(0, -50%);
    padding: 0.1rem 0.2667rem 0.1rem 0.3rem;
    border-radius: 14px 0 0 14px;
    opacity: 0.8;
  }

  .vip-btn {
    position: absolute;
    right: 8px;
    bottom: 12px;
    padding: 0.26rem 0.7rem;
    border-radius: 22px;
    font-weight: bold;
    opacity: 0.9;
    font-size: 15px;

    &:active {
      opacity: 1;
    }
  }
}
</style>
