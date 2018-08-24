exports.assertion = function (colDatas, colName, unit) {
  this.message = '验证【' + colName + '】列的单位----'
  this.expected = function () {}
  this.pass = function (data) {
    let checkFlag = true
    let checkText = {
      failDefault: [],
      failUnit: []
    };
    for (let i in data.texts) {
      i = Number(i)
      let text = data.texts[i]
      if (isNaN(parseFloat(text))) {}
      if (Math.abs(parseFloat(text)) > 10000) {
        checkFlag = false
        checkText.failDefault.push(i + 1)
      }
      if (unit != 'true' && unit != true) {
        if (text.indexOf(unit) < 0 && parseFloat(text) != 0) {
          checkFlag = false
          checkText.failUnit.push(i + 1)
        }
      }
    }
    if (checkFlag) {
      this.message += '验证通过！'
      return true
    } else {
      this.message += '验证出错！错误位置：'
      if (checkText.failDefault.length > 0) {
        this.message += '第' + checkText.failDefault.join('、') + '行缺少单位：万或亿；\n'
      }
      if (checkText.failUnit.length > 0) {
        this.message += '第' + checkText.failUnit.join('、') + '行缺少单位：' + unit + '；\n'
      }
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
    //   let text = dom.innerText.trim().replace(/\n/g, '')
    //   return text
    // }, [selector], function (data) {
    //   cb.call(self, data)
    // })
  }
}