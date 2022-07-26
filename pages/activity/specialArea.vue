<template>
	<view class="">
		<view>
			<!-- <u-navbar :custom-back="navback" :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff"></u-navbar>

			<view style="background:linear-gradient(to bottom,#ff0000,#ff0000);display: flex;flex-direction: column;position: relative;width: 750rpx;height: 500rpx;">
				<view style="margin: 40rpx 40rpx;display: flex;">
					<view class=""><image :src="dataList.headImgUrl" style="border-radius: 50%;width: 108rpx;height: 108rpx;"></image></view>
					<view style="display: flex;flex-direction: column;justify-content: space-around;margin-left: 20rpx;">
						<view style="color: white;font-weight: 600;">{{ dataList.nickName }}</view>
						<view
							style="font-weight: 600;color: white;background: darkorange;height: 40rpx;width: 150rpx;display: flex;border-radius: 8rpx;font-size: 22rpx;justify-content: center;align-items: center;"
						>
							{{ dataList.state }}
						</view>
					</view>

					<view
						v-if="dataList.openId == 'ojqEP4-IPnk0fOF1MbpKiiqDlkOc'"
						style="width: 200rpx;height: 60rpx;text-align: center;line-height: 60rpx;color: white;background-color: darkorange ;border-radius:20rpx;position: absolute;right: 20rpx;bottom: 30rpx;"
						@tap="$u.route({ url: 'pages/home_page/app_enter/app_dealer_enter?scene=172' })"
					>
						申请福利
					</view>
				</view>
				<view v-if="dataList.introduction" style="color: white;margin:0px 40rpx;letter-spacing:4rpx;font-weight: 600;height: 200rpx;width: 90%;">{{ dataList.introduction }}</view>
				<view v-else style="color: white;margin:0px 40rpx;letter-spacing:4rpx;font-weight: 600;height: 200rpx;width: 90%;">暂未设置</view>
			</view> -->
			<view style="border-radius: 50%;background: rgba(120, 120, 120, 0.5);color: fff;text-align: center;position: fixed;left: 30rpx;z-index: 99999;" :style="{'top':menuButtonInfo.top + 'px','width': menuButtonInfo.height+'px','height': menuButtonInfo.height+'px','line-height': menuButtonInfo.height+'px'}" @click="jumpHome">
				<u-icon name="arrow-left" color="#ffffff" size="30"></u-icon>
			</view>
			<image :src="dataList.edit_backgroundImage[0].url?dataList.edit_backgroundImage[0].url:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/20705154340.png'" style="width:100%;height: 250rpx;vertical-align: bottom;" mode="aspectFill"></image>
				<!-- <view class="profile" :style="{ backgroundImage: `url(${userinfo.backgroundImage[0].url?userinfo.backgroundImage[0].url:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/20705154340.png'})` }"  style="position: relative;"> -->
					<view class="profile" style="background-color: #fff;">
				<view class="meta">
					<view class="meta-item" style="">
						<view style="display: flex;margin-left: 40rpx;padding-top: 20rpx;">
							<u-avatar :src="dataList.edit_avatarUrl[0].url?dataList.edit_avatarUrl[0].url:dataList.headImgUrl" size="80"></u-avatar>
							<view style="display: flex;flex-direction: column;height: 80rpx;justify-content: space-between;margin-left: 20rpx;">
								<view class="nickname" style="font-weight: 900;">{{ dataList.edit_nickName?dataList.edit_nickName:dataList.nickName }}</view>
								<view  style="background-color: #1873d5;border-radius: 6rpx;color: white;font-size: 22rpx;color: white;width: 100rpx;height: 30rpx;line-height: 30rpx;text-align: center;" v-if="dataList.state == '已认证'">
									企业认证
								</view>	
								<view  style="background-color: #36bd1e;border-radius: 6rpx;color: black;font-size: 22rpx;color: white;width: 100rpx;height: 30rpx;line-height: 30rpx;text-align: center;" v-else>
									个人认证
								</view>
							</view>
							<view v-if="dataList._id == '62c8facc5e068d0001ca2171'" style="background-color: #d5b385;border-radius: 12rpx;color: white;font-size: 24rpx;margin-left: 150rpx;width: 120rpx;height: 50rpx;line-height: 50rpx;text-align: center;" @tap="$u.route({ url: 'pages/home_page/app_enter/app_dealer_enter?scene=172' })">
								申请福利
							</view>
							<view v-else-if="dataList._id == '62c6c9edf7929900012320a9'" style="background-color: #d5b385;border-radius: 12rpx;color: white;font-size: 24rpx;margin-left: 290rpx;width: 120rpx;height: 50rpx;line-height: 50rpx;text-align: center;" @tap="$u.route({ url: 'pages/home_page/app_enter/app_dealer_enter?scene=1535' })">
								申请福利
							</view>
						</view>
						
						<!-- <view class="u-flex-1" style="padding: 6rpx 12rpx;background-color: #d5b385;border-radius: 12rpx;color: white;font-size: 24rpx;">
							{{userinfo.state}}
						</view>		 -->				
						
					</view>
					<view style="margin-left: 50rpx;" >
						<!-- <view class="nickname" style="font-weight: 800;font-size: 40rpx;">{{ userinfo.nickName }}</view> -->
						<view class="nickname u-line-3" style="font-size: 26rpx;width: 650rpx;height:114rpx;">{{ dataList.introduction?dataList.introduction:'暂未设置' }}</view>
						
					</view>
					<view style="width: 670rpx;margin: 0 auto;display: flex;margin-top: 20rpx;">
						<view style="display: flex;flex-direction: column;width: 25%;align-items: center;font-weight: 700 ;">
							<text>{{browse}}</text>
							<text>浏览数</text>
						</view>
						<view style="display: flex;flex-direction: column;width: 25%;align-items: center;font-weight: 700 ;">
							<text>{{total}}</text>
							<text>已发布</text>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view style="flex-direction: column;background: #f4f4f5;border-radius: 32rpx;width: 100%;position: relative;display: flex;bottom: 24rpx;">
					<u-tabs ref="uTabs" :list="list" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
					<view style="width: 100%;display: flex;padding: 20rpx;" v-for="(item, index) in activity_list" :key="index" @click="jumphuodong(item)">
						<view style="position: relative;">
							<image :src="item.imageValue[0].url" style="width: 320rpx;height: 210rpx;"></image>
							<view style="position: absolute;top: 0;left: 0;padding: 5rpx 10rpx;color: white;background-color: red;">{{ item.type }}</view>
						</view>

						<view style="display: flex;flex-direction: column;flex: 1;margin-left: 15rpx;position: relative;width: 400rpx;">
							<view>
								<view style="font-weight: 600;" class="u-line-1">{{ item.name }}</view>
								<view style="color: #999;font-size: 22rpx;">{{ item.dataTimeStart | date('mm/dd hh:MM') }} 至 {{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
								<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
								<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{dataList.only_form =='全国'?'全国':dataList.onlyList}}</view>
								<view style="color: #000000;font-size: 22rpx;">{{item.activity_form}}</view>
								<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
								<view v-else style="color: #999;font-size: 22rpx;">
									费用:
									<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>
									元起
								</view>
								<view style="color: #999;font-size: 22rpx;" v-if="item.baomingnum != 0">
									已报名：
									<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ item.baomingnum }}</text>
									人
								</view>
								<view style="color: blue;font-size: 22rpx;" v-else>									
									<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ item.state }}</text>									
								</view>
							</view>
							<view>
								<view style="position: absolute;bottom: 0;right: 16rpx;color: blue;">浏览数：{{item.browse}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 200rpx;width: 100%;"></view>
			</view>

			<!-- <view style="position: fixed;bottom: 0;height: 130rpx;width: 100%;background: #fff;display: flex;justify-content: space-around;align-items: center;">
				<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<u-icon name="chat-fill" size="40"></u-icon>
					<view>联系</view>
				</view>
				<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<button open-type="share"></button>
						<u-icon name="share-fill" size="40"></u-icon>
						<view>分享</view>
					
					
				</view>
				<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					
					<u-icon name="heart-fill" size="40"></u-icon>
					<view>关注</view>
				</view>
				<view
					style="font-size: 32rpx;border-radius: 16rpx;background: #ff0000;height: 90rpx;width:45%;color: white;font-weight: 600;display: flex;justify-content: center;align-items: center;"
				>
					订阅通知
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			statusBarHeight: 0,
			navBarHeight: 0,
			menuButtonInfo: {},
			list: [{ name: 'TA发布的活动' }, { name: '已结束' }],
			current: 0,
			userinfo:[],
			total:0,
			browse:0,
			dataList: {},
			activity_list: []
		};
	},
	computed: {
		pricebijiao() {
			return function(item) {
				let idx = item.map(x => Number(x.price));
				return Math.min(...idx);
			};
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: this.dataList.nickName + '邀请你参加活动',
			path: '/pages/activity/specialArea?id=' + this.dataList._id
		};
	},
	onLoad(e) {
		this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		// db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
		// 	this.uid = res.result.data[0]._id
		// })
		// id为商家supplierId
		// item 为个人
		this.get_navigations();
		this.loadData(e.id);
		// this.userinfoData()
	},
	methods: {
		jumpHome(){
			uni.navigateBack()
		},
		// userinfoData(){
		// 	db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
		// 		this.userinfo = res.result.data[0]
		// 		if(this.userinfo.state == '已认证'){
		// 			this.activityInfo = '已认证'
		// 		}
		// 	})
		// },
		navback() {
			uni.switchTab({
				url: '/pages/tabbar/activity/activity'
			});
		},
		jumphuodong(item) {
			if (item.state == '已结束') {
				uni.showToast({
					title: '活动已结束',
					icon: 'none'
				});
				return;
			} else {
				this.$u.route({ url: 'pages/activity/activity_detail?id=' + item._id });
			}
			// if(this.empty){
			// 	this.$u.route({url: 'pages/tabbar/activity/huodong?id='+id})
			// }else{
			// 	this.$u.route({url: 'pages/activity/activity_detail?id='+id})
			// }
		},
		loadData(id) {
			db.collection('user')
				.doc(id)
				// .where({ openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID  })
				.get()
				.then(res => {
					console.log(res, '7777666666');
					this.dataList = res.result.data[0];
					db.collection('activityList').where({ openid: this.dataList.openId })
					.get().then(res1=>{
						this.total = res1.result.data.length
						for (let i=0;i<this.total;i++) {
							let item = res1.result.data[i]
							// console.log(item.browse,'browse');
							if(typeof item.browse != 'undefined'){
								this.browse += item.browse
							}
						}
					})
					this.getEnroll('all');
				});
		},

		async baomingnum(id) {
			let count = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.count();
			return count.result.total;
		},
		async getEnroll(e) {
			console.log(e, '8888');
			if (e == 'all') {
				let res = await db
					.collection('activityList')
					.where({ openid: this.dataList.openId, state: dbCmd.neq('已结束').and(dbCmd.neq('未发布')) })
					.orderBy('register_date', 'desc')
					.get();
				this.activity_list = res.result.data;
				for (let i = 0; i < this.activity_list.length; i++) {
					this.activity_list[i].baomingnum = await this.baomingnum(this.activity_list[i]._id);
					this.$set(this.activity_list[i], i, this.activity_list[i].baomingnum);
				}
			} else {
				let res = await db
					.collection('activityList')
					.where({ openid: this.dataList.openId, state: dbCmd.eq('已结束').and(dbCmd.neq('未发布')) })
					.orderBy('register_date', 'desc')
					.get();
				this.activity_list = res.result.data;
				for (let i = 0; i < this.activity_list.length; i++) {
					this.activity_list[i].baomingnum = await this.baomingnum(this.activity_list[i]._id);
					this.$set(this.activity_list[i], i, this.activity_list[i].baomingnum);
				}
			}
		},

		// tabs通知swiper切换
		tabsChange(index) {
			this.current = index;

			if (index == 0) {
				this.getEnroll('all');
			} else {
				this.getEnroll();
			}
		},
		get_navigations() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync();
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// console.log(menuButtonInfo);
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = menuButtonInfo.bottom - info.statusBarHeight + (menuButtonInfo.top - info.statusBarHeight);
			this.windowWidth = menuButtonInfo.left;
			console.log(menuButtonInfo, 'nav');
			// #endif

			//#ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			//#endif
			console.log(menuButtonInfo);
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		},
		Return() {
			// uni.showToast({
			// 	title:"自己做返回"
			// })
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
/* @import '../tabbar/activity/common.scss'; */
page {
	background-color: #f4f4f5;
	height: 100vh;
}
.img_sss {
	background-image: url(../../static/logo.png);
	width: 90%;
	height: 300rpx;
}
// 按钮清除默认样式
button {
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	padding-left: 0px;
	padding-right: 0px;
	box-sizing: border-box;
	font-size: 18px;
	text-align: center;
	text-decoration: none;
	line-height: 1;
	border-radius: 0px;
	-webkit-tap-highlight-color: transparent;
	overflow: hidden;
	color: #000000;
	background-color: transparent;
}
button::after {
	border: none;
	background-color: none;
}
.profile {
		height: 395rpx;
		 background-repeat:no-repeat;
		 backgroundPosition:center;
		background-size: cover;
		// padding-top: 200rpx;
		// display: flex;
		// justify-content: center;
		// align-items: center;

		// .meta {
		// 	.meta-item {
		// 		display: flex;
		// 		flex-direction: column;
		// 		align-items: center;
		// 		padding-left: 30rpx;
		// 		padding-right: 20rpx;
		// 		padding-bottom: 30rpx;
		// 	}
		// 	.nickname {
		// 		color: black;
		// 		font-size: 32rpx;
		// 		padding-bottom: 20rpx;
		// 	}
		// 	.loginandout {
		// 		text-decoration: underline;
		// 		color: white;
		// 		font-size: 30rpx;
		// 	}
		// }
	}




	

</style>
