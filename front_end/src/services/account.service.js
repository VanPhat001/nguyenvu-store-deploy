import axios from "axios"

class AccountService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    async sendOtpToMail(mail, otp) {
        // route: /api/register/send-otp/:mail
        const data = (await this.api.post(`/register/send-otp/${mail}`, { otp })).data
        return data
    }

    async createAccount(name, username, password) {
        // [POST] /api/account
        const account = {
            name,
            username,
            password,
            avatar: 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=2000'
        }
        const data = (await this.api.post('/account', account)).data
        account._id = data.insertedId
        return account
    }

    async updateAccount(id, account) {
        // [PATCH] /api/account/:id
        const data = (await this.api.patch(`/account/${id}`, {
            username: account.username,
            password: account.password,
            avatar: account.avatar,
            name: account.name,
            isAdmin: account.isAdmin,
        })).data
        return data
    }

    async findAccountById(id) {
        // [GET] /api/account/:id
        const account = (await this.api.get(`/account/${id}`)).data
        return account
    }

    async findAccountByUsername(username) {
        // [GET] /api/account/usr/:username        
        return (await this.api.get(`/account/usr/${username}`)).data
    }

    async findAccountByUsernameAndPassword(username, password) {
        // [GET] /api/account/:username/:password
        return (await this.api.get(`/account/${username}/${password}`)).data
    }
}

export default new AccountService()