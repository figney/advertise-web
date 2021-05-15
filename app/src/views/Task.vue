<template>
  <div class="task-page app-appbar position-re">
    <van-nav-bar
        style="z-index: 2"
        class="no-border-bar"
        fixed
        left-arrow
        @click-left="back"
        @click-right="toMyTasks"
    >
      <template #title>
        <div class="fc-default font-bold">{{$t('TASK_CENTER','任务中心')}}</div>
      </template>
      <template #right>
        <span>{{$t('MY_TASK','我的任务')}}</span>
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="currentTab"
      @change="currentTabChange"
      swipeable
      v-if="!loadingTasks"
    >
      <van-tab :title="$t('ALL','全部')" name="all">
        <div class="flex flex-direction padding" style="height:calc(100vh - 2.265rem);overflow:auto">
          <van-list
              v-model="allTasks.loading"
              :finished="allTasks.finished"
              :loading-text="$t('LOADING', '加载中...')"
              :error-text="$t('LOAD_FAILED', '加载失败')"
              @load="getVipTasks('all')"
          >
            <template #finished>
              <van-empty
                  :image="require('../assets/images/default1@2x.png')"
                  :description="$t('NO_MORE', '没有更多了')"
                  v-if="allTasks.list.length === 0"
              />
              <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
            </template>
            <template v-for="(ad,i) in allTasks.list">
              <ad-card :key="'hot-ad'+i" class="margin-bottom" :ad="ad"/>
            </template>
          </van-list>
        </div>
      </van-tab>

      <van-tab :title="$t('FREE','免费')" name="0">
        <div class="flex flex-direction padding" style="height:calc(100vh - 2.265rem);overflow:auto">
          <van-list
              v-model="tasks.vip0.loading"
              :finished="tasks.vip0.finished"
              :loading-text="$t('LOADING', '加载中...')"
              :error-text="$t('LOAD_FAILED', '加载失败')"
              @load="getVipTasks('0')"
          >
            <template #finished>
              <van-empty
                  :image="require('../assets/images/default1@2x.png')"
                  :description="$t('NO_MORE', '没有更多了')"
                  v-if="tasks.vip0.list.length === 0"
              />
              <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
            </template>
            <template v-for="(ad,i) in tasks.vip0.list">
              <ad-card :key="'vip-0-ad'+i" class="margin-bottom" :ad="ad"/>
            </template>
          </van-list>
        </div>
      </van-tab>

      <van-tab
        v-for="(vip,index) in vips"
        :key="'vip-tasks-'+index"
        :title="'VIP'+vip.level"
        :name="vip.level"
      >
        <div class="flex flex-direction padding" style="height:calc(100vh - 2.265rem);overflow:auto">

          <van-list
              v-model="tasks['vip'+vip.level].loading"
              :finished="tasks['vip'+vip.level].finished"
              :loading-text="$t('LOADING', '加载中...')"
              :error-text="$t('LOAD_FAILED', '加载失败')"
              @load="getVipTasks(vip.level)"
          >
            <template #finished>
              <van-empty
                  :image="require('../assets/images/default1@2x.png')"
                  :description="$t('NO_MORE', '没有更多了')"
                  v-if="tasks['vip'+vip.level].list.length === 0"
              />
              <span v-else>{{ $t("NO_MORE", "没有更多了") }}</span>
            </template>
            <template v-for="(ad,i) in tasks['vip'+vip.level].list">
              <ad-card :key="'vip-ad-'+vip.level+i" class="margin-bottom" :ad="ad"/>
            </template>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <loading-view v-else/>
  </div>
</template>

<script>
import {Empty, Icon, List, NavBar, Tab, Tabs} from "vant"
import AdCard from "../components/AdCard";
import {Toast} from "mand-mobile";
import {mapState} from "vuex";
import {Base} from "../mixins";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import Vue from "vue";
import LoadingView from "../components/LoadingView";

