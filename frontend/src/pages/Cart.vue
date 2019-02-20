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
            </thead>
            <tr v-for= 'field in cartitem' :key = field.key>
                <td><img v-bind:src = "`./static/productpics/${field.id}.jpg`" class = 'image is-64x64'/></td>
                <td>{{field.name}}</td>
                <td>{{field.brand}}</td>
                <td>
                    <span class = 'is-link tag button' @click = 'updatecart(field.id, field.quantity)'>Update</span>
                    <input size = 3 maxlength = 3 text = '1' v-model='field.quantity'> 
                    <span class = 'is-danger tag'> Delete
                        <button class = 'delete' @click = 'removefromcart(field.id)'>
                        </button>
                    </span>
                </td>
                
                <td>₦{{field.price}}</td>
                <td></td>
                
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
            orderqty: 1,
            deleteurl: ''
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
        removefromcart: function(query) {
            console.log("REMOVE " + query);
            this.deleteurl = 'shoppingcart/' + sessionStorage.cartid + '/product/' + query;
            api.delete(this.deleteurl);
            window.location.reload();
        },
        updatecart: function(id, quantity) {
            console.log("Product instance id: ", id, "\nProduct quantity: ", quantity);
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