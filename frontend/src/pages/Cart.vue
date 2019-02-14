<template>
    <div class = 'container'>
        <div class = 'title'>
            <h1>{{message}}</h1>
        </div>
        <div class = 'has-text-right'><router-link to = '/checkout' class = 'button is-large is-link'>
            Checkout
        </router-link></div>
        <table class = 'table is-striped is-bordered is-hoverable is-fullwidth'>
            <thead>
                <th style = 'width: 93px;'></th>
                <th>Product name</th>
                <th>Brand</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
            </thead>
            <tr v-for= 'field in cartitem' :key = field.key>
                <td><img v-bind:src = "`./static/productpics/${field.id}.jpg`" class = 'image is-64x64'/></td>
                <td>{{field.name}}</td>
                <td>{{field.brand}}</td>
                <td></td>
                <td>₦{{field.price}}</td>
                <td></td>
                <td><span class = 'is-danger tag delete' @click = 'removefromcart()'></span></td>
                
            </tr>
        </table>

        <table class = 'table'>
            <th>Total</th>
            <td>₦</td>
        </table>
        <div class = 'has-text-right'><router-link to = '/checkout' class = 'button is-large is-link'>
            Checkout
        </router-link></div>
    </div>
</template>

<script>
import {api} from '../gateways/api'
export default {
    name: 'home',
    data() {
        return {
            message: "",
            usercart: "",
            carturl: '',
            cartitem: {},
        }
    },
    methods: {
        getcart: function() {
            console.log('Click', window.sessionStorage.cartid, this.carturl);
            api.get(this.carturl).then(response => {
                var self = this;
                self.cartitem=response.data.product;
            });
        },
        checkout: function() {
            console.log("-------------------CHECKOUT-------------------------");
            api.post('/order', 
                {owner: window.sessionStorage.uid ,
                cart: window.sessionStorage.cartid})
        },
        removefromcart: function() {
            console.log("remove");
        }
    },
    computed: {
    },
    created() {
        console.log("-------------------CART--------------------");
        if(window.sessionStorage.uid == undefined) {
            console.log("Sorry. Not logged in. Can't do that");
            this.$router.push({path: "/login"});
        } else {
            this.carturl = '/shoppingcart/' + window.sessionStorage.cartid;
            this.message = window.sessionStorage.unameCaps + " Shopping Cart";
            console.log(this.usercart);
            this.getcart();
        }
    }
}
</script>

<style scoped>
    h1{
        text-align: center;
    }
</style>