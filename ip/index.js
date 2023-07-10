new Vue({
    el  : '#pageContainer',
    data: {
        ip: '',
    },
    mounted() {
        fetch('https://ipv4.icanhazip.com/')
            .then(res => res.text())
            .then(ip => {
                this.ip = ip
            })
    }
})