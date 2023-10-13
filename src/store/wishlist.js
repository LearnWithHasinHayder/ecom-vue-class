import { reactive } from 'vue'
import { authStore } from './store'
const wishlist = reactive({
    items: [],
    isWishListed(product) {
        return this.items.includes(product.id)
    },
    async fetchWishlist() {
        const apiUrl = 'http://localhost:8000/api/wishlist'
        const token = authStore.getUserToken()
        if(!token){
            return
        }
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const wishlistData = await response.json();
            this.items = wishlistData.wishlist
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    },
    async toggleWishlist(product) {
        let apiUrl = 'http://localhost:8000/api/wishlist'
        let method = 'POST'
        let payload = {
            product_id: product.id
        }
        const token = authStore.getUserToken()

        if (!this.isWishListed(product)) {
            //add item to wishlist
            this.items.push(product.id)
        } else {
            //remove item from wishlist
            this.items = this.items.filter(id => id != product.id)
            apiUrl = `http://localhost:8000/api/wishlist/${product.id}` //DELETE
            method = 'DELETE'
            payload = {}
        }

        try {
            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // const data = await response.json();
            // console.log('Product ID saved to wishlist:', data);
        } catch (error) {

        }

    },
    getIcon(product) {
        if (this.isWishListed(product)) {
            return '//img.icons8.com/?size=60&id=59805&format=png'
        } else {
            return '//img.icons8.com/?size=96&id=85038&format=png'
        }
    },
    clearItems(){
        console.log('clearing items')
        this.items = []
    }


})

export { wishlist }