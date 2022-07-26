<template>
	<view class="cantainer">
		<view class="tab-nav">
			<view @tap="tabBtn(index)" :class="index == indexNow ? 'orange' : '' " v-for="(item,index) in tabTitle" :key="index">{{item.name}}</view>	
		</view>
		
		<view class="x-body"  v-show="indexNow == 0"  >
			<view class="body-list">
				<view class="body-item" v-for="(item,index) in my_allList" :key="index">
					<view class="box-top">
						<image :src="userinfo.headImgUrl" mode=""></image>
						<view class="recommend-name">
							<text>{{userinfo.nickName}}</text>
							<text>{{item.userInfo.userId}}</text>
							<view class="x-info">
								<text>{{item.promotionTime | mintime }}发布</text>
								<text>结束时间：{{item.activity.endTime}}</text>
							</view>
						</view>
						<view class="x-button">{{item.activity.userId == item.promotionUserId ? '发起' : '帮卖'}} </view>

					</view>
					
					<view class="x-center">
						<text class="u-line-2">{{item.activity.introduce}}</text>
						<view class="goods-info">
							<image :src="item.activity.commodity.thumbnail" mode=""></image>
							<view class="goods-content">
								<text class="tag1 u-line-2">{{item.activity.commodity.commodityName}}</text>
								<view class="tag2">
									<text>物流发货</text>
								<!-- 	<text>到店消费</text>
									<text>同城配送</text> -->
								</view>
								<text class="tag3">￥{{item.activity.commodity.showPrice}}</text>
							</view>
						</view>
					</view>
					
					<view class="x-down">
					<!-- 	<view class="x-down-item" v-for="(item,index) in 4" :key="index">
							<view>
								<text>28</text>
								<image src="../../../static/logo.png" mode=""></image>
								<text>1分钟前</text>
								<text>查看商品</text>
							</view>
						</view> -->
						<view class="x-last">
							<text>正在售卖中</text>
								<button catchtap="share" 
									:data-title="item.activity.commodity.commodityName" 
									:data-img="item.activity.commodity.thumbnail"
									:data-activityId="item.activityId"
									:data-promotionId="item.promotionId"
									open-type="share">
									<image src="/static/wxiocn.png" mode=""></image>
									<text>分享</text>
								</button>
						</view>
					<!-- 	<view class="x-bzw">
							<text>累计销售额：￥9999</text>
							<text>佣金收入：￥9999</text>
						</view>
						<view class="x-bzw">退款金额￥9999</view> -->
						<view class="x-bzw"><view class="btn" @tap="close_recommend(item)" >结束推荐</view></view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="x-body"  v-show="indexNow == 1"  >
			<view class="body-list">
				<view class="body-item" v-for="(item,index) in my_allList" :key="index">
					<view class="box-top">
						<image :src="userinfo.headImgUrl" mode=""></image>
						<view class="recommend-name">
							<text>{{userinfo.nickName}}</text>
							<text>{{item.userInfo.userId}}</text>
							<view class="x-info">
								<text>{{item.promotionTime | mintime }}发布</text>
								<text>结束时间：{{item.activity.endTime}}</text>
							</view>
						</view>
						<view class="x-button">{{item.activity.userId == item.promotionUserId ? '发起' : '帮卖'}} </view>

					</view>

					<view class="x-center">
						<text class="u-line-2">{{item.activity.introduce}}</text>
						<view class="goods-info">
							<image :src="item.activity.commodity.thumbnail" mode=""></image>
							<view class="goods-content">
								<text class="tag1 u-line-2">{{item.activity.commodity.commodityName}}</text>
								<view class="tag2">
									<text>物流发货</text>
								<!-- 	<text>到店消费</text>
									<text>同城配送</text> -->
								</view>
								<text class="tag3">￥{{item.activity.commodity.showPrice}}</text>
							</view>
						</view>
					</view>

					<view class="x-down">
					<!-- 	<view class="x-down-item" v-for="(item,index) in 4" :key="index">
							<view>
								<text>28</text>
								<image src="../../../static/logo.png" mode=""></image>
								<text>1分钟前</text>
								<text>查看商品</text>
							</view>
						</view> -->
						<view class="x-last">
							<text>未开始</text>
								<button catchtap="share"
									:data-title="item.activity.commodity.commodityName"
									:data-img="item.activity.commodity.thumbnail"
									:data-activityId="item.activityId"
									:data-promotionId="item.promotionId"
									open-type="share">
									<image src="/static/wxiocn.png" mode=""></image>
									<text>分享</text>
								</button>
						</view>
					<!-- 	<view class="x-bzw">
							<text>累计销售额：￥9999</text>
							<text>佣金收入：￥9999</text>
						</view>
						<view class="x-bzw">退款金额￥9999</view> -->
						<view class="x-bzw"><view class="btn" @tap="close_recommend(item,'no')" >结束推荐</view></view>

					</view>
				</view>
			</view>
		</view>
		<view class="x-body"  v-show="indexNow == 2"  >
			<view class="body-list">
				<view class="body-item"  v-for="(item,index) in my_allList" :key="index">
					<view class="box-top">
						<image :src="userinfo.headImgUrl" mode=""></image>
						<view class="recommend-name">
							<text>{{userinfo.nickName}}</text>
							<text>{{item.userInfo.userId}}</text>
							<view class="x-info">
								<text>{{item.promotionTime | mintime }}发布</text>
								<text>结束时间：{{item.activity.endTime}}</text>
							</view>
						</view>
						<!-- <view class="x-button">一键订阅</view> -->
						<view class="x-button">{{item.userId == item.promotionUser.promotionUserId ? '发起' : '帮卖'}} </view>
					</view>
				
					<view class="x-center">
						<text class="u-line-2">{{item.activity.introduce}}</text>
						<view class="goods-info">
							<image :src="item.activity.commodity.thumbnail" mode=""></image>
							<view class="goods-content">
								<text class="tag1 u-line-2">{{item.activity.commodity.commodityName}}</text>
								<view class="tag2">
									<text>物流发货</text>
								<!-- 	<text>到店消费</text>
									<text>同城配送</text> -->
								</view>
								<text class="tag3">￥{{item.activity.commodity.showPrice}}</text>
							</view>
						</view>
					</view>
					
					<view class="x-down">
					<!-- 	<view class="x-down-item" v-for="(item,index) in 4" :key="index">
							<view>
								<text>28</text>
								<image src="../../../static/logo.png" mode=""></image>
								<text>1分钟前</text>
								<text>查看商品</text>
							</view>
						</view> -->
						<view class="x-last">
							<text style="color: #999;">已结束</text>
						<!-- 		<button catchtap="share" 
									:data-title="item.commodity.commodityName" 
									:data-img="item.commodity.thumbnail"
									:data-activityId="item.activityId"
									:data-promotionId="item.promotionUser.promotionId"
									open-type="share">
									<image src="/static/wxiocn.png" mode=""></image>
									<text>分享</text>
								</button> -->
						</view>
					<!-- 	<view class="x-bzw">
							<text>累计销售额：￥9999</text>
							<text>佣金收入：￥9999</text>
						</view>
						<view class="x-bzw">退款金额￥9999</view> -->
						<view class="x-bzw"><view class="btn" @tap="comeBlock(item)" >重新发起</view></view>
					</view>
				</view>
			</view>
		</view>
		
		<none-msg :info='tsmsg' :goodsno='true' v-if="!my_allList.length" ></none-msg>
		
	</view>
