'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	// limit_num 减去库存数量
	// id 主键
	
		
	// const res = await db.collection('activityList')
	// .doc(event.id)	
	// .field({'ticketList':true})
	// .get()
	// let total = 0
	// for (var i = 0; i < res.data[0].ticketList.length; i++) {
	// 	let item = res.data[0].ticketList[i]
	// 	if(item.price == event.ticketPrice && item.ticket_describe == event.ticketPrice){
	// 		total = Number(item.ticket_amount) - 1
			
	// 	}
	// }
		const result = await db.collection('activityList').where({
			_id:event.id,
			'ticketList.max_num':event.max_num
		}).update({
			'ticketList.$.ticket_amount':dbCmd.inc( - 1 )
		})

	return result
};
