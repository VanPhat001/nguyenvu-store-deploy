<template>
    <div :class="{ 'login-regrister-component': true, close: !isOpen }">

        <div class="background" @click="closeModel">
            <div class="btn-close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>

        <div class="wrapper">
            <LogIn class="login" @onLoginSuccess="loginSuccess"></LogIn>
            <Resgister class="register" @onRegisterSuccess="loginSuccess"></Resgister>
        </div>
    </div>
</template>


<style scoped>
.close {
    display: none;
}

.background {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.548);
    z-index: 1;

}

.btn-close {
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: var(--color-primary);
    opacity: .6;
    cursor: pointer;
    z-index: 1;
}

.btn-close:hover {
    opacity: 1;
}

.wrapper {
    display: flex;
    margin: auto;
    width: 88%;
    max-width: 1024px;
    padding: 40px;
    background-color: var(--color-background);
    /* text-align: left; */

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.login,
.register {
    flex: 1;
    display: inline-block;
    background-color: var(--color-background);
    font-size: 16px;
}

.register {
    margin-left: 30px;
}
</style>


<script>
import LogIn from './Login.vue'
import Resgister from './Register.vue'
export default {
    emits: ['userLoginSuccess', 'closeModel', 'openModel'],
    components: {
        LogIn, Resgister
    },
    props: {
        pIsOpen: { type: Boolean, default: false }
    },
    data() {
        return {
            isOpen: true
        }
    },
    methods: {
        closeModel() {
            this.isOpen = false
            this.$emit('closeModel', this.isOpen)
        },
        openModel() {
            this.isOpen = true
            this.$emit('openModel', this.isOpen)
        },
        loginSuccess(account) {
            console.log('resgiter/login successfully', { account });

            localStorage.setItem('accountId', account._id)
            this.$emit('userLoginSuccess', account)
        }
    },
    created() {
        this.isOpen = this.pIsOpen
    },
    watch: {
        pIsOpen() {
            this.isOpen = this.pIsOpen
        }
    }
}
</script>

