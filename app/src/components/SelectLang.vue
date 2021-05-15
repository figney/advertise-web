<template>
<div class="select-lang">
  <van-popover
      get-container=".select-lang"
      v-model="showPopover"
      placement="bottom-end"
      trigger="click"
  >
    <template #reference>
      <div class="flex align-center">
        <span>{{getLangName(currentLang)}}</span>
        <van-icon name="arrow"/>
      </div>
    </template>
    <template #default>
      <div class="flex flex-direction border-radius-xs shadow" style="min-width:3.75rem">
        <div
            v-for="(lang,i) in system.lang_list"
            :key="'lang-'+i"
            :class="['padding-lr','padding-tb-sm',{'active__lang':(currentLang==lang.slug)}]"
            @click="onSelect(lang)"
        >
          {{lang.name}}
        </div>
      </div>
    </template>
  </van-popover>
</div>
</template>

<script>
import { Icon, Popover } from "vant"
import {Base} from "../mixins";
import { Toast } from "mand-mobile"
export default {
  components: {
    [Icon.name]: Icon,
    [Popover.name]: Popover,
  },
  data: () => {
    return {
      showPopover: false,
      currentLang: localStorage.getItem('language') || 'EN'
    }
  },
  mixins: [Base],
  methods: {
    onSelect(lang) {
      if (lang.slug !== this.currentLang) {
        localStorage.setItem('language', lang.slug)
        Toast.loading('loading')
        this.$http.get('v1/switchLanguage')
            .then(res=>{
              Toast.hide()
              setTimeout(()=>{
                location.reload()
              },200)
            })
            .catch(err=>{
              Toast.failed(err.data.message)
            })
      }
      this.showPopover = false
    },
    getLangName(key) {
      for (let lang of this.system.lang_list) {
        if (key === lang.slug) {
          return lang.name || lang.slug;
        }
      }
      return key
    }
  }
}
</script>

<style lang="scss">
.select-lang {
  .van-popover__content {
    border-radius: 5px !important;
  }

  .active__lang {
    background: #FFFBDE;
    color: #ff8900;
  }
}
</style>