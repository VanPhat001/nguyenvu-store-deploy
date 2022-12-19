<template >
    <div class="shopping-cart">

        <table class="box-products">
            <tr class="border-bottom-highlight">
                <th class="col-title">SẢN PHẨM</th>
                <th class="col-title">GIÁ</th>
                <th class="col-title">SỐ LƯỢNG</th>
                <th class="col-title">TẠM TÍNH</th>
            </tr>

            <template v-if="getProductsInCart.length > 0">
                <tr v-for="(product, index) in getProductsInCart">
                    <td>
                        <div class="cell-wrapper">
                            <i class="fa-solid fa-xmark ico-close"></i>
                            <img class="product-image" :src="product.images[0]">
                            <p class="product-name">{{ product.name }}
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <p class="product-price">{{ product.price }}&#8363;</p>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <button class="btn-decrease" @click="decreaseQuantity(index)">-</button>
                            <input class="product-quantity" type="number" min="1" v-model="product.quantity">
                            <button class="btn-increase" @click="increaseQuantity(index)">+</button>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <p class="product-total-price-temp">{{ product.price * product.quantity }}&#8363;</p>
                        </div>
                    </td>
                </tr>
            </template>
            <tr>
                <td colspan="4">
                    <div class="cell-wrapper">
                        <button class="btn-product-view">
                            <i class="fa-solid fa-arrow-left-long"></i> TIẾP TỤC XEM SẢN PHẨM
                        </button>
                        <button class="btn-quotation-view"> XEM BÁO GIÁ </button>
                    </div>
                </td>
            </tr>
        </table>

        <div class="box-cart-info">
            <div class="row border-bottom-highlight">
                <div class="col-left">
                    <p class="col-title">CỘNG GIỎ HÀNG</p>
                </div>
            </div>
            <div class="row">
                <div class="col-left">
                    <p class="total-temp-text">Tạm tính</p>
                </div>
                <div class="col-center"></div>
                <div class="col-right">
                    <p class="total-temp-value">19.258.000 ₫</p>
                </div>
            </div>
            <div class="row border-bottom-highlight">
                <div class="col-left">
                    <p class="total-text">Tổng</p>
                </div>
                <div class="col-center"></div>
                <div class="col-right">
                    <p class="total-value">19.258.000 ₫</p>
                </div>
            </div>
            <div class="row">
                <div class="col-center">
                    <button class="btn-pay">TIẾN HÀNH THANH TOÁN</button>
                </div>
            </div>
            <div class="row">
                <div class="col-center">
                    <p class="child-fit-width"><i class="fa-solid fa-tag ico-vouchers"></i> <span
                            class="vouchers-text">Phiếu ưu đãi</span></p>
                    <input class="child-fit-width vouchers-value" type="text" placeholder="Mã ưu đãi">
                    <button class="child-fit-width btn-apply">Áp dụng</button>
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
* {
    font-weight: bold;
}

p {
    margin: 0;
}

.col-title {
    font-size: 17px;
    text-align: left;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    display: none;
}

.border-bottom-highlight {
    border-bottom: 2px solid var(--color-primary);
}

/* =========================== layout ===================================== */

.shopping-cart {
    padding: 40px 0 90px 0;
    display: grid;
    grid-template-areas:
        'box-products box-cart-info';
}

.box-products {
    margin: 0 30px;
    grid-area: box-products;
}

.box-cart-info {
    margin: 0 30px;
    grid-area: box-cart-info;

    position: sticky;
    left: 0px;
    top: 0px;
}

/* ================================ style ====================================== */
/* ========================== shopping cart ================================= */

table {
    border-collapse: collapse;
    font-weight: bold;
}

table tr+tr {
    border-top: 1px solid lightgray;
}

table tr:first-child {
    height: 36px;
}

table tr:last-child {
    border-top: 2px solid var(--color-primary);
}

table th {}

table td {
    max-width: 360px;
}

