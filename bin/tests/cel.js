const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))
const Util = require(path.resolve(__dirname, '../util'))

const Empty = require('./empty')
let tableElements = void 0

function initData(data) {
  tableElements = data
}

function doTest(browser) {
  // console.log('---------------------------------1------------------------------')
  for (let colName in tableElements) {
    if (!app['table_cell'][colName]) {
      continue
    }
    // Util.statusLog('开始验证表格【' + colName + '】列：');
    // for (let axis of tableElements[colName].tbody) {
    //   let [x, y] = axis.split(',')
    //   x++;
    //   y++;
    //   let dom = app['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')'
    //   browser.execute(function (selector) {
    //     let dom = document.querySelector(selector)
    //     let text = dom.innerText.trim().replace(/\n/g, '')
    //     return text
    //   }, [dom], function (data) {
    //     let text = data.status === 0 ? data.value : ''
    //     checkData(browser, colName, dom, text)
    //   })
    // }

    // 获取每列的数据
    let colIndex = parseInt(tableElements[colName].tbody[0].split(',')[1])
    browser.execute(function (selector, colIndex) {
      // let colDoms = []
      let colData = {
        colors: [],
        texts: []
      }
      let trs = document.querySelectorAll(selector + ' tr')
      for (let i = 0; i < trs.length; i++) {
        let dom = trs[i].children[colIndex]
        // colDoms.push(dom.children[colIndex])

        let rgb = []
        if (dom.childElementCount == 0) {
          rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
        } else {
          rgb.push(document.defaultView.getComputedStyle(dom, null).color.replace("rgb(", "").replace(")", ""))
          for (let i = 0; i < dom.childElementCount; i++) {
            rgb.push(document.defaultView.getComputedStyle(dom.children[i], null).color.replace("rgb(", "").replace(")", ""))
          }
        }
        colData.colors.push(rgb)

        let text = dom.innerText.trim().replace(/\n/g, '')
        colData.texts.push(text)
      }
      return colData
    }, [app['table_dom']['tbody_dom'], colIndex], function (data) {
      // fs.writeFile('bin/tmp/cel.json', JSON.stringify(data))
      if (data.status != 0) {
        return
      }
      let colData = data.value
      if (app['table_cell'][colName]['fixed'] && app['table_cell'][colName]['color'] != "false") {
        browser.verify.checkFixed(colData, colName)
      }
      if (app['table_cell'][colName]['color'] && app['table_cell'][colName]['color'] != "false") {
        browser.verify.fontColor(colData, colName)
      }
      if (app['table_cell'][colName]['unit']) {
        browser.verify.checkUnit(colData, colName, app['table_cell'][colName]['unit'])
      }
      if (app['table_cell'][colName]['sort']) {
        let theadDom = app['table_dom']['thead_dom'] + ' ' + tableElements[colName].thead.tag + ':nth-child(' + (colIndex + 1) + ')'
        browser
          .angryClick(theadDom, function (response) {
            if (response.status == 0) {
              Util.statusLog('点击【' + colName + '】表头进行排序')
            } else
            if (response.status == 13) {
              Util.errorLog('设置的表头节点不是一个可点击的节点')
            }
          })
          .pause(app['table_cell'][colName]['sort']['wait_time'] || 500)
          .verify.checkSort(app['table_dom']['tbody_dom'], colIndex, colName)
          .angryClick(theadDom, function (response) {
            if (response.status == 0) {
              Util.statusLog('再次点击【' + colName + '】表头进行排序')
            } else
            if (response.status == 13) {
              Util.errorLog('设置的表头节点不是一个可点击的节点')
            }
          })
          .pause(app['table_cell'][colName]['sort']['wait_time'] || 500)
          .verify.checkSort(app['table_dom']['tbody_dom'], colIndex, colName)
      }
    })

  }
}

module.exports = {
  initData: initData,
  doTest: doTest
}