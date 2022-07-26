<template>
	<view class="">
		<view>
			<u-sticky>
				  <!-- <u-tabs-swiper  activeColor="#ff0000" ref="tabs" :list="list1" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper> -->
					 <u-tabs-swiper  activeColor="#ff0000" ref="tabs" :list="list1[current].children" :current="cur" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			</u-sticky>
			<view  v-if="!dataList.length" style="margin-top: 50rpx;">
				<u-empty text="暂无数据" mode="list" ></u-empty>
			</view>
					<view style="width: 100%;display: flex;padding: 20rpx;background-color: white;" v-for="(item, index) in dataList" :key="index" @click="jumphuodong(item._id)">
								<view style="position: relative;">
									<image :src="item.imageValue[0].url" style="width: 300rpx;height: 200rpx;"></image>
									<!-- <view style="position: absolute;top: 0;left: 0;padding: 5rpx 10rpx;color: white;background-color: red;font-size: 24rpx;">
										{{item.type}}
									</view> -->
								</view>
								<view
									style="display: flex;flex-direction: column;flex: 1;margin-left: 15rpx;width: 400rpx;"
								>
									<view>
										<view style="font-weight: 600;" class="u-line-1">{{ item.name }}</view>
										<view style="color: #999;font-size: 22rpx;">{{item.dataTimeStart |date('mm/dd hh:MM')}} 至 {{item.dataTimeEnd |date('mm/dd hh:MM')}}</view>
										<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
										<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{item.onlyList}}</view>
										<view style="color: #000000;font-size: 22rpx;">{{item.activity_form}}</view>
										<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
										
										<view v-else style="color: #999;font-size: 22rpx;">费用:<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>元起</view>
										<view style="color: #999;font-size: 22rpx;display: flex;align-items: center;justify-content: space-between;">
											<text v-if="item.baomingnum != 0">
												已报名：
												<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ item.baomingnum }}</text>
												人
											</text>
											<text v-else>
												<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ item.state }}</text>
											</text>
											<text>
												浏览数：
												<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ item.browse }}</text>	
												次
											</text>
										</view>
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
			dataList: [],
			type: '',
			show: false,
			show1: false,
			size: 80,
			current:0,
			cur:0,
			// list1: [{name: '会议招商'},  {name: '创业项目'},{name: '企业服务'},{	name:'互联网'},{name:'求购信息'},
			// {name:'旅游咨询'},{name:'公益活动'},{name:'丽人'},{name:'亲子活动'},{	name:'其它专区'}],
			list1: [
					{
					name: '会议招商',
					children: [ 
					{
						name: '全部'
					},
					{
						name: '招商会'
					},
					{
						name: '项目介绍会'
					},
					{
						name: '大型会议'
					},
					{
						name: '沙龙会议'
					}
				]
			}, 
			{
				name: '创业项目',
				children: [  
					{
						name: '全部'
					},
					{
						name: '项目路演'
					},
					{
						name: '创业分享'
					},
					{
						name: '企业招商'
					}
				]
			}, 
			{
				name: '企业服务',
				children: [
					{
						name: '全部'
					},
					{
						name: '人力资源服务'
					},
					{
						name: '财税法服务'
					}
				] 
			},
			{
				name:'互联网'	,
				children: [ 
					{
						name: '全部'
					},
						{
							name: '互联网'
						},
						{
							name: '区块链'
						},
						{
							name: '新媒体'
						},
						{
							name: '人工智能'
						},
						{
							name: '大数据'
						},
						{
							name: '小程序'
						},
						{
							name: 'VR/AR'
						},
						{
							name: '物联网'
						},
						{
							name: '云计算'
						},
						{
							name: '游戏'
						}
					] 
			},
			{
				name:'求购信息',
				children: [
					{
						name: '全部'
					},
					{
						name: '二手物品'
					},
					{
						name: '宠物'
					},
					{
						name: '闲置'
					}
				] 
			},
			{
				name:'旅游咨询',
				children: [ 
					{
						name: '全部'
					},
					{
						name: '周边游'
					},
					{
						name: '国内游'
					},
					{
						name: '出境游'
					},
					{
						name: '主题游'
					},
					{
						name: '景点门票'
					}
				] 
			},			
			{
				name:'运动/户外',
				children: [  
					{
						name: '全部'
					},
					{
						name: '休闲运动'
					},
					{
						name: '体育赛事'
					},
					{
						name: '极限运动'
					},
					{
						name: '健康养生'
					}
				] 
			},
			{
				name:'丽人',
				children: [
					{
						name: '全部'
					},
					{
						name: '美妆'
					},
					{
						name: '服饰穿搭'
					},
					{
						name: '美容SPA'
					},
					{
						name: '瑜伽'
					},
					{
						name: '瘦身塑形'
					},
					{
						name: '魅力提升'
					},
					{
						name: '心理'
					}
				]
			},
			{
				name:'亲子活动',
				children: [
					{
						name: '全部'
					},
					{
						name: '早教'
					},
					{
						name: '小初高'
					},
					{
						name: '才艺启蒙'
					},
					{
						name: '家庭教育'
					},
					{
						name: '亲子游'
					},
					{
						name: '亲子DIY'
					},
					{
						name: '主题乐园'
					},
					{
						name: '儿童剧'
					},
					{
						name: '体格锻炼'
					},
					{
						name: '营地教育'
					},
					{
						name: '母婴孕育'
					},
					{
						name: '亲子摄影'
					}
				]
			},
			{
				name:'其它专区',
				children: [
					{
						name: '其它专区'
					},
				]
			}
			],
		};
	},
	computed: {
		pricebijiao() {
			return function(item){
				let idx =item.map(x=>Number(x.price))				
				return  Math.min(...idx)
			}
		},
	},
	onShareTimeline(res) {	
		let data = {
			item:this.type,
			index:this.current
		}
		return {
			title:	this.type,
			imageUrl:'',
			path: '/pages/activity/titleClassify?type=' + JSON.stringify(data)
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
		}
		let data = {
			item:this.type,
			index:this.current
		}
		// 来自页面内分享按钮
		return {
			title: this.type,
			imageUrl: '',
			path: '/pages/activity/titleClassify?type=' + JSON.stringify(data)
		};
	},
	onLoad(e) {
		console.log(JSON.parse(e.type),'sdfsadfsdf');
		this.type = JSON.parse(e.type).item;
		console.log(e.type,'asdf');
		this.current = JSON.parse(e.type).index;
		this.loadData(this.list1[this.current].children[this.cur].name);
	},
	methods: {
		tabsChange(index) {
			this.cur = index;
			this.loadData(this.list1[this.current].children[index].name);
		},
		fabClick(){
			console.log(this.dataList[0],'ddd');
				uni.openLocation({
					latitude: this.dataList[0].dataList.latitude,
					longitude: this.dataList[0].dataList.longitude,
					success: function() {
						console.log('success');
					}
				});
			
			
		},
		jumphuodong(id) {
			this.$u.route({ url: 'pages/activity/activity_detail?id=' + id });
			// if(this.empty){
			// 	this.$u.route({url: 'pages/tabbar/activity/huodong?id='+id})
			// }else{
			// 	this.$u.route({url: 'pages/activity/activity_detail?id='+id})
			// }
		},
		async baomingnum(id) {
			let count = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.count();
			return count.result.total;
		},
		async loadData(type) {
			console.log(this.type,'typeeee');
			let where = {}
			if(type == '全部'){
				where = {type:this.type,state:dbCmd.neq('已结束'),isSubmit:true}
			}else{
				where = {subtype:type,state:dbCmd.neq('已结束'),isSubmit:true}
			}
			
			let res =await db.collection('activityList')
				.where(where).get()
					this.dataList = res.result.data;
					console.log(this.dataList,'dfasdfasdfs');
					for (let i = 0; i < this.dataList.length; i++) {
						this.dataList[i].baomingnum = await this.baomingnum(this.dataList[i]._id);
						this.$set(this.dataList[i], i, this.dataList[i].baomingnum);
					}
		},
	}
};
</script>

<style>
page {
	background-color: #f4f4f5;
	height: 100vh;
}
</style>
