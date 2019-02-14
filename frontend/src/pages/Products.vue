<template>
    <div>
        <h1 class="title">
            <h1>{{message}}</h1>
        </h1>
        <div class = 'grid'>
            <product-card v-for = 'product in productlistings' :productid = 'product.id' :key = 'product.id' 
            :name = 'product.name' :pix = 'product.pix' :desc = 'product.description' :brand = 'product.brand' :price = 'product.price'>
            </product-card>
        </div>
    </div>
</template>

<script>
import {api} from '../gateways/api'
import ProductCard from '../components/ProductCard.vue'
export default {
    name: 'home',
    components: {   
        'product-card': ProductCard
    },
    data() {
        return{ 
            productlistings: 0,
            message: 'All Products'
        }
    },
    created() {
        api.get('/products').
        then(response => {
            var self = this;
            self.productlistings=response.data;
        });
        console.log(this.productlistings);
    },
    methods: {
        
    }
}
</script>

<style>
.grid {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 10%;
}
</style>