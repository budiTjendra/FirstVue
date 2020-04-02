Vue.component('product',{
    template: `
        <div class="product">
           <span v-show="onSale"><h1 style="color:red">ON SALE!</h1></span>
            <div class="product-image">
                <img :src="image"/>
            </div>
            <div class="product-info" >
                <h1>{{ title }}</h1>
                <p>{{ inventoryStatus}}</p>
                
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                
                <div  v-for="(variant, index) in variants"
                      :key="variant.variantId"
                      class="color-box"
                      @mouseover="updateProduct(index)"
                      :style="{backgroundColor: variant.variantColor}"
                >
                </div>
        
                <div class="cart">
                    <p>Cart({{cart}})</p>       
                </div>      
                
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
                <button @click="removeOne">-</button>                          
            </div>
    

    

    

            <div>
                <a :href="url" target="_blank">Google</a>
            </div>
        </div>
    `,
    data: function() {
        return {
            brand: 'BATA',
            product: 'Socks',
            message: 'helloworld',
            url: 'http://www.google.com',
            selectedVariant: 0,
            onSale: false,
            details: ["70% cotton", "30% spandex"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: 'images/socks-white.jpg',
                    variantQuantity: 0,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: 'images/socks-blue.jpg',
                    variantQuantity: 12
                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        removeOne() {
            if (this.cart > 0)
                this.cart -= 1
        }
    },
    computed: {
        title: function () {
            const brandProduct = this.brand + ' ' + this.product
            if (this.onSale)
                return brandProduct + ' is on sale'

            return brandProduct
        },
        inventoryStatus: function () {
            if (this.inventory > 10)
                return 'In Stock'
            else if (this.inventory <= 10 && this.inventory > 0)
                return 'Running out of stock'
            else
                return 'out of stock'
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory: function () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity > 0
        }
    }
})

var app = new Vue({
    el: '#app',

})
