var app = new Vue({
    el: '#app',
    data:{
        brand: 'BATA',
        product: 'Socks',
        message: 'helloworld',
        url: 'http://www.google.com',
        inStock:false,
        selectedVariant:0,
        inventory: 0,
        onSale: true,
        details: ["70% cotton","30% spandex"],
        variants:[
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage:'images/socks-white.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage:'images/socks-blue.jpg'
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function(index) {
            this.selectedVariant =  index
        },
        removeOne() {
            if (this.cart > 0)
                this.cart -= 1
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product
        },
        inventoryStatus: function() {
            if (this.inventory > 10)
                return 'In Stock'
            else if (this.inventory <= 10 && this.inventory > 0)
                return 'Running out of stock'
            else
                return 'out of stock'
        },
        image: function (){
            return this.variants[this.selectedVariant].variantImage
        }
    }
})
