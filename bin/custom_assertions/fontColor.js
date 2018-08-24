exports.assertion = function (colDatas, colName, colorType, associatedData) {
  this.message = '验证【' + colName + '】列的颜色----'
  this.expected = function () {}
  this.pass = function (data) {
    let checkFlag = true
    let checkText = {
      failFixed: [],
      failRed: [],
      failGreen: [],
      failDefault: []
    };
    for (let i in data.colors) {
      i = Number(i)
      let rgb = data.colors[i]
      let currentColor = false // 是否在颜色数组中找到正确的颜色

      // 列的颜色是固定的
      if (colorType['fixedColor']) {
        let targetColor = getRGB(colorType['fixedColor'])
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0] == targetColor.r && color[1] == targetColor.g && color[2] == targetColor.b) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag = false
          checkText.failFixed.push(i + 1)
        }
        continue
      }
      // 判断数值是否大于0
      let text = parseFloat(data.texts[i])
      if (colorType['associatedColor']) {
        text = parseFloat(associatedData.texts[i])
      }
      if (text > 0) {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0] > 128 && color[1] < 128 && color[2] < 128 && Math.abs(color[1] - color[2]) < 100) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag = false
          checkText.failRed.push(i + 1)
        }
      } else if (text < 0) {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0] < 128 && color[1] > 128 && color[2] < 128 && Math.abs(color[0] - color[2]) < 100) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag = false
          checkText.failGreen.push(i + 1)
        }
      } else {
        for (let j in rgb) {
          let color = rgb[j].split(',')
          if (color[0].trim() == color[1].trim() && color[1].trim() == color[2].trim()) {
            currentColor = true
          }
        }
        if (!currentColor) {
          checkFlag = false
          checkText.failDefault.push(i + 1)
        }
      }
    }
    if (checkFlag) {
      this.message += '验证通过！'
      return true
    } else {
      this.message += '验证出错！错误位置：\n'
      if (checkText.failFixed.length > 0) {
        this.message += '第' + checkText.failFixed.join('、') + '行的颜色不是' + colorType['fixedColor'] + '；\n'
      }
      if (checkText.failRed.length > 0) {
        this.message += '第' + checkText.failRed.join('、') + '行的颜色不是红色；\n'
      }
      if (checkText.failGreen.length > 0) {
        this.message += '第' + checkText.failGreen.join('、') + '行的颜色不是绿色；\n'
      }
      if (checkText.failDefault.length > 0) {
        this.message += '第' + checkText.failDefault.join('、') + '行的颜色不是默认色；\n'
      }
      return false
    }


    function getRGB(color) {
      if (color.indexOf('#') == -1) {
        let rgbArr = color.replace('rgb(', '').replace(')', '').split(',')
        return {
          r: rgbArr[0].trim(),
          g: rgbArr[1].trim(),
          b: rgbArr[2].trim()
        }
      }
      var t = {},
        bits = (color.length == 4) ? 4 : 8,
        mask = (1 << bits) - 1;
      color = Number("0x" + color.substr(1));
      if (isNaN(color)) {
        return null;
      }
      ["b", "g", "r"].forEach(function (x) {
        var c = color & mask;
        color >>= bits;
        t[x] = bits == 4 ? 17 * c : c;
      });
      t.a = 1;
      return t;
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