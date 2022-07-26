<template>
	<view class="mod3">
		<view class="mod4 flex-col" style="margin: 0 auto;">
			<text class="txt1">选择票种</text>
			<view class="outer1 flex-col">
				<view
					class="layer1 flex-col justify-center"
					style="display: flex;justify-content: center;"
					:class="{ selected: cur_selected_type == index }"
					:style="{ background: item.lanhuBg0 }"
					v-for="(item, index) in data.ticketList"
					:key="index"
					@tap="cur_selected_type = index"
				>
					<view class="outer2 flex-row justify-between" style="display: flex;align-items: center;justify-content: space-between;">
						<text class="info1" style="font-weight: 700;">{{ item.ticket_title }}</text>
						<text class="word1" style="color: red;font-weight: 900;">{{ item.ticket_price }}元</text>
					</view>
				</view>
			</view>
			<!-- <text class="info2">选择数量</text> -->
			<!-- <u-number-box v-model="value" @change="valChange" class="u-m-t-20"></u-number-box> -->
			<view class="outer4 flex-col u-p-l-20 " style="position: absolute;bottom: 20rpx;">
				<view style="width: 500rpx;height: 80rpx;line-height: 80rpx;color: white;background-color: #ff0000;margin: 0 auto;text-align: center;" @tap="submit()">
					<text>确定</text>
				</view>
				<!-- <view class="section1 flex-row" style="display: flex;align-items: center;justify-content: space-between;">
					<text class="txt3">合计</text>
					<text class="word2">¥{{result.dataList.ticketList[cur_selected_type].ticket_price}}</text>
					<view class="section2 flex-col justify-center" @tap="next()"><text class="txt4">下一步</text></view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			data:[],
			result: [],
			cur_selected_type: 0,
			ticket_list: [
				{
					lanhuBg0: 'url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngad392e7137401f6d7fc130fd632b6da1bd1f3afd1fea3bca6eed21acf5ab5d8b) 100% no-repeat',
					lanhutext0: '',
					lanhutext1: ''
				}
			]
		};
	},
	onLoad(e) {
		this.getLoadData(e.id);
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		      return {
		      	title: '乡村振兴直播产业联盟峰会',
				imageUrl:this.data.imageValue[0].url,
		      	path: '/pages/tabbar/activity/activity'
		      };
		}
		
	},
	methods: {
		getLoadData(outTradeNo) {
			db.collection('enroll_info')
				.where({
					outTradeNo: outTradeNo
				})
				.get()
				.then(res => {
					this.result = res.result.data[0];
					db.collection('activityList').doc(this.result.dataList._id).get().then(res1=>{
						this.data = res1.result.data[0]
					})
				});
		},
		submit() {
			console.log(this.result, 'item');
			if (this.result.price >= this.data.ticketList[this.cur_selected_type].ticket_price) {
				uni.showToast({
					title: '请选择比当前金额更高价的门票',
					icon: 'none'
				});
				return;
			} else {
				let _this = this;
				let outTradeNo = Math.floor(Math.random() * 1000000) + '0000' + Date.now() + ['y', 'd', 's', 'x'][Math.floor(Math.random() * 4)];
				let price = Number((_this.data.ticketList[_this.cur_selected_type].ticket_price * 100) - (Number(_this.result.price * 100)));
				// let pricejilu = Number(price/100).toFixed(0)
				let parmas = {
					body: '金涛慈善活动',
					openId: _this.result.openid,
					orderNo: outTradeNo,
					payMoney: price,
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
							db.collection('enroll_info')
								.doc(_this.result._id)
								.update({
									outTradeNo: outTradeNo,
									price: _this.data.ticketList[_this.cur_selected_type].ticket_price,
									payDate: Date.now()
								})
								.then(req => {});
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/activity/activity_detail?id='+_this.data._id
								});
							}, 1500);
						},
						fail(err) {
							uni.showToast({
								title: '支付失败，请重新下单'
							});
						}
					});
				});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.mod3 {
	height: 670rpx;
	border-radius: 24rpx 24rpx 0 0;
	// background-color: rgba(245, 245, 245, 1);
	padding-top: 84rpx;
	width: 750rpx;
	.mod4 {
		width: 702rpx;
		height: 528rpx;
		.txt1 {
			width: 96rpx;
			height: 33rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(0, 0, 0, 1);
			font-size: 24rpx;
			font-family: PingFangSC-Medium;
			white-space: nowrap;
			line-height: 33rpx;
			text-align: right;
		}
		.outer1 {
			width: 702rpx;
			height: 201rpx;
			margin-top: 16rpx;
			justify-content: space-between;
			.layer1 {
				display: flex;
				align-items: center;
				height: 92rpx;
				line-height: 92rpx;
				margin-bottom: 17rpx;
				padding-left: 21rpx;
				width: 702rpx;
				border: 2rpx solid #ffe4d8;
				border-radius: 10rpx;
				&.selected {
					border: 2rpx solid #ff0000;
					background-color: #dfdfdf;
					position: relative;
					&::after {
						content: ' ';
						display: block;
						background: url(/static/activity/check_icon.png) no-repeat;
						background-size: contain;
						width: 30rpx;
						height: 100rpx;
						position: absolute;
						right: -1rpx;
						top: 42rpx;
					}
				}
				.outer2 {
					width: 655rpx;
					height: 28rpx;
					.info1 {
						width: 140rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 28rpx;
						white-space: nowrap;
						line-height: 28rpx;
						text-align: right;
					}
					.word1 {
						width: 108rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: #ff0000;
						font-size: 28rpx;
						white-space: nowrap;
						line-height: 28rpx;
						text-align: right;
					}
				}
			}
		}
		.info2 {
			width: 96rpx;
			height: 33rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(0, 0, 0, 1);
			font-size: 24rpx;
			font-family: PingFangSC-Medium;
			white-space: nowrap;
			line-height: 33rpx;
			text-align: right;
			margin-top: 48rpx;
		}
		.outer4 {
			height: 84rpx;
			border-radius: 4px;
			background-color: rgba(255, 255, 255, 1);
			margin-top: 48rpx;
			width: 702rpx;
			.section1 {
				width: 702rpx;
				height: 84rpx;
				.txt3 {
					width: 56rpx;
					height: 28rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(0, 0, 0, 1);
					font-size: 28rpx;
					white-space: nowrap;
					line-height: 28rpx;
					text-align: right;
					margin-top: 28rpx;
				}
				.word2 {
					width: 34rpx;
					height: 28rpx;
					display: block;
					overflow-wrap: break-word;
					color: #ff0000;
					font-size: 28rpx;
					white-space: nowrap;
					line-height: 28rpx;
					text-align: right;
					margin: 28rpx 0 0 20rpx;
				}
				.section2 {
					height: 84rpx;
					border-radius: 4px;
					background-color: #ff0000;
					margin-left: 241rpx;
					padding-left: 134rpx;
					width: 351rpx;
					.txt4 {
						width: 84rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(255, 255, 255, 1);
						font-size: 28rpx;
						font-family: PingFangSC-Medium;
						white-space: nowrap;
						line-height: 28rpx;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>
