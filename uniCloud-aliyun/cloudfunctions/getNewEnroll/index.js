'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const result = await db.collection('newEnroll').add({		
		info:event.info,
		payDate:event.payDate,
		price:event.price,
		outTradeNo:event.outTradeNo,
		openid:event.openid,
		state:event.state
	})

	return result
};
