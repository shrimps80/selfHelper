new Vue({
    el     : '#pageContainer',
    data   : {
        rawJson    : '',
        placeHolder: '',
        errorMsg: ''
    },
    methods: {
        format: function () {
            try {
                this.placeHolder = this.formatJson(this.rawJson)
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        formatJson(json) {
            // 去转义/
            json = json.replace(/\\"/g, '"')

            // 解码Unicode
            json = json.replace(/\\u([\da-f]{4})/ig, function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16))
            })

            return JSON.stringify(JSON.parse(json), null, 2)
        }
    }
})

