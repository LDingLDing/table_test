exports.assertion = function (colDatas, colName, fixed=2) {
    this.message = '验证【'+colName+'】列的保留小数----'
    this.expected = function () {}
    this.pass = function (data) {
      let checkFlag = [];
      for (let i in data.texts) {
        let text = data.texts[i]
        if (!text.match(/\d+(\.\d{2})(\D*)$/).length) {
            checkFlag.push('第'+(i+1)+'行没有保留2位小数；')
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
      cb.call(self, colDatas)
    }
  }