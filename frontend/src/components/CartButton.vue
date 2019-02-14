<template>
    <button class  = 'button is-outlined is-success' @click = 'addToCart()'>Add to Cart</button>
</template>

<script>
export default {
    props: ['productid'],
    methods: {
        addToCart() {
            //push product id to user's cart
            console.log(this.productid)
        }
    }
}
</script>

<style scoped>
</style>