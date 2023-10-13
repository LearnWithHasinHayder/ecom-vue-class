import { ref, reactive } from 'vue'
import router from '../router/router'
import {cart} from './cart'
import {wishlist} from './wishlist'
const authStore = reactive({
    isAuthenticated: localStorage.getItem('auth') == 1,
    user: JSON.parse(localStorage.getItem('user')),
    authenticate(username, password) {
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password })
        }).then(res => res.json())
            .then(res => {
                if (res.error == 0) {
                    authStore.isAuthenticated = true
                    authStore.user = res
                    localStorage.setItem('auth', 1)
                    localStorage.setItem('user', JSON.stringify(res))
                    router.push('/')
                }
            })
    },
    logout() {
        authStore.isAuthenticated = false
        authStore.user = {}
        localStorage.setItem('auth', 0)
        localStorage.setItem('user', '{}')
        cart.items ={}
        // cart.totalPrice = 0
        cart.saveCartInLocalStorage()
        wishlist.items = []
        router.push('/login')
    },
    getUserToken(){
        return authStore.user.token
    }
})

export { authStore }