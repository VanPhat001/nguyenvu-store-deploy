import axios from "axios"

class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    async getProductById(id) {
        // [GET] /api/product/:id
         return (await this.api.get(`/product/${id}`)).data
    }

    async getAllProduct() {
        // [GET] /api/product
        return (await this.api.get('/product')).data
    }

    async findProductByText(textValue) {
        // [GET] /api/product/search-text/:textValue
        return (await this.api.get(`/product/search-text/${textValue}`)).data
    }

    async createProduct({ name, category, price, description, images, sale }) {
        // [POST] /api/product
        const data = (await this.api.post('/product', {name, category, price, description, images, sale}))
        console.log('post data', data);
    }
}

export default new ProductService()