const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))
const Util = require(path.resolve(__dirname, '../util'))

const Empty = require('./empty')
let tableElements = void 0

function initData(data) {
  tableElements = data
}

function doTest(browser) {
  console.log('---------------------------------1------------------------------')
  for (let colName in tableElements) {
    if (!app['table_cell'][colName]) {
      continue
    }
    Util.statusLog('开始验证表格【' + colName + '】列：');
    for (let axis of tableElements[colName].tbody) {
      let [x, y] = axis.split(',')
      x++;
      y++;
      let dom = app['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')'
      browser.execute(function (selector) {
        let dom = document.querySelector(selector)
        let text = dom.innerText.trim().replace(/\n/g, '')
        return text
      }, [dom], function (data) {
        let text = data.status === 0 ? data.value : ''
        checkData(browser, colName, dom, text)
      })
    }
    if (app['table_cell'][colName]['sort']) {
      let colIndex = parseInt(tableElements[colName].tbody[0].split(',')[1])
      browser.click(app['table_dom']['thead_dom'] + ' ' + tableElements[colName].thead.tag + ':nth-child(' + (colIndex + 1) + ')', function (response) {
          console.log(response)
        })
        .pause(app['table_cell'][colName]['sort']['wait_time'] || 500)
        .verify.checkSort(app['table_dom']['tbody_dom'], colIndex, colName)
    }
  }
}

function checkData(browser, colName, dom, text) {
  if (Empty.isEmpty(text)) {
    return
  }
  if (app['table_cell'][colName]['fixed']) {
    browser.expect.element(dom).text.to.match(/\d+(\.\d{2})(\D*)$/)
  }
  if (app['table_cell'][colName]['color']) {
    browser.verify.fontColor(dom)
  }
  if (app['table_cell'][colName]['unit']) {
    browser.verify.checkUnit(dom, app['table_cell'][colName]['unit'])
  }
}

module.exports = {
  initData: initData,
  doTest: doTest
}