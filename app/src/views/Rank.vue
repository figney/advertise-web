<template>
  <div class="rank-page app-appbar white-view">
    <van-nav-bar
        class="shadow"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default">
          {{$t('PROFIT_RANKING','收益排行榜')}}
        </div>
      </template>
    </van-nav-bar>

    <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('LOADING','加载中...')"
        :error-text="$t('LOAD_FAILED','加载失败')"
        @load="getData"
    >
      <template #finished>
        <van-empty
            style="min-height:calc(100vh - 5.014rem)"
            :image="require('../assets/images/default1@2x.png')"
            :description="$t('NO_MORE', '没有更多了')"
            v-if="list.length === 0"
        >
        </van-empty>
        <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
      </template>

      <van-cell
          center
          class="padding-tb friend-cell"
          v-for="(friend, j) in list"
          :key="'friend'+j"
      >
        <template #icon>
          <div class="flex align-center margin-right-sm">
            <span class="margin-right-xs fs-26 font-bold">{{j+1}}</span>
            <img
                class="size-36 border-radius-50"
                :src="friend.name | avatar"
            />
          </div>
        </template>
        <template #title>
          <div class="flex align-center">
            <span class="fs-16 font-bold fc-default margin-right-xs">{{friend.name}}</span>
            <div class="vip-chip">
              <img src="../assets/images/icon_vip@2x.png" style="height:0.5rem">
              <span style="padding-bottom:0.04rem;margin-left:-0.06rem">{{friend.vip_level || 0}}</span>
            </div>
          </div>
        </template>
        <template #label>
          <div class="flex align-center fc-888 fs-10 text-nowrap">
          </div>
        </template>
        <template #default>
          <div class="flex justify-end">
            <div class="flex flex-direction align-center">
              <money-number
                  class="fs-18 font-bold fc-accent"
                  :value="friend.invite_award"
                  :precision="coin_unit.balance"
              />
              <span class="fc-888 fs-10">{{$t('TOTAL_PROFIT','累计收益')}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Cell, NavBar, List, Empty } from "vant";
import { Toast } from "mand-mobile";
import { Base } from "@/mixins";
import MoneyNumber from "@/components/MoneyNumber";

export default {
  components: {
    MoneyNumber,
    [Empty.name]: Empty,
    [List.name]: List,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
  },
  data: () => {
    return {
      loading: false,
      finished: false,
      list: [],
    };
  },
  mixins: [Base],
  mounted() {

  },
  methods: {
    getData() {
      setTimeout(()=>{
        for (let i = 0; i < 5; i++) {
          this.list.push({
            name: 'Hello',
            invite_award: 30000,
            created_at: '2021-03-26 23:58:21'
          })
        }
        this.finished = true
      },200)
    },
  },
};
</script>

<style lang="scss">
.rank-page {
  min-height: 100vh;

  .friend-cell {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 1.6rem;
      right: 0;
      bottom: 0.03rem;
      height: 1.5px;
      background: #dddddd;
    }
  }

  .friends-list {
    .van-collapse::after {
      border: none;
    }
    .van-collapse-item__title,
    .van-collapse-item__content {
      padding: 0;
    }
  }

  .vip-chip {
    background:#3f434d;
    color:#ffdb99;
    height:0.5rem;
    line-height:0.5rem;
    display: flex;
    align-items: center;
    padding-right: 0.1rem;
    font-size: 14px;
    font-weight: 900;
    border-radius: 0.08rem;
  }
}
</style>
