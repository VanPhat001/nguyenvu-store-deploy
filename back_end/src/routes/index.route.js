const express = require('express')
const productController = require('../controllers/product.controller')
const accountController = require('../controllers/account.controller')
const shoppingCartController = require('../controllers/shoppingCart.controller')

const AccountService = require('../services/account.service')
const ProductService = require('../services/product.service')
const ShoppingCartService = require('../services/shoppingCart.service')
const { sendMail } = require('../utils/functions.util')
const router = express.Router()

//#region       /api/product
// route: /api/product
router.route('/product')
    .get(productController.getAllProduct)
    .post(productController.createProductById)

// route: /api/product/:id
router.route('/product/:id')
    .get(productController.getProductById)
    .delete(productController.deteleProductById)
    .patch(productController.updateProduct)

// route: /api/product/skip/:skip/limit/:limit
router.route('/product/skip/:skip/limit/:limit')
    .get(productController.getProductSkipLimit)

// route: /api/product/search-text/:textValue
router.route('/product/search-text/:textValue')
    .get(productController.findProductByText)

// route: /api/product/filter-category/:category
router.route('/product/filter-category/:category')
    .get(productController.findProductByCategory)
//#endregion 


//#region       /api/account
// route: /api/account
router.route('/account')
    .get(accountController.getAllAccount)
    .post(accountController.createUserAccount)

// route: /api/account/:id
router.route('/account/:id')
    .get(accountController.findAccountById)
    .patch(accountController.updateAccount)

// route: /api/account/usr/:username
router.route('/account/usr/:username')
    .get(accountController.findAccountByUsername)

// route: /api/account/:username/:password
router.route('/account/:username/:password')
    .get(accountController.findAccountByUsernameAndPassword)

//#endregion


//#region       /api/shopping-cart
// route: /api/shopping-cart
router.route('/shopping-cart')
    .get(shoppingCartController.getAllShoppingCart)
    .post(shoppingCartController.createShoppingCart)

// route: /api/shopping-cart/:id
router.route('/shopping-cart/:id')
    .get(shoppingCartController.getByShoppingCartId)
    .put(shoppingCartController.updateShoppingCart)

// route: /api/shopping-cart/acc/:id
router.route('/shopping-cart/acc/:id')
    .get(shoppingCartController.getByAccountId)
//#endregion


// route: /api/register/send-otp/:mail
router.route('/register/send-otp/:mail')
    .post(async (req, res, next) => {
        try {
            const { mail } = req.params
            const { otp } = req.body
            console.log(`>> send mail to user ${mail}`);

            const htmlContent = `
                <div style="padding: 10px; background-color: #003375">
                    <div style="padding: 10px; background-color: white;">
                        <h3 style="color: #0085ff">Đăng ký tài khoản</h3>
                        <span style="color: black">Mã OTP của bạn là <span style="color: blue;">${otp}<span></span>                        
                    </div>
                </div>
            `

            const data = await sendMail(htmlContent, { mail_title: 'Đăng ký tài khoản', to_mail: mail })
            res.send(data)
        } catch (error) {
            next(error)
        }
    })



module.exports = router