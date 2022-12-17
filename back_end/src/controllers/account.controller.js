const AccountService = require('../services/account.service')


// [GET] /api/account
exports.getAllAccount = async (req, res, next) => {        
    const accountService = new AccountService()
    try {
        const accounts = await accountService.getAllAccount()            

        console.log('>> get all accounts')
        res.send(accounts)
    } catch (error) {
        next(error)
    }
}

// [POST] /api/account
exports.createUserAccount = async (req, res, next) => {
    try {
        const accountService = new AccountService()            
        const data = await accountService.createUserAccount(req.body)

        console.log('>> create user')
        res.send(data)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/account/:id
exports.findAccountById = async (req, res, next) => {
    try {
        const id = req.params.id
        const account = await (new AccountService()).findAccountById(id)

        console.log('>> find account by id');
        res.send(account)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/account/usr/:username
exports.findAccountByUsername = async (req, res, next) => {
    try {
        const accountService = new AccountService()
        console.log(req.params);
        const account = await accountService.findAccountByUsername(req.params)
        console.log(account);
    
        console.log('>> find account by username');
        res.send(account)
    } catch (error) {
        next(error)
    }
}

// [GET] /api/account/:username/:password
exports.findAccountByUsernameAndPassword = async (req, res, next) => {
    try {
        const accountService = new AccountService()
        const account = await accountService.findAccountByUsernameAndPassword(req.params)

        console.log('>> find account by username & password');
        res.send(account)
    } catch (error) {
        next(error)
    }
}