exports.assertion = function (selector, html) {
    this.message = 'Testing if element <' + selector + '> has HTML: ' + html
    this.expected = html
    this.value = function (res) {
      return res.value
    }
    this.pass = function () {
      return true
    }
    this.command = function() {
      return this;
    };
  }