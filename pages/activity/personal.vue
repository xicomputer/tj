<template>
	<!-- 我的页面 -->
	<view class="wrapper">
		<!-- 个人资料 -->
		<view
			style="border-radius: 50%;background: rgba(120, 120, 120, 0.5);color: fff;text-align: center;position: fixed;left: 30rpx;z-index: 99999;"
			:style="{ top: menuButtonInfo.top + 'px', width: menuButtonInfo.height + 'px', height: menuButtonInfo.height + 'px', 'line-height': menuButtonInfo.height + 'px' }"
			@click="jumpHome"
		>
			<u-icon name="arrow-left" color="#ffffff" size="30"></u-icon>
		</view>
		<image
			:src="
				userinfo.edit_backgroundImage[0].url
					? userinfo.edit_backgroundImage[0].url
					: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/20705154340.png'
			"
			style="width:100%;height: 250rpx;vertical-align: bottom;"
			mode="aspectFill"
		></image>
		<!-- <view class="profile" :style="{ backgroundImage: `url(${userinfo.backgroundImage[0].url?userinfo.backgroundImage[0].url:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/20705154340.png'})` }"  style="position: relative;"> -->
		<view class="profile" style="position: relative;background-color: #fff;">
			<view class="meta">
				<view class="meta-item" style="position: absolute;right: 20rpx;top: -40rpx;">
					<view><u-avatar :src="userinfo.edit_avatarUrl[0].url ? userinfo.edit_avatarUrl[0].url : userinfo.headImgUrl" size="80"></u-avatar></view>
					<view class="u-flex-1" style="padding: 6rpx 12rpx;background-color: #1873d5;border-radius: 12rpx;color: white;font-size: 24rpx;" v-if="userinfo.state == '已认证'">
						{{ userinfo.state }}
					</view>
					<view class="u-flex-1" style="padding: 6rpx 12rpx;background-color: #36bd1e;border-radius: 12rpx;color: white;font-size: 24rpx;" v-else>个人认证</view>
					<view
						class="u-flex-1"
						style="padding: 10rpx 20rpx;background-color: #d5b385;border-radius: 12rpx;color: white;font-size: 24rpx;margin-top: 105rpx;"
						@tap="edit_data(userinfo)"
					>
						编辑资料
					</view>
				</view>
				<view style="margin-left: 50rpx;">
					<view class="nickname" style="font-weight: 800;font-size: 40rpx;">{{ userinfo.edit_nickName ? userinfo.edit_nickName : userinfo.nickName }}</view>
					<view class="nickname u-line-3" style="font-size: 26rpx;width: 522rpx;height:114rpx;">{{ userinfo.introduction ? userinfo.introduction : '暂未设置' }}</view>
					<view class="nickname" style="display: flex;position: absolute;bottom: 0rpx;">
						<view style="margin-right: 20rpx;">
							<text style="font-size: 40rpx;margin-right: 6rpx;">{{ totalfabu.length }}</text>
							<text style="font-size: 26rpx;">发布</text>
						</view>
						<view style="margin-right: 20rpx;">
							<text style="font-size: 40rpx;margin-right: 6rpx;">{{ totalcanyu }}</text>
							<text style="font-size: 26rpx;">参与</text>
						</view>
						<view style="margin-right: 20rpx;">
							<text style="font-size: 40rpx;margin-right: 6rpx;">{{ tatalliulang }}</text>
							<text style="font-size: 26rpx;">浏览</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view style="width: 700rpx;height: 233rpx;margin: 20rpx auto;" @click="jumppublish">
			<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/220707153818.png" style="width: 100%;height: 100%;" mode=""></image>
		</view> -->
		<view style="width: 700rpx;height: 220rpx;margin: 0 auto;display: flex;align-items: center;justify-content: space-around;background-color: #fff;margin-top: 20rpx;">
			<view style="display: flex;flex-direction: column;align-items: center;" @click.stop="$u.route({ url: 'pages/activity/specialArea?id=' + uid })">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/0707153844.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">个人主页</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;" @click.stop="jumpmanagement()">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/0707153832.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">活动管理</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;" @click.stop="jumpdistribution()">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/1af1f0ce7799e749a0fda5c35fe0a86.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">分销明细</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;" @click.shop="getscanCode">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/707153850.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">扫码核销</text>
			</view>
		</view>

		<view style="width: 700rpx;height: 220rpx;margin: 0 auto;display: flex;align-items: center;justify-content: space-around;background-color: #fff;margin-top: 20rpx;">
			<view style="display: flex;flex-direction: column;align-items: center;" @click.stop="jumppublish">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/4953.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">免费发布</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;" @click.shop="jumprenzhen">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/215009.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">企业认证</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<button open-type="contact" style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/215016.png" mode=""></image>
					<text style="font-size: 28rpx;font-weight: 600;color: black;">联系我们</text>
				</button>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;" @tap="$u.route({ url: 'pages/release/order_list' })">
				<image style="width: 90rpx;height: 90rpx;margin-bottom: 15rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/003.png" mode=""></image>
				<text style="font-size: 28rpx;font-weight: 600;color: black;">订单管理</text>
			</view>
		</view>

		<view style="width: 700rpx;margin: 0 auto;margin-top: 20rpx;">
			<!-- <view class="activity_box_info" @click="jumppublish">
					<view style="display: flex;align-items: center;">
						<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/4953.png" size='50'></u-icon>
						<text  class="tt-text" style="margin-left: 15rpx;">免费发布:</text>
					</view>
					<view class="u-flex">						
						<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
					</view>
				</view>
				<view class="activity_box_info">
					<view style="display: flex;align-items: center;">
						<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/215009.png" size='50'></u-icon>
						<text  class="tt-text" style="margin-left: 15rpx;">企业认证:</text>
					</view>
					<view class="u-flex">
						<text class="word9 u-m-r-10" style="font-size: 22rpx;color: red;">{{ activityInfo ? activityInfo : '身份未认证无法发布收费活动' }}</text>
						<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
					</view>
				</view>
				<view class="activity_box_info">
					<button open-type="contact">
						<view style="display: flex;align-items: center;">
							<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/215016.png" size='50'></u-icon>
							<text  class="tt-text" style="margin-left: 15rpx;">联系我们:</text>
						</view>
						<view class="u-flex">
							<text class="word9 u-m-r-10" style="font-size: 22rpx;color: red;"></text>
						</view>
					</button>					
				</view> -->
			<view class="activity_box_info" style="margin-top: 20rpx;border-bottom: 0px;" @tap="$u.route({ url: 'pages/login/agreement?id=' + 1 })">
				<text class="tt-text">用户协议:</text>
				<view class="u-flex">
					<text class="word9 u-m-r-10" style="font-size: 22rpx;color: red;"></text>
					<u-icon name="arrow-right" size="26" color="#c5c5c5"></u-icon>
				</view>
			</view>
			<!-- <view class="activity_box_info" style="margin-top: 0rpx;border-top: 0px;" @tap="$u.route({ url: 'pages/activity/after_sale_tel'})">
				<text class="tt-text">发布活动网页版:</text>
				<view class="u-flex">
					<text class="word9 u-m-r-10" style="font-size: 22rpx;color: red;"></text>
					<u-icon name="arrow-right" size="26" color="#c5c5c5"></u-icon>
				</view>
			</view> -->
			<pop-phone></pop-phone>
		</view>
	</view>
</template>

<script>
// 我的页面逻辑
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			userinfo:'',
		  activityInfo:'',
			uid:'',
			openid:'',
			totalfabu:0,
			tatalliulang:0,
			totalcanyu:0,
			userId:'',
			menuButtonInfo:{}
		};
	},
	computed: {

	},
	onShow() {

	},
	async onLoad(e) {
		console.log(e,'ddddddppp');
		this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
			if(!res.result.data[0].nickName || !res.result.data[0].headImgUrl){
				this.$u.route({url:'pages/login/login'})
			}
			this.uid = res.result.data[0]._id
			this.userId = res.result.data[0].userId
			this.userinfo = res.result.data[0]
			console.log(res.result.data[0],'jjjjjj');

		})
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
		// this.userinfo = JSON.parse(e.item)
		this.loadData()
		this.data(this.openid)
	},
	methods: {
		jumpdistribution(){
			this.$u.route({url:'pages/activity/money_box'})
		},
		jumprenzhen(){
			if(typeof this.userinfo.phone == 'undefined' || !this.userinfo.phone){
				this.$store.commit('imporIsAutoPhone',true)
				return
			}
			if(this.userinfo.state == '已认证'){
				uni.navigateToMiniProgram({
					appId: 'wx49625208931d29ec',
					// extraData:this.userId
				})
				
			}else if(!this.userinfo.hasSupplierAccount && typeof this.userinfo.mchidApplyDTO == 'undefined'){				
					let parmas = {
							nickName: this.userinfo.nickName,
							phone:  this.userinfo.phone,
							unionId:  this.userinfo.unionId,
							userId:this.userinfo.userId
						}
						uni.request({
							url: 'https://xinshu.distribution.letterbook.cn/distribution-server/supplier/openActivityAccount',
							method: 'POST',
							data: parmas,
							header: {
								'Content-Type': 'application/json'
							}
						}).then(res => {
							console.log(res,'mmmmm');
							uni.navigateToMiniProgram({
								appId: 'wxb8c4b2be4e339222',							
								extraData:this.userId
							})
						})				
			}else if(this.userinfo.hasSupplierAccount && typeof this.userinfo.mchidApplyDTO != 'undefined' && this.userinfo.mchidApplyDTO.applymentId != 7){
				uni.navigateToMiniProgram({
					appId: 'wxb8c4b2be4e339222',
					extraData:this.userId
				})
			}
		},
		data(openid){
			db.collection('activityList').where({openid:openid}).get().then(res=>{
				console.log(res,'lkkkkk');
				this.totalfabu = res.result.data
				this.totalfabu.forEach(item=>{
					this.tatalliulang += item.browse
				})
				db.collection('enroll_info').where({'dataList.openid':openid}).count().then(req=>{
					console.log(req,'req');
					this.totalcanyu = req.result.total
				})
			})
		},
		jumpHome(){
			uni.switchTab({
				url:'/pages/tabbar/activity/activity'
			})
		},
		edit_data(item) {
			uni.navigateTo({
				url: '/pages/activity/apply_item_text',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: data => {
						this.userinfo = data.dataList;

					},
					someEvent: function(data) {
						console.log(data);
					}
				},
				success: function(res) {
					console.log(res,'res');
				    res.eventChannel.emit('applySetingFormedit_data', { data: item })
				}
			});
		},
		loadData(){
			db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
				this.userinfo = res.result.data[0]
				console.log(this.userinfo,'nnnn');
				if(this.userinfo.state == '已认证'){
					this.activityInfo = '已认证'
				}
			})
		},
		tishi(){
			uni.showToast({
				title:'你暂无权限使用',icon:"none"
			})
		},
		jumppublish(){
			if(uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID){
				this.$u.route({url:'pages/release/publish_activity'})
			}else{
				this.userLogin()
			}
		},
		jumpmanagement(){
			if(uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID){
				this.$u.route({url:'pages/release/activity_management'})
			}else{
				this.userLogin()
			}
		},
		userLogin() {
			//初始化  登陆 拿token 获取列表
			let that = this;
			uni.login({
				success: res => {
					var code = res.code;
					this.$u.api
						.logoin(res.code)
						.then(e => {
							uni.setStorage({
								key: 'tokenorid',
								data: e
							});
							this.sysUserInfo();
							this.gethuodong();
						})
						.catch(err => {
							console.log('错误', err);
						});
				}
			});
		},
		getscanCode() {
			wx.scanCode({
				onlyFromCamera: true, // 只允许从相机扫码
				success: res => {
					// console.log("扫码成功："+JSON.stringify(res))
					let result = JSON.stringify(res);
					this.scanCode = JSON.parse(result);
					console.log(this.scanCode, 'dddd');
					// 扫码成功后  在此处理接下来的逻辑
					setTimeout(() => {
						this.loadDataCode(this.scanCode.result);
					}, 500);
				}
			});
		},
		loadDataCode(outTradeNo) {
			db.collection('enroll_info')
				.where({
					outTradeNo: outTradeNo,
					'dataList.openid':this.openid,
					state: '已预约'
				})
				.get()
				.then(res => {
					let result = res.result.data[0];
					console.log(result, 'result');
					if (!result) {
						uni.showToast({
							title: '未通过',
							icon: 'none'
						});
						return;
					} else {
						db.collection('enroll_info')
							.doc(result._id)
							.update({
								state: '已核销'
							})
							.then(res => {
								uni.showToast({
									title: '核销成功',
									icon: 'none'
								});
								return;
							});
					}
				});
		},
	}
};
</script>

