exports.assertion = function (arr, c, data) {
	this.message = '第' + (+c+1) + '列['+ data[c].name +']数据都存在'
	this.expected = function () {}
	this.pass = function () {

        if (!arr.length) {
            return true
        } else if (arr.length === data[c].data.length) {
            this.message = '第' + (+c+1) + '列['+ data[c].name +']数据全空'
            return false
        } else {
            this.message = '第' + (+c+1) + '列['+ data[c].name +']中以下几行数据为空 -> [' + arr.join(',') + ']'
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