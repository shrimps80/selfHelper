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
    }
})