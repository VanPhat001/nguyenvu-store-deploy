<template>
    <form class="register" @submit.prevent="onSubmitForm">
        <h1>ĐĂNG KÝ</h1>
        <hr>

        <div class="row">
            <label for="register-name">Họ tên</label>
            <input id="register-name" type="text" required v-model="name">
        </div>

        <div class="row">
            <label for="register-email">Địa chỉ email</label>
            <input id="register-email" type="text" required v-model="email">
        </div>

        <div class="row">
            <label for="register-password">Mật khẩu</label>
            <input id="register-password" type="password" minlength="4" required v-model="password">
        </div>

        <div class="row ">
            <label for="register-otp">Mã OTP</label>
            <div class="otp-box">
                <input id="register-otp" type="text" minlength="6" v-model="otp">
                <button id="register-btn-get-otp" @click.prevent="sendOtpCode" :disabled="email == ''">Gửi mã
                    OTP</button>
            </div>
        </div>

        <div class="row">
            <button id="btn-register" type="submit"> ĐĂNG KÝ </button>
        </div>

        <div class="row">
            <div class="line"></div>
            <p>HOẶC VỚI</p>
            <div class="line"></div>
        </div>

        <div class="row">
            <div>
                <button id="btn-register-google">
                    <i class="fa-brands fa-google"></i>
                </button>
                <button id="btn-register-apple">
                    <i class="fa-brands fa-apple"></i>
                </button>
            </div>
        </div>

    </form>
</template>


<style scoped>
button {
    cursor: pointer;
}

.register {}

.register h1 {
    font-size: 24px;
    text-align: center;
}

.register>hr {
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

#register-name,
#register-email,
#register-password,
.row .otp-box #register-otp,
.row .otp-box #register-btn-get-otp {
    margin-top: 5px;
    width: 100%;
    padding: 9px 12px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    border-color: lightgrey;

}

#register-name:focus,
#register-email:focus,
#register-password:focus {
    border-color: transparent;
    box-shadow: 0 0 7px #3083ed;
}

.row .otp-box {
    display: flex;
}

.row .otp-box #register-otp {
    flex: 1;
}

.row .otp-box #register-btn-get-otp {
    color: var(--color-primary);
    width: fit-content;
    opacity: .5;
    margin-left: 24px;
}

.row .otp-box #register-btn-get-otp:enabled {
    opacity: 1;
}

#btn-register {
    width: 100%;
    background: -webkit-linear-gradient(108deg, #f7434c, #ff8949);
    color: white;
    padding: 9px 12px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
}

#btn-register:hover {
    background: -webkit-linear-gradient(108deg, #ff8949, #f7434c);
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

#btn-register-google,
#btn-register-apple {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid;
    font-size: 20px;
}

#btn-register-google {
    background-color: var(--color-background);
    color: var(--color-primary);
    border-color: lightgray;
}

#btn-register-apple {
    margin-left: 10px;
    color: white;
    background-color: black;
}
</style>


<script>
import accountService from '../services/account.service'
export default {
    emits: ['onRegisterSuccess'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            otp: '',
            otpSend: null,
            emailSend: null
        }
    },
    methods: {
        getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        async sendOtpCode() {
            console.log('>> send otp');
            this.otpSend = this.getRandom(0, 1e6 - 1) + ''
            this.emailSend = this.email
            while (this.otpSend.length < 6)
                this.otpSend = '0' + this.otpSend

            try {
                await accountService.sendOtpToMail(this.email, this.otpSend)
            } catch (error) {
                console.log(error);
            }
        },
        async registerAccount() {
            if (this.otp !== this.otpSend) {
                alert('Mã otp không hợp lệ')
                this.otp = ''
                return
            }
            if (this.otp === this.otpSend && this.email !== this.emailSend) {
                alert('Mã OTP không phải của email này')
                this.otp = ''                
                return
            }

            try {
                // email -> username
                const account = await accountService.findAccountByUsername(this.email)
                if (account == '') {
                    const newAccount = await accountService.createAccount(this.name, this.email, this.password)
                    alert('Đăng kí tài khoản thành công!!!')
                    this.password = ''
                    this.otp = ''
                    this.$emit('onRegisterSuccess', newAccount)
                }
                else {
                    alert('Tên tài khoản đã tồn tại!!!')
                    this.email = ''
                    this.password = ''
                    this.otp = ''
                }
            } catch (error) {
                console.log(error)
            }
        },
        async onSubmitForm() {
            console.log('cancel submit');
            await this.registerAccount()
        }
    }
}
</script>
