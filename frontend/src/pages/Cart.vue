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
                <td><figure class = 'image is-64x64'><img v-bind:src = "`./static/productpics/${field.picid}.jpg`"/></figure></td>
                <td>{{field.name}}</td>
                <td>{{field.brand}}</td>
                <td>
                    <span class = 'is-link tag button' @click = 'updatecart(field.id, field.quantity)'>Update</span>
                    <input size = 3 maxlength = 3 text = '1' v-model='field.quantity'> 
                    <span class = 'is-danger tag button' @click = 'removefromcart(field.id)'> Delete
                        <button class = 'delete'>
                        </button>
                    </span>
                </td>
                
                <td>₦{{field.price}}</td>
                <td></td>
                
            </tr>
        </table>
        <span class = button @click = 'test()'>test</span>

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
        test: function() {
            this.$root.logout();
        },
        getcart: function() {
            console.log('Click', window.sessionStorage.cartid, this.carturl);
            api.get(this.carturl).then(response => {
                var self = this;
                self.cartitem=response.data.product;
            }).catch(error=> {
                console.log("Error");
            });
        },
        checkout: function() {
            self = this;
            console.log("-------------------CHECKOUT-------------------------");
            api.post('/order', 
                {owner: window.sessionStorage.uid ,
                cart: window.sessionStorage.cartid})
                .catch(error=> {
                    console.log("Error. Signing out");
                    api.get('/user/logout');
                    window.sessionStorage.clear();
                    window.location.reload();
                })
        },
        removefromcart: function(query) {
            console.log("REMOVE " + query);
            this.deleteurl = '/productitem/' + query;
            api.delete(this.deleteurl);
            window.location.reload();
        },
        updatecart: function(id, quantity) {
            var productinstanceurl = '/productitem/' +  id;
            console.log("Product instance id: ", id, "\nProduct quantity: ", quantity, '\n', productinstanceurl);
            api.patch(productinstanceurl, {
                quantity: quantity
            })
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