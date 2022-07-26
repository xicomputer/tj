<template>
	<view class="container">
		<view class="address">
			<!-- <view class="tag-btn u-border-bottom">
				<view @tap="pathTab('s')" :class="{pa1:!pathshow}">商家配送</view>
				<view @tap="pathTab('d')" :class="{pa2:pathshow}">到店消费</view>
			</view> -->
			<view class="address-s" v-if="!default_address" @tap="jump_address">
				<u-icon name="plus-circle-fill" color="#F2BC0B" size="36"></u-icon>
				<text class="sele-font">请选择收货地址</text>
				<u-icon class="last-icon" color="#999999" name="arrow-right" size="32"></u-icon>
			</view>

			<!-- 到店消费注释 -->
			<view class="address-dd" v-if="default_address" @tap="jump_address">
				<view>
					<view class="ta1">
						<view class="a1" v-if="default_address.isDefault">默认</view>
						<text>{{ default_address.province }}{{ default_address.city }}{{ default_address.area }}</text>
					</view>
					<text class="">{{ default_address.address }}</text>
					<text class="">{{ default_address.contacts }} {{ default_address.contactNumber }}</text>
				</view>
				<u-icon class="last-icon c9" name="arrow-right" size="32"></u-icon>
			</view>
			<!-- 	<view class="address-d" v-if="pathshow">
				<view>
					<text class="ta1">自提点</text>
					<text class="c9">切换</text>
					<u-icon class="last-icon c9"  name="arrow-right" size="32"></u-icon>
				</view>
				<text class="u-font-24 c9">湖南省长沙市开福区晴岚路68号凤凰海购物公园F1</text>
			</view> -->
		</view>
		<!-- 配送费方式注释 -->
		<!-- 	<view class="x-peis" @tap="popupShow=true" v-if="pathshow">
			<view class="u-margin-auto thick u-font-30 ddbz">
				<text>配送方式</text>
				<u-tag class="x-btn" mode="dark" bg-color="#ff0000" size="mini" text="支持同城配送" type="success" />
			</view>
			<view>
				<text class="thick u-font-30 ddbz">{{logisticsSelectSave}}</text>
				<u-icon class="last-icon c9"  name="arrow-right" size="32"></u-icon>
			</view>
		</view> -->
		<!-- 	<view class="add-info"  v-if="!pathshow">
			<view class="u-border-bottom">
				<text class="xone">提货人：唐文杰  18888888888</text>
				<text></text>
				<text class="c9">编辑</text>
				<u-icon class="last-icon c9"  name="arrow-right" size="32"></u-icon>
			</view>
			<view>
				<text class="xone">到店时间：</text>
				<text class="c9" @tap="selectDate">请选择到店时间</text>
				<u-icon class="last-icon c9"  name="arrow-right" size="32"></u-icon>
			</view>
		</view> -->

		<view class="ftop">
			<view class="goods u-border-bottom">
				<image :src="pagesData.thumbnail" mode=""></image>
				<view>
					<view class="u-line-1">{{ pagesData.commodityName }}</view>
					<view style="display: flex;align-items: center;">
						<text class="x-button u-line-1" style="display: inline-block;width: 400rpx;color: black;margin-top: 15rpx;">{{ pagesData.skuName }}</text>
						<text class="c9" style="margin-top: 15rpx;">*{{ pagesData.amount }}</text>
					</view>
				</view>
				<text class="orange u-font-34 thick">
					<text class="u-font-24">￥</text>
					{{ pagesData.activityPrice }}
				</text>
			</view>
			<view class="x-two-flex">
				<text class="thick u-font-30">总金额</text>
				<text class="orange u-font-34 thick">
					<text class="u-font-24">￥</text>
					{{ count }}
				</text>
			</view>
			<view class="x-two-flex">
				<text class="thick u-font-30">支付方式</text>
				<text>微信</text>
			</view>
			<view class="x-two-flex" v-if="!pagesData.supportRefund">
				<text class="thick u-font-26" style="color: #f20c00; font-style:italic;">温馨提示：该商品属于食品类：商家不支持退款，支持退换。</text>
			</view>
		</view>

		<view class="x-last-from">
			<text class="thick u-font-30 ddbz">订单备注</text>
			<text class="order-note" @tap="orderInfoJump">{{ textvalue ? textvalue : '请输入' }}</text>
			<u-icon class="last-icon c9" name="arrow-right" size="32"></u-icon>
		</view>
		<view class="x-order">
			<view>
				<text>
					合计：
					<text class="orange thick u-font-38">
						<text class="u-font-24">￥</text>
						{{ count }}
					</text>
				</text>
			</view>
			<text class="order-button" @tap="place_order">立即下单</text>
			<!--      <button   class="order-button" open-type="getPhoneNumber" bindgetphonenumber="place_order">立即下单</button>-->
		</view>
		<!-- 配送方式弹窗 -->
		<!-- 	<u-popup v-model="popupShow" mode="bottom" >
				<view class="select-ps">
					<text class="font-zdy">选择配送方式</text>
					<view >
							<u-radio-group v-model="logisticsSelect" wrap="true"   @change="radioGroupChange">
								<u-radio class="bbb"  v-for="(item, index) in radioList" :key="index" shape="circle"  :name="item.name">{{ item.name }}</u-radio>
							</u-radio-group>
					</view>
					<view class="x-button" @tap="Logistics">确定</view>
				</view>
		</u-popup>
		时间选择弹窗
		<u-picker v-model="showiftime" :params="params" :default-time="dataTime" mode="time"></u-picker>
		 -->
		<pop-phone></pop-phone>
	</view>
