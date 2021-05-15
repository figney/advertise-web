<template>
  <div class="about-page app-appbar flex flex-direction">
    <van-nav-bar
        class="no-border-bar shadow"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="fc-default font-bold">{{$t('ABOUT_US','关于我们')}}</div>
      </template>
    </van-nav-bar>
    <div class="white-view margin padding border-radius-sm flex-sub">
      <div class="render-html" v-html="aboutContent.content"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {NavBar} from "vant";
import {Toast} from "mand-mobile";

export default {
  components: {
    [NavBar.name]:NavBar,
  },
  computed: {
    ...mapState(["aboutContent"])
  },
  mounted() {
    this.getAboutContent()
  },
  methods: {
    getAboutContent() {
      if (!this.aboutContent.content) {
        this.$http.post('v1/getArticle',{
          slug: 'INDEX_ABOUT'
        }).then(res=>{
          this.$store.commit('setState',{key:'aboutContent',value:res.data.articles})
        }).catch(err=>{
          Toast.failed(err.data.message)
        })
      }
    },
  }
}
</script>

<style lang="scss">
.about-page {
  min-height: 100vh;
}
</style>