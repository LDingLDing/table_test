exports.assertion = function (selector) {
  this.message = 'Expected element <' + selector + '> has color: '
  this.expected = function () {}
  this.pass = function (data) {
    let text = parseFloat(data.text)
    let rgb = data.rgb
    if (text > 0) {
      this.message += 'red'
    } else if (text < 0) {
      this.message += 'green'
    } else {
      this.message += 'default'
    }
    return true
  }
  this.value = function (data) {
    return data.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
      let dom = document.querySelector(selector)
      let rgb = []
      if (dom.childElementCount == 0) {
        rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
      } else {
        rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
        for (let i = 0; i < dom.childElementCount; i++) {
          rgb.push(document.defaultView.getComputedStyle(dom.children[i], null).color.replace("rgb(", "").replace(")", ""))
        }
      }
      let text = dom.innerText
      return {
        rgb,
        text
      }
    }, [selector], function (data) {
      cb.call(self, data)
    })
  }
}