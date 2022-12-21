<template>    
    <div id="product-info" >
        <div class="product-image-box">
            <div class="main-box">
                <div class="product-sale" v-show="sale != 0">-{{ sale }}%</div>
                <img ref="mainImage" :src="images[0]">
            </div>
            <div class="sub-box">
                <img v-for="(imageItem, idx) in images" :src="imageItem" @click="setMainImage(imageItem)">
            </div>
        </div>

        <div class="product-heading">
            <table>
                <tr>
                    <td>
                        <h1 class="product-name">{{ name }}</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <hr style="border: 2px solid var(--color-primary);">
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="product-price">
                            <span class="price" v-show="sale != 0"> {{ priceFormat(price) }}&#8363; </span>

                            <span class="new-price"> {{ priceFormat(price * (1 - sale / 100.0)) }}&#8363; </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="product-category">{{ category }}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="quantity-box">
                            <button id="btn-decrease" @click="decreaseQuantity">-</button>
                            <input class="product-quantity" type="number" v-model="quantity" @change="onQuantityChange">
                            <button id="btn-increase" @click="increaseQuantity">+</button>
                        </div>

                        <button id="btn-add-cart" @click="addCart">THÊM VÀO GIỎ HÀNG</button>
                        <button id="btn-buy">THANH TOÁN</button>
                        <button id="btn-call"><i class="fa-solid fa-phone"></i></button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="product-content">
            <p class="product-description">{{ description }}</p>
        </div>

    </div>
</template>

<script>
import productService from '../services/product.service'
import { mapActions } from 'vuex'
export default {
    data() {
        return {            
            images: [''],
            name: '',
            quantity: 1,
            description: '',
            category: '',
            price: 0,
            sale: 0
        }
    },
    computed: {
        productId() {
            return this.$route.params.id
        }
    },
    methods: {
        ...mapActions(['addProductToCart']),
        setMainImage(imageUrl) {
            this.$refs['mainImage'].src = imageUrl
        },
        decreaseQuantity() {
            this.quantity--
        },
        increaseQuantity() {
            this.quantity++
        },
        priceFormat(priceNumber) {
            return priceNumber.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        },
        addCart() {
            this.addProductToCart({
                productId: this.productId,
                quantity: this.quantity,                
            })
        }
    },
    watch: {
        quantity() {
            this.quantity = Math.max(this.quantity, 1)
        },  
    },
    async created() {
        try {
            const product = await productService.getProductById(this.productId)

            this.category = product.category
            this.images = product.images
            this.name = product.name
            this.quantity = product.quantity || 1
            this.description = product.description
            this.price = product.price
            this.sale = product.sale
        } catch (error) {
            console.log(error);
        }
    },
}
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    display: none;
}

/* ========================== layout ========================== */
#product-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        'image-box heading'
        'content content';
}

.product-image-box,
.product-heading,
.product-content {
    padding: 20px;
    margin-top: 20px;
}

.product-image-box {
    grid-area: image-box;
}

.product-heading {
    grid-area: heading;
}

.product-content {
    text-align: right;
    grid-area: content;
    margin-bottom: 20px;
}

/* ========================== style ========================== */

/* ========================== product image box ========================== */
.product-image-box {
    background-color: var(--color-background);
}

.product-image-box .main-box {
    position: relative;
    text-align: center;
    width: 100%;
}

.product-image-box .main-box img {
    width: 100%;
}

.product-image-box .main-box .product-sale {
    position: absolute;
    top: 10px;
    left: 10px;
    --size: 46px;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    text-align: center;
    border-radius: 50%;
    background-color: var(--color-primary);
    font-size: 16px;
    color: white;
    font-weight: bold;
}

.product-image-box .sub-box {
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
}

.product-image-box .sub-box img {
    --margin: 4px;
    width: calc(25% + calc(-2) * var(--margin));
    margin: var(--margin);
    border: 1px solid lightgrey;
    border-radius: 7px;
    box-sizing: border-box;
    opacity: .65;
}

.product-image-box .sub-box img:hover {
    border: 2px solid var(--color-primary);
    opacity: 1;
}

/* ========================== product heading ========================== */
.product-heading {
    background-color: var(--color-background);
    text-align: right;
    padding-left: 50px;
}

.product-heading table {
    width: 100%;
}

.product-heading td {
    height: fit-content;
}

.product-heading .product-name {
    font-size: 24px;
}

.product-heading .product-price {
    font-size: 26px;
    font-weight: bold;
    color: var(--color-primary);
}

.product-heading .product-price .price {
    font-size: 85%;
    opacity: .7;
    position: relative;
}

.product-heading .product-price .price::after {
    content: "";
    background: linear-gradient(108deg, #f7434c, #ff8949);
    height: 2px;
    width: 100%;

    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}

.product-heading .product-price .new-price {
    margin-left: 12px;
}

.product-heading .product-new-price {
    color: var(--color-primary);
}

.product-heading .product-category {}

.product-heading .quantity-box {
    display: inline-block;
}

.product-heading .quantity-box #btn-decrease,
.product-heading .quantity-box #btn-increase,
.product-heading .quantity-box .product-quantity {
    background-color: var(--color-background);
    font-size: 16px;
    min-width: 30px;
    height: 36px;
    text-align: center;
    border: 1px solid grey;

    box-sizing: border-box;
}

.product-heading .quantity-box #btn-decrease:hover,
.product-heading .quantity-box #btn-increase:hover {
    background-color: #e7e5e5;
}

.product-heading .quantity-box #btn-decrease {}

.product-heading .quantity-box .product-quantity {
    width: 42px;
    outline: none;
    color: var(--color-primary);
}

.product-heading .quantity-box:has(.product-quantity:focus) {
    box-shadow: 0 0 7px #3083ed;
}

.product-heading .quantity-box #btn-increase {}

.product-heading #btn-add-cart,
.product-heading #btn-buy,
.product-heading #btn-call {
    background-color: var(--color-primary);
    color: white;
    margin-left: 10px;
    --height: 36px;
    height: var(--height);
    line-height: var(--height);
    border-radius: var(--height);
    border: none;
    font-weight: bold;
    min-width: var(--height);
}

.product-heading #btn-add-cart:hover,
.product-heading #btn-buy:hover,
.product-heading #btn-call:hover {
    background-color: #c01a1f;
}

.product-heading #btn-add-cart {}

.product-heading #btn-buy {}

.product-heading #btn-call {}

/* ========================== product content ========================== */
.product-content {
    background-color: var(--color-background);
}

.product-content .product-description {
    font-size: 20px;
}
</style>