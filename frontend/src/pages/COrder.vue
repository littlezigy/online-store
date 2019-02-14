<template>
    <div class = 'container'>
        <div class = 'level'>
            <div class = 'level-left'><router-link to = '/cart' class = 'button is-primary'>Back</router-link></div>
            <div class = 'level-right'><a class = 'button is-success' @click = 'confirmorder()'>Confirm Order</a></div>
        </div>
        <p class = 'title is-4'>Please put in your phone number</p>
        <div class = 'field'>
            <label class = 'label'>Please put in your phone number</label>
            <div class = 'control'>
                <input class = 'input' type = 'text' v-model= 'phonenum' placeholder="+2348012345678" >
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
            phonenum: ''
        }
    },
    methods: {
        confirmorder: function() {
            api.post('/neworder',{
                user: window.sessionStorage.uid,
                cart: window.sessionStorage.cartid,
                phone: this.phonenum});
        }
    },
    created () {
        console.log("-------------------CHECKOUT--------------------");
        if(window.sessionStorage.uid == undefined) {
            console.log("Sorry. Not logged in. Can't do that");
            this.$router.push({path: "/login"});
        } else {
            this.carturl = '/shoppingcart/' + window.sessionStorage.cartid;
            this.message = window.sessionStorage.unameCaps + " Shopping Cart";
            console.log(this.usercart);
        }
    }
}
</script>
