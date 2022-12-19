export default {
    getAvatarImageDefault() {
        return 'https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'
    },
    getIsLoading(state) {
        return state.isLoading
    },
    getAccount(state) {
        return state.account
    },   
    getProductsInCart(state) {
        return state.productsInCart
    },
    getCartId(state) {
        return state.cartId
    },

    isLogin(state) {
        return state.account !== null
    },
    totalPriceInCart(state) {
        const products = state.productsInCart
        let total = 0
        products.forEach(element => {
            total += element.quantity * element.price
        })
        return total
    },
}