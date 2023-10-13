import { reactive } from 'vue'
import { authStore } from './store'
const order = reactive({
    orders: [],
    async fetchOrders() {
        const apiUrl = 'http://localhost:8000/api/orders'
        const token = authStore.getUserToken()

        if (!token) {
            return
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const ordersData = await response.json();
            this.orders = ordersData.map(order => ({
                id: order.id,
                userId: order.user_id,
                showProducts: false,
                totalAmount: order.total_amount,
                products: order.products.map(productInfo => ({
                    id: productInfo.id,
                    title: productInfo.title,
                    price: productInfo.price,
                    quantity: productInfo.pivot.quantity,
                    totalPrice: productInfo.pivot.price
                }))
            }));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },
    async placeOrder(totalPrice, items) {
        const apiUrl = 'http://localhost:8000/api/orders'
        const token = authStore.getUserToken()
        if (!token) {
            return
        }

        const products = Object.values(items).map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const payload = {
            total_amount: totalPrice,
            products: products
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            this.fetchOrders()
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }
})

export { order }