<script >
import ProductsTable from './ProductsTable.vue'
import { mapMutations} from 'vuex'
export default {
    components: {
        ProductsTable
    },
    methods: {
        ...mapMutations(['setSearchText']),
        resetSearchText() {
            this.setSearchText('')
        }
    }
}
</script>


<template>
    <div class="admin-page">

        <ul class="nav-bar vertical">
            <li class="list">
                <router-link class="router-link" to='/' @click="resetSearchText">Trang chủ</router-link>
            </li>
            <li class="list">
                <router-link class="router-link" to='/admin-page/products'>Cập nhật sản phẩm</router-link>
            </li>
            <li class="list">
                <router-link class="router-link" to='/admin-page/add-product'>Thêm sản phẩm</router-link>
            </li>
            <li class="list">
                <router-link class="router-link" to='/admin-page/accounts'>Tài khoản</router-link>
            </li>
        </ul>

        <div class="main-content">
            <!-- <ProductsTable></ProductsTable>             -->
            <router-view></router-view>
        </div>

    </div>
</template>


<style scoped>
p {
    margin: 0;
}

.admin-page {
    display: flex;
}

.nav-bar {
    flex: 2;
    padding: 16px 0;
    height: fit-content;
    position: sticky;
    top: 10px;
    left: 0;
}

.main-content {
    flex: 10;
    margin: 0 16px;
    padding: 10px 20px;
    background-color: var(--color-background);
    border-radius: 5px;
}

.nav-bar  {    
    background-color: var(--color-background);
    border-radius: 5px;
    margin: 0;    
}

.nav-bar .router-link {        
    padding: 7px 10px 0 20px;
    font-size: 20px;
    display: block;
}
</style>