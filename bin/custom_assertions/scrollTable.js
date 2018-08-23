exports.assertion = function (selector, ops, callback) {
    const message = '执行表格纵向滚动'
	this.message = '执行表格纵向滚动'
	this.expected = function () {}
	this.pass = function (isOk) {
        return !!isOk
	}
	this.value = function (data) {
		return data
	}
	this.command = function (cb) {
        const self = this
        const startTime = +new Date()
        const uTime = 200
        const tbody_dom = ops.tbody_dom
        ops.time = ops.time || 1000

        let run = function (count) {
            self.api.execute(function (selector) {
                let dom = document.querySelector(selector)
                if (!dom) {
                    return -1
                }
                if (dom.scrollHeight === dom.offsetHeight) {
                    return 1
                }
                dom.scrollTop = dom.scrollHeight
                return 0
            }, [selector], function (obj){
                if (obj.status === -1) {
                    cb.call(self, false)
                    return
                }
                switch(obj.value) {
                    case -1: 
                        self.message = message + '：无法找到节点 ' + selector
                        return self.api.perform(function () {
                            cb.call(self, false)
                        })
                        break
                    case 1:
                        self.message = message + '：此节点没有滚动条，请检查是否节点错误 或者 数据量过少'
                        return self.api.perform(function () {
                            cb.call(self, false)
                        })
                        break
                    default:
                        self.message = message + '：第' + count + '次'
                        cb.call(self, true)
                }
            })
            self.api.pause(200)
            self.api.execute(function (tbody_dom) {
                let tr = document.querySelectorAll(tbody_dom + ' tr')
                return tr && tr.length
            }, [ops.tbody_dom], function(obj) {
                if (obj.status === -1) {
                    return
                }

                let isEnd = false
                if (Number(ops.wait_length) && obj.value >= Number(ops.wait_length)) {
                    isEnd = true
                }
                if (+new Date() - startTime >= ops.time) {
                    isEnd = true
                }

                if (isEnd) {
                    return self.api.perform(function () {
                        self.message = message + '：共' + obj.value + '条数据'
                        cb.call(self, true)
                    })
                } else {
                    return run(count + 1)
                }
            })
        }

        return run(1)
	}
}