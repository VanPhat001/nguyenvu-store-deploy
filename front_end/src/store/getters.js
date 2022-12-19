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
    getProductsShow(state) {
        return state.productsShow
    },
    isLogin(state) {
        return state.account !== null
    }
}