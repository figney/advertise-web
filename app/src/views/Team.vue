<template>
  <div class="team-page app-appbar white-view">
    <van-nav-bar
        class="shadow"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default">
          {{$t('MY_TEAM','我的团队')}}
        </div>
      </template>
    </van-nav-bar>

    <div class="margin bg-primary border-radius-sm padding-lr padding-tb-sm flex align-stretch">
      <div class="flex flex-direction flex-sub" style="width:30%">
        <div class="font-bold margin-bottom-xs">
          {{$t('TEAM_MEMBERS','团队人数')}}
        </div>
        <div class="fs-20 font-bold">{{user.invite.total}}</div>
      </div>
      <div class="flex flex-direction flex-sub" style="width:30%">
        <div class="font-bold margin-bottom-xs">
          {{$t('TOTAL_CONTRIBUTE','累计贡献')}}
        </div>
        <div class="fs-20 font-bold">
          <money-number
            class="money-number"
            :value="user.invite_commission"
          />
        </div>
      </div>
    </div>

    <div class="font-bold margin-lr flex align-center justify-between">
      <span>{{$t('TEAM_LIST','团队列表')}}</span>

      <van-dropdown-menu active-color="#ff8900">
        <van-dropdown-item ref="levelDropItem">
          <template #title>
            <div class="flex align-center font-400">
              <span>{{$t('N_LEVEL_FRIEND',[currentLevel.toString()],'N级好友')}}</span>
              <van-icon name="arrow"/>
            </div>
          </template>
          <template #default>
            <div class="flex flex-wrap justify-between padding-bottom padding-lr">
              <template v-for="(level,i) in Object.keys(user.invite)">
                <div
                    class="padding-lr padding-tb-sm margin-bottom-sm border-radius-xs text-center fs-12"
                    :style="currentLevel==(level.replace('total_','')) ? 'background:#ff992d;color:#fff' : 'background:rgba(248, 211, 51, 0.4)'"
                    :key="'level-friend-'+i"
                    v-if="level!='total'"
                    style="width:calc(50% - 0.1333rem)"
                    @click="changeLevel(level.replace('total_',''))"
                >
                  {{$t('N_LEVEL_FRIEND',[level.replace('total_','')],'N级好友')}}
                </div>
              </template>
            </div>
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('LOADING','加载中...')"
        :error-text="$t('LOAD_FAILED','加载失败')"
        @load="getData"
    >
      <template #finished>
        <van-empty
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
          <img
              class="margin-right-xs size-45 border-radius-50"
              :src="friend.name | avatar"
          />
        </template>
        <template #title>
          <div class="flex align-center" style="max-width:5rem">
            <span class="fs-14 font-bold fc-default margin-right-xs text-nowrap text-ellipsis overflow-hidden">{{friend.name}}</span>
            <div class="vip-chip">
              <img src="../assets/images/icon_vip@2x.png" style="height:0.5rem">
              <span style="padding-bottom:0.04rem;margin-left:-0.06rem">{{friend.level || 0}}</span>
            </div>
          </div>
        </template>
        <template #label>
          <div class="flex align-center fc-888 fs-10 text-nowrap">
            <span>{{$localTime(friend.created_at)}}</span>
          </div>
        </template>
        <template #default>
          <div class="flex justify-end text-nowrap">
            <div class="flex flex-direction align-center">
              <money-number
                  class="fs-17 font-bold fc-accent money-number"
                  :value="friend.invite_commission"
                  :precision="coin_unit.balance"
              />
              <span class="fc-888 fs-10">{{$t('CONTRIBUTE_AMOUNT','贡献金额')}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Cell, NavBar, List, Empty, DropdownMenu, DropdownItem, Icon } from "vant";
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
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem,
    [Icon.name]:Icon,
  },
  data: () => {
    return {
      loading: false,
      finished: false,
      list: [],
      level: 1,
      currentLevel: 1,
      page: 0,
    };
  },
  mixins: [Base],
  mounted() {

  },
  methods: {
    changeLevel(level) {
      this.$refs.levelDropItem.toggle()
      this.currentLevel = parseInt(level)
      this.list = []
      this.page = 0
      this.getData()
    },
    getData() {
      this.$http.get('v1/friendList', {params: {
          page: ++this.page,
          page_size: 10,
          level: this.currentLevel
        }}).then(res=>{
        if (res.data.length) {
          this.list = this.list.concat(res.data)
          if (res.data.length < 10) {
            this.finished = true
          }
        } else {
          this.finished = true
        }
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
  },
};
</script>

<style lang="scss">
.team-page {
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

  .van-dropdown-menu__title {
    &::after {
      display: none;
    }
  }

  .van-dropdown-menu__bar {
    box-shadow: none !important;
  }
}
</style>
