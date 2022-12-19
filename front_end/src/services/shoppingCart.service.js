import axios from "axios"

class ShoppingCartService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    async createShoppingCart(accountId, info) {
        // [POST] /api/shopping-cart
        return (await this.api.post('/shopping-cart', {
            accountId, 
            info: info || []
        })).data
    }

    async getByAccountId(accountId) {
        // [GET] /api/shopping-cart/acc/:id
        return (await this.api.get(`/shopping-cart/acc/${accountId}`)).data
    }

    async updateShoppingCart(cartId, accountId, info) {
        // [PUT] /api/shopping-cart/:id
        return (await this.api.put(`/shopping-cart/${cartId}`, {
            accountId,
            info
        })).data
    }


}

export default new ShoppingCartService()