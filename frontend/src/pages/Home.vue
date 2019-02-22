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
        <product-card :productid = 'productlistings[0].productid' 
        :key = 'productlistings[0].id' 
        :name = 'productlistings[0].name' :desc = 'productlistings[0].description' :brand = 'productlistings[0].brand' :price = 'productlistings[0].price'>
        </product-card>
        <product-card :productid = 'productlistings[3].productid' :key = 'productlistings[3].id' 
        :name = 'productlistings[3].name' :desc = 'productlistings[3].description' :brand = 'productlistings[3].brand' :price = 'productlistings[3].price'>
        </product-card>
        <product-card :productid = 'productlistings[4].productid' :key = 'productlistings[4].id' 
        :name = 'productlistings[4].name' :desc = 'productlistings[4].description' :brand = 'productlistings[4].brand' :price = 'productlistings[4].price'>
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
                subtitle: 'Purchases are free, shipping is instant'
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
    padding: 2em 10%;
}

.header-image{
    background-image: url("https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #999;
    margin-bottom: 10%
}
</style>