'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const result = await db.collection('enroll_subscribe').add({
		name:event.name,
		phone:event.phone,
		address:event.address,
		type:event.type,
		create_date:event.create_date
	})
	return result
};
