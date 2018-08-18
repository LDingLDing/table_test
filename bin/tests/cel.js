const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))
const Util = require(path.resolve(__dirname, '../util'))

let cel = {
  data:void 0,
  initData (data) {
    this.data = data
  },
  doTest (browser) {
    console.log('---------------------------------1------------------------------')
    // console.log(this.data)
    // getTableElements(browser, (tableElements) => {
    //   for (let colName in tableElements) {
    //   	Util.statusLog('开始验证表格【'+colName+'】列：');
    //   	for (let axis of tableElements[colName].tbody) {
    //   		let [x, y] = axis.split(',');
    //   		x++;
    //       y++;
    //       console.log(x,y)
    //   		// if (data['table_cell'][colName]['fixed']){
    //   		// 	// browser.expect.element(data['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')').text.to.contain(colName);
    //   		// }
    //   		// if (data['table_cell'][colName]['color']){
    //   		// 	browser.expect.element(data['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')').to.have.css('color').which.equals('#ff3232');
    //   		// }
    //   		// if (data['table_cell'][colName]['unit']){
    //   		// 	browser.expect.element(data['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')').text.to.contain(data['table_cell'][colName]['unit']);
    //   		// }
    //   		// if (data['table_cell'][colName]['sort']){
    //   		// 	browser.expect.element(data['table_dom']['tbody_dom'] + ' tr:nth-child(' + x + ') td:nth-child(' + y + ')').text.to.contain(colName);
    //   		// }
    //   	}
    //   }
    // })
  }
}

module.exports = cel