<template>
  <div style="z-index: -1; opacity: 0; position: fixed">
    <div
      id="zalo-share-btn"
      class="zalo-share-button"
      :data-href="zaloShareUrl"
      data-oaid="579745863508352884"
      data-layout="2"
      data-color="blue"
      data-customize="false"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      zaloShareUrl: "",
    };
  },
  mounted() {
    this.$bus.on("zaloShare", this.startShare);
  },
  beforeDestroy() {
    this.$bus.off("zaloShare");
  },
  methods: {
    startShare(url) {
      this.zaloShareUrl = url;
      setTimeout(() => {
        let el = document.getElementById("zalo-share-btn");
        if (el) {
          el.click();
        }
      }, 200);
    },
  },
};
</script>
