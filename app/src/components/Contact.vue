<template>
  <div class="contact-support">
    <div class="contact-img" @click="contact">
      <img src="../assets/images/contact number.png">
    </div>
  </div>
</template>

<script>
import {Base} from "../mixins";

export default {
  name: "Contact",
  mixins: [Base],
  methods: {
    contact() {
      this.$toRouter({name:'HomeMessage',query:{type:'help'}})
    }
  }
}
</script>

<style lang="scss">
.contact-support {
  .contact-img {
    z-index: 3;
    position: fixed;
    left: 0.2rem;
    bottom: 1.7rem;
    border-radius: 50%;
    background: #ff8900;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px 2px rgba(0,0,0,0.2);

    img {
      height: 0.6rem;
      width: 0.6rem;
      animation: flashImg 1.5s linear infinite;
    }
  }

  @keyframes flashImg {
    0%,20%,40%,100% {
      transform: rotate(20deg);
    }
    10%,30% {
      transform: rotate(-20deg);
    }
  }
}
</style>