<template>

    <div class="products-table">
        <table>
            <caption ref="caption">Quản lí sản phẩm</caption>
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th style="width: 180px;">Danh mục</th>
                    <th style="width: 50px;">Sale</th>
                    <th style="width: 120px;">Giá</th>
                    <th style="width: 80px;">Còn lại</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(product, index) in products.slice(firstRange, lastRange)" :key="index">
                    <tr :class="{ 'edit-mode': editRowIndex == index }">
                        <td>
                            <img :src="product?.images?.at(0)">
                        </td>
                        <td>
                            <router-link class="edit-mode-hidden-item" :to="`/product/${product._id}`"> {{ product?.name
                            }} </router-link>
                            <textarea class="edit-mode-show-item" type="text" v-model="products[index].name"></textarea>
                        </td>
                        <td>
                            <p class="edit-mode-hidden-item"> {{ product?.category }} </p>
                            <textarea class="edit-mode-show-item" type="text"
                                v-model="products[index].category"></textarea>
                        </td>
                        <td>
                            <p class="edit-mode-hidden-item"> {{ product?.sale }}% </p>
                            <input class="edit-mode-show-item" type="text" v-model="products[index].sale">
                        </td>
                        <td>
                            <p class="edit-mode-hidden-item"> {{ product?.price }}<u>đ</u> </p>
                            <input class="edit-mode-show-item" type="text" v-model="products[index].price">
                        </td>
                        <td>
                            <p> {{ product?.remain || 200 }} </p>
                            <!-- <input type="text" v-model="products[index].remain"></input> -->
                        </td>
                        <td>
                            <div class="btn-wrapper">
                                <i class="fa-sharp fa-solid fa-square-check ico-check edit-mode-show-item"
                                    @click="editSuccess(index)"></i>
                                <i class="fa-solid fa-pen-to-square ico-edit edit-mode-hidden-item"
                                    @click="editRow(index)"></i>
                                <i class="fa-solid fa-trash ico-trash edit-mode-show-item"
                                    @click="deleteProduct(index)"></i>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        <div class="pagination">
            <button @click="changeTableContent(1)">
                <i class="fa-solid fa-angles-left"></i>
            </button>
            <button v-for="pos in numberButtons" :class="{ 'btn-select': pos == pageIndex + 1 }" :key="pos"
                @click="changeTableContent(pos)">{{ pos }}</button>
            <button @click="changeTableContent(numberButtons)">
                <i class="fa-solid fa-angles-right"></i>
            </button>
        </div>
    </div>

</template>


<style scoped>
.edit-mode .edit-mode-show-item {
    display: block !important;
}

.edit-mode .edit-mode-hidden-item {
    display: none !important;
}

.edit-mode input.edit-mode-show-item {
    max-width: 100px;
    text-align: right;
}

.edit-mode .ico-check {
    color: green;
}

table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    font-size: 16px;
}

table thead {
    height: 44px;
    background-color: #a4a5a5;

    position: sticky;
    top: 0;
    left: 0;
    opacity: .77;
}

table caption {
    font-size: xx-large;
    font-weight: bold;
    padding: 10px 0;
    font-style: italic;
    color: var(--color-primary)
}

table tbody tr:nth-child(even) {
    background-color: #d6d8d8;
}

table td {
    min-width: 30px;
}

table img {
    width: 85px;
}

table a {
    color: blue;
}

table a:hover {
    color: rgb(6, 45, 94);
    font-weight: bold;
}

table textarea,
table input {
    display: none;
}

table p {
    padding: 0 10px 0 0;
}

table .btn-wrapper {
    display: flex;
}

table .btn-wrapper i:first-child {
    display: none;
}


table .btn-wrapper i {
    margin: 4px;
    color: var(--color-primary);
    font-size: 20px;
    opacity: .7;
}

table .btn-wrapper i:hover {
    opacity: 1;
}

.pagination {
    margin: 20px 0 50px 0;
    text-align: center;
}

.pagination button {
    border: 1px solid lightgray;
    padding: 3px 0;
    min-width: 40px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.pagination button+button {
    margin-left: 2px;
}

.pagination .btn-select {
    background-color: var(--color-primary);
    color: white;
}
</style>



<script>
import productService from '../services/product.service';
export default {
    data() {
        return {
            editRowIndex: -1,
            pageIndex: 0,
            pageLimitRows: 10,
            products: [
                {
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAiSbUgqCbN_h3H7g5tjIZK4ljpN7cOAOFg&usqp=CAU',
                    name: 'tên sản phẩm',
                    category: 'danh mục',
                    sale: 12,
                    remain: 200,
                    price: 12500000,
                }
            ]
        }
    },
    computed: {
        numberButtons() {
            return Math.ceil(this.products.length / this.pageLimitRows)
        },
        firstRange() {
            return this.pageIndex * this.pageLimitRows
        },
        lastRange() {
            return (this.pageIndex + 1) * this.pageLimitRows
        }
    },
    methods: {
        scrollToCaption() {
            const el = this.$refs.caption;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        },
        changeTableContent(pos) {
            this.pageIndex = pos - 1
            this.scrollToCaption()
        },
        editRow(index) {
            this.editRowIndex = index
        },
        async editSuccess(index) {
            try {
                const product = this.products[index]
                await productService.updateProductById(product._id, product)
                alert('Cập nhật dữ liệu thành công!')
                this.editRowIndex = -1
            } catch (error) {
                console.log(error)
                alert('Cập nhật dữ liệu thất bại')
            }
        },
        async deleteProduct(index) {
            try {
                const id = this.products[index]._id
                await productService.deleteProductById(id)

                this.products.splice(index, 1)
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        try {
            this.products = (await productService.getAllProduct()).message
        } catch (error) {
            console.log(error);
        }
    }
} 
</script>