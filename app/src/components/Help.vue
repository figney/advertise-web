<template>
  <div class="help-page flex flex-direction">
    <div class="">

      <div class="margin-bottom white-view box-shadow border-radius position-re" style="min-height:2rem">
        <template v-if="!loadingHelp">
          <van-cell
              v-for="(item, j) in helpArticles"
              :key="'help' + j"
              @click="showHelpDetail(item)"
              is-link
          >
            <template #title>
              <div class="font-bold">{{item.title || item.name}}</div>
            </template>
            <template #label>
              <div class="render-html" v-html="item.content" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:8rem"/>
            </template>
          </van-cell>
        </template>
        <loading-view v-else/>
      </div>

<!--      <div class="margin-bottom">-->
<!--        <van-button class="border-radius-xs" block color="#432af5" @click="contact">{{$t('OTHER_QUESTION_CONTACT_CS','还有其他问题咨询客服')}}</van-button>-->
<!--      </div>-->
    </div>

    <van-popup
        class="vh-80 vw-90 border-radius-sm"
        v-model="showDetail"
        closeable
        :close-on-popstate="true"
    >
      <div class="vh-80 padding flex flex-direction">
        <div class="font-bold fs-16 margin-bottom">{{currentHelpItem.title}}</div>
        <div class="fc-888 render-html flex-sub padding-bottom-xl" style="overflow:auto" v-html="currentHelpItem.content"/>
        <div class="margin-bottom">
          <van-button class="border-radius-xs bg-primary" block @click="contact">{{$t('OTHER_QUESTION_CONTACT_CS','还有其他问题咨询客服')}}</van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Field, Cell, NavBar, RadioGroup, Radio, Button, Popup } from "vant";
import { Base } from "@/mixins";
import {Toast} from "mand-mobile";
import LoadingView from "@/components/LoadingView";

export default {
  components: {
    LoadingView,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup
  },
  data: () => {
    return {
      questionType: "",
      submitContent: "",
      helpArticles: [],
      showDetail: false,
      currentHelpItem: {},
      loadingHelp: true
    };
  },
  mixins: [Base],
  mounted() {
    this.getData()
  },
  methods: {
    showHelpDetail(item) {
      this.currentHelpItem = item
      this.showDetail = true
    },
    getData() {
      this.loadingHelp = true
      this.$http.get('v1/articles',{
        params: {
          type: 'help'
        }
      }).then(res=>{
        this.loadingHelp = false
        this.helpArticles = res.data.list
      }).catch(err=>{
        Toast.failed(err.data.message)
      })
    },
    contact() {
      this.$openLink(this.system.service.url)
    }
  },
};
</script>

<style lang="scss">
.help-page {
}
</style>
