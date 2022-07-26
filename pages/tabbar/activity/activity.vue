<template>
	<!-- <view class="page " style="background-color: #eeeeee;padding-bottom: 40rpx;">
		<view style="width: 749rpx;position: fixed;z-index: 0;" v-if="scrollTop < 195"><u-swiper :list="swiperList" :height="553" @click="swiperClick"></u-swiper></view>
		<view style="width: 749rpx;height: 553rpx;"></view>
		<view :class="[showTitle ? 'bgbg1' : 'bgbg0']" >
			<view style="font-size: 32rpx;position: absolute;right: 10rpx;top: 26rpx;width: 346rpx;height: 86rpx;line-height: 86rpx;text-align: center;"  :style="{color:showTitle?'white':'black',fontWeight:showTitle?'900':'400'}" @tap="showTitle = true,hezuoChange(0)">
				优质主办方
			</view>
			<view style="position: absolute;top: 24rpx;left: 4rpx;font-weight: 800;width: 376rpx;height: 86rpx;line-height: 86rpx;text-align: center;" :style="{color:showTitle?'black':'white'}" @tap="showTitle = false">
				<text>我的/提交</text>
				<text @click.stop="jumpPersonal" style="display: inline-block;padding: 5rpx 22rpx;border-radius: 25rpx;color: red;margin-left: 20rpx;font-size: 22rpx;height: 34rpx;line-height: 34rpx;"  :style="{color:showTitle?'white':'red',backgroundColor:showTitle?'red':'white'}">发布</text>
			</view>
			<view style="position: absolute;top: 150rpx;padding-bottom: 200rpx;box-sizing: border-box;width: 749rpx;">
				<view style="width:749rpx;margin-left: 20rpx;">
					<u-tabs-swiper bg-color="rgba(0,0,0,0)" height='40' :active-item-style="activeStyle" inactive-color="#fff" :show-bar="false" activeColor="#ff0000" ref="tabs" :list="showTitle?zhuanquList:list2" :current="hezuocurrent" @change="hezuoChange" :is-scroll="true" swiperWidth="740" font-size='22'></u-tabs-swiper>
				</view>
				<view style="margin-top: 50rpx;" v-if="activity_list.length == 0"><u-empty text="暂无数据" mode="list"></u-empty></view>
				<view v-if="!showTitle" style="width: 650rpx;display: flex;background-color: white;margin-top: 20rpx;margin-left: 50rpx;flex-direction: column;border-radius: 50rpx;box-sizing: border-box;" v-for="(item, index) in activity_list" :key="index" @click="jumphuodong(item._id)">
					<view style="">
						<image :src="item.imageValue[0].url" style="width: 650rpx;height: 400rpx;border-top-left-radius: 50rpx;border-top-right-radius: 50rpx;"></image>
					</view>
					<view style="display: flex;flex-direction: column;flex: 1;width: 650rpx;padding: 20rpx;">
						<view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view style="font-weight: 600;width: 420rpx;" class="u-line-1">{{ item.name }}</view>
								<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
								<view v-else style="color: #999;font-size: 22rpx;">
									费用:
									<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>
									元起
								</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view style="color: #999;font-size: 22rpx;width: 420rpx;" class="u-line-1">{{ item.dataTimeStart | date('mm/dd hh:MM') }} 至 {{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
								<view style="color: #fff;font-size: 22rpx;background-color: red;padding: 5rpx 20rpx;border-radius: 15rpx;">{{item.activity_form}}</view>
							</view>
							
							<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
							<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{item.onlyList || '全国'}}</view>
							
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
					
					
					
					<view v-else style="width: 650rpx;display: flex;background-color: white;margin-top: 20rpx;margin-left: 50rpx;flex-direction: column;border-radius: 50rpx;box-sizing: border-box;" v-for="(item1, index1) in scroll_name_list" :key="index1" @tap="$u.route({ url: 'pages/activity/specialArea?id=' + item1.uid })">
						<view style="">
							<image :src="item1.image[0].url" style="width: 650rpx;height: 400rpx;border-top-left-radius: 50rpx;border-top-right-radius: 50rpx;"></image>
						</view>
						<view style="display: flex;flex-direction: column;flex: 1;width: 650rpx;padding: 20rpx;">
							<view>
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view style="font-weight: 600;width: 420rpx;" class="u-line-1">{{ item1.nickName }}</view>
									<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
									<view v-else style="color: #999;font-size: 22rpx;">
										费用:
										<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>
										元起
									</view>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view style="color: #999;font-size: 22rpx;width: 420rpx;" class="u-line-1">{{ item.dataTimeStart | date('mm/dd hh:MM') }} 至 {{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
									<view style="color: #fff;font-size: 22rpx;background-color: red;padding: 5rpx 20rpx;border-radius: 15rpx;">{{item.activity_form}}</view>
								</view>
								
								<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
								<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{item.onlyList || '全国'}}</view>
								
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
		 -->
		
	<view>
		<view>
			<showTips></showTips>
			<view v-if="showHeader" class="status" :style="{ position: headerPosition, top: statusTop, opacity: afterHeaderOpacity }"></view>

			<view v-if="showHeader" class="header" :style="{ position: headerPosition, top: headerTop, opacity: afterHeaderOpacity }">
				<view class="addr">
					<view class="icon location"></view>
					{{ city }}
				</view>

				<view class="input-box">
					<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
					<view class="icon search"></view>
				</view>
				
				<view style="flex: 1;margin-left: 15rpx;">
					<u-button  @click.stop="jumpPersonal"  :ripple="true" ripple-bg-color="#909399" size="mini" shape="circle" type="primary">发布</u-button>
				</view>
				
			</view>

			<view v-if="showHeader" class="place"></view>

			<view class="swiper">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" @change="swiperChange">
						<swiper-item v-for="(swiper, idx) in swiperList" :key="swiper.id"><image :src="swiper.image" mode="aspectFill" @click="swiperClick(idx)"></image></swiper-item>
					</swiper>
					<view class="indicator"><view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view></view>
				</view>
			</view>

			<view class="category-list">
				<view class="category" v-for="(row, index) in list1" :key="index" @tap="jumptitletag(row.name, index)">
					<view class="img"><image :src="imageChange(index)"></image></view>
					<view class="text">{{ row.name }}</view>
				</view>
			</view>

			<!-- <view class="banner" @click.stop="jumpPersonal"><image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/11339943.png"></image></view> -->
			<view class="promotion">
				<u-tabs-swiper activeColor="#ff0000" ref="tabs" :list="zhuanquList" :current="hezuocurrent" @change="hezuoChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
				<scroll-view :scroll-x="true" style="display: flex;width: 100%;white-space: nowrap;margin-top: 20rpx;height: 280rpx;" class="navbar">
					<view v-for="(item, index) in scroll_name_list" style="overflow-wrap: break-word;flex: 1;display: inline-block;margin-right: 20rpx;" :key="index">
						<view
							@tap="$u.route({ url: 'pages/activity/specialArea?id=' + item.uid })"
							style="width:180rpx;height: 260rpx;background: #fff;border-radius: 16rpx;display: flex;flex-direction: column;align-items: center;box-shadow: 1rpx 1rpx 10rpx 1rpx ;"
						>
							<image :src="item.image[0].url" style="width: 100%;height: 100%;" mode=""></image>
							<view>{{ item.nickName }}</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view><u-tabs-swiper activeColor="#ff0000" ref="tabs" :list="newList" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper></view>
			<view style="margin-top: 50rpx;" v-if="activity_list.length == 0"><u-empty text="暂无数据" mode="list"></u-empty></view>
			<view style="width: 100%;display: flex;padding: 20rpx;background-color: white;" v-for="(item, index) in activity_list" :key="index" @click="jumphuodong(item._id)">
				<view style="position: relative;">
					<image :src="item.imageValue[0].url" style="width: 300rpx;height: 200rpx;"></image>
					<view style="position: absolute;top: 0;left: 0;padding: 5rpx 10rpx;color: white;background-color: red;font-size: 24rpx;">{{ item.subtype }}</view>
				</view>
				<view style="display: flex;flex-direction: column;flex: 1;margin-left: 15rpx;width: 400rpx;">
					<view>
						<view style="font-weight: 600;" class="u-line-1">{{ item.name }}</view>
						<view style="color: #999;font-size: 22rpx;">{{ item.dataTimeStart | date('mm/dd hh:MM') }} 至 {{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
						<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
						<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{ item.onlyList }}</view>
						<view style="color: #000000;font-size: 22rpx;">{{ item.activity_form }}</view>
						<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
						<view v-else style="color: #999;font-size: 22rpx;">
							费用:
							<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>
							元起
						</view>
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

		<!-- <view>
			<showTips></showTips>
		</view>
		<view @click="aaaaa" style="width: 750rpx;background-color: white;padding: 40rpx;display: flex;align-items: center;justify-content: space-between;" >
			<u-search  placeholder="搜索" v-model="keyword" :show-action="false"></u-search>
			<u-button  @click.stop="jumpPersonal" :ripple="true" ripple-bg-color="#909399" size="medium" shape="circle" type="primary">发布</u-button>
		</view>
		<view
			style="width: 720rpx;background-color: white;display: flex;justify-content: space-around;align-items: center;flex-wrap: wrap;align-items: center;margin: 0 auto;margin-top: 10rpx;padding: 20rpx;border-radius: 12rpx;"
		>
			<view style="width: 20%;background-color: #ffffff;padding: 20rpx;" v-for="(item, index) in list1" :key="index" @tap="jumptitletag(item.name, index)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<image :src="imageChange(index)" style="width: 60rpx;height: 60rpx;" mode=""></image>
					<view style="font-size: 20rpx;font-weight: 700;">{{ item.name }}</view>
				</view>
			</view>
		</view>

		<view style="width: 720rpx;margin: 10rpx auto;"><u-swiper :list="swiperList" :height="403" @click="swiperClick"></u-swiper></view>

		<view style="width: 720rpx;border-radius: 12rpx;background-color: white;margin: 0rpx auto;padding: 20rpx;margin-bottom: 10rpx;">
			<u-tabs-swiper activeColor="#ff0000" ref="tabs" :list="zhuanquList" :current="hezuocurrent" @change="hezuoChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			<scroll-view :scroll-x="true" style="display: flex;width: 100%;white-space: nowrap;margin-top: 20rpx;height: 280rpx;" class="navbar">
				<view  v-for="(item, index) in scroll_name_list" style="overflow-wrap: break-word;flex: 1;display: inline-block;margin-right: 20rpx;" :key="index" >
					<view
						@tap="$u.route({ url: 'pages/activity/specialArea?id=' + item.uid })"
						style="width:180rpx;height: 260rpx;background: #fff;border-radius: 16rpx;display: flex;flex-direction: column;align-items: center;box-shadow: 1rpx 1rpx 10rpx 1rpx ;"
					>
						<image :src="item.image[0].url" style="width: 100%;height: 100%;" mode=""></image>
						<view>{{item.nickName}}</view>
					</view>
				</view>
			</scroll-view>
		</view>


		<view>
				<u-tabs-swiper activeColor="#ff0000" ref="tabs" :list="newList" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view style="margin-top: 50rpx;" v-if="activity_list.length == 0"><u-empty text="暂无数据" mode="list"></u-empty></view>
		<view style="width: 100%;display: flex;padding: 20rpx;background-color: white;" v-for="(item, index) in activity_list" :key="index" @click="jumphuodong(item._id)">
			<view style="position: relative;">
				<image :src="item.imageValue[0].url" style="width: 300rpx;height: 200rpx;"></image>
				<view style="position: absolute;top: 0;left: 0;padding: 5rpx 10rpx;color: white;background-color: red;font-size: 24rpx;">{{ item.subtype }}</view>
			</view>
			<view style="display: flex;flex-direction: column;flex: 1;margin-left: 15rpx;width: 400rpx;">
				<view>
					<view style="font-weight: 600;" class="u-line-1">{{ item.name }}</view>
					<view style="color: #999;font-size: 22rpx;">{{ item.dataTimeStart | date('mm/dd hh:MM') }} 至 {{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
					<view style="color: #999;font-size: 22rpx;" class="u-line-1" v-if="item.region && item.detailedAddress">{{ item.region }}{{ item.detailedAddress }}</view>
					<view style="color: #999;font-size: 22rpx;" v-else>服务于：{{item.onlyList}}</view>
					<view style="color: #000000;font-size: 22rpx;">{{item.activity_form}}</view>
					<view v-if="item.ticketList[0].price == '免费'" style="color: #999;font-size: 22rpx;">费用:{{ item.ticketList[0].price }}</view>
					<view v-else style="color: #999;font-size: 22rpx;">
						费用:
						<text style="font-size: 26rpx;color: #000000;font-weight: 900;">{{ pricebijiao(item.ticketList) }}</text>
						元起
					</view>
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
		</view> -->
		<pop-phone></pop-phone>
		<u-tabbar :list="tabbar"></u-tabbar>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
import permiss from '@/common/logic/permiss';
import fabEnroll from '@/components/fabEnroll.vue';
import showTips from '@/components/redflower-showTips.vue';
import amap from '@/common/SDK/amap-wx.js';
// import uQRCode from '@/uni_modules/u-qrcode';
export default {
	components: {
		fabEnroll,
		showTips
	},
	data() {
		return {
			enrollimage: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/636.png',
			enrollimage2: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0706180531.png',
			tabbars: [
				{
					name: '发布活动',
					subname: '免费发布',
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/111.png',
					url: 'pages/release/publish_activity'
				},
				{
					name: '我的活动',
					subname: '查看数据',
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/222.png',
					url: 'pages/release/activity_management'
				},
				{
					name: '扫码核销',
					subname: '核销验证',
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/333.png',
					url: ''
				}
			],
			apiInfo: null,
			result: [],
			scrollTop:0,
			size: 156,
			windowHeight: 0,
			empty: false,
			scanCode: [],
			where: {},
			scroll_name_list: [],
			imgarr: [
				{ type: 'video', src: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/jintao/swiper1.mp4' },
				{ type: 'video', src: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/jintao/swiper2.mp4' },
				{ type: 'video', src: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/jintao/swiper3.mp4' }
			],
			swiperList: [],
			swiperListLength: 1,
			list1: [
				{ name: '会议招商' },
				{ name: '创业项目' },
				{ name: '企业服务' },
				{ name: '互联网' },
				{ name: '求购信息' },
				{ name: '旅游咨询' },
				{ name: '运动/户外' },
				{ name: '丽人' },
				{ name: '亲子活动' },
				{ name: '其它专区' }
			],
			
			activeStyle:{
				padding:'0rpx 20rpx',
				background:'#fff',
				borderRadius:'30rpx'
			},
			list2: [
				{ name: '精选推荐' },
				{ name: '会议招商' },
				{ name: '创业项目' },
				{ name: '企业服务' },
				{ name: '互联网' },
				{ name: '求购信息' },
				{ name: '旅游咨询' },
				{ name: '运动/户外' },
				{ name: '丽人' },
				{ name: '亲子活动' },
				{ name: '其它专区' }
			],
			list: [
				{ name: '推荐' },
				{ name: '会议招商' },
				{ name: '运动健身' },
				{ name: '问卷预约' },
				{ name: '户外郊游' },
				{ name: '报名招生' },
				{ name: '信息登记' },
				{ name: '活动聚会' },
				{ name: '课程培训' },
				{ name: '演出赛事' },
				{ name: '节日活动' },
				{ name: '美食活动' }
			],
			newList: [{ name: '精选推荐' }],
			tabs: [{}, {}, {}, {}, {}],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			code: '', // 邀请码
			tabbar: {},
			constants: {},
			search_word: '', // 搜索框
			publish_activity_pop_show: false, // 发布 填写邀请码弹窗
			activity_list: [], // 活动列表
			openid: '',
			status_desc: {
				0: '免费抢票',
				1: ''
			},
			subMchId: '',
			state: '未认证',
			userinfo: {},
			hezuocurrent: 0,
			zhuanquList: [],
			// zhuanquList: [{ name: '平台合作方' }, { name: '优质招商主办方' }, { name: '优质媒体主办方' }],
			tagDesc: {
				push: { class: 'self-red', text: '推荐' },
				handpick: { class: 'self-orange', text: '精选' }
			},
			// 新
			showHeader: true,
			afterHeaderOpacity: 1, //不透明度
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			nVueTitle: null,
			city: '北京',
			currentSwiper: 0,
			showTitle:false,
			loadingText: '正在加载...'
		};
	},
	computed: {
		pricebijiao() {
			return function(item) {
				let idx = item.map(x => Number(x.price));
				return Math.min(...idx);
			};
		},
		imageChange() {
			return function(index) {
				return 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/5' + index + '.png';
			};
		}
	},
	onPullDownRefresh() {
		this.getActivityList('all');
		this.gethuodong();
		this.sysUserInfo();
	},
	onPageScroll(res) {
		uni.$emit('onPageScroll', res.scrollTop);
	},
	onLoad() {
		
		// console.log(getApp().globalData.USERINFO,'userinfo');
		this.getActivityList('all');
		this.gethuodong();
		this.sysUserInfo();
		uni.getSystemInfo({
			success: res => {
				this.windowHeight = res.screenHeight;
			}
		});
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID;
		this.tabbar = this.$store.state.tab;
		db.collection('arrondi_tag')
			.get()
			.then(res => {
				res.result.data[0].tag.forEach(item => {
					this.zhuanquList.push({
						name: item
					});
				});
				this.hezuoChange(0);
			});
		db.collection('enrollSwiper')
			.orderBy('sort', 'asc')
			.field({ imageValue: true, uid: true })
			.get()
			.then(res => {
				let swiper = res.result.data;
				swiper.forEach((item, index) => {
					this.swiperList.push({
						image: item.imageValue[0].url,
						url: item.uid,
						id: index
					});
				});
			});
			
		// 新
		this.amapPlugin = new amap.AMapWX({
			//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			key: '349c9847cee4304fb74f06fc7c88b059'
		});
		//定位地址
		this.amapPlugin.getRegeo({
			success: data => {
				console.log(data, 'dddd');
				this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
				// #ifdef APP-PLUS
				this.nVueTitle.postMessage({ type: 'location', city: this.city });
				// #endif
			}
		});
	},
	onShow() {
		// this.getActivityList('all');
		// this.hezuocurrent = 0
		this.gethuodong();
		// this.sysUserInfo();
		permiss(this).then(() => {
			this.tabbar = this.$store.state.tab;
			console.log(this.tabbar, '444');
		});
		uni.getSystemInfo({
			success: res => {
				this.windowHeight = res.screenHeight;
			}
		});
		this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID;
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: '',
			path: '/pages/tabbar/activity/activity'
		};
	},
	methods: {
		tapzhuban(){
			console.log(111);
			this.showTitle = !this.showTitle
		},
		jumpPersonal() {
			this.$u.route({ url: 'pages/activity/personal' });
			// if (!getApp().globalData.OPENID) {
			// 	this.$u.route({url:'pages/login/login'})
			// } else {

			// 	db.collection('user').where({openId:this.openid}).get().then(res=>{
			// 		console.log(res,'uuu');
			// 		if(!res.result.data[0].phone){
			// 			this.$store.commit('imporIsAutoPhone',true)
			// 			uni.reLaunch({
			// 				url:"/pages/tabbar/activity/activity"
			// 			})
			// 		}else{
			// 			this.$u.route({ url: 'pages/activity/personal' });
			// 		}
			// 	})
			// }

			// console.log('手机状态',this.$store.state.isAutoPhone);
		},
		hezuoChange(index) {
			this.hezuocurrent = index;
			if(index == 0){
				this.getActivityList('all')
			}else{
				this.getActivityList(this.list2[index].name)
			}
			// if(typeof index == 'undefined'){
			// 	index = 0
			// }
			// console.log(index, 'tttt');
			// if(!this.showTitle){
			// 	if(index == 0){
			// 		this.getActivityList('all')
			// 	}else{
			// 		this.getActivityList(this.list2[index].name)
			// 	}
			// }else{
			// 	db.collection('arrondi_list')
			// 		.where({ type: this.zhuanquList[0].name })
			// 		.get()
			// 		.then(res => {
			// 			this.scroll_name_list = res.result.data;
			// 			console.log(this.scroll_name_list, 'list');
			// 		});
			// }
			
			db.collection('arrondi_list')
				.where({ type: this.zhuanquList[index].name })
				.get()
				.then(res => {
					this.scroll_name_list = res.result.data;
					console.log(this.scroll_name_list, 'list');
				});
		},
		jumpreleaseActivities() {
			this.$u.route({ url: 'pages/activity/releaseActivities?item=' + JSON.stringify(this.userinfo) });
		},
		jumptitletag(item, index) {
			let data = {
				item: item,
				index: index
			};
			this.$u.route({ url: 'pages/activity/titleClassify?type=' + JSON.stringify(data) });
		},
		loadDataCode(outTradeNo) {
			db.collection('enroll_info')
				.where({
					outTradeNo: outTradeNo,
					'dataList.openid': this.openid,
					state: '已预约'
				})
				.get()
				.then(res => {
					let result = res.result.data[0];
					console.log(result, 'result');
					if (!result) {
						uni.showToast({
							title: '未通过',
							icon: 'none'
						});
						return;
					} else {
						db.collection('enroll_info')
							.doc(result._id)
							.update({
								state: '已核销'
							})
							.then(res => {
								uni.showToast({
									title: '核销成功',
									icon: 'none'
								});
								return;
							});
					}
				});
		},
		getscanCode() {
			wx.scanCode({
				onlyFromCamera: true, // 只允许从相机扫码
				success: res => {
					// console.log("扫码成功："+JSON.stringify(res))
					let result = JSON.stringify(res);
					this.scanCode = JSON.parse(result);
					console.log(this.scanCode, 'dddd');
					// 扫码成功后  在此处理接下来的逻辑
					setTimeout(() => {
						this.loadDataCode(this.scanCode.result);
					}, 500);
				}
			});
		},
		jumpTabbars(item) {
			console.log(item, 'dsadas');
			if (item.name == '扫码核销') {
				this.getscanCode();
			}
			if (item.name == '暂未开放') {
				uni.showToast({
					title: '敬请期待',
					icon: 'none'
				});
			}
			if (uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID) {
				this.$u.route({ url: item.url });
			} else {
				this.userLogin();
			}
		},
		async baomingnum(id) {
			let count = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.count();
			return count.result.total;
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
							uni.setStorage({
								key: 'tokenorid',
								data: e
							});
							this.sysUserInfo();
							this.gethuodong();
						})
						.catch(err => {
							console.log('错误', err);
						});
				}
			});
		},
		postuser(form) {
			uniCloud
				.callFunction({
					name: 'postuser',
					data: { ...form }
				})
				.then(res => {
					console.log(res);
				});
		},
		sysUserInfo() {
			//拿数据
			this.$u.api
				.getUserInfo()
				.then(e => {
					console.log(e, 'tabbbbbbb');
					this.userinfo = e;
					getApp().globalData.USERINFO = e;
					getApp().globalData.OPENID = e.openId;
					getApp().globalData.headImgUrl = e.headImgUrl;
					var form = {};
					if (e.hasSupplierAccount && typeof e.mchidApplyDTO != 'undefined' && e.mchidApplyDTO.applymentState == 7) {
						this.state = '已认证';
						form = { ...e, state: '已认证', subMchId: e.mchidApplyDTO.subMchid };
						this.postuser(form);
						return;
					} else {
						form = { ...e, state: this.state, subMchId: this.subMchId, supplierId: '' };
						this.postuser(form);
					}
					uni.setStorageSync({
						key: 'userinfoKey',
						data: e
					});

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
		jumphuodong(id) {
			this.$u.route({ url: 'pages/activity/activity_detail?id=' + id });
			// if(this.empty){
			// 	this.$u.route({url: 'pages/tabbar/activity/huodong?id='+id})
			// }else{
			// 	this.$u.route({url: 'pages/activity/activity_detail?id='+id})
			// }
		},
		// 获取活动列表
		async getActivityList(type) {
			console.log(type, 'opop');
			if (type == 'all') {
				let res = await db
					.collection('activityList')
					.where({ state: dbCmd.neq('已结束'), isSubmit: true, browse: dbCmd.gte(500), shareCount: dbCmd.gte(50) })
					.orderBy('browse', 'asc')
					.get();
				this.activity_list = res.result.data;
				for (let i = 0; i < this.activity_list.length; i++) {
					this.activity_list[i].baomingnum = await this.baomingnum(this.activity_list[i]._id);
					this.$set(this.activity_list[i], i, this.activity_list[i].baomingnum);
				}
				console.log(this.activity_list, 'dlllll');
			} else {
				let res = await db
					.collection('activityList')
					// .where({ state: dbCmd.neq('已结束'), isSubmit: true, browse: dbCmd.gte(500), shareCount: dbCmd.gte(50) })
					.where({ state: dbCmd.neq('已结束'), isSubmit: true, type:type })
					.orderBy('browse', 'desc')
					.get();
				this.activity_list = res.result.data;
				for (let i = 0; i < this.activity_list.length; i++) {
					this.activity_list[i].baomingnum = await this.baomingnum(this.activity_list[i]._id);
					this.$set(this.activity_list[i], i, this.activity_list[i].baomingnum);
				}
			}
		},
		// 获取活动列表
		// getActivityList(type) {
		// 	console.log(type, 'opop');
		// 	if (type == 'all') {
		// 		db.collection('activityList').orderBy('register_date','desc')
		// 			.get()
		// 			.then(res => {
		// 				this.activity_list = res.result.data;
		// 			});
		// 	} else {
		// 		db.collection('activityList')
		// 			.where({ activity_type: type }).orderBy('register_date','desc')
		// 			.get()
		// 			.then(res => {
		// 				this.activity_list = res.result.data;
		// 			});
		// 	}
		// },
		gethuodong() {
			db.collection('enroll_info')
				.where({
					openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
					'dataList.dataTimeStart': dbCmd.lt(Date.now()),
					'dataList.dataTimeEnd': dbCmd.gt(Date.now())
				})
				.get()
				.then(res => {
					this.result = res.result.data[0];
					if (res.result.data[0]) {
						this.empty = true;
					}
				});
		},
		swiperClick(e) {
			console.log(e, 'dddddddaaaaaaa');
			this.$u.route({ url: 'pages/activity/activity_detail?id=' + this.swiperList[e].url });
		},
		open() {},
		close() {},
		// 跳转至发布页面
		jumpToPublish() {
			this.publish_activity_pop_show = false;
			this.$u.route({
				// 关于此路径，请见下方"注意事项"
				url: '/pages/activity/publish_function',
				// 内部已设置以下默认参数值，可不传这些参数
				params: {}
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.current = index;
			if (index == 0) {
				this.getActivityList('all');
			} else {
				this.getActivityList(this.list[index].name);
			}
			// let res = this.$mock.getMockData('/distribution-client/activity/list')
			// this.activity_list = res.data.data.data
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			// this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			// this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
			if (current == 0) {
				this.getActivityList('all');
			} else {
				this.getActivityList();
			}
		},
		// 新

		//搜索跳转
		toSearch() {
			uni.showToast({ title: '功能暂未开放' });
		},

		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		}
	},
	// scroll-view到底部加载更多
	onreachBottom() {}
};
</script>
<style>
page {
	background-color: #ffffff !important;
}
</style>
<style lang="scss" scoped>
@import './common.scss';

// 调整样式 start
.title-tag {
	height: 29rpx;
	border-radius: 3px;
	width: 55rpx;
	padding: 2rpx 7rpx 2rpx 7rpx;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 20rpx;
	white-space: nowrap;
	margin-right: 20rpx;
	&.self-red {
		background-color: rgba(235, 40, 18, 1);
	}
	&.self-orange {
		background-color: rgba(253, 111, 45, 1);
	}
}
.footer-box {
	position: fixed;
	width: 100%;
	bottom: 0;
	margin-bottom: 50px;
	z-index: 800;
	.mod16 {
		border-radius: 0;
		height: 90rpx;
		background-color: rgba(252, 98, 34, 1);
		margin-top: 7rpx;
		width: 750rpx;

		.word11 {
			width: 144rpx;
			height: 36rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 36rpx;
			white-space: nowrap;
			line-height: 36rpx;
		}
	}
}
.category-title {
	display: block;
	overflow-wrap: break-word;
	color: rgba(51, 51, 51, 1);
	font-size: 30rpx;
	white-space: nowrap;
	&.active {
		color: rgba(253, 111, 45, 1);
		position: relative;
		&::after {
			content: '';
			width: 100%;
			height: 5rpx;
			background-color: rgba(253, 111, 45, 1);
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}
// 发布  输入邀请码弹窗
/deep/ .publish-activity-pop-box .u-drawer-content {
	border-radius: 24rpx 24rpx 0 0 !important;
}
.publish-activity-pop-box {
	.publish-activity-pop-box-layer3 {
		height: 554rpx;
		border-radius: 24px 24px 0 0;
		background-color: rgba(255, 255, 255, 1);
		padding-top: 70rpx;
		width: 750rpx;
		.publish-activity-pop-box-layer4 {
			width: 702rpx;
			.publish-activity-pop-box-info1 {
				width: 168rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(51, 51, 51, 1);
				font-size: 28rpx;
				font-family: PingFangSC-Medium;
				white-space: nowrap;
				text-align: center;
			}
			.publish-activity-pop-box-group2 {
				height: 84rpx;
				border-radius: 4px;
				background-color: rgba(242, 242, 242, 1);
				margin-top: 30rpx;
				width: 702rpx;
				.publish-activity-pop-box-word1 {
					width: 168rpx;
					height: 28rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(195, 195, 195, 1);
					font-size: 28rpx;
					white-space: nowrap;
					text-align: right;
				}
			}
			.publish-activity-pop-box-group3 {
				height: 84rpx;
				border-radius: 4px;
				background-color: rgba(242, 242, 242, 1);
				width: 702rpx;
				margin-top: 200rpx;
				.publish-activity-pop-box-box1 {
					height: 84rpx;
					.publish-activity-pop-box-word2 {
						width: 56rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(253, 111, 45, 1);
						font-size: 28rpx;
						white-space: nowrap;
					}
					.publish-activity-pop-box-layer5 {
						height: 84rpx;
						border-radius: 4px;
						background-color: rgba(253, 111, 45, 1);
						width: 351rpx;
						.publish-activity-pop-box-word3 {
							width: 57rpx;
							height: 28rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(255, 255, 255, 1);
							font-size: 28rpx;
							font-family: PingFangSC-Medium;
							white-space: nowrap;
							line-height: 28rpx;
							text-align: right;
						}
					}
				}
			}
		}
	}
}
// 调整样式 end

.page {
	position: relative;
	width: 750rpx;
	background-color: rgba(170, 170, 170, 0.18);
	min-height: 100vh;

	.layer1 {
		z-index: 2;
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		position: relative;

		.group1 {
			width: 750rpx;

			.mod1 {
				height: 128rpx;
				background-color: rgba(255, 255, 255, 1);
				width: 750rpx;
			}

			.mod3 {
				width: 702rpx;
				// height: 67rpx;
				margin: 30rpx 0 0 24rpx;

				.info2 {
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 28rpx;
					white-space: nowrap;
				}

				.icon1 {
					width: 26rpx;
					height: 26rpx;
					margin: 24rpx 0 0 10rpx;
				}
			}

			.mod4 {
				width: 421rpx;
				margin: 24rpx 0 0 24rpx;

				.word2 {
					width: 60rpx;
					height: 30rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(253, 111, 45, 1);
					font-size: 30rpx;
					white-space: nowrap;
					line-height: 30rpx;
				}

				.word3 {
					width: 60rpx;
					height: 30rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 30rpx;
					white-space: nowrap;
					line-height: 30rpx;
				}

				.info3 {
					width: 60rpx;
					height: 30rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 30rpx;
					white-space: nowrap;
					line-height: 30rpx;
				}

				.txt4 {
					width: 120rpx;
					height: 30rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 30rpx;
					white-space: nowrap;
					line-height: 30rpx;
				}
			}

			.mod5 {
				width: 61rpx;
				height: 1rpx;
				background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngda1e41a46cf18ad6df215ef68e0bfd1b9caed85987ade0b48b21296ac9dcfb79) -1rpx -1rpx no-repeat;
				margin: 25rpx 0 0 24rpx;
			}

			.mod8 {
				width: 702rpx;
				margin: 29rpx 0 0 24rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #bebebe;
				&:last-child {
					border-bottom: none;
				}

				.mod9 {
					width: 350rpx;
					height: 226rpx;
					background-color: rgba(216, 216, 216, 1);
					image {
						width: 350rpx;
						height: 206rpx;
					}
				}

				.mod10 {
					width: 339rpx;
					height: 206rpx;

					.info5 {
						width: 332rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(51, 51, 51, 1);
						font-size: 28rpx;
						text-align: justify;
						margin-left: 3rpx;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.word6 {
						width: 333rpx;
						// display: block;
						overflow-wrap: break-word;
						color: rgba(152, 163, 182, 1);
						font-size: 20rpx;
						// white-space: nowrap;
						// line-height: 20rpx;
						text-align: justify;
						margin: 9rpx 0 0 3rpx;
					}
					.box1 {
						width: 339rpx;
						height: 47rpx;
						margin-top: 20rpx;

						.word7 {
							width: 52rpx;
							height: 26rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(253, 111, 45, 1);
							font-size: 26rpx;
							white-space: nowrap;
							line-height: 26rpx;
							text-align: justify;
							margin-top: 16rpx;
						}

						.section4 {
							border-radius: 6rpx;
							border: 2rpx solid rgba(253, 111, 45, 1);
							background-color: rgba(255, 247, 243, 1);
							padding: 3rpx 17rpx;

							.word8 {
								display: block;
								overflow-wrap: break-word;
								color: rgba(253, 111, 45, 1);
								font-size: 24rpx;
								white-space: nowrap;
								// text-align: center;
							}
						}
					}
				}
			}

			.mod11 {
				width: 750rpx;
				height: 1rpx;
				background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf5f25bb8c5d4b8b3fe800ee5ad21f583ae817e62d79974a3bd074a2f06d70553) 100% no-repeat;
				margin-top: 29rpx;
			}
		}

		.word12 {
			z-index: 60;
			position: absolute;
			left: 389rpx;
			top: 682rpx;
			width: 332rpx;
			height: 88rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			line-height: 44rpx;
			text-align: justify;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.word13 {
			z-index: 71;
			position: absolute;
			left: 389rpx;
			top: 1477rpx;
			width: 332rpx;
			height: 88rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			line-height: 44rpx;
			text-align: justify;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.layer4 {
		z-index: 45;
		height: 333rpx;
		background-color: rgba(216, 216, 216, 1);
		width: 750rpx;
		// position: absolute;
		left: 1rpx;
		top: 222rpx;
		padding: 298rpx 0 0 344rpx;

		.section7 {
			width: 60rpx;
			height: 20rpx;
			background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng9dc2b693a725ae8de13874efe2dac09677e2066f46a0472a7b1f79922f8ddee0) -1rpx 0rpx no-repeat;
		}
	}

	.layer5 {
		z-index: 95;
		height: 90rpx;
		background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngfd01be3ad2d10380fc3b55f63c688acec0f53475c1e7ff0438d1f5beacbcc819) 1rpx -1rpx no-repeat;
		width: 751rpx;
		position: absolute;
		left: -1rpx;
		top: 1780rpx;
		padding: 13rpx 0 0 205rpx;
	}
}

// 新
page {
	position: relative;
	background-color: #fff;
}

.pullDown-effects {
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image {
		width: 100%;
		height: 36vw;
	}
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
.header {
	width: 100%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 92%;
		height: 403rpx;

		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			height: 403rpx;
			// height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
					height: 443rpx;
					// height: 30.7vw;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/2);
				}
			}
		}
	}
}

.category-list {
	width: 92%;
	margin: 0 4%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 20%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 9vw;
				height: 9vw;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner {
	width: 92%;
	margin: 40upx 4%;
	image {
		width: 100%;
		height: 25vw;
		border-radius: 20vw;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}
.promotion {
	width: 92%;
	margin: 0 4%;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		// justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
.bgbg0{
	display: flex;flex-direction: column;justify-content: space-around;height: 500rpx;width: 749rpx;background-image: url('https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bgbg0.png');background-size: cover;margin-top: -60rpx;z-index: 10;position: relative;box-sizing: border-box;
}
.bgbg1{
	display: flex;flex-direction: column;justify-content: space-around;height: 500rpx;width: 749rpx;background-image: url('https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bgbg1.png');background-size: cover;margin-top: -60rpx;z-index: 10;position: relative;box-sizing: border-box;
}
</style>
