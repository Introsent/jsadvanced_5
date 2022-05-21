const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        filtered: [],
        searchLine: "",
        show: true,
        activeClass: '0',
        isVisibleCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product);
        },

        filterGoods(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.products.forEach(product => {
                const block = document.getElementById(product.id_product);
                !this.filtered.includes(product) ? block.classList.add('invisible') : block.classList.remove('invisible');
            })
        }

    },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    computed: {
        getValue() {
            return {
                searchLine: `${this.searchLine}`,
            }
        },

    }
});
