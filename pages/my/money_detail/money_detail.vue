<template>
	<view class="cantainer">
		<view class="head-time ">
			<view class="select-time">
        <view  @tap="showiftime=true">
          <image src="/static/jilv.png" mode=""></image>
          <text>{{dataTime2 ? dataTime2 : '请选择时间'}}</text>
        </view>
				<text>至</text>
				<view  @tap="showiftime2=true">	<text>{{dataTime ? dataTime : '请选择时间'}}</text>	<u-icon color="#FF6D2E" name="arrow-down"></u-icon></view>
			</view>
			<view @tap.stop="onshowpage" class="all-btn">{{lookstate[nowIndex].text}}  <u-icon class="u-margin-left-10" color="#FF6D2E" name="arrow-down"></u-icon> 
			
			<view class="dwse u-border-top" v-if="isactive">
				<view @tap.stop="selectState(index)" :class="{active:index == nowIndex}" v-for="(item,index) in lookstate" :key="index">{{item.text}}</view>
			
			</view>
			</view>
		</view>
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
			
<!--				<view>-->
<!--					<text>平台订单服务费</text>-->
<!--					<text>{{objStatistics.orderServiceCharge}}</text>-->
<!--				</view>-->
			</view>
			<view class="x-sum">
				<view>已到账总佣金</view>
				<text>{{objStatistics.commissionIsSettleTrue}}</text>
			</view>
		</view>
		<view class="x-center">
			<view><text>{{objStatistics.commissionIsSettleFalse}}</text><text>预估分出佣金</text></view>
			<view><text>{{objStatistics.commissionIsSettleTrue}}</text><text>已分出佣金</text></view>
			<view v-if="objStatistics.orderAward"><text>{{objStatistics.orderAward}}</text><text>平台奖励金额(帮卖)</text></view>
			
			
		</view>
		<view class="order-list">
			<view class="await-send">
				<view class="order-item" v-for="(item, index) in dataList" :key="index">
					<view class="o-head">
						<text class="c9">订单号：{{item.orderInfo.orderNumber}}</text>
						<text class="orange thick">{{item.orderInfo.isEnd? "已入账" : "待入账"}}</text>
					</view>
			<!-- 		<view class="o-name">
						<image :src="item.orderInfo.userInfo.headImgUrl" mode=""></image>
						<text>{{item.orderInfo.userInfo.nickName}}</text>
					</view> -->
					<view class="x-in">
						<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
						<view class="x-title">
							<view>{{item.orderInfo.orderItem.commodityName}}</view>
							<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
							<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
						</view>
					</view>
					<view class="last-font">
						实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
							class="orange thick">{{item.orderInfo.orderItem.actualMoney}}</text>
					</view>
					<view class="last-font">
						购买人：{{item.orderInfo.userInfo.nickName }}
					</view>
					<view class="last-font">
						下单时间：{{item.orderInfo.orderTime}}
					</view>
					<view class="last-font orange">
						{{item.orderInfo.saleUserInfo.tj ? '推荐官：' :  item.orderInfo.saleUserInfo.bt ?'帮推官：' : '团员' }} {{item.orderInfo.saleUserInfo.nickName}}
						&nbsp; &nbsp; {{item.orderInfo.isEnd? "已分出佣金：" : "预估分出佣金："}} ￥{{item.commission}}
					</view>
			
					<view class="last-font orange teshu">
						
<!--							<text>平台订单服务费：￥{{item.orderServiceCharge}} </text>-->
							 
							<text v-if="item.promotionType == 'INDIRECT' " class="u-margin-left-20">平台奖励金额（帮卖）￥{{item.earnings}} </text>
							
					</view>
				</view>
			</view>
		</view>
		<view class="img-node" v-if="!dataList.length">
			<image src="/static/cl1.png" mode=""></image>
			<text>无订单信息</text>
		</view>
	<u-picker v-model="showiftime" :params="params2" :default-time="dataTime" mode="time" @confirm="confirm_one"></u-picker>
	
	
	<u-picker v-model="showiftime2" :params="params" :default-time="dataTime2" mode="time" @confirm="confirm_two"></u-picker>
	</view>
