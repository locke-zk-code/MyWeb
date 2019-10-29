/** 日期选择控件构造函数 */
function LockeDate() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.today = new Date().getDate();
}

LockeDate.prototype = {
    constructor: LockeDate,
    // 输入框
    myInput: document.getElementById('myInput'),
    // MASTER 页列表项
    masterLists: document.querySelectorAll('.locke-d-m-b-li-default'),
    // MASTER 页年份框
    masterYearBox: document.querySelector('.locke-d-m-h-i-b-year'),
    // MASTER 页月份框
    masterMonthBox: document.querySelector('.locke-d-m-h-i-b-month'),
    // MASTER 页当月列表项
    masterCurrentMonthLists: '',
    // SLAVE YEAR 页引用
    slaveYear: document.querySelector('.locke-year'),
    // SLAVE YEAR 页列表项
    slaveYearLists: document.querySelectorAll('.locke-y-slave-body>ul>li'),
    // SLAVE YEAR 页 START 年份框
    slaveYearStartYearBox: document.querySelector('.locke-y-s-h-i-b-start'),
    // SLAVE YEAR 页 END 年份框
    slaveYearEndYearBox: document.querySelector('.locke-y-s-h-i-b-end'),
    // SLAVE MONTH 页引用
    slaveMonth: document.querySelector('.locke-month'),
    // SLAVE MONTH 页列表项
    slaveMonthLists: document.querySelectorAll('.locke-m-slave-body>ul>li'),
    // SLAVE MONTH 页年份框
    slaveMonthYearBox: document.querySelector('.locke-m-s-h-i-year'),
    // 事件主元素
    eventElement: document.querySelector('.locke-date'),
    /** 主函数 */
    main: function () {
        // this --> LockeDate.prototype
        lockeThis = this;

        refreshMaster();
        refreshSlaveYear();
        refreshSlaveMonth();

        // 点击委托事件，根据class进行判断，除列表项的所有元素的点击事件
        lockeThis.eventElement.addEventListener('click', function () {
            let target = event.target;

            switch (target.getAttribute('class')) {
                case 'locke-d-m-h-i-button-1':
                    // MASTER-头部-->上一年
                    lockeThis.setYear(lockeThis.getYear() - 1);

                    // 刷新 MASTER 函数
                    refreshMaster();
                    break;
                case 'locke-d-m-h-i-button-2':
                    // MASTER-头部-->上一月
                    lockeThis.setMonth(lockeThis.getMonth() === 1 ? 12 : lockeThis.getMonth() - 1);
                    
                    // 刷新 MASTER 函数
                    refreshMaster();
                    break;
                case 'locke-d-m-h-i-button-3':
                    // MASTER-头部-->下一月
                    lockeThis.setMonth(lockeThis.getMonth() === 12 ? 1 : lockeThis.getMonth() + 1);

                    // 刷新 MASTER 函数
                    refreshMaster();
                    break;
                case 'locke-d-m-h-i-button-4':
                    // MASTER-头部-->下一年
                    lockeThis.setYear(lockeThis.getYear() + 1);

                    // 刷新 MASTER 函数
                    refreshMaster();
                    break;
                case 'locke-d-m-f-i-button-1':
                    // 清空
                    // 清空输入框
                    lockeThis.myInput.value = '';
                    // 重置年、月、日为当前
                    lockeThis.year = new Date().getFullYear();
                    lockeThis.month = new Date().getMonth() + 1;
                    lockeThis.today = new Date().getDate();
                    // 关闭子页
                    lockeThis.slaveYear.style.display = 'none';
                    lockeThis.slaveMonth.style.display = 'none';
                    // 刷新 MASTER 页
                    refreshMaster();
                    break;
                case 'locke-d-m-f-i-button-2':
                    // 现在
                    lockeThis.year = new Date().getFullYear();
                    lockeThis.month = new Date().getMonth() + 1;
                    lockeThis.today = new Date().getDate();
                    // 关闭子页
                    lockeThis.slaveYear.style.display = 'none';
                    lockeThis.slaveMonth.style.display = 'none';
                    // 把当前日期输出至输入框中
                    lockeThis.myInput.value = lockeThis.getYear() + '-' + lockeThis.getMonth() + '-' + lockeThis.getToday();
                    // 刷新 MASTER 页
                    refreshMaster();
                    break;
                case 'locke-d-m-f-i-button-3':
                    // 确定
                    // 关闭子页
                    lockeThis.slaveYear.style.display = 'none';
                    lockeThis.slaveMonth.style.display = 'none';
                    // 把日期输出至输入框中
                    lockeThis.myInput.value = lockeThis.getYear() + '-' + lockeThis.getMonth() + '-' + lockeThis.getToday();
                    break;
                case 'locke-d-m-h-i-b-year':
                    // MASTER 页年份框
                    lockeThis.slaveYear.style.display = 'block';
                    // 刷新 SLAVE YEAR 页
                    refreshSlaveYear();
                    break;
                case 'locke-d-m-h-i-b-month':
                    // MASTER 页月份框
                    lockeThis.slaveMonth.style.display = 'block';
                    // 刷新 SLAVE MONTH 页
                    refreshSlaveMonth();
                    break;
                case 'locke-y-s-h-i-button-1':
                    // SLAVE YEAR 页上一页
                    lockeThis.setYear(lockeThis.getYear() - 12);
                    // 刷新 SLAVE MONTH 页
                    refreshSlaveYear();
                    break;
                case 'locke-y-s-h-i-button-2':
                    // SLAVE YEAR 页下一页
                    lockeThis.setYear(lockeThis.getYear() + 12);
                    // 刷新 SLAVE YEAR 页
                    refreshSlaveYear();
                    break;
                case 'locke-m-s-h-i-button-1':
                    // SLAVE MONTH 页上一页
                    lockeThis.setYear(lockeThis.getYear() - 1);
                    // 刷新 SLAVE MONTH 页
                    refreshSlaveMonth();
                    break;
                case 'locke-m-s-h-i-button-2':
                    // SLAVE MONTH 页下一页
                    lockeThis.setYear(lockeThis.getYear() + 1);
                    // 刷新 SLAVE MONTH 页
                    refreshSlaveMonth();
                    break;
                default:
                    break;
            }
        });

        // MASTER 页列表项点击事件
        for (let i = 0; i < lockeThis.masterLists.length; i++) {
            lockeThis.masterLists[i].addEventListener('click', function () {
                // 当前列表项所对应的日期
                let date = this.dataset.date;

                // 重置class
                for (let j = 0; j < lockeThis.masterLists.length; j++) {
                    lockeThis.masterLists[j].classList.remove('locke-d-m-b-li-show');
                }

                // 渲染点击列表
                this.classList.add('locke-d-m-b-li-show');

                // 把列表项的日期输出至输入框
                lockeThis.myInput.value = date;
                // 保存年份
                lockeThis.setYear(new Date(date).getFullYear());
                // 保存月份
                lockeThis.setMonth(new Date(date).getMonth() + 1);
                // 保存日子
                lockeThis.setToday(new Date(date).getDate());
            });
        }

        // SLAVE YEAR 页列表项点击事件
        for (let i = 0; i < lockeThis.slaveYearLists.length; i++) {
            lockeThis.slaveYearLists[i].addEventListener('click', function () {
                // 保存年份
                lockeThis.setYear(this.dataset.year);
                // 关闭子页
                lockeThis.slaveYear.style.display = 'none';
                // 刷新 MASTER 函数
                refreshMaster();
            });
        }

        // SLAVE MONTH 页列表项点击事件
        for (let i = 0; i < lockeThis.slaveMonthLists.length; i++) {
            lockeThis.slaveMonthLists[i].addEventListener('click', function () {
                // 保存年份，因为页面中是字符串，所以转换，去除‘年’字
                lockeThis.setYear(lockeThis.slaveMonthYearBox.innerHTML);
                // 保存月份
                lockeThis.setMonth(this.dataset.month);
                // 关闭子页
                lockeThis.slaveMonth.style.display = 'none';
                // 刷新 MASTER 函数
                refreshMaster();
            });
        }

        // 封装 MASTER 主函数
        function refreshMaster() {
            // 本年
            let year = lockeThis.getYear();
            // 本月
            let month = lockeThis.getMonth();

            // 填充 MASTER 页的日期框
            lockeThis.setDateBoxOfMaster();

            // 重置class
            for (let i = 0; i < lockeThis.masterLists.length; i++) {
                lockeThis.masterLists[i].classList.remove('locke-d-m-b-li-show');
                lockeThis.masterLists[i].classList.remove('locke-d-m-b-li-prer');
                lockeThis.masterLists[i].classList.remove('locke-d-m-b-li-next');
                lockeThis.masterLists[i].classList.remove('locke-d-m-b-li-curr');
            }

            // 渲染上一个月
            // 上一个月的有效天数
            let previousMonthDays = lockeThis.getDaysOfPreviousMonth(year, month);
            // 上一年
            let previousYear = lockeThis.getPreviousYearAndMonth(year, month).year;
            // 上一月
            let previousMonth = lockeThis.getPreviousYearAndMonth(year, month).month;

            // i控制数据索引，j控制位置索引
            for (let i = 0, j = 0; i < previousMonthDays.length; i++, j++) {
                lockeThis.masterLists[j].innerHTML = previousMonthDays[i];
                lockeThis.masterLists[j].classList.add('locke-d-m-b-li-prer');
                lockeThis.masterLists[j].dataset.date = previousYear + '-' + previousMonth + '-' + previousMonthDays[i];
            }

            // 渲染本月
            // 本月的天数
            let currentMonthDays = lockeThis.getDaysOfCurrentMonth(year, month);
            // 当天
            let today = lockeThis.getToday();
            // 开始位置
            let startPositionOfCurrentMonth = lockeThis.getFirstDayOfWeek(year, month);

            // i控制数据索引，j控制位置索引
            for (let i = 0, j = startPositionOfCurrentMonth; i < currentMonthDays.length; i++, j++) {
                lockeThis.masterLists[j].innerHTML = currentMonthDays[i];
                lockeThis.masterLists[j].classList.add('locke-d-m-b-li-curr');
                lockeThis.masterLists[j].dataset.date = year + '-' + month + '-' + currentMonthDays[i];
            }

            // 获取本月的列表项，因为本月的class是动态赋值，不能直接在对象中定义引用
            lockeThis.masterCurrentMonthLists = document.querySelectorAll('.locke-d-m-b-li-curr');

            // 渲染当天的样式
            let style = false;

            for (let i = 0; i < lockeThis.masterCurrentMonthLists.length; i++) {
                let target = lockeThis.masterCurrentMonthLists[i];

                if (parseInt(target.innerHTML) === today) {
                    style = true;
                    break;
                } else {
                    style = false;
                }
            }

            if (style) {
                for (let i = 0; i < lockeThis.masterCurrentMonthLists.length; i++) {
                    let target = lockeThis.masterCurrentMonthLists[i];

                    if (parseInt(target.innerHTML) === today) target.classList.add('locke-d-m-b-li-show');
                }
            } else {
                // 如果其他月没有当天，那么就渲染第一天
                lockeThis.masterCurrentMonthLists[0].classList.add('locke-d-m-b-li-show');
            }

            // 渲染下一个月
            // 下一个月有效数据
            let nextMonthDays = lockeThis.getDaysOfNextMonth(year, month);
            // 下一年
            let nextYear = lockeThis.getNextYearAndMonth(year, month).year;
            // 下一月
            let nextMonth = lockeThis.getNextYearAndMonth(year, month).month;
            // 开始位置
            let startPositionOfNextMonth = previousMonthDays.length + currentMonthDays.length;

            // i控制数据索引，j控制位置索引
            for (let i = 0, j = startPositionOfNextMonth; i < nextMonthDays.length; i++, j++) {
                lockeThis.masterLists[j].innerHTML = nextMonthDays[i];
                lockeThis.masterLists[j].classList.add('locke-d-m-b-li-next');
                lockeThis.masterLists[j].dataset.date = nextYear + '-' + nextMonth + '-' + nextMonthDays[i];
            }
        }

        // 封装 SLAVE YEAR 主函数
        function refreshSlaveYear() {
            // start
            let startYear = lockeThis.getYear() - 7;

            // 填充 SLAVE YEAR 页的两个年份框
            lockeThis.setDateBoxOfSlaveYear();

            // 渲染，i控制数据，j控制索引
            for (let i = startYear, j = 0; j < lockeThis.slaveYearLists.length; i++, j++) {
                lockeThis.slaveYearLists[j].innerHTML = i + '年';
                lockeThis.slaveYearLists[j].dataset.year = i;
            }
        }

        // 封装 SLAVE MONTH 主函数
        function refreshSlaveMonth() {
            // 本月
            let month = lockeThis.getMonth();

            // 填充 SLAVE MONTH 页的年份框
            lockeThis.setDateBoxOfSlaveMonth();

            // 重置class样式
            for (let i = 0; i < lockeThis.slaveMonthLists.length; i++) {
                lockeThis.slaveMonthLists[i].classList.remove('locke-m-s-b-show');
            }

            // 渲染
            for (let i = 0; i < lockeThis.slaveMonthLists.length; i++) {
                let target = parseInt(lockeThis.slaveMonthLists[i].dataset.month);

                if (target === month) {
                    lockeThis.slaveMonthLists[i].classList.add('locke-m-s-b-show');
                }
            }
        }
    },
    /** 检测y是否是闰年，返回一个布尔值，true表示是，false表示不是 */
    isLeapYear: function (y) {
        // 年份
        let year = parseInt(y);

        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    },
    /** 返回m月在y年中一共有几天，返回天数 */
    getDays: function (y, m) {
        // 年份
        let year = parseInt(y);
        // 月份
        let month = parseInt(m);
        // 天数
        let days = 0;

        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                days = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                days = 30;
                break;
            default:
                if (this.isLeapYear(year) && month === 2) days = 29;
                else days = 28;
                break;
        }

        return days;
    },
    /** 返回m月在y年中的第一天是星期几，返回星期 */
    getFirstDayOfWeek: function (y, m) {
        // 年份
        let year = parseInt(y);
        // 月份
        let month = parseInt(m);
        // 日期字符串
        let date = year + '-' + month + '-1';
        // 每月的第一天是星期几
        let week = new Date(date).getDay();

        return week;
    },
    /** 返回上一个月的有效天数，有效天数：即在页面中显示的天数，返回一个数组，保存有效天数 */
    getDaysOfPreviousMonth: function (y, m) {
        // 本年
        let year = parseInt(y);
        // 本月
        let month = parseInt(m);
        // 上一年
        let previousYear = this.getPreviousYearAndMonth(year, month).year;
        // 上一月
        let previousMonth = this.getPreviousYearAndMonth(year, month).month;
        // 上一月的天数
        let days = this.getDays(previousYear, previousMonth);
        // 本月第一天是星期几
        let week = this.getFirstDayOfWeek(year, month);
        // 上一月的有效天数
        let effectiveDays = new Array();

        // 把有效天数保存在数组中，i控制数据，j控制数量
        for (let i = days, j = 0; j < week; i--, j++) {
            effectiveDays.unshift(i);
        }

        return effectiveDays;
    },
    /** 返回本月的天数，返回一个数组，保存有效天数*/
    getDaysOfCurrentMonth: function () {
        // 本年
        let year = this.getYear();
        // 本月
        let month = this.getMonth();
        // 本月天数
        let days = this.getDays(year, month);
        // 有效天数
        let effectiveDays = new Array();

        // 保存有效天数，i控制天数
        for (let i = 1; i <= days; i++) {
            effectiveDays.push(i);
        }

        return effectiveDays;
    },
    /** 返回下一个月的有效天数，返回一个数组，保存有效天数 */
    getDaysOfNextMonth: function (y, m) {
        // 本年
        let year = parseInt(y);
        // 本月
        let month = parseInt(m);
        // 上一个月的有效天数
        let previousMonthDays = this.getDaysOfPreviousMonth(year, month).length;
        // 本月的有效天数
        let currentMonthDays = this.getDaysOfCurrentMonth().length;
        // 列表项总数
        let listTotal = this.masterLists.length;
        // 下一个月的有效天数
        let nextMonthDays = listTotal - currentMonthDays - previousMonthDays;
        // 有效天数
        let effectiveDays = new Array();

        // 保存有效天数
        for (let i = 1; i <= nextMonthDays; i++) {
            effectiveDays.push(i);
        }

        return effectiveDays;
    },
    /** 返回上一年和上一月，返回一个对象，year表示上一年，month表示上一月 */
    getPreviousYearAndMonth: function (y, m) {
        // 年份
        let year = parseInt(y);
        // 月份
        let month = parseInt(m);
        // 被返回的数据
        let o = new Object();
        o.year = month === 1 ? year - 1 : year;
        o.month = month === 1 ? 12 : month - 1;

        return o;
    },
    /** 返回下一年和下一月，返回一个对象，year表示下一年,month表示下一月 */
    getNextYearAndMonth: function (y, m) {
        // 年份
        let year = parseInt(y);
        // 月份
        let month = parseInt(m);
        // 被返回的数据
        let o = new Object();
        o.year = month === 12 ? year + 1 : year;
        o.month = month === 12 ? 1 : month + 1;

        return o;
    },
    /** 返回年份 */
    getYear: function () {
        return this.year;
    },
    /** 返回月份 */
    getMonth: function () {
        return this.month;
    },
    /** 返回日子 */
    getToday: function () {
        return this.today;
    },
    /** 设置 MASTER 页的日期框（年份框和月份框） */
    setDateBoxOfMaster: function () {
        // 年份
        let year = this.getYear();
        // 月份
        let month = this.getMonth();

        this.masterYearBox.innerHTML = year + '年';
        this.masterMonthBox.innerHTML = month + '月';
    },
    /** 设置 SLAVE - YEAR 页的两个年份框 */
    setDateBoxOfSlaveYear: function () {
        // 本年
        let year = this.getYear();
        // start
        let startYear = year - 7;
        // end
        let endYear = year + 7;

        this.slaveYearStartYearBox.innerHTML = startYear + '年';
        this.slaveYearEndYearBox.innerHTML = endYear + '年';
    },
    /** 设置 SLAVE - MONTH 页的年份框 */
    setDateBoxOfSlaveMonth: function () {
        // 本年
        let year = this.getYear();

        this.slaveMonthYearBox.innerHTML = year + '年';
    },
    /** 设置年份 */
    setYear: function (y) {
        // 对参数进行转换
        let year = parseInt(y);
        this.year = year;
    },
    /** 设置月份 */
    setMonth: function (m) {
        // 对参数进行转换
        let month = parseInt(m);
        this.month = month;
    },
    /** 设置日子 */
    setToday: function (d) {
        // 对参数进行数值转换
        let today = parseInt(d);
        this.today = today;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var date = new LockeDate();
    date.main();
});