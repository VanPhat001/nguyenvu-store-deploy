<template>
    <div class="my-account">
        <div class="side-bar">

            <div class="row">
                <img class="my-account-avatar" :src="avatarImage">
                <span class="my-account-name">{{ name }}</span>
            </div>

            <div class="row">
                <UserLoginDropdown class="user-login-dropdown" :isDropdownType="false" :rowSelectIndex="0">
                </UserLoginDropdown>
            </div>
        </div>
        <form class="main-content" @submit.prevent="">
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-first-name">Tên *</label>
                    <input id="my-account-first-name" type="text" v-model="firstName" required>
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-last-name">Họ *</label>
                    <input id="my-account-last-name" type="text" v-model="lastName" required>
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-name-display">Tên hiển thị</label>
                    <input id="my-account-name-display" type="text" disabled :value="newName">
                    <p class="note">Tên này sẽ hiển thị trong trang Tài khoản và phần Đánh giá sản phẩm</p>
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-email">Địa chỉ email</label>
                    <input id="my-account-email" type="text" disabled :value="email">
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <p class="heading">THAY ĐỔI MẬT KHẨU</p>
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-password">Mật khẩu hiện tại (bỏ trống nếu không đổi)</label>
                    <input id="my-account-password" type="password" v-model="password">
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-new-password">Mật khẩu mới (bỏ trống nếu không đổi)</label>
                    <input id="my-account-new-password" type="password" v-model="newPassword">
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <label for="my-account-new-password-2">Xác nhận mật khẩu mới</label>
                    <input id="my-account-new-password-2" type="password" v-model="newPassword2">
                </div>
            </div>
            <div class="row">
                <div class="cell-wrapper">
                    <button class="btn-save-change" @click.prevent="saveChange">LƯU THAY ĐỔI</button>
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
p {
    margin: 0;
}

.my-account {
    display: flex;
    padding: 20px 0;
}

.side-bar,
.main-content {
    background-color: var(--color-background);
    border-radius: 5px;
    padding-top: 24px;
}

.side-bar {
    flex: 1;
}

.main-content {
    flex: 3;
    margin-left: 20px;
}

.row {
    display: flex;
}

.row>.cell-wrapper {
    width: 100%;
}

/* ================================================================= */
/* ================================================================= */

.side-bar {}

.side-bar .row {}

.side-bar .my-account-avatar {
    padding-left: 5px;
    width: 62px;
    height: 62px;
    border-radius: 50%;
}

.side-bar .my-account-name {
    flex: 1;
    margin: auto auto auto 10px;
    font-size: 23px;
}

.side-bar .user-login-dropdown {
    padding: 8px 12px;
    flex: 1;
}


/* ================================================================= */
/* ================================================================= */

.main-content {}

.main-content .row+.row {
    margin-top: 10px;
}

.main-content .row:last-child {
    margin-bottom: 42px;
}

.main-content .cell-wrapper {
    padding: 10px 42px 0 16px;
}

.main-content label {
    width: 100%;
    font-size: 15px;
    font-weight: bold;
}

.main-content input {
    width: 100%;
    height: 36px;
    border-radius: 5px;
    border: 1px solid lightgray;
    outline: none;
    padding-left: 8px;
    margin-top: 8px;
    font-size: 16px;
}

.main-content input:focus {
    box-shadow: 0 0 7px #33a7b5;
}

.main-content .note {
    color: #777;
    font-size: 17px;
    font-style: italic;
}

.main-content .heading {
    color: #777;
    font-size: 20px;
}

.main-content .btn-save-change {
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    padding: 0 32px;
    font-size: 20px;
    outline: none;
    border: none;
    background: -webkit-linear-gradient(128deg, #f7434c, #ff8949);
    color: white;
    cursor: pointer;
}

.main-content .btn-save-change:hover {
    background: -webkit-linear-gradient(38deg, #f7434c, #ff8949);
}
</style>


<script>
import UserLoginDropdown from './UserLoginDropdown.vue'
import { mapActions } from 'vuex'
export default {
    components: {
        UserLoginDropdown
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            newPassword: '',
            newPassword2: '',
        }
    },
    computed: {
        avatarImage() {
            return this.$store.state?.account?.avatar
        },
        name() {
            return this.$store.state?.account?.name
        },
        newName() {
            return `${this.lastName} ${this.firstName}`
        }
    },
    methods: {
        ...mapActions(['pushAccountToServer']),
        checkForm() {
            // Nếu mật khẩu không rỗng ---> thay đổi thông tin mật khẩu 
            // 1) so sánh mật khẩu có trùng với mật khẩu tài khoản
            // 2) mật khẩu mới không được rỗng
            // 3) mật khẩu xác nhận không được rỗng
            // 4) mật khẩu cũ !== mật khẩu mới
            // 5) mật khẩu mới === mật khẩu xác nhận

            const account = this.$store.state.account
            const EMPTY = ''

            if (this.name != this.newName && this.password == EMPTY) return true;

            if (this.password == account.password) {
                if (this.newPassword != EMPTY && this.password != this.newPassword) {
                    if (this.newPassword == this.newPassword2) {
                        return true;
                    }
                }
            }


            return false;
        },
        resetPassword() {
            this.password = ''
            this.newPassword = ''
            this.newPassword2 = ''
        },
        async saveChange() {
            // kiểm tra dữ liệu
            if (!this.checkForm()) {
                alert('Dữ liệu không hợp lệ!')
                this.resetPassword()
                return;
            }

            // push dữ liệu lên server và đồng bộ dữ liệu $state.store.account            
            const account = this.$store.state.account
            account.name = this.newName
            if (this.newPassword != '') account.password = this.newPassword

            try {
                await this.pushAccountToServer(account)
                alert('Cập nhật dữ liệu thành công!!!')
            } catch (error) {
                console.log(error);
                alert('Có lỗi xảy ra trong quá trình cập nhật...')
            }

            // reset các input mật khẩu
            this.resetPassword()
        }
    },
    async created() {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

        while (this.$store.getters.getIsLoading) {
            await delay(1)
        }

        const account = this.$store.getters?.getAccount
        const words = account.name.split(' ')
        this.firstName = words.pop()
        this.lastName = words.join(' ')
        this.email = account.username
    }
}
</script>