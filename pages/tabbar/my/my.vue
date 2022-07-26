<template>
	<view class="cantainer">
		
		<view v-if='!apiInfo' @tap='showLoginPopup=true' class='mark-content'></view>
		<me-login-popup :show='showLoginPopup'
			@hideEvent='loginHide'
		></me-login-popup>
		
		<view class="x-head u-border-top">
			<view class="top-head">
				<image :src="apiInfo.headImgUrl" mode=""></image>
				<view class="right-item">
					<view class="u-font-40">{{apiInfo.nickName  || "请登录"}} 
					<text v-if="apiInfo.tj" class="x-btn">推荐官</text>
					<text v-else-if="apiInfo.bt" class="x-btn">帮推官</text>
          <text v-else class="x-btn">团员 </text>
					</view>
					<text>ID:{{apiInfo.userId || "请登录" }}</text>
				</view>
			</view>
		</view>
		<!-- 上 -->
		<view class="x-function" style="margin-top: 0; width: 750rpx;">
			<view class="down-head" style="justify-content: space-between;">
		<!-- 			<view @tap="jumpWithdraw">
						<image src="/static/my1.png" mode=""></image>
						<text>0.00</text>
					</view> -->
			<!-- 		<navigator hover-class="none" url="/pages/my/money_detail/money_detail" >
						<image src="/static/my1.png" mode=""></image>
						<text>明细</text>
					</navigator> -->
					<navigator hover-class="none" url="/pages/my/money_box/money_box" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/15.png" mode=""></image>
						<text>明细</text>
						<!-- 原来<text>我的关注</text> -->
					</navigator>
					<navigator hover-class="none" url="/pages/my/team/team" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/12.png" mode=""></image>
						<text>我的团员</text>
					</navigator>
					
		<!-- 			<navigator hover-class="none" url="/pages/my/i_recommend/i_recommend" >
						<image src="/static/my4.png" mode=""></image>
						<text>我的推荐</text>
					</navigator>
					<navigator hover-class="none" url="/pages/my/bind_recommender/bind_recommender" >
						<image src="/static/bindtjg.png" mode=""></image>
						<text>绑定的推荐官</text>
					</navigator> -->
					<view @tap="jumpAddress" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/11.png" mode=""></image>
						<text>收货地址</text>
					</view>
					<navigator hover-class="none" url="/pages/home_page/official_account" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/14.png" mode=""></image>
						<text>官方公众号</text>
					</navigator>
			</view>
		</view>
		
		<!-- 新增2 -->
		<view class="x-function">
			<view class="x-title" style="color: red;">学习中心</view>
			<view class="down-head">
			<!-- 		<view @tap="jumpWithdraw">
						<image src="/static/my1.png" mode=""></image>
						<text>提现</text>
					</view> -->
					<navigator hover-class="none" url="/pages/my/gzh/why" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/1.png" mode="" ></image>
						<text>什么是推荐官</text>
					</navigator>
					<navigator hover-class="none" url="/pages/my/gzh/gzh" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/10.png" mode=""></image>
						<text>了解推荐官</text>
					</navigator>
				<!-- 	<navigator hover-class="none" url="/pages/my/nokf/nokf" >
						<image src="/static/xz2.png" mode=""></image>
						<text>如何成为推荐官</text>
					</navigator>
					<navigator hover-class="none" url="/pages/my/nokf/nokf" >
						<image src="/static/xz2.png" mode=""></image>
						<text>如何成为推荐官</text>
					</navigator> -->
					<!-- <view>
						<button open-type="contact">官方客服</button>
						
					</view> -->
					<view hover-class="none" style="display: flex;flex-direction: column;align-items: center;">
						<button open-type="contact" style="display: flex;flex-direction: column;align-items: center;">
							<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/2.png" mode=""></image>
							<text style="margin-top: 7rpx;">官方客服</text>
						</button>
						
					</view>
					
					<navigator hover-class="none" url="/pages/my/attention/attention?role=BT" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/13.png" mode=""></image>
						<text>帮推官社群</text>
					</navigator>
					
					<navigator hover-class="none" url="/pages/my/attention/attention?role=TJ" >
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/5.png" mode=""></image>
						<text>推荐官社群</text>
					</navigator>
			</view>
		</view>

