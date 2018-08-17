const colors = require('colors')

module.exports = {
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
