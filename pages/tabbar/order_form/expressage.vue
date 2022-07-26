<template>
	<view class="cantainer">
		<view class="agree u-border-top">
			<view>商家已同意售后申请，等待寄回商品</view>
			<text>ps：请两天内退回</text>
		</view>
		<view class="sj-address">
			<view class="title-h1">商家售后地址</view>
			<text>{{goods_address.contacts}}：{{goods_address.contactNumber}}</text>
			<text>{{goods_address.province}} {{goods_address.city}} {{goods_address.area}} {{goods_address.address}}</text>
		</view>
		<view class="wrap">
			<view class="top">
				<view class="item">
					<view class="left">物流公司：</view>
					<input type="text" v-model="logistics" placeholder-class="line" placeholder="请填输入物流公司" />
				</view>
				<view class="item">
					<view class="left">物流单号：</view>
					<input type="text" v-model="orderNumber" placeholder-class="line" placeholder="请填填写快递单号" />
				</view>
			</view>
		</view>
		<view class="x-order">
			<text class="order-button" @tap="enterBack"  >确认退货</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logistics:'',
				orderNumber:'',
				goods_address:'',
				gjbdizhi:""
			}
		},
		onShow() {
			
			let {backsAddress} = this.$store.state 
			this.gjbdizhi = backsAddress
					
			let {supplierId} = backsAddress.orderInfo
			this.$u.api.getRefundAddress(supplierId).then(e => { // 商家地址
				this.goods_address = e
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			enterBack(){
				let {gjbdizhi} = this
					console.log(9999,gjbdizhi.orderInfo.orderItem.refundNo)
				// this.logistics:'',
				// this.orderNumber:'',
				let {logistics,orderNumber} = this
				if(!this.$u.trim(logistics)){this.$tools.toast('请输入物流公司'); return false; }
				if(!this.$u.trim(orderNumber)){this.$tools.toast('请输入快递单号'); return false; }
				
				let param={
						"addressId":this.goods_address.addressId,
						"expressCompany": logistics,
						"expressNo": orderNumber,
						"refundNo": gjbdizhi.orderInfo.orderItem.refundNo
				}
		
				this.$u.api.ordersForShipment(param).then(e => { // 确认退货
					uni.navigateBack({
					    delta: 1
					});
				}).catch(err=>{
					console.log(err)
				}) 
			}
		}
	}
</script>

<style lang="scss">
	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
	}
	.agree{
		height: 168rpx;
		padding: 40rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #0F0F0F;
		font-weight: bold;
		border: 2rpx solid #f7f7f7;
		text{
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}
	.sj-address{
		height: 248rpx;
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		background-color: #FFFFFF;
		font-weight: bold;
		.title-h1{
			font-size: 30rpx;
			color: #0F0F0F;
		}
		text{
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}
	
	.wrap {
		background-color: #f2f2f2;
		

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			

			.item {
				padding:0 22rpx;
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
					
				}

				input {
					flex: 1;
					text-align: left;
					font-size: 26rpx;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			padding: 20rpx 0 0 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
		}
	}
	.x-order{
		background: #FFFFFF;
		padding:0 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		z-index: 10;
		.order-button{
			display: block;
			width: 618rpx;
			height: 80rpx;
			background: #FF6D2E;
			border-radius: 10rpx;
			color: #FFFFFF;
			font-size: 38rpx;
			line-height: 80rpx;
			text-align: center;
			
		}
	
	}
</style>