</template>

<script>
	import utils from '@/common/logic/utils/util.js'
	export default {
		data() {
			return {
				tsmsg:'亲 您还没有发布商品',
				tabTitle:[
          {'name':"进行中"},
          {'name':"未开始"},
					{"name":"已结束"}
				],
				indexNow:0,
				my_allList:{},
				userinfo:{}
			}
		},
		filters:{
			mintime(value){
				let oldTime = new Date(value)
				oldTime = oldTime.getTime(oldTime) 
				
				let newTime = new Date()
				newTime = newTime.getTime(newTime) 
				
				let surplus =  newTime - oldTime
				surplus = utils.dateUtil.humanize(surplus)
				return surplus
			}
		},
		onShareAppMessage(event) {
			if (event.from === 'button') {
				let {title,img,activityid:activityId,promotionid:promotionId} = event.target.dataset
				return {
					title: title,
					path:`/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`,
					imageUrl: img,
				};
			}
		},
		onLoad() {
			wx.hideShareMenu()
			this.ListInfo(2)
			let userinfoKey= uni.getStorageSync('userinfoKey');
			this.userinfo = userinfoKey
			
		},
		methods: {
			comeBlock(item){  //库存为0不能发
        console.log(888,item)
				// item.commodityId
				
				// console.log(tem.promotionUser.promotionUserId == item.userId)
				// return false
        // this.$store.commit('sendid', this.selectList[this.addInputIndex].dealerId)
				uni.navigateTo({
					url:`/pages/goods/goods_two/goods_two?commodityId=${item.activity.commodityId}`
				})
			},
			close_recommend(item,no){
				if(item.activity.userId != item.promotionUserId ){
					this.$tools.toast("亲 ~ 帮卖不能结束")
					return false
				}
				let activityId = item.activityId
				let that=this
				uni.showModal({
				    title: '提示',
				    content: '是否结束推荐',
				    success: function (res) {
				        if (res.confirm) {
						   that.$u.api.endRecomment(activityId).then(e=>{ 		//
						    if(no){
                  that.ListInfo(1)
                }else{
                  that.ListInfo(2)
                }
						   }).catch(err=>{
							console.log(err)
						   })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			tabBtn(index){
				this.indexNow =  index
				console.log(index)
				if(index ==0){
					this.ListInfo(2)
				}else if(index == 1){
					this.ListInfo(1)
				}else if(index == 2){
          this.ListInfo(3)
        }
				
			},
			ListInfo(index){
				this.my_allList=""
				let param ={
						"isAsc": "",
						"orderBy": "",
						"orderByColumn": "",
						"pageNum": 0,
						"pageSize": 0,
						"searchValue": "",
						"status": index
				}
				this.$u.api.activityMyList(param).then(e=>{ 		//
					this.my_allList = e.rows
					console.log(this.my_allList,'帮卖');
				
				})
				
			}
		},
		
	}
</script>

<style lang="scss">
	button::after {
		border: none;
	}
	button {
		background-color: transparent;
		padding-left: 0;
		padding-right: 0;
		line-height:inherit;
	}
	button {
		border-radius:0;
	}
	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
		overflow: hidden;
	}
	.tab-nav{
		height: 88rpx;
		background-color: #FFFFFF;
		display: flex;
		view{
			font-size: 30rpx;
			flex: 1;
			text-align: center;
			line-height: 88rpx;
		}
		.orange{
			background: #ff0000;
			color: #FFFFFF;
		}
	}
	.x-body{
		background: #F7F7F7;
		.body-list{
			padding: 20rpx;
			.body-item{
				margin-bottom: 20rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				padding: 20rpx;
				box-sizing: border-box;
				width: 100%;
				.box-top{
					height: 80rpx;
					width: 100%;
					display: flex;
					align-items: center;
					position: relative;
					>image{
						height: 80rpx;
						width: 80rpx;
						background-size: 100% 100%;
						border-radius: 8rpx;
					}
					.recommend-name{
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						flex: 1;
						height: 80rpx;
						margin-left: 14rpx;
						>text{
							font-size: 30rpx;
							font-weight: bold;
						}
					}
					.x-info{
						display: flex;
						justify-content: space-between;
						text{
							font-size: 20rpx;
							color: #999999;
							// border-right: 1px solid #ccc;
							line-height: 100%;
							margin-right: 10rpx;
							padding-right: 10rpx;
						}
						text:nth-child(3){
							border-right:none;
						}
					}
					.x-button{
						position: absolute;
						top: 0;
						right: 0;
						border:1px solid #00D674;
						padding: 0rpx 6rpx;
						border-radius: 6rpx;
						color: #00D674;
						font-size: 20rpx;
						text-align: center;
						margin-left: auto;
					}
					
				}
				.x-center{
					margin: 20rpx 0;
					>text{
						font-size: 30rpx;
						color: #333333;
						margin-bottom: 20rpx;
						font-weight: 800;
					}
					.goods-info{
						display: flex;
						height: 200rpx;
						width: 100%;
						>image{
							height: 200rpx;
							width: 200rpx;
							border-radius: 8rpx;
						}
						.goods-content{
							width: 420rpx;
							margin-left: 20rpx;
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							.tag1{
								font-size: 30rpx;
								color: #333333;
								font-weight: 800;
							}
							.tag2{
								width: 100%;
								display: flex;
								text{
									display: flex;
									justify-content: center;
									align-items: center;
									width: 92rpx;
									height: 40rpx;
									border: 1px solid #ff0000;
									border-radius: 8rpx;
									text-align: center;
									font-size: 20rpx;
									color:#ff0000;
									margin-left: 10rpx;
									box-sizing: border-box;
									
									
								}
							}
							.tag3{
								color:#ff0000;
								font-size: 30rpx;
								font-weight: bold;
							}
						}
					}
				}
				.x-down{
					.x-down-item{
						view:nth-child(1){
							display: flex;
							align-items: center;
							margin-bottom: 20rpx;
							text{
								font-size: 24rpx;
								color: #999999;
							}
							image{
								width: 38rpx;
								height: 38rpx;
								background-size: 100% 100%;
								margin: 0 16rpx;
							}
							text:nth-last-child(1){
								margin-left: auto;
								color: #333333;
							}
						}
						
					}
					.x-last{
						display: flex;
						justify-content: space-between;
						align-items: center;
						>text{
							color:#ff0000;
							font-size: 30rpx;
							font-weight: bold;
						}
						button{
							border:1px solid #00D674;
							width: 100rpx;
							height: 42rpx;
							border-radius: 8rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							margin: 0;
							image{
								height: 32rpx;
								width: 32rpx;
							}
							>text{
								font-size: 24rpx;
								color: #00D674;
							}
						}
					
					}
					.x-bzw{
						display: flex;
						justify-content: space-between;
						margin-top: 20rpx;
						color: #333333;
						font-size: 24rpx;
						.btn{
							width: 204rpx;
							height: 60rpx;
							background: #ff0000;
							border-radius: 50rpx;
							color: #FFFFFF;
							font-size: 30rpx;
							line-height: 60rpx;
							text-align: center;
							display: block;
							margin-left: auto;
							
						}
					}
				}
			}
		}
	}

</style>
