<template>
	<view>
		<!-- <u-navbar :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff" title="订单管理"></u-navbar> -->
		<view class="ordertitle">
			<view style="width: 600rpx;margin: 0 auto;">
				<u-search placeholder="请输入活动标题进行搜索" bg-color="#fff" v-model="keyword" :show-action="false" shape="square"></u-search>
			</view>
		</view>
		<view  v-if="!dataList.length" style="margin-top: 50rpx;">
			<u-empty text="暂无数据" mode="list" ></u-empty>
		</view>
		<view class="ordercontent">
			<view class="content">
				<view class="item" v-for="(item,index) in dataList" :key="index" @tap="$u.route({url: 'pages/release/participant_list?id='+item._id})">
					<image :src="item.imageValue[0].url" mode=""></image>
					<text class="text-1">{{item.name}}</text>
					<view class="item-text">
						<text v-if="item.baomingPrice">总销量:{{item.baomingPrice}}元</text>
						<text v-if="item.baomingnum">已售订单:{{item.baomingnum}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			// supplierId:'',
			openid:'',
			dataList:[],
			idx:[],
			num:0,
			dataresult:[]
		};
	},
	onLoad() {
		
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID;
		// let data = getApp().globalData.supplier_enroll_list
		// this.num = data.num1
		// this.dataresult = data.dataList
		uni.showLoading({
			title:'请稍等...'
		})
		this.loaddata();
	},
	// onReachBottom() {
	// 		// this.pageindex ++ 
	// 		this.loaddata()
	// },
	methods: {
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
			let res = await db.collection('enroll_info').where({ 'dataList._id': id }).limit(500).get();
			let total = 0
			for (let i=0;i<res.result.data.length;i++) {
				total += Number(res.result.data[i].price)
			}
			return total;
		},
		async loaddata(subprice) {		
			uni.showLoading({
				title:'请稍等...'
			})
		let req =	await db.collection('activityList').where({openid:this.openid}).get()
				this.dataList = req.result.data
				for (let i = 0; i < this.dataList.length; i++) {
					this.dataList[i].baomingnum = await this.baomingnum(this.dataList[i]._id);
					this.dataList[i].baomingPrice = await this.baomingPriceTotal(this.dataList[i]._id);
					this.$set(this.dataList[i], i, this.dataList[i].baomingnum);
					this.$set(this.dataList[i], i, this.dataList[i].baomingPrice);
				}
				uni.hideLoading()
			
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
