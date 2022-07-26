'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	if(event.option == 'activity'){
		// 订单总浏览数
		let res = await db.collection('activityList').doc(event.id).update({browse:dbCmd.inc( + 1)})
	}else if(event.option == 'visit'){
		//本人浏览订单的次数
		let res = await db.collection('visit').where({
			openid:event.openid,
			aid:event.aid
		}).update({browse:dbCmd.inc( + 1),createDate:event.createDate})
	}else if(event.option == 'visitShare'){
		//本人分享出去的次数
		let res = await db.collection('visit').where({
			openid:event.openid,
			aid:event.aid
		}).update({share:dbCmd.inc( + 1),shareDate:event.shareDate})
	}else if(event.option == 'shareCount'){
		//本人邀请别人的浏览次数
		let res = await db.collection('visit').where({
			openid:event.openid,
			aid:event.aid
		}).update({shareCount:dbCmd.inc( + 1)})
	}else if(event.option == 'sharePayCount'){
		//本人邀请别人的购买次数
		let res = await db.collection('visit').where({
			openid:event.openid,
			aid:event.aid
		}).update({sharePayCount:dbCmd.inc( + 1),shareTotal:dbCmd.inc( + event.price)})
	}else if(event.option == 'activityShare'){
		//本人邀请别人的购买次数
		let res = await db.collection('activityList').doc(event.aid).update({shareCount:dbCmd.inc( + 1)})
	}else if(event.option == 'userincTotal'){
		//被分销后用户信息更新
		let res = await db.collection('user')
		.where({openId:event.openid})		
		.update({orderCount:dbCmd.inc( + 1),distributionPrice:dbCmd.inc( + event.distributionPrice ),totalPrice:dbCmd.inc(+event.totalPrice)})
	}
	return {
		code:200
		
	}
};
