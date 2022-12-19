import accountService from '../services/account.service';
import productService from '../services/product.service';
import shoppingCartService from '../services/shoppingCart.service';


export default {

    async loadAllData({ getters, commit, dispatch }) {

        console.log('>> loading');
        commit('setIsLoading', true)

        // fetch account by id if id available
        const id = localStorage.getItem('accountId')
        const NO_HAVE_ACCOUNT_ID = null
        if (id !== NO_HAVE_ACCOUNT_ID) {
            try {
                const account = await accountService.findAccountById(id)
                commit('setAccount', account)
                console.log(getters.getAccount)

                const { products, cartId } = await dispatch('fetchShoppingCart', id)
                commit('setProductsInCart', products)
                commit('setCartId', cartId)
                console.log(getters.getProductsInCart);
                console.log('cartId:', getters.getCartId);
            }
            catch (error) {
                console.log(error)
            }
        }

        commit('setIsLoading', false)
        console.log('>> loaded');
    },

    async fetchShoppingCart(context, accountId) {
        const shoppingCart = (await shoppingCartService.getByAccountId(accountId))
        const shoppingCartInfo = shoppingCart.info

        // !FIXME: có khả năng shoppingCartInfo = undefined
        const tasks = []
        for (let i = 0; i < shoppingCartInfo.length; i++) {
            tasks.push(productService.getProductById(shoppingCartInfo[i].productId))
        }

        const products = await Promise.all(tasks)
        for (let i = 0; i < products.length; i++) {
            products[i].quantity = shoppingCartInfo[i].quantity
        }
        return { products, cartId: shoppingCart._id }
    },

    async pushCartDataToServer({ getters }) {
        try {
            const cartId = getters.getCartId
            const accountId = getters.getAccount._id
            const info = getters.getProductsInCart.map(item => {
                return {
                    productId: item._id,
                    quantity: item.quantity,
                }
            })
            // console.log('info data:', info);

            await shoppingCartService.updateShoppingCart(cartId, accountId, info)

        } catch (error) {
            console.log(error);
        }
    },

    async decreaseQuantity({ getters, dispatch }, index) {
        if (getters.getProductsInCart[index].quantity > 0) {
            getters.getProductsInCart[index].quantity--

            await dispatch('pushCartDataToServer')
        }
    },

    async increaseQuantity({ getters, dispatch }, index) {
        getters.getProductsInCart[index].quantity++

        await dispatch('pushCartDataToServer')
    },

    async addProductToCart({ getters, commit, dispatch }, { productId, quantity }) {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

        while (getters.isLoadingData) {
            await delay(1)
        }

        const NOT_AVAILABLE = null
        if (getters.getCartId === NOT_AVAILABLE) {
            // user chưa có sẵn shopping-cart
            // tạo mới shopping cart với tham số ....
            // cập nhật lại dữ liệu hiển thị ở $store.state
            try {
                const accountId = getters.getAccount._id
                const data = await shoppingCartService.createShoppingCart(accountId, [
                    {
                        productId,
                        quantity
                    }
                ])

                const cartId = data.insertedId
                const { products } = await dispatch('fetchShoppingCart', accountId)
                commit('setProductsInCart', products)
                commit('setCartId', cartId)
            } catch (error) {
                console.log(error);
            }
        }
        else {
            // +) product này đã có trong cart
            // ---> tăng số lượng trong cart và fetch api
            // +) product này chưa có trong cart
            // ---> thêm mới vào cart và fetch api
            // finally: cập nhập lại dữ liệu hiển thị ở $store.state

            // THAM CHIẾU đến mảng productsInCart
            const productsInCart = getters.getProductsInCart
            const productIndex = productsInCart.findIndex(item => item._id == productId)
            const NOT_FOUND = -1
            
            if (productIndex == NOT_FOUND) {
                try {
                    // dữ liệu thêm vào là tạm thời, vì push dữ liệu lên server chỉ cần id và quantity
                    // dữ liệu hiển thị thì yêu cầu nhiều hơn nên phải fetch lại dữ liệu từ server
                    productsInCart.push({
                        _id: productId,
                        quantity
                    })
                } catch (error) {
                    // lỗi không thể render từ ShoppingCartDropdown.vue 
                    // do thay format của productsInCart không đủ dữ liệu của 1 product 
                    // fetch lại dữ liệu là đươc ---> đã làm ở dưới
                    console.log(error);
                }
            }
            else {
                productsInCart[productIndex].quantity += quantity
            }

            
            await dispatch('pushCartDataToServer')
            const { products } = await dispatch('fetchShoppingCart', getters.getAccount._id)
            commit('setProductsInCart', products)            
        }
    },

    loginSuccess({ commit }) {
        location.replace('/')
    }
}