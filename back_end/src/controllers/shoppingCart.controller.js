const ShoppingCartService = require('../services/shoppingCart.service')

// [GET] /api/shopping-cart
exports.getAllShoppingCart = async (req, res, next) => {
    try {
        const shoppingCartService = new ShoppingCartService()
        const data = await shoppingCartService.getAll()
        console.log('>> get all shopping-carts')
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [POST] /api/shopping-cart
exports.createShoppingCart = async (req, res, next) => {
    try {
        const { accountId, info } = req.body

        const shoppingCartService = new ShoppingCartService()
        const data = await shoppingCartService.create(accountId, info)
        console.log('>> create shopping-cart')
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/shopping-cart/:id
exports.getByShoppingCartId = async (req, res, next) => {
    try {
        const { id } = req.params
        const shoppingCartService = new ShoppingCartService()
        const data = await shoppingCartService.getByShoppingCartId(id)

        console.log('>> get all shopping-carts by shoppingCartId')
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/shopping-cart/acc/:id
exports.getByAccountId = async (req, res, next) => {
    try {
        const { id } = req.params
        const shoppingCartService = new ShoppingCartService()
        const data = await shoppingCartService.getByAccountId(id)

        console.log('>> get all shopping-carts by accountId')
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [PUT] /api/shopping-cart/:id
exports.updateShoppingCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const { accountId, info } = req.body
        const shoppingCartService = new ShoppingCartService()
        const data = await shoppingCartService.updateShoppingCart(id, accountId, info)

        console.log(`>> [PUT] update shopping-cart ${id}`);
        res.send(data)
    } catch (error) {
        next(error)
    }
}