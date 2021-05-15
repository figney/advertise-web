<template>
  <div class="base-swipe-ad-banner position-re" style="height:2.5rem">

    <!--    class="bg-432af5"-->
    <md-swiper
        :autoplay="3000"
        :transition-duration="250"
        :is-prevent="false"
        :useNative-driver="false"
        v-if="!loadingSwiperAd"
    >
      <md-swiper-item
          v-for="(item, i) in banners"
          :key="'banner-item' + i"
          class="flex flex-direction"
          :style="'background-image:url('+item.image+')'"
      >
        <div class="padding-sm fs-18 fc-fff font-bold flex-sub" @click="toBanner(item)">
          {{item.title}}
        </div>
      </md-swiper-item>
    </md-swiper>

    <loading-view class="bg-432af5" color="#fff" v-else/>
  </div>
</template>

<script>
import LoadingView from "./LoadingView";
import { Swiper, SwiperItem } from "mand-mobile"
import {mapState} from "vuex";

export default {
  components: {
    LoadingView,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data: ()=> {
    return {
      loadingSwiperAd: false,
    }
  },
  computed: {
    ...mapState(['banners'])
  },
  methods: {
    toBanner(item) {
      if (item.link.startsWith('http')) {
        this.$openLink(item.link)
      } else {
        this.$toRouter({name:item.link})
      }
    }
  }
}
</script>

<style lang="scss">
.base-swipe-ad-banner {
  overflow: hidden;

  .md-swiper {
    background: #ccc;
  }
  .md-swiper-item {
    min-height: 6.61rem;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .md-swiper-indicators {
    bottom: 0.67rem;

    .md-swiper-indicator {
      width: 0.18rem;
      height: 0.18rem;
      background: #fff;
      opacity: 0.5;
      border-radius: 50%;
      margin: 0 0.08rem;
    }

    .md-swiper-indicator-active {
      opacity: 1;
    }
  }
}
</style>