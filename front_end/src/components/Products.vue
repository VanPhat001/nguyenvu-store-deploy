<template>
    <div class="product-list">
        <router-link :to="'/product/' + product._id" class="product" v-for="(product, index) in products">
            <div class="product-sale" v-show="product.sale !== 0">-{{ product.sale }}%</div>
            <!-- <img class="product-image" :src="product.image" alt=""> -->
            <img class="product-image" :src="product.images[0]" alt="">
            <p class="product-category">{{ product.category }}</p>
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">
                <span class="price" v-show="product.sale !== 0"> {{
                        (product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&#8363;</span>
                <span class="new-price">{{ (product.price * (1 -
                        product.sale / 100.0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&#8363;</span>
            </p>
            <button class="btn-add-cart" @click.prevent="addProductToCart({ productId: product._id, quantity: 1 })">THÊM
                VÀO GIỎ HÀNG</button>
        </router-link>
    </div>
</template>

<script>
import productService from '../services/product.service';
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            products: [],
        }
    },
    methods: {
        ...mapActions(['addProductToCart']),
        async loadProducts() {
            try {
                // cập nhật trang chủ bằng cách load dữ liệu từ thanh tìm kiếm
                //  + nếu dữ liệu rỗng ('') thì load toàn bộ dữ liệu products của trang chủ lên
                //  + ngược lại, chỉ cần tìm kiếm products theo $store.state.searchText
                const TEXT_NOT_AVAILABLE = ''
                if (this.$store.state.searchText == TEXT_NOT_AVAILABLE) {
                    const data = await productService.getAllProduct()
                    this.products = data.message
                }
                else {
                    this.products = await productService.findProductByText(this.$store.state.searchText)
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    async created() {
        await this.loadProducts()
    },
    watch: {
        async '$store.state.searchText'(newValue, oddValue) {
            console.log({ newValue, oddValue });
            this.loadProducts()
        }
    },
}
</script>


<style scoped>
.product-list {
    /* padding: 0 10px; */
    background-color: transparent !important;
}

.product {
    text-align: center;
    font-weight: bold;
    --margin-size: 12px;
    background-color: #fdfefe;
    text-decoration: none;
    color: #212121;
    width: calc(100% / 4 - var(--margin-size)*2);
    margin: var(--margin-size);
    padding: 16px;
    border-radius: 10px;
    box-sizing: border-box;
    display: inline-block;
    transition: all .4s;
    position: relative;
}

.product:hover {
    box-shadow: 3px 2px 10px grey;
    transform: translateY(-3px);
}

.product-sale {
    --box-size: 44px;
    width: var(--box-size);
    height: var(--box-size);
    line-height: var(--box-size);
    background-color: #f7464c;
    color: white;
    border-radius: 50%;

    position: absolute;
    top: 15px;
    left: 8px;
}

.product-image {
    width: 100%;
}

.product-category {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 10px;
    color: grey;
    margin: 0;
}

.product-name {
    font-size: 20px;
    line-height: 26px;
    height: 52px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.product-price {}

.product-price .price,
.product-price .new-price {
    background: -webkit-linear-gradient(108deg, #f7434c, #ff8949);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.product-price .price {
    font-size: 14px;
    position: relative;
}


.product-price .price::after {
    content: "";
    background: linear-gradient(108deg, #f7434c, #ff8949);
    height: 1px;
    width: 100%;

    position: absolute;
    left: 0;
    top: 50%;
}

.product-price .new-price {
    margin-left: 10px;
    font-size: 19px;
}

.btn-add-cart {
    border: none;
    border-radius: 4px;
    background: linear-gradient(108deg, #f7434c, #ff8949);
    width: 100%;
    color: white;
    padding: 10px 0;
    user-select: none;
}

.btn-add-cart:hover {
    background: linear-gradient(108deg, #ff8949, #f7434c);
}
</style>