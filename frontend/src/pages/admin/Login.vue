<template>
    <div class = 'container'>
        <div class = 'title'>
            <h1>{{message}}</h1>
            {{message2}}
        </div>
        <div id = 'details'>
            <p>Username: admin</p>
            <p>Password: admin</p>
        </div>
        <div id = 'login'>
            <textfield v-model = 'usern' :label = "userlabel" :inputtypeclass= "textin" @keyup.enter = 'adminlogin()'></textfield>
            <passwordfield v-model = 'pass' :label = "passlabel" :inputtypeclass= "passin" @keyup.enter = 'adminlogin()'></passwordfield>
            <div id = 'action'><button @click = 'adminlogin()' class = 'button is-success' :class = 'buttonstate'>Login</button></div>
        </div>
    </div>
</template>

<script>
    import FormTextField from "../../components/FormTextField"
    import FormPasswordField from "../../components/FormPasswordField"
    import {api} from '../../gateways/api'
    export default {
        name: 'home',
        components: {
            "textfield": FormTextField,
            "passwordfield": FormPasswordField
        },
        data() {
            return {
                message: 'Welcome to the Admin panel.',
                message2: 'Log in below.',
                userlabel: 'Username: admin',
                passlabel: 'Password: admin',
                usern: "",
                pass: "",
                textin: "text",
                passin: "password",
                buttonstate: ''
            }
        },
        methods: {
            adminlogin: function() {
                this.buttonstate = 'is-loading';
                api.post('/admin/login', {
                    username: this.usern,
                    password: this.pass,
                    userlevel: 'admin'
                })
                .then(
                    response=>{
                    console.log(response.data);
                    if(response.data === true) {
                        this.$router.push({path: '/admin/products'})
                    }});
            }
        }
    }
</script>

<style scoped>

#details {
    text-align: right;
}
#login {
    border: 1px solid grey;
    padding: 3em;
    width: fit-content;
    margin: auto;
}
#action {
    text-align: center;
}
#action button {
    padding: 0.5em;
}
.container {
    padding: 2em;
}
</style>