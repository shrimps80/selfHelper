new Vue({
    el     : '#pageContainer',
    data   : {
        rawText    : '',
        placeHolder: '',
        errorMsg   : ''
    },
    methods: {
        toCamelCase     : function () {
            try {
                this.placeHolder = this.rawText.replace(/_(\w)/g, function (match, p1) {
                    return p1.toUpperCase();
                });
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toUpperCase     : function () {
            try {
                this.placeHolder = this.titleCase(this.rawText);
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        titleCase(str) {
            var result = str.split('\n');
            for (var i = 0 ; i < result.length ; i++) {
                var line  = result[i];
                line      = line.trim();   // 去除首尾空格
                result[i] = line.charAt(0).toUpperCase() + line.slice(1);
            }
            return result.join('\n');
        },
        toSnakeCase     : function () {
            try {
                this.placeHolder = this.rawText.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toUrlEncode     : function () {
            try {
                this.placeHolder = encodeURIComponent(this.rawText);
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toUrlDecode     : function () {
            try {
                this.placeHolder = decodeURIComponent(this.rawText);
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toPhpUnserialize: function () {
            try {
                this.placeHolder = PHPUnserialize.unserialize(this.rawText)
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toMysqlString   : function () {
            try {
                var result = this.rawText.split('\n');
                for (var i = 0 ; i < result.length ; i++) {
                    var line  = result[i];
                    line      = line.trim();   // 去除首尾空格
                    result[i] = "'" + line + "',"
                }
                this.placeHolder = result.join('\n');
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        toPostman       : function () {
            var result = [];
            var params = this.rawText.split('&');
            for (var i = 0 ; i < params.length ; i++) {
                var line  = decodeURIComponent(params[i]);
                result[i] = line.replace(/=(.+)/, ':$1')
            }
            this.placeHolder = result.join('\n');
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