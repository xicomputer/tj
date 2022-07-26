'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const result = await db.collection('newEnroll').where({
		openid:event.openid,
	}).get()

	return result
};