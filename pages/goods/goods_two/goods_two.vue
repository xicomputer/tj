<template>
	<view class="cantainer">
    <view class="x-head">
      <view class="x-step ">
        <view class="x-top">
          <text class="active">√</text>
          <text  class="active">1</text>
          <text  class="active">2</text>
          <text>3</text>
        </view>
        <view class="x-font">
          <text>发布/自购</text>
          <text>查看商品详情</text>
          <text>设置活动参数</text>
          <text>分享商品</text>
        </view>
      </view>
    </view>
		<view class="edit">
			<view class="z-bj" v-for="(item,index) in skuMap.commoditySku" :key="index">
				<view class="x-nummber" style="margin-bottom: 20rpx;">{{index+1}}</view>
        <view class="x-line2" >
          <text class="x-span">规则图片</text>
          <view class="x-in">
            <image v-if="item.imageUrl" :src="item.imageUrl " mode=""></image>
            <image v-if="!item.imageUrl" :src="skuMap.thumbnail" mode=""></image>
          </view>
        </view>
				<view class="x-line">
					<text class="x-span">规格名称</text>
					<view class="x-in">
						<text class="u-line-1" style="color: #ff0000;">{{item.skuName}}</text>
					</view>
				</view>

				<view class="x-line">
					<text class="x-span">价格/元</text>
					<view class="x-in">
						<!-- <u-input :border="true" height="45" placeholder="请输入" v-model="item.price" type="text"> -->
						<!-- <input style="border: 1px solid #ccc;"  v-model="item.price" type="text" @focus="ahead(item.price,item.commission)"   value="" /> -->
						<text>{{item.price}}</text>
<!--						</u-input>-->
						
					</view>
			
				</view>
				<view class="x-line">
					<text class="x-span">分销佣金</text>
					<view class="x-in">
						<!-- <input style="border: 1px solid #ccc;"  v-model="item.commission" type="text"  value="" /> -->
						<text>{{item.showCommission}}</text>
					</view>
			
				</view>
		<!-- 		<view class="x-line">
					<span>邀请奖励</span>
					<view class="x-in">
						<text>{{item.award}}</text>
					</view>
				</view> -->
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
				<view class="box-f u-border-bottom">
					<view class="x-title u-border-bottom">推荐介绍</view>
					<view class="box">
						<textarea maxlength=100 @input="numerical" v-model="skuMap.describes"  class="texta"
							placeholder="请填写备注最多100个字" />
						<text>{{figure}}/100</text>
					</view>
				</view>
				
				<view class="heg u-border-bottom">
					<text>配送方式</text>
					<text>全国物流</text>
				</view>
				<view class="heg u-border-bottom">
					<text>设置推荐开始时间</text>
					<text class="last-icon c9" @tap="showiftime = true">{{dataTimeStart ? dataTimeStart : nowtime}}</text>
					<u-icon class=" c9" name="arrow-right" size="32"></u-icon>
				</view>
				
				<view class="heg u-border-bottom">
					<text>设置推荐结束时间</text>
					<text class="last-icon c9" @tap="showiftime2 = true" >{{dataTimeEnd ? dataTimeEnd : nowtime7}}</text>
					<u-icon class=" c9" name="arrow-right" size="32"></u-icon>
				</view>
				<view class="heg">
					<text class="orange">温馨提示:当商品库为0时，会自动关闭推荐商品</text>
				</view>
			</view>
		</view>
		<view class="x-btn">
			<view class="btn-item1" @tap="click_black">上一步</view>
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
        nowtime:null,
        nowtime7:null
			}
		},
		onLoad(option) {



      console.log("经销商id",option.commodityId)
			let commodityId = option.commodityId
			this.$u.api.goodsDateilTwo(commodityId).then(e => { //商品详情sku
				this.skuMap = e
			})

		},
		onShow() {
      let date = new Date().getTime()
      this.nowtime  = uni.$u.timeFormat(date, 'yyyy-mm-dd hh:MM:ss'); //当前时间
      this.nowtime7 = uni.$u.timeFormat( date+604800000, 'yyyy-mm-dd hh:MM:ss'); //7天后时间

      let dealerId = this.$store.state.jxsid
		},
		methods: {
      click_black(){
        uni.navigateBack({
          delta: 1
        });
      },
			numerical(e) {
				this.figure = e.detail.cursor
			},
			jumpTwo() {		//	发布商品
				
				if(!this.skuMap.describes){
				return	uni.showToast({
						title:'请输入备注',
						icon:"none"
					});
				}
				// if(!this.dataTimeEnd){
				// return	uni.showToast({
				// 		title:'请输设置结束时间',
				// 		icon:"none"
				// 	});
				// }
				// if(!this.dataTimeStart){
				// return	uni.showToast({
				// 		title:'请输设置开始时间',
				// 		icon:"none"
				// 	});
				// }
		
				let {skuMap} = this
				let activityInfo =	skuMap.commoditySku.map((item,index)=>{
						return {
							commission:item.commission,  //佣金
							price:item.price,			 //价格
							skuId:item.skuId			
						}
				})
        let dealerId = this.$store.state.jxsid
        console.log("经销商id",dealerId)

				let goodsParam = {
					activityInfo,
					"commodityId": this.skuMap.commodityId,
          "dealerId": dealerId,
					"supplierId":this.skuMap.supplierId,			
					"endTime":  this.dataTimeEnd ? this.dataTimeEnd : this.nowtime7,
					"introduce": this.skuMap.describes,
					"startTime": this.dataTimeStart ? this.dataTimeStart : this.nowtime
				};
				this.$u.api.goodsIssue(goodsParam).then(data => { 		//发布商品
						console.log("重要",data)
						
						this.$store.commit("saveGoods",data)
						uni.navigateTo({
								url: `/pages/goods/goods_three/goods_three`
						})	
			
				}).catch(err=>{
					console.log(errr)
					uni.showToast({
						title:err.msg,
						icon:"none"
					});
				})
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
		color: #ff0000;
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
				width: 580rpx;
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
					background-color: #ff0000;
					color: #FFFFFF;
					border: 1rpx solid #ff0000;
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
				color: #ff0000;
				border-radius: 15rpx 0 15rpx 0;
				margin: -20rpx 0 0 -20rpx;
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
					margin-left: 0rpx;
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
			border: 1px solid #ff0000;
			color: #ff0000;

		}

		.btn-item2 {
			background: #FF0000;
			color: #fff;
		}
	}
</style>