</template>
<!-- 推广类型: 直推.DIRECT 佣金,  间推.INDIRECT 奖励 -->
<script>
	import utils from '@/common/logic/utils/util.js'
	export default {
		data() {
			return {
				showiftime:false, 
				showiftime2:false, 
				params: {
					year:true,
					month: true,
					day: true,  
				},
        params2: {
					year:true,
					month: true,
					day: true,
				},
				dataTime:'',
				dataTime2:'',
				time_one:'',
				time_two:'',
				temporary:'',
				dataList:[],
				userInfo:{},
				objStatistics:{},
				lookstate:[
					{text:'全部'},
					{text:'待入账'},
					{text:'已入账'},
				],
				nowIndex:0,
				isactive:false,
				pageNum:1
				
			}
		},
		filters:{
		},
		onReady(){
			// this.dataTime = utils.dateUtil.stringifyDateYmd()
			// this.dataTime2 = utils.dateUtil.beforeComputedTime()
			this.dataTime = ''
			this.dataTime2 = ''
		},
		onLoad(option) {

      console.log('当前时间', utils.dateUtil.stringifyDateYmd())

      this.dataTime = ''
      this.dataTime2 = ''
			
			this.supplierId = option.supplierId
			let supplierName = option.supplierName
			
			uni.setNavigationBarTitle({
				title: `${supplierName}带货明细`
			})	
			this.inmint()
			
		},
		onShow() {
			uni.getStorage({
				key:'tokenorid',
				success:res=>{
					this.userInfo = res.data
				}
			});
		},
		onReachBottom(){
			this.pageNum = (++this.pageNum)
			this.inmint()
		},
		methods: {
			inmint(){
				let num = '';
				if(this.nowIndex == 0){
					let num = ''
				}else if(this.nowIndex == 1){
					num = false
				}else if(this.nowIndex == 2){
					num = true
				}
        // if(this.dataTime2){
        //   if(!this.dataTime){
        //     this.dataTime = utils.dateUtil.stringifyDateYmd()
        //   }
        // }

				let param={
						"endTime": this.dataTime2 && this.dataTime ? this.dataTime+' 00:00:00' : this.dataTime2 ?  utils.dateUtil.stringifyDateYmd() +' 00:00:00' : null,
						"isAsc": "",
						"orderBy": "",
						"isEnd": num,
						"orderByColumn": "",
						"pageNum": this.pageNum,
						"pageSize": 10,
						"searchValue": "",
						"startTime":  this.dataTime2 ? this.dataTime2+' 00:00:00' : null,
						"supplierId": this.supplierId
				}
				
				this.$u.api.listOfSupplier(param).then(e => { // 列表
					console.log(e)
					if(e){
						this.dataList = this.dataList.concat(e.rows); //将数据拼接在一起
					}
				}).catch(err=>{
					console.log(err)
				})
				
				this.$u.api.statisticsOfSupplier({...param,pageNum:1}).then(e => { // 统计
					if(e){
						this.objStatistics = e
					}else{
						this.objStatistics = {}
					}
					
				}).catch(err=>{
					console.log(err)
				})
				
			},
			confirm_one(e){			//点击时间
				this.dataTime2= `${e.year}-${e.month}-${e.day}`
				this.dataList = []; //初始化
				this.pageNum = 1;
				this.inmint()
			},
			confirm_two(e){        	//点击时间
				this.dataTime= `${e.year}-${e.month}-${e.day}`
				this.dataList = []; //初始化
				this.pageNum = 1;
				this.inmint()
			},
			selectState(index){			//点击状态
				this.nowIndex = index;
				this.isactive = false;
				
				this.dataList = []; //初始化
				this.pageNum = 1;
				this.inmint()
				
			},
			onshowpage(){
				if(	this.isactive){
					this.isactive = false
				}else{
					this.isactive = true
				}
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
      >view{
        display: flex;
        align-items: center;
        height: 100%;
      }
			image{
				width: 30rpx;
				height: 30rpx;
			}
			text{
				margin-left: 20rpx;
        line-height: 60rpx;
			}
		}
		.all-btn{
			height: 88rpx;
			line-height: 88rpx;
			width: 212rpx;
			background: #fff;
			margin-left: auto;
			text-align: center;
			position: relative;
			.dwse{
				position: absolute;
				left: 0;
				bottom: -180rpx;
				z-index: 1;
				width: 100%;;
				height: 180rpx;
				background-color: #fff;
				view{
					height: 60rpx;
					line-height: 60rpx;
				}
				.active{
					background: orange;
					color: #FFFFFF;
				}
			}
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
				font-size: 36rpx;
				color: #FF6D2E;
				margin-bottom: 10rpx;
			}
		}
	}
	.order-list {
			padding: 0 20rpx;
			margin-top: 20rpx;
			padding-bottom: 100rpx;
		
			.order-item {
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;
		
				.o-head {
					height: 72rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
		
				.o-name {
					display: flex;
					align-items: center;
					height: 50rpx;
		
					image {
						height: 50rpx;
						width: 50rpx;
					}
		
					text {
						font-size: 24rpx;
						color: #999999;
						margin-left: 10rpx;
					}
				}
		
				.x-in {
					display: flex;
					margin: 20rpx 0;
		
					image {
						height: 120rpx;
						width: 120rpx;
					}
		
					.x-title {
						margin-left: 20rpx;
		
						view {
							font-size: 26rpx;
							font-weight: bold;
						}
		
						text {
							font-size: 24rpx;
						}
		
						.x-button {
							padding: 4rpx 15rpx;
							background: #F7F7F7;
							border-radius: 10rpx;
							color: #999;
							font-size: 24rpx;
							line-height: 52rpx;
							text-align: center;
							color: #999999;
						}
					}
				}
				.teshu{
					font-size: 24px;
					font-family: PingFang SC, Arial, sans-serif;
					font-weight: 400;
				}
				.last-font {
					font-size: 24rpx;
					margin-bottom: 20rpx;
				}
		
				.last-btn {
					text-align: right;
		
					text {
						padding: 8rpx 20rpx;
						border-radius: 10rpx;
						font-size: 28rpx;
						line-height: 52rpx;
						text-align: center;
						margin-left: 20rpx;
						border: 1px solid #E4E4E4;
					}
				}
			}
		}

</style>
