var app = new Vue({
    el: '#app',
    data:{
        product: 'Socks',
        message: 'helloworld',
        image: 'socks-white.jpg',
        url: 'http://www.google.com',
        inventory: 0,
        onSale: true,
        details: ["70% cotton","30% spandex"],
        variants:[
            {
                variantId: 2234,
                variantColor: 'green'
            },
            {
                variantId: 2235,
                variantColor: 'blue'
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        }
    }
})
