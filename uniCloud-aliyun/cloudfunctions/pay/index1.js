'use strict';
const createConfig = require('uni-config-center')
const uniPay = require('uni-pay')
const uniID = require('uni-id')

const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
  const uniPayConfig = createConfig({
    pluginId: 'uni-pay'
  })
  const {
  	wxConfigMp,
  	wxConfigApp,
  	wxConfigH5,
  	aliConfigMp,
  	aliConfigApp,
  	aliConfigH5,
  	// aliConfigSandbox
  } = uniPayConfig.requireFile('config.js')
	let {
		provider,
		// uniIdToken,
		outTradeNo,
		userId,
		price
		// list
	} = event
	// context.CLIENTUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
	// context.PLATFORM = 'h5'
	// provider = 'alipay'
	// uniIdToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjA2OTk0N2UwM2VhYzAwMDEzYjg3ODEiLCJjbGllbnRJZCI6IjE5NWY3N2MxODBjMjNlM2Y1YThhOGYzOGU0MjkwMTg2IiwiaWF0IjoxNTk2MjY3NDkzLCJleHAiOjE1OTYyNzQ2OTN9.dIGtnn3sY3KDI4L5pFXOIBjEaaFEcYUz6EBgPEfEooE'
	
	// const payload = await uniID.checkToken(uniIdToken)
	// if (payload.code > 0) {
	// 	return {
	// 		code: 1001,
	// 		msg: '用户身份验证失败，请重新登录',
	// 		resData:event
	// 	}
	// }
	// const uid = payload.uid
	
	// 通过订单号和openid获取订单
	// if(outTradeNo[outTradeNo.length-1] !== 'M'){
	// 	const orderList = await db.collection('enroll_info').where({
	// 		outTradeNo,
	// 		userID:userId
	// 	}).get()
		
	// 	if (orderList.data.length !== 1 || orderList.data[0].status !== '未支付') {
	// 		return {
	// 			code: -2,
	// 			msg: '订单状态不正确'
	// 		}
	// 	}
	// }
	
	// 通过订单号和openid更新订单
	// await db.collection('order').where({
	// 	outTradeNo,
	// 	userId
	// }).update({
	// 	payment_channel: provider
	// })
	
	//是否有上级分销人
	// const HigherID = await db.collection('distributor').where({
	// 	userID: userId,
	// 	distributorHigherID:dbCmd.exists(true)
	// }).get()
	
	// if(HigherID.data.length === 1 && HigherID.data[0].distributorHigherID){
	// 	await db.collection('order').where({
	// 		outTradeNo,
	// 		userID:userId
	// 	}).update({
	// 		distributorHigherID:HigherID.data[0].distributorHigherID,
	// 		distributorState:100
	// 	})
	// }
	

	let uniPayInstance,
		// notifyUrl = `https://54b45fb0-a9e7-45d2-8e2b-193a33eea485.bspapp.com/http/payment-notify/${provider}_${context.PLATFORM}`,
		notifyUrl = `https://70042940-5c43-47c0-8f8c-56dce7f5c0a7.bspapp.com/http/payment-notify/${provider}_${context.PLATFORM}`,
		openid,
		tradeType ;
	// notifyUrl为接收通知的云函数的url，务必替换为自己的通知地址，云函数Url化请参考：https://uniapp.dcloud.io/uniCloud/http
	switch (provider + '_' + context.PLATFORM) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			// openid = userInfo.wx_openid['mp-weixin']
			openid = userId
			tradeType = 'JSAPI'
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			// openid = userInfo.ali_openid
			openid = userId
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			tradeType = 'APP'
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			break;
		case 'wxpay_h5':
			uniPayInstance = uniPay.initWeixin(wxConfigH5)
			tradeType = 'NATIVE'
			break;
		case 'alipay_h5':
			uniPayInstance = uniPay.initAlipay(aliConfigH5)
			// uniPayInstance = uniPay.initAlipay(aliConfigSandbox)
			tradeType = 'NATIVE'
			break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
	}

	//*******关键步骤******* 判断是否是礼卷购买
	let totalFee = price
	
	if(!price){
		return {
			code: 404,
			msg: '交易金额类型错误：'+price
		}
	}
	
	// totalFee = Number(totalFee.toFixed(0))
	// totalFee = Number(2000)
	// outTradeNo = 'd456464164161601'
	let orderInfo

	// 请填写对应平台接收通知云函数对应的云函数url化地址，云函数url化请参考：https://uniapp.dcloud.io/uniCloud/http
	try {
		
		
	
		
		// 获取支付信息
		orderInfo = await uniPayInstance.getOrderInfo({
			openid, // App端支付时不需要openid，传入个undefined也没有影响
			outTradeNo,
			totalFee,
			subject: "金涛慈善活动",
			body: "金涛慈善活动",
			notifyUrl,
			tradeType,
  //     // attach: "%7B%22type%22%3A%22goods%22%7D"
		// })
	} catch (e) {
		// console.log(e,'ddddd)
		return {
			totalFee,
			code: -3,
			err:orderInfo || '404--' + outTradeNo,
			msg: '获取支付信息失败，请稍后再试'
		}
	}
	return {
		outTradeNo,
		// uniPayInstance,
		orderInfo,
		hjMoney:totalFee
	}
};
