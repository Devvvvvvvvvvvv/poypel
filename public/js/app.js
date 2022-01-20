window.odometerOptions = {
    duration: 500
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const assets = {
    template: '#tmpl-assets',
    props: ['account'],
    data() {
        return {
            loading: true,
            balanceUSD: 0,
            balanceBTC: 0,
            period: 'month'
        }
    },
    computed: {
        dotBorder() {
            let color = "rgb(255, 255, 255)"
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                color = "rgb(0, 0, 0)"
            }
            return color
        },
        coinBalance() {
            return formatter.format(this.balanceUSD)
        },
        coinBalanceBTC() {
            if (this.data.prices.latest) {
                return this.balanceBTC.toFixed(8) + " BTC"
            }
            return 0
        },
        rateUSD() {
            if (this.data.prices.latest) {
                return formatter.format(this.data.prices.latest)
            }
            return formatter.format(0)
        },
        rateChange() {
            if (this.data && this.data.prices.latest_price.percent_change.day) {
                return this.data.prices.latest_price.percent_change.day
            }
            return 0
        },
        rateChangeS() {
            return (this.rateChange > 0 ? "+" : "") + this.rateChange.toFixed(2) + "%"
        },
        rateChangeClass() {
            return this.rateChange > 0 ? "cds-positive-p1jgmvu0" : "cds-negative-ndtwd8g"
        }
    },
    methods: {
        changePeriod(period) {
            this.period = period
            const data = this.chartData.filter(c => {
                switch (this.period) {
                    case 'hour':
                        return moment(c.Date).isAfter(moment().subtract(1, 'hour'))
                    case 'day':
                        return moment(c.Date).isAfter(moment().subtract(1, 'day'))
                    case 'month':
                        return moment(c.Date).isAfter(moment().subtract(1, 'month'))
                    case 'week':
                        return moment(c.Date).isAfter(moment().subtract(1, 'week'))
                    case 'year':
                        return moment(c.Date).isAfter(moment().subtract(1, 'year'))
                    case 'all':
                        return true
                }
            })
            this.chart.setOption({
                series: [{
                    data: data.map(item => [item.Date, item.AmountAll])
                }]
            })
        }
    },
    mounted() {
        fetch("https://www.coinbase.com/api/v2/assets/prices/5b71fc48-3dd3-540c-809b-f8c94d0e68b5?base=USD").then((res) => {
            res.json().then((data) => {
                this.loading = false
                this.data = data.data
                this.$nextTick(() => {
                    let transactions = JSON.parse(JSON.stringify(this.account.Transactions))
                    this.chartData = transactions.reverse().filter(t => {
                        if (t["Type"] === 1) {
                            return true
                        }
                        return false
                    })
                    let saveBtc = 0
                    let saveAmount = 0
                    this.chartData.forEach(c => {
                        data.data.prices.year.prices.forEach(p => {
                            if (moment(p[1] * 1000).isSame(c.Date, "day")) {
                                c.Rate = p[0]
                                c.Btc = c.Amount / p[0]
                                saveBtc += c.Btc
                                c.BtcAll = saveBtc
                                c.AmountAll = c.BtcAll * p[0]
                                saveAmount = c.AmountAll
                            }
                        })
                    })
                    this.balanceUSD = saveAmount
                    this.balanceBTC = saveBtc
                    const chart = echarts.init(this.$el.querySelector('#transaction-div'), null, {renderer: 'svg'})
                    const options = {
                        animation: false,
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            className: 'HoverIndicator__HoverContainer-sc-19878rr-1 egcdbS',
                            backgroundColor: 'rgb(21, 35, 44)',
                            borderWidth: 0,
                            extraCssText: 'padding: 10px 15px;text-align: center;border-radius: 5px;box-shadow: rgb(125 149 182 / 20%) 0px 1px 4px;',
                            transitionDuration: 0,
                            formatter: (params) => {
                                let data = params.data
                                if (!data) data = params[0].data
                                return '<div class="HoverTooltip__Container-sc-9v17p4-2 dwBaVN"><span class="HoverTooltip__PriceText-sc-9v17p4-0 jemgig">' + formatter.format(data[1]) + '</span><span class="TextElement__Spacer-hxkcw5-0 kFFKOl Caption__StyledCaption-sc-152nh1w-0 ha-DUqh HoverTooltip__DateText-sc-9v17p4-1 gdgSpY">' + moment(data[0]).format("MMMM D h:mm A") + '</span></div>'
                            },
                            position: (point, params, dom) => {
                                const dot = chart.getDom().querySelector('path[fill-opacity="0.98"]')
                                if (!dot) return [-999999, -999999]
                                const width = dom.offsetWidth
                                const top = dot.getBoundingClientRect().top - dot.parentNode.getBoundingClientRect().top
                                const left = dot.getBoundingClientRect().left - dot.parentNode.getBoundingClientRect().left
                                return [left - width / 2, top - 74]
                            }
                        },
                        dataZoom: [{type: 'inside', disabled: true}, {type: 'slider', show: false}],
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 34,
                            height: 208,
                            show: false
                        },
                        xAxis: {
                            type: 'time',
                            show: true,
                            axisLabel: {
                                formatter: (value) => {
                                    switch (this.period) {
                                        case 'hour':
                                        case 'day':
                                            return moment(value * 1).format("h:mm A").toUpperCase()
                                        case 'month':
                                        case 'week':
                                            return moment(value * 1).format("MMM D").toUpperCase()
                                        case 'year':
                                        case 'all':
                                            return moment(value * 1).format("MMM YYYY").toUpperCase()
                                    }
                                },
                                padding: 2,
                                color: 'rgb(var(--gray60))',
                                fontFamily: 'CoinbaseText, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'var(--line)'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisPointer: {
                                show: true,
                                type: 'none',
                                snap: true,
                                triggerTooltip: true
                            }
                        },
                        yAxis: {
                            type: 'value',
                            min: (value) => {
                                return value.min - 100
                            },
                            max: 'dataMax',
                            show: false
                        },
                        series: [
                            {
                                id: 'btc',
                                data: this.chartData.filter(c => {
                                    return moment(c.Date).isAfter(moment().subtract(1, 'month'))
                                }).map(item => [item.Date, item.AmountAll]),
                                type: 'line',
                                symbol: 'circle',
                                symbolSize: 9,
                                lineStyle: {
                                    color: 'var(--primary)',
                                    width: 1.7
                                },
                                itemStyle: {
                                    color: 'rgb(0, 82, 255)',
                                    borderColor: this.dotBorder,
                                    borderWidth: 3,
                                    opacity: 0
                                },
                                emphasis: {
                                    lineStyle: {
                                        width: 1.7,
                                        color: 'var(--primary)'
                                    },
                                    itemStyle: {
                                        opacity: 0.98
                                    }
                                },
                                encode: {
                                    x: 0,
                                    y: 1,
                                    tooltip: [1,0]
                                }
                            }
                        ]
                    }
                    chart.setOption(options)
                    this.chart = chart
                })
            })
        })
    }
}

const price = {
    template: '#tmpl-price',
    props: ['account'],
    data() {
        return {
            loading: true,
            data: undefined,
            period: 'day',
            balanceUSD: 0,
            balanceBTC: 0
        }
    },
    computed: {
        dotBorder() {
            let color = "rgb(255, 255, 255)"
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                color = "rgb(0, 0, 0)"
            }
            return color
        },
        lineColor() {
            let color = "rgb(225, 89, 27)"
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                color = "rgb(247, 147, 26)"
            }
            return color
        },
        rateChange() {
            return this.data && this.data.prices ? this.data.prices.latest_price.percent_change[this.period] : 0
        },
        rateChangeF() {
            return (this.rateChange > 0 ? "+" : "") + this.rateChange.toFixed(2) + "%"
        },
        coinBalance() {
            return formatter.format(this.balanceUSD)
        },
        coinBalanceBTC() {
            if (this.data && this.data.prices.latest) {
                return this.balanceBTC.toFixed(8) + " BTC"
            }
            return 0
        },
        coinBalanceAll() {
            return this.coinBalanceBTC + " BTC ≈ " + this.coinBalance
        }
    },
    methods: {
        changePeriod(period) {
            this.period = period
            this.chart.setOption({
                series: [{
                    id: 'btc',
                    data: this.data.prices[this.period].prices.map((item) => [item[1]*1000, item[0]])
                }]
            })
        }
    },
    mounted() {
        this.odInt = new Odometer({
            el: this.$el.querySelector('#trade_value_int'),
            format: '(,ddd)',
            value: 42156,
            duration: 500
        })
        this.odDec = new Odometer({
            el: this.$el.querySelector('#trade_value_decimal'),
            format: '.dd',
            value: 98,
            duration: 500
        })
        fetch("https://www.coinbase.com/api/v2/assets/prices/5b71fc48-3dd3-540c-809b-f8c94d0e68b5?base=USD").then((res) => {
            res.json().then((data) => {
                this.odInt.update(data.data.prices.latest.split(".")[0])
                this.odDec.update("0." + data.data.prices.latest.split(".")[1])
                this.loading = false
                let transactions = JSON.parse(JSON.stringify(this.account.Transactions))
                this.chartData = transactions.reverse().filter(t => {
                    if (t["Type"] === 1) {
                        return true
                    }
                    return false
                })
                let saveBtc = 0
                let saveAmount = 0
                this.chartData.forEach(c => {
                    data.data.prices.year.prices.forEach(p => {
                        if (moment(p[1] * 1000).isSame(c.Date, "day")) {
                            c.Rate = p[0]
                            c.Btc = c.Amount / p[0]
                            saveBtc += c.Btc
                            c.BtcAll = saveBtc
                            c.AmountAll = c.BtcAll * p[0]
                            saveAmount = c.AmountAll
                        }
                    })
                })
                this.balanceUSD = saveAmount
                this.balanceBTC = saveBtc
                this.data = data.data
                this.$nextTick(() => {
                    const chart = echarts.init(this.$el.querySelector('#transaction-div'), null, { renderer: 'svg' })
                    const options = {
                        animation: false,
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            className: 'HoverIndicator__HoverContainer-sc-19878rr-1 egcdbS',
                            backgroundColor: 'rgb(21, 35, 44)',
                            borderWidth: 0,
                            extraCssText: 'padding: 10px 15px;text-align: center;border-radius: 5px;box-shadow: rgb(125 149 182 / 20%) 0px 1px 4px;',
                            transitionDuration: 0,
                            formatter: (params) => {
                                let data = params.data
                                if (!data) data = params[0].data
                                return '<div class="HoverTooltip__Container-sc-9v17p4-2 dwBaVN"><span class="HoverTooltip__PriceText-sc-9v17p4-0 jemgig">' + formatter.format(data[1])  + '</span><span class="TextElement__Spacer-hxkcw5-0 kFFKOl Caption__StyledCaption-sc-152nh1w-0 ha-DUqh HoverTooltip__DateText-sc-9v17p4-1 gdgSpY">' + moment(data[0]).format("MMMM D h:mm A") + '</span></div>'
                            },
                            position: (point, params, dom) => {
                                const dot = chart.getDom().querySelector('path[fill-opacity="0.98"]')
                                if (!dot) return [-999999, -999999]
                                const width = dom.offsetWidth
                                const top = dot.getBoundingClientRect().top - dot.parentNode.getBoundingClientRect().top
                                const left = dot.getBoundingClientRect().left - dot.parentNode.getBoundingClientRect().left
                                return [left - width / 2, top - 74]
                            }
                        },
                        dataZoom: [{type: 'inside', disabled: true}, {type: 'slider', show: false}],
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 34,
                            height: 208,
                            show: false
                        },
                        xAxis: {
                            type: 'time',
                            show: true,
                            axisLabel: {
                                formatter: (value) => {
                                    switch (this.period) {
                                        case 'hour':
                                        case 'day':
                                            return moment(value*1).format("h:mm A").toUpperCase()
                                        case 'month':
                                        case 'week':
                                            return moment(value*1).format("MMM D").toUpperCase()
                                        case 'year':
                                        case 'all':
                                            return moment(value*1).format("MMM YYYY").toUpperCase()
                                    }
                                },
                                padding: 2,
                                color: 'rgb(var(--gray60))',
                                fontFamily: 'CoinbaseText, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'var(--line)'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisPointer: {
                                show: true,
                                type: 'none',
                                snap: true,
                                triggerTooltip: true
                            }
                        },
                        yAxis: {
                            type: 'value',
                            min: (value) => {
                                return value.min - 100
                            },
                            max: 'dataMax',
                            show: false
                        },
                        series: [
                            {
                                id: 'btc',
                                data: data.data.prices.day.prices.map((item) => [item[1]*1000, item[0]]),
                                type: 'line',
                                symbol: 'circle',
                                symbolSize: 9,
                                lineStyle: {
                                    color: this.lineColor,
                                    width: 1.7
                                },
                                itemStyle: {
                                    color: this.lineColor,
                                    borderColor: this.dotBorder,
                                    borderWidth: 3,
                                    opacity: 0
                                },
                                emphasis: {
                                    lineStyle: {
                                        width: 1.7
                                    },
                                    itemStyle: {
                                        opacity: 0.98
                                    }
                                },
                                encode: {
                                    x: 0,
                                    y: 1,
                                    tooltip: [1,0]
                                }
                            }
                        ]
                    }
                    chart.setOption(options)
                    this.chart = chart
                })
            })
        })
    }
}

const accounts = {
    template: '#tmpl-accounts',
    props: ['account'],
    data() {
        return {
            loading: true,
            data: undefined,
            chartData: undefined,
            balanceUSD: 0,
            balanceBTC: 0
        }
    },
    computed: {
        coinBalance() {
            return formatter.format(this.balanceUSD)
        },
        coinBalanceBTC() {
            if (this.data && this.data.prices.latest) {
                return this.balanceBTC.toFixed(8) + " BTC"
            }
            return 0
        },
        coinBalanceAll() {
            return this.coinBalanceBTC + " BTC ≈ " + this.coinBalance
        }
    },
    mounted() {
        fetch("https://www.coinbase.com/api/v2/assets/prices/5b71fc48-3dd3-540c-809b-f8c94d0e68b5?base=USD").then((res) => {
            res.json().then((data) => {
                this.loading = false
                this.data = data.data
                let transactions = JSON.parse(JSON.stringify(this.account.Transactions))
                this.chartData = transactions.reverse().filter(t => {
                    if (t["Type"] === 1) {
                        return true
                    }
                    return false
                })
                let saveBtc = 0
                let saveAmount = 0
                this.chartData.forEach(c => {
                    data.data.prices.year.prices.forEach(p => {
                        if (moment(p[1] * 1000).isSame(c.Date, "day")) {
                            c.Rate = p[0]
                            c.Btc = c.Amount / p[0]
                            saveBtc += c.Btc
                            c.BtcAll = saveBtc
                            c.AmountAll = c.BtcAll * p[0]
                            saveAmount = c.AmountAll
                        }
                    })
                })
                this.balanceUSD = saveAmount
                this.balanceBTC = saveBtc
            })
        })
    }
}

const routes = [
    { path: '/dashboard/', component: assets },
    { path: '/price/:c', component: price },
    { path: '/accounts/:id', component: accounts }
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
})

const app = Vue.createApp({
    template: '#tmpl-layout',
    data() {
        let modeClass = "cds-light-lilshph"
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            modeClass = "cds-dark-dm4zkqb"
        }
        return {
            modeClass: modeClass,
            account: window.acc
        }
    }
})
app.component('c-menu', {
    template: '#tmpl-menu',
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        const th = this
        setTimeout(function(){
            th.loading = false
        }, 1000)
    }
})
app.config.compilerOptions.delimiters = ['[[', ']]']
app.config.globalProperties.$moment = moment
app.config.globalProperties.$formatter = formatter
app.use(router)
app.mount('#app')
