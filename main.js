
Vue.component('product-review', {
   template:`
      <form class="review-form" @submit.prevent="onSubmit">
          <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
          </p>
          
          <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
          </p>
          
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>
              
          <p>
            <input type="submit" value="Submit">  
          </p>    
        
        </form>
   `,
   data(){
       return {
           name: null,
           review: null,
           rating: null

       }
   },
    methods:{
       onSubmit(){

           let productReview = {
               name: this.name,
               review: this.review,
               rating: this.rating
           }
           this.$emit('add-review', productReview)
           this.name = null;
           this.review = null;
           this.rating = null;
       }
    }

});
Vue.component('productDetail', {
  props: {
      details: {
          type: Array,
          required: true
      },
  },
  template:`
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
  `,
  data() {
      console.log(this.detail)
      return {}
  }
});

Vue.component('product',{
    props: {
      premium:{
          type: Boolean,
          required: true
      },
    },
    template: `
           <div class="product">
                <div class="product-image">
                    <img :src="image"/>
                </div>
                <div class="product-info" >
                    <h1>{{ title }}</h1>
                    <p>{{ inventoryStatus}}</p>
                    <p>{{shipping}}</p>
                    <productDetail :details="details"></productDetail>
    
                    
                    <div  v-for="(variant, index) in variants"
                          :key="variant.variantId"
                          class="color-box"
                          @mouseover="updateProduct(index)"
                          :style="{backgroundColor: variant.variantColor}"
                    >                   
                    </div>
       
           
                    <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
                    <button @click="removeOne">-</button>     
                                 
                </div>
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                      <li v-for="review in reviews">
                      <p>{{ review.name }}</p>
                      <p>Rating: {{ review.rating }}</p>
                      <p>{{ review.review }}</p>
                      </li>
                    </ul>
               </div>                
                <product-review @add-review="addReview"></product-review>
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
                    variantQuantity: 20,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: 'images/socks-blue.jpg',
                    variantQuantity: 12
                }
            ],
            reviews: []
        }
    },
    methods: {
        removeOne() {
            if (this.cart > 0)
                this.cart -= 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        addToCart: function () {
            console.log('addToCard');
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        addReview: function(productReview){
            console.log('addReview', productReview)
            this.reviews.push(productReview)
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
        },
        shipping: function(){
            if (this.premium){
                return 'Free shipping'
            }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods:{
        updateCart(id){
            console.log({id})
            this.cart.push(id)
        },
    }
})
