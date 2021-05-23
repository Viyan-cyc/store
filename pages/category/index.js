import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧商品
    rightContent: [],
    // 当前选中的菜单
    currentIndex: 0,
    // 右侧滚动条距离顶部距离
    scrollTop: 0,
  },

  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 没有旧数据，发送请求
    // {time: Date.now(), data: json}
    // 有旧数据，且没过期，使用旧数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map((cate) => cate.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({ leftMenuList, rightContent });
      }
    }
  },

  getCates() {
    request({
      url: "/categories",
    }).then((res) => {
      this.Cates = res.data.message;
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      let leftMenuList = this.Cates.map((cate) => cate.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({ leftMenuList, rightContent });
    });
  },

  // 左侧菜单点击事件
  handleTapItem(e) {
    let { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({ currentIndex: index, rightContent, scrollTop: 0 });
  },
});
