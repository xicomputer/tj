<template>
	<view class="container">
		<commonShops ref="childa3"></commonShops>
		<commonShopsCode ref="childaCode"></commonShopsCode>

		<!--    <uni-nav-bar v-show="topNav" :fixed="true" color="#333" background-color="#ffffff" :status-bar="true">-->
		<!--      <view slot="left">-->
		<!--        <view class="xp-box">-->
		<!--          <view>推荐官· <text>好物推荐小程序</text></view>-->
		<!--        </view>-->
		<!--      </view>-->
		<!--    </uni-nav-bar>-->
		<!--    -->
		<!--    <view >-->
		<!--      -->
		<!--    </view>-->
		<!--    <uni-nav-bar style="background-color: red;" left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>-->
		<view class="home-or-black" :style="{ height: titleHeight + 'px' }">
			<!--      <u-icon v-if="ishome"  @tap="homeorblack"  class="swing" name="arrow-left" color="#999" size="32"></u-icon>-->
			<!--      <u-icon v-if="!ishome" @tap="homeorblack"   class="swing" name="home-fill" color="#999" size="38"></u-icon>-->
			<image @tap="homeorblack" class="swing" src="/static/zyy.png"></image>
			<view class="font-center u-flex u-col-center u-row-center" :class="{ showor: topNav }" :style="{ paddingTop: `${status_bar_height}px` }">
				<text>{{ mainInfoMap.nickName }}的主铺</text>
			</view>
		</view>

		<logoPop></logoPop>
		<u-popup v-model="enterBT" mode="center" border-radius="10">
			<!--  待审核    -->
			<view class="pop-state0" v-if="sqState == '0'">
				<text>您已申请，请耐心等待审核</text>
				<button @tap="enterBT = false" type="primary" size="mini">游览TA的店铺</button>
			</view>
			<!--  审核通过    -->
			<view class="pop-state1" v-else-if="sqState == '1'">
				<text class="u-font-xl">恭喜你已经成为TA的帮推官</text>
				<text @tap="jumpexplain" class="orange">帮推官如何进行带货</text>
				<button @tap="enterBT = false" type="primary" size="mini">开始带货</button>
			</view>
			<!--  拒绝    -->
			<view class="pop-center" v-else-if="sqState == '2'">
				<text>很抱歉，您未通过审核</text>
				<!--          <text>拒绝原因：xxxxxxxx</text>-->
				<view class="box">
					<textarea maxlength="100" @input="numerical" v-model="refundReason" class="texta" placeholder="请输入申请理由" />
					<text>{{ figure }}/100</text>
				</view>

				<view class="btn-box">
					<view @tap="Jclose">取消</view>
					<view @tap="apply">重新申请</view>
				</view>
			</view>
			<view v-else class="pop-center">
				<text>申请成为TA的帮推官</text>
				<view class="box">
					<textarea maxlength="100" @input="numerical" v-model="refundReason" class="texta" placeholder="请输入申请理由" />
					<text>{{ figure }}/100</text>
				</view>
				<view class="btn-box">
					<view @tap="Jclose">取消</view>
					<view @tap="apply">立即申请</view>
				</view>
			</view>
		</u-popup>

		<!--    <view class="wrap">-->
		<!--      <view class="u-avatar-wrap">-->
		<!--        <image sty class="u-avatar-demo" :src="avatar" mode="aspectFill"></image>-->
		<!--      </view>-->
		<!--      <view @tap="chooseAvatar">进入裁剪页</view>-->
		<!--    </view>-->

		<view class="x-head">
			<image style="" :src="mainInfoMap.backgroundImage || defuImg" mode=""></image>
			<!-- <view class="addbig u-border-bottom"> -->
			<view style="position: relative;">
				<view style="width: 750rpx;height: 400rpx;border-radius: 20rpx 20rpx 0 0;background-color: #fff;margin: 0 auto;margin-top: -80rpx;">
					<!-- <image @tap="myShop(detailObj.userInfo.userId)" :src="detailObj.userInfo.headImgUrl" style="width: 110rpx;height: 110rpx;margin-top: -30rpx;margin-left: 20rpx;
				border-radius: 15rpx;" mode=""></image> -->
					<image
						:src="mainInfoMap.headImgUrl"
						style="width: 110rpx;height: 110rpx;margin-top: -30rpx;margin-left: 40rpx;
				border-radius: 15rpx;"
						mode=""
					></image>
					<view style="position: absolute;top: 100rpx;left: 40rpx;">
						<text class="tag1" style="font-size: 30rpx;font-weight: 900;">{{ mainInfoMap.nickName }}</text>
						<view class="tag2" style="color: #999999;font-size: 24rpx;" >
							<text>成员：{{ mainInfoMap.userCount }}</text>

							<text v-if="mainInfoMap.tj">
								<text class="lr" style="margin: 0 10rpx;color: #999999;">|</text>
								<text>帮推官：{{ mainInfoMap.promotionUserCount }}</text>
							</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;width: 300rpx;justify-content: space-around;position: absolute;right: 30rpx;top: 10rpx;">
						<!-- <view class="box"> -->
							<view class="pyq fx" @tap="downImg">
								<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/000000.png"mode="aspectFill"></image>
								<text>海报</text>
							</view>
							<view class="pyq fx" @tap="downCode" style="display: flex;flex-direction: column;align-items: center;">
								<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/11111.png"mode="aspectFill"></image>
								<text>主铺码</text>
							</view>
							<button class="fx" catchtap="share" style="padding: 0;margin: 0;" open-type="share">
								<image src="../../../static/shareicon.png"mode="aspectFill"></image>
								<text>分享</text>
							</button>
						<!-- </view> -->
					</view>
					<view style="position: absolute;left: 40rpx;top: 200rpx;">
						<navigator hover-class="none" url="/pages/my/gzh/why" style="background-color: #e8e5e5;padding: 10rpx;border-radius: 10rpx;">
							<text>电商SAAS平台分销+分销+带货平台</text>
						</navigator>
						<navigator hover-class="none" url="/pages/my/gzh/gzh"  style="background-color: #e8e5e5;padding: 10rpx;margin: 10rpx 0;border-radius: 10rpx;width: 280rpx;">
							<text>好友推荐官该怎么样用</text>
						</navigator>
						<view hover-class="none" style="display: flex;flex-direction: column;align-items: center;background-color: #e8e5e5;padding: 10rpx;border-radius: 10rpx;width:132rpx;">
							<button open-type="contact" style="display: flex;flex-direction: column;align-items: center;margin-left: 0;justify-content: space-between;">
								<text style="font-size: 28rpx;">官方客服</text>
							</button>
						</view>
					</view>
				
					<!-- <view style="position: absolute;right: 50rpx;top: 10rpx;display: flex;flex-direction: column;align-items: center;">
					<image src="../../../static/wxiocn.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
					<text style="font-size: 20rpx;">分享</text> -->
						<!-- <view>
					      <view class="x-button" @tap="attention"  v-if="!detailObj.hasAttention == 1"  >一键订阅</view>
					      <view class="x-button active"  v-if="detailObj.hasAttention"> 已订阅</view>
					    </view> -->
						<view class="tpbj" v-if="oneself == mainUserId" style="position: absolute;right: 50rpx;top: 100rpx;">
							<view class="x-button-img" @tap="chooseAvatar" >设置背景</view>
						</view>
						<view v-if="oneself != mainUserId " class="x-button active" style="position: absolute;right: 50rpx;top: 100rpx;">已订阅</view> 
						<!-- </view>
				<!-- </view> -->
					<!-- <view class="become u-border-bottom" v-show="!isAttention"> -->
					<!-- <view class="become u-border-bottom" >
						<view style="margin-top: 10rpx;">
							<text>关注公众号，掌握实时活动和订单通知</text>
							<view class="x-button" @tap="jumpAttention">+关注</view>
						</view>
					</view> -->
					<!-- <view style="display: flex;align-items: center;width: 100%;justify-content: space-around;margin-top: 20rpx;">
						
							<view class="pyq fx" @tap="downImg">
								<image src="../../../static/pyq.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
								<text>朋友圈</text>
							</view>
							<view class="pyq fx" @tap="downCode" style="display: flex;flex-direction: column;align-items: center;">
								<image src="../../../static/qrcodezhupu.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
								<text>主铺二维码</text>
							</view>
							<button class="fx" catchtap="share" style="padding: 0;margin: 0;" open-type="share">
								<image src="../../../static/wxiocn.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
								<text>分享</text>
							</button>
						
					</view> -->

					<!-- <view style="width: 100%;margin-top: 30rpx;display: flex;align-items: center;height: 60rpx;border-top: 1px solid #ebebeb;">
						<view style="margin-left: 20rpx;display: flex;align-items: center;">
							<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/detailicon.png" style="width: 30rpx;height: 30rpx;"></image>
							<text style="margin-left: 10rpx;font-size: 24rpx;color: #999;">七天无理由</text>
						</view>
						<view style="margin-left: 20rpx;display: flex;align-items: center;">
							<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/detailicon.png" style="width: 30rpx;height: 30rpx;"></image>
							<text style="margin-left: 10rpx;font-size: 24rpx;color: #999;">免运费</text>
						</view>
						<view style="margin-left: 20rpx;display: flex;align-items: center;">
							<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/detailicon.png" style="width: 30rpx;height: 30rpx;"></image>
							<text style="margin-left: 10rpx;font-size: 24rpx;color: #999;">品质保障</text>
						</view>
						<view style="margin-left: 20rpx;display: flex;align-items: center;">
							<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/detailicon.png" style="width: 30rpx;height: 30rpx;"></image>
							<text style="margin-left: 10rpx;font-size: 24rpx;color: #999;">好友推荐</text>
						</view>
					</view> -->
				</view>
				<u-gap height="15" bg-color="rgb(247,247,247)"></u-gap>
			<!-- 	<view
					style="width: 706rpx;height: 66rpx;margin: 0rpx auto;border-radius: 50rpx;border: 1px solid red;background-color: #fff;color: red;line-height: 66rpx;text-align: center;"
				>
					推荐官：好物分享一起团购
				</view> -->
				<!-- <image :src="mainInfoMap.headImgUrl" mode=""></image> -->
				<!-- <text class="tag1">{{mainInfoMap.nickName}}</text>
          <view class="tag2" v-if="isBenren">
            <text>成员 {{mainInfoMap.userCount}}</text>
            <text v-if="mainInfoMap.tj">
              <text class="lr">|</text>
              <text>	帮推官 {{mainInfoMap.promotionUserCount}}</text>
            </text>
          </view> -->
				<!-- </view> -->
				<!-- <view class="box-right">
          <view class="box"> -->
				<!-- 	<view>
                <image src="../../../static/msg.png" mode=""></image>
                <text>咨询</text>
              </view> -->
				<!--  	<view class="pyq" @tap="downImg">
                  <image src="../../../static/pyq.png" mode=""></image>
                  <text>朋友圈</text>
                </view>
				<view class="pyq" @tap="downCode" style="display: flex;flex-direction: column;align-items: center;">
				  <image src="../../../static/qrcodezhupu.png" mode=""></image>
				  <text>主铺二维码</text>
				</view>
            <button class="fx" catchtap="share"
                    open-type="share">
              <image src="../../../static/wxiocn.png" mode=""></image>
              <text>分享</text>
            </button>
          </view> -->

				<!-- 	<view>
              <view class="x-button" @tap="attention"  v-if="!detailObj.hasAttention == 1"  >一键订阅</view>
              <view class="x-button active"  v-if="detailObj.hasAttention"> 已订阅</view>
            </view> -->
				<!-- <view class="tpbj" v-if="oneself == mainUserId">
            <view class="x-button-img" @tap="chooseAvatar" >编辑图片</view>
          </view>
          <view v-if="oneself != mainUserId " class="x-button active" > 已订阅</view>
        </view> -->
			</view>
		</view>
		<!-- <view style="text-align: center; font-size: 26rpx; font-weight: bold; color: #FF0000; margin-top: 20rpx;"> 精 心 为 您 推 荐 以 下 商 品</view> -->
		<!-- <view style="text-align: center; font-size: 26rpx; font-weight: bold; color: #FF0000; margin-top: 20rpx;">
		<text v-if="mainInfoMap.tj" class="x-btn"> 推荐官 </text>
		<text v-else-if="mainInfoMap.bt" class="x-btn">帮推官</text>
		<text v-else class="x-btn">团员 </text>
		：好物分享一起团购
	</view> -->
		<!-- <image style="height: 20rpx; width: 100%;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/xssj/MMM.png" mode=""></image>
    <view class="become u-border-bottom"  v-show="!isAttention && !friend_circle" >
      <view  >
        <text>关注公众号，掌握实时活动和订单通知</text>
        <view class="x-button" @tap="jumpAttention" >+关注</view>
      </view>
    </view> -->

		<view class="x-body" style="background-color: #fff;width: 100%;height: 100%;">
			<view class="body-list">
				<view class="body-item" v-for="(item, index) in orderList" :key="index" @tap.stop="jumpDetails(item.activityId, item.promotionId)">
					<view class="box-top">
						<!-- <image :src="mainInfoMap.headImgUrl" mode=""></image> -->
						<view class="recommend-name">
							<view class="lsadd">
								<text class="xj1">{{ mainInfoMap.nickName }}</text>
								<!--		 						<text v-if="mainInfoMap.role == 'BT' "  class="x-btn">帮推官 </text>-->
								<!--		 						<text v-if="mainInfoMap.role == 'TJ' && mainInfoMap.internal == true  "  class="x-btn">商家推荐官</text>-->
								<!--		 						<text v-if="mainInfoMap.role == 'TJ' && mainInfoMap.internal == false  "  class="x-btn">推荐官</text>-->

								<text v-if="mainInfoMap.tj" class="x-btn">推荐官</text>
								<text v-else-if="mainInfoMap.bt" class="x-btn">帮推官</text>
								<text v-else class="x-btn">团员</text>
							</view>
							<view class="x-info">
								<text>{{ item.promotionTime | mintime }}发布</text>
								<text>{{ item.activity.browseCount }}人浏览</text>
								<!-- <text>{{mainInfoMap.userCount}}成员 </text> -->
							</view>
						</view>
					</view>
					<view class="x-center">
						<text class="u-line-4">{{ item.activity.introduce }}</text>
						<view class="goods-info">
							<view class="box-img" v-for="(item2, index2) in item.activity.commodity.fileList" :key="index2">
								<view>
									<image class="img-detail" :src="item2.fileUrl" mode=""></image>
									<image v-if="item2.location == 0" class="img-off" src="/static/bf.png"></image>
								</view>
							</view>
						</view>

						<view class="goods-content">
							<view class="tag2">
								<text class="tag1 u-line-2">{{ item.activity.commodity.commodityName }}</text>
								<view>物流发货</view>
							</view>
							<text class="tag3">￥{{ item.activity.commodity.showPrice }}</text>
						</view>
					</view>
					<view class="x-down">
						<!-- 	<view class="x-down-item" v-for="(item2,index2) in item.operationList" :key="index2">
                <view>
                  <text>{{index2}}</text>
                  <image :src="item2.headImgUrl" mode=""></image>
                  <text>{{item2.operationTime |mintime}}</text>
                  <text>{{item2.operation== 'browse' ? '浏览': item2.operation== 'promotion' ? '帮卖 ':'购买' }}</text>
                </view>
              </view> -->

						<swiper
							disable-touch="true"
							:display-multiple-items="3"
							circular="true"
							autoplay="true"
							interval="2000"
							duration="500"
							vertical="true"
							v-if="item.activity.operationList && item.activity.operationList.length > 3"
						>
							<swiper-item class="x-down-item" v-for="(item2, index2) in item.activity.operationList" :key="index" @touchmove.stop="stopTouchMove">
								<view>
									<!-- <text>{{index2}}</text> -->
									<image :src="item2.headImgUrl" mode=""></image>
									<text>{{ item2.operationTime | mintime }}</text>
									<text>{{ item2.operation == 'browse' ? '查看了商品' : '购买了商品' }}</text>
								</view>
							</swiper-item>
						</swiper>
						<view class="x-last">
							<text v-if="item.activity.status == 1">未开始</text>
							<text :style="{ color: item.activity.commodity.status == 3 ? '#999999' : '' }" v-if="item.activity.status == 2">
								{{ item.activity.commodity.status == 3 ? '已售罄' : '正在售卖中' }}
							</text>
							<text v-if="item.activity.status == 3">活动已结束</text>

							<view class="div-line" v-if="item.activity.status != 1">
								<u-count-down
									:timestamp="item.activity.endTime | countTime"
									separator="zh"
									font-size="28"
									:color="item.activity.commodity.status == 3 ? '#999999' : '#ff0000'"
									:separator-color="item.activity.commodity.status == 3 ? '#999999' : '#ff0000'"
								></u-count-down>
								<view :style="{ color: item.activity.commodity.status == 3 ? '#999999' : '#ff0000' }">后结束</view>
							</view>
							<!-- 新增-->
							<view class="div-line" v-if="item.activity.status == 1">
								<u-count-down
									:timestamp="item.activity.startTime | countTime"
									separator="zh"
									font-size="30"
									color="#ff0000"
									separator-color="#ff0000"
								></u-count-down>
								<view style="color: #ff0000;">后开始</view>
							</view>

							<button
								catchtap="share"
								id="mainShopDetail"
								:data-price="item.activity.commodity.showPrice"
								:data-title="item.activity.commodity.commodityName"
								:data-img="item.activity.commodity.thumbnail"
								:data-activityId="item.activityId"
								:data-promotionId="item.promotionId"
								open-type="share"
							>
								<image src="../../../static/wxiocn.png" mode=""></image>
								<text>分享</text>
							</button>
						</view>
					</view>
				</view>
				<none-msg :info="tsmsg" :goodsno="true" v-if="!orderList.length"></none-msg>
			</view>
		</view>
	</view>
</template>

<script>
import configApi from '@/common/logic/config.js';
import utils from '@/common/logic/utils/util.js';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			isBenren: false,
			titleHeight: 0,
			tsmsg: '未发布商品',
			defuImg: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bannerbig.png',
			orderList: [],
			userInfo: {},
			mainUserId: null,
			mainInfoMap: null,
			oneself: {},
			isAttention: false,
			pageNum: 1,
			pageSize: 10,
			total: 0,
			sharenickName: '',
			timestamp: '',
			topNav: false,
			applyrm: true,
			refundReason: '',
			figure: 0,
			enterBT: null,
			sqState: '',
			avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
			ishome: true,
			friend_circle: false,
			status_bar_height: 0
		};
	},
	filters: {
		mintime(value) {
			if (value) {
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
		countTime(value) {
			let clsj = value;
			var oTargetDate = new Date(clsj.replace(/-/g, '/'));
			var nTarget = oTargetDate.getTime();
			var oNowDate = new Date();
			var nNow = oNowDate.getTime();
			// 总秒数
			var total = parseInt((nTarget - nNow) / 1000);
			return total;
		}
	},
	onPageScroll(e) {
		if (e.scrollTop > 50) {
			console.log('滚动距离为：' + e.scrollTop);
			this.topNav = true;
		} else {
			this.topNav = false;
		}
	},
	onLoad(option) {
		let xhg = uni.getSystemInfoSync()['statusBarHeight']; //信号高
		let paddingtop = wx.getMenuButtonBoundingClientRect().top; //胶囊距离顶部高
		let jlheight = wx.getMenuButtonBoundingClientRect().height; //胶囊高

		this.titleHeight = jlheight + (paddingtop - xhg) * 2 + xhg;
		this.status_bar_height = xhg;

		this.mainUserId = option.mainUserId;
		this.scene = option.scene || null;
		this.enterBT = option.enterBT || null;
		console.log('option', option.mainUserId);

		if (option.mainUserId == this.$store.state.authtab.userId) {
			this.isBenren = true;
		}

		let page = getCurrentPages();
		if (page.length <= 1) {
			console.log('外部');
			this.ishome = false;
		} else {
			console.log('正常');
			this.ishome = true;
		}

		let obj = wx.getLaunchOptionsSync();
		if (obj.scene == 1154) {
			this.friend_circle = true;
			console.log('朋友圈进来的', obj.scene);
			this.mainInfo();
			this.homeList();
		} else {
			uni.getStorage({
				key: 'tokenorid',
				success: res => {
					if (this.scene) {
						//二维码进来
						this.pjseo(this.scene);
						console.log('二维码进来');
					} else {
						//分享链接进来
						this.homeList();
						this.mainInfo();
						console.log('分享链接进来');
					}
				},
				fail: err => {
					this.getToken().then(e => {
						if (this.scene) {
							//二维码进来
							this.pjseo(this.scene);
						} else {
							//分享链接进来
							this.homeList();
							this.mainInfo();
						}
					});
				}
			});
		}
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},

	onShow() {},
	onShareTimeline() {
		console.log('朋友圈', this.mainUserId);
		return {
			title: `好友推荐官专推实惠正品好货，手慢既无！`,
			query: 'mainUserId=' + this.mainUserId,
			imageUrl: '/static/goto.jpg'
		};
	},
	onShareAppMessage(event) {
		if (event.from == 'button') {
			if (event.target.id == 'mainShopDetail') {
				//分享详情
				let { price, title, img, activityid: activityId, promotionid: promotionId } = event.target.dataset;
				return {
					title: `￥${price} ${title}`,
					path: `/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`,
					imageUrl: img
				};
			} else {
				//分享主铺
				return {
					title: `好友推荐官专推实惠正品好货，手慢既无！`,
					path: `/pages/home_page/my_shop/my_shop?mainUserId=${this.mainUserId}`,
					imageUrl: '/static/goto.jpg'
				};
			}
		} else {
			//分享主铺
			return {
				title: `好友推荐官专推实惠正品好货，手慢既无！`,
				path: `/pages/home_page/my_shop/my_shop?mainUserId=${this.mainUserId}`,
				imageUrl: '/static/goto.jpg'
			};
		}
	},
	onReachBottom() {
		let { total } = this;
		this.pageNum = ++this.pageNum;
		this.homeList();
	},
	created() {
		let that = this;
		uni.$on('uAvatarCropper', path => {
			this.avatar = path;
			console.log('剪裁', path);

			let { token } = uni.getStorageSync('tokenorid');
			uni.uploadFile({
				url: `${configApi.apiReqBaseUrl}/distribution-client/file/upload/single`, //仅为示例，非真实的接口地址
				filePath: path,
				header: {
					// "Content-Type": "multipart/form-data",
					Authorization: token
				},
				name: 'file',
				// formData: {
				//     'user': "test"
				// },
				success: uploadFileRes => {
					let imgfile = JSON.parse(uploadFileRes.data);
					console.log(imgfile.data);

					let backgroundImage = {
						backgroundImage: imgfile.data
					};
					that.$u.api
						.pushHead(backgroundImage)
						.then(e => {
							console.log(e);
							that.mainInfo();
						})
						.catch(err => {
							console.log(err);
						});
				}
			});
		});
	},
	methods: {
		homeorblack() {
			console.log(111, this.ishome);
			if (this.ishome) {
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				});
			}
		},
		chooseAvatar() {
			this.$u.route({
				// 关于此路径，请见下方"注意事项"
				url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
				// 内部已设置以下默认参数值，可不传这些参数
				params: {
					// 输出图片宽度，高等于宽，单位px
					destWidth: 750,
					destHeight: 500,
					// 裁剪框宽度，高等于宽，单位px
					rectWidth: 300,
					// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
					fileType: 'png'
				}
			});
		},
		apply() {
			// let {avatarUrl} = uni.getStorageSync('userinfoKey');
			// if(!avatarUrl){
			//   this.showLoginPopup = true
			//   return false
			// };

			// let param= uni.getStorageSync('userinfoKey').userId;
			// this.enterBT = false;

			if (!this.refundReason) {
				this.$tools.toast('请输入申请理由');
				return false;
			}
			let param = {
				message: this.refundReason,
				userId: this.mainUserId
			};
			this.$u.api
				.hhelpApplyList(param)
				.then(e => {
					this.applyState(this.mainUserId);
				})
				.catch(err => {
					console.log(1111, err);
				});
		},
		pjseo(send) {
			//扫码进来的
			console.log(send);
			this.$u.api
				.getAppletCodeScene(send)
				.then(e => {
					this.mainUserId = e.mainUserId;
					this.enterBT = e.enterBT || null; //  申请的帮推官

					this.homeList();
					this.mainInfo();
				})
				.catch(err => {
					console.log(err);
				});
		},
		numerical(e) {
			this.figure = e.detail.cursor;
		},
		getToken() {
			return new Promise((resolve, reject) => {
				let that = this;
				uni.login({
					success(res) {
						that.$u.api
							.logoin(res.code)
							.then(el => {
								uni.setStorage({
									key: 'tokenorid',
									data: el,
									success() {
										resolve(el);
									}
								});
							})
							.catch(err => {
								reject(err);
							});
					}
				});
			});
		},
		xtgetInfo() {
			this.$u.api
				.getUserInfo()
				.then(e => {
					this.sharenickName = e.nickName;
					this.isAttention = e.isSubscribe;
				})
				.catch(err => {
					console.log(err);
				});
		},
		jumpAttention() {
			uni.navigateTo({
				url: '/pages/home_page/official_account'
			});
		},
		jumpDetails(activityId, promotionId) {
			console.log(activityId, promotionId);

			// activityId
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
				searchValue: '',
				userId: this.mainUserId
			};
			this.$u.api
				.getUserShop(data)
				.then(e => {
					// console.log(e.rows,999)
					if (e) {
						this.orderList = this.orderList.concat(e.rows); //将数据拼接在一起
					}
					if (!this.friend_circle) {
						this.xtgetInfo();
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		mainInfo() {
			//有to后不管是扫码还不扫码
			this.$u.api
				.lookInfoTJ(this.mainUserId)
				.then(e => {
					this.oneself = uni.getStorageSync('tokenorid').userId;
					if (this.enterBT) {
						//只有申请帮推官才会判断状态
						this.own(this.oneself);
						this.applyState(this.mainUserId);
						console.log('进入人的userid');
					}

					this.mainInfoMap = e;
					uni.setNavigationBarTitle({
						title: `${this.mainInfoMap.nickName}的主铺`
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
		own(commuserid) {
			if (this.mainUserId == commuserid) {
				//  自己不能成为自己的帮卖
				this.enterBT = null;
				uni.redirectTo({
					url: '/pages/my/audit_shops/audit_shops'
				});
			}
		},
		applyState(userId) {
			// if(this.$store.state.isAuto == false ){
			this.$u.api
				.isApplyState(userId)
				.then(e => {
					if (e) {
						this.sqState = e.status;
					} else {
						this.sqState = e;
					}
					console.log('状态', e);
				})
				.catch(err => {
					console.log(err);
				});
			// }else{
			//   this.enterBT = false;
			// }
		},
		upImg() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					let { token } = uni.getStorageSync('tokenorid');
					let fileone = res.tempFilePaths[0];

					uni.uploadFile({
						url: `${configApi.apiReqBaseUrl}/distribution-client/file/upload/single`, //仅为示例，非真实的接口地址
						filePath: fileone,
						header: {
							// "Content-Type": "multipart/form-data",
							Authorization: token
						},
						name: 'file',
						// formData: {
						//     'user': "test"
						// },
						success: uploadFileRes => {
							debugger;
							let imgfile = JSON.parse(uploadFileRes.data);
							console.log(imgfile.data);

							let backgroundImage = {
								backgroundImage: imgfile.data
							};
							that.$u.api
								.pushHead(backgroundImage)
								.then(e => {
									console.log(e);
									that.mainInfo();
								})
								.catch(err => {
									console.log(err);
								});
						}
					});
				}
			});
		},
		stopTouchMove() {
			return false;
		},
		Jclose() {
			this.enterBT = false;
		},
		Jenter() {
			this.enterBT = false;
		},
		jumpexplain() {
			uni.navigateTo({
				url: '/pages/tabbar/fine_goods/explain'
			});
		},
		downImg() {
			let param = {
				page: 'pages/home_page/my_shop/my_shop',
				scene: JSON.stringify({
					mainUserId: this.mainUserId
				})
			};

			this.$u.api
				.createCode(param)
				.then(e => {
					this.$store.commit('wxwewm', e);
					this.$store.commit('msterShops', this.mainInfoMap);

					this.$refs.childa3.shareFc();
				})
				.catch(err => {
					console.log(err);
				});
		},
		downCode() {
			let param = {
				page: 'pages/home_page/my_shop/my_shop',
				scene: JSON.stringify({
					mainUserId: this.mainUserId
				})
			};

			this.$u.api
				.createCode(param)
				.then(e => {
					this.$store.commit('wxwewm', e);
					this.$store.commit('msterShops', this.mainInfoMap);

					this.$refs.childaCode.shareFc();
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss">
.x-button-img {
				margin-top: 20rpx;
				width: 136rpx;
				height: 52rpx;
				background-color: #ff0000;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 26rpx;
				line-height: 52rpx;
				text-align: center;
				margin-left: auto;
				margin-bottom: 20rpx;
			}	
.fx {
	display: flex;
	flex-direction: column;
	align-items: center;
	image {
		height: 56rpx;
		width: 56rpx;
		// background-size: 100% 100%;
		// margin: 0 10rpx;
	}
	text {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #999999;
		text-align: center;
		line-height: 30rpx;
	}
}
.x-button {
	margin-top: 20rpx;
	width: 136rpx;
	height: 52rpx;
	background: #ff0000;
	border-radius: 10rpx;
	color: #ffffff;
	font-size: 26rpx;
	line-height: 52rpx;
	text-align: center;
	margin-left: auto;
	margin-bottom: 20rpx;
}
.become {
	padding: 20rpx;
	height: 106rpx;
	> view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff9e4;
		height: 64rpx;
		padding: 0 20rpx;
		text {
			font-size: 28rpx;
			color: #333;
		}
	}
}

.home-or-black {
	height: 120rpx;
	width: 750rpx;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	text-align: center;
	overflow: hidden;
	.swing {
		position: absolute;
		left: 20rpx;
		bottom: 10rpx;
		z-index: 1000;
		width: 50rpx;
		height: 50rpx;
	}
	.font-center {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		opacity: 0;
		transition-duration: 0.5s;
		text {
			line-height: 150rpx;
		}
	}
	.showor {
		opacity: 1;
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
	}

	view {
		color: #ff0000;
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
.break-time {
	height: 64rpx;
	background-color: #fff9e4;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24rpx;
	color: #ff0000;
	margin-top: 50rpx;
}
.pop-box {
	min-height: 500rpx;
	width: 750rpx;
	background-color: #ffffff;
	padding: 20rpx;
	.top {
		display: flex;
		align-items: center;
		> image {
			height: 160rpx;
			width: 160rpx;
		}
		.info {
			height: 160rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
		}
		.icon {
			align-self: flex-start;
			margin-left: auto;
		}
	}
	.guige {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
	.specification-list {
		margin-top: 22rpx;

		.specification-item {
			border: 2rpx solid #f4f4f4;
			border-radius: 12rpx;
			padding: 0 24rpx;
			box-sizing: border-box;
			height: 74rpx;
			width: 570rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;

			.product-img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 10rpx;
				background-color: #ccc;
				margin-right: 20rpx;
			}
		}

		.sel-item {
			border-color: red;
			background-color: #fff1f1;
		}
	}
	.jbq {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		text {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.x-btn {
		height: 70rpx;
		width: 710rpx;
		background: #ff0000;
		text-align: center;
		border-radius: 70rpx;
		line-height: 70rpx;
		color: #ffffff;
		font-size: 32rpx;
	}
	.c9 {
		background-color: #999999 !important;
	}
}
.container {
	background-color: #f7f7f7;
	padding-bottom: 150rpx;
}
.orange {
	color: orange;
}
.x-head {
	background: #ffffff;
	> image {
		height: 500rpx;
		width: 750rpx;
		background-size: 100% 100%;
		background: #707070;
	}
	.addbig {
		margin-top: -30rpx;
		display: flex;
		justify-content: space-between;
		height: 236rpx;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;
		padding: 0 20rpx 20rpx 40rpx;
		background: #ffffff;
		.x-btn {
			text {
				color: #ff0000;
				font-size: 20rpx;
				background-color: #ff0000;
				display: inline-block;
			}
		}
		.box-left {
			display: flex;
			flex-direction: column;
			margin-top: -60rpx;
			padding-bottom: 20rpx;
			position: relative;
			image {
				height: 156rpx;
				width: 156rpx;
				position: absolute;
				left: 0rpx;
				top: -10rpx;
				border-radius: 8rpx;
			}
			.tag1 {
				font-size: 30rpx;
				color: #000000;
				margin-top: 156rpx;
			}
			.tag2 {
				color: #c3b091;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				height: 50rpx;
				margin-top: 15rpx;
				.lr {
					margin: 0 6rpx;
					line-height: 100%;
				}
			}
		}

		.box-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.box {
				margin-top: 16rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				.pyq {
					display: flex;
					flex-direction: column;
					align-items: center;
					// margin-right: 40rpx;
					image {
						height: 56rpx;
						width: 56rpx;
						// background-size: 100% 100%;
						// margin: 0 10rpx;
					}
					text {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #999999;
						text-align: center;
						line-height: 30rpx;
					}
				}
				.fx {
					display: flex;
					flex-direction: column;
					margin: 0;
					image {
						height: 56rpx;
						width: 56rpx;
						background-size: 100% 100%;
						margin-right: 10rpx;
					}
					text {
						font-size: 24rpx;
						color: #999999;
						text-align: center;
						line-height: 30rpx;
					}
				}
			}
			.x-button {
				margin-top: 20rpx;
				width: 136rpx;
				height: 52rpx;
				background: #ff0000;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 26rpx;
				line-height: 52rpx;
				text-align: center;
				margin-left: auto;
				margin-bottom: 20rpx;
			}
			.x-button-img {
				margin-top: 20rpx;
				width: 136rpx;
				height: 52rpx;
				background-color: #ff0000;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 26rpx;
				line-height: 52rpx;
				text-align: center;
				margin-left: auto;
				margin-bottom: 20rpx;
			}
			.active {
				opacity: 0.5;
			}
		}
	}
}

.become {
	padding: 20rpx;
	height: 106rpx;
	background-color: #fff;
	> view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff9e4;
		height: 64rpx;
		padding: 0 20rpx;
		text {
			font-size: 28rpx;
			color: #333;
		}
		view {
		}
	}
	.x-button {
		width: 90rpx;
		height: 40rpx;
		background: #ff0000;
		border-radius: 6rpx;
		color: #ffffff;
		font-size: 24rpx;
		line-height: 40rpx;
		text-align: center;
	}
}
.x-body {
	background-color: #fff;
	z-index: 999;
	.body-list {
		padding: 20rpx;
		.body-item {
			margin-bottom: 20rpx;
			background: #ffffff;
			border-radius: 8rpx;
			padding: 20rpx;
			box-sizing: border-box;
			width: 100%;
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
							background-color: #ff0000;
							color: #ffffff;
							margin-left: 10rpx;
							font-size: 20rpx;
							border-radius: 6rpx;
						}
					}
				}
				.x-info {
					text {
						padding: 0;
						margin: 0;
						font-size: 26rpx;
						color: #c3b091;
						border-right: 1px solid #ccc;
						line-height: 100%;
						margin-right: 10rpx;
						padding-right: 10rpx;
					}
					text:nth-child(2) {
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
				margin: 20rpx 0;
				> text {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 20rpx;
					font-weight: 800;
				}
				.goods-info {
					display: flex;
					height: 200rpx;
					width: 100%;
					overflow: hidden;
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
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					.tag1 {
						font-size: 30rpx;
						color: #333333;
						font-weight: 800;
					}
					.tag2 {
						padding: 10rpx 0;
						width: 100%;
						display: flex;
						justify-content: space-between;
						text {
							font-size: 30rpx;
							color: #333333;
							font-weight: 800;
						}
						view {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 120rpx;
							height: 40rpx;
							background-color: #ff0000;
							border-radius: 8rpx;
							text-align: center;
							font-size: 20rpx;
							color: #ffffff;
							margin-left: 10rpx;
							box-sizing: border-box;
						}
					}
					.tag3 {
						color: #ff0000;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
			.x-down {
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

				.x-last {
					display: flex;
					justify-content: space-between;
					align-items: center;
					> text {
						color: #ff0000;
						font-size: 30rpx;
						font-weight: bold;
					}
					.div-line {
						height: 50rpx;
						display: flex;
						align-items: center;
						view {
							color: #999999;
							font-size: 28rpx;
							font-weight: bold;
						}
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

.pop-state0,
.pop-state1,
.pop-state2,
.pop-center {
	height: 450rpx;
	width: 550rpx;
	background-color: #ffffff;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
}

.pop-center {
	justify-content: space-between;
	.box {
		height: 206rpx;
		width: 100%;
		position: relative;
		textarea {
			border: 1px solid #cccccc;
			width: 450rpx;
			height: 206rpx;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-left: 50rpx;
			box-sizing: border-box;
		}

		text {
			position: absolute;
			bottom: 10rpx;
			right: 70rpx;
			color: #ccc;
		}
	}

	.btn-box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		view {
			flex: 1;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
		view:nth-child(1) {
			height: 80rpx;
			background-color: #cccccc;
		}
		view:nth-child(2) {
			height: 80rpx;
			background-color: forestgreen;
		}
	}
	text {
		font-size: 34rpx;
		font-weight: bold;
		margin-top: 55rpx;
	}
}
</style>