</template>

<script>
import utils from '@/common/logic/utils/util.js';
export default {
	data() {
		return {
			showiftime: false,
			params: {
				month: true,
				day: true,
				hour: true,
				minute: true
			},
			pathshow: true,
			x_info: '',
			popupShow: false,
			logisticsSelect: '全国物流',
			logisticsSelectSave: '全国物流',
			radioList: [
				{
					name: '全国物流',
					checked: true,
					disabled: false
				},
				{
					name: '同城配送',
					checked: false,
					disabled: false
				}
			],
			orderInfo: '请输入',
			textvalue: '',
			dataTime: '',
			addressItem: null,
			submitOrder: {},
			default_address: '',
			pagesData: {},
			isOff: true,
			count: ''
		};
	},
	onLoad(option) {
		console.log('手机状态', this.$store.state.isAutoPhone);
		let { textvalue } = option;
		this.textvalue = textvalue;
		if (option.address) {
			let address = option.address;
			this.$u.api.addressDetail(address).then(res => {
				//	默认地址
				if (res) {
					this.default_address = res;
				}
				console.log('asdasdasdasd地址', res);
				// this.submitOrder.addressId=res.addressId
			});
		} else {
			this.$u.api.getDefaultAddress().then(res => {
				//	默认地址
				if (res) {
					this.default_address = res;
				} else {
					this.pageAddressList();
				}
				console.log('默认地址', res);
				// this.submitOrder.addressId=res.addressId
			});
		}
	},
	computed: {
		// skuNameC(){
		// 	return function(item){
		// 		if(item.length >15){
		// 			console.log(444);
		// 			let str = item
		// 		}
		// 	}
		// }
	},
	onShow() {
		this.pagesData = this.$store.state.orderDataInfo;
		console.log('商品数据', this.pagesData);
		let d = this.pagesData.amount * this.pagesData.activityPrice;
		this.count = this.toDecimal2(d);
	},
	onReady() {
		let oData = new Date();

		let dataTime = utils.dateUtil.stringifyDate(oData);

		this.dataTime = dataTime;
	},
	methods: {
		// pathTab(e){   //商家配送 到店消费选显卡
		// 	console.log(e)
		// 	if(e=='s' && this.pathshow == false ){
		// 		this.pathshow  = true;
		// 	}else if(e=='d'&&  this.pathshow == true)
		// 	this.pathshow = false
		// },
		toDecimal2(x) {
			var f = parseFloat(x);
			if (isNaN(f)) {
				return false;
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + 2) {
				s += '0';
			}
			return s;
		},
		pageAddressList() {
			let data = {
				isAsc: '',
				orderBy: '',
				orderByColumn: '',
				pageNum: 0,
				pageSize: 0,
				searchValue: ''
			};
			this.$u.api.addressList(data).then(e => {
				if (e) {
					this.default_address = e.rows[0];
				}
			});
		},
		Logistics() {
			this.popupShow = false;
			this.logisticsSelectSave = this.logisticsSelect;
		},
		radioGroupChange(e) {
			this.logisticsSelect = e;
		},
		orderInfoJump() {
			uni.navigateTo({
				url: '../order_node/order_node'
			});
		},
		selectDate() {
			this.showiftime = true;
		},
		jump_address() {
			let that = this;
			uni.navigateTo({
				url: `/pages/my/address/address`,
				success() {
					that.$store.commit('addressStateFn', 'order');
				}
			});
		},
		place_order() {
			//创建订单 支付
			if (this.default_address.length < 1) {
				this.$tools.toast('请填写地址');
				return false;
			}
			if (this.isOff) {
				this.isOff = false;
				let that = this;
				let { skuId, activityId, amount, promotionId, dealerId, commodityId } = this.pagesData;
				let data = {
					commodityId,
					skuId,
					activityId,
					amount,
					promotionId,
					dealerId,
					addressId: this.default_address.addressId,
					message: this.textvalue
				};

				this.$u.api.createOrder(data).then(e => {
					console.log(e);
					if (e) {
						let orderNumber = e.orderNumber;
						this.$u.api
							.submitOrder(orderNumber)
							.then(res => {
								uni.requestPayment({
									...res,
									package: res.packageValue,
									success: function(res) {
										console.log('success:' + JSON.stringify(res));
										uni.switchTab({
											url: '/pages/tabbar/order_form/order_form',
											success: function(e) {
												let page = getCurrentPages().pop();
												console.log('page', page);
												if (page == undefined || page == null) return;
												page.onLoad();
											}
										});
									},
									fail: function(err) {
										that.isOff = true;
										console.log('fail:' + JSON.stringify(err));
									}
								});
							})
							.catch(e => {
								console.log('zzz11');
								console.log(111, e);
							});
					} else {
						console.log('zzz22');
						this.isOff = true;
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.bbb {
	.u-radio {
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		padding: 0 20rpx;
		margin-top: 70rpx;
	}
}
.orange {
	color: #ff0000;
}
.container {
	padding: 20rpx;
	min-height: 100vh;
	background: #f7f7f7;
}

.address {
	background-color: #ffffff;
	overflow: hidden;
	border-radius: 15rpx;
	margin-bottom: 20rpx;
	.tag-btn {
		height: 76rpx;
		width: 750rpx;
		display: flex;
		.pa1 {
			background: url(../../../static/s2.png) no-repeat;
			background-size: 100% 100%;
		}
		.pa2 {
			background: url(../../../static/s1.png) no-repeat;
			background-size: 100% 100%;
		}
		view {
			flex: 1;
			text-align: center;
			line-height: 76rpx;
		}
	}
	.address-s {
		display: flex;
		align-items: center;
		min-height: 104rpx;
		padding: 0 20rpx;
		.sele-font {
			color: #f2bc0b;
			margin-left: 10rpx;
			font-size: 28rpx;
		}
		.last-icon {
			margin-left: auto;
		}
	}
	.address-d {
		min-height: 104rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		padding: 0 20rpx;
		> view {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.ta1 {
				margin-right: auto;
			}
			.last-icon {
				margin-left: 10rpx;
			}
		}
		> text {
		}
	}
	.address-dd {
		min-height: 104rpx;
		display: flex;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		width: 100%;
		> view {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 28rpx;
			color: #000000;
			text {
				line-height: 60rpx;
			}
			.ta1 {
				display: flex;
				align-items: center;
				view {
					width: 80rpx;
					height: 42rpx;
					background: linear-gradient(180deg, #f64756 0%, #fc5800 100%);
					border-radius: 8rpx;
					text-align: center;
					line-height: 42rpx;
					color: #ffffff;
					margin-right: 10rpx;
					font-size: 26rpx;
				}
			}
		}
		.last-icon {
		}
	}
}
.add-info {
	background: #ffffff;
	padding: 0 20rpx;
	margin: 20rpx 0;
	border-radius: 15rpx;
	view {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.xone {
			margin-right: auto;
		}
		.last-icon {
			margin-left: 10rpx;
		}
	}
}
.ftop {
	border-radius: 15rpx;
	background-color: #ffffff;
	padding: 0 20rpx;
	.goods {
		height: 170rpx;
		display: flex;
		align-items: center;
		image {
			height: 120rpx;
			width: 120rpx;
		}
		> view {
			height: 120rpx;
			width: 390rpx;
			margin-left: 20rpx;
			.x-button {
				padding: 4rpx 10rpx;
				background: #cccccc;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 24rpx;
				line-height: 52rpx;
				text-align: center;
				margin-left: auto;
				margin-right: 20rpx;
				color: #999999;
			}
		}
		> text {
			margin-left: auto;
			align-self: flex-end;
			margin-bottom: 32rpx;
			font-weight: bold;
		}
	}
	.x-two-flex {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
	}
}
.x-last-from {
	border-radius: 15rpx;
	margin-top: 20rpx;
	padding: 0 20rpx;
	background-color: #ffffff;
	display: flex;
	justify-content: flex-end;
	height: 80rpx;
	align-items: center;
	.ddbz {
		margin-right: auto;
	}
	.order-note {
		color: #999999;
		margin-right: 10rpx;
		font-size: 24rpx;
	}
	input {
		text-align: right;
		margin-right: 10rpx;
	}
}
.x-peis {
	border-radius: 15rpx;
	margin-top: 20rpx;
	padding: 0 20rpx;
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	height: 80rpx;
	align-items: center;
	margin-bottom: 20rpx;

	.u-margin-auto {
		display: flex;
		align-items: center;
	}
	.last-icon {
		margin-left: 10rpx;
	}
	.x-btn {
		margin-left: 10rpx;
		display: flex;
		align-items: center;
	}
}
.x-order {
	background: #ffffff;
	padding: 0 20rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 750rpx;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: #ffffff;
	z-index: 10;
	> view {
		text {
			text-align: center;
		}
	}
	.order-button {
		display: block;
		width: 204rpx;
		height: 72rpx;
		background: #ff0000;
		border-radius: 50rpx;
		color: #ffffff;
		font-size: 34rpx;
		line-height: 72rpx;
		text-align: center;
		margin-left: 60rpx;
	}
}
.select-ps {
	height: 516rpx;
	width: 750rpx;
	.font-zdy {
		font-size: 30rpx;
		color: #000000;
		text-align: center;
		display: block;
		margin-top: 28rpx;
		font-weight: bold;
	}
	.x-button {
		width: 492rpx;
		height: 72rpx;
		background: linear-gradient(270deg, #f64756 0%, #fc5800 100%);
		box-shadow: 0rpx 6rpx 12rpx rgba(235, 35, 15, 0.1);
		border-radius: 44rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 72rpx;
		font-size: 30rpx;
		color: #ffffff;
		margin-top: 110rpx;
	}
}
</style>
