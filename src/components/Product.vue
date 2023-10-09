//create home component
<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import {cart} from '../store/cart'
const route = useRoute()
const id = route.params.id
const product = reactive({})
const comments = ref([])
onBeforeMount(() => {

    axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
            product.id = res.data.id
            product.title = res.data.title
            product.body = res.data.body
            product.image = res.data.image
            product.price = res.data.price
            product.description = res.data.description
        })


})
</script>
<template>
    <article class="mb-10">
        <h1 class="text-xl mb-2">
            {{ product.title }}
        </h1>
        <p>
            <img class="w-60" :src="product.image" alt="">
            {{ product.description }}
        </p>
        <p>
            Price: ${{ product.price }}
        </p>
        <p>
            <button @click="cart.addItem(product)" class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
        </p>
    </article>

</template>

<style></style>