<template>
	<view class="cantainer">
		<view class="x-head">
			<image src="/static/luj.png" mode=""></image>
			<text>未绑定微信</text>
			<view @tap="bindWx">微信绑定</view>
		</view>
		<view class="x-money">
			<text class="font-txt">提现金额</text>
			<view class="x-input">
				<text>￥</text> <input type="number"
					placeholder-style="font-size:38rpx; font-weight:normal; padding-left:10rpx;" placeholder="请输入" />
			</view>
			<view class="money-down">
				<text>余额</text>
				<text class="u-font-24 orange u-margin-left-10">￥1350.00</text>
				<image src="/static/jilv.png" mode=""></image>
				<text>提现纪录</text>
			</view>
		</view>

		<view class="rd-box">
			<view class="rd-item" v-for="(item, index) in 3" :key="index" @tap="jump_detail">
				<u-checkbox v-model="checked" icon-size=32 size=32  shape="circle" active-color="green" ></u-checkbox>
				<view class="little">
					<image src="/static/logo.png" mode=""></image>
					<view>
						<view>店铺名称</view>
						<text>可提现金额：￥12125</text>
					</view>
				</view>
				<u-icon class="last-icon" color="#999999" name="arrow-right" size="32"></u-icon>
			</view>
		</view>
		<view class="x-down">
			<u-checkbox v-model="checked" icon-size=32 size=32  shape="circle" active-color="green" >全选</u-checkbox>
			<text class="down-item">共0家</text>
			<view @tap="withdraw_later" class="x-btn">提现</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:true
			}
		},
		methods: {
			bindWx(){
				uni.navigateTo({
					url:"/pages/my/bindwx/bindwx"
				})
			},
			jump_detail(){
				uni.navigateTo({
					url:"/pages/my/money_detail/money_detail"
				})
			},
			withdraw_later(){
				uni.navigateTo({
					url:"/pages/my/withdraw_later/withdraw_later"
				})
			}
		}
	}
</script>

<style lang="scss">
	.orange {
		color: #FF6D2E;
	}

	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
	}

	.x-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		background: #FFFFFF;
		padding: 0 30rpx;

		image {
			height: 80rpx;
			width: 80rpx;
			background-size: 100% 100%;
			border-radius: 50%;
		}

		text {
			font-size: 28rpx;
			color: #999999;
			margin-left: 8rpx;
		}

		view {
			margin-left: auto;
			width: 152rpx;
			height: 60rpx;
			background: #FF6D2E;
			border-radius: 12rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.x-money {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		.font-txt {
			color: #333;
			font-size: 32rpx;
		}

		.x-input {
			display: flex;
			align-items: center;
			height: 120rpx;
			font-size: 60rpx;
			color: #FF6D2E;
			border-bottom: 2rpx solid #E4E4E4;
			font-weight: bold;

			input {
				height: 80rpx;
				padding-left: 10rpx;
			}

			text {
				font-weight: normal;
				font-size: 48rpx;
			}
		}

		.money-down {
			display: flex;
			height: 82rpx;
			align-items: center;

			image {
				margin-left: auto;
				height: 30rpx;
				width: 30rpx;
				margin-right: 10rpx;
			}

			text {
				line-height: 100%;
			}
		}
	}

	.rd-box {
		width: 710rpx;
		margin: 20rpx auto;
		.rd-item {
			display: flex;
			align-items: center;
			height: 154rpx;
			background-color: #FFFFFF;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.x-checkbox {
				background-color: red;
				border-radius: 50%;
				height: 30rpx;
				width: 30rpx;
			}

			.little {
				display: flex;

				image {
					height: 110rpx;
					width: 110rpx;
				}

				>view {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left: 20rpx;

					view {
						font-size: 34rpx;
						color: #333333;
					}

					text {
						font-size: 28rpx;
						color: #FF6D2E;
					}
				}
			}

			.last-icon {
				margin-left: auto;
			}
		}
	}
	
	.x-down{
		height: 100rpx;
		width: 750rpx;
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		padding-left: 28rpx;
		box-sizing: border-box;
		.x-btn{
			height: 100%;
			width: 252rpx;
			background-color: #FF6D2E;
			color: #FFFFFF;
			text-align: center;
			line-height: 100rpx;
		}
		.down-item{
				margin-left: auto;
				margin-right: 20rpx;
		}
	}
</style>
