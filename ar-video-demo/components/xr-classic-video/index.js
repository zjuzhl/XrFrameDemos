Component({
  behaviors: [require("../common/share-behavior").default],
  properties: {
    marker_img: {
      type: String,
      value: "",
    },
    video_url: {
      type: String,
      value: "",
    },
  },
  data: {
    loaded: false,
    arReady: false,

    plane_height: 0.6,
    mesh_position: "0 0 0",
    mesh_scale_w: 1,
    mesh_scale_h: 1,
  },
  lifetimes: {
    async attached() {
      console.log("data", this.data);
    },
  },
  observers: {
    video_url(newVal) {
      console.log("video_url", newVal);
      this.releaseVideo();
      this.loadVideo(newVal);
    },
    marker_img(newVal) {
      wx.getImageInfo({
        src: newVal,
        success: (res) => {
          const plane_height = res.height / res.width;
          console.log("plane_height", plane_height);
          this.setData({ plane_height });
        },
      });
    },
  },
  methods: {
    handleReady: function ({ detail }) {
      const xrScene = (this.scene = detail.value);
      console.log("xr-scene", xrScene);
    },
    handleTrackerSwitch: function ({ detail }) {
      const active = detail.value;
      console.log("handleTrackerSwitch", detail);
      const video = this.scene.assets.getAsset("video-texture", "video1");
      if (active) {
        video.play();
      } else {
        video.stop();
      }
    },

    releaseVideo() {
      if (this.scene) {
        console.log("releaseAsset");
        this.scene.assets.releaseAsset("video-texture", "video1");
        this.scene.assets.releaseAsset("material", "video_mat");
      }
    },

    async loadVideo(video_url) {
      if (video_url == "") {
        return;
      }
      const waitForScene = () =>
        new Promise((resolve) => {
          const checkScene = setInterval(() => {
            if (this.scene) {
              clearInterval(checkScene);
              resolve(this.scene);
            }
          }, 100); // 每100毫秒检查一次
        });

      const scene = await waitForScene();
      console.log("loadAsset", video_url);
      const videoTexture = await scene.assets.loadAsset({
        type: "video-texture",
        assetId: `video1`,
        src: video_url,
        options: {
          autoPlay: false,
          loop: true,
          abortAudio: false,
        },
      });
      console.log("videoTexture", videoTexture);
      const videoMat = scene.createMaterial(
        scene.assets.getAsset("effect", "simple"),
        {
          u_baseColorMap: videoTexture.value.texture,
        }
      );
      console.log("videoMat", videoMat);
      scene.assets.addAsset("material", "video_mat", videoMat);
      console.log("video asset loaded");
      this.setData({ loaded: true });
    },
  },
});
