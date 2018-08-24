const path = require('path')
const Util = require(path.resolve(__dirname, '../util'))
exports.assertion = function (arr, c, data, colsMap) {
	colsMap = colsMap || {}
	this.message = '第' + (+c+1) + '列['+ data[c].name +']数据都存在'
	this.expected = function () {}
	this.pass = function () {

        if (!arr.length) {
            return true
        } else if (arr.length === data[c].data.length) {
			this.message = '第' + (+c+1) + '列['+ data[c].name +']数据全空(' + arr[0]['text'] + ')'
			// Case 合法的空
			let eStr =  colsMap[data[c].name] && colsMap[data[c].name]['empty']
			if (eStr === true) {
				return Util.isEmpty(arr[0]['text'])
			}
			if (!!eStr) {
				return Util.isEmpty(arr[0]['text'], eStr)
			}
			// Case end
            return false
        } else {
			let idexArr = []
			for (let i in arr) {
				idexArr[i] = arr[i].index
			}
            this.message = '第' + (+c+1) + '列['+ data[c].name +']中以下几行数据为空 -> [' + idexArr.join(',') + ']'
            return false
        }
	}
	this.value = function (data) {
		return data
	}
	this.command = function (cb) {
		var self = this
		return this.api.perform(function () {
			cb.call(self)
		})
	}
}