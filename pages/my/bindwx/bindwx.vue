<template>
	<view class="cantainer">
		<view class="x-head">
			<image src="/static/luj.png" mode=""></image>
			<text>未绑定微信</text>
			<view>微信绑定</view>
		</view>
		<view class="x-money">
			<text class="font-txt">手机验证</text>
			<view class="x-input">
				<input type="number" placeholder-style="padding-left:10rpx;" placeholder="请输入手机号" />
			</view>
			<view class="x-input">
				<input type="number" placeholder="请输入验证码" />
				<text>发送验证</text>
			</view>
		</view>
		<button class="x-btn" @tap="j_black">立即绑定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			j_black(){
				uni.redirectTo({
					url:"/pages/my/withdraw/withdraw"
				})
			}
		}
	}
</script>

<style lang="scss">
	.cantainer{
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
		border-top: 20rpx solid #f7f7f7;
		
		.font-txt {
			color: #333;
			font-size: 32rpx;
			padding-left: 10rpx;
			font-weight: bold;
		}
		.x-input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 116rpx;
			font-size: 26rpx;
			border-bottom: 2rpx solid #E4E4E4;
			input{
				height: 60rpx;
			}
			text {
				font-weight: normal;
				font-size: 22rpx;
				color: #333333;
			}
		}
	
	
	}
	.x-btn{
		width: 440rpx;
		height: 84rpx;
		background: #FF623E;
		box-shadow: 0px 2rpx 6rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
		font-size: 32rpx;
		line-height: 84rpx;
		color: #FFFFFF;
		margin-top: 200rpx;
	}
</style>
