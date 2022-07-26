<template>
	<view class="cantainer">
		<view class="x-head">
			<view class="x-step ">
				<view class="x-top">
					<text class="active">√</text>
					<text class="active">2</text>
					<text>3</text>
				</view>
				<view class="x-font">
					<text>选择推荐商品</text>
					<text>发布推荐商品</text>
					<text>分享推荐商品</text>
				</view>
			</view>
		</view>
	

		<view class="edit">
			<view class="z-bj" v-for="(item,index) in skuMap.activity.commodity.commoditySku" :key="index">
				<view class="x-nummber">{{index+1}}</view>
				<view class="x-line">
					<text class="x-span">规格名称</text>
					<view class="x-in">
						<text class="u-line-1">{{item.skuName}}</text>
					</view>
				</view>
				<view class="x-line2" >
					<text class="x-span">规则图片</text>
					<view class="x-in">
						<image v-if="item.imageUrl" :src="item.imageUrl " mode=""></image>
						<image v-if="!item.imageUrl" :src="skuMap.activity.commodity.thumbnail" mode=""></image>
				
					</view>
				</view>
				<view class="x-line">
					<text class="x-span">价格/元</text>
					<view class="x-in">
						<!-- <u-input :border="true" height="45" placeholder="请输入" v-model="item.price" type="text"> -->
						<!-- <input style="border: 1px solid #ccc;"  disabled=true v-model="item.activityPrice" type="text"   value="" /> -->
						<text>{{item.price}}</text>

						
					</view>
					<!-- <view class="last">价格不能小于 {{item.price-item.commission}}</view> -->
				</view>
				<view class="x-line">
					<text class="x-span">分销佣金</text>
					<view class="x-in">
					
						<!-- <input style="border: 1px solid #ccc;"  disabled=true v-model="item.activityCommission" type="text"  value="" /> -->
						<text>{{item.showCommission}}</text>
						
					</view>
					<!-- <view class="last">佣金不能小于0</view> -->
				</view>
				<view class="x-line">
					<text class="x-span">库存/件</text>
					<view class="x-in">
						<!-- 	<u-input :border="true" height="45" placeholder="请输入" v-model="model.inventory" type="text">
						</u-input> -->
						<text>{{item.stock}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="x-foot">
			<view class="foot-list">
				<view class="box-f u-border-bottom ">
					<view class="x-title u-border-bottom">推荐介绍</view>
					<view class="box">
						<textarea maxlength=100 @input="numerical" disabled=true :value="skuMap.activity.introduce" class="texta"
							placeholder="请填写备注最多100个字" />
						<text>{{figure}}/100</text>
					</view>
				</view>
				<view class="u-border-bottom heg">
					<text>配送方式</text>
					<text>全国物流</text>
				</view>
				<view class="u-border-bottom heg">
					<text>设置推荐开始时间</text>
					<text class="last-icon c9">{{skuMap.activity.createTime}}</text>
					<u-icon class=" c9" name="arrow-right" size="32"></u-icon>
				</view>
				
				<view class="u-border-bottom heg">
					<text>设置推荐结束时间</text>
					<text class="last-icon c9"  >{{skuMap.activity.endTime}}</text>
					<u-icon class=" c9" name="arrow-right" size="32"></u-icon>
				</view>
				<view class="heg">
					<text class="orange">温馨提示:当商品库为0时，会自动关闭推荐商品</text>
				</view>
			</view>
		</view>
		<view class="x-btn">
			<view class="btn-item1" @tap="jumpTop">上一步</view>
			<view class="btn-item2" @tap="jumpTwo">保存发布</view>
		</view>
		
		<u-picker v-model="showiftime" :params="params" :default-time="dataTimeStart" mode="time" @confirm="confirm_start"></u-picker>
		<u-picker v-model="showiftime2" :params="params" :default-time="dataTimeEnd" mode="time" @confirm="confirm_end"></u-picker>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				figure: 0,
				textareaValue: '',
				model: {
					name: "xp",
					image: '',
					money: '',
					commission: '',
					invite: '',
					inventory: '',
				},
				skuMap: "",
				showiftime:false,
				showiftime2:false,
				dataTimeStart:'',
				dataTimeEnd:'',
				params:{
					year:true,
					month: true,
					day: true,  
					hour: true,
					minute: true,
					second: true
				},
				hint:'',
				pageList:''
			}
		},
		onLoad(option) {
			
			this.skuMap = this.$store.state.intodetail;
      console.log(	this.skuMap)

      uni.showToast({
        title: '提示：帮推官不能修改任何参数哦~',
        duration: 3500,
        icon:"none"
      });
			
		},
		onShow() {
		
		},
		methods: {
			numerical(e) {
				this.figure = e.detail.cursor
			},
			jumpTop(){
				uni.navigateBack({
				    delta: 1
				});
			},
			jumpTwo() {		//	发布商品

				let param = this.skuMap.activityId
				
				this.$u.api.HelpToSell(param).then(data => { 		//发布商品
						uni.redirectTo({
							url: '/pages/my/i_recommend/i_recommend'
						});
				}).catch(err=>{
					console.log(errr)
				
				})
			
			
			
				// let {skuMap} = this
				// let activityInfo =	skuMap.activityInfo.map((item,index)=>{
				// 		return {
				// 			commission:item.activityCommission,  //佣金
				// 			price:item.activityPrice,			 //价格
				// 			skuId:item.skuId			
				// 		}
				// })
					
				// let goodsParam = {
				// 	activityInfo,
				// 	"commodityId": this.skuMap.commodity.commodityId,
				// 	"supplierId":this.skuMap.supplierId,
				// 	"endTime":  this.skuMap.endTime,
				// 	"introduce": this.skuMap.introduce,
				// 	"startTime": this.skuMap.createTime,
				// };
				
				
				
				// this.$u.api.goodsIssue(goodsParam).then(data => { 		//发布商品
				// 		console.log("重要",data)
				// 		this.$store.commit("saveGoods",data)
				// 		uni.navigateTo({
				// 				url: `/pages/goods/goods_three/goods_three`
				// 		})	
				// }).catch(err=>{
				// 	console.log(errr)
				// 	uni.showToast({
				// 		title:err.msg,
				// 		icon:"none"
				// 	});
				// })
				
		
			
				
			},
			confirm_start(e){
				this.dataTimeStart =`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}` 
			},
			confirm_end(e){
				this.dataTimeEnd =`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}` 
			},
			leave(a,b){
				console.log(a,b)
				if(!(this.hint < a) ){
					uni.showToast({
						title: `价格不能小于${this.hint} `
					})
				}
			
			},
			ahead(a,b){
				console.log(a,b)
				this.hint = a-b
					console.log(this.hint)
			}
		}
	}
