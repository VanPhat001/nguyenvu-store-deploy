const MongoDB = require('../utils/mongodb.util')
const { ObjectId } = require('mongodb')

class ProductService {
    constructor() {
        this.Product = MongoDB.client.db().collection('products')
    }

    async getAll() {
        const products = this.Product.find({})
        return await products.toArray()
    }

    async getById(id) {
        return await this.Product.findOne({ _id: ObjectId(id) })
    }

    async getSkipLimit(skip, limit) {
        const products = await this.Product.find({}).skip(skip).limit(limit).toArray()
        return products
    }

    async create({ name, category, price, description, sale, images }) {
        if (typeof name === 'undefined') name = ''
        if (typeof category === 'undefined') category = ''
        if (typeof price === 'undefined') price = 0
        if (typeof description === 'undefined') description = ''
        if (typeof sale === 'undefined') sale = 0
        if (typeof images === 'undefined') images = ['']
        if (!Array.isArray(images)) images = ['']

        const product = { name, category, price, description, sale, images }
        return await this.Product.insertOne(product)
    }

    async delete(id) {
        await this.Product.deleteOne({ _id: ObjectId(id) })
    }

    async updateProduct({ id, name, price, description, sale, images }) {
        const product = { name, price, description, sale, images }
        Object.keys(product).forEach(element => {
            if (product[element] === undefined) {
                delete product[element]
            }
        });

        const result = await this.Product.updateOne(
            { _id: ObjectId(id) },
            { $set: product })
        return result
    }
}

module.exports = ProductService