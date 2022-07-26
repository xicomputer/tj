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
	} = event

	let uniPayInstance,
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
		orderInfo = await uniPayInstance.getOrderInfo({
		   openid, // App端支付时不需要openid，传入个undefined也没有影响
		   outTradeNo,
		   totalFee,
		   subject: "金涛慈善活动",
		   body: "金涛慈善活动2",
		   notifyUrl
		   // tradeType:'JSAPI'
		  })
	} catch (e) {
		// console.log(e,'ddddd)
		return {
			totalFee,
			code: -3,
			err:'404--dd' + outTradeNo,
			msg: '获取支付信息失败，请稍后再试'
		}
	}
	return {
		outTradeNo,
		orderInfo,
		hjMoney:totalFee
	}
};
