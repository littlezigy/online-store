<template>
    <div class = 'container'>
        <div class = 'level'>
            <div class = 'level-left'><router-link to = '/cart' class = 'button is-primary'>Back</router-link></div>
            <div class = 'level-right'><a class = 'button is-success' @click = 'confirmorder()'>Confirm Order</a></div>
        </div>
        <p class = message>{{message}}</p>
        <div class = 'field'>
            <label class = 'label'>Please confirm your email address</label>
            <div class = 'control'>
                <input class = 'input' type = 'text' v-model= 'email' placeholder="Please put in your email address" >
            </div>
        </div>
        <div class = 'field'>
            <label class = 'label'>Please confirm your phone number</label>
            <div class = 'control'>
                <input class = 'input' type = 'text' v-model= 'phonenum' placeholder="Please put in your phone number" >
            </div>
        </div>
    </div>
</template>

<script>
import {api} from '../gateways/api'
export default {
    data() {
        return{
            name: 'Please put in your phone number',
            phonenum: window.sessionStorage.phone,
            email: window.sessionStorage.email,
            message: ''
        }
    },
    methods: {
        confirmorder: function() {
            api.post('/neworder',{
                user: window.sessionStorage.uid,
                cart: window.sessionStorage.cartid,
                email: this.email,
                phone: this.phonenum})
                .then(response =>{
                    console.log(response.data);
                    this.message = response.data;
                });
        }
    },
    created () {
        console.log("-------------------CHECKOUT--------------------");
        if(window.sessionStorage.uid == undefined) {
            console.log("Sorry. Not logged in. Can't do that");
            this.$router.push({path: "/login"});
        } else {
            this.carturl = '/shoppingcart/' + window.sessionStorage.cartid;
            console.log(this.usercart);
        }
    }
}
</script>
