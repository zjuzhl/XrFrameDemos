
// 相机授权
export const authCamera = (successCallback, failCallback) => {
  wx.getSetting({
      success(res) {
          if (!res.authSetting['scope.camera']) {
              wx.authorize({
                  scope: 'scope.camera',
                  success() {
                      successCallback && successCallback();
                  },
                  fail() {
                      wx.showModal({
                          title: '提示',
                          content: '为了获得更好的体验，请先授权开启摄像头权限!',
                          confirmText: '去开启',
                          success(res) {
                              if (res.confirm) {
                                  wx.openSetting({
                                      success() {
                                          console.log('打开权限设置成功');
                                          successCallback && successCallback();
                                      },
                                      fail(){
                                        failCallback && failCallback();
                                      }
                                  });
                              } else if (res.cancel) {
                                  console.log('用户点击取消');
                                  failCallback && failCallback();
                              }
                          },
                      });
                  },
              });
          } else {
              successCallback && successCallback();
          }
      },
  });
};