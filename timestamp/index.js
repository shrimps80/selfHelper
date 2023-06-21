new Vue({
    el     : '#pageContainer',
    data   : {
        formatter  : 'yyyy-MM-dd hh:mm:ss',
        txtNowDate : (new Date()).toLocaleString(),
        txtNowS    : Math.round((new Date()).getTime() / 1000),
        curGMT     : (new Date()).getTimezoneOffset() / 60 * -1,
        txtSrcStamp: '',
        txtDesDate : '',
        txtLocale  : '',
        txtDesStamp: '',
    },
    mounted: function () {
        this.startTimestamp();
    },
    methods: {
        formatDate: function (date, fmt) {
            let o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S" : date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },

        startTimestamp: function () {
            window.intervalId = window.setInterval(() => {
                let localDate = new Date();
                let gmtTime   = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
                let nowDate   = new Date(gmtTime.getTime() + this.curGMT * 60 * 60000);

                this.txtNowDate = this.formatDate(nowDate, this.formatter);
                this.txtNowS    = Math.round(nowDate.getTime() / 1000);
            }, 1000);
        },

        //Unix时间戳 转 当地时间
        stampToLocale() {
            if (this.txtSrcStamp.length === 0) {
                alert('请先填写你需要转换的Unix时间戳');
                return;
            }
            if (!parseInt(this.txtSrcStamp, 10)) {
                alert('请输入合法的Unix时间戳');
                return;
            }
            let DesDate = new Date(parseInt(this.txtSrcStamp, 10) * 1000 + ((new Date()).getTimezoneOffset() + this.curGMT * 60) * 60000)

            this.txtDesDate = this.formatDate(DesDate, this.formatter);
        },

        //当地时间 转 Unix时间戳
        localeToStamp() {
            if (this.txtLocale && !/\s\d+:\d+:\d+/.test(this.txtLocale)) {
                this.txtLocale += ' 00:00:00';
            }
            let locale = (new Date(Date.parse(this.txtLocale) - ((new Date()).getTimezoneOffset() + this.curGMT * 60) * 60000)).getTime();
            if (isNaN(locale)) {
                alert('请输入合法的时间格式，如：2014-04-01 10:01:01，或：2014-01-01');
            }
            this.txtDesStamp = Math.round(locale / 1000);
        }
    }
})