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
        },
        copyText        : function () {
            const textarea = document.createElement('textarea');
            textarea.value = this.placeHolder;
            document.body.appendChild(textarea);
            textarea.select();

            const successful = document.execCommand('copy');
            const msg        = successful ? '成功' : '未成功';
            console.log('复制 ' + msg);
            document.body.removeChild(textarea);
        }
    }
})

