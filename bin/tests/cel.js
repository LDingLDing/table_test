const path = require('path')
const Util = require(path.resolve(__dirname, '../util'))
const Empty = require('./empty')

let app
let tableElements

function initData(data) {
  tableElements = data
}

function initApp(value) {
  app = value
}

function doTest(browser) {
  browser.execute(function (tbodyDom, tableElements, app) {
    let tableData = []
    let trs = document.querySelectorAll(tbodyDom + ' tr')
    for (let col in tableElements) {
      let colName = tableElements[col].thead.text
      let colIndex = parseInt(tableElements[col].thead.index)
      let theadTag = tableElements[col].thead.tag
      if (!app['table_cell'][colName]) {
        continue
      }
      // 获取每列的数据
      let colData = {
        colors: [],
        texts: []
      }
      for (let i = 0; i < trs.length; i++) {
        let dom = trs[i].children[colIndex]

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
      tableData.push({
        thead: {
          colIndex: colIndex,
          colName: colName,
          theadTag: theadTag
        },
        colData: colData
      })
    }

    return tableData
  }, [app['table_dom']['tbody_dom'], tableElements, app], function (data) {
    if (data.status != 0) {
      return
    }
    for (let i in data.value) {
      let colName = data.value[i].thead.colName
      let colIndex = data.value[i].thead.colIndex
      let theadTag = data.value[i].thead.theadTag
      let colData = data.value[i].colData
      if (app['table_cell'][colName]['fixed'] && app['table_cell'][colName]['color'] != "false") {
        browser.verify.checkFixed(colData, colName, app['table_cell'][colName]['fixed'])
      }
      if (app['table_cell'][colName]['color'] && app['table_cell'][colName]['color'] != "false") {
        if (app['table_cell'][colName]['color']['fixedColor']) {
          // 列的颜色是固定的
          browser.verify.fontColor(colData, colName, app['table_cell'][colName]['color'])
        } else if (app['table_cell'][colName]['color']['associatedColor']) {
          // 列的颜色是和其他列的数据关联的
          let assoName = app['table_cell'][colName]['color']['associatedColor']
          let associatedData = void 0
          for (let val of data.value) {
            if (val.thead.colName == assoName) {
              associatedData = val.colData
            }
          }
          browser.verify.fontColor(colData, colName, app['table_cell'][colName]['color'], associatedData)
        } else {
          // 默认判断
          browser.verify.fontColor(colData, colName, app['table_cell'][colName]['color'])
        }
      }
      if (app['table_cell'][colName]['unit'] && app['table_cell'][colName]['unit'] != "false") {
        browser.verify.checkUnit(colData, colName, app['table_cell'][colName]['unit'])
      }
      if (app['table_cell'][colName]['sort'] && app['table_cell'][colName]['sort'] != "false") {
        let theadDom = app['table_dom']['thead_dom'] + ' ' + theadTag + ':nth-child(' + (colIndex + 1) + ')'
        browser
          .angryClick(theadDom, function (response) {
            if (response.status == 0) {
              Util.statusLog('点击【' + colName + '】表头进行排序')
            } else
            if (response.status == 13) {
              Util.errorLog('设置的表头节点不是一个可点击的节点!')
            }
          })
          .pause(app['table_cell'][colName]['sort']['wait_time'] || 500)
          .verify.checkSort(app['table_dom']['tbody_dom'], colIndex, colName)
          .angryClick(theadDom, function (response) {
            if (response.status == 0) {
              Util.statusLog('再次点击【' + colName + '】表头进行排序')
            } else
            if (response.status == 13) {
              Util.errorLog('设置的表头节点不是一个可点击的节点!')
            }
          })
          .pause(app['table_cell'][colName]['sort']['wait_time'] || 500)
          .verify.checkSort(app['table_dom']['tbody_dom'], colIndex, colName)
      }
    }
  })
}

module.exports = {
  initData: initData,
  initApp: initApp,
  doTest: doTest
}