<template>
	<header>
		<div id="header-image"></div>

		<div class="header-row">
			<div class="col-left">
				<router-link to="/">
					<img src="https://nguyenvu.store/wp-content/uploads/2022/06/logo-ngang.svg" width="150">
				</router-link>
			</div>
			<div class="col-center">
				<form class="header-search-box" @submit.prevent="">
					<input type="text" placeholder="Nhập tên sản phẩm cần tìm...">
					<button type="submit">
						<i class="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
			</div>
			<div class="col-right">
				<router-link id="btn-cart"  class="shopping-cart-dropdown-parent" to="/shopping-cart">
					GIỎ HÀNG / <span>{{ totalPriceInCart }}&#8363;</span> <i class="fa-sharp fa-solid fa-cart-shopping"></i>
					<ShoppingCartDropdown class="shopping-cart-dropdown-child"></ShoppingCartDropdown>
				</router-link>

				<button id="btn-user">
					<div class="not-login" v-show="!isLogin">
						<span @click="openModel">ĐĂNG NHẬP / ĐĂNG KÝ</span>
						<LoginRegisterComponent :pIsOpen="isOpenModel" @closeModel="onModelClosed"
							@userLoginSuccess="loginSuccess" />
					</div>

					<div class="login user-login-dropdown-parent" v-show="isLogin">
						<span class="user-name">{{ getAccount?.name }}</span>
						<img class="user-avatar" :src="getAccount?.avatar">

						<UserLoginDropdown class="user-login-dropdown-child" :pIsAdmin="getAccount?.isAdmin">
						</UserLoginDropdown>
					</div>
				</button>
			</div>
		</div>

		<nav id="header-nav">
			<ul>
				<li><router-link to="/">DANH MỤC SẢN PHẨM</router-link></li>
				<li><router-link to="/">XÂY DỰNG CẤU HÌNH</router-link></li>
				<li><router-link to="/">KHUYẾN MÃI</router-link></li>
				<li><router-link to="/">THÔNG TIN CÔNG NGHỆ</router-link></li>
				<li><router-link to="/">HƯỚNG DẪN THANH TOÁN</router-link></li>
				<!-- <li style="margin-top: 20px;"><router-link to="/add-product">THÊM SẢN PHẨM</router-link></li> -->
			</ul>
		</nav>
	</header>
</template>


<style scoped>
header {
	background-color: #fdfefe;
	padding: 0 20px 10px;
	margin-bottom: 5px;
}

#header-image {
	height: 80px;
	background-image: url(https://nguyenvu.store/wp-content/uploads/2022/12/top-banner-giang-sinh-1536x75.png);
	background-size: 100%;
	background-repeat: no-repeat;
}

.header-row {
	display: flex;
	align-items: center;
}

.header-row>* {
	/* border: 1px solid red; */
}

.header-row .col-left {}

.header-row .col-center {
	flex: 1;
	margin: 0 40px;
}

.header-row .col-center .header-search-box {
	display: flex;
	background-color: #f5f6f6;
	border-radius: 35px;
	height: 35px;
}

.header-row .col-center .header-search-box:has(> input:focus) {
	box-shadow: 0 0 7px #3083ed;
}

.header-row .col-center .header-search-box button {
	cursor: pointer;
}

.header-row .col-center input {
	flex: 1;
	border: none;
	outline: none;
	background-color: transparent;
	padding-left: 10px;
}

.header-row .col-center button {
	background-color: transparent;
	padding: 0 16px;
	border: none;
	color: grey;
}

.header-row .col-right {}

.header-row .col-right #btn-cart {
	background-color: transparent;
	border: 1px solid #eef1f2;
	border-radius: 35px;
	height: 35px;
	line-height: 35px;
	padding: 0 8px;
	font-weight: bold;
	color: #fc6f4b;
	display: inline-block;
}

.header-row .col-right #btn-cart.shopping-cart-dropdown-parent {
	position: relative;
}

.header-row .col-right #btn-cart.shopping-cart-dropdown-parent:hover .shopping-cart-dropdown-child {
	display: block;
}

.header-row .col-right #btn-cart .shopping-cart-dropdown-child {
	display: none;
	position: absolute;
	top: calc(100% + 7px);
	right: -50px;
	z-index: 1;

}

.header-row .col-right #btn-cart span {
	font-weight: bolder;
}

.header-row .col-right #btn-cart i {
	color: grey;
	font-size: 18px;
	transition: all .2s;
}

.header-row .col-right #btn-cart:hover i {
	color: #f84417;
}

.header-row .col-right #btn-user {
	margin-left: 8px;
	border: none;
	background-color: transparent;
	font-weight: bold;
}

.header-row .col-right #btn-user .not-login {}

.header-row .col-right #btn-user .not-login span {}

.header-row .col-right #btn-user .not-login span:hover {
	color: var(--color-primary);
}

.header-row .col-right #btn-user .login {
	display: flex;
	align-items: center;
}

.header-row .col-right #btn-user .login .user-name {
	margin-right: 8px;
}

.header-row .col-right #btn-user .login:hover .user-name {
	color: var(--color-primary)
}

.header-row .col-right #btn-user .login .user-avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
}

.user-login-dropdown-parent {
	position: relative;
}

.user-login-dropdown-parent:hover .user-login-dropdown-child {
	display: block;
}

.user-login-dropdown-child {
	display: none;
	position: absolute;
	top: 40px;
	right: 0;
	z-index: 1;
}

#header-nav ul {
	margin: 20px auto !important;
	text-align: center;
	padding: 0;
	width: fit-content;
	display: block;
}

#header-nav ul li {
	display: inline-block;
	margin: 0 20px;
	font-size: 18px;
	color: grey;
}

#header-nav ul li>* {
	text-decoration: none;
	color: inherit;
	transition: all .2s;
}

#header-nav ul li> :hover {
	color: red
}
</style>


<script>
import UserLoginDropdown from './UserLoginDropdown.vue'
import LoginRegisterComponent from './LoginRegisterComponent.vue';
import ShoppingCartDropdown from './ShoppingCartDropdown.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	components: {
		UserLoginDropdown, LoginRegisterComponent, ShoppingCartDropdown
	},
	data() {
		return {
			isOpenModel: false,
		}
	},
	computed: {
		...mapGetters(['getAccount', 'isLogin', 'totalPriceInCart']),
	},
	methods: {
		...mapActions(['loginSuccess']),
		openModel() {
			this.isOpenModel = true
		},
		onModelClosed(isModelOpen) {
			this.isOpenModel = isModelOpen
		},
	}
}
</script>
