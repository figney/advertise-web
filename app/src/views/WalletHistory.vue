<template>
  <div class="wallet-history-page app-appbar">
    <van-nav-bar
        style="z-index: 2"
        class="no-border-bar shadow"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default font-bold">{{$t('WALLET_HISTORY','收支记录')}}</div>
      </template>
    </van-nav-bar>

    <div class="margin border-radius-xs bg-primary padding flex align-center justify-between">
      <span class="fs-16 font-bold">{{$t('ACCOUNT_BALANCE','账户余额')}}</span>
      <div class="fs-20 font-bold">
        <money-number
          class="money-number"
          :value="wallet.balance"
        />
      </div>
    </div>

    <div class="margin-lr margin-bottom white-view border-radius-xs history-list flex flex-direction">

      <div
        class="list-filter flex flex-direction"
        style="padding-top:1.173rem"
        v-if="showFilter"
        @click="showFilter=false"
      >
        <div class="white-view border-radius-bottom-xs padding-lr padding-top padding-bottom-sm flex align-center flex-wrap justify-between" @click.stop="">
          <div
            :class="['per-filter',{'filter__active':(currentSlug == 'all')}]"
            @click.stop="changeCurrentCurrentSlug('all')"
          >
            {{$t('ALL','全部')}}
          </div>
          <template v-for="(item, i) in Object.keys(system.wallet_slug)">
            <div
                :class="['per-filter',{'filter__active':(currentSlug == item)}]"
                :key="'select-type' + i"
                @click.stop="changeCurrentCurrentSlug(item)"
                v-if="!['transform'].includes(item)"
            >
              {{system.wallet_slug[item]}}
            </div>
          </template>

        </div>
      </div>

      <div class="flex align-center justify-between padding-lr padding-tb-sm border-bottom white-view" style="z-index:2">
        <div class="fc-accent filter-btn" @click="showFilter=true">{{currentSlug == 'all' ? $t('ALL','全部') : system.wallet_slug[currentSlug]}}</div>
        <div class="fs-12 fc-secondary">{{$t('LATEST_3_MONTH','最近三个月记录')}}</div>
      </div>

      <van-list
          v-model="loading"
          :finished="finished"
          :loading-text="$t('LOADING', '加载中...')"
          :error-text="$t('LOAD_FAILED', '加载失败')"
          @load="getData"
      >
        <template #finished>
          <van-empty
              :image="require('../assets/images/default1@2x.png')"
              :description="$t('NO_MORE', '没有更多了')"
              v-if="list.length === 0 && !loading"
          />
          <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
        </template>
        <van-cell center class="border-bottom" v-for="(item,i) in list" :key="'history-'+i">
          <template #title>
            <div class="font-bold">{{item.wallet_slug}}</div>
          </template>
          <template #label>
            <div class="fs-12">{{$formatTime('yyyy/mm/dd',item.created_at)}}</div>
          </template>
          <template #default>
            <div class="fs-16 font-bold fc-accent">
              <span class="margin-right-xs">{{item.fee < 0 ? '-' : ''}}</span>
              <money-number class="money-number" :value="Math.abs(item.fee)"/>
            </div>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import {Button, Cell, Empty, Icon, List, NavBar} from "vant"
import {Base} from "../mixins";
import MoneyNumber from "../components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
    [Button.name]:Button,
    [Cell.name]:Cell,
    [List.name]:List,
    [Empty.name]:Empty,
  },
  data: ()=> {
    return {
      currentTab: 1,
      showFilter: false,
      page: 0,
      currentSlug: "all",
      list: [],
      loading: false,
      finished: false,
    }
  },
  mixins: [Base],
  mounted() {
    this.getData()
  },
  methods: {
    changeCurrentCurrentSlug(item) {
      this.showFilter = false;
      this.currentSlug = item;
      this.page = 0;
      this.list = [];
      this.getData()
    },
    getData() {
      let data = {
        page: ++this.page,
        page_size: 10,
      };

      // 类型
      if (this.currentSlug != "all") {
        data.wallet_slug = this.currentSlug;
      }
      this.loading = true
      this.$http
          .post("v1/walletLogs", data)
          .then((res) => {
            if (res.data.list.length) {
              this.list = this.list.concat(res.data.list);
              if (res.data.list.length < 10) {
                this.finished = true;
              }
            } else {
              this.finished = true;
            }
          })
          .catch((res) => {})
          .finally(() => {
            this.loading = false;
          });
    },
  }
}
</script>

<style lang="scss">
.wallet-history-page {
  min-height: 100vh;

  .history-list {
    overflow: hidden;
    min-height: calc(100vh - 4.03rem);
    position: relative;

    .filter-btn {
      border:1px solid #FF8900;
      padding:0.08rem 0.32rem;
      border-radius: 0.08rem;

      &:active {
        background: #FF992D;
        color: #fff;
      }
    }

    .list-filter {
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(33,35,40,0.6);

      .filter__active {
        background: #FF992D !important;
        color: #fff !important;
      }

      .per-filter {
        background:rgba(248,211,51,0.4);
        padding:0.1rem 0.32rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        border:1px solid rgba(248,211,51,0.4);
        border-radius:0.15rem;
        font-size: 14px;
        font-weight: bold;
        color: #FF992D;
        margin-bottom: 0.2rem;
        width: calc(50% - 0.1333rem);
        text-align: center;

        &:active {
          background: #FF992D;
          color: #fff;
        }
      }
    }
  }
}
</style>