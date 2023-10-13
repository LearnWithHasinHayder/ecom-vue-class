<script setup>
import { onBeforeMount } from 'vue';
import { order } from '../store/order'
import { authStore } from '../store/store'

onBeforeMount(() => {
    order.fetchOrders()
})

function toggleProducts(orderId){
    const order_item = order.orders.find(o => o.id === orderId);
    if (order_item) {
        order_item.showProducts = !order_item.showProducts;
    }
}
</script>
 
<template>
    <div class="bg-white">
        <p>
            <!-- {{ order.orders }} -->
        </p>
        <div class="mx-auto px-12 py-8 ">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Cart</h2>
            <p class="my-10">
            </p>
        </div>
        <div class="px-12 py-8 ">
            <div class="my-2" v-for="s_order in order.orders" :key="order.id">
                <div class="order-info flex justify-between w-full">
                    <p class="w-1/3"><strong>Order ID:</strong> {{ s_order.id }}</p>
                    <p class="w-1/3"><strong>Total Amount:</strong> ${{ s_order.totalAmount }}</p>
                    <p class="text-right w-1/3">
                        <button @click="toggleProducts(s_order.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                            Show Detail
                        </button>
                    </p>
                    <hr>
                </div>

                <!-- Show products for the current order when toggled -->
                <div v-if="s_order.showProducts" class="border my-5 p-5">
                    <div class="flex items-center my-3" v-for="product in s_order.products" :key="product.id">
                        <p class="w-2/3">
                            <!-- <router-link :to="{ name: 'product', params: { id: product.id } }"> -->
                                {{ product.title }}
                            <!-- </router-link> -->
                        </p>
                        <p class="w-[100px]">{{ product.price }}</p>
                        <p>Quantity: {{ product.quantity }}</p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
 
<style scoped></style>