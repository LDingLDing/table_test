exports.assertion = function (selector, unit) {
  this.message = 'Expected element <' + selector + '> has unit: ' + unit + '.'
  this.expected = function () {}
  this.pass = function (value) {
    if (isNaN(parseFloat(value))) {
      this.message += 'But it is not a figure'
      return false
    }
    if (Math.abs(parseFloat(value)) > 10000) {
      this.message += 'But it lacks unit: 万 or 亿.'
      return false
    }
    if (unit != 'true') {
      if (value.indexOf(unit) < 0 && parseFloat(value) != 0) {
        this.message += 'But no unit was found.'
        return false
      }
    }
    this.message += 'check ' + value + ' success!'
    return true
  }
  this.value = function (data) {
    return data.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
      let dom = document.querySelector(selector)
      let text = dom.innerText.trim().replace(/\n/g, '')
      return text
    }, [selector], function (data) {
      cb.call(self, data)
    })
  }
}