const path = require('path')
const HtmlReporter = require('nightwatch-html-reporter');
//!@llh nightwatch-html-reporter customTheme must be relative, because it's begin progress.pwd()
let customThemePath = path.resolve(__dirname, './themes/default/index.pug').replace(process.cwd(), '')
let reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: path.resolve(__dirname, '../../reports/'),
  customTheme: 'bin/reporter/themes/default/index.pug'
});
 
module.exports = {
  write : function(results, options, done) {
    reporter.fn(results, done);
  }
}