<!--    v-if="apiInfo.role == 'BT' ||apiInfo.role == 'TJ' "-->
		<view class="x-function"  v-if="apiInfo.bt" >
			<view class="x-title" style="color: red;">帮推官</view>
			<view class="down-head">
				<!-- <navigator hover-class="none" url="/pages/my/money_box/money_box" >
					<image src="/static/my1.png" mode=""></image>
					<text>明细</text>
				</navigator> -->
				<navigator hover-class="none" url="/pages/my/i_recommend/i_recommend" >
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/6.png" mode=""></image>
					<text>帮推商品</text>
				</navigator>
		
<!--				<navigator hover-class="none" url="/pages/my/nokf/nokf" >-->
<!--					<image src="/static/g2.png" mode=""></image>-->
<!--					<text>发起关联推荐官</text>-->
<!--				</navigator> -->
				
				<!-- <navigator hover-class="none" url="/pages/home_page/my_shop/my_shop" > -->
<!--				<view @tap="mymainShop" >-->
<!--					<image src="/static/xz5.png" mode=""></image>-->
<!--					<text>我的主铺</text>-->
<!--				</view>-->
				<navigator hover-class="none" url="/pages/my/bind_recommender/bind_recommender" >
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/4.png" mode=""></image>
					<text>绑定的推荐官</text>
				</navigator>
			<!-- 	<navigator hover-class="none" url="/pages/my/audit_shops/audit_shops" >
					<image src="/static/g4.png" mode=""></image>
					<text>帮推官审核</text>
				</navigator> -->
			</view>
		</view>
		<!-- 推荐官/商家推荐官 -->
    <common ref="childa"></common>
   <view class="x-function"  v-if="apiInfo.tj" >
       <view class="x-title" style="color: red;">推荐官</view>
      <view class="down-head">
       <!-- <navigator hover-class="none" url="/pages/my/money_box/money_box" >
          <image src="/static/my1.png" mode=""></image>
          <text>明细</text>
        </navigator> -->
        <navigator hover-class="none" url="/pages/my/i_recommend/i_recommend" >
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/s.png" mode=""></image>
          <text> 我发布的商品</text>
        </navigator>
        <view @tap="mymainShop" >
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/sh.png" mode=""></image>
          <text>我的主铺</text>
        </view>
        <navigator hover-class="none" url="/pages/my/my_shops/my_shops" >
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/7.png" mode=""></image>
          <text>我的帮推官</text>
        </navigator>
        <view hover-class="none"   @click="parentF">
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/4.png" mode=""></image>
          <text>招募帮推官</text>
        </view>
        <navigator hover-class="none" url="/pages/my/audit_shops/audit_shops" >
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/3.png" mode=""></image>
          <text>帮推官审核</text>
          <view v-if="redDot" class="dw"></view>
        </navigator>
		<navigator hover-class="none" url="/pages/tabbar/fine_goods/explain" >
		  <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bk.png" mode=""></image>
		  <text>教程案例</text>
		</navigator>
       <!-- <view> -->
