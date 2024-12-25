var sceneReadyBehavior = require("../../utils/scene-ready");
Page({
  behaviors: [sceneReadyBehavior],
  data: {
    xrTitle: "会动的图片",
    xrDesc:
      "相机对着指定图片即可触发虚拟内容，赋予图片更多信息和效果，快来试试吧!",
  },
});
