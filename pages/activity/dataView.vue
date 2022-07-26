<template>
	<view>
		<!-- <u-navbar :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff" title="数据查看"></u-navbar> -->

		<view style="width: 700rpx;margin: 0 auto;margin-top: 20rpx;border-radius: 12rpx;background-color: #fff;padding: 20rpx;">
			<view style="display: flex;width: 100%;">
				<image style="width: 280rpx;height: 184rpx;" :src="dataList.imageValue[0].url" mode=""></image>
				<view style="flex: 1;margin-left: 15rpx;display: flex;flex-direction: column;font-size: 24rpx;color: #999;">
					<text class="u-line-2" style="font-size: 28rpx;font-weight: 700;color: black;">{{ dataList.name }}</text>
					<text v-if="dataList.baomingPrice">总销量:{{ dataList.baomingPrice }}元</text>
					<text v-if="dataList.baomingnum">已售订单:{{ dataList.baomingnum }}</text>
				</view>
			</view>
		</view>

		<view style="width: 700rpx;margin: 0 auto;margin-top: 20rpx;border-radius: 12rpx;background-color: #fff;padding: 20rpx;display: flex;flex-wrap: wrap;">
			<view style="display: flex;width: 50%;align-items: center;flex-direction: column;padding: 20rpx 0;">
				<view>已报名次数</view>
				<view>{{dataList.baomingnum || 0}}次</view>
			</view>
			<view style="display: flex;width: 50%;align-items: center;flex-direction: column;padding: 20rpx 0;">
				<view>总分享次数</view>
				<view>{{totalShareCount || 0}}次</view>
			</view>
			<view style="display: flex;width: 50%;align-items: center;flex-direction: column;padding: 20rpx 0;">
				<view>总浏览次数</view>
				<view>{{dataList.browse || 0}}次</view>
			</view>
			<view style="display: flex;width: 50%;align-items: center;flex-direction: column;padding: 20rpx 0;">
				<view>总支付金额</view>
				<view>{{dataList.baomingPrice || 0}}元</view>
			</view>
		</view>

		<view style="width: 700rpx;margin: 0 auto;margin-top: 20rpx;border-radius: 12rpx;background-color: #fff;padding: 20rpx;display: flex;flex-wrap: wrap;">
			<view style="width: 100%;">
				<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
			</view>
			<view style="width: 660rpx;margin: 0 auto;margin-top: 20rpx;border-radius: 22rpx;background-color: #fff;padding: 20rpx;display: flex;flex-direction: column;box-shadow: 1rpx 1rpx 10rpx 1rpx ;"  v-for="(item,index) in users" :key="index">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<u-avatar :src="item.userinfo.headImgUrl"></u-avatar>
						<text>{{item.userinfo.nickName}}</text>
					</view>
					<view style="font-size: 24rpx;color: #999;display: flex;align-items: right;flex-direction: column;" v-if="curNow == 0">
						<text>分享{{item.share || 0}}次</text>
						<!-- <text>浏览{{item.shareCount || 0}}次</text> -->
					</view>
					<view style="font-size: 24rpx;color: #999;display: flex;align-items: right;flex-direction: column;" v-else-if="curNow == 1">
						<!-- <text>分享{{item.share || 0}}次</text> -->
						<text>邀请用户浏览{{item.shareCount || 0}}次</text>
					</view>
					<view style="font-size: 24rpx;color: #999;display: flex;align-items: right;flex-direction: column;" v-else>
						<text>邀请{{item.sharePayCount || 0}}人购买</text>
						<text>共计{{item.shareTotal || 0}}元</text>
					</view>
				</view>
				
			</view>
		</view>
		<view style="width: 750rpx;text-align: center;">仅展示前20名</view>
	</view>
</template>

<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			dataList: [],
			idx: [],
			num: 0,
			users:[],
			dataresult: [],
			option: [{}],
			totalShareCount:0,
			list: [
				{
					name: '分享次数'
				},
				{
					name: '访问次数'
				},
				{
					name: '邀请人数'
				}
			],
			curNow: 0
		};
	},
	onLoad(options) {
		this.id = options.item;
		// let data = getApp().globalData.supplier_enroll_list
		// this.num = data.num1
		// this.dataresult = data.dataList
		// uni.showLoading({
		// 	title:'请稍等...'
		// })
		this.loaddata(options.item);
		this.getshare('share')
	},
	// onReachBottom() {
	// 		// this.pageindex ++
	// 		this.loaddata()
	// },
	methods: {
		sectionChange(index) {
			this.curNow = index;
			if(index == 0){
				this.getshare('share')
			}else if(index == 1){
				this.getshare('shareCount')
			}else if(index == 2){
				this.getshare('sharePayCount')
			}
		},
		// change(e){
		// 	this.dataList = []
		// 	this.pageindex = 1
		// 	console.log(111,this.pageindex);
		// 	this.current = e
		// 	uni.showLoading({
		// 		title:'请稍等...'
		// 	})
		// 	this.loaddata(this.list[e].state)
		// },
		async baomingnum(id) {
			let count = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.count();
			return count.result.total;
		},
		async baomingPriceTotal(id) {
			let res = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.limit(500)
				.get();
			let total = 0;
			for (let i = 0; i < res.result.data.length; i++) {
				total += Number(res.result.data[i].price);
			}
			return total;
		},
		async getshare(e){
			let orderBy = ''
			if(e == 'share'){
				// orderBy = 'share','desc'
				await db.collection('visit').where({aid:this.id})
				.orderBy('share','desc')
				.limit(20)
				.get().then(res=>{
					console.log(res,'8888');
					let result = res.result.data
					this.users = result
					if(this.totalShareCount == 0){
						result.forEach(item=>{
							if(typeof item.share != 'undefined'){
								this.totalShareCount += item.share
							}
						})
					}
					
				})
			}else if(e == 'shareCount'){
				// orderBy = 'shareCount','desc'
				await db.collection('visit').where({aid:this.id})
				.orderBy('shareCount','desc')
				.limit(20)
				.get().then(res=>{
					console.log(res,'8888');
					let result = res.result.data
					this.users = result
					if(this.totalShareCount == 0){
						result.forEach(item=>{
							if(typeof item.share != 'undefined'){
								this.totalShareCount += item.share
							}
						})
					}
				})
			}else if(e == 'sharePayCount'){
				// orderBy = 'sharePayCount','desc'
				await db.collection('visit').where({aid:this.id})
				.orderBy('sharePayCount','desc')
				.limit(20)
				.get().then(res=>{
					console.log(res,'8888');
					let result = res.result.data
					this.users = result
					if(this.totalShareCount == 0){
						result.forEach(item=>{
							if(typeof item.share != 'undefined'){
								this.totalShareCount += item.share
							}
						})
					}
				})
			}
			
				
			
			
		},
		async loaddata(aid) {
			uni.showLoading({
				title: '请稍等...'
			});
			let req = await db
				.collection('activityList')
				.doc(aid)
				.get();
			this.dataList = req.result.data[0];
			console.log(this.dataList, '77');
			
			this.dataList.baomingnum = await this.baomingnum(this.dataList._id);
			this.dataList.baomingPrice = await this.baomingPriceTotal(this.dataList._id);
			this.$set(this.dataList, 0, this.dataList.baomingnum);
			this.$set(this.dataList, 0, this.dataList.baomingPrice);
			uni.hideLoading();
		}
	}
};
</script>
<style>
page {
	background-color: rgba(172, 172, 172, 0.18);
}
</style>
<style lang="scss" scoped>
.ordertitle {
	background-color: #ff0000;
	width: 750rpx;
	height: 100rpx;
	text-align: center;
	font-size: 60rpx;
	font-weight: 900;
	color: white;
	line-height: 100rpx;
}
.ordercontent {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 50rpx;
	.content {
		width: 100%;
		margin: 30rpx auto;

		.item {
			box-shadow: 0 0 8px 0px #b7b7b7;
			border-radius: 20rpx;
			background-color: #fff;
			margin: 20rpx 0;
			.item-text {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				font-weight: 700;
				font-size: 26rpx;
				padding: 20rpx;
				color: #ff0000;
			}
			image {
				width: 100%;
				height: 400rpx;
				border-radius: 20rpx 20rpx 0 0;
			}
			.text-1 {
				font-weight: 700;
				font-size: 26rpx;
				padding: 20rpx;
			}
		}
	}
}
</style>
