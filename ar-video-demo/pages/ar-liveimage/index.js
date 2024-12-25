var sceneReadyBehavior = require("../../utils/scene-ready");
Page({
  behaviors: [sceneReadyBehavior],
  data: {
    xrTitle: "会动的图片",
    xrDesc:"相机对着指定图片即可触发虚拟内容，赋予图片更多信息和效果，快来试试吧!",
    markerImg:
      "https://ar-scene-source.nosdn.127.net/39f4b36bd0156edc8800eb4f79962b2a.png",
    videoUrl:
      "https://ar-scene-source.nosdn.127.net/b7d1be02ffc25182e877b7507b18ce11.mp4",
  },
});
