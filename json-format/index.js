new Vue({
    el: '#pageContainer',
    data: {
        rawJson: '',
        formattedJson: '',
        errorMsg: ''
    },
    methods: {
        format() {
            try {
                const parsedJson = this.parseJson(this.rawJson);
                this.formattedJson = this.renderJsonNode(parsedJson);
                this.errorMsg = '';
                this.$nextTick(() => {
                    this.setupToggleHandlers();
                });
            } catch (e) {
                this.errorMsg = e.message;
                this.formattedJson = '';
            }
        },

        parseJson(json) {
            // 去转义
            json = json.replace(/\\"/g, '"');
            // 解码Unicode
            json = json.replace(/\\u([\da-f]{4})/ig, function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            });
            return JSON.parse(json);
        },

        renderJsonNode(node, level = 0) {
            if (node === null) return '<span class="json-null">null</span>';
            if (typeof node === 'boolean') return `<span class="json-boolean">${node}</span>`;
            if (typeof node === 'number') return `<span class="json-number">${node}</span>`;
            if (typeof node === 'string') return `<span class="json-string">"${this.escapeHtml(node)}"</span>`;

            const isArray = Array.isArray(node);
            const items = isArray ? node : Object.entries(node);
            const nodeId = 'node-' + Math.random().toString(36).substr(2, 9);

            if (items.length === 0) {
                return isArray ? '[]' : '{}';
            }

            let html = `<span class="toggle-btn" data-target="${nodeId}">▼</span>${isArray ? '[' : '{'}`;
            html += `<div class="collapsible" id="${nodeId}">`;

            items.forEach((item, index) => {
                const [key, value] = isArray ? [index, item] : item;
                html += '<div>';
                if (!isArray) {
                    html += `<span class="json-key">"${this.escapeHtml(key)}"</span>: `;
                }
                html += this.renderJsonNode(value, level + 1);
                if (index < items.length - 1) html += ',';
                html += '</div>';
            });

            html += `</div>${isArray ? ']' : '}'}`;
            return html;
        },

        escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        setupToggleHandlers() {
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                if (!btn.hasListener) {
                    btn.addEventListener('click', () => {
                        const targetId = btn.getAttribute('data-target');
                        const target = document.getElementById(targetId);
                        const isHidden = target.classList.toggle('hidden');
                        btn.textContent = isHidden ? '▶' : '▼';
                    });
                    btn.hasListener = true;
                }
            });
        },

        copyText() {
            const textarea = document.createElement('textarea');
            textarea.value = this.rawJson;
            document.body.appendChild(textarea);
            textarea.select();

            const successful = document.execCommand('copy');
            const msg = successful ? '成功' : '未成功';
            console.log('复制 ' + msg);
            document.body.removeChild(textarea);
        }
    }
});