<!--          <image src="/static/hbsc.png" mode=""></image>-->
<!--          <text>共享商城</text>-->
       <!-- </view> -->

        <!--				<navigator hover-class="none" url="/pages/my/nokf/nokf" >-->
        <!--					<image src="/static/g2.png" mode=""></image>-->
        <!--					<text>发起关联商家</text>-->
        <!--				</navigator>-->
        <!--				<navigator hover-class="none" url="/pages/my/nokf/nokf" >-->
        <!--					<image src="/static/g2.png" mode=""></image>-->
        <!--					<text>发起关联特约官</text>-->
        <!--				</navigator>-->

     </view>
    </view>
    <!-- 推广人 -->
    <view class="x-function"  v-if="apiInfo.isMallPromoter" >
       <view class="x-title" style="color: red;">推广人</view>
      <view class="down-head">

        <view>
          <image src="/static/hbsc.png" mode=""></image>
          <text>共享商城</text>
        </view>

        <navigator hover-class="none" url="/pages/promoter/store_member/store_member" >
          <image src="/static/tcy.png" mode=""></image>
          <text> 商城成员</text>
        </navigator>

        <navigator hover-class="none" url="/pages/promoter/associated/associated" >
          <image src="/static/tgl.png" mode=""></image>
          <text> 关联列表</text>
        </navigator>

        <navigator hover-class="none" url="/pages/promoter/tgmoney/tgmoney" >
          <image src="/static/tmx.png" mode=""></image>
          <text> 推广明细</text>
        </navigator>
      </view>
    </view>
		<!-- 活动  start -->
		<!-- 此部分 已画好界面，但未接接口 -->
			<!-- <view class="x-function"  v-if="show_activity">
				 <view class="u-flex u-row-between" @tap="$u.route({url: 'pages/activity/my/activity_order_list'})">
					<text class="x-title">活动</text>
					<view>
						<text>全部订单</text>
						<u-icon name="arrow-right u-p-r-20" color="#444444"></u-icon>
					</view>
				 </view>
				<view class="down-head">
					<view hover-class="none" @tap="$u.route({url: 'pages/activity/my/activity_order_list',params: {status_code: 1}})" >
						<image src="/static/activity/obligation_icon.png" mode=""></image>
						<text>待付款</text>
					</view>
					<view hover-class="none" @tap="$u.route({url: 'pages/activity/my/activity_order_list',params: {status_code: 2}})" >
						<image src="/static/activity/prepare.png" mode=""></image>
						<text>待参与</text>
					</view>
					<view hover-class="none" @tap="$u.route({url: 'pages/activity/my/activity_order_list',params: {status_code: 3}})">
						<image src="/static/activity/refund_icon.png" mode=""></image>
						<text>退款</text>
					</view>
					<view hover-class="none" @tap="$u.route({url: 'pages/activity/my/activity_order_list',params: {status_code: 4}})">
						<image src="/static/activity/finish_icon.png" mode=""></image>
						<text>已完成</text>
					</view>
				</view>
			</view>
		<view class="u-m-t-20">
			<view class="u-flex u-row-between line-item u-col-center" @tap="$u.route({url: 'pages/activity/my/check_ticket'})">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/scan_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">扫码验票</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
		</view>
		<view class="u-m-t-20">
			<view class="u-flex u-row-between line-item u-col-center" @tap="$u.route({url: 'pages/activity/my/my_collection'})">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/collect_icon.png" width="50" class="u-p-r-10" height="50" color="#444444"></u-icon>
					<text class="">我的收藏</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/msg_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">我的消息</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center" @tap="$u.route({url: 'pages/activity/my/my_concerned'})">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/concerned_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">我的关注</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center" @tap="$u.route({url: 'pages/activity/my/account_seting'})">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/account_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">账号设置</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
		</view>
		<view class="u-m-t-20">
			<view class="u-flex u-row-between line-item u-col-center">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/share_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">分享好友</text>
				</view>
				<view class="u-flex u-col-center">
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center">
				<view class="u-flex u-col-center">
					<u-icon name="/static/activity/help_icon.png" class="u-p-r-10" width="50" height="50" color="#444444"></u-icon>
					<text class="">帮助中心</text>
				</view>
				<view class="u-flex u-col-center">、
					<u-icon name="arrow-right" color="#444444"></u-icon>
				</view>
			</view>
		</view> -->
		<!-- 活动  end -->
		<view class="break-time" v-show="isAttention">
			<text>关注好友推荐官公众号，掌握实时活动和订单通知</text>
			<view class="x-button" @tap="jumpAttention" >立即关注</view>
		</view>
    <u-tabbar :list="tabbar" ></u-tabbar>
	</view>
</template>

<script>

	
	/* 1. 先判断接口 有没有数据，
	   2.如果没有 去授权，拿到数据上传到服务器，存缓存     2.1如果有 不要授权，拿到数据存缓存
	   3.
	*/
	export default {
		data() {
			return {
        tabbar:{},
				userinfoAll:false,
				showLoginPopup:false,
				apiInfo:null,
				isAttention:false,
				// redDot:false
				show_activity: true	// 显示活动板块
			}
		},
		onLoad() {			
      this.tabbar = this.$store.state.tab
		},
		onShow(){
      console.log('???')
			this.sysUserInfo()
			// this.listItem()
		},
    onShareAppMessage(event) {
      let {nickName,userId} = uni.getStorageSync('tokenorid');
      //分享详情
      return {
        title: `${nickName}邀请您成为TA的帮推官！`,
        path: `pages/home_page/my_shop/my_shop?mainUserId=${userId}&enterBT=BT`,
        imageUrl: '/static/fxtp.jpg',
      };
    },
		methods: {
      parentF(){
        this.$refs.childa.shareFc()
      },
			jumpAttention(){
				uni.navigateTo({
					url:"/pages/home_page/official_account"
				})
			},
			jumpWithdraw(){
				uni.navigateTo({
					url:"/pages/my/withdraw/withdraw"
				})
				
			},
			loginHide(e){
				this.showLoginPopup=false;
				if(e){
					this.getUserInfo();
					// this.userLogin();
				}
			},
			mymainShop(){
				let mainUserid = uni.getStorageSync('tokenorid').userId;
				uni.navigateTo({
						url:"/pages/home_page/my_shop/my_shop?mainUserId="+mainUserid
				})
			},

			getUserInfo(){     // 授权
				uni.getUserProfile({
					desc:'用于信息展示',
					success:res=>{
						console.log("用户信息",res.userInfo)
						
						uni.setStorage({
							key:'userinfoKey',data:res.userInfo,
						});
						let data={
							"headImgUrl":res.userInfo.avatarUrl,
							"nickName": res.userInfo.nickName,
						}
						this.$u.api.pushHead(data).then(e=>{
							console.log("上传头像姓名",e)
							this.sysUserInfo();
						}).catch(err=>{
							console.log(err)
						})
					
					}
				});
			},
			sysUserInfo(){  //拿数据
				this.$u.api.getUserInfo().then(e=>{
					if(e.headImgUrl){
						this.isAttention = e.isSubscribe
						uni.setStorage({
							key:'userinfoKey',data:e,
						});
						this.apiInfo = e
						
					}else{
						this.showLoginPopup = true
						// this.loginHide()
					}
					
				}).catch(err=>{
					console.log(err)
			
				})
			},
			jumpAddress(){
				let that = this
				uni.navigateTo({
					url:"/pages/my/address/address",
					success() {
						that.$store.commit('addressStateFn','my')
					}
				})
			},
			// listItem(){      //TODO 审核信息
			// 	let param={
			// 		"status": 0
			// 	}
			// 	this.$u.api.helpApplyList(param).then(e=>{
			// 		if(e){
			// 			this.redDot = true
			// 		}else{
			// 			this.redDot = false
			// 		}
      //
			// 	})
			// },
		},
	
		
	}
