const path = require('path')
const app = require(path.resolve(__dirname, '../tmp/config.json'))

function doTest (browser) {
	console.log('---------------------------------2------------------------------')
}

module.exports = {
	// '@disabled': true,
	'doTest': doTest
}
