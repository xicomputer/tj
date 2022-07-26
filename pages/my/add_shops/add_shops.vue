<template>
	<view class="cantainer">
		<view class="soso">
			<u-search class="set-width" height="76" placeholder="请输入店铺名称"  :clearabled="true" :show-action="false" v-model="keyword"></u-search>
			<view class="x-enter">搜索</view>
		</view>
		<view class="box">
			<view class="box-item" v-for="(item,index) in 3" :key="index" >
				<image src="/static/logo.png" mode=""></image>
				<view class="q1">
					<text class="u-font-32 c3 thick">推荐官名称推荐官名称</text>
					<text class="u-font-24 c9">推荐好物：999</text>
				</view>
				<view class="q2">
					<button hover-class="none" type="default">立即申请</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
		overflow: hidden;
	}
	.soso{
		background-color: #FFFFFF;
		height: 120rpx;
		margin: 2rpx 0 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		.set-width{
			width: 100%;
		}
		.x-enter{
			text-align: center;
			width: 114rpx;
			color: #333333;
			font-size: 30rpx;
		}
	}
	
	.box{
		.box-item{
			height: 156rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			image{
				height: 116rpx;
				width: 116rpx;
			}
			.q1{
				height: 116rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
			}
			.q2{
				margin-left: auto;
				button{
					background-color: #FF6D2E;
					height: 44rpx;
					width: 136rpx;
					line-height: 44rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					border: none;
					border-radius: 44rpx;
					padding: 0;
					margin-left: 10rpx;
				}
				.c9{
					background: #999;
				}
			}
		}
	}

</style>