export default {
  components: {
    LoadingView,
    AdCard,
    [NavBar.name]:NavBar,
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    [Icon.name]:Icon,
    [Empty.name]:Empty,
    [List.name]:List,
    [Empty.name]:Empty,
  },
  data: ()=> {
    return {
      currentTab: 0,
      driver: null,
      loadingTasks: true,
      allTasks: {
        stop: false,
        list: [],
        page: 0,
        loading: false,
        finished: false,
      },
      tasks: {
        vip0: {
          stop: false,
          list: [],
          page: 0,
          loading: false,
          finished: false,
        }
      },
    }
  },
  mixins: [Base],
  computed: {
    ...mapState(["hotTasks","vipTasks","vips"])
  },
  created() {
    if (this.$route.query.tag==='vip') {
      this.currentTab = 1
    }
    if (this.$route.query.lv) {
      this.currentTab = this.$route.query.lv
    }
  },
  mounted() {
    this.getVipList()
    this.getVipTasks('all')
  },
  beforeDestroy() {
    try {
      this.driver.reset()
    } catch (e) {}
  },
  methods: {
    back() {
      if (localStorage.getItem('TaskBackHome')) {
        this.$toRouter({name:'HomeIndex'})
      } else {
        this.$router.go(-1)
      }
    },
    toMyTasks() {
      this.$toRouter({name:'MyTask'})
    },
    startGuide() {
      if (!localStorage.getItem('GuideMoreTask')) {
        localStorage.setItem('GuideMoreTask',true)
        let el = document.querySelector('.van-tabs__wrap')
        if (el) {
          el.id = 'guide-tasks-step-1'
        }
        setTimeout(()=>{
          this.driver = new Driver({
            allowClose: true,
            animate: true,
            opacity: 0.56,
            padding: 0,
            doneBtnText: this.$t('I_SEE',"我知道了"),
          });

          this.driver.defineSteps([
            {
              element: '#guide-tasks-step-1',
              popover: {
                title: `<em>${this.$t('TASKS_GUIDE_TITLE1','这里可以查看不同等级的任务')}</em>`,
                description: this.$t('TASKS_GUIDE_DESC1','任务的等级越高,奖励就越丰厚'),
                position: 'bottom-center',
              }
            },
          ]);
          try {
            this.driver.start()
          } catch (err) {
            console.log(err)
          }
        },500)
      }
    },
    getVipList() {
      if (!this.vips.length) {
        this.$http.get('v1/getVipList')
          .then(res=>{
            let vips = this.handleVipList(res.data.list)
            this.$store.commit('setState',{key: 'vips', value: vips})
            this.generateTaskList()
            setTimeout(()=>{
              this.startGuide()
            },500)
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
      } else {
        this.generateTaskList()
        setTimeout(()=>{
          this.startGuide()
        },500)
      }
    },
    handleVipList(vips) {
      for (let i = 0; i < vips.length; i++) {
        vips[i].attrs.sort((a,b)=>{
          return a.order - b.order
        })
        for (let j = 0; j < vips[i].attrs.length; j++) {
          if (vips[i].attrs[j].key == 'PREDICT_TASK_PROFIT') {
            vips[i].day_profit = parseFloat(vips[i].attrs[j].value)
          } else {}
        }
      }
      return vips
    },
    generateTaskList() {
      for (let vip of this.vips) {
        Vue.set(this.tasks, 'vip'+vip.level, {
          stop: false,
          list: [],
          page: 0,
          loading: false,
          finished: false,
        })
      }
      this.loadingTasks = false
    },
    currentTabChange(name) {
      this.getVipTasks(name)
      try {
        this.driver.reset()
      } catch (e) {}
    },
    getVipTasks(level) {
      if ((level=='all' && this.allTasks.stop) || (level!='all' && this.tasks['vip'+level].stop)) {
        return
      }

      let params = {
        level: level,
        page_size: 5,
      }
      if (level=='all') {
        delete  params.level
        params.page = ++this.allTasks.page
      } else {
        params.page = ++this.tasks['vip'+level].page
      }
      this.$http.get('v1/adTaskList',{
        params
      }).then(res=>{
        if (level=='all') {
          this.allTasks.list = this.allTasks.list.concat(res.data.list)
          if (res.data.list.length < 5) {
            this.allTasks.finished = true
            this.allTasks.stop = true
          }
          this.allTasks.loading = false
        } else {
          this.tasks['vip'+level].list = this.tasks['vip'+level].list.concat(res.data.list)
          if (res.data.list.length < 5) {
            this.tasks['vip'+level].finished = true
            this.tasks['vip'+level].stop = true
          }
          this.tasks['vip'+level].loading = false
        }
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
  }
}
</script>

<style lang="scss">
.task-page {
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