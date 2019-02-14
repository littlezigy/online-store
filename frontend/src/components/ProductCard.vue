s<template>
    <div class = 'box product'>
        <p class = 'productname'>{{name}}</p>
        <img v-bind:src = "`./static/productpics/${productid}.jpg`"/>
        <router-link :to = "'view-product/' + productid" style = 'a {color: black;}'>
            <div class = 'productsummary'>
                <p class = 'brand'>{{brand}}</p>
                {{summary}}
            </div>
        </router-link>
            <div class = 'level'>
                <p class = 'level-left'>₦ {{price}}</p>
                <button class  = 'button is-success level-right' :class = 'buttonstate' @click = 'addToCart()'>Add to Cart</button>
            </div>
    </div>
</template>

<script>
import {api} from '../gateways/api'
export default {
    name: 'productcard',
    data () {
        return {
            summary: "",
            buttonstate: ''
        }
    },
    props: ['name', 'brand', 'desc', 'productid', 'price'],
    methods: {
        addToCart() {
            if(window.sessionStorage.uid == undefined) {
                this.$router.push({path: "/login"});
            }
            this.buttonstate = 'is-loading';
            //push product id to user's cart
            api.post('/addtocart', {productid: this.productid})
            .then(response => {
                self = this;
                window.sessionStorage.cartid = response.data.id;
                setTimeout(function() {self.buttonstate = '';console.log("Ping!");}, 500);
            });
        },
        summarize(wordy) {
            var trimmed = wordy.replace(/^(.{60}[^\s]*).*/, "$1");
            return trimmed;
        }
    },
    created () {
        this.summary = this.summarize(this.desc);
    } 
}
</script>

<style scoped>
.product{
    width: 250px;
    height: 400px;
    margin: 0 auto;
}
.product img{
    height: 50%;
    width: 100%;
}

.productname {
    font-size: 18px;
    text-align: center;
    padding-bottom: 0;
    margin-bottom: 0;
}

.productsummary {
    margin-top: 0;
    font-size: 14px;
    padding: 0 0.5em;
}

.brand {
    font-size: 12px;
    text-align: right;
    text-transform: uppercase;
    color: grey;
    margin: 0 auto;
}
</style>