

function loadChart(url = null) {
    var chart;
    var api_url = '';
    if (!url) {
        const currentDate = new Date()
        const endDateString = currentDate.toISOString().split('.')[0]
        currentDate.setDate(currentDate.getDate() - 100)
        const startDateSring = currentDate.toISOString().split('.')[0]
        api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=" + startDateSring + "&time_end=" + endDateString
    } else {
        api_url = url;
    }
    const api_key = "93C3D7A8-551C-47A3-9A6C-796E3E65915A"
    fetch(api_url, {
        'method': 'GET',
        headers: {
            'X-CoinAPI-Key': api_key,
        }
    }).then((res) => {
        res.json().then((data) => {
            const rate = 10000 / data[data.length - 1].rate_open;
            const chart_data = data.map((period_data) => ({
                date: new Date(period_data.time_period_start),
                amount: period_data.rate_open * rate
            }))
            if (!chart) {
                chart = am4core.create("transaction-div", am4charts.XYChart);
                let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "amount";
                series.dataFields.dateX = "date";
                series.stroke = am4core.color('#0052ff');
                series.strokeWidth = 2;
                // series.minBulletDistance = 15;
                dateAxis.renderer.grid.template.disabled = true;
                dateAxis.renderer.labels.template.disabled = true;
                valueAxis.renderer.grid.template.disabled = true;
                valueAxis.renderer.labels.template.disabled = true;
                chart.data = chart_data;
                valueAxis.renderer.baseGrid.disabled = true;

                chart.numberFormatter.numberFormat = "$#,###.00";

                var circleBullet = series.bullets.push(new am4charts.CircleBullet());
                circleBullet.circle.fill = am4core.color("#0052ff");
                circleBullet.circle.stroke = am4core.color("#fff");
                circleBullet.circle.strokeWidth = 2;
                circleBullet.fillOpacity = 0;
                circleBullet.strokeOpacity = 0;
                var bullethover = circleBullet.states.create("hover");
                bullethover.properties.fillOpacity = 1;
                bullethover.properties.strokeOpacity = 1;

                circleBullet.tooltipText = "[bold]{valueY}[/]\n{dateX.formatDate('MMMM dd hh:mm:ss a')}";
                // series.tooltip.background.cornerRadius = 20;
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#15232c");
                series.tooltip.background.fillOpacity = 1;
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.label.textAlign = "middle";
                series.tooltip.label.textValign = "middle";
                circleBullet.events.on("over", function (ev) {
                    const target = ev.target
                    const dataItem = target.dataItem;
                    const value = dataItem.values.valueY.value;
                    const balance_container = document.getElementById('balance-string')
                    balance_container.innerText = (value).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                })
            } else {
                chart.data = chart_data
            }
        })
    })
}

