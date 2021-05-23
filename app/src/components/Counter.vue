<template>
  <div class="numCounter" :id="elId" :data-value="defaultNum"></div>
</template>

<script>
import Counter from "../plugins/numCounter";
import randomString from "string-random";
export default {
  data: () => {
    return {
      elId: randomString(),
      counter: null,
      counterInterval: null,
      defaultNum: 210570,
    };
  },
  mounted() {
    this.startCounter();
  },
  methods: {
    startCounter() {
      const selector = ".numCounter";
      this.counter = new Counter(selector, {
        direction: "rtl",
        delay: 100,
        digits: 5,
      });
      this.countCurrentNum();
      this.counterInterval = setInterval(this.countCurrentNum, 3000);
    },
    countCurrentNum() {
      let t = Date.now() % 86400000;
      let v = Math.floor(t / 36) + this.defaultNum;
      this.counter.count(v);
    },
  },
};
</script>

<style lang="scss">
$digitHeight: 1.375rem;
$speed: 0.5s;

.numCounter {
  display: inline-block;
  height: $digitHeight;
  line-height: $digitHeight;
  text-shadow: 0 0 2px #fff;
  font-weight: bold;
  white-space: normal;
  font-family: din-pro, sans-serif;

  > div {
    width: 0.76rem;
    display: inline-block;
    vertical-align: top;
    height: 100%;
    position: relative;
    overflow: hidden;
    //margin: 0 0.02rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1) inset;

    > b {
      width: 100%;
      position: relative;
      height: $digitHeight * 10;
      border-radius: 0.1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      transition: $speed cubic-bezier(0.75, 0.15, 0.6, 1.15), text-shadow 150ms;

      > div {
        width: 100%;
        height: $digitHeight;
        border-radius: 0.1rem;
      }

      &.blur {
        background: rgba(#ff0000, 0.3);
        opacity: 0.3;
        div {
          text-shadow: 2px 1px 3px rgba(#fff, 0.2),
            0 0.1em 2px rgba(#ff0000, 0.2), 0 0.3em 3px rgba(#ff0000, 0.1),
            0 -0.1em 2px rgba(#ff0000, 0.2), 0 -0.3em 3px rgba(#ff0000, 0.1);
        }
      }

      @for $i from 1 through 9 {
        &[data-value="#{$i}"] {
          transform: translate(0, -$digitHeight * $i);
        }
      }
    }

    &:nth-last-child(3n):not(:first-child) {
      &::before {
        font-family: sans-serif;
        position: fixed;
        //left: 0;
        transform: translate(-200%, 0);
        content: ",";
        display: inline;
        opacity: 0.6;
      }
    }
  }
}
</style>
