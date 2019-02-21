<template>
    <div>
        <div class = 'title'>
            <h1>Create a New Product</h1>
        </div>
        <div class = 'box'>
            <!--input fields-->
            <textfield v-model = 'name' :label = "tablelabels[0]"></textfield>
            <txtarea v-model = 'desc' :label = "tablelabels[1]" :inputtypeclass= "inputclasstype[1]"></txtarea>
            <textfield v-model= "price" :label = "tablelabels[2]"></textfield>
            <!--<textfield v-model= "cat" :label = "tablelabels[3]"></textfield>-->
            <textfield v-model= "brand" :label = "tablelabels[4]"></textfield>
            <textfield v-model= "qty" :label = "tablelabels[5]"></textfield>

            <div id = 'action'><button class = 'button is-primary' @click = 'submit()'>Create</button></div>
        </div>
    </div>
</template>

<script>
    import {api} from '../../gateways/api'
    import FormTextField from '../../components/FormTextField.vue'
    import FormTextArea from '../../components/FormTextArea.vue'
    export default {
        extends: FormTextField,
        name: 'home',
        components: {
            'textfield': FormTextField,
            'txtarea': FormTextArea
        },
        data() {
            return {
                name: '',
                desc: '',
                price: '',
                brand: '',
                qty: '',
                tablelabels: [
                    "Product Name", "Product Description", "Price", "Category", "Brand or Product Manfacturer", "Quantity in Stock"
                ],
                inputclasstype: ["text", "textarea"]

            }
        },
        methods : {
            submit () {
                api.post('/products', {
                    name: this.name,
                    description: this.desc,
                    price: this.price,
                    brand: this.brand,
                    quantity: this.qty
                })
                .then(response => {
                    this.$router.push({path: '/admin/products'});
                })
            }
        }
    }
</script>

<style scoped>
    #action {
        text-align: center;
        padding: 3em;
    }
</style>