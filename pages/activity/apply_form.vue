<template>
	<view class="page flex-col">
		<!-- <view style="width: 750rpx;background-color: #000;">
			<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/jintao/11.png" style="width: 100%;" mode="widthFix"></image>
		</view> -->
		<view class="main1 flex-col" style="padding-top: 20rpx;">
			
			<view style="width: 700rpx;background-color: #fff;margin: 0 auto;padding: 20rpx;box-shadow: #888888 0px 0px 5px 0px;border-radius: 20rpx;display: flex;">
				<view>
					<image :src="dataList.imageValue[0].url" style="width: 280rpx;height: 150rpx;" mode="aspectFill"></image>
				</view>
				<view style="margin-left: 15rpx;">
					<view style="font-weight: 900;margin: 15rpx 0;border-bottom: 1px solid #f0f0f0;">{{ dataList.name }}</view>
							
					<view style="margin: 15rpx 0;font-size: 22rpx;">
						<text style="color: #000;font-weight: 900;">活动开始时间：</text>
						<text style="color: #ff0000;font-weight: 700;">{{ dataList.dataTimeStart | date('mm/dd hh:MM') }}</text>
					</view>
					<view style="margin: 15rpx 0;font-size: 22rpx;" v-if="dataList.activity_form == '线下活动'">
							<text style="color: #000;font-weight: 900;">地址：</text>
							<text style="color: #ff0000;font-weight: 700;">{{ dataList.localtion }}</text>					
					</view>
				</view>
				
				
			</view>
			<view style="width: 700rpx;background-color: #fff;margin: 0 auto;padding: 20rpx;box-shadow: #888888 0px 0px 5px 0px;border-radius: 20rpx;margin-top: 20rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;flex-direction: column;">
						<text style="color: #000;font-weight: 900;font-size: 28rpx;">{{title}}</text>
						<text style="color: #ff0000;font-weight: 700;font-size: 22rpx;">{{ticket_describe}}</text>
					</view>
					<view style="color: #ff0000;font-weight: 700;">
						X{{limit_num}}
					</view>
				</view>
				
			</view>
			<!-- <view class="bd17 flex-col u-p-t-20 u-p-b-20" style="box-shadow: #000 0px 0px 12px 1px;">
					<view class="bd4 flex-row u-col-center">
						<text class="info-text u-m-l-10">
						<text style="color: #999999;">{{dataList.dataTimeStart | date('yyyy-mm-dd hh:MM:ss')}}</text>
						至
						<text style="color: #999999;">{{dataList.dataTimeEnd | date('yyyy-mm-dd hh:MM:ss')}}</text>
						</text>
					</view>
					<view class="bd5 flex-row justify-between u-col-center" style="width: 100%;">
						<view class="info-text u-m-l-10 " style="">{{dataList.region}},{{dataList.detailedAddress}}</view>
					</view>
					<view class="bd6 flex-row u-col-center" @click="getLocaltion">
						<view class="info-text2 u-m-l-10" style="border: 2px solid red;padding: 5rpx; 20rpx;color:white;background:red;border-radius:10rpx">去这里</view>
					</view>
				</view> -->
			<view class="bd1 flex-col">
				<view class="outer4 flex-col">
					<view class="group1 flex-col" v-for="(item, index) in form" :key="index">
						<view>
							<view class="bd4"></view>
							<text class="word3" style="font-weight: 900;"><text style="color:red" v-if="item.checked">*</text>{{ item.name }}</text>
							<u-radio-group v-model="item.value" v-if="item.type == '1'">
								<u-radio
									@change="optionsChange"
									v-for="(it, idx) in item.options"
									:key="idx"
									:name="it.option_name"
									:disabled="it.disabled"
									active-color="#ff0000"
									label-size="26"
									size="30"
								>
									{{ it.option_name }}
								</u-radio>
							</u-radio-group>
							<u-input placeholder="请输入" v-else :border="false" v-model="item.value"></u-input>
						</view>
					</view>
				</view>
				<view class="footer-box">
					<view class="u-flex">
						<view style="display: flex;flex-direction: column;flex: 1;">
							<view class="u-flex-1 u-flex u-row-left u-col-center u-p-l-24 total-info">
								<text class="txt5">合计</text>
								<text class="txt6" style="font-size: 30rpx;font-weight: 700;">¥{{ price }}</text>							
							</view>
							<view style="color: #999999;font-size: 22rpx;padding-left: 28rpx;">
								{{dataList.cause}}
							</view>
						</view>
						
						<view class="u-flex-1 u-flex u-col-center u-row-center apply-btn" @click="$u.throttle(submit,2000)" style="background-color: #FF0000;"><text class="info2" >提交报名</text></view>
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
			ticketList:{},
			title:'',
			limit_num:0,
			ticket_describe:'',
			ticket_amount:'',
			size: 256,
			show: false,
			constants: {},
			id: '',
			price: 0,
			max_num:'',
			dataList: [],
			form: [],
			// subMchIdObj:{},
			openid:'',
			username:'匿名',
		};
	},
	onLoad(options) {
		console.log(JSON.parse(options.data),'aaa');
		this.ticket_describe = JSON.parse(options.data).ticket_describe;
		this.ticket_amount = JSON.parse(options.data).ticket_amount;
		this.max_num = JSON.parse(options.data).max_num;
		this.limit_num = JSON.parse(options.data).limit_num;
		this.title = JSON.parse(options.data).title;
		this.price = JSON.parse(options.data).price;
		this.id = JSON.parse(options.data).id;
		this.ticketList = JSON.parse(options.data)
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID;
		let obj = {};
		
		db.collection('activityList')
			.doc(this.id)
			.get()
			.then(res => {
				this.dataList = res.result.data[0];			
				console.log(this.dataList, 'dddd');
				this.form = this.dataList.enrollSet
				db.collection('user').where({openId:this.openid}).get().then(req=>{
					console.log(req,'reqqqy');
					this.username = req.result.data[0].nickName
					let item = req.result.data[0].toenroll_info
					if(req.result.data[0]){
						for (let i=0;i<this.form.length;i++) {
							let s = this.form[i]
							if(s.name == '姓名'){
									s.value = item.name
								}else if(s.name == "联系电话"){
									s.value = item.phone
								}else if(s.name == "公司"){
									s.value = item.company
								}else if(s.name == "职位"){
									s.value = item.position
								}else if(s.name == "微信"){
									s.value = item.weChat
								}else if(s.name == "QQ"){
									s.value = item.QQ
								}else if(s.name == "年龄"){
									s.value = item.age
								}else if(s.name == "行业"){
									s.value = item.industry
								}else if(s.name == "邮箱"){
									s.value = item.email
								}
								this.$set(s,i,s.value)
							}
							
						}					
					
				})
				// uni.request({
				// 	url: 'https://xinshu.distribution.letterbook.cn/distribution-server/web/mchid/info',
				// 	method: 'POST',
				// 	data: res.result.data[0].supplierId,
				
				// 	header: {
				// 		'Content-Type': 'application/json'
				// 	}
				// }).then(res => {
				// 	this.subMchIdObj = res[1].data.data
				// })
				// this.dataList.enrollSet.forEach(item => {
				// 	if (item.checked) {
				// 		this.form = this.form.concat(item);
				// 	}
				// });
			});
	},
	
	methods: {
		optionsChange(e){
			console.log(e,'lll');
		},
		submit() {
			uni.showLoading({
				title:'请稍等...'
			})
			console.log(this.form, 'form');
			let toenroll_info = {}
			if(this.form.length == 0){				
				uni.showToast({
					title: '服务器错误',
					icon: 'none'
				});
				uni.hideLoading()
				return;
			}
			for (let i = 0; i < this.form.length; i++) {
				let item = this.form[i];
				if ((item.name && typeof item.value == 'undefined' && item.checked) || (item.value == '' && item.checked)) {
					uni.showToast({
						title: '请输入' + item.name,
						icon: 'none'
					});
					return;
				}else{
					if(item.name == '姓名'){
						toenroll_info.name = item.value
					}else if(item.name == "联系电话"){
						toenroll_info.phone = item.value
					}else if(item.name == "公司"){
						toenroll_info.company = item.value
					}else if(item.name == "职位"){
						toenroll_info.position = item.value
					}else if(item.name == "微信"){
						toenroll_info.weChat = item.value
					}else if(item.name == "QQ"){
						toenroll_info.QQ = item.value
					}else if(item.name == "年龄"){
						toenroll_info.age = item.value
					}else if(item.name == "行业"){
						toenroll_info.industry = item.value
					}else if(item.name == "邮箱"){
						toenroll_info.email = item.value
					}
				}
			}
			
			db.collection('user').where({openId:this.openid}).update({
				toenroll_info:toenroll_info
			}).then()
			// console.log(this.subMchIdObj,'this.subMchIdObj.subMchid');
			// if(typeof this.subMchIdObj == 'undefined'){
			// 	this.submitForm()
			// }else{
			// 	this.submitForm(this.dataList.subMchid)
			// }
			this.submitForm()
			uni.hideLoading()
		},
		getLocaltion() {
			uni.openLocation({
				latitude: this.dataList.latitude,
				longitude: this.dataList.longitude,
				success: function() {
					console.log('success');
				}
			});
		},
		submitForm() {
			uni.hideLoading()
			let _this = this
			console.log(_this.dataList,'___');
			console.log(getApp().globalData.INVITATION,'___1');
			console.log(getApp().globalData.IMPLEMENTED,'___2');
			let price = Number(_this.price * 100);
			let outTradeNo = Math.floor(Math.random() * 1000000) + '0000' + Date.now() + ['y', 'd', 's', 'x'][Math.floor(Math.random() * 4)];
			
			let bodyName = _this.dataList.name
			let fenzhangPrice = price * 0.00024
			let distributionPrice = (price * ( _this.ticketList.retailStore / 10000)) - fenzhangPrice - (price * 0.00006)
			if(_this.price == '0.00'){
				console.log(getApp().globalData.INVITATION,'getApp().globalData.INVITATION');
				console.log(_this.id,'_this.id');
				if(getApp().globalData.INVITATION){
					uniCloud.callFunction({
						name:'incBrowse',
						data:{
							option:'sharePayCount',
							price:0,
							aid:_this.id,
							openid:getApp().globalData.INVITATION
						}
					}).then()
				}			
				db.collection('enroll_info')
						.add({
							price:_this.price,
							title:_this.title,
							limit_num:_this.limit_num,
							ticket_describe:_this.ticket_describe,
							outTradeNo: outTradeNo,
							payDate: Date.now(),
							info: _this.form,
							openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
							dataList: _this.dataList,
							whetherItIsDistributed:getApp().globalData.IMPLEMENTED,
							distributionAmount:distributionPrice || 0,
							sharedBy:getApp().globalData.INVITATION || '',
							state: '已预约'
						})
						.then(req => {});
						uniCloud.callFunction({
							name:'mobanxiaoxi',
							data:{
								id:_this.id,
								title:_this.dataList.name,
								openid:_this.dataList.openid,
								username:_this.username,
								date: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')	
							},
							success:res=>{
								console.log(res,'res11111');
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/activity/submitSuccess?id='+_this.id
									});
								}, 1500);
							},
							fail: err => {
							 	console.log(err,'res3233333');
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/activity/submitSuccess?id='+_this.id
									});
								}, 1500);
							}
						})
						
						return
			}
			let parmas = {
				body: bodyName,
				openId: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
				orderNo: outTradeNo,
				payMoney: price,
				subAppId: 'wxf1190d0f25fde018',
				subMchId: _this.dataList.subMchId,
				profitSharing: true,
				wxPayNotifyUrl: 'https://xinshu.distribution.letterbook.cn/distribution-server/order/activity/notify'
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
						uni.showLoading({
							title:'支付中...',icon:'none'
						})
						if(_this.dataList.isDistribution && getApp().globalData.INVITATION && getApp().globalData.IMPLEMENTED == 'yes'){							
								uniCloud.callFunction({
									name:'incBrowse',
									data:{
										option:'sharePayCount',
										price:Number(_this.price),
										aid:_this.id,
										openid:getApp().globalData.INVITATION
									}
								}).then()
								uniCloud.callFunction({
									name:'incBrowse',
									data:{
										option:'userincTotal',
										openid:getApp().globalData.INVITATION,
										distributionPrice:distributionPrice,		
										totalPrice:price
									}
								}).then()
								setTimeout(()=>{
									let addPersonReceivers = {
											"openId": getApp().globalData.INVITATION,
											"subMchId": _this.dataList.subMchId
									}
									uni.request({
										url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay/addPersonReceivers',
										method: 'POST',
										data: addPersonReceivers,
										header: {
											'Content-Type': 'application/json'
										}
									}).then(req=>{
										console.log(req,'柳调1');
										if(req[1].data.code == 200){
											let distributionData = {
													"money": distributionPrice,
													"openId": getApp().globalData.INVITATION,
													"orderNumber": outTradeNo,
													"receiverType": "PERSONAL_SUB_OPENID"
											}
											uni.request({
												url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay/profitSharing/platform',
												method: 'POST',
												data: distributionData,
												header: {
													'Content-Type': 'application/json'
												}
											}).then(req2=>{
												console.log(req2,'柳调2');
												if(req2[1].data.code == 200){
													let fenzhangData = {
															"money": fenzhangPrice,
															"orderNumber": outTradeNo,
															"receiverType": "MERCHANT_ID"
													}
													uni.request({
														url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay/profitSharing/platform',
														method: 'POST',
														data: fenzhangData,
														header: {
															'Content-Type': 'application/json'
														}
													}).then(req3=>{
														console.log(req3,'柳调3');
													})
												}
												console.log(req2,'reqqqqq');
											})
										}
									})
								},3200)
							
						}else if(!_this.dataList.isDistribution && getApp().globalData.INVITATION && getApp().globalData.IMPLEMENTED == 'no'){
							uniCloud.callFunction({
								name:'incBrowse',
								data:{
									option:'sharePayCount',
									price:Number(_this.price),
									aid:_this.id,
									openid:getApp().globalData.INVITATION
								}
							}).then()
							setTimeout(()=>{
								let fenzhangData = {
										"money": fenzhangPrice,
										"orderNumber": outTradeNo,
										"receiverType": "MERCHANT_ID"
								}
								uni.request({
									url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay/profitSharing/platform',
									method: 'POST',
									data: fenzhangData,
									header: {
										'Content-Type': 'application/json'
									}
								}).then(req=>{
									console.log(req,'reqqqqq1');
								})
							},3200)
						}else{
							setTimeout(()=>{
								let fenzhangData = {
										"money": fenzhangPrice,
										"orderNumber": outTradeNo,
										"receiverType": "MERCHANT_ID"
								}
								console.log(fenzhangData,'data');
								uni.request({
									url: 'https://xinshu.distribution.letterbook.cn/distribution-server/pay/profitSharing/platform',
									method: 'POST',
									data: fenzhangData,
									header: {
										'Content-Type': 'application/json'
									}
								}).then(req=>{
									console.log(req,'reqqqqq2');
								})
							},3200)
						}											
						db.collection('enroll_info')
							.add({
								price: _this.price,
								title:_this.title,
								limit_num:_this.limit_num,
								ticket_describe:_this.ticket_describe,
								outTradeNo: outTradeNo,
								payDate: Date.now(),
								info: _this.form,
								openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
								dataList: _this.dataList,
								whetherItIsDistributed:getApp().globalData.IMPLEMENTED,
								distributionAmount:distributionPrice || 0,
								sharedBy:getApp().globalData.INVITATION || '',
								state: '已预约'
							})
							.then(req => {});
						if(_this.ticket_amount != '不限'){
							uniCloud.callFunction({
								name:'postStock',							
								data:{
									id:_this.id,
									ticketPrice:_this.price,
									ticketDescribe:_this.ticket_describe,
									max_num:_this.max_num
								},
								success: res => {
									console.log(res,'stockres');
								},
								fail: err => {
									console.log(err,'stockerr');
								}
							})
						}
						uniCloud.callFunction({
							name:'mobanxiaoxi',
							data:{
								option:'commissionReceived',
								title:_this.dataList.name,
								aid:_this.id,
								openid:getApp().globalData.INVITATION,
								username:_this.username,
								distributionAmount:distributionPrice.toFixed(2) + '元'
							},
						}).then()
						uniCloud.callFunction({
							name:'mobanxiaoxi',
							data:{
								option:'enrollSuccess',
								title:_this.dataList.name,
								id:_this.id,
								openid:_this.dataList.openid,
								username:_this.username,
								date: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')	
							},
							success:res=>{
							
								console.log(res,'res11111');
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/activity/submitSuccess?id='+_this.id
									});
								}, 3500);
							},
							fail: err => {
							 	console.log(err,'res3233333');
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/activity/submitSuccess?id='+_this.id
									});
								}, 3500);
							},
							complete:value =>{
								setTimeout(() => {
									uni.showToast({
										title: '支付成功'
									});
								}, 2800);
								
							}
						})
					},
					fail(err) {
						uni.showToast({
							title: '支付失败，请重新下单'
						});
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
