<template>

	<view class="cantainer">
    <commonGoods ref="childa2"></commonGoods>
	<commonGoodsCode ref="childaCode"></commonGoodsCode>
    <view class="x-head">
      <view class="x-step ">
        <view class="x-top">
          <text class="active">√</text>
          <text  class="active">1</text>
          <text  class="active">2</text>
          <text class="active">3</text>
        </view>
        <view class="x-font">
          <text>发布/自购</text>
          <text>查看商品详情</text>
          <text>设置活动参数</text>
          <text>分享商品</text>
        </view>
      </view>
    </view>
		<view class="share-modul">
			<image :src="detailparp.activity.commodity.thumbnail" mode='widthFix' lazy-load></image>
			<view class="share-content">
				<view class="q1">
					<view class="u-line-2 thick">{{detailparp.activity.introduce}}</view>
					<text class="orange">惊喜价：￥<text class="u-font-40 thick">{{detailparp.activity.commodity.showPrice}}</text></text>
				</view>
				<view class="q2">
					<image :src="codeImg" mode=""></image>
					<view>微信扫码有惊喜</view>
				</view>
			</view>
		</view>

		<view class="downloador">
			<view @tap="parentF">
				<image src="../../../static/down.png" mode=""></image>
				<text>朋友圈</text>
			</view>
			 <view @tap="parentCode">
			 	<image src="../../../static/qrcode.png" mode=""></image>
			 	<text>商品二维码</text>
			 </view>   
			<button catchtap="share"
				:data-title="detailparp.activity.commodity.commodityName"
				:data-img="detailparp.activity.commodity.thumbnail"
				:data-activityId="detailparp.activityId"
				:data-promotionId="detailparp.promotionId"
				open-type="share">
				<image src="../../../static/wxiocn.png" mode=""></image>
				<text>分享</text>
			</button>
			
		</view>
		<view class="x-btn">
			<view class="btn-item1" @tap="putOut">发布更多</view>
			<view class="btn-item2" @tap="jumpThree">立即查看</view>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailparp:'',
				oneimg:'',
				codeImg:'',
			}
		},
		onLoad() {
      wx.hideShareMenu()
		},
		onShow() {
			let {detailparp} = this.$store.state

			let parm={
				promotionId:detailparp
			}
			
			this.$u.api.activityDetail(parm).then(e=>{
				this.detailparp = e
        this.$store.commit("hbmap",e)
				this.createCode(parm)
			})
		
		},

		onShareAppMessage(event) {
			if (event.from === 'button') {
				let {title,img,activityid:activityId,promotionid:promotionId} = event.target.dataset
        console.log(title,img,activityId,promotionId)
				return {
					title: "你的推荐官，让你购物更实惠，品质更有保障！",
					path:`/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`,
					imageUrl: img,
				};
			}
		},
		methods: {
      parentF(){
        this.$refs.childa2.shareFc()
      },
	  parentCode(){
		  this.$refs.childaCode.shareFc()
	  },
			createCode(parm){
				let {userId} = uni.getStorageSync('tokenorid');
				let param = {
						"page": "pages/home_page/index_details/index_details",
						"scene": JSON.stringify(parm)
				}
				this.$u.api.createCode(param).then(e=>{
						this.codeImg= e
          console.log(e)
            this.$store.commit("wxwewm",e)

				}).catch(err=>{
					console.log(err)
							
				})
			},
			putOut(){
        uni.switchTab({
          url:"/pages/tabbar/fine_goods/fine_goods"
        })
			},
			jumpThree(){
				uni.switchTab({
					url: "/pages/tabbar/index/index",
					success: function(e) {
						var page = getCurrentPages().pop();
						if (page == undefined || page == null) return;
						page.onLoad();
					}
				})
			},
			handleShowPoster() {

			},
		}
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
	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
	}
	.orange{
		color: #ff0000;
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
	.share-modul{
		>image{
			width: 750rpx;
		}
		.share-content{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			padding-bottom: 40rpx;
			background-color: #FFFFFF;
			.q1{
				width: 484rpx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				view{
					color: #616161;
					font-size: 28rpx;
				}
				text{
					margin-bottom: 10rpx;
				}
			}
			.q2{
				width: 200rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				image{
					height: 160rpx;
					width: 160rpx;
				}
				view{
					font-size: 20rpx;
					color: #616161;
					margin-top: 20rpx;
				}
			}
		}
	}
	.downloador{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 100rpx;
		height: 110rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		button,view{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0;
			image{
				height: 56rpx;
				width: 56rpx;
			}
			text{
				font-size: 26rpx;
			}
		}
	}
	.x-btn{
		height: 134rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		view{
			width: 342rpx;
			height: 90rpx;
			border-radius: 10rpx;
			font-size: 32rpx;
			line-height: 90rpx;
			text-align: center;
		
		}
		.btn-item1{
			background-color: #FFFFFF;
			border: 1px solid #ff0000;
			color: #ff0000;
		
		}
		.btn-item2{
			background: #ff0000;
			color: #fff;
		}
	}
</style>
