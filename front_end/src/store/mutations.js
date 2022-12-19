export default {
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setAccount(state, account) {
        state.account = account
    },
    setProductsInCart(state, productsInCart) {
        state.productsInCart = productsInCart
    },
    setCartId(state, cartId) {
        state.cartId = cartId
    }
}