<template>
  <div class="contact-support">
    <div class="contact-img bounce" @click="contact">
      <img src="../assets/images/chat-button-icon.svg" />
    </div>
  </div>
</template>

<script>
import { Base } from "../mixins";

export default {
  name: "Contact",
  mixins: [Base],
  methods: {
    contact() {
      this.$toRouter({ name: "HomeMessage", query: { type: "help" } });
    },
  },
};
</script>

<style lang="scss">
.contact-support {
  .contact-img {
    z-index: 3;
    position: fixed;
    right: 0.25rem;
    bottom: 1.6rem;
    border-radius: 50%;
    background: #fed32a;
    width: 1.1rem;
    height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 25px 5px rgba(#fed32a, 0.5);

    img {
      height: 0.6rem;
      width: 0.6rem;
      //animation: flashImg 1.5s linear infinite;
    }
  }

  @keyframes flashImg {
    0%,
    20%,
    40%,
    100% {
      transform: rotate(20deg);
    }
    10%,
    30% {
      transform: rotate(-20deg);
    }
  }
}
</style>
