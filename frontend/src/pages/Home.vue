<template><div>
    <section class="hero header-image is-large">
        <div class="hero-body">
            <div class="container">
                <h1 class= "title has-text-white">{{message}}</h1>
                <h2 class= "subtitle has-text-white">
                    {{subtitle}}
                </h2>
            </div>
        </div>
    </section>

    <div id = 'store-banners'>        
        <div class = 'mini-banner'>
        </div>
    </div>
    <h3 class = 'subtitle is-1' style ="text-align: center;">Best Performing Items</h3>
    <div class = 'grid'>
        <product-card v-for = 'product in productlistings' :productid = 'product.id' :key = 'product.id' 
        :name = 'product.name' :desc = 'product.description' :brand = 'product.brand' :price = 'product.price'>
        </product-card>
    </div>
</div></template>

<script>
    //import dotenv from 'dotenv'
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
                message: 'Demo Online Store. Everything is sold here!',
                subtitle: 'Purchases are free, shipping is instant',
                productid: []
            }
        },
        created() {
            api.get('/products').
            then(response => {
                var self = this;
                self.productlistings=response.data;
            });
            console.log(process.env.NODE_ENV);
            console.log(process.env.TEST);
            console.log(process.env.VUE_APP_API);
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

.header-image{
    background-image: url("https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #999;
}
</style>