<style lang="scss">
// 我的页面样式
.wrapper {
	position: absolute;
	top: 0;
	bottom: 0;

	width: 100%;
	background-color: #e3e3e3;
	.vip-box {
		width: 710rpx;
		height: 200rpx;
		margin: 0 auto;
		// border-radius: 20rpx;
		background-color: white;
		overflow: hidden;
		font-size: 28rpx;
		position: relative;
		top: -32rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
		// .vip-card-area {
		// 	color: #f7d680;
		// 	background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
		// }

		// .stats-area {
		// 	.item {
		// 		padding: 30rpx 0;
		// 	}

		// 	.num {
		// 		font-size: $font-lg;
		// 		color: $font-color-dark;
		// 		margin-bottom: 6rpx;
		// 	}
		// }
	}

	.profile {
		height: 275rpx;
		background-repeat: no-repeat;
		backgroundposition: center;
		background-size: cover;
		// padding-top: 200rpx;
		// display: flex;
		// justify-content: center;
		// align-items: center;

		.meta {
			.meta-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-left: 30rpx;
				padding-right: 20rpx;
				padding-bottom: 30rpx;
			}
			.nickname {
				color: black;
				font-size: 32rpx;
				padding-bottom: 20rpx;
			}
			.loginandout {
				text-decoration: underline;
				color: white;
				font-size: 30rpx;
			}
		}
	}

	.count {
		display: flex;
		flex-wrap: wrap;
		width: 710rpx;
		margin: 0 auto;
		// height: 100rpx;
		text-align: center;
		border-radius: 4rpx;
		background-color: #fff;
		margin-bottom: 30rpx;

		.cell {
			width: 25%;
			// flex: 1;
			padding: 29rpx;
			font-size: 24rpx;
			color: #333;
			image {
				width: 45rpx;
				height: 45rpx;
			}
			text {
				display: block;
				font-size: 24rpx;
			}
		}
	}

	.orders {
		margin: -17rpx 20rpx 0 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		border-radius: 15rpx;

		.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
		}

		.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.sortsItem {
				display: flex;
				flex-direction: column;
				align-items: center;
				image {
					width: 45rpx;
					height: 45rpx;
					margin-bottom: 10rpx;
				}
				text {
					font-size: 24rpx;
				}
			}
		}
	}

	.address {
		line-height: 1;
		background-color: #fff;
		font-size: 30rpx;
		padding: 25rpx 0 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
	}

	.extra {
		margin: 0 20rpx;
		background-color: #fff;
		border-radius: 4rpx;

		.item {
			line-height: 1;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
	}

	.icon-arrow {
		position: relative;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	}
}
.footer-box {
	position: fixed;
	bottom: 0;
	height: 160rpx;
	width: 100%;
	z-index: 100;
	background-color: white;
	.total-info {
		.txt5 {
			width: 60rpx;
			height: 30rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(0, 0, 0, 1);
			font-size: 28rpx;
			white-space: nowrap;
			line-height: 30rpx;
			text-align: right;
		}
		.txt6 {
			width: 37rpx;
			height: 30rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(253, 111, 45, 1);
			font-size: 28rpx;
			white-space: nowrap;
			line-height: 30rpx;
			text-align: right;
			margin: 0 0 0 22rpx;
		}
	}
	.apply-btn {
		height: 90rpx;
		border-radius: 4px;
		background-color: #fd6f2d;
		.info2 {
			width: 128rpx;
			height: 32rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 32rpx;
			font-family: PingFangSC-Medium;
			white-space: nowrap;
			line-height: 32rpx;
			text-align: right;
		}
	}
}
.activity_box_info {
	width: 700rpx;
	height: 100rpx;
	background-color: #fff;
	// box-shadow: 0 0 10px 0 #bcbcbc;
	margin: 0rpx auto;
	padding: 10rpx 40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.tt-text {
	font-size: 26rpx;
	font-weight: 700;
}
button {
	position: relative;
	display: block;
	// margin-top: 20rpx;
	margin-left: 0;
	margin-right: auto;
	padding-left: 0px;
	padding-right: 0px;
	box-sizing: border-box;
	font-size: 18px;
	text-align: left;
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
