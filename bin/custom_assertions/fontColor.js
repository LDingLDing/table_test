exports.assertion = function (colDatas, colName) {
  this.message = '验证【'+colName+'】列的颜色----'
  this.expected = function () {}
  this.pass = function (data) {
    let checkFlag = [];
    for (let i in data.colors) {
      let rgb = data.colors[i]
      let text = parseFloat(data.texts[i])
      if (text > 0) {
        // this.message += 'red'
      } else if (text < 0) {
        // this.message += 'green'
      } else {
        // this.message += 'default'
      }
    }
    if (checkFlag.length === 0){
      this.message += '验证通过！'
      return true
    } else {
      this.message += '验证出错！错误位置：第' + checkFlag.join(',') + '行'
      return false
    }
  }
  this.value = function (data) {
    return data
  }
  this.command = function (cb) {
    var self = this
    cb.call(self, colDatas)

    // return this.api.execute(function (selector) {
    //   let dom = document.querySelector(selector)
    //   let rgb = []
    //   if (dom.childElementCount == 0) {
    //     rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
    //   } else {
    //     rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
    //     for (let i = 0; i < dom.childElementCount; i++) {
    //       rgb.push(document.defaultView.getComputedStyle(dom.children[i], null).color.replace("rgb(", "").replace(")", ""))
    //     }
    //   }
    //   let text = dom.innerText
    //   return {
    //     rgb,
    //     text
    //   }
    // }, [selector], function (data) {
    //   cb.call(self, data)
    // })
  }
}