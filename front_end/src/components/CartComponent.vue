<template>
    <div class="cart-component">
        <table class="box-products">
            <tr class="border-bottom-highlight">
                <th class="col-title">SẢN PHẨM</th>
                <th class="col-title">GIÁ</th>
                <th class="col-title">SALE</th>
                <th class="col-title">SỐ LƯỢNG</th>
                <th class="col-title">TẠM TÍNH</th>
            </tr>

            <template v-if="getProductsInCart.length > 0">
                <tr v-for="(product, index) in getProductsInCart" :key="index">
                    <td>
                        <router-link class="cell-wrapper link" :to="`/product/${product._id}`">
                            <i class="fa-solid fa-xmark ico-close" @click.prevent="removeProductFromCart(index)"></i>
                            <img class="product-image" :src="product.images[0]">
                            <p class="product-name">{{ product.name }} </p>
                        </router-link>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <p class="product-price">{{ product.price }}&#8363;</p>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <p class="product-price">{{ product.sale }}%</p>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <button class="btn-decrease" @click="decreaseQuantity(index)">-</button>
                            <input class="product-quantity" type="number" min="1" @change="pushCartDataToServer"
                                v-model="product.quantity">
                            <button class="btn-increase" @click="increaseQuantity(index)">+</button>
                        </div>
                    </td>
                    <td>
                        <div class="cell-wrapper">
                            <p class="product-total-price-temp">{{ product.price * product.quantity * (1 -
                            product.sale/100.0)}}&#8363;</p>
                        </div>
                    </td>
                </tr>
            </template>
            <tr>
                <td colspan="4">
                    <div class="cell-wrapper">
                        <router-link class="btn-product-view" to="/" @click="gotoHome">
                            <i class="fa-solid fa-arrow-left-long"></i> TIẾP TỤC XEM SẢN PHẨM
                        </router-link>
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
                    <p class="total-temp-value">{{ totalPriceInCart }}&#8363;</p>
                </div>
            </div>
            <div class="row">
                <div class="col-left">
                    <p class="total-text">Tổng</p>
                </div>
                <div class="col-center"></div>
                <div class="col-right">
                    <p class="total-value">{{ totalPriceInCart * (1 - voucherSale/100.0)}}&#8363;</p>
                </div>
            </div>

            <div class="row border-bottom-highlight">
                <p class="voucher-show" v-if="voucherSale">voucher giảm {{ voucherSale }}%</p>
            </div>

            <div class="row">
                <div class="col-center">
                    <button class="btn-pay" @click="gotoPaymentInfo">TIẾN HÀNH THANH TOÁN</button>
                </div>
            </div>
            <div class="row">
                <div class="col-center">
                    <p class="child-fit-width"><i class="fa-solid fa-tag ico-vouchers"></i> <span
                            class="vouchers-text">Phiếu ưu đãi</span></p>
                    <input class="child-fit-width vouchers-value" type="text" placeholder="Mã ưu đãi"
                        v-model="voucherText" @keypress.enter="useVoucher">
                    <button class="child-fit-width btn-apply" @click="useVoucher">Áp dụng</button>
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

.link:hover>p {
    color: red !important;
}

.col-title {
    font-size: 17px;
    text-align: center;    
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    display: none;
}

.border-bottom-highlight {
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: 8px;
}

/* =========================== layout ===================================== */

.cart-component {
    padding: 40px 0 90px 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
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

table th {
    text-align: center !important;
}

table td {
    max-width: 360px;
}

table tr:not(:first-child) td:not(:first-child) .cell-wrapper {
    justify-content: center;
}

/* table tr:not(:first-child) td:not(:first-child) .cell-wrapper:has(.product-quantity) {
    justify-content: center;
} */

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
    color: black;
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

.row .voucher-show {
    width: 100%;
    text-align: center;
    font-weight: normal;
    font-size: 15px;
    color: red;
    font-style: italic;
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            voucherSale: 0,
            voucherText: ''
        }
    },
    computed: {
        ...mapGetters(['getProductsInCart', 'totalPriceInCart'])
    },
    methods: {
        ...mapMutations(['setSearchText']),
        ...mapActions(['decreaseQuantity', 'increaseQuantity', 'pushCartDataToServer']),
        async removeProductFromCart(index) {
            const productsInCart = this.getProductsInCart
            productsInCart.splice(index, 1)
            await this.pushCartDataToServer()
        },
        useVoucher() {
            if (this.voucherText == 'giam10') {
                this.voucherSale = 10
            }
            else if (this.voucherText == 'giam25') {
                this.voucherSale = 25
            }
            else if (this.voucherText == 'giam50') {
                this.voucherSale = 50
            }
            else {
                this.voucherSale = 0
            }
        },
        gotoHome() {
            this.searchValue = ''
            this.setSearchText('')
        },
        gotoPaymentInfo() {
            this.$router.push('/shopping-cart/payment-info')
        }
    },
}
</script>