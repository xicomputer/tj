<template>
	<view>
		<view style="width: 750rpx;background: linear-gradient(blue, white) " :style="{height:windowHeight + 'px'}">
			<view style="display: flex;align-items: center;justify-content: space-between;padding:0 40rpx;">
				<view style="color: white;font-size: 40rpx;font-weight: 900;">
					{{result.state}}
				</view>
			<!-- 	<view class="">
					<text style="color: white;font-size: 40rpx;font-weight: 900;" @click="getLocaltion">导航去这里</text>
				</view> -->
			</view>
					
					<u-gap height="20" ></u-gap>
					<view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;background-color: #fff;padding: 20rpx;z-index: 0;" v-if="result.dataList.activity_form == '线下活动'">
						<view class="">
							<text style="font-size: 26rpx;font-weight: 900;">凭(入场凭证码)至本次活动签到处接受工作人 员扫码验票入场</text>
						</view>
						<view style="width:660rpx;height:400rpx;background: #f4f4f4;margin: 10rpx auto;border-radius:30rpx;display:flex;align-items:center;justify-content: space-between;overflow: hidden;">
							<view style="width:80rpx;height:100%;font-size: 50rpx;text-align:center;color:white;font-weight: 900;background: #b6b6b6;">
								入场凭证码
							</view>
							<view style="">
								<canvas id="qrcode" canvas-id="qrcode" style="z-index: 0;"  :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
							</view>
							<view style="width:10%">
								
							</view>
						</view>
						
					</view>
					<view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;background-color: #fff;padding: 20rpx;z-index: 0;" v-else>
						<!-- <view class="">
							<text style="font-size: 26rpx;font-weight: 900;">核销信息</text>
						</view> -->
						<view>
							<view  style="display: flex;justify-content: space-between;margin: 10rpx;flex-direction: column; ">
								<text style="font-weight: 900;color:#ff0000 ;">核销信息:</text>
								<text style="color:#000 ;font-weight: 900;flex:1;text-align:left">{{result.dataList.addresstextarea}}</text>
							</view>
						</view>
						
					</view>
					<u-gap height="20" ></u-gap>
					<!-- <view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;background-color: #fff;padding: 20rpx;z-index: 0;">
						<view class="">
							<text style="font-size: 32rpx;font-weight: 900;">门票说明</text>
						</view>
						<view style="display: flex;flex-direction: column;">
							<text style="font-size: 24rpx;color: #999999;">1元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  限老板创始人 团队长 嘉宾席</text>
							<text style="font-size: 24rpx;color: #999999;margin: 10rpx 0;">500元 &nbsp;&nbsp;豪华晚宴  大咖合影， 大舞台颁奖</text>
							<text style="font-size: 24rpx;color: #999999;">1980元 &nbsp;VIP沙发座 贵宾通道 大咖邻座合影</text>
						</view>						
					</view> -->
					<!-- <u-gap height="20" ></u-gap> -->
					<view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;padding: 20rpx;background-color: white;font-size: 26rpx;">
						<view class="">
							<text style="font-weight: 900;">{{time}}开始</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin: 10rpx; 0">
							<text style="font-weight: 900;color:#ff0000 ;">门票:</text>
							<text style="color:#000 ;font-weight: 900;">{{result.price}}元</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin: 10rpx; 0">
							<text style="font-weight: 900;color:#ff0000 ;">下单时间:</text>
							<text style="color:#000 ;font-weight: 900;">{{result.payDate | date('yyyy-mm-dd hh:MM:ss')}}</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;margin: 10rpx; 0" v-if="result.dataList.activity_form == '线下活动'">
							<text style="font-weight: 900;color:#ff0000 ;">会场地址:</text>
							<text style="color:#000 ;font-weight: 900;flex:1;text-align:right">{{result.dataList.region}},{{result.dataList.detailedAddress}}</text>
						</view>
					<!-- 	<view v-else style="display: flex;justify-content: space-between;margin: 10rpx;flex-direction: column; ">
							<text style="font-weight: 900;color:#ff0000 ;">核销信息:</text>
							<text style="color:#000 ;font-weight: 900;flex:1;text-align:left">{{result.dataList.addresstextarea}}</text>
						</view> -->
						<view style="display: flex;justify-content: space-between;align-items: center;margin: 10rpx; 0" v-if="result.dataList.service_call">
							<text style="font-weight: 900;color:#ff0000 ;">联系方式:</text>
							<text style="color:#000 ;font-weight: 900;flex:1;text-align:right">{{result.dataList.service_call}}</text>
						</view>
						<!-- <view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx; 0">
							
						</view> -->
					</view>
					<u-gap height="20" ></u-gap>
					<view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;background-color: #fff;padding: 20rpx;">
						<view class="">
							<text style="font-size: 26rpx;font-weight: 900;">报名信息</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin: 10rpx; 0" v-for="(item,index) in result.info" :key="index">
							<text style="font-size: 26rpx;font-weight: 900;color:#ff0000 ;">{{item.name}}</text>
							<text style="color:#000 ;font-weight: 900;">{{item.value}}</text>
						</view>
						
					</view>
					<u-gap height="20" ></u-gap>
					<view style="width: 700rpx;border-radius: 20rpx;margin: 0 auto;background-color: #fff;padding: 20rpx;display: flex;align-items: center;justify-content: space-between;">
						<view>
							<view >
								<text style="font-size: 26rpx;font-weight: 900;">联系主办方</text>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;margin: 10rpx; 0">
								<text style="font-size: 22rpx;font-weight: 500;color:#999999 ;">问题咨询/在线帮助</text>
							</view>
						</view>
						<view  @click="openShow">
							<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/phoneddd.png" size='60' ></u-icon>
						</view>
						
					</view>
				<!-- 	<view class="break-time" style="margin-top: 20rpx;">
						<text>圈层社交活动发布，资源共享，更精准更有效！申请入驻</text>
						<view class="x-button" @tap="jumpnewEnroll">立即申请</view>
					</view> -->
					<u-gap height="60" ></u-gap>
			
			<view style="display: flex;align-items:center;justify-content: space-between;width: 700rpx;margin: 0 auto;">
				<u-button type="default" style="width: 45%;" @click='jumpHome()'>回到首页</u-button>
				<u-button type="primary" style="width: 45%;">不可退订</u-button>
			</view>
			<!-- <view class="page-bottom" style="z-index: 999999;display:flex;align-items:center;justify-content:space-between;padding: 0 30rpx; ">
				<view @tap="jumpHome" class="p-b-btn">
					<image src="@/static/home-icon.png"></image>
					<text>首页</text>
				</view>
				<view  class="p-b-btn"  @click="getLocaltion" v-if="result.dataList.activity_form == '线下活动'">	
						<image src="@/static/xz6.png"></image>
						<text>导航</text>					
				</view>
				<view  class="p-b-btn" @click="openShow"> -->
				<!-- <view  class="p-b-btn"> -->
					<!-- <button open-type="contact" style="display: flex;flex-direction: column;align-items:center;margin-left: 12rpx;"> -->
						<!-- <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/%E5%92%A8%E8%AF%A2.png"></image>
						<view style="font-size: 28rpx;">咨询</view> -->
					<!-- </button> -->
											
			<!-- 	</view>
			
			</view> -->
			<u-popup v-model="call_way_show" mode="top"  class="apply-pop-box" round="24">
				<view class="content">
					<view class="main1 flex-col">
						<view class="block2 flex-col">
							<view class="box2 flex-col"></view>
							<view class="u-flex u-row-around u-p-t-40">
								<view @click="callwechar" v-if="result.dataList.originatorWechar">
									<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/415.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
									<view>联系微信号</view>
								</view>
								<view @click="callphone" v-if="result.dataList.originatorPhone">
									<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/416.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
									<view>拨打电话</view>
								</view>
								<view @click="saveImg(result.dataList.qrCodeImgValue[0].url)"  v-if="result.dataList.qrCodeImgValue.length">
									<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/417.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
									<view>微信二维码</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	import uQRCode from '@/uni_modules/u-qrcode';
	export default {
		computed: {},
		data() {
			return {
				id:'',
				result:[],
				time:'',
				size:156,
				call_way_show:false
			};
		},
		onLoad(e) {
			this.id = e.id
			this.gethuodong()
		},
		methods: {
			openShow(){
				if(!this.result.dataList.originatorPhone && !this.result.dataList.originatorWechar && !this.result.dataList.qrCodeImgValue.length){
					uni.showToast({
						title:'发布者未填写联系方式',icon:'none'
					})
					return
				}
				this.call_way_show = true
			},
			callphone() {
				uni.makePhoneCall({
					phoneNumber: this.result.dataList.originatorPhone, //电话号码
					success: function(e) {
						console.log(e);
					}
				});
			},
			callwechar() {
				// 复制到剪贴板
				uni.setClipboardData({
					data: this.result.dataList.originatorWechar
				});
			},
			saveImg(url) {
				console.log('daxuege', url);
				let _this = this;
				uni.downloadFile({
					url,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										icon: 'none'
									});
								},
								fail: function() {
									uni.showToast({
										title: '保存失败，请稍后重试',
										icon: 'none'
									});
								}
							});
						} else {
							uni.showToast({
								title: '下载失败',
								icon: 'none'
							});
						}
					}
				});
			},
			jumpnewEnroll(){
				this.$u.route({url: 'pages/login/Merchant_enroll'})
			},
			jumpHome(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			totaocang(){
				this.$u.route({url: 'pages/activity/up?id='+this.result.outTradeNo})
			},
			addCart(){
				this.$u.route({url: 'pages/activity/set_entry_fee?id='+this.result._id})
				
			},
			getLocaltion(){
				
						uni.openLocation({
							latitude: this.result.dataList.latitude,
							longitude: this.result.dataList.longitude,
							success: function () {
								console.log('success');
							}
						});
				
			},
			gethuodong(){
				db.collection('enroll_info').where({
					openid:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
					'dataList._id':this.id
				}).get().then(res=>{
					this.result = res.result.data[0]
					this.time = this.$u.timeFormat(this.result.dataList.dataTimeStart, 'yyyy-mm-dd hh:MM:ss');
					if(res.result.data[0]){
						const ctx = uni.createCanvasContext('qrcode');
						   const uqrcode = new uQRCode(
						     {
						       text: this.result.outTradeNo,
						       size: this.size
						     },
						     ctx
						   );
						   uqrcode.make();
						   uqrcode.draw();
					}
				})
			},
		}
	};
</script>
<style lang="scss" scoped>
	// page{
	// 	  background: linear(bottom, red , blue); 
	// }
	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
		border-radius: 16upx;
	
		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #333333;
			width: 96upx;
			height: 80upx;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
			margin-left: 20upx;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, 0.5);
			}
			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: 28rpx;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	.break-time {
		height: 84rpx;
		background-color: #FFF9E4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		color: #ff0000;
		padding: 0 20rpx;
	
		text {
			color: #333333;
		}
	
		.x-button {
			width: 134rpx;
			height: 52rpx;
			background: #ff0000;
			// background: #ff0000;
			border-radius: 6rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			line-height: 52rpx;
			text-align: center;
	
		}
	
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
