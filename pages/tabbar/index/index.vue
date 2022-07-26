<template>
	<view class="cantainer" style="padding-bottom: 120rpx;">
		<uni-nav-bar :fixed="true" color="#ffffff" background-color="#F7F7F7" :status-bar="true">
			<view slot="left">
				<view class="xp-box" style="line-height: 1;">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/minico.png" mode="aspectFit"></image>
					<view style="font-weight: 600;">
						推荐官·
						<text>我为好产品推广</text>
					</view>
					<!-- <view style="font-size: 24rpx;font-weight: 600;font-family: 'PingFang SC';">品牌商家直供100%正品· <text style="font-size: 22rpx;font-family: 'PingFang SC';">商家直发，保税仓直发，退换无忧</text></view> -->

					<!-- <view class="title-red">品牌商家直供100%正品</view>
					<text> 商家直发，保税仓直发，退换无忧 </text> -->
				</view>
			</view>
		</uni-nav-bar>
		<!-- <view style="position: fixed;width: 100%;height: 50rpx;background-color: #F7F7F7;z-index: 9999;"></view> -->
		<view class="break-time" style="position: fixed;width: 100%;height: 100rpx;background-color: #F7F7F7;z-index: 9999;padding: 20rpx;">
				<text>关注公众号，掌握实时活动和订单通知。</text>
				<view class="x-button" @tap="jumpAttention">+关注</view>
		</view>
		<!-- <view style="width: 100%;height: 50rpx;"></view>
		<view class="break-time" >
			<text>成为分销商家共赢互利，成在合作。</text>
			<view class="x-button" @tap="jumpAttention">立即报名</view>
		</view>
 -->
	 
		<view class="z-box" v-for="(item, index) in orderList" :key="index">
			
			<!-- 新 -->
			<view class="swiper" style="position: relative;top: 40rpx;height: 100%;">
				<view v-for="(item2,index2) in item.activityList" :key="index2">
					
					<view
						style="border-radius: 8rpx; background-image: url('https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bgbg0.png');margin-top: 80rpx;background-size: contain;background-repeat: no-repeat;"
					>
						<view class="box-top">
							<image @tap="mymainShop(item.userInfo.userId)" :src="item.userInfo.headImgUrl" mode=""></image>
							<view class="recommend-name">
								<view class="lsadd">
									<text class="xj1 u-margin-right-10 u-line-1" style="color: white;width: 260rpx;display: block;font-weight: 900;">{{ item.userInfo.nickName }}</text>
								</view>
					
								<view class="x-info">
									<!-- <text style="color: rgb(227, 227, 227);">最新发布</text> -->
									<view  style="color: #ffffff;font-size: 24rpx;display: flex;flex-direction: column;" >
									    <text>成员：{{item.userInfo.userCount}} </text>
									
									    <text v-if="item.userInfo.tj ">
									      <!-- <text class="lr" style="margin: 0 10rpx;">|</text> -->
									      <text>	帮推官：{{item.userInfo.promotionUserCount || '0'  }} </text>
									    </text>
									</view>		
								</view>
							</view>
							<view class="x-button" @tap="mymainShop(item.userInfo.userId)" style="font-weight: 900;">
								推荐官主铺
							</view>
						</view>
					
					<view class="swiper-item uni-bg-red" style="position: relative;top: 30rpx;">
						<view class="x-body">
							<view class="body-list">
								<view class="body-item" style="padding: 20rpx;" @tap.stop="jumpDetails(item2.activityId, item2.promotionId)">
									<view class="x-center">
										<text class="u-line-2" style="height: auto; font-size: 32rpx;margin-top: 10rpx;">{{ item2.activity.commodity.commodityName }}</text>
										<text class="tag3" style="font-size: 34rpx;">
											<text class="u-font-20">￥</text>
											{{ item2.activity.commodity.showPrice }}
										</text>
										<view class="goods-info">
											<view class="box-img" style="color: red;" v-for="(item3, index3) in item2.activity.commodity.fileList" :key="index2">
												<view>
													<image class="img-detail" :src="item3.fileUrl" mode=""></image>
													<image v-if="item3.location == 0" class="img-off" src="/static/bf.png"></image>
												</view>
											</view>
										</view>
			
										<view class="goods-content">
											<view class="x-info" style="color:red;font-weight: 800;font-size: 24rpx;">
												<text style="color: rgb(255, 0, 4);font-size: 24rpx;">{{ item2.promotionTime | mintime }}发布</text>
												<text style="color: rgb(255, 0, 4);font-size: 24rpx;">{{ item2.activity.browseCount || 0 }} 人浏览</text>
											</view>
			
											<view class="tag2" >
												<view class="u-line-1" @tap.stop="lookInfo(item2.activity.supplierId)" style="color:rgb(195, 176, 145);">
													商品来源：{{ item2.activity.commodity.supplier.supplierName }}
												</view>
											</view>
										</view>
									</view>
									<view class="x-down"></view>
								</view>
								<none-msg :info="tsmsg" :goodsno="true" v-if="!orderList.length"></none-msg>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- <view
				style="border-radius: 8rpx; background-image: url('https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bgbg0.png');background-size: cover;margin-top: 85rpx; "
			>
				<view class="box-top">
					<image @tap="mymainShop(item.userInfo.userId)" :src="item.userInfo.headImgUrl" mode=""></image>
					<view class="recommend-name">
						<view class="lsadd">
							<text class="xj1 u-margin-right-10 u-line-1" style="color: white;width: 284rpx;display: block;">{{ item.userInfo.nickName }}</text>
						</view>

						<view class="x-info">
							<text style="color: rgb(227, 227, 227);">最新发布</text>
						</view>
					</view>
					<view class="x-button" @tap="mymainShop(item.userInfo.userId)" style="font-weight: 900;">
						推荐官主铺
					</view>
				</view> -->

				<!-- 新 -->
				<!-- <view class="swiper" style="position: relative;top: 40rpx;height: 480rpx;">
					<view v-for="(item2,index2) in item.activityList" :key="index2">
						<view class="swiper-item uni-bg-red" >
							<view class="x-body">
								<view class="body-list">
									<view class="body-item" style="padding: 20rpx;" @tap.stop="jumpDetails(item2.activityId, item2.promotionId)">
										<view class="x-center">
											<text class="u-line-2" style="height: auto; font-size: 32rpx;margin-top: 10rpx;">{{ item2.activity.commodity.commodityName }}</text>
											<text class="tag3" style="font-size: 34rpx;">
												<text class="u-font-20">￥</text>
												{{ item2.activity.commodity.showPrice }}
											</text>
											<view class="goods-info">
												<view class="box-img" style="color: red;" v-for="(item3, index3) in item2.activity.commodity.fileList" :key="index2">
													<view>
														<image class="img-detail" :src="item3.fileUrl" mode=""></image>
														<image v-if="item3.location == 0" class="img-off" src="/static/bf.png"></image>
													</view>
												</view>
											</view>

											<view class="goods-content">
												<view class="x-info" style="color: rgb(195, 176, 145);">
													<text style="color: rgb(195, 176, 145);">{{ item2.promotionTime | mintime }}发布</text>
													<text style="color: rgb(195, 176, 145);">{{ item2.activity.browseCount || 0 }} 人浏览</text>
												</view>

												<view class="tag2" style="color: red;">
													<view class="u-line-1" @tap.stop="lookInfo(item2.activity.supplierId)">
														商品来源：{{ item2.activity.commodity.supplier.supplierName }}
													</view>
												</view>
											</view>
										</view>
										<view class="x-down"></view>
									</view>
									<none-msg :info="tsmsg" :goodsno="true" v-if="!orderList.length"></none-msg>
								</view>
							</view>
						</view>
					</view>
				</view> -->
				<!-- 滑动部分 -->
				<!-- <swiper class="swiper" @change="change($event, index)" id="asd" style="position: relative;top: 40rpx;height: 480rpx;">
					<swiper-item id="'aaa'+index2" v-for="(item2, index2) in item.activityList" :key="index2" ref="">
						<view class="swiper-item uni-bg-red">
							<view class="x-body">
								<view class="body-list">
									<view class="body-item" style="padding: 20rpx;" @tap.stop="jumpDetails(item2.activityId, item2.promotionId)">
										
										<view class="x-center">
											<text class="u-line-2" style="height: auto; font-size: 32rpx;margin-top: 10rpx;">{{ item2.activity.commodity.commodityName }}</text>
											<text class="tag3" style="font-size: 34rpx;">
												<text class="u-font-20">￥</text>
												{{ item2.activity.commodity.showPrice }}
											</text>
											<view class="goods-info">
												<view class="box-img" style="color: red;" v-for="(item3, index3) in item2.activity.commodity.fileList" :key="index2">
													<view>
														<image class="img-detail" :src="item3.fileUrl" mode=""></image>
														<image v-if="item3.location == 0" class="img-off" src="/static/bf.png"></image>
													</view>
												</view>
											</view>

											<view class="goods-content">
												<view class="x-info" style="color: rgb(195, 176, 145);">
													<text style="color: rgb(195, 176, 145);">{{ item2.promotionTime | mintime }}发布</text>
													<text style="color: rgb(195, 176, 145);">{{ item2.activity.browseCount || 0 }} 人浏览</text>
												</view>

												<view class="tag2" style="color: red;"> -->
													<!-- <text class="tag1 u-line-2">{{item.commodity.commodityName}}</text> -->

													<!-- <view class="u-line-1" @tap.stop="lookInfo(item2.activity.supplierId)">商品来源：{{ item2.activity.commodity.supplier.supplierName }}</view>
												</view>
											</view>
										</view>
										<view class="x-down"> -->
											
											<!-- 	<view class="x-down-item" v-for="(item2,index2) in item.operationList" :key="index2">
													<view>
														<text>{{index2}}</text>
														<image :src="item2.headImgUrl" mode=""></image>
														<text>{{item2.operationTime |mintime}}</text>
														<text>{{item2.operation== 'browse' ? '浏览': item2.operation== 'promotion' ? '帮卖 ':'购买' }}</text>
													</view>
												</view> -->

											<!--												<swiper disable-touch=true :display-multiple-items="3" circular=true autoplay=true interval=2000-->
											<!--													duration=500 vertical=true v-if="item2.activity.operationList && item2.activity.operationList.length>3">-->
											<!--													<swiper-item class="x-down-item" v-for="(item3,index3) in item2.activity.operationList" :key="index"-->
											<!--														@touchmove.stop='stopTouchMove'>-->
											<!--														<view>-->
											<!--															&lt;!&ndash; <text>{{index2}}</text> &ndash;&gt;-->
											<!--															<image :src="item3.headImgUrl || defuImgHead" mode=""></image>-->
											<!--                              <text class="u-margin-left-20">{{item3.nickName || '游客'}}</text>-->
											<!--															<text>{{item3.operationTime |mintime}}</text>-->
											<!--															<text>查看了商品</text>-->
											<!--														</view>-->
											<!--													</swiper-item>-->
											<!--												</swiper>-->
											<!--												<view class="img-font" v-else>-->
											<!--													<image src="/static/cl1.png" mode=""></image>-->
											<!--													<text>亲，浏览人数较低，帮他转发下！</text>-->
											<!--												</view>-->

											<!--												<view class="x-last">-->
											<!--                          <text @tap.stop="lookInfo(item2.activity.supplierId)">商品来源：{{item2.activity.commodity.supplier.supplierName}}</text>-->
											<!--													<button catchtap="share"-->
											<!--														:data-title="item2.activity.commodity.commodityName"-->
											<!--														:data-img="item2.activity.commodity.thumbnail"-->
											<!--														:data-activityId="item2.activityId"-->
											<!--														:data-promotionId="item2.promotionId"-->
											<!--														open-type="share">-->
											<!--														<image src="../../../static/wxiocn.png" mode=""></image>-->
											<!--														<text>分享</text>-->
											<!--													</button>-->
											<!--												</view>-->
											<!-- 7.23 -->
									<!-- 	</view> 
									</view> -->
									<!-- <u-loadmore :status="status" /> -->
									<!-- <none-msg :info="tsmsg" :goodsno="true" v-if="!orderList.length"></none-msg>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper> -->
				<view class="dot" v-if="!(item.activityList.length == 1)">
					<view class="active" :style="{ width: 750 / item.activityList.length + 'rpx', transform: `translate(${(750 / item.activityList.length) * item.amount}rpx, 0)` }"></view>
				</view>
			</view>
			<!-- </skeleton> -->
		</view>
		<u-tabbar :list="tabbar"></u-tabbar>
		<u-popup v-model="enter_receipt" mode="center" border-radius="14">
			<view class="wl-box">
				<view class="top">
					<image src="../../../static/logo.png" mode=""></image>
					<view class="head-title">
						<view>商品名称</view>
						<text>快递公司</text>
						<text>快递单号</text>
					</view>
				</view>
				<view class="center"></view>
				<view class="down"><view>确认收货</view></view>
			</view>
		</u-popup>
	</view>
</template>
<script>
/* 
		1.一进来看本地数据库，有没有存token ，去调登录
		2.如果有调接口，如果没有去调登录接口    
		3.
		
	*/
// import Skeleton from '@/components/skeleton/skeleton.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import refdeo from '@/components/refdeo/refdeo.vue';
import utils from '@/common/logic/utils/util.js';
import permiss from '@/common/logic/permiss';
export default {
	components: {
		uniNavBar,
		refdeo
	},
	data() {
		return {
			loading: true,
			skeleton1: {
				imgTitle: false,
				avatarSize: '80px',
				row: 2,
				showTitle: true,
				flexType: 'space-between',
				showAvatar: false
			},

			tabbar: {},
			defuImgHead: '/static/moren.png',
			list: ['千山鸟飞绝', '万径人中灭', '孤舟蓑笠翁', '独钓寒江雪'],
			isAttention: false,
			userinfo: null,
			showLoginPopup: false,
			orderList: [],
			apiInfo: {},
			tsmsg: '亲，没有推荐商品哦！',
			pageNum: 1,
			pageSize: 10,
			total: 0,
			status: 'loadmore',
			enter_receipt: false,
			sysIndex: 0,
			nowIndex: 0
		};
	},
	filters: {
		mintime(value) {
			let _fromatTime = value.replace(/-/g, '/');
			let oldTime = new Date(_fromatTime);
			oldTime = oldTime.getTime(oldTime);

			let newTime = new Date();
			newTime = newTime.getTime(newTime);
			let surplus = newTime - oldTime;
			surplus = utils.dateUtil.humanize(surplus);

			return surplus;
		}
	},
	watch: {
		a(val, oldVal) {
			//普通的watch监听
			console.log('a: ' + val, oldVal);
		}
	},
	onShareAppMessage(event) {
		if (event.from === 'button') {
			let { title, img, activityid: activityId, promotionid: promotionId } = event.target.dataset;
			return {
				title: title,
				path: `/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`,
				imageUrl: img
			};
		} else {
			return {
				title: '你的推荐官，让你购物更实惠，品质更有保障！',
				path: `/pages/tabbar/index/index?`,
				imageUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/goto.png'
			};
		}
	},
	onLoad() {
		console.log('onLoad_index');
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage']
		});
		this.pageNum = 1;
		this.orderList = [];
		uni.getStorage({
			key: 'tokenorid',
			success: res => {
				console.log('提取出来', res);
				this.homeList();
				this.sysUserInfo();
			},
			fail: err => {
				// console.log("提取失败",err)
				this.userLogin(); //初始化  登陆 拿token 获取列表
			}
		});
	},
	mounted() {
		setTimeout(() => {
			console.log('ref', this.$refs.refdemo1);
			this.orderList = [];
			this.homeList();
			// this.sysUserInfo()
		}, 1000);

		// const query = uni.createSelectorQuery().in(this);
		// query.select('#asd').boundingClientRect(data => {
		//   console.log("得到布局位置信息" + JSON.stringify(data));
		//   console.log("节点离页面顶部的距离为" , data);
		//   console.log(data); // 获取元素宽度
		// }).exec();
	},
	onPullDownRefresh() {
		this.pageNum = 1;
		this.orderList = [];
		this.homeList();
		this.sysUserInfo();
	},
	onReachBottom() {
		this.pageNum = ++this.pageNum;
		console.log('stop2');
		// console.log(this.pageNum, Math.ceil(total / this.pageSize))
		// if (this.pageNum > Math.ceil(total / this.pageSize)) {
		// 	console.log("stop")
		// 	return false
		// }
		// console.log("stop2")
		this.homeList();
	},
	onShow() {
		let sx = this.$store.state.renovatePages;
		if (sx) {
			this.pageNum = 1;
			this.orderList = [];
			uni.getStorage({
				key: 'tokenorid',
				success: res => {
					// console.log("提取出来",res)
					this.homeList();
					this.sysUserInfo();
				},
				fail: err => {
					// console.log("提取失败",err)
					this.userLogin(); //初始化  登陆 拿token 获取列表
				}
			});
			this.$store.commit('renovate', false);
		}
	},
	methods: {
		pageNuma() {
			console.log(1);
			this.onLoad();
		},
	
		childByValue(a) {
			debugger;
			console.log('nihao', a);
		},
		lookInfo(item) {
			return;
			uni.navigateTo({
				url: '/pages/home_page/shop_info/shop_info?supplierId=' + item
			});
		},
		mymainShop(param) {
			uni.navigateTo({
				url: '/pages/home_page/my_shop/my_shop?mainUserId=' + param
			});
		},
		change(e, index) {
			console.log((this.orderList[index].amount = e.detail.current));
			console.log(e.detail.current);
			this.nowIndex = index;
			this.sysIndex = e.detail.current;
		},

		stopTouchMove() {
			return false;
		},
		sysUserInfo() {
			//拿数据
			this.$u.api
				.getUserInfo()
				.then(e => {
					this.isAttention = e.isSubscribe;
					console.log('tab数据', e);
					this.apiInfo = e;
					getApp().globalData.OPENID = e.openId;
					uni.setStorageSync({
						key: 'userinfoKey',
						data: e
					});

					if (e.isMallPromoter == true) {
						if (e.tj == false && e.bt == false) {
							uni.switchTab({
								url: '/pages/tabbar/recommend/recommend'
							});
						}
					}

					this.$store.commit('tabAuth', e);
					permiss(this).then(() => {
						this.tabbar = this.$store.state.tab;
						console.log(this.tabbar, '444');
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
		jumpDetails(activityId, promotionId) {
			// activityId
			this.$store.commit('renovate', true);
			uni.navigateTo({
				url: `/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`
			});
		},
		homeList() {
			// /distribution-client/activity/allList
			//  distribution-client/activity/allList

			let data = {
				isAsc: '',
				orderBy: '',
				orderByColumn: '',
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				searchValue: ''
			};
			this.$u.api
				.homeList(data)
				.then(e => {
					if (e) {
						this.total = e.total || 0;
						this.orderList = this.orderList.concat(e.rows); //将数据拼接在一起
						uni.stopPullDownRefresh();
						console.log(this.orderList, '999');
						// setTimeout(()=>{this.loading = false},1500)
						// this.loading = false
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		jumpAttention() {
			uni.navigateTo({
				url: '/pages/home_page/official_account'
			});
			// H5暂未配置域名
			// uni.navigateTo({
			// 	url: "/pages/my/merchantSettlement/merchantSettlement"
			// })
			// 小程序跳转
			// wx.navigateToMiniProgram({
			// 	appId: 'wx3d20fc08d4ea44d9',
			// 	// appId: 'wx52a40f3f2cfbbdb0',
			// 	path: 'pages/index/index',
			// 	// extraData: {
			// 	//   foo: 'bar'
			// 	// },
			// 	// envVersion: 'develop',
			// 	success(res) {
			// 		// 打开成功
			// 	}
			// });
		},
		userLogin() {
			//初始化  登陆 拿token 获取列表
			let that = this;
			uni.login({
				success: res => {
					var code = res.code;
					this.$u.api
						.logoin(res.code)
						.then(e => {
							this.isAttention = e.isSubscribe;
							uni.setStorage({
								key: 'tokenorid',
								data: e
							});
							this.homeList();
							this.sysUserInfo();
						})
						.catch(err => {
							console.log('错误', err);
						});
				}
			});
		}
		// attention(pro){
		// 	console.log(pro)
		// 	this.$u.api.isAttention(pro).then(e=>{		//	关注 或订阅
		// 		this.homeList()
		// 	}).catch(err=>{
		// 		console.log("err")
		// 	})
		// },
		// qxAttention(pro){
		// this.$u.api.cancelAttention(pro).then(e=>{		//	取消关注  或订阅
		// 	this.homeList()
		// }).catch(err=>{
		// 	console.log("err")
		// })
		// },
	}
};
</script>

<style lang="scss">
.cantainer {
	background-color: #f0f0f0;
	min-height: 100vh;
}

.z-box {
	// margin-top: 100px;
	width: 100%;
	padding: 12rpx 20rpx;
	// border-radius: 50rpx;

	.box-top {
		height: 120rpx;
		border-radius: 20rpx 20rpx 0 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20rpx;
		// background-color: #FFFFFF;

		> image {
			height: 80rpx;
			width: 80rpx;
			background-size: 100% 100%;
			border-radius: 8rpx;
		}

		.recommend-name {
			margin-left: 14rpx;

			.lsadd {
				.xj1 {
					font-size: 28rpx;
					color: #333333;
				}

				.x-btn {
					background-color: #ff0000;
					color: #ff0000;
					font-size: 20rpx;
					border-radius: 6rpx;
					color: #ffffff;
				}
			}
		}

		.x-info {
			text {
				padding: 0;
				margin: 0;
				font-size: 20rpx;
				color: #ffffff;
				// border-right: 1px solid rgb(195, 176, 145);
				line-height: 100%;
				margin-right: 10rpx;
				padding-right: 10rpx;
			}

			text:nth-child(1) {
				border-right: none;
			}
		}

		.x-button {
			width: 300rpx;
			height: 100%;
			font-size: 26rpx;
			margin-left: auto;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				height: 60rpx;
				width: 50rpx;
			}

			text {
				font-size: 20rpx;
			}
		}
	}

	.dot {
		height: 4rpx;
		width: 100%;
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		position: relative;

		view {
			position: absolute;
			top: 0;
			left: 0;
			height: 4rpx;
			background-color: red;
			border-radius: 2rpx;
			background: red;
			transform: translate(0, 0);
			transition-duration: 0.5s;
			background-color: #ff0000;
			opacity: 0;
		}

		.active {
		}
	}

	.swiper {
		height: 470rpx;
		// background-color: #FFFFFF;
		.swiper-item {
			.x-body {
				.body-list {
					padding: 0 20rpx;

					.body-item {
						// margin-bottom: 20rpx;
						background: #ffffff;
						border-radius: 30rpx;
						box-sizing: border-box;
						width: 100%;
						display: flex;
						justify-content: space-between;
						flex-direction: column;

						.box-top {
							height: 80rpx;
							width: 100%;
							display: flex;
							align-items: center;

							> image {
								height: 80rpx;
								width: 80rpx;
								background-size: 100% 100%;
								border-radius: 8rpx;
							}

							.recommend-name {
								margin-left: 14rpx;

								.lsadd {
									display: flex;
									align-items: center;

									.xj1 {
										font-size: 30rpx;
										font-weight: bold;
									}

									.x-btn {
										// border: 1px solid #ff0000;
										border: 1px solid #ff0000;
										color: #ff0000;
										margin-left: 10rpx;
										padding: 0rpx 2rpx;
										font-size: 24rpx;
										border-radius: 6rpx;
									}
								}
							}

							.x-info {
								text {
									padding: 0;
									margin: 0;
									font-size: 20rpx;
									color: #c3b091;
									border-right: 1px solid #ccc;
									line-height: 100%;
									margin-right: 10rpx;
									padding-right: 10rpx;
								}

								text:nth-child(3) {
									border-right: none;
								}
							}

							.x-button {
								width: 136rpx;
								height: 52rpx;
								background: #ff0000;
								border-radius: 10rpx;
								color: #ffffff;
								font-size: 26rpx;
								line-height: 52rpx;
								text-align: center;
								margin-left: auto;
								align-self: flex-end;
							}
						}

						.x-center {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							height: 470rpx;

							> text {
								font-size: 36rpx;
								color: #333333;
								font-weight: 800;
							}

							.tag3 {
								color: #ff0000;
								font-size: 50rpx;
								font-weight: bold;
								overflow: hidden;
								padding: 0;
							}

							.goods-info {
								display: flex;
								width: 100%;
								overflow: hidden;
								padding-top: 20rpx;

								.box-img {
									width: 33.33%;
									height: 200rpx;
									margin-left: 20rpx;

									view {
										width: 100%;
										height: 100%;
										position: relative;

										.img-detail {
											width: 100%;
											height: 200rpx;
											background-size: 100% 100%;
											border-radius: 8rpx;
										}

										.img-off {
											height: 80rpx;
											width: 80rpx;
											background-size: 100% 100%;
											position: absolute;
											left: 50%;
											top: 50%;
											margin-left: -40rpx;
											margin-top: -40rpx;
										}
									}
								}

								.box-img:nth-child(1) {
									margin-left: 0;
								}
							}

							.goods-content {
								margin-top: 15rpx;
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.tag1 {
									font-size: 30rpx;
									color: #333333;
									font-weight: 800;
								}

								.x-info {
									text {
										padding: 0;
										margin: 0;
										font-size: 26rpx;
										color: #c3b091;
										border-right: 1px solid #c3b091;
										line-height: 100%;
										margin-right: 15rpx;
										padding-right: 15rpx;
									}

									text:nth-child(2) {
										border-right: none;
									}
								}

								.tag2 {
									padding: 10rpx 0;
									display: flex;
									justify-content: space-between;

									text {
										font-size: 30rpx;
										color: #333333;
										font-weight: 800;
									}

									view {
										width: 320rpx;
										height: 40rpx;
										color: #ff0000;
										text-align: right;
										font-size: 26rpx;
									}
								}
							}
						}

						.x-down {
							padding-bottom: 20rpx;
							margin-top: auto;

							swiper {
								height: 200rpx;

								.x-down-item {
									view:nth-child(1) {
										display: flex;
										align-items: center;
										margin-bottom: 20rpx;

										text {
											font-size: 24rpx;
											color: #999999;
										}

										image {
											width: 38rpx;
											height: 38rpx;
											background-size: 100% 100%;
											margin: 0 16rpx;
										}

										text:nth-last-child(1) {
											margin-left: auto;
											color: #333333;
										}
									}
								}
							}

							.img-font {
								width: 100%;
								height: 200rpx;
								overflow: hidden;

								image {
									display: block;
									margin: 0 auto;
									height: 110rpx;
									width: 100rpx;
									margin-top: 60rpx;
								}

								text {
									display: block;
									font-size: 20rpx;
									text-align: center;
									color: #999999;
								}
							}

							.x-last {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-top: 20rpx;

								> text {
									color: #ff0000;
									font-size: 24rpx;
								}

								button {
									border: 1px solid #c3b091;
									width: 100rpx;
									height: 42rpx;
									border-radius: 8rpx;
									display: flex;
									justify-content: space-around;
									align-items: center;
									margin: 0;

									image {
										height: 32rpx;
										width: 32rpx;
									}

									> text {
										font-size: 24rpx;
										color: #c3b091;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

.break-time {
	height: 84rpx;
	background-color: #fff9e4;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	color: #ff0000;
	padding: 0 20rpx;

	text {
		color: #333333;
	}

	.x-button {
		width: 134rpx;
		height: 52rpx;
		background: #ff0000;
		// background: #ff0000;
		border-radius: 6rpx;
		color: #ffffff;
		font-size: 24rpx;
		line-height: 52rpx;
		text-align: center;
	}
}

.xp-box {
	display: flex;
	align-items: center;
	justify-content: start;
	width: 500rpx;
	image {
		height: 60rpx;
		width: 60rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		// margin-right: 20rpx;
	}

	view {
		// color: #ff0000;
		color: red;
		font-size: 34rpx;
		font-family: 'PingFang SC', sans-serif;

		text {
			font-size: 30rpx;
		}
	}
}

button::after {
	border: none;
}

button {
	background-color: transparent;
	padding-left: 0;
	padding-right: 0;
	line-height: inherit;
}

button {
	border-radius: 0;
}

.box {
	width: 710rpx;
	margin: 0 auto;

	image {
		width: 710rpx;
	}

	view {
		margin-top: 30rpx;
		height: 80rpx;
		width: 710rpx;
		border-radius: 80rpx;
		background-color: red;

		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #ffffff;
	}
}

.x-head {
	.head-img {
		width: 750rpx;
		height: 240rpx;
		background: #707070;
	}

	.roll {
		height: 80rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;

		image {
			height: 56rpx;
			width: 56rpx;
		}

		.font-ro {
			width: 654rpx;

			.u-notice-text {
				font-weight: 700;
			}
		}
	}
}

.mark-content {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.wl-box {
	height: 836rpx;
	width: 644rpx;
	border-radius: 15rpx;

	.top {
		height: 170rpx;
		background: linear-gradient(180deg, #f64756 0%, #fc5800 100%);
		width: 100%;
		display: flex;
		padding: 0 34rpx;
		align-items: center;

		image {
			height: 98rpx;
			width: 98rpx;
		}

		.head-title {
			height: 98rpx;
			margin-left: 20rpx;
			color: #fff;
			display: flex;
			flex-direction: column;

			flex: 1;

			view {
				font-size: 28rpx;
			}

			text {
				font-size: 20rpx;
				line-height: 30rpx;
			}
		}
	}

	.center {
		height: 544rpx;
	}

	.down {
		height: 108rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		view {
			width: 512rpx;
			height: 80rpx;
			background: #ff0000;
			border-radius: 40rpx;
			color: #ffffff;
			font-size: 28rpx;
			line-height: 80rpx;
			text-align: center;
		}
	}
}
</style>
