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
    if (!op) {
      findTable(browser)
      return
    }
    
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
  Util.statusLog('开始进行表格数据处理')
  getTableElements(browser, (data) => {
    console.log(999)
    Cel.initData(data)
  })

  // Empty.data = []


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

/*
 * 返回table封装后的节点坐标
 * 数据格式：
 * {
 *   '列名'： {
 *     thead: x,
 *     tbody: ['x,y', 'x,y' ...]
 *   },
 * }
 */
function getTableElements (browser, callback) {
  // 确定thead内使用的是th还是td
  checkTheadChildTag(browser, app['table_dom']['thead_dom'], function (theadChildTag) {
    browser.execute(function (app, theadChildTag) {
      let element = {}
      let theadDom = document.querySelectorAll(app['table_dom']['thead_dom'] + ' ' + theadChildTag)
      let tbodyDom = document.querySelectorAll(app['table_dom']['tbody_dom'] + ' tr')
      let theadName = [] // 用于存放表格的标题，与app['table_cell']的key值对应
      for (let i = 0; i < theadDom.length; i++) {
        let colName = theadDom[i].innerText
        theadName.push(colName)
        if (!element[colName]) {
          element[colName] = {
            thead: i
          }
        }
      }
      for (let i = 0; i < tbodyDom.length; i++) {
        for (let j = 0; j < tbodyDom[i].children.length; j++) {
          let colName = theadName[j]
          if (!element[colName].tbody) {
            element[colName].tbody = []
          }
          element[colName].tbody.push(i + ',' + j)
        }
      }
      return element
    }, [app, theadChildTag], function (data) {
      Util.successLog('封装后的表格对象为：')
      console.log(data.value)
      callback(data.value)
    })
  })
}

// 用于判断thead的子节点是th还是td
function checkTheadChildTag (browser, Thead, callback) {
  let [td, th] = [0, 0]
  let tag = ''
  browser.element('css selector', Thead + ' td', function (res) {
    td = 1
    if (res.status == 0) {
      tag = 'td'
    }
    call()
  })
  browser.element('css selector', Thead + ' th', function (res) {
    th = 1
    if (res.status == 0) {
      tag = 'th'
    }
    call()
  })
  function call () {
    if (td && tag != '') {
      Util.successLog('thead的子节点标签是td')
      callback(tag)
    } else if (th && tag != '') {
      Util.successLog('thead的子节点标签是th')
      callback(tag)
    } else if (td && th) {
      Util.errorLog('thead中没有th和td!')
    }
  }
}


function end (browser) {
  browser.end()
}


let obj = {
  '获取表格': openUrl
}
app['table_empty'] && (obj['空验证'] = Empty.doTest)
app['table_cell'] && (obj['单元格验证'] = Cel.doTest)

obj['关闭'] = end
module.exports = obj