<template>
	<!-- 我的页面 -->
	<view class="wrapper">
		<!-- 个人资料 -->
		<!-- <view class="profile" >
			<view class="meta">
				<view class="meta-item">
					<view><u-avatar :src="userinfo.headImgUrl" size="120"></u-avatar></view>
					<view class="u-flex-1">
						<view class="nickname">{{ userinfo.nickName }}</view>
					</view>
				</view>
			</view>
		</view> -->
		<view style="width: 100%;">
			<view style="width: 600rpx;margin: 0 auto;margin-top: 100rpx;">
				<view style="font-size: 36rpx;font-weight: 900;margin: 40rpx 0;">
					请选择要发布的活动!
				</view>
				<view style="background-color: #fff;width: 100%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;" @click.stop="jumppublish">
					<u-icon color="#1296db" size="40" name="account"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">报名/售票活动</view>
						<view style="font-size: 26rpx;color: #999;">报名信息收集、平台曝光</view>
					</view>
				</view>
			</view>
			
			<view style="width: 600rpx;margin: 0 auto;" @click="$u.route({url:'pages/activity/specialArea?id='+uid})">				
				<view style="background-color: #fff;width: 100%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;">
					<u-icon size="40" name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/5651.png"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">我的主页</view>
						<view style="font-size: 26rpx;color: #999;">查看主页信息</view>
					</view>
				</view>
			</view>
			
			<view @click.stop="tishi" style="width: 600rpx;margin: 0 auto;display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;">
				<view style="width: 45%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
					<u-icon color="#ff0888" size="40" name="bookmark"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">平台活动</view>
						<view style="font-size: 26rpx;color: #999;">品牌快速传播</view>
					</view>
				</view>
				
				<view @click.stop="tishi" style="width: 45%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
					<u-icon color="#ff0888" size="40" name="bookmark"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">裂变活动</view>
						<view style="font-size: 26rpx;color: #999;">激励用户推广</view>
					</view>
				</view>
				
				<view style="width: 45%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;background-color: #fff;"  @click.stop="jumpmanagement()">
					<u-icon color="#ff0888" size="40" name="bookmark"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">活动管理</view>
						<view style="font-size: 26rpx;color: #999;">查看活动</view>
					</view>
				</view>
				
				<view style="width: 45%;display: flex;align-items: center;border-radius: 22rpx;padding: 20rpx;margin-bottom: 20rpx;background-color: #fff;" @click.stop="getscanCode">
					<u-icon color="#ff0888" size="40" name="bookmark"></u-icon>
					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
						<view style="font-size: 36rpx;font-weight: 900;">扫码核销</view>
						<view style="font-size: 26rpx;color: #999;">核销订单</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<!-- <view class="footer-box">
				<view class="u-flex" style="justify-content: space-around;">
					<view style="display: flex;flex-direction: column;align-items: center;">
						<view style="padding-top: 10rpx;">
							<u-icon  size="50" name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/backicon.png"></u-icon>
						</view>
						
						<view>
							主页
						</view>
					</view>
					<view @click="$u.route({url:'pages/activity/partake_list'})" style="display: flex;flex-direction: column;align-items: center;">
						<view style="padding-top: 10rpx;">
						<u-icon size="50" name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/sadf.png"></u-icon>
						</view>
						<view>
							参与活动
						</view>
					</view>
				</view>
			</view> -->
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
			uid:'',
			openid:'',
		};
	},
	computed: {
		
	},
	onShow() {

	},
	async onLoad(e) {
		// this.userinfo = JSON.parse(e.item)
		db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
			this.uid = res.result.data[0]._id
		})
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
	},
	methods: {
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
		height: 375rpx;
		background: url('https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/20705154340.png')  100% no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;

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
