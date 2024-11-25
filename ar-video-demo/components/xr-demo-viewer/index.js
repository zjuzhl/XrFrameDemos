Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
  },
  data: {
  },
  lifetimes: {
    attached() {
      wx.xrTitle = this.data.title;
    }
  },
  methods: {

  },
  options: {
    multipleSlots: true
  }
})