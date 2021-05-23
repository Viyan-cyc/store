//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    // 轮播图列表数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数组
    floorList: [],
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      this.setData({ swiperList: res.data.message });
    });
  },

  getCatesList() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({ catesList: res.data.message });
    });
  },

  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      this.setData({ floorList: res.data.message });
    });
  },
});
