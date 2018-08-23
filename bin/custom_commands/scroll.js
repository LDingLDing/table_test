exports.command = function (selector, callback) {
    return this.execute(function(selector) {
        let dom = document.querySelector(selector)
        dom.scrollTop = dom.scrollHeight
        return dom
    }, [selector], function(dom) {
        if (dom) {
            callback && callback({status: 0, msg: 'scroll'})
        } else {
            callback && callback({status: -1, msg: 'cannot find ' + selector})
        }
    })
}
  