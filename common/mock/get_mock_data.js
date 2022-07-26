var Mock = require('@/common/mock/mock.js')
export default {
	getMockData (url) {
		let data;
		switch(url){
			// 活动列表
			case '/distribution-client/activity/list':
				data =  Mock.mock({
					"data": {
						"code": 200,
							"data": {
								"data|3-10": [{
								"id|+1": 1,
								"name|1-8": "活动名称",
								"label|1": ["push","handpick","",""],
								"status|0-1": 1,
								"describe|1-10": "活动简介",
								"price|1": ["9.99","100.00","88.88"],
								"is_free|1": true,
								"apply_amount|2-1000": 1,
								"poster": "https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/xssj/2022_new_year.png"
							}],
						},
						"msg": "操作成功"
					},
					"statusCode": 200,
					"msg": "操作成功"
				})
				break;
		}
		console.log('mock',data)
		return data
	}
}