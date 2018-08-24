const path = require('path')
const colors = require('colors')

module.exports = {
	tmpDir: path.resolve(__dirname, './tmp/'),
	runDir: path.resolve(__dirname, './run/'),
	emptyStr: ['--', '-', ''],
	eventsMap: {
		'click': 'angryClick',
		'scroll': 'scroll'
	},
	isEmpty (str, eStr) {
		eStr = eStr || this.emptyStr
		eStr = Array.isArray(eStr) ? eStr : [eStr]

		str = str + ''
		str = str.replace(/\r|\n|\\s/g, '')
		return !!~eStr.indexOf(str.trim())
	},
	getEvent (event) {
		return this.eventsMap[event] || event
	},
	logNecessary (key) {
		console.log(colors.red('【ERROR】: [%s] is necessary!'), key)
		process.exit()
	},
	statusLog (str) {
		console.log(colors.yellow(str))
	},
	successLog (str) {
		console.log(colors.green('【SUCCESS】: ' + str))
	},
	errorLog (str) {
		console.log(colors.red('【ERROR】: ' + str))
	}
};
