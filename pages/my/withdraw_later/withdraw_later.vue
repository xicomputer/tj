<template>
	<view class="cantainer">
		<view class="list-item">
			<view>
				<text>申请中...</text>
				<text class="c9" >2021/07/14-20219/09/12</text>
			</view>
			<text >￥88.00</text>
		</view>
		
			<view class="list-item">
				<view>
					<text>提现成功</text>
					<text class="c9" >2021/07/14-20219/09/12</text>
				</view>
				<text class="orange">￥88.00</text>
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
	.orange {
		color: #FF6D2E;
	}
	.list-item{
		 height: 154rpx;
		 background: #FFFFFF;
		 display: flex;
		 justify-content: space-between;
		 align-items: center;
		 width: 710rpx;
		 margin:  0 auto;
		 padding:  0 20rpx;
		 margin-top: 20rpx;
		 >view{
			 height: 100%;
			 display: flex;
			 flex-direction: column;
			 justify-content: space-around;
		 }
		 >text{
			 font-size: 50rpx;
			 font-weight: bold;
		 }
		 .orange {
		 	color: #FF6D2E;
		 }
	}
</style>
