const MongoDB = require('../utils/mongodb.util')
const { ObjectId } = require('mongodb')

class AccountService {
    constructor() {
        this.Account = MongoDB.client.db().collection('accounts')
    }

    async getAllAccount() {
        return await this.Account.find({}).toArray()
    }

    async createUserAccount({ username, password, avatar, name }) {
        const account = {
            username, password, avatar, name,
            isAdmin: false
        }
        console.log(account);
        return await this.Account.insertOne(account)
    }

    async updateAccount(id, {username, password, avatar, name, isAdmin}) {
        const account = {username, password, avatar, name, isAdmin}
        Object.keys(account).forEach(element => {
            if (account[element] === undefined) {
                delete account[element]
            }
        })

        const result = await this.Account.updateOne(
            { _id: ObjectId(id) },
            { $set: account })
        return result
    }

    async findAccountById(id) {
        const account = await this.Account.findOne({ _id: ObjectId(id) })
        return account
    }

    async findAccountByUsername({ username }) {
        const account = await this.Account.findOne({ username })
        return account
    }

    async findAccountByUsernameAndPassword({ username, password }) {
        const account = await this.Account.findOne({ username, password })
        return account
    }
}

module.exports = AccountService