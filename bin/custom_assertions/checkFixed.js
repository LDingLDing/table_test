exports.assertion = function (colDatas, colName, fixed = 2) {
	this.message = '验证【' + colName + '】列的保留小数----'
	this.expected = function () {}
	this.pass = function (data) {
		let checkFlag = true
		let checkText = {
			failFixed: []
		};
		// var reg = new RegExp('\\d+(\\\.\\d{' + fixed + '})(\\D*)$')
		for (let i in data.texts) {
			i = Number(i)
			let text = data.texts[i]
			if (!text.match(/\d+(\.\d{2})(\D*)$/).length) {
				checkFlag = false
				checkText.failFixed.push(i + 1)
			}
		}
		if (checkText) {
			this.message += '验证通过！'
			return true
		} else {
			this.message += '验证出错！错误位置：第' + checkText.failFixed.join('、') + '行没有保留' + fixed + '位小数；\n'
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
	}
}