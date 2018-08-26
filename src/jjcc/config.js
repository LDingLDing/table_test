var data = [
    {
        "suite": "左侧前3个表格",
        "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
        "table_dom": { "thead_dom": "#mid .hq_table_theadfixed thead", "tbody_dom": "#mid .hq_table_base tbody"},
        "table_cell": {
            "累计净买入额": { "color": true, "unit": true, "fixed": "2", "sort": { "wait_time": "1000"}, "align": "right"},
            "持仓市值": {"unit": true, "sort": true},
            "盈亏比":{ "fixed": "2", "color": true, "unit": "%", "sort": true},
            "连续增持":{"color": true, "unit": "天", "sort": true},
            "持仓股":{"sort": true},
            "昨日新入":{"color": true, "sort": true, "unit": "只"},
            "昨日减持":{"color": {"fixedColor": "#08a365"}, "sort": true, "unit": "只"},
            "昨日增持":{"color": {"associatedColor": "盈亏比"}, "sort": true, "unit": "只"}
        }
    }, 
    {
        "suite": "抱团实力 左上",
        "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
        "before": [
            {"event": "click", "dom": ".item-content:nth-child(4)", "wait_time": "5000"}
        ],
        "table_dom": { "thead_dom": ".best-box .hq_table_theadfixed thead", "tbody_dom": ".best-box .hq_container_base tbody"}
    }, 
    {
        "suite": "抱团实力 左下",
        "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
        "before": [
            {"event": "click", "dom": ".item-content:nth-child(4)", "wait_time": "5000"}
        ],
        "table_dom": { "thead_dom": "#otherTable .hq_table_theadfixed thead", "tbody_dom": "#otherTable .hq_table_base tbody"}
    }, 
    {
        "suite": "明星经纪商",
        "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
        "before": [
            {"event": "click", "dom": ".item-content:nth-child(5)", "wait_time": "5000"}
        ],
        "table_dom": { "thead_dom": "#mid .hq_table_theadfixed thead", "tbody_dom": "#mid .hq_table_base tbody"},
        "table_cell": {
            "累计净买入额": { "color": true, "unit": true, "fixed": "2", "sort": { "wait_time": "1000"}},
            "持仓市值": {"unit": true, "sort": true},
            "盈亏比":{ "fixed": "2", "color": true, "unit": "%", "sort": true},
            "连续增持":{"color": true, "unit": "天", "sort": true},
            "持仓股":{"sort": true},
            "昨日新入":{"color": true, "sort": true, "unit": "只"},
            "昨日减持":{"sort": true, "unit": "只"},
            "昨日增持":{"sort": true, "unit": "只"}
        }
    },
    {
        "suite": "全部持仓",
        "url": "http://zx.10jqka.com.cn/brokerpositions/holdanalyze/html/index.html#/",
        "before": [
            {"event": "scroll", "dom": "#tableRight .hq_container_base", "wait_time": "5000", "wait_length": 100}
        ],
        "table_dom": { "thead_dom": "#tableRight .hq_table_tablefixed thead", "tbody_dom": "#tableRight .hq_table_base tbody"},
        "table_cell": {
            "名称": { "empty": '--' },
            "持仓趋势": { "empty": true },
            "持仓市值": { "unit": true, "fixed": "2", "sort": { "wait_time": "2000"}},
            "持仓成本": { "color": true, "sort": { "wait_time": "2000"}},
            "持仓盈亏比":{ "fixed": "2", "color": true, "unit": "%", "sort": { "wait_time": "2000"}},
            "持仓量":{ "unit": true, "sort": { "wait_time": "2000"}},
            "占仓比":{"color": true, "unit": "%", "sort": { "wait_time": "2000"}},
            "连续增持":{"color": true, "unit": "天", "sort": { "wait_time": "2000"}},
            "调仓幅度":{"color": true, "unit": "%", "sort": { "wait_time": "2000"}}
        }
    }
]

module.exports = data