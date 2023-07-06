new Vue({
    el     : '#pageContainer',
    data   : {
        rawJson    : '',
        placeHolder: '',
    },
    methods: {
        format: function () {
            this.placeHolder = JSON.stringify(JSON.parse(this.rawJson), null, 2)
        }
    }
})

