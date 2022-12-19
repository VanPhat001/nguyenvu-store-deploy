<template>
    <div class="shopping-cart-dropdown">
        <div class="box">
            <div class="content">
                <div class="content-row">
                    <div class="product-list">
                        <div class="row" v-for="item in []">
                            <div class="col">
                                <img class="product-image"
                                    src="https://nguyenvu.store/wp-content/uploads/2022/07/chuot-msi-gaming-clutch-gm41-lightweight-4-510x510.jpg">
                            </div>
                            <div class="col">
                                <p class="product-name">CHUỘT MÁY TÍNH CÓ DÂY GOLDEN FIELD GM301</p>
                                <p class="product-price"><span>2</span> x <span>999.999&#8363;</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-row">
                    <p class="total-price-text">Tổng số phụ: <span class="total-price">999.999.999&#8363;</span></p>
                </div>

                <div class="content-row">
                    <div>
                        <router-link id="btn-goto-shopping-cart" to="/shopping-cart">XEM GIỎ HÀNG</router-link>
                        <button id="btn-pay">THANH TOÁN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
p {
    margin: 0;
}

a {
    text-decoration: none;
    display: inline-block;
}

.box {
    --arrow-size: 12px;
    --arrow-x: 72px;
    --arrow-y: 1px;
    --edge-width: 100%;
    --edge-height: 12px;
    --edge-x: 0px;
    --edge-y: 0px;
    --edge-color: transparent;
    --row-height: 40px;

    box-shadow: 0 0 10px #3083ed;
    border-collapse: collapse;
    border-radius: 4px;
    padding: 10px;
    background-color: var(--color-background);
    width: 310px;
    color: black;
    font-size: 13px;
    font-weight: bold;
    position: relative;
}

.box::before {
    content: "";
    height: var(--edge-height);
    width: var(--edge-width);
    background-color: var(--edge-color);

    position: absolute;
    bottom: calc(100% + var(--edge-y));
    right: var(--edge-x);
}

.box::after {
    content: "";
    border: var(--arrow-size) solid transparent;
    border-bottom-color: var(--color-background);

    position: absolute;
    bottom: calc(100% - calc(1px));
    right: var(--arrow-x);
}

.box .content {
    box-sizing: border-box;
    height: 100%;
}

.content-row {
    padding: 10px 5px;
}

.content-row+.content-row {
    border-top: 1px solid lightgray;
}

.product-list {
    max-height: 240px;
    overflow-y: auto;
}

.product-list .row {
    display: flex;
    padding: 10px 5px;
}

.product-list .row+.row {
    border-top: 1px solid lightgray;
}

.product-list .row:hover {
    background-color: lightgray;
}

.product-list .row:hover .product-image {
    transform: translateX(5px);
}

.product-list .row:hover .product-name {
    color: var(--color-primary);
}

.product-list .row .col+.col {
    flex: 1;
}

.product-list .row .col .product-image {
    border: 1px solid lightgray;
    width: 50px;
    height: 50px;
    margin: 0 15px 0 0;
    transition: all .3s;
}

.product-list .row .col .product-name {
    font-size: 16px;
    line-height: 19px;
}

.product-list .row .col .product-price {
    font-size: 15px;
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-top: 5px;
}

.content-row .total-price-text {
    color: #777;
    font-size: 16px;
    text-align: center;
}

.content-row .total-price-text .total-price {
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 18px;
}

#btn-goto-shopping-cart,
#btn-pay {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    border-radius: 5px;
    font-weight: bold;
    border: none;
    color: white;
}

#btn-goto-shopping-cart {
    background-color: #616161;
}

#btn-goto-shopping-cart:hover {
    background-color: black;
}

#btn-pay {
    margin-top: 5px;
    background: -webkit-linear-gradient(right, #f7434c, #ff8949);
}

#btn-pay:hover {
    background: -webkit-linear-gradient(right, #ff8949, #f7434c);
}
</style>


<script>
export default {

}
</script>