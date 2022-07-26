<template>
	<view>
	<!-- 	<u-navbar :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff" title="数据查看"></u-navbar> -->
		<!-- <view class="shujutitle">
			<view style="width: 600rpx;margin: 0 auto;">
				<u-search @clear="clearsearch" @change="search" placeholder="请输入姓名进行搜索" bg-color="#fff" v-model="keyword" :show-action="false" shape="square"></u-search>
			</view>
		</view> -->
		<view class="" style="width: 100%;">
			<u-sticky>
				<u-tabs count="cate_count" :list="list" :is-scroll="false" :current="current" @change="change" active-color="#ff0011"></u-tabs>
			</u-sticky>
		</view>
		<view
			style="width: 710rpx;margin: 20rpx auto;background-color: #fff;border-radius: 20rpx;box-shadow: 0 0 10px 0 #b4b4b4;padding: 20rpx;"
			v-for="(item, index) in dataList"
			:key="index"
		>
			<view style="display: flex;flex-direction: column;justify-content: space-between;">
				<view style="color: #999999;font-size: 26rpx;">订单号:{{ item.outTradeNo }}</view>
				<view style="display: flex;justify-content: space-between;margin: 20rpx 0;">
					<image style="width: 260rpx;height: 150rpx;" :src="item.dataList.imageValue[0].url" mode=""></image>
					<view style="display: flex;flex-direction: column;justify-content: space-between;height: 150rpx;flex: 1;margin-left: 15rpx;">
						<view style="color: #000;font-size: 26rpx;font-weight: 700;">{{ item.dataList.name }}</view>
						<view style="display: flex;align-items: center;justify-content: space-between;color: #ff0000;font-size: 24rpx;font-weight: 700;">
							<text>门票信息:{{ info(item) }}</text>
							<text>支付金额:{{ item.price }}元</text>
						</view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: space-between">
					<view v-for="(it, idx) in item.info" :key="idx">
						<view style="font-size: 24rpx;font-weight: 700;display: flex;">
							<view style="color: #999999;">{{ itoo(idx) }}:</view>
							<text>{{ it.value }}</text>
						</view>
					</view>
					<view style="font-size: 24rpx;font-weight: 700;display: flex;">
						<view style="color: #999999;">报名时间:</view>
						<text>{{ item.payDate | date('yyyy-mm-dd hh:MM:ss') }}</text>
					</view>
					<view style="font-size: 24rpx;font-weight: 700;display: flex;">
						<view style="color: #999999;">状态:</view>
						<text>{{ item.state }}</text>
					</view>
					<view style="font-size: 24rpx;font-weight: 700;display: flex;">
						<view style="color: #999999;">活动类型:</view>
						<text>会议活动</text>
					</view>
				</view>
			</view>
		</view>
		<u-empty text="数据为空" mode="list" v-if="dataList.length == 0" margin-top="200"></u-empty>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			id:'',
			keyword:'',
			pageindex: 1,
			pagesize: 30,
			list: [
				{
					name: '全部',
					// cate_count: dataList.length || 0,
					state: 0
				},
				{
					name: '已预约',
					// cate_count: getApp().globalData.supplier_enroll_list.frozenNum1 || 0,
					state: 1
				},
				{
					name: '已核销',
					// cate_count: getApp().globalData.supplier_enroll_list.frozenNumNot1 || 0,
					state: 2
				},
				{
					name: '已退款',
					// cate_count: getApp().globalData.supplier_enroll_list.refund1 || 0,
					state: 3
				}
			],
			current: 0,
			dataList: [],
			keyword: '', // 搜索关键字
			constants: {},
			cur_status: '',
			push_type_show: false, // 推广方式
			status_options_show: false // 活动状态选择器显示
		};
	},
	computed: {
		info() {
			return function(item) {
				if (item.price == '1') {
					return '普通门票';
				} else if (item.price == '500') {
					return '豪华门票';
				} else {
					return 'VIP门票';
				}
			};
		},
		itoo() {
			return function(index) {
				if (index == 0) {
					return '姓名';
				} else if (index == 1) {
					return '手机';
				} else if (index == 2) {
					return '公司';
				} else if (index == 3) {
					return '职位';
				}
			};
		}
	},
	onLoad(e) {
		console.log(e.id,'jsdfjasdfjsa');
		this.id = e.id
		this.supplierId = uni.getStorageSync('userInfo').supplierId;
		// this.getshuju()
		uni.showLoading({
			title: '请稍等...'
		});
		this.loaddata('全部');
	},
	onReachBottom() {
		this.pageindex++;
		this.loaddata();
	},
	methods: {
		async getshuju(){
			let result = await db.collection('enroll_info').where({'dataList.supplierId':this.supplierId,'dataList._id':this.id}).field({info:true,price:true,state:true}).limit(500).get()
			console.log(result,'ieieiei');
			
		},
		jieliu(){
			let Interval = null
			return function(fn,time){
				if(!Interval){
					fn()
					Interval = setTimeout(()=>{
						Interval = null
					},time || 1000)
				}
			}
		},
		clearsearch(){
			this.keyword = ''
		},
		search(e){
			this.jieliu(this.getSearchData(e),1500)
		},
		change(e) {
			this.dataList = [];
			this.pageindex = 1;
			this.current = e;
			uni.showLoading({
				title: '请稍等...'
			});
			this.loaddata(this.list[e].name);
		},
		async getSearchData(e){
			await db
				.collection('enroll_info')
				.where({ 'dataList.supplierId': this.supplierId,'info.value': new RegExp(e, 'ig'),'dataList._id':this.id }).orderBy("register_date","desc")
				.limit(500)
				// .skip((this.pageindex - 1) * this.pagesize)
				.get()
				.then(res => {
					this.dataList = []
					let result = res.result.data;
					this.dataList = result;
					uni.hideLoading();
				});
		},
		async loaddata(substate) {
			uni.showLoading({
				title: '请稍等...'
			});
			if(substate == '全部'){
				console.log(1111);
				await db
					.collection('enroll_info')
					.where({ openid:uni.getStorageInfo('userinfoKey').openId || getApp().globalData.OPENID }).orderBy("register_date","desc")
					.limit(this.pagesize)
					.skip((this.pageindex - 1) * this.pagesize)
					.get()
					.then(res => {
						let result = res.result.data;
						this.dataList = this.dataList.concat(result);
						uni.hideLoading();
					});
			}else{
				await db
					.collection('enroll_info')
					.where({ openid:uni.getStorageInfo('userinfoKey').openId || getApp().globalData.OPENID, state: this.list[this.current].name }).orderBy("register_date","desc")
					.limit(this.pagesize)
					.skip((this.pageindex - 1) * this.pagesize)
					.get()
					.then(res => {
						let result = res.result.data;
						this.dataList = this.dataList.concat(result);
						console.log(this.dataList,this.list[this.current].name,'2222');
						uni.hideLoading();
					});
			}

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
.shujutitle {
	background-color: #ff0000;
	width: 750rpx;
	height: 100rpx;
	text-align: center;
	font-size: 60rpx;
	font-weight: 900;
	color: white;
	line-height: 100rpx;
}
</style>