table td .cell-wrapper {
    display: flex;
    align-items: center;
}

.cell-wrapper .ico-close {
    color: lightgray;
    border: 1px solid currentColor;
    --size: 18px;
    height: var(--size);
    width: var(--size);
    line-height: var(--size);
    border-radius: 50%;
    text-align: center;
}

.cell-wrapper .ico-close:hover {
    color: black;
}

.cell-wrapper .product-image {
    width: 70px;
    height: 70px;
    margin: 10px;
}

.cell-wrapper .product-name {
    flex: 1;
}

.cell-wrapper .product-price,
.cell-wrapper .product-total-price-temp {
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}


.cell-wrapper .product-quantity,
.cell-wrapper .btn-increase,
.cell-wrapper .btn-decrease {
    background-color: transparent;
    border: 1px solid lightgray;
    height: 30px;
    box-sizing: border-box;
}

.cell-wrapper .product-quantity {
    color: var(--color-primary);
    text-align: center;
    outline: none;
    width: 40px;
}

.cell-wrapper .btn-decrease {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 28px;
}

.cell-wrapper .btn-increase {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 28px;
}

.cell-wrapper .btn-product-view,
.cell-wrapper .btn-quotation-view {
    margin-top: 10px;
    padding: 8px 12px;
    font-weight: bold;
    box-sizing: border-box;
}

.cell-wrapper .btn-product-view {
    color: var(--color-primary);
    border: 2px solid currentColor;
    border-radius: 5px;
}

.cell-wrapper .btn-product-view:hover {
    background-color: var(--color-primary);
    color: white;
}

.cell-wrapper .btn-quotation-view {
    margin-left: 18px;
    border: none;
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
    color: white;
}

.cell-wrapper .btn-quotation-view:hover {
    background: none;
    background-color: var(--color-background);
    color: var(--color-primary);
}

/* ========================== box cart info ================================= */
.box-cart-info {}

.row {
    display: flex;
    padding: 10px 0;
}

.row .col-left {
    justify-content: flex-start;
}

.row .col-center {
    flex: 1;
}

.row .col-right {
    justify-content: flex-end;
}

.row .total-temp-text,
.row .total-text {
    color: #000000b8;
    font-size: 15px;
}

.row .total-temp-value,
.row .total-value {
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.row .total-temp-value {
    font-size: 15px;
}

.row .total-value {
    font-size: 18px;
}

.row .btn-pay {
    width: 100%;
    height: 40px;
    color: white;
    background-color: var(--color-primary);
    border: none;
    border-radius: 5px;
    transition: all .3s;
}

.row .btn-pay:hover {
    background-color: #d3252e;
}

.row:has(.child-fit-width) {
    padding: 10px 0;
    border-radius: 5px;
    background-color: var(--color-background);
}

.row .child-fit-width {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
}

.row .ico-vouchers {
    color: var(--color-primary);
}

.row .vouchers-text {
    color: #000000b8;
}

.row .vouchers-value {
    border: 1px solid lightgray;
    margin-bottom: 18px;
    padding-left: 10px;
    border-radius: 5px;
    outline: none;
}

.row .vouchers-value:focus {
    box-shadow: 0 0 10px #3083ed;
}

.row .btn-apply {
    border: none;
    background: -webkit-linear-gradient(right, #ff8949, #f7434c);
    color: white;
    border-radius: 5px;
}

.row .btn-apply:hover {
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
}
</style>



<script>
import { mapGetters, mapMutations } from 'vuex';
import productService from '../services/product.service';
import shoppingCartService from '../services/shoppingCart.service';

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['getProductsInCart'])
    },
    methods: {
        decreaseQuantity(index) {
            if (this.getProductsInCart[index].quantity > 0) {
                this.getProductsInCart[index].quantity--
            }
        },
        increaseQuantity(index) {
            this.getProductsInCart[index].quantity++
        },
    }
}
</script>