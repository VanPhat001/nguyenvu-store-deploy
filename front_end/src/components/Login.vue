<template>
    <form class="login" @submit.prevent="onSubmitForm">
        <h1>ĐĂNG NHẬP</h1>
        <hr>

        <div class="row">
            <label for="login-name">Tên tài khoản hoặc địa chỉ email</label>
            <input id="login-name" type="text" v-model="username" required>
        </div>

        <div class="row">
            <label for="login-password">Mật khẩu</label>
            <input id="login-password" type="password" v-model="password" required>
        </div>

        <div class="row">
            <div>
                <input type="checkbox" id="login-save-account" v-model="isSave">
                <label for="login-save-account">Ghi nhớ mật khẩu</label>
            </div>
        </div>

        <div class="row">
            <button id="btn-login" type="submit">ĐĂNG NHẬP</button>
        </div>

        <div class="row">
            <a href="/" id="btn-forget-password">Quên mật khẩu?</a>
        </div>

        <div class="row">
            <div class="line"></div>
            <p>HOẶC VỚI</p>
            <div class="line"></div>
        </div>

        <div class="row">
            <div>
                <button id="btn-login-google">
                    <i class="fa-brands fa-google"></i>
                </button>
                <button id="btn-login-apple">
                    <i class="fa-brands fa-apple"></i>
                </button>
            </div>
        </div>

    </form>
</template>


<style scoped>
.login {}

.login h1 {
    font-size: 24px;
    text-align: center;
}

.login>hr {
    text-align: center;
    width: 20%;
    border-color: var(--color-primary);
    margin-bottom: 30px;
}

.row {
    padding: 5px 10px;
}

.row>* {
    display: block;
}

.row label {
    font-weight: bold;
}

#login-name,
#login-password {
    margin-top: 5px;
    width: 100%;
    padding: 9px 12px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    border-color: lightgrey;

}

#login-name:focus,
#login-password:focus {
    border-color: transparent;
    box-shadow: 0 0 7px #3083ed;
}

#login-save-account+label {
    user-select: none;
    margin-left: 8px;
    color: grey;
}

#btn-login {
    width: 100%;
    background: -webkit-linear-gradient(108deg, #f7434c, #ff8949);
    color: white;
    padding: 9px 12px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
}

#btn-login:hover {
    background: -webkit-linear-gradient(108deg, #ff8949, #f7434c);
}

#btn-forget-password {
    text-decoration: none;
    color: var(--color-primary);
    opacity: .8;
}

#btn-forget-password:hover {
    opacity: 1;
}

.row:has(> .line) {
    display: flex;
    align-items: center;
}

.row>.line {
    flex: 1;
    background-color: lightgrey;
    height: 1px;
}

.row>p {
    text-align: center;
    font-weight: bold;
    color: grey;
    padding: 0 14px;
}

.row:last-child {
    text-align: center;
}

#btn-login-google,
#btn-login-apple {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid;
    font-size: 20px;
}

#btn-login-google {
    background-color: var(--color-background);
    color: var(--color-primary);
    border-color: lightgray;
}

#btn-login-apple {
    margin-left: 10px;
    color: white;
    background-color: black;
}
</style>


<script>
import accountService from '../services/account.service'
export default {
    emits: ['onLoginSuccess'],
    data() {
        return {
            username: '',
            password: '',
            isSave: false
        }
    },
    methods: {
        async loginAccount() {
            const account = await accountService.findAccountByUsernameAndPassword(this.username, this.password)

            if (account == '') {
                alert('Tài khoản không tồn tại!!!')
                this.password = ''
            }
            else {
                this.password = ''

                if (this.isSave) {
                    localStorage.setItem('saveAccountId', account._id)
                }
                else {
                    localStorage.removeItem('saveAccountId')
                }
                this.$emit('onLoginSuccess', account)
            }
        },
        async onSubmitForm() {
            console.log('cancel submit ');
            await this.loginAccount()
        }
    },
    async created() {
        const accountId = localStorage.getItem('saveAccountId')
        if (accountId !== null) {
            const account = await accountService.findAccountById(accountId)
            this.username = account.username
            this.password = account.password
        }
    },
}
</script>
