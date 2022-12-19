const MongoDB = require('../utils/mongodb.util')
const { ObjectId } = require('mongodb')

class ShoppingCartService {
    constructor() {
        this.ShoppingCart = MongoDB.client.db().collection('shoppingCarts')
    }

    async create(accountId, productsInCart) {
        const shoppingCart = {
            accountId,
            info: productsInCart
        }

        return await this.ShoppingCart.insertOne(shoppingCart);
    }

    async getAll() {
        return await this.ShoppingCart.find({}).toArray()
    }

    async getByAccountId(accId) {
        return await this.ShoppingCart.findOne({ accountId: accId })
    }

    async getByShoppingCartId(shoppingCartId) {
        return await this.ShoppingCart.findOne({ _id: ObjectId(shoppingCartId) })
    }

    // override data
    async updateShoppingCart(shoppingCartId, accountId, info) {
        const shoppingCart = {
            _id: ObjectId(shoppingCartId),
            accountId,
            info
        }

        return await this.ShoppingCart.updateOne(
            { _id: shoppingCart._id },
            { $set: shoppingCart })
    }

}

module.exports = ShoppingCartService