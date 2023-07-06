new Vue({
    el     : '#pageContainer',
    data   : {
        rawJson    : '',
        placeHolder: '',
    },
    methods: {
        format: function () {
            this.placeHolder = this.formatJson(this.rawJson)
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

