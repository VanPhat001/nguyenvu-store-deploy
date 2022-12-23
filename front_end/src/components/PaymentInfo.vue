<template>
	<div class="payment-info">

		<div class="account-info">
			<table>
				<caption>THÔNG TIN THANH TOÁN</caption>

				<tbody>
					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-email">Địa chỉ email *</label>
								<input id="payment-info-email" type="text" disabled :value="mail">
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-first-name">Tên *</label>
								<input id="payment-info-first-name" type="text" disabled :value="firstName">
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-last-name">Họ *</label>
								<input id="payment-info-last-name" type="text" disabled :value="lastName">
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-address">Địa chỉ *</label>
								<input id="payment-info-address" type="text">
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-city">Tỉnh/Thành phố *</label>
								<input id="payment-info-city" type="text">
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="payment-info-phone-number">Số điện thoại *</label>
								<input id="payment-info-phone-number" type="text">
							</div>
						</td>
					</tr>

				</tbody>

				<tfoot>
					<tr>
						<td>
							<p class="heading">THÔNG TIN BỔ SUNG</p>
						</td>
					</tr>
					<tr>
						<td>
							<div class="cell-wrapper">
								<label for="">Ghi chú đơn hàng (tùy chọn)</label>
								<textarea id=""
									placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."></textarea>
							</div>
						</td>
					</tr>
				</tfoot>

			</table>
		</div>

		<div class="cart-info">

			<table>
				<caption>ĐƠN HÀNG CỦA BẠN</caption>

				<tbody>
					<tr class="border-bottom-highlight">
						<td>
							<div class="cell-wrapper">
								<p>SẢN PHẨM</p>
							</div>
						</td>
						<td>
							<div class="cell-wrapper">
								<p>TẠM TÍNH</p>
							</div>
						</td>
					</tr>

					<tr v-for="(product, index) in products" :key="index">
						<td>
							<div class="cell-wrapper">
								<p>{{ product.name }}</p>
							</div>
						</td>
						<td>
							<div class="cell-wrapper">
								<p>{{ product.price }}đ</p>
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div class="cell-wrapper">
								<p>Tạm tính</p>
							</div>
						</td>
						<td>
							<div class="cell-wrapper">
								<p>{{ $store.getters.totalPriceInCart }}đ</p>
							</div>
						</td>
					</tr>

					<tr class="border-bottom-highlight">
						<td>
							<div class="cell-wrapper">
								<p>Tổng</p>
							</div>
						</td>
						<td>
							<div class="cell-wrapper">
								<p>{{ $store.getters.totalPriceInCart }}đ</p>
							</div>
						</td>
					</tr>
				</tbody>

				<tfoot>
					<tr>
						<td colspan="2">
							<div class="cell-wrapper">
								<input id="at-destination" name="payment" type="radio" value="at-destination" v-model="paymentMethod">
								<label for="at-destination">Thanh toán khi nhận hàng (COD)</label>
								<div :class="{ 'content': true, 'expand': paymentMethod === 'at-destination' }">
									<p>Vui lòng chuẩn bị trước tiền mặt khi nhận hàng</p>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div class="cell-wrapper">
								<input id="at-shop" name="payment" type="radio" value="at-shop" v-model="paymentMethod">
								<label for="at-shop">Thanh toán trực tiếp tại cửa hàng</label>
								<div :class="{ 'content': true, 'expand': paymentMethod === 'at-shop' }">
									<p>Showroom - 174/12 Lê Bình, Ninh Kiều, Cần Thơ</p>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div class="cell-wrapper">
								<input id="online" name="payment" type="radio" value="online" v-model="paymentMethod">
								<label for="online">Thanh toán trực tuyến & Trả góp trực tuyến</label>
								<div :class="{ 'content': true, 'expand': paymentMethod === 'online' }">
									<p>Để đảm bảo việc thanh toán thành công, chúng tôi kiểm tra sản phẩm trong kho và phản hồi cho bạn
										thông qua email.</p>
									<p>Sau khi phản hồi, các cổng thanh toán trực tuyến sẽ được mở tại đó. </p>
									<p>Các cổng thanh toán trực tuyến hỗ trợ:</p>
									<p> - Trả góp trực tuyến.</p>
									<p> - Thanh toán trực tuyến.</p>
									<p> - Visa / Master Card </p>
								</div>
							</div>
						</td>
					</tr>

					<tr>
						<td colspan="2">
							<div class="cell-wrapper">
								<button @click="order">ĐẶT HÀNG</button>
								<p>Bằng cách nhấp vào Đặt hàng, bạn đồng ý với điều khoản và điều kiện và chính sách riêng tư của chúng
									tôi.</p>
							</div>
						</td>
					</tr>
				</tfoot>

			</table>

		</div>

	</div>
</template>


<style scoped>
/* ========================== layout ========================== */
.payment-info {
	display: flex;
	align-items: flex-start;
	margin-bottom: 30px;
}

.account-info,
.cart-info {
	background-color: var(--color-background);
	padding: 24px;
	border-radius: 5px;
	margin: 12px;
}

.account-info {
	flex: 7;
	margin-right: 20px;
}

.cart-info {
	flex: 5;
	border: 2px solid var(--color-primary);
}


/* ========================== style ========================== */

p {
	margin: 0;
}

table {
	width: 100%;
	border-collapse: collapse;
	font-weight: bold;
	color: #222;
	font-size: 15px;
}

table caption,
table .heading {
	font-size: 20px;
	margin: 20px 0;
	color: var(--color-primary);
	text-align: left;
}

table tr {
	/* border: 1px solid;	 */
}

table td {
	/* border: 1px solid; */
	padding: 8px 0;
}

table .cell-wrapper {}

table label {
	margin: 4px 0;
	display: block;
}

table input[type=text],
table textarea {
	border: 1px solid lightgray;
	height: 36px;
	padding-left: 10px;
	box-sizing: border-box;
	border-radius: 5px;
	width: 100%;
	outline: none;
}

table input[type=text]:focus,
table textarea:focus {
	box-shadow: 0 0 4px #3083ed;
}

table textarea {
	resize: vertical;
	height: 100px;
}

/* ========================== account info ========================== */
/* ========================== cart info ========================== */
.border-bottom-highlight {
	border-bottom: 2px solid var(--color-primary);
}

.cart-info table input[type=radio] {
	width: 30px;
	margin: 0;
}

.cart-info table input[type=radio]+label {
	width: calc(100% - 30px);
	display: inline-block;
}

.cart-info table td:first-child p {
	padding-right: 30px;
}

.cart-info table td:nth-child(2) p {
	text-align: right;
}

.cart-info table tr:not(:first-child) td:nth-child(2) p {
	color: var(--color-primary);
}

.cart-info table .content {
	color: #777;
	font-weight: normal;
	display: none;
}

.cart-info table .content.expand {
	display: block;
}

.cart-info table button {
	color: white;
	background-color: var(--color-primary);
	font-weight: bold;
	font-size: 16px;
	border: none;
	width: 100%;
	padding: 8px 0;
	border-radius: 5px;
	cursor: pointer;
	margin: 12px 0;
}

.cart-info table button:hover {
	background-color: #e63a40;
}

.cart-info table button+p {
	color: #777;
	font-weight: normal;
}
</style>


<script>
export default {
	data() {
		return {
			paymentMethod: 'at-destination',

		}
	},
	computed: {
		account() {
			return this.$store.state.account
		},
		mail() {
			return this.account?.username
		},
		firstName() {
			const name = this.account?.name
			if (name) {
				const words = name.split(' ')
				return words[words.length - 1]
			}
			return null
		},
		lastName() {
			const name = this.account?.name
			if (name) {
				const words = name.split(' ')
				words.pop()
				return words.join(' ')
			}
			return null
		},
		products() {
			return this.$store.state.productsInCart
		}
	},
	methods: {
		order() {
			alert('chưa code =))');
		}
	},
}
</script>


