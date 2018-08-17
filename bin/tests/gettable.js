const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))
const Util = require(path.resolve(__dirname, '../util'))

const Cel = require('./cel')
const Empty = require('./empty')

function openUrl(browser) {
  browser
    .url(app.url)
    .waitForElementVisible('body')

  if (app.before) {
    beforeFindTable(browser)
  } else {
  	findTable(browser)
  }
};

function beforeFindTable(browser) {
  const ops = app['before']

  let action = function (i) {
    const op = ops[i]
    if (!op) return
    
    browser
      .waitForElementVisible(op.dom)
    browser[op.event](op.dom)
    
    if (op['wait_dom']) {
      browser
        .waitForElementVisible(op['wait_dom'], op['wait_time'])
    } else if (op['wait_time']) {
      browser
        .timeoutsImplicitWait(op['wait_time'])
    }

    action(++i)
  }
  action (0)
}

function findTable(browser) {
  // TODO 将节点都存储下来
  // TODO 对数据进行处理分发
  

  Cel.data = []
  Empty.data = []


	// const $thead = browser
 //    .waitForElementVisible(app['table_dom']['thead_dom'])
 //    .element('css selector', app['table_dom']['thead_dom'])

 //  const $tbody = browser
 //    .waitForElementVisible(app['table_dom']['tbody_dom'])
 //    .element('css selector', app['table_dom']['tbody_dom'])

 //    browser.execute(function(data) {
 //       return '123';
 //    }, [], data => {
 //      console.log(data)
 //    });
}

function end (browser) {
  // browser.end()
}


let obj = {
  '获取表格': openUrl
}
app['table_empty'] && (obj['空验证'] = Empty.doTest)
app['table_cell'] && (obj['单元格验证'] = Cel.doTest)

obj['关闭'] = end
module.exports = obj