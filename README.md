# 自动化测试-表格
> 通过为每个项目配置配置项，自动化测试各个项目中的表格(table)

## 使用方式 （测试人员）

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
> src/jjcc/config.json

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
#### config.json
|字段 | 是否必填 | 含义 |
| --- | ---      | --- |
| url | 必填 | 需要测试的网址 |
| before | |有些表格并不在首屏展示，那么需要描述如何展示出表格，具体见 [before配置](#before) |
| table_dom | 必填 | 表格的唯一节点，如有多个取第一个。有问题见 [table节点](#table_dom) |
| table_cell || 对单元格进行正确性验证，支持`颜色(红涨绿跌)`、`单位`、`小数位`、`排序` ， 具体见 [table_cell配置](#table_cell)|
| table_empty | | 检查是否有单元格为空，以及无数据下是否有提示内容 |
#### before

#### table_dom

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

- **Q2: 虚拟表格，待测试的thead与tbody不在一个table下**

table_dom同时支持以下格式
```
"table_dom" : {
    "thead_dom" : "your_thead_dom",
    "tbody_dom" : "your_tbody_dom"
}
```

#### table_cell


未完待续 ...