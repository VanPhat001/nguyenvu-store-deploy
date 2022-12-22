import Products from '../components/Products.vue';
import AddProduct from '../components/AddProduct.vue';
import ProductInfo from '../components/ProductInfo.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import MyAccount from '../components/MyAccount.vue';
import AdminPage from '../components/AdminPage.vue';
import ProductsTable from '../components/ProductsTable.vue';
import AccountsTable from '../components/AccountsTable.vue';


import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Products },
    { path: '/add-product', component: AddProduct },
    { path: '/product/:id', component: ProductInfo },
    { path: '/shopping-cart', component: ShoppingCart },
    { path: '/my-account', component: MyAccount },
    {
        path: '/admin-page',
        component: AdminPage,
        children: [            
            {
                path: 'products',
                component: ProductsTable
            },            
            {
                path: 'add-product',
                component: AddProduct
            },            
            {
                path: 'accounts',
                component: AccountsTable
            },            
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router