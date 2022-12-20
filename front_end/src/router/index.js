import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import AddProduct from '../components/AddProduct.vue';
import ProductInfo from '../components/ProductInfo.vue';
// import NavDropdown from '../components/NavDropdown.vue';
// import LoginRegisterComponent from '../components/LoginRegisterComponent.vue';
import ShoppingCartDropdown from '../components/ShoppingCartDropdown.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import MyAccount from '../components/MyAccount.vue';


const routes = [
    { path: '/', component: Products },
    { path: '/add-product', component: AddProduct },
    { path: '/product/:id', component: ProductInfo },
    { path: '/shopping-cart', component: ShoppingCart },
    { path: '/my-account', component: MyAccount },
    { path: '/test-link', component: ShoppingCartDropdown },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router