<template>
	<div class="nav-dropdown">

		<div class="box">
			<div class="content">
				<div class="content-row">
					<i class="fa-solid fa-user"></i>
					<p>TRANG TÀI KHOẢN</p>
				</div>
				<div class="content-row" v-show="pIsAdmin">
					<i class="fa-solid fa-box"></i>
					<p><router-link to="/add-product">THÊM SẢN PHẨM</router-link></p>
				</div>
				<div class="content-row">
					<i class="fa-solid fa-box"></i>
					<p>ĐƠN HÀNG</p>
				</div>
				<div class="content-row">
					<i class="fa-solid fa-cloud-arrow-down"></i>
					<p>TẢI XUỐNG</p>
				</div>
				<div class="content-row">
					<i class="fa-solid fa-location-dot"></i>
					<p>ĐỊA CHỈ</p>
				</div>
				<div class="content-row">
					<i class="fa-solid fa-user"></i>
					<p>TÀI KHOẢN</p>
				</div>
				<div class="content-row" @click="logoutAccount">
					<i class="fa-solid fa-arrow-right-from-bracket"></i>
					<p>THOÁT</p>
				</div>
			</div>
		</div>

	</div>
</template>


<style scoped>
* {
	color: inherit;
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
	width: 210px;
	/* height: 300px; */
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
	height: 100%;
	width: 100%;
	overflow-y: auto;
}

.box .content .content-row {
	display: flex;
	align-items: center;
	height: var(--row-height);
}

.box .content .content-row:hover {
	background: -webkit-linear-gradient(108deg, #ff8949, #f7434c);
}

.box .content .content-row>i {
	width: 40px;
}

.box .content .content-row>p {
	text-align: left;
	color: gray;
	transition: all .2s;
	margin: 0;	
	height: 100%;
	width: 100%;
	line-height: var(--row-height);
}

.box .content .content-row>p:hover {
	color: white !important;
}

.box .content .content-row>p>a {
	text-decoration: none;	
	width: 100%;
	height: 100%;
	display: inline-block;
}

.box .content .content-row:first-child {
	border-bottom: 1px solid lightgray;
}

.box .content .content-row:first-child p,
.box .content .content-row:first-child a,
.box .content .content-row:last-child p,
.box .content .content-row:last-child a {
	color: #f7434c;
}

.box .content .content-row:last-child {
	border-top: 1px solid lightgray;
}

</style>


<script>
export default {
	props: {
		pIsAdmin: { type: Boolean, default: false }
	},
	methods: {
		logoutAccount() {
			localStorage.removeItem('accountId')
			location.replace('/')			
		}
	}
}
</script>

