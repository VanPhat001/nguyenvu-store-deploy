const ProductService = require('../services/product.service')

// [GET] /api/product
exports.getAllProduct = async (req, res, next) => {
    try {
        console.log('>> get all product');

        const product = new ProductService()
        const data = await product.getAll()

        res.send({ message: data })
    } catch (error) {
        next(error)
    }
}

// [GET] /api/product/:id
exports.getProductById = async (req, res, next) => {
    try {
        console.log('>> get product id');

        const product = new ProductService()
        const doc = await product.getById(req.params.id)

        res.send( doc )
    } catch (error) {
        next(error)
    }
}

// [GET] /api/product/skip/:skip/limit/:limit
exports.getProductSkipLimit = async (req, res, next) => {
    try {
        console.log('>> get products using skip() limit()');

        const skip = req.params.skip * 1
        const limit = req.params.limit * 1
        const productService = new ProductService()
        const products = await productService.getSkipLimit(skip, limit)

        res.send(products)
    } catch (error) {
        next(error)
    }
}

// [POST] /api/product
exports.createProductById = async (req, res, next) => {
    try {
        console.log('>> post product')
        const product = new ProductService()
        await product.create(req.body)

        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// [DELETE] /api/product/:id
exports.deteleProductById = async (req, res, next) => {
    try {
        console.log('id', req.params.id);
        console.log('>> delete product id');
        
        const productService = new ProductService()
        await productService.delete(req.params.id)
        
        res.send('delete product')
    } catch (error) {
        next(error)
    }
}

// [PATCH] /api/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const product = new ProductService()

        req.body.id = req.params.id
        await product.updateProduct(req.body)
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// [GET] /api/product/search-text/:textValue
exports.findProductByText = async (req, res, next) => {
    try {
        const productService = new ProductService()
        const textValue = req.params.textValue + ''
        const data = await productService.findProductsByText(textValue)

        console.log('>> search products by textValue');
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/product/filter-category/:category
exports.findProductByCategory = async (req, res, next) => {
    try {
        const productService = new ProductService()
        const category = req.params.category + ''
        const data = await productService.findProductsByCategory(category)

        console.log('>> search products by category');
        res.send(data)
    } catch (error) {
        next(error)
    }
}