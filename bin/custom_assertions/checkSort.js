const Empty = require('../tests/empty')
exports.assertion = function (selector, colIndex, colName) {
  this.message = '验证【' + colName + '】列的排序----'
  this.expected = function () {}
  this.pass = function (data) {
    let isSorted = true
    let isBeginEmpty = false
    let preData = void 0
    let sort = void 0 // sort=1表示降序，=-1表示升序
    function realData (data) {
      let base = 1
      if (data.indexOf('万') != -1) {
        base *= 10000
      }
      if (data.indexOf('亿') != -1) {
        base *= 100000000
      }
      return parseFloat(data)*base
    }
    for (let i in data) {
      let val = data[i]
      i = Number(i)
      // 出现第一个空值后，后面应该出现的全为空值
      if (isBeginEmpty) {
        if (!Empty.isEmpty(val)) {
          this.message += '\n出现错误：\n错误位置: 第' + (i + 1) + '行\n错误原因: 前一项数据已经为空数据，之后的数据应该全为空！'
          return false
        }
        continue
      }
      // 判断当前数据是否为空
      if (Empty.isEmpty(val)) {
        isBeginEmpty = true
        continue
      }
      // 判断当前数据是否为非数字
      if (isNaN(parseFloat(val))) {
        this.message += '\n出现错误：\n错误位置: 第' + (i + 1) + '行\n错误原因: 出现非数字数据，无法进行大小比较！'
        return false
      }
      // 判断是否是表格中的第一个数据
      if (preData === undefined) {
        preData = realData(val)
        continue
      }
      // 根据两个数据的大小确定该列数据是升序还是降序
      if (sort === undefined) {
        if (preData != realData(val)) {
          sort = (preData - realData(val) > 0 ? 1 : -1)
        } else {
          preData = realData(val)
          continue
        }
      }
      if (sort > 0) {
        if (preData - realData(val) < 0) {
          this.message += '\n出现错误：\n错误位置: 第' + (i + 1) + '行\n错误原因: 该列应该是降序，但是第' + (i + 1) + '行的数据('+realData(val)+')比第' + i + '行的数据('+preData+')大！'
          return false
        }
      } else if (sort < 0) {
        if (preData - realData(val) > 0) {
          this.message += '\n出现错误：\n错误位置: 第' + (i + 1) + '行\n错误原因: 该列应该是升序，但是第' + (i + 1) + '行的数据('+realData(val)+')比第' + i + '行的数据('+preData+')小！'
          return false
        }
      }
      preData = realData(val)
    }
    this.message += ' 验证成功！'
    return true
  }
  this.value = function (data) {
    return data.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector, colIndex) {
      let colData = []
      for (let i = 0; i < document.querySelectorAll(selector + ' tr').length; i++) {
        let val = document.querySelectorAll(selector + ' tr')[i]
        colData.push(val.children[colIndex].innerText)
      }
      return colData
    }, [selector, colIndex], function (data) {
      cb.call(self, data)
    })
  }
}