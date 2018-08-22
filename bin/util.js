const path = require('path')
const colors = require('colors')

module.exports = {
	tmpDir: path.resolve(__dirname, './tmp/'),
	eventsMap: {
		'click': 'angryClick'
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
