<template>
    <div class = "container">
            <h1>Welcome {{user}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return{
            user: window.sessionStorage.unameCaps
        }
    },
    created() {
        if(window.sessionStorage.reloaddashboard == 1) {
            console.log('Should reload dashboard');
            window.location.reload();   
        }
        console.log("Not reloading dashboard", window.sessionStorage.reloaddashboard);
        window.sessionStorage.reloaddashboard = 0
    }
}
</script>