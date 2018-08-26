exports.assertion = function (colDatas, colName, alignType) {
	this.message = '验证【' + colName + '】列的对齐方式----'
	this.expected = function () { }
	this.pass = function (data) {
		let checkFlag = true
		let checkText = {
			failAlign: []
		};
		let alignText = {
			"right": "右对齐",
			"left": "左对齐",
			"center": "居中对齐"
		}
		for (let i in data.aligns) {
			i = Number(i)
			let align = data.aligns[i]
			let currentAlign = false // 是否在对齐方式数组中找到正确的对齐方式

			for (let j in align) {
				if (align[j] == alignType) {
					currentAlign = true
				}
			}
			if (!currentAlign) {
				checkFlag = false
				checkText.failAlign.push(i + 1)
			}
		}
		if (checkFlag) {
			this.message += '验证通过！'
			return true
		} else {
			this.message += '验证出错！错误位置：\n'
			if (checkText.failAlign.length > 0) {
				this.message += '第' + checkText.failAlign.join('、') + '行的对齐方式不是' + alignText[alignType] + '；\n'
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
	}
}