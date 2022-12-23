<template >
    <div class="shopping-cart">

        <ul class="breadcrumb">
            <li :class="{select: curPath == '/shopping-cart/cart'}">
                <router-link to="/shopping-cart/cart">
                    <span>1</span>
                    <span>SHOPPING CART</span>
                </router-link>
            </li>

            <li :class="{select: curPath == '/shopping-cart/payment-info'}">
                <router-link to="/shopping-cart/payment-info">
                    <span>2</span>
                    <span>CHECKOUT DETAILS</span>
                </router-link>
            </li>

            <li>
                <router-link to="/shopping-cart/payment-info">
                    <span>3</span>
                    <span>ORDER COMPLETE</span>
                </router-link>
            </li>
        </ul>

        <router-view></router-view>

    </div>
</template>


<style scoped>
.select span:first-child {
    background-color: var(--color-primary) !important;    
}

.select span:nth-child(2) {
    color: var(--color-primary);
}

.breadcrumb {
    margin: 0;
    padding: 36px 0;
    text-align: center;
}

.breadcrumb li {
    display: inline-block;
}

.breadcrumb li + li::before {
    content: ' > ';
    font-weight: bolder;
    font-size: 20px;
    padding: 0 18px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: var(--color-primary)
}

.breadcrumb li span {
    display: inline-block;
    color: gray;
    font-size: 18px;
    font-weight: bold;
}

.breadcrumb li span:first-child {
    --size: 25px;
    width:  var(--size);
    height: var(--size);
    line-height: var(--size);
    font-size: 15px;
    text-align: center;
    margin-right: 6px;
    
    background-color: gray;
    color: white;
    border-radius: 50%;
}
</style>

<script>
export default {
    computed: {
        curPath() {
            return this.$route.path
        }
    }
}
</script>
