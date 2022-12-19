import axios from "axios"

class ShoppingCartService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    async getByAccountId(accountId) {
        // [GET] /api/shopping-cart/acc/:id
        return (await this.api.get(`/shopping-cart/acc/${accountId}`)).data
    }
}

export default new ShoppingCartService()