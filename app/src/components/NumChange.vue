<template>
  <span class="num-change" :id="elId"/>
</template>

<script>
import stringRandom from "string-random";
import { CountUp } from "countup.js"

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    from: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    }
  },
  data: ()=> {
    return {
      elId: stringRandom(),
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.startCountUp(oldVal,newVal)
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.startCountUp(this.from,this.value)
    })
  },
  methods: {
    startCountUp(start=0,end=0) {
      if (isNaN(start)) {
        start = 0
      }
      if (isNaN(end)) {
        end = 0
      }
      let options = {
        startVal: start,
        duration: this.duration,
      }
      let countUp = new CountUp(this.elId,end,options)
      if (!countUp.error) {
        countUp.start()
      } else {
        console.error('countUp error:',countUp.error)
      }
    }
  }
}
</script>

<style lang="scss">
.num-change {
  * {
    font-family: Montserrat, sans-serif !important;
    // font-family: Orbitron, sans-serif !important;
  }
}
</style>