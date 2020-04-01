var app = new Vue({
    el: '#app',
    data:{
        product: 'Socks',
        message: 'helloworld',
        image: 'images/socks-white.jpg',
        url: 'http://www.google.com',
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
        updateProduct: function(variantImage) {
            this.image = variantImage
        },
        removeOne() {
            if (this.cart > 0)
                this.cart -= 1
        }
    }
})
