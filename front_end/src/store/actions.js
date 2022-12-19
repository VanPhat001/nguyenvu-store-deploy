import accountService from '../services/account.service';
import productService from '../services/product.service';
import shoppingCartService from '../services/shoppingCart.service';


export default {
    async fetchShoppingCart(context, accountId) {
        const shoppingCartInfo = (await shoppingCartService.getByAccountId(accountId)).info

        const tasks = []
        for (let i = 0; i < shoppingCartInfo.length; i++) {
            tasks.push(productService.getProductById(shoppingCartInfo[i].productId))
        }

        const products = await Promise.all(tasks)
        for (let i = 0; i < products.length; i++) {
            products[i].quantity = shoppingCartInfo[i].quantity
        }
        return products
    },

    async loadAllData({ getters, commit, dispatch }) {

        console.log('>> loading');
        commit('setIsLoading', true)

        // fetch account by id if id available
        const id = localStorage.getItem('accountId')
        if (id !== null) {
            try {
                const account = await accountService.findAccountById(id)
                commit('setAccount', account)
                console.log(getters.getAccount)

                const products = await dispatch('fetchShoppingCart', id)
                commit('setProductsInCart', products)
                console.log(getters.getProductsInCart);
            }
            catch (error) {
                console.log(error)
            }
        }

        commit('setIsLoading', false)
        console.log('>> loaded');
    },

    loginSuccess({ commit }) {
        location.replace('/')
    }
}