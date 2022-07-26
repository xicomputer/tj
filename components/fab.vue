<template>
	<view>
		<button hover-class="none" class="fab-button">
			<image src="../static/home-icon.png" mode="aspectFill"></image>
			<text>首页</text>
		</button>
		<!-- <view style="position: fixed;right: 30rpx;bottom: 200rpx;width: 180rpx;height: 180rpx;z-index: 2;">
			<u-button hover-class="none" open-type="contact" type="success" :customStyle="bkff">客服</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'fab',
		data() {
			return {
				count:0
			};
		},
	}
</script>

<style lang="scss">
	.fab-button {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: #ffffff;
			position: fixed;
			bottom: 180rpx;
			right: 24rpx;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-bottom: 10rpx;
				padding-top: 5rpx;
			}
			text {
				font-size: 18rpx;
				color: #333333;
			}
		}
	
	// 按钮清除默认样式
	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		font-size: 18px;
		text-align: center;
		text-decoration: none;
		line-height: 1;
		border-radius: 0px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
	}
	button::after {
		border: none;
		background-color: none;
	}
	
</style>