</script>

<style lang="scss">
	.mark-content{
		position:fixed;top:0;left:0;
		width:100%;height:100%;
	}
	.orange{
		color: #ff0000;
	}
	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
		padding-bottom: 50rpx;
		
	}
	.x-head{
		padding: 20rpx;
		background-color: #FFFFFF;
		
		.top-head{
			display: flex;
			height: 110rpx;
			image{
				height: 110rpx;
				width: 110rpx;
				border-radius: 6rpx;
			}
			.right-item{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
				text{
					font-size: 24rpx;
				}
				.x-btn{
					border: 1px solid #ff0000;
					background-color: #ff0000;
					color: #fff;
					margin-left: 10rpx;
					padding: 0rpx 4rpx;
					border-radius: 6rpx;
				}
			}
		}
		.down-head{
			width: 100%;
			background-color: red;
			.box-item{
				background-color: #FFFFFF;
				border-radius: 10rpx;
				display: flex;
				flex-wrap: wrap;
				margin-top: 60rpx;
				padding: 0 20rpx;
				navigator, view{
					width: 25%;
					display: flex;
					align-items: center;
					flex-direction: column;
					height: 120rpx;
					image{
						height:48rpx ;
						width: 48rpx;
					}
					text{
						font-size: 24rpx;
						margin-top: 4rpx;
					}
				}
			}
		}
	}
	.x-function{
		background-color: #FFFFFF;
		width: 710rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		.x-title{
			font-size: 32rpx;
			color: #333333;
			padding: 20rpx;
		}
		.down-head{
			display: flex;
			flex-wrap: wrap;
		 	navigator, view{
				width: 25%;
				height: 100rpx;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				position: relative;
				image{
					height:48rpx ;
					width: 48rpx;
				}
				text{
					font-size: 24rpx;
					margin-top: 4rpx;
				}
				.dw{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: red;
					position: absolute;
					top: 0;
					right: 50rpx;
					margin: 0;
				}
			}
		}
	}
	.x-img{
		padding: 20rpx;
		width: 750rpx;
		height: 254rpx;
		box-sizing: border-box;
		image{
			height: 100%;
			width: 100%;
		}
	}
	.break-time{
		height: 84rpx;
		background-color: #FFF9E4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #ff0000;
		padding: 0 20rpx;
		text{
			color: #333333;
		}
		.x-button{
			width: 134rpx;
			height: 52rpx;
			background: #ff0000;
			border-radius: 6rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			line-height: 52rpx;
			text-align: center;
	
		}
	}
	/******************* 活动 *********************/
	.line-item {
		background-color: #fff;
		margin: 0rpx 20rpx 0;
		padding: 31rpx 16rpx;
		border-bottom: 1rpx solid #EEEEEE;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		// font-weight: 400;
		color: #333333;
		&:last-child {
			border-bottom: none;
		}
	}
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
		&::after {
			border: none;
			background-color: none;
		}
	}
</style>
