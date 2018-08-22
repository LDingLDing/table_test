exports.assertion = function (colDatas, colName) {
  this.message = '验证【' + colName + '】列的颜色----'
  this.expected = function () {}
  this.pass = function (data) {
    let checkFlag = [];
    for (let i in data.colors) {
      i = Number(i)
      let rgb = data.colors[i]
      let text = parseFloat(data.texts[i])
      let currentColor = false
      if (text > 0) {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0] > 128 && color[1] < 128 && color[2] < 128 && Math.abs(color[1] - color[2]) < 100) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag.push('第' + (i + 1) + '行不是红色；\n')
        }
      } else if (text < 0) {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0] < 128 && color[1] > 128 && color[2] < 128 && Math.abs(color[0] - color[2]) < 100) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag.push('第' + (i + 1) + '行不是绿色；\n')
        }
      } else {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0].trim() == color[1].trim() && color[1].trim() == color[2].trim()) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag.push('第' + (i + 1) + '行不是默认色；\n')
        }
      }
    }
    if (checkFlag.length === 0) {
      this.message += '验证通过！'
      return true
    } else {
      this.message += '验证出错！错误位置：' + checkFlag.join(',')
      return false
    }
  }
  this.value = function (data) {
    return data
  }
  this.command = function (cb) {
    var self = this
    return this.api.perform(function () {
      cb.call(self, colDatas)
    })

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