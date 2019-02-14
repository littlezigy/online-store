<template>
    <div class = 'field'>
        <label class = 'label'>{{label}}</label>
        <div class = 'control'><input :class = 'inputtypeclass' class = 'input' type = 'text' text = 'input' v-bind:value= "productparam" v-on:input= "$emit('input', $event.target.value)" ></div>
    </div>
</template>

<script>
    export default {
        props: ['label', 'inputtypeclass'],
        model: {
            prop: 'productparam',
            event: 'input'
        }
    }
</script>
    