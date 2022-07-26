'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	let res = await db.collection('user').where({openId:event.openId}).get()
	if(res.data.length == 0){
		let res1 = await db.collection('user').add({
			...event,			
		})
	}else{
		let res2 = await db.collection('user').where({openId:event.openId}).update({
			...event,			
		})
	}
	return event
};
