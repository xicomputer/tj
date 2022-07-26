<template>
	<view class="page flex-col">
		<view style="width: 750rpx;background-color: #000;">
			<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-49d9cccb-db68-4f83-8078-1e3389ef0315/fa16ef5a-0c7e-4b2d-8dea-204ab8dc48c4.jpg" style="width: 100%;" mode="widthFix"></image>
		</view>
		<view class="main1 flex-col" style="padding-top: 20rpx;">
			<view style="width: 700rpx;background-color: #fff;margin: 0 auto;padding: 20rpx;box-shadow: #888888 0px 0px 5px 0px;border-radius: 20rpx;">
				<!-- <view style="font-size: 38rpx;font-weight: 900;margin: 15rpx 0;border-bottom: 1px solid #f0f0f0;">{{ dataList.name }}</view> -->
				<view style="margin: 15rpx 0">
					<!-- <text style="color: #000;font-weight: 900;font-size: 28rpx;">活动开始时间：</text> -->
					<text style="color: #888888;font-size: 24rpx;">{{ dataList.subname1 }}</text>
				</view>
				<view style="margin: 15rpx 0">
					<!-- <text style="color: #000;font-weight: 900;font-size: 28rpx;">活动开始时间：</text> -->
					<text style="color: #888888;font-size: 24rpx;">{{ dataList.subname2 }}</text>
				</view>
				<view style="margin: 15rpx 0">
					<!-- <text style="color: #000;font-weight: 900;font-size: 28rpx;">活动开始时间：</text> -->
					<text style="color: #888888;font-size: 24rpx;">{{ dataList.subname3 }}</text>
				</view>
				<view style="margin: 15rpx 0">
					<text style="color: #000;font-weight: 900;font-size: 28rpx;">活动开始时间：</text>
					<text style="color: #999999;">2022-07-27 13:00</text>
				</view>
				<view style="margin: 15rpx 0">
					<text style="color: #000;font-weight: 900;font-size: 28rpx;">活动结束时间：</text>
					<text style="color: #999999;">2022-07-27 21:00</text>
				</view>
				<view style="margin: 15rpx 0;display: flex;align-items: center;justify-content: space-between;">
					<view class="">
						<text style="color: #000;font-weight: 900;font-size: 28rpx;">会场地址：</text>
						<text style="color: #999999;">杭州希尔顿下沙店</text>
					</view>
					<!-- <view style="color: #FF0000;font-weight: 900;" @click="getLocaltion()">导航去会场</view> -->
				</view>
				
			</view>
			
			
			<view  class="bd1 flex-col"  style="padding-bottom: 130rpx;">
				<view v-if="isyuyue" style="width: 700rpx;background-color: #fff;margin: 0 auto;padding: 20rpx;box-shadow: #888888 0px 0px 5px 0px;border-radius: 20rpx;margin-top: 20rpx;">
					
					<view style="display: flex;flex-direction: column;">
						<text style="font-size: 24rpx;color: #999999;margin-top: 10rpx;">姓名：{{attrs.info[0].value}}</text>
						<text style="font-size: 24rpx;color: #999999;margin-top: 10rpx;">联系方式：{{attrs.info[1].value}}</text>
						<text style="font-size: 24rpx;color: #999999;margin-top: 10rpx;">公司：{{attrs.info[2].value}}</text>
						<text style="font-size: 24rpx;color: #999999;margin-top: 10rpx;">职位：{{attrs.info[3].value}}</text>
					</view>
				</view>
				<view v-else class="outer4 flex-col">
					<view class="group1 flex-col" v-for="(item, index) in form" :key="index">
						<view>
							<view class="bd4"></view>
							<text class="word3" style="font-weight: 900;">{{ item.name }}</text>
							<u-input placeholder="请输入" :border="false" v-model="item.value"></u-input>
						</view>
					</view>
				</view>
				<view class="footer-box">
					<view class="u-flex">
						<view class="u-flex-1 u-flex u-row-left u-col-center u-p-l-24 total-info">
							<text class="txt5">费用</text>
							<text class="txt6" style="font-size: 30rpx;font-weight: 700;">¥10000</text>
						</view>
						<view class="u-flex-1 u-flex u-col-center u-row-center apply-btn" v-if="!isyuyue"  @click="submit()" style="background:#FF0000"><text class="info2">立即报名</text></view>
						<view class="u-flex-1 u-flex u-col-center u-row-center apply-btn"  v-else  style="background:#999999"><text class="info2">活暂未开始</text></view>
					</view>
				</view>
			</view>
			<u-popup v-model="show" mode="center" border-radius="30" style="width: 700rpx;margin: 0 auto;border-radius: 30rpx;position: relative;">
				<view style="width: 700rpx;height:500rpx;background-color: #fff;border-radius: 30rpx;">
					<view style="width: 700rpx;height: 80rpx;line-height: 80rpx;background-color: #ff0000;padding-left: 30rpx;">
						<text style="font-size: 32rpx;color: #fff;font-weight: 900;">参会人信息填写</text>
					</view>
					<view style="width: 700rpx;padding:10rpx 30rpx;" v-for="(item, index) in form" :key="index">
						<view style="display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid #f1f1f1;">
							<text style="color: #ff0000;font-weight: 900;">{{ item.name }}:</text>
							<text>{{ item.value }}</text>
						</view>
					</view>
					<view style="width: 700rpx;padding:10rpx 30rpx;display: flex;align-items: center;justify-content: space-between;">
						<text style="color: #ff0000;font-weight: 900;">门票选择：</text>
						<text style="color: red;">{{ price }}元</text>
					</view>
					<view style="position: absolute;bottom: 0px;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="width: 350rpx;height: 60rpx;line-height: 60rpx;text-align: center;border: 1rpx solid #e2e2e2;" @click="show = false">取消</view>
							<view style="width: 350rpx;height: 60rpx;line-height: 60rpx;text-align: center;background-color: #ff0000;color: white;" @click="submitForm">确定</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			attrs:[],
			isyuyue:false,
			size: 256,
			show: false,
			constants: {},
			id: '',
			price: 0,
			dataList: [],
			form: [
				{
					name:'姓名',
					value:''
				},{
					name:'联系方式',
					value:''
				},{
					name:'公司',
					value:''
				},{
					name:'职位',
					value:''
				},
			]
		};
	},
	onLoad(options) {
		console.log(JSON.parse(options.data),'dddd');
		// this.price = JSON.parse(options.data).price;
		this.id = JSON.parse(options.data).id;
		uniCloud.callFunction({
			name:'getNewEnroll_list',
			data:{
				openid:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
			}
		}).then(res=>{
			console.log(res,'popopopo');
			if(res.result.data[0]){
				this.attrs = res.result.data[0]
				this.isyuyue = true
			}
		})
		// db.collection('newEnroll').where({openid:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
		// 	console.log(res,'popopopo');
		// })
		// let obj = {};
		// db.collection('activityList')
		// 	.doc(this.id)
		// 	.get()
		// 	.then(res => {
		// 		this.dataList = res.result.data[0];
		// 		console.log(this.dataList, 'dddd');
		// 		this.dataList.activity_set_list.forEach(item => {
		// 			if (item.checked) {
		// 				this.form = this.form.concat(item);
		// 			}
		// 		});
		// 	});
	},
	
	methods: {
		
		submit() {
			// console.log(this.form, 'form');
			if(this.form.length == 0){
				uni.showToast({
					title: '服务器错误',
					icon: 'none'
				});
				return;
			}
			for (let i = 0; i < this.form.length; i++) {
				let item = this.form[i];
				if ((item.name && typeof item.value == 'undefined') || item.value == '') {
					uni.showToast({
						title: '请输入' + item.name,
						icon: 'none'
					});
					return;
				}
			}
			this.submitForm()
			// this.show = true;
		},
		// , m() {
		// 	uni.openLocation({
		// 		latitude: this.dataList.latitude,
		// 		longitude: this.dataList.longitude,
		// 		success: function() {
		// 			console.log('success');
		// 		}
		// 	});
		// },
		submitForm() {
			uni.showLoading({
				title:'加载中...'
			})
			let _this = this
			
			let outTradeNo = Math.floor(Math.random() * 1000000) + '0000' + Date.now() + ['y', 'd', 's', 'x'][Math.floor(Math.random() * 4)];
			let parmas = {
				body: '金涛慈善活动',
				openId: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
				orderNo: outTradeNo,
				payMoney: 1000000,
				subAppId: 'wxf1190d0f25fde018',
				subMchId: '1627539469',
				profitSharing: false,
				wxPayNotifyUrl: 'https://xinshu.distribution.letterbook.cn'
			};
			uni.request({
				url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay',
				method: 'POST',
				data: parmas,
				header: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				uni.hideLoading()
				console.log(res, 'ddddd');
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res[1].data.data.timeStamp,
					nonceStr: res[1].data.data.nonceStr,
					package: res[1].data.data.packageValue,
					signType: res[1].data.data.signType,
					paySign: res[1].data.data.paySign,
					// ...res.result.orderInfo,
					// orderInfo: res.result.orderInfo,
					success(res) {
						uni.showToast({
							title: '支付成功'
						});
						uni.hideLoading()
						uniCloud.callFunction({
							name:'getNewEnroll',
							data:{
								price: '10000',
								outTradeNo: outTradeNo,
								payDate: Date.now(),
								info: _this.form,
								openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
								state: '已预约'
							}
						}).then(res=>{})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/activity/activity_detail?id='+_this.id
							});
						}, 1500);
						// db.collection('enroll_info')
						// 	.add({
						// 		price: _this.price,
						// 		outTradeNo: outTradeNo,
						// 		payDate: Date.now(),
						// 		info: _this.form,
						// 		openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
						// 		dataList: _this.dataList,
						// 		state: '已预约'
						// 	})
						// 	.then(req => {});
						// 	setTimeout(() => {
						// 		uni.reLaunch({
						// 			url: '/pages/activity/activity_detail?id='+_this.id
						// 		});
						// 	}, 1500);
					},
					fail(err) {
						uni.showToast({
							title: '支付失败，请重新下单'
						});
						uni.hideLoading()
					}
				});
			});
			// db.collection('enroll_info')
			// 	.add({
			// 		price: this.price,
			// 		outTradeNo: outTradeNo,
			// 		payDate: Date.now(),
			// 		info: this.form,
			// 		openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
			// 		dataList: this.dataList,
			// 		state: '未支付'
			// 	})
			// 	.then(res => {});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.footer-box {
	position: fixed;
	bottom: 0;
	height: 90rpx;
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
.bd4 {
	width: 100%;
	margin-top: 20rpx;
	border-bottom: 1rpx solid #e9e9e9;
}
/**************** 调整样式 end *******************/
.page {
	position: relative;
	width: 750rpx;
	min-height: 100vh;
	background-color: rgba(247, 247, 247, 1);
	overflow: hidden;
	.main1 {
		z-index: 2;
		background-color: rgba(245, 245, 245, 1);
		width: 750rpx;
		position: relative;
		.bd1 {
			width: 750rpx;
			.outer4 {
				border-radius: 20px;
				background-color: rgba(255, 255, 255, 1);
				width: 702rpx;
				margin: 30rpx 0 0 24rpx;
				padding: 35rpx 42rpx 35rpx 42rpx;
				.group1 {
					.word3 {
						width: 52rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
					}
					.txt3 {
						width: 130rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(128, 128, 128, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 21rpx;
					}
					.word4 {
						width: 52rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 45rpx;
					}
					.word5 {
						width: 156rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(128, 128, 128, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 20rpx;
					}
					.word6 {
						width: 52rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 45rpx;
					}
					.word7 {
						width: 130rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(128, 128, 128, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 21rpx;
					}
					.info1 {
						width: 52rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 45rpx;
					}
					.txt4 {
						width: 130rpx;
						height: 37rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(128, 128, 128, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 37rpx;
						text-align: left;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
}
.title-tag {
	height: 29rpx;
	border-radius: 3px;
	width: 55rpx;
	padding: 2rpx 7rpx 2rpx 7rpx;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 20rpx;
	white-space: nowrap;
	&.self-red {
		background-color: rgba(235, 40, 18, 1);
	}
	&.self-orange {
		background-color: rgba(253, 111, 45, 1);
	}
}
</style>
