export default Behavior({
  created: function () {
    this.checkInitShare();
  },
  methods: {
    checkInitShare() {
      wx.xrScene = undefined;

      if (!this.scene) {
        setTimeout(() => {
          this.checkInitShare();
        }, 100);
        return;
      }

      if (!this.scene.share.supported) {
        console.warn("Not support xr-frame share system now!");
        return;
      }
      wx.xrScene = this.scene;
    },
  },
});
