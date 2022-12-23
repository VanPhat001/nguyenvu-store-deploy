<template>
    <div class="add-product-wrapper">
        <form @submit.prevent="onSubmitForm" id="add-product-form">
            <div class="form-row">
                <p class="product-title">Tên sản phẩm</p>
                <input class="product-input" v-model="name" type="text" placeholder="Nhập tên sản phẩm...">
            </div>

            <div class="form-row">
                <p class="product-title">Thể loại</p>
                <input class="product-input" v-model="category" type="text" placeholder="Nhập thể loại sản phẩm...">
            </div>

            <div class="form-row">
                <p class="product-title">Giá</p>
                <input class="product-input" v-model="price" type="number" min="0" 
                    placeholder="Nhập giá sản phẩm...">
            </div>

            <div class="form-row">
                <p class="product-title">Sale</p>
                <input class="product-input" v-model="sale" type="number" min="0" max="100"
                    placeholder="Giảm giá...">
            </div>

            <div class="form-row" v-for="(imageItem, idx) in images">                
                <p class="product-title">Liên kết hình ảnh</p>
                <input class="product-input" v-model="images[idx]" type="text" placeholder="Nhập liên kết hình ảnh...">
                                
                <div class="btn-control-image">                    
                    <div @click.prevent="addImageBox" class="btn-add-image">+</div>
                    <div @click.prevent="removeImageBox(idx)" class="btn-remove-image">-</div>
                </div>
            </div>

            <div class="form-row">
                <p class="product-title">Mô tả</p>
                <textarea class="product-input" v-model="description" type="text" placeholder="Nhập mô tả sản phẩm..."></textarea>
            </div>

            <div class="form-row">
                <button type="submit">Create</button>
                <button ref="btnReset" type="reset" @click="resetForm">Reset</button>
            </div>
        </form>

        <h1 v-show="isSuccess !== null" class="add-product-status">
            <span v-if="isSuccess">Thêm sản phẩm thành công</span>
            <span v-else>Thêm sản phẩm thất bại</span>
        </h1>

    </div>
</template>


<script>
import productService from '../services/product.service';
export default {
    data() {
        return {
            isSuccess: null,
            name: '',
            category: '',
            price: 0,
            sale: 0,
            description: '',
            images: ['']
        }
    },
    methods: {
        onSubmitForm: async function () {
            const product = {
                name: this.name,
                category: this.category,
                price: this.price,
                description: this.description,
                images: this.images,
                sale: this.sale,
            }

            try {
                await productService.createProduct(product)
                this.isSuccess = true
            } catch (error) {
                console.log(error)
                this.isSuccess = false
            } finally {
                this.$refs.btnReset.click()
                console.log('cancel submit form');
            }
        },
        resetForm: function() {
            this.name = '',
            this.category = '',
            this.price = 0,
            this.sale = 0,
            this.description = '',
            this.images = ['']
            document.querySelector('input.product-input').focus()
        },
        addImageBox: function () {
            this.images.push('')
        },
        removeImageBox: function (idx) {
            this.images.splice(idx, 1)
        }
    },
}
</script>


<style scoped>
textarea {
    resize: vertical;
}

.add-product-wrapper {
    background-color: #fdfefe;
    padding: 60px 0;
    margin: 20px;
}

#add-product-form {
    min-width: 60%;
    max-width: 90%;
    width: 900px;
    margin: auto;

    border: 3px solid #808090;
    padding: 50px;
}

.form-row {
    border: 1px solid #808090;
    width: 100%;
    margin-bottom: 20px;

    position: relative;
}

.form-row .product-title {
    font-weight: bold;
    margin: 0;
    user-select: none;

    position: absolute;
    top: 2px;
    left: 5px;
}

.form-row .product-input {
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 22px 10px 14px 6px;
}

.form-row .btn-control-image {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
}

.form-row:hover .btn-control-image,
.form-row .product-input:focus+.btn-control-image {
    display: block;
}

.form-row .btn-control-image .btn-add-image,
.form-row .btn-control-image .btn-remove-image {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    text-align: center;
    color: white;
    border: none;
    font-weight: bolder;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
}

.form-row .btn-control-image .btn-add-image {
    background-color: greenyellow;
}

.form-row .btn-control-image .btn-remove-image {
    background-color: red;
}

.form-row:last-child {
    display: flex;
    border: none;
}

.form-row:last-child button {
    flex: 1;
    height: 45px;
    font-weight: bold;
    border: 1px solid #808090;
}

.add-product-status {
    font-size: 32px;
    text-align: center;
}
</style>
