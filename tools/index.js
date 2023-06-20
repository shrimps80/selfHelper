new Vue({
    el     : '#pageContainer',
    data   : {
        manifest: {},
    },
    created: function () {
        this.manifest = chrome.runtime.getManifest();
    },
    methods: {
        open(name) {
            chrome.tabs.create({
                url: name + "/index.html"
            });
        }
    }
});