const assets = {
    template: '#tmpl-assets',
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        const th = this
        setTimeout(function(){
            th.loading = false
            th.$nextTick(function(){
                var endDate = new Date();
                var currentDate = new Date()
                var endDateString = currentDate.toISOString().split('.')[0]
                currentDate.setDate(currentDate.getDate() - 1)
                var startDateSring = currentDate.toISOString().split('.')[0]
                var api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=15MIN&time_start=" + startDateSring + "&time_end=" + endDateString

                var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

                var space = (endDate - currentDate) / 5;
                var i;
                var barStrings = ''
                for (i = 0; i < 6; i++) {
                    const hour = currentDate.getHours()
                    const minute = currentDate.getMinutes()
                    const barString = hour + ':' + minute
                    barStrings += '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                    currentDate.setTime(currentDate.getTime() + space)
                }

                const barContainer = th.$el.querySelector('.Flex-l69ttv-0.HorizontalAxis__Container-c59t6n-0')
                console.log(barContainer)
                barContainer.innerHTML = barStrings;

                const year = currentDate.getFullYear()
                const date = currentDate.getDate()
                const month = currentDate.getMonth()
                const monthName = monthNames[month]
                loadChart(api_url)

                const buttons = document.querySelectorAll('.PeriodSelector__PeriodOption-sc-1w75yzt-1.gktpwe');
                for (const button of buttons) {
                    button.addEventListener('click', function (event) {
                        var button_span;
                        // debugger;
                        if (event.target.nodeName === 'BUTTON') {
                            button_span = event.target.querySelector('span');
                        } else {
                            button_span = event.target;
                        }

                        if (button_span.classList.contains('jMosWc')) {
                            return
                        }

                        const selected_span = document.querySelector('.jMosWc');
                        selected_span.classList.add('coKZEF')
                        selected_span.classList.remove('jMosWc')

                        button_span.classList.remove('coKZEF')
                        button_span.classList.add('jMosWc')

                        switch (event.target.innerText) {
                            case '1H':
                                endDate = new Date()
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setHours(currentDate.getHours() - 1)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?&period_id=1MIN&time_start=" + startDateSring + "&time_end=" + endDateString
                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const hour = currentDate.getHours()
                                    const minute = currentDate.getMinutes()
                                    const barString = hour + ':' + minute
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }
                                loadChart(api_url)
                                break;
                            case '1D':
                                endDate = new Date()
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setDate(currentDate.getDate() - 1)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=15MIN&time_start=" + startDateSring + "&time_end=" + endDateString

                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const hour = currentDate.getHours()
                                    const minute = currentDate.getMinutes()
                                    const barString = hour + ':' + minute
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }
                                loadChart(api_url)
                                break;
                            case '1W':
                                endDate = new Date()
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setDate(currentDate.getDate() - 7)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=2HRS&time_start=" + startDateSring + "&time_end=" + endDateString

                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const date = currentDate.getDate()
                                    const month = currentDate.getMonth()
                                    const monthName = monthNames[month]
                                    console.log(month, monthName)
                                    const barString = monthName + ' ' + date
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }
                                loadChart(api_url)
                                break;
                            case '1M':
                                endDate = new Date()
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setMonth(currentDate.getMonth() - 1)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=8HRS&time_start=" + startDateSring + "&time_end=" + endDateString

                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const date = currentDate.getDate()
                                    const month = currentDate.getMonth()
                                    const monthName = monthNames[month]
                                    const barString = monthName + ' ' + date
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }
                                loadChart(api_url)
                                break;
                            case '1Y':
                                endDate = new Date()
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setFullYear(currentDate.getFullYear() - 1)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=3DAY&time_start=" + startDateSring + "&time_end=" + endDateString

                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const year = currentDate.getFullYear()
                                    const month = currentDate.getMonth()
                                    const monthName = monthNames[month]
                                    const barString = year + ' ' + monthName
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }

                                loadChart(api_url)
                                break;
                            case 'ALL':
                                currentDate = new Date()
                                endDateString = currentDate.toISOString().split('.')[0]
                                currentDate.setFullYear(currentDate.getFullYear() - 3)
                                startDateSring = currentDate.toISOString().split('.')[0]
                                api_url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=10DAY&time_start=" + startDateSring + "&time_end=" + endDateString

                                barStrings = ''
                                space = (endDate - currentDate) / 5;
                                for (i = 0; i < 6; i++) {
                                    const year = currentDate.getFullYear()
                                    const month = currentDate.getMonth()
                                    const monthName = monthNames[month]
                                    const barString = year + ' ' + monthName
                                    const span = '<span class="TextElement__Spacer-hxkcw5-0 cicsNy Caps__StyledUppercase-sc-1m9jrwx-0 csSEWt HorizontalAxis__Item-c59t6n-1 hcMUfB">' + barString + '</span>'
                                    barStrings += span;
                                    currentDate.setTime(currentDate.getTime() + space)
                                }

                                loadChart(api_url)
                                break;
                        }
                        barContainer.innerHTML = barStrings;
                    })
                }
            })
        }, 1500)
    }
}

const price = {
    template: '#tmpl-price',
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        const th = this
        setTimeout(function(){
            th.loading = false
        }, 1500)
    }
}

const accounts = {
    template: '#tmpl-accounts',
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        const th = this
        setTimeout(function(){
            th.loading = false
        }, 1500)
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
            modeClass: modeClass
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
app.use(router)
app.mount('#app')
