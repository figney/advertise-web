<template>
  <div class="my-task-page app-appbar">
    <van-nav-bar
        style="z-index: 2"
        class="no-border-bar"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default font-bold">{{$t('MY_TASKS','我的任务')}}</div>
      </template>
    </van-nav-bar>
    <van-tabs v-model="currentTab" class="white-view" @change="currentTabChange">
      <van-tab :title="$t('INPROGRESS','进行中')" name="InProgress">
        <div class="flex flex-direction padding" style="height:calc(100vh - 2.4rem);overflow:auto">
          <template v-if="myTasks.InProgress.length">
            <ad-card v-for="(ad,i) in myTasks.InProgress" :key="'hot-ad'+i" class="margin-bottom" :end="true" :ad="ad.ad_task" :time="ad.expired_time"/>
          </template>
          <template v-else>
            <van-empty
                style="min-height:calc(100vh - 5.1rem)"
                :image="require('../assets/images/default1@2x.png')"
                :description="$t('NO_MORE', '没有更多了')"
            />
          </template>
        </div>
      </van-tab>

      <van-tab :title="$t('FINISHED','已完成')" name="Finished">
        <div class="flex flex-direction padding" style="height:calc(100vh - 2.4rem);overflow:auto">
          <template v-if="myTasks.Finished.length">
            <ad-card v-for="(ad,i) in myTasks.Finished" :finished="true" :key="'finished-ad'+i" class="margin-bottom" :ad="ad.ad_task"/>
          </template>
          <template v-else>
            <van-empty
                style="min-height:calc(100vh - 5.1rem)"
                :image="require('../assets/images/default1@2x.png')"
                :description="$t('NO_MORE', '没有更多了')"
            />
          </template>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Empty, Icon, NavBar, Tab, Tabs} from "vant"
import AdCard from "../components/AdCard";
import {Toast} from "mand-mobile";

export default {
  components: {
    AdCard,
    [NavBar.name]:NavBar,
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    [Icon.name]:Icon,
    [Empty.name]:Empty
  },
  data: ()=> {
    return {
      currentTab: 'InProgress',
      myTasks: {
        InProgress: [],
        Finished: []
      }
    }
  },
  created() {
    if (this.$route.query.tag=='finished') {
      this.currentTab = 'Finished'
    }
  },
  mounted() {
    this.getMyTask(this.currentTab)
  },
  methods: {
    currentTabChange(status) {
      this.getMyTask(status)
    },
    getMyTask(status) {
      Toast.loading('loading')
      this.$http.get('v1/userAdTaskList',{
        params: { status: status }
      }).then(res=>{
        this.myTasks[status] = res.data.list
        Toast.hide()
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    }
  }
}
</script>

<style lang="scss">
.my-task-page {
  min-height: 100vh;
  background: #FFFFFF;

  .van-nav-bar {
    background: #FED32A;
  }
  .van-tabs__wrap {
    height: 1rem;
    box-shadow: none !important;
    background: #FED32A;
  }
  .van-tab {
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .van-tab--active {
    color: #323233 !important;
    background: #fff;
  }
  .van-tabs__line {
    display: none;
  }
  .ad-card {
    background: #f4f4f9;
    box-shadow: 0 0 1px 1px #e9e9f8;
  }

  .van-tabs__wrap {
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 23px 3px rgba(168,166,150,0.25);
  }

  .van-tab--active {
    color: #FF8900;
    font-weight: bold;
  }

  .van-tabs__line {
    bottom: 20px;
    background: #ff8900;
  }
}
</style>