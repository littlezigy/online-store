<template>
<!--Admin Products view-->
    <div>
        <div class = 'title'>
            <h1>{{$route.params.id}}</h1>
        </div>
        <table class = 'table'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for= 'product in products' :key = 'product.id'>
                    <td>{{product.name}}</td>
                    <td>{{product.description}}</td>
                    <td>{{product.price}}</td>
                    <td class = 'category'>{{product.category}}</td>
                    <td class ='brand'>{{product.brand}}</td>
                    <td>{{product.quantity}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import {api} from '../../gateways/api';
export default {
    name: 'home',
    data() {
        return{
            products: 0
        }
    },
    created() {
        api.get('/products').then(response => {this.products=response.data})
    }
}
</script>

<style>
.brand, .category {
    text-transform: capitalize;
}
</style>