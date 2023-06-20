new Vue({
    el     : '#pageContainer',
    data   : {
        txtNowDate: (new Date()).toLocaleString(),
        txtNowS   : Math.round((new Date()).getTime() / 1000),
        curGMT    : (new Date()).getTimezoneOffset() / 60 * -1
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
            let formatter     = 'yyyy-MM-dd hh:mm:ss';
            window.intervalId = window.setInterval(() => {
                let localDate = new Date();
                let gmtTime   = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
                let nowDate   = new Date(gmtTime.getTime() + this.curGMT * 60 * 60000);

                this.txtNowDate = this.formatDate(nowDate, formatter);
                this.txtNowS    = Math.round(nowDate.getTime() / 1000);
            }, 1000);
        },


    }
})