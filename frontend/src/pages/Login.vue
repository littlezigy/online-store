<template>
    <div class = 'container'>
        <div class = 'title'>
            <h1>{{message}}</h1>
        </div>
        <div class = 'tabs is-centered'>
            <ul>
                <li :class = "{'is-active': loginIsActive}"><a @click = 'togglelogin()'>Login</a></li>
                <li :class = "{'is-active': createIsActive}"><a @click = 'togglecreate()'>Create Account</a></li>
            </ul>
        </div>

        <div class = 'error' v-if = 'error'>{{errors}}</div>

        <div id = 'logincontainer'>
            <transition name= 'slide-fade'>
                <div class = 'field box' v-if='showlogin' key = 'logindiv'>
                    <label class = 'label'>Username or email:</label>
                    <div class = 'control'><input class = 'input is-primary' type = 'text' v-model= 'usern' v-on:keyup.enter = 'login()'></div>
                    
                    <label class = 'label'>Password</label>
                    <div class = 'control'><input class = 'input is-primary' type = 'password' name = 'test' v-model = 'pass' @keyup.enter = 'login()'></div>
                    <div id = 'action'><button class = 'button is-primary' :class = 'buttonstate' @click = 'login()'>Login</button></div>
                </div>

                <div class = 'field box' v-else key = 'creatediv'>
                    Don't have an account? Create one now!
                    <label class = 'label'>Username</label>
                    <div class = 'control'><input class = 'input is-primary' v-model = 'newusername' type = 'text'></div>
                    
                    <label class = 'label'>email</label>
                    <div class = 'control'><input class = 'input is-primary' type = 'text' v-model= 'newmail'></div>
                    
                    <label class = 'label'>Password</label>
                    <div class = 'control'><input class = 'input is-primary' type = 'password' v-model= 'newpass'></div>
                    
                    <div id = 'action'><button class = 'button is-primary' :class = 'buttonstate' @click = 'createac()'>Create Account</button></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
/* eslint-disable indent*/
    import {api} from '../gateways/api'
    export default {
        name: 'home', 
        data() {
            return {
                showlogin: true,
                loginIsActive: true,
                createIsActive: false,
                message: 'Log in below.',
                users: 0,
                newusername: null,
                newmail: null,
                newpass: null,
                mail: null,
                pass: null,
                loginname: null,
                usern: null,
                pass: null,
                buttonstate: ''
            }
        },
        methods: {
            //API calls
            createac: function() {
                this.buttonstate = 'is-loading';
                api.post('/user', {
                    username: this.newusername,
                    email: this.newmail,
                    password: this.newpass})
                
            }, login: function() {
                this.buttonstate = 'is-loading';
                api.post('/user/login', {
                    username: this.usern,
                    password: this.pass
                })
                .then(
                    response=>{
                    console.log(response.data);
                    if(response.data.loggedin === true) {
                        window.sessionStorage.uname = response.data.uname;
                        window.sessionStorage.uid = response.data.loginid;
                        this.$router.push({path: "/dashboard"})
                    }});
                    window.sessionStorage.reloaddashboard = 1;
                    console.log('Reload dashboard? ', window.sessionStorage.reloaddashboard);
            },
            //Page rendering functions
            togglelogin: function() {
                this.showlogin = true,
                this.loginIsActive = true,
                this.createIsActive = false
            },
            togglecreate: function() {
                this.showlogin = false;
                this.createIsActive = true;
                this.loginIsActive = false;
            }
        },
        created() {
        }
    }

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .6s;
}
.slide-fade-leave-active {
  transition: all .6s;
}
.slide-fade-enter {
  transform: translateX(100vw);
}
.slide-fade-leave-to {
    transform: translateX(-100vw);
    opacity: 0;
}

#logincontainer {
    display: flex;
    justify-content: center;
    overflow: hidden;
    padding: 3em;
}

#action {
    margin: 3em auto;
    text-align: center;
}
</style>