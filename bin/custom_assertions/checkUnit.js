exports.assertion = function (colDatas, colName, unit) {
  this.message = '验证【'+colName+'】列的单位----'
  this.expected = function () {}
  this.pass = function (data) {
    let checkFlag = [];
    for (let i in data.texts) {
      i = Number(i)
      let text = data.texts[i]
      if (isNaN(parseFloat(text))) {
      }
      if (Math.abs(parseFloat(text)) > 10000) {
        checkFlag.push('第'+(i+1)+'行缺少单位：万或亿；\n')
      }
      if (unit != 'true' || unit != true) {
        if (text.indexOf(unit) < 0 && parseFloat(text) != 0) {
          checkFlag.push('第'+(i+1)+'行缺少单位：'+unit+'；\n')
        }
      }
    }
    if (checkFlag.length === 0){
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
    //   let text = dom.innerText.trim().replace(/\n/g, '')
    //   return text
    // }, [selector], function (data) {
    //   cb.call(self, data)
    // })
  }
}