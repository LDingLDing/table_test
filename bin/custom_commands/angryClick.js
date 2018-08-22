exports.command = function angryClick(selector, callback) {
  var self = this;
  return this.click(selector, function(result) {
    if (result.status == 0) {
      if (typeof callback === 'function') {
        callback.call(self, result);
      }
    }
    else {
      // click failed
      // console.log('element not clickable; trying to dismiss lightboxes');
      this.execute(function(selector) {
        let dom = document.querySelector(selector)
        if (dom && dom.click) {
          dom.click()
          return
        }
      }, [selector], function() {
        callback && callback({status: 0, msg: 'angryClick'})
      });
    }
  });

};