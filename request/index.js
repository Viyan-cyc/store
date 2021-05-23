const basicUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

const request = function (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: basicUrl + params.url,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export { request };
