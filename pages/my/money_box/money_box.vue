<template>
	<view class="cantainer">

			<view class="z-bj">
				<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bjoa.png" mode='widthFix' lazy-load></image>
				<view class="box-item">
					<view>
						<text>总销售额</text>
						<text>{{objStatistics.orderMoney}}</text>
					</view>
					<view>
						<text>总订单</text>
						<text>{{objStatistics.orderCount}}</text>
					</view>

<!--					<view>-->
<!--						<text>平台订单服务费</text>-->
<!--						<text>{{objStatistics.orderServiceCharge}}</text>-->
<!--					</view>-->

				</view>
				<view class="x-sum">
					<view>到账总共金额</view>
					<text>{{objStatistics.income}}</text>
				</view>
			</view>
			<view class="x-center">
				<view><text>预估分出佣金</text> <text>{{objStatistics.commissionIsSettleFalse}}</text> </view>
				<view><text>已分出佣金</text> <text>{{objStatistics.commissionIsSettleTrue}}</text> </view>
				<view v-if="objStatistics.orderAward"><text>平台奖励金额(帮卖)</text> <text>{{objStatistics.orderAward}}</text> </view>
			</view>
		<view class="order-list">
			<view class="await-send" v-for="(item,index) in dataList" :key="index" @tap="jump_money(item.supplierId,item.supplierName)">
					<view>
						<text class="u-font-34">{{item.supplierName}}</text>
						<text class="orange u-font-28">已分佣金:￥{{item.earnings}}</text>
					</view>
					<u-icon color="#999" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="img-node" v-if="!dataList.length">
			<image src="/static/cl1.png" mode=""></image>
			<text>无订单信息</text>
		</view>
		
		
	<u-picker v-model="showiftime" :params="params" :default-time="dataTime" mode="time" @confirm="confirm_one"></u-picker>
	
	
	<u-picker v-model="showiftime2" :params="params" :default-time="dataTime" mode="time" @confirm="confirm_two"></u-picker>

<!--    <view @tap="xpblack">black</view>-->
	</view>
</template>

<script>
	import utils from '@/common/logic/utils/util.js'
	export default {
		data() {
			return {
				tsmsg:'无订单信息',
				showiftime:false, 
				showiftime2:false, 
				params: {
					year:true,
					month: true,
					day: true,  
				},
				dataTime:'',
				time_one:'',
				time_two:'',
				temporary:'',
				dataList:[],
				userInfo:{},
				objStatistics:[]
			}
		},
		onReady(){
			// this.dataTime = utils.dateUtil.stringifyDateYmd()
			this.dataTime = utils.dateUtil.stringifyDateYmd()
			// this.dataTime = dataTime
			console.log("当前时间",this.dataTime)
	
			// console.log(2,utils.dateUtil.parse(this.dataTime))
			
		},
		onShow() {
			uni.getStorage({
				key:'tokenorid',
				success:res=>{
					this.userInfo = res.data
				}
			});
			
			let param={
				"isAsc": "",
				"orderBy": "",
				"orderByColumn": "",
				"pageNum": 1,
				"pageSize": 10,
				"searchValue": ""
			
			}
			this.$u.api.statisticsList(param).then(e => { // 列表
				if(e){
					this.dataList = e.rows
				}
				
			}).catch(err=>{
				console.log(err)
			})
			
			this.$u.api.statistics(param).then(e => { // 统计
				if(e){
					this.objStatistics = e
				}
			}).catch(err=>{
				console.log(err)
			})
			
		},
		methods: {
      xpblack(){
        uni.navigateBack({
          delta: 1
        });
      },
			confirm_one(e){
				this.time_one= `${e.year}-${e.month}-${e.day}`
				this.time_= `${e.year}-${e.month}-${e.day}`
			},
			jump_money(supplierId,supplierName){
				console.log(supplierId,supplierName)
				uni.navigateTo({
					url:`/pages/my/money_detail/money_detail?supplierId=${supplierId}&supplierName=${supplierName}`
				})
				
			}
			
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
	.img-node{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			image{
				width: 300rpx;
				height: 300rpx;
			}
			text{
				font-size: 24rpx;
				color: #999999;
				margin-top: 20rpx;
			}
	}
	.head-time{
		display: flex;
		height: 88rpx;
		align-items: center;
		padding:0 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0;
		.select-time{
			height: 88rpx;
			background: #fff;
			display: flex;
			flex: 1;
			margin-right: 20rpx;
			align-items: center;
			padding-left: 20rpx;
			font-size: 24rpx;
			image{
				width: 30rpx;
				height: 30rpx;
			}
			text{
				margin-left: 20rpx;
			}
		}
		.all-btn{
			height: 88rpx;
			line-height: 88rpx;
			width: 212rpx;
			background: #fff;
			margin-left: auto;
			text-align: center;
			
		}
	}
	.z-bj{
		 height: 342rpx;
		 width: 750rpx;
		 position: relative;
		 image{
			 width: 100%;
		 }
		 .box-item{
			 height: 122rpx;
			 width: 750rpx;
			 background: #FFFFFF;
			 background-color: rgba(255,255,255,0.2);
			 position: absolute;
			 bottom: 0;
			 left: 0;
			 display: flex;
			 justify-content: space-around;
			 align-items: center;
			 view{
				 display: flex;
				 flex-direction: column;
				 align-items: center;
				 color: #FFFFFF;
				 font-size: 28rpx;
				 text:nth-child(2){
					 font-size: 36rpx;
				 }
			 }
		 }
		 .x-sum{
			 position: absolute;
			 top: 0;
			 left: 0;
			 width: 100%;
			 text-align: center;
			 view{
				 color: #FFFFFF;
				 font-size: 28rpx;
				 margin-top: 20rpx;
			 }
			 text{
				 color: #FFFFFF;
				 font-size: 72rpx;
			 }
		 }
	}
	.x-center{
		background-color: #FFFFFF;
		height:160rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #333333;
			text:nth-child(1){
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			text:nth-child(2){
				font-size: 36rpx;
				font-family: DIN,sans-serif,Arial;
				font-weight: bold;
			}
		}
	}
	.order-list {
		
			margin-top: 20rpx;
			padding-bottom: 100rpx;
			.await-send{
				background-color: #fff;
				padding: 0 20rpx;
				height: 154rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				view{
					display: flex;
					justify-content: space-evenly;
					flex-direction: column;
					text{
						
					}
				}
			}
			
		}

</style>
