const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))
let doTest = {
	'空值检查: 是否有哪几列为空': checkCols,
	'空值检查: 是否有为空的单元格': checkCel
}

// TODO if 如果没有一行内容， 有无内容提示

let emptyStr = ['--', '-', '']

/*
* 表格是否全空 (逻辑需要，放到gettable处理)
*   - 全空
*   - 仅tbody
* 内容全空：全列检查(那几列为空))
* 列中有为空内容
* 有无内容提示
*/

function initData(data) {
}
function checkCols() {
	console.log(111)
}
function checkCel() {
	console.log(222)
}
function isEmpty(str) {
	str = str + ''
	return emptyStr.contains(str.trim())
}

module.exports = {
	'doTest': doTest,
	'isEmpty': isEmpty,
	'initData': initData
}
