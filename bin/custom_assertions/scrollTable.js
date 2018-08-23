exports.assertion = function (selector, ops, callback) {
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
        // ops = ops || {}
        // ops.time = ops.time || 1000

        let run = function () {
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
                        self.message += '：无法找到节点 ' + selector
                        cb.call(self, false)
                        break
                    case 1:
                        self.message += '：此节点没有滚动条，请检查是否节点错误 或者 数据量过少'
                        cb.call(self, false)
                        break
                    default:
                        // cb.call(self, true) // todo
                }
            })
            self.api.pause(200)
            // self.api.execute(function (tbody_dom) {
            //     let tr = document.querySelector(tbody_dom + 'tr')
            //     return tr.length
            // }, [ops.tbody_dom], function(obj) {
            //     if (obj.status === -1) {
            //         cb.call(self, false)
            //         return
            //     }

            //     console.log(obj)
            //     cb.call(self, true)

            // })

            return self.api.perform(function () {
                cb.call(self, true)
            })

            // return output
        }


        return run()
	}
}