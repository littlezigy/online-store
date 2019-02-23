<template>
    <div>
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
    </div>
</template>

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
            }
        },
        created() {
            
            /*----------------List products on frontpage------------------------*/
            api.get('/products').
            then(response => {
                var self = this;
                self.productlistings=response.data;
            });

            /*-------------------Testing environment variables-----------------------*/
            console.log(process.env.NODE_ENV);
            console.log(process.env.TEST);
            console.log(process.env.VUE_APP_API);
            
        },
        mounted() {
            /**--------------------Create Frontpage banner------------------ */
            document.body.className = 'home';
            var herohome = document.getElementById('banner');
            herohome.innerHTML += 
            '<div id = "herobody" class="hero-body">\
                <div class="container">\
                    <p class= "title has-text-white">Demo Online Store. Everything is sold here!</p>\
                    <p class= "subtitle has-text-white">Purchases are free, shipping is instant</p>\
                </div>\
            </div>';
            herohome.classList = 'hero header-image is-large';
        },

        beforeDestroy() {
            /*----------------Destroy frontpage banner---------------------*/
            var herohome = document.getElementById('banner');
            herohome.classList = '';
            var herobody = document.getElementById('herobody');
            herohome.removeChild(herobody)
        }
    }
</script>

<style>
.header-image{
    background-image: url("~@/assets/banner.jpeg");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #999;
    margin-bottom: 10%
}
</style>