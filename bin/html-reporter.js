const path = require('path')
const HtmlReporter = require('nightwatch-html-reporter');
let reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: path.resolve(__dirname, '../reports/')
});
 
module.exports = {
  write : function(results, options, done) {
    reporter.fn(results, done);
  }
}
