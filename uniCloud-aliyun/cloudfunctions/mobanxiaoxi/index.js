'use strict';
const openapi = require('mp-cloud-openapi')

exports.main = async (event, context) => {
	const res2 = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf1190d0f25fde018&secret=66b4bd5ae4f273d7484c2770cdd3ec0d", {
		 dataType: "json"
		})
	
	const cloud = await openapi.initWeixin({
		appId: 'wxf1190d0f25fde018',
		secret: '66b4bd5ae4f273d7484c2770cdd3ec0d',
		accessToken: res2.data.access_token
	})
	try {
		if(event.option == 'enrollSuccess'){
			const result = await cloud.subscribeMessage.send({
				"touser": event.openid,
				"page": "pages/release/participant_list?id=" + event.id,
				"lang": "zh_CN",
				"form_id": "3950",
				"data": {
					"thing1": {
						"value": event.title
					},
					"name2": {
						"value": event.username
					},
					"date4": {
						"value": event.date
					}
				},
				"templateId": "S_a8CtEg1cPQ57cUmpBowcPKBVPxevdQ22rClE4WFiM",
			})
			return result
		}else if(event.option == 'commissionReceived'){
			const result = await cloud.subscribeMessage.send({
				"touser": event.openid,
				"page": "pages/activity/money_detail?id=" + event.aid,
				"lang": "zh_CN",
				"form_id": "9743",
				"data": {
					"thing1": {
						"value": event.title
					},
					"thing2": {
						"value": event.username
					},
					"thing3": {
						"value": event.distributionAmount
					}
				},
				"templateId": "WgqUFa8I9neRLbC9r_fFjpYIxRwkZvz1-PKU0ahpnKI",
			})
			return result
		}
	
	} catch (err) {
		return {
			err,
			msg: "出错了"
		}
	}
}