</script>

<style lang="scss">
	.orange {
		color: #FF6D2E;
	}

	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
	}

	.x-head {
		height: 140rpx;
		width: 750rpx;
		background-color: #FFFFFF;

		.x-step {
			height: 138rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.x-top {
				display: flex;
				justify-content: space-between;
				width: 494rpx;
				overflow: hidden;

				text {
					height: 36rpx;
					width: 36rpx;
					background-color: #f7f7f7;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					font-size: 22rpx;
					color: #000000;
					border: 1rpx solid #999;
					box-sizing: border-box;
					line-height: 100%;
					position: relative;
				}

				.active {
					background-color: #FF6D2E;
					color: #FFFFFF;
					border: 1rpx solid #FF6D2E;
				}

				text::before {
					position: absolute;
					left: 34rpx;
					content: "";
					height: 1px;
					width: 1000rpx;
					background-color: #E1E1E1;
				}
			}

			.x-font {
				margin-top: 10rpx;
				width: 690rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				text {
					font-size: 24rpx;
				}
			}
		}

	}

	.box {
		height: 206rpx;
		width: 100%;
		position: relative;

		text {
			position: absolute;
			bottom: 10rpx;
			right: 25rpx;
			color: #ccc;
		}
	}

	.texta {
		height: 206rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
		width: 100%;
	}

	

	.edit {

		padding: 20rpx;
		background-color: #FFFFFF;

		.z-bj {
			background-color: #f8f8f8;
			// background-color: red;
			padding: 20rpx;
			border-radius: 15rpx;
			margin-bottom: 20rpx;

			.x-nummber {
				height: 60rpx;
				width: 60rpx;
				background-color: #FEDED1;
				text-align: center;
				line-height: 60rpx;
				color: #FF6D2E;
				border-radius: 15rpx 0 15rpx 0;
				margin: -20rpx 0 20rpx -20rpx;
			}

			.x-line {
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				 .x-span{
					width: 140rpx;
					text-align: left;
				}

				image {
					height: 152rpx;
					width: 152rpx;
				}

				.x-in {
					flex: 1;
					width: 158rpx;
					display: flex;
					align-items: center;
				}
				.last{
					align-self: flex-end;
					font-size: 20rpx;
					margin-left: 8rpx;
				}
			}
				
			.x-line2 {
				margin-bottom: 20rpx;
				display: flex;
				.x-span{
					width: 140rpx;
					text-align: left;
				}

				image {
					height: 152rpx;
					width: 152rpx;
				}

				.x-in {
				}
			}
		}
	}

	.x-foot {
		padding: 20rpx;
		padding-bottom: 0;

		.foot-list {
			background-color: #FFFFFF;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			.box-f {
				.x-title {
					font-size: 32rpx;
					padding-left: 20rpx;
					line-height: 84rpx;
					background-color: #FFFFFF;
				}
			 }
			 .heg{
				height: 84rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.last-icon {
					margin-left: auto;
					margin-right: 10rpx;
				}

				text {
					font-size: 26rpx;
				}
			}
		}
	}

	.x-btn {
		height: 134rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;

		view {
			width: 342rpx;
			height: 90rpx;
			border-radius: 10rpx;
			font-size: 32rpx;
			line-height: 90rpx;
			text-align: center;

		}

		.btn-item1 {
			background-color: #FFFFFF;
			border: 1px solid #FF6D2E;
			color: #FF6D2E;

		}

		.btn-item2 {
			background: #FF6D2E;
			color: #fff;
		}
	}
</style>
