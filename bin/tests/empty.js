const path = require('path')
const fs = require('fs')
const Util = require(path.resolve(__dirname, '../util'))
let app
let data
let colsMap = {} // name -> colsData
let doTest = {
	'空值检查:是否有数据': checkTbody,
	'空值检查：为空单元格': checkCel
}

// TODO if 如果没有一行内容， 有无内容提示

/*
* 表格是否全空 (逻辑需要，放到gettable处理)
*   - 全空
*   - 仅tbody
* 内容全空：全列检查(那几列为空))
* 列中有为空内容
* 有无内容提示
*/

function initData(value) {
	data = value
}

function initApp(value) {
	app = value
}

function checkTbody (browser) {
	browser.execute(function(tbody_dom) {
		let $tds = document.querySelector(tbody_dom + ' td')
		// Case: 没有数据
		// 没有td
		// tbody有其他节点并且有内容
		return !!$tds
	}, [app['table_dom']['tbody_dom']], function(rst) {
		if (rst.value) {
			browser.verify.equal(rst.value, true, '表格存在')
		} else {
			browser.expect.element(app['table_dom']['tbody_dom']).text.not.equal('', '表格存在')
		}
	});
}

function checkCel(browser) {
	browser.execute( function(thead_dom, tbody_dom) {
		let $ths = document.querySelectorAll(thead_dom + ' th,' + thead_dom + ' td')
		let $trs = document.querySelectorAll(tbody_dom + ' tr')
		let data = []
		for (let th of $ths) {
			data.push({name: th.innerText, data: []})
		}

		for (let j = 0; j < $ths.length; j++) {
			for (let i = 0; i < $trs.length; i++) {
				let $td = $trs[i].querySelector('td:nth-child('+ (j+1) +')')
				data[j].data.push($td ? $td.innerText : 'may be colspan')
			}
		}
		return data
	}, [app['table_dom']['thead_dom'], app['table_dom']['tbody_dom']], function(rst) {
		let colsEmpty = []
		
		for (let c in rst.value) {
			let cols = rst.value[c].data
			let arr = []
			for (let r in cols) {
				if (Util.isEmpty(cols[r])) {
					arr.push({index: r, text: cols[r]})
				}
			}
			colsEmpty.push(arr)
			browser.verify.checkCelEmpty(arr, c, rst.value, app['table_cell'])
		}
		// fs.writeFile('bin/tmp/t.json', JSON.stringify(rst.value))
	})
}

module.exports = {
	'doTest': doTest,
	'initData': initData,
	'initApp': initApp
}
