# 自动化测试-表格
> 通过为每个项目配置配置项，自动化测试各个项目中的表格(table)

## 使用方式 （测试人员）

### 环境依赖

- node 8.3+
- jdk 1.8+

！项目拉取后，打开控制台切换当前`table_test`目录，运行`npm install`，安装本程序的依赖包

### 技能要求

> 对照[为项目进行配置](#为项目进行配置)中的实际需求

- dom节点知识 -> 获取需要测试的table的唯一节点，了解table系列的标签
- dom事件(event)知识 -> 能够用事件+节点描述出table展示前的过程
- JSON规范 -> 严格按照JSON格式进行配置项文件的编辑

### 目录结构

```
|-- package.json 配置快速启动命令
|-- src 为每个要测试的项目进行配置
|-- bin 自动化程序
```

### 建立项目配置文件 & 添加快速启动命令

1. 在src下新建目录**jjcc**(项目名 经济持仓)，在jjcc下新建**config.json**
```
src/jjcc/config.json
```

2. 在package.json中建立快速启动命令。插入即可 不用删除原有的，--conf 后路径与第一步中闯进的文件路径一致即可。

```
 "scripts": {
     "test_jjcc": "node bin/startup.js --conf src/jjcc/config.json",
     "test_dev": "nightwatch --config bin/nightwatch.conf.js",
    "nightwatch": "nightwatch --config bin/nightwatch.conf.js"
  },
```

### 为项目进行配置
基础例子
```json
{
    "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
    "before": [
        {"event": "click", "dom": ".item-content:nth-child(2)", "wait_time": "500"}
    ],
    "table_dom": "#mid .hq_table_base", 
    "table_cell":
    {
        "代码":
        {
            "sort":
            {
                "wait_time": "500"
            }
        },
        "涨幅":
        {
            "fixed": "2",
            "color": "true",
            "unit": "%",
            "sort":
            {
                "wait_time": "500"
            }
        }
    },
    "table_empty": true
}
```
具体见[config.json配置](#configjson)

### 运行测试程序
控制台目录切换到当前`table_test`目录下（根目录），运行如下命令（在前面你添加的快速启动命令）
```
npm run test_jjcc  
```
或者 （conf修改为你新增的配置文件路径）
```
node bin/startup.js --conf src/jjcc/config.json
```


### config.json
| 字段          | 必填   | 含义                                       |
| ----------- | ---- | ---------------------------------------- |
| url         | √    | 需要测试的网址                                  |
| before      |      | 有些表格并不在首屏展示，那么需要描述如何展示出表格，具体见 [before配置](#before) |
| table_dom   | √    | 表格的唯一节点，如有多个取第一个。有问题见 [table节点](#table_dom) |
| table_cell  |      | 对单元格进行正确性验证，支持`颜色(红涨绿跌)`、`单位`、`小数位`、`排序` ， 具体见 [table_cell配置](#table_cell) |
| table_empty |      | 检查是否有单元格为空，以及无数据下是否有提示内容                 |

### before

格式如下：
```
"before": [
			{"event": "click", "dom": "#tab1", "wait_time": "500", "wait_dom": "#wrap"},
			{"event": "click", "dom": "#tab1", "wait_dom": "#wrap"},
			{"event": "click", "dom": "#tab1", "wait_time": "500"}
		],
```
1. 按照执行顺序填写
2. event表示事件，dom表示节点，即在X节点进行X操作
3. event目前支持`click`（单击）、`dblClick`（双击）
4. 每一步操作后浏览器需要一定时间反应，可以通过`wait_dom`(等待X节点出现为止)或`wait_time`（等待时间X毫秒）后在执行下一步
5. `wait_dom`和`wait_time`可以都不写，那么默认立即进行下步操作
6. `wait_dom`和`wait_time`都写的话，表示等待X节点最多X毫秒


### table_dom

- **Q1: 一个页面有好几个表格**

项目配置项`config.json`支持以数组形式进行多个项目的表格测试/同个项目的多个表格测试。

需要注意的是，每一个表格对于自动化测试而言是一个独立的项目，原则上每一个表格的配置都是独立的，表格之间没有关联性。如果一个表格依赖于另一个表格的操作（如点击某一行）才出现，且两个表格都需要测试， 那么依然是两段配置，只是其中一个表格的配置的[before](#before)字段需要描述前置操作。

```JSON
[
    {
        "url": "",
        "table_dom": "",
        ...
    }, 
    {
        "url": "",
        "table_dom": "",
        ...
    }
]
```

- **Q2: 为什么需要thead_dom和tbody_dom两个值**

table_dom支持以下格式
```
"table_dom" : {
    "thead_dom" : "your_thead_dom",
    "tbody_dom" : "your_tbody_dom"
}
```

所有表头固定的表格，其实是由**两个表格**组成的，所以需要单独指定thead和tbody





### table_cell


格式如下：

```
"table_cell": {
        "累计净买入额": { "color": true, "unit": true, "fixed": "2", "sort": { "wait_time": "1000"}},
        "持仓市值": {"unit": true, "sort": true},
        "盈亏比":{ "fixed": "2", "color": true, "unit": "%", "sort": true},
        "连续增持":{"color": true, "unit": "天", "sort": true},
        "持仓股":{"sort": true}
    }
```

**table_cell**是对表格列数据进行验证的，每一列都是用key: value的格式来定义的，key值为表格的每列的表头，value值为一个对象，具体配置见下表：

| 字段    | 可选值                                      | 含义                                       |
| ----- | ---------------------------------------- | ---------------------------------------- |
| fixed | number                                   | 验证数值保留几位小数位                              |
| color | true/ {fixedColor: "#08a365"}/ {associatedColor: "涨跌幅"} | 验证数值的颜色是否正确（值为true，则表示针对该列每个值的正负来判断该显示红色还是绿色还是默认颜色；值为fixedColor，则会验证该列所有的数据颜色是否都为fixedColor设置的值；值为associatedColor，则表示该列每项数据的颜色都与对应associatedColor列的数据颜色一致，如“现价”的颜色与“涨跌幅”的颜色是一致的） |
| unit  | true/具体单位（如：元）                           | 验证数值的单位是否正确（值为true，则表示验证“万、亿”的判断；值为具体单位，则表示验证具体单位加“万、亿”的判断） |
| sort  | true/{wait_time: 1000}（wait_time表示点击后需要等待的时间，单位是毫秒。因为有的排序是请求接口排序的，需要等待接口返回数据） | 验证当前列的排序功能是否正确（会对当前列表头进行两次点击，分别验证升序降序是否排列正确）（值为true，则默认等待时间500ms） |

**注：以上字段如果有不需要验证的，则不用填写该字段**



