<template>
	<view class="cantainer">
		<view class="box" v-if="listInfo">
			<view class="u-border-bottom">快递公司：{{listInfo.expressCompany}} </view>
			<view>快递单号： {{listInfo.expressNumber}}</view>
		</view>
		
		<view class="aaa">
			<u-time-line>
				<u-time-line-item nodeTop="2" v-for="(item,index) in listInfo.expressTrackList " :key="index">
					<template v-slot:content >
						<view>
							<view class="u-order-desc">{{item.trackStatus}}</view>
							<view class="u-order-time">{{item.trackTime}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<node-msg v-if="!listInfo"></node-msg>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:{}
			}
		},
		onLoad(option) {
			console.log(option)
			if(option.wldd){
        getApp().globalData.Logistics = 'w'
				let	{refundNo} = option
				this.$u.api.orderLogisticsInfo(refundNo).then(e => { // 退货物流信息
					this.listInfo = e
				}).catch(err=>{
					this.listInfo =''
					console.log(err)
				})
			}else{
				let	{refundNo} = option
        getApp().globalData.Logistics = 't'
				this.$u.api.refundLogisticsInfo(refundNo).then(e => { // 退货物流信息
					this.listInfo = e
				}).catch(err=>{
					this.listInfo =''
					console.log(err)
				})
			}
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
	}
	.box{
		overflow: hidden;
		padding: 0 20rpx;
		background-color: #FFFFFF;
		border-top: 20rpx solid #f7f7f7;
		>view{
			height: 80rpx;
			line-height: 80rpx;
		}
	
	}
	.aaa {
		padding: 24rpx 24rpx 24rpx 40rpx;
	}
	
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-title.unacive {
		color: rgb(150, 150, 150);
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
	
	.tel {
		color: $u-type-primary;
	}
	
	
</style>
