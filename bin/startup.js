const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const colors = require('colors')
const cmd = require('node-cmd')
const argv = require('minimist')(process.argv.slice(2))
const Promise = require('bluebird')
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })
const Util = require(path.resolve(__dirname, './util'))
const NightwatchConf = require(path.resolve(__dirname, './nightwatch.conf.js'))
// const Nightwatch = require('nightwatch')

if (!argv.conf) {
  Util.logNecessary('--conf')
}
const confPath = path.resolve(__dirname, '../', argv.conf)
fs.readFile(confPath, (err, data) => {
  if (err) {
    console.log(colors.red('【ERROR】 未找到配置文件，\n' + err.path))
  }
  startup(confPath)
})

/* Check config.json */
function checkConf (item) {
  // url
  (!item.url || !item.url.trim()) && Util.logNecessary('url')
  // table_dom
  (!item.table_dom) && Util.logNecessary('table_dom')
  if (typeof item['table_dom'] == 'string'){
    item['table_dom'] = {
      thead_dom: item['table_dom'] + ' thead',
      tbody_dom: item['table_dom'] + ' tbody',
    }
  } else {
    !item.thead_dom && Util.logNecessary('table_dom.thead_dom')
    !item.tbody_dom && Util.logNecessary('table_dom.tbody_dom')
  }
  return item
}

function startup (confPath) {
  const CONFIG = require(confPath)
  const apps = _.isArray(CONFIG) ? CONFIG : [CONFIG]

  let run = function (count) {
    let item = apps[count]
    if (!item) return

    item = checkConf(item)
    fs.writeFile(path.resolve(__dirname, './tmp/config.json'), JSON.stringify(item), err => {
      if (err) {
        console.log(err)
      }
      console.log('\n', '>> Start table case '.cyan, item['table_dom']['tbody_dom'].bold.cyan);
      //? 无法直接调用nightwatch起程序
      //? 无法通过node_modules中其程序
      // cmd.run('node_modules/.bin/nightwatch --config bin/nightwatch.conf.js')
      
      const processRef = cmd.get('npm run nightwatch')

      let data_line = ''
      processRef.stdout.on(
        'data'
      , data => {
        console.log(data)
      })

      processRef.on('close', code => {
        run(++count)
      })
    })
  }

  run(0)
}
