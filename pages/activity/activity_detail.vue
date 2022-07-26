<template>
	<view class="">
		<!-- <view class="main1 flex-col">
			<view class="bd1 flex-col">
				<view class="" style="width: 100%;" v-for="(item, index) in dataList.describe_list.imgs" :key="index">
					<image :src="item.url" @click="per(item.url)" mode="widthFix" style="width: 750rpx;vertical-align: bottom;"></image>
				</view>
			</view>
		</view>

		<view class="footer-box bd13 flex-col">
			<view class="main5 flex-row">
				<view class="u-flex-1 u-flex u-col-center u-row-center u-p-b-10">
					<view class="box1 flex-col u-flex u-row-center" @tap="jumpHome">
						<view class="bd14 flex-col u-flex u-row-center align-center icon-box"><image src="../../static/home-icon.png" mode="aspectFit"></image></view>
						<text class="info6">首页</text>
					</view>
					<view class="box2 flex-col"></view>
					<view class="box3 flex-col u-flex u-row-center">
						<button open-type="contact">
							<view class="bd15 flex-col u-flex u-row-center icon-box"><image src="../../static/call-center-icon.png" mode="aspectFit"></image></view>
							<text class="txt8">客服</text>
						</button>
					</view>
					<view class="box4 flex-col"></view>
					<view class="box5 flex-col u-flex u-row-center">
						<button open-type="share">
							<view class="main7 flex-col align-center icon-box"><image src="../../static/share-icon.png" mode="aspectFit"></image></view>
							<text class="word4">分享</text>
						</button>
					</view>
				</view>
				<view class="flex-col u-flex-1 u-flex u-rol-center u-row-center" style="background-color: #ff0000;color: white;" @tap="baoming" v-if="!empty">
					<text class="word5">我要报名</text>
				</view>
				<view
					class="flex-col u-flex-1 u-flex u-rol-center u-row-center"
					style="background-color: blue;color: white;"
					v-else
					@tap="$u.route({ url: 'pages/tabbar/activity/huodong' })"
				>
					<text class="word5">查看凭证</text>
				</view>
			</view>
		</view>

		<u-popup v-model="apply_pup_show" mode="bottom" @close="close" @open="open" class="apply-pop-box" round="24">
			<view class="mod3 flex-col align-center" style="position: relative;">
				<view class="mod4 flex-col">
					<view class=""><text class="txt1">门票说明</text></view>
					<view style="display: flex;flex-direction: column;">
						<text style="font-size: 24rpx;color: #999999;">1元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 限老板创始人 团队长 嘉宾席</text>
						<text style="font-size: 24rpx;color: #999999;margin: 10rpx 0;">500元 &nbsp;&nbsp;豪华晚宴 大咖合影， 大舞台颁奖</text>
						<text style="font-size: 24rpx;color: #999999;">1980元 &nbsp;VIP沙发座 贵宾通道 大咖邻座合影</text>
					</view>
					<text class="txt1" style="margin-top: 10rpx;">选择票种</text>
					<view class="outer1 flex-col">
						<view
							class="layer1 flex-col justify-center"
							:class="{ selected: cur_selected_type == index }"
							:style="{ background: item.lanhuBg0 }"
							v-for="(item, index) in dataList.ticketList"
							:key="index"
							@tap="cur_selected_type = index"
						>
							<view class="outer2 flex-row justify-between" style="align-items: center;justify-content: space-between;display: flex;">
								<text class="info1" style="font-weight: 900;">{{ item.ticket_title }}</text>
								<text class="word1" style="color: red;font-weight: 700;">{{ item.ticket_price }}元</text>
							</view>
						</view>
					</view>
					
					<view class="outer4 flex-col u-p-l-20 " style="position: absolute;bottom: 20rpx;">
						<view class="section1 flex-row">
							<text class="txt3">合计</text>
							<text class="word2" style="font-weight: 700;">¥{{ dataList.ticketList[cur_selected_type].ticket_price }}</text>
						
							<view class="section2 flex-col justify-center" @tap="next()"><text class="txt4" style="">下一步</text></view>
						</view>
					</view>
				</view>
			</view>
		</u-popup> -->
		<view>
			<view>
				<view v-if="empty" style="width: 700rpx;margin: 0 auto;background-color: #e5fffc;border-radius: 30rpx;overflow: hidden;padding-top: 20rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx;">
						<view>
							<view class="u-line-1" style="font-weight: 900;font-size: 32rpx;padding-left: 40rpx;width: 460rpx;color: rgb(53, 117, 242);">{{dataList.name}}</view>
							<view style="display: flex;align-items: center;width: 460rpx;justify-content: space-between;margin-top: 20rpx;padding-left: 40rpx;">
								<view style="align-items: center;">
									<view style="font-weight: 400;font-size: 26rpx;">{{dataList.dataTimeStart | date('mm月dd日')}}</view>
									<view style="font-weight: 900;font-size: 32rpx;">{{dataList.dataTimeStart | date('hh:MM')}}</view>
								</view>
								<view style="align-items: center;">
									<view style="font-weight: 400;font-size: 26rpx;">{{dataList.dataTimeEnd | date('mm月dd日')}}</view>
									<view style="font-weight: 900;font-size: 32rpx;">{{dataList.dataTimeEnd | date('hh:MM')}}</view>
								</view>
							</view>
						</view>
						<view style="margin-right: 30rpx;border-left: 1px solid #999;padding-left: 30rpx;display: flex;flex-direction: column;align-items: center;" @tap="$u.route({ url: 'pages/tabbar/activity/huodong?id=' + fenxianid })">
							<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/qrcoded.png" size='80' ></u-icon>
							<view style="font-size: 24rpx;font-weight: 900;margin-top: 15rpx;">{{dataList.activity_form =='线下活动'?'入场码':'核销信息'}}</view>
						</view>
					</view>
					
					<view style="background-color: #fff;height: 70rpx;line-height: 70rpx;width: 100%;justify-content: space-between;display: flex;align-items: center;margin-top: 20rpx;">
						<view style="width: 50%;text-align: center;">
							<button open-type="contact" style="font-size: 26rpx;font-weight: 700;">
								联系客服
							</button>
						</view>
						<view v-if="dataList.activity_form =='线下活动'" style="width: 50%;text-align: center;font-size: 26rpx;font-weight: 700;" @tap="getLocaltion()">参会导航</view>
					</view>
				</view>
				<view v-if="dataList.headerChecked">
					<view><image :src="dataList.imageValue[0].url" style="width:100%;height: 400rpx;"></image></view>
					<view style="background: #fff;width: 100%;font-size: 36rpx;display: flex;flex-direction: column;padding: 20rpx;">
						<view style="font-weight: 700;font-size: 40rpx;">{{ dataList.name }}</view>
						<view style="display: flex;color: #999;font-size: 22rpx;margin-top: 20rpx;">
							<view>
								<u-icon name="eye-fill" color="#999"></u-icon>
								<text>{{dataList.browse}}</text>
							</view>
							<view style="margin-left: 10rpx;">
								<u-icon name="share-fill" color="#999"></u-icon>
								<text>{{dataList.shareCount}}</text>
							</view>
						</view>
						<!-- <view style="display: flex;justify-content: space-between;margin: 0rpx 40rpx;">
							
							<view>
								<view
									style="border-radius: 12rpx;color:white;background: #ff0000;display: flex;justify-content: center;align-items: center;margin-top: 10rpx;padding: 3rpx 10rpx;font-size: 22rpx;margin-bottom: 10rpx;"
									@click="openPop"
									v-if="dataList.originatorPhone || dataList.originatorWechar || dataList.qrCodeImgValue.length"
								>
									联系咨询
								</view>
							</view>
						</view> -->
						<view style="margin-top: 20rpx;">
							<view style="font-size: 24rpx;color: #000;">
							<u-icon name="clock-fill" color="#999"></u-icon>
							<text style="margin-left: 30rpx;">{{ dataList.dataTimeStart | date('yyyy-mm-dd hh:MM:ss') }} 至 {{ dataList.dataTimeEnd | date('yyyy-mm-dd hh:MM:ss') }}</text>
							</view>
						</view>
						<view style="margin-top: 20rpx;">
							<view style="font-size: 24rpx;color: #000;">
							<u-icon name="grid-fill" color="#999"></u-icon>
							<text style="margin-left: 30rpx;">{{ dataList.activity_form}}</text>
							</view>
						</view>
						<view style="margin-top: 20rpx;">
							<view style="font-size: 24rpx;color: #000;">
							<u-icon name="man-add-fill" color="#999"></u-icon>
							<text style="margin-left: 30rpx;" v-if="bmrs >0">已报名{{bmrs || 0}}人</text>
							<text style="margin-left: 30rpx;" v-else>{{dataList.state}}</text>
							</view>
						</view>
						<view v-if="dataList.activity_form == '线下活动'" @click="getLocaltion" style="margin-top: 20rpx;">
							<view style="font-size: 24rpx;color: #000;">
							<u-icon name="map-fill" color="#999"></u-icon>
							<text style="margin-left: 30rpx;">{{ dataList.region }}{{ dataList.detailedAddress }}</text>
							</view>
						</view>
						<view v-else style="margin-top: 20rpx;">
							<view style="font-size: 24rpx;color: #000;">
							<u-icon name="map-fill" color="#999"></u-icon>
							<text style="margin-left: 30rpx;">服务于：{{dataList.only_form =='全国'?'全国':dataList.onlyList}}</text>
							</view>
						</view>
						<!-- <view style="display: flex;justify-content: space-between;margin: 20rpx 40rpx;">
							<view style="font-size: 28rpx;font-weight: 700;" v-if="dataList.activity_form == '线下活动'">{{ dataList.region }}-{{ dataList.detailedAddress }}</view>
							<view v-if="dataList.activity_form == '线下活动'">
								<image
									@click="getLocaltion()"
									src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/dingwei1.png"
									style="width: 44rpx;height: 44rpx;"
									mode=""
								></image>
							</view>
						</view> -->
					</view>
					<!-- <u-gap height="10" bg-color="#d9d9d9"></u-gap> -->
				</view>
				<view v-if="dataList.headerChecked">
					<view class="profile" style="background-color: #fff;width: 700rpx;margin: 0 auto;border-radius: 30rpx;padding-bottom: 20rpx;">
						<view class="meta" style="margin-top: 20rpx;">
							<view class="meta-item" style="">
								<view style="display: flex;margin-left: 40rpx;padding-top: 20rpx;">
									<view style="display: flex;align-items: center;flex-direction: column;">
										<u-avatar @tap="$u.route({ url: 'pages/activity/specialArea?id=' + users._id })" :src="users.edit_avatarUrl[0].url?users.edit_avatarUrl[0].url:users.headImgUrl" size="70"></u-avatar>
										
										<view  style="background-color: #1873d5;border-radius: 6rpx;color: white;font-size: 22rpx;color: white;width: 100rpx;height: 30rpx;line-height: 30rpx;text-align: center;" v-if="users.state == '已认证'">
											企业认证
										</view>	
										<view  style="background-color: #36bd1e;border-radius: 6rpx;color: black;font-size: 22rpx;color: white;width: 100rpx;height: 30rpx;line-height: 30rpx;text-align: center;" v-else>
											个人认证
										</view>
									</view>
									
									<view style="display: flex;flex-direction: column;height: 120rpx;justify-content: space-between;margin-left: 20rpx;">
										<view class="nickname" style="font-size: 30rpx;font-weight: 800;">{{ users.edit_nickName?users.edit_nickName:users.nickName }}</view>
										<!-- <view
											style="background-color: #d5b385;border-radius: 6rpx;color: white;font-size: 22rpx;color: white;width: 100rpx;height: 30rpx;line-height: 30rpx;text-align: center;" v-if="users.state == '已认证'"
										>
											{{ users.state == '已认证'?'企业认证':'' }}
										</view> -->
											<view style="color: #999;">
												<view class="nickname u-line-1" style="font-size: 26rpx;width: 520rpx;">{{ users.introduction ? users.introduction : '这个家伙可能很懒！都没有时间编辑' }}</view>
											</view>
										<view class="nickname" style="font-size: 22rpx;color: #999;">
											<text>访问：{{ dataList.browse }}</text><text style="margin: 0 20rpx;">|</text><text>已发布：{{ baomingrenshu }}</text>	
										</view>
										
									</view>
								</view>
							</view>
						<!-- 	<view style="margin-left: 50rpx;color: #999;">
								<view class="nickname u-line-3" style="font-size: 26rpx;width: 600rpx;height:114rpx;">{{ users.introduction ? users.introduction : '暂未设置' }}</view>
							</view> -->
							<!-- <view style="margin-left: 50rpx;color: #999;">
								<view class="nickname" style="font-size: 26rpx;width: 600rpx;height:114rpx;">
									<u-button :plain="true" shape="square" type="primary" @click.stop="$u.route({ url: 'pages/activity/specialArea?id=' + users._id })">主页</u-button>
								</view>
							</view> -->
						</view>
					</view>
				</view>
				<view  v-if="fenxianid == '62d53d7666ea6e00012232a4'">
					<view style="margin-top: 30rpx;">
							<u-sticky>
								<u-tabs-swiper activeColor="#0676ff" ref="tabs" :list="list3" :current="accurrent" @change="acChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
							</u-sticky>	
							
						</view>				
						<view v-if="accurrent == 0">
							<u-parse :html="describe_list"></u-parse>
						</view>
						<view v-if="accurrent == 1">
							<view v-for="(item,index) in infoData" :key="index" style="width: 700rpx;margin: 10rpx auto;border-radius: 15rpx;background-color: #fff;padding: 20rpx;display: flex;align-items: center;justify-content: space-between;">
								<view>
									<view>
										{{item.info[2].value}}
									</view>
									<view>
										{{item.info[0].value.slice(0,1)}}**
									</view>
									<view>
										报名时间：{{item.payDate | date('mm/dd hh:MM')}}
									</view>
								</view>
								<!-- <view @tap="$u.route({ url: 'pages/activity/specialArea?id=' + item.grenzhuye })">
										<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/grenzhuye.png" size='60'></u-icon>
								</view> -->
							</view>
						</view>
					</view>
				<view v-else>
					<u-parse :html="describe_list"></u-parse>
				</view>
				</view>
			<view style="height: 100rpx;"></view>

			<view class="footer-box bd13 flex-col">
				<view class="main5 flex-row">
					<view class="u-flex-1 u-flex u-col-center u-row-center u-p-b-10">
						<view class="box1 flex-col u-flex u-row-center" @tap="jumpHome">
							<view class="bd14 flex-col u-flex u-row-center align-center icon-box"><image src="../../static/home-icon.png" mode="aspectFit"></image></view>
							<text class="info6">首页</text>
						</view>
						<!-- <view class="box1 flex-col u-flex u-row-center" @tap="jumpfabu()" v-else>
							<view class="bd14 flex-col u-flex u-row-center align-center icon-box"><image src="../../static/xz6.png" mode="aspectFit"></image></view>
							<text class="info6">发布</text>
						</view> -->
						<view class="box2 flex-col"></view>
						<view class="box3 flex-col u-flex u-row-center"  @tap="$u.route({ url: 'pages/activity/specialArea?id=' + dataList.userinfo.uid })">
							<view class="bd15 flex-col u-flex u-row-center icon-box"><image src="../../static/activity-active-icon.png" mode="aspectFit"></image></view>
							<text class="txt8">主页</text>
						</view>
						<!-- <view class=" flex-col u-flex u-row-center" v-else>
							<view class="box5 flex-col u-flex u-row-center">
								<button open-type="contact">
									<view class="main7 flex-col align-center icon-box"><image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/%E5%92%A8%E8%AF%A2.png" mode="aspectFit"></image></view>
									<text class="word4">客服</text>
								</button>
							</view>
							</view> -->
							<!-- <view class="bd15 flex-col u-flex u-row-center icon-box" @click="openPop">
								<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/%E5%92%A8%E8%AF%A2.png" mode="aspectFit"></image>
							</view>
							<text class="txt8">咨询</text>
						</view> -->
						<view class="box4 flex-col"></view>
					
						<view class="box5 flex-col u-flex u-row-center" @click.shop="earnCommission" v-if="empty && isDistributionShow">
							<button >
								<view class="main7 flex-col align-center icon-box"><image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/f635e5feccc119c34131966a361742e.png" mode="aspectFit"></image></view>
								<text class="word4">赚佣</text>
							</button>
						</view>
						<view class="box5 flex-col u-flex u-row-center" v-else>
							<button open-type="share">
								<view class="main7 flex-col align-center icon-box"><image src="../../static/share-icon.png" mode="aspectFit"></image></view>
								<text class="word4">分享</text>
							</button>
						</view>
					</view>
					<view v-if="!empty" class="flex-col u-flex-1 u-flex u-rol-center u-row-center" style="background-color: #ff0000;color: white;" @tap="baoming">
						<text class="word5">{{dataList.btnClerk?dataList.btnClerk:'我要报名'}}</text>
					</view>
					<view class="flex-col u-flex-1 u-flex u-rol-center u-row-center" style="background-color: #999999;color: white;" v-else><text class="word5">已报名</text></view>
				</view>
			</view>
		</view>
		<!-- <view @click="jumpHome()" v-if="ispages"><fab></fab></view> -->
		<u-popup v-model="showShare" mode="bottom" @close="close" @open="open" class="apply-pop-box" round="24">
			<view class="content">
				<view class="main1 flex-col">
					<view class="block2 flex-col">
						<text class="word1">最高可赚30%(包含平台服务费)</text>
						<view class="box2 flex-col"></view>
						<view class="u-flex u-row-around u-p-t-40">
							<view>
								<button open-type="share">
									<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/415.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
									<view style="font-size: 24rpx;font-weight: 700;">分享赚佣</view>
								</button>
								
							</view>							
							<view @click="qrCodeResult2(dataList)" >
								<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/417.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view style="font-size: 24rpx;font-weight: 700;">分享二维码</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="call_way_show" mode="bottom" @close="close" @open="open" class="apply-pop-box" round="24">
			<view class="content">
				<view class="main1 flex-col">
					<view class="block2 flex-col">
						<!-- <text class="word1">选择以下方式推广活动</text> -->
						<view class="box2 flex-col"></view>
						<view class="u-flex u-row-around u-p-t-40">
							<view @click="callwechar" v-if="dataList.originatorWechar">
								<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/415.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view>联系微信号</view>
							</view>
							<view @click="callphone" v-if="dataList.originatorPhone">
								<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/416.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view>拨打电话</view>
							</view>
							<view @click="saveImg(dataList.qrCodeImgValue[0].url)" v-if="dataList.qrCodeImgValue.length">
								<u-icon name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/417.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view>微信二维码</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="apply_pup_show" mode="bottom" @close="close" @open="open" class="apply-pop-box" round="24">
			<view style="display: flex;flex-direction: column;justify-content: space-between;padding: 40rpx;">
				<view>
					<text class="txt1" style="margin-top: 10rpx;">选择票种</text>
					<view>
						<view
							style="width: 100%;background-color: #999999;margin: 10rpx auto;border-radius: 15rpx;"
							:class="{ selected: cur_selected_type == index }"
							v-for="(item, index) in dataList.ticketList"
							:key="index"
							@tap="cur_selected_type_change(index)"
						>
							<view style="display: flex;justify-content: space-between;padding: 10rpx 20rpx;">
								<view style="display: flex;flex-direction: column;flex: 1;">
									<text style="font-weight: 700;font-size: 32rpx;">{{ item.title }}</text>
									<view style="font-size: 24rpx;">{{ item.ticket_describe }}</view>
								</view>
								<view style="display: flex;flex-direction: column;text-align: right;width: 35%;flex-wrap: nowrap;">
									<!-- 	<text style="font-size: 24rpx;" v-if="item.ticket_amount == '不限'">{{ item.ticket_amount }}</text>
									<text style="font-size: 24rpx;" v-else>剩余:{{ item.ticket_amount }}</text> -->
									<text style="font-weight: 700;font-size: 28rpx;" v-if="item.price == '免费'">{{ item.price }}</text>
									<text style="font-weight: 700;font-size: 28rpx;" v-else>{{ item.price }}元</text>
									<text style="font-weight: 700;font-size: 28rpx;" v-if="item.ticket_amount == 0">库存不足</text>
									<text style="font-weight: 700;font-size: 28rpx;" v-else>{{item.ticket_amount}}张</text>
								</view>
							</view>
						</view>
						<text class="txt1" style="margin-top: 10rpx;">选择数量</text>
						<view style="margin-top: 10rpx;">
							<u-number-box
								:disabled="true"
								:min="1"
								:max="1"
								v-model="dataList.ticketList[cur_selected_type].limit_num"
								@change="
									e => {
										dataList.ticketList[cur_selected_type].limit_num = e.value;
									}
								"
							></u-number-box>
						</view>
					</view>

					<view>
						<view class="section1 flex-row" style="margin-top: 20rpx;">
							<text class="txt3">合计</text>
							<text class="word2" style="font-weight: 700;" >¥{{ totalPrice }}</text>

							<view class="section2 flex-col justify-center" @tap="next()"><text class="txt4" style="">下一步</text></view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="showStateEnd"  confirm-text='查看主页' cancel-text="返回首页" :show-cancel-button='true' :content="stateContentEnd" @confirm='stateConfirm' @cancel='stateCancel'></u-modal>
		<!-- 保存海报 -->
		<view class="flex_row_c_c modalView" :class="qrShow ? 'show' : ''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px"><image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image></view>
				<view class="flex_row marginTop2vh" style="display: flex;justify-content: space-between;">
					<view style="width: 45%;height: 80rpx;line-height: 80rpx;color: black;background-color: #ffffff;border-radius: 15rpx;text-align: center;">取消海报</view>
					<view @tap.prevent.stop="saveImage()" style="width: 45%;height: 80rpx;line-height: 80rpx;color: white;background-color: #0081ff;border-radius: 15rpx;text-align: center;">
						保存图片
					</view>
				</view>
			</view>
		</view>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="PosterCanvasId" :style="{ width: (poster.width || 10) + 'px', height: (poster.height || 10) + 'px' }"></canvas>
		</view>
		<!-- </view> -->
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
import permiss from '@/common/logic/permiss';
import fab from '@/components/fab.vue';
import _app from '@/components/QS-SharePoster/app.js';
import {getSharePoster} from '@/components/QS-SharePoster/QS-SharePoster.js';
export default {
	components: {
		fab
	},
	data() {
		return {
			stateContentEnd:'当前活动已结束',
			accurrent:0,
			list3: [
				{ name: '活动详情' },
				{ name: '参与方' }
				
			],
			isDistributionShow:false,
			poster: {},
			qrShow: false,
			canvasId: 'PosterCanvasId',
			showShare:false,
			describe_list: '',
			statusBarHeight: 0,
			navBarHeight: 0,
			menuButtonInfo: {},
			fenxianid: '',
			autoVideo: true,
			pageLoading: true,
			ispages: false,
			animation: 'twinkle',
			baomingrenshu:0,
			windowHeight: 0,
			empty: false,
			constants: {},
			invitation: '',
			dataList: [],
			is_fav: false, // 是否收藏
			is_mine: false, // 是否是我的活动
			value: '', // 数量
			status: 0,
			showStateEnd:false,
			bmrs:0,
			infoData:[],
			ticket_list: [
				{
					lanhutext0: '',
					lanhutext1: ''
				}
			],
			stateDesc: {
				0: {
					text: '我要报名',
					class: 'status0'
				},
				1: {
					text: '查看凭证',
					class: 'status1'
				}
			},
			cur_selected_type: 0, // 选中票种下标
			call_way_show: false, // 显示联系方式弹出框
			apply_pup_show: false, //	报名弹窗
			total: '',
			result:[],
			subMchId: '',
			state: '未认证',
			users: {},
			implemented:'no',
			img_width: 84,
			img_height: 84
		};
	},
	onShareTimeline(res) {
		uniCloud
			.callFunction({
				name: 'incBrowse',
				data: {
					option: 'visitShare',
					shareDate: Date.now(),
					aid: this.dataList._id,
					openid: getApp().globalData.OPENID
				}
			})
			.then();
		uniCloud
			.callFunction({
				name: 'incBrowse',
				data: {
					option: 'activityShare',
					aid: this.fenxianid,
				}
			})
			.then();
		return {
			title:	this.dataList.name,
			path: '/pages/activity/activity_detail?id=' + this.fenxianid + '&invitation=' + getApp().globalData.OPENID + '&implemented=' + this.implemented,
			imageUrl: this.dataList.shareImage[0].url || '',
		}
	},
	onShareAppMessage(res) {
		uniCloud
			.callFunction({
				name: 'incBrowse',
				data: {
					option: 'visitShare',
					shareDate: Date.now(),
					aid: this.dataList._id,
					openid: getApp().globalData.OPENID
				}
			})
			.then();
		uniCloud
			.callFunction({
				name: 'incBrowse',
				data: {
					option: 'activityShare',
					aid: this.fenxianid,
				}
			})
			.then();
		let _this = this;
		if (res.from === 'button') {
		}
		// 来自页面内分享按钮
		return {
			title: this.dataList.name,
			imageUrl: this.dataList.shareImage[0].url || '',
			path: '/pages/activity/activity_detail?id=' + _this.fenxianid + '&invitation=' + getApp().globalData.OPENID+ '&implemented=' + _this.implemented
		};
	},
	watch:{
		
	},
	computed: {
		totalPrice() {
			if(this.dataList.length == 0){
				return '0.00'
			}
			if (this.dataList.ticketList[this.cur_selected_type].price == '免费') {
				console.log(999);
				this.total = '0.00';
				return '0.00';
			} else {
				let total = Number(this.dataList.ticketList[this.cur_selected_type].price) * Number(this.dataList.ticketList[this.cur_selected_type].limit_num);
				this.total = total.toFixed(2);
				return total.toFixed(2);
			}
		},
		
	},
	onLoad(e) {
		console.log(e, 'idididi');
		if (e.id == '62b1791f7696a800011846fb') {
			// uni.showToast({
			// 	title:'活动已结束',icon:'none'
			// })
			uni.reLaunch({
				url: '/pages/activity/activity_detail?id=' + '62bd94d52f77c4000147f22f'
			});
		}
		

		this.get_navigations();
		uni.getStorage({
			key: 'tokenorid',
			success: res => {
				console.log('提取出来', res);
				this.sysUserInfo();
			},
			fail: err => {
				this.userLogin(); //初始化  登陆 拿token 获取列表
			}
		});
		if (e.scene) {
			this.fenxianid = e.scene;
			console.log(e.scene, 'scene');
		} else {
			this.fenxianid = e.id;
			console.log(e.id, 'e.id');
		}
		if (e.invitation) {
			getApp().globalData.INVITATION = e.invitation;
			getApp().globalData.IMPLEMENTED = e.implemented;
			console.log(getApp().globalData.INVITATION, 'getApp().globalData.INVITATION');
			console.log(getApp().globalData.IMPLEMENTED, 'getApp().globalData.IMPLEMENTED');
			uniCloud
				.callFunction({
					name: 'incBrowse',
					data: {
						option: 'shareCount',
						aid: this.dataList._id,
						openid: e.invitation
					}
				})
				.then();
		}
		this.loadData(this.fenxianid);
		this.gethuodong();
		this.visit(this.fenxianid);
		this.getbmrs()
		uni.getSystemInfo({
			success: res => {
				this.windowHeight = res.screenHeight;
			}
		});
		// uni.$once('app-before-ready', () => {
		// 		this.loadData(this.fenxianid);
		// })
	},
	onShow() {
		this.getcurrentpages();
		// this.gethuodong();
	},
	methods: {
		async acChange(e){
			console.log(e,11);
			this.accurrent = e
			if(this.accurrent == 1){
				let res = await db.collection('enroll_info').where({'dataList._id':this.fenxianid}).field({info:true,payDate:true,openid:true}).get()
					console.log(res,'5555');
					this.infoData = res.result.data
					// let idx = this.infoData.map(x=>x.openid)
					// await this.grenzhuye(idx)
					// console.log(await this.grenzhuye(idx),'data');
					// for (let i = 0; i < this.infoData.length; i++) {
					// 	this.infoData[i].grenzhuye =  await this.grenzhuye(idx)[i]._id;
					// }
				
			}
		},
		// async grenzhuye(e){
		// 	let res = await db.collection('user').where({openId:dbCmd.in(e)}).field({_id:true}).get()
		// 	for (let i = 0; i < this.infoData.length; i++) {
		// 		this.infoData[i].grenzhuye =  res.result.data[i]._id;
		// 	}
		// 	// return res.result.data
		// 	console.log(this.infoData,'ddd');
		// },
		
		stateConfirm(){
			this.$u.route({url:'pages/activity/specialArea?id='+this.dataList.userinfo.uid})
		},
		stateCancel(){
			uni.redirectTo({
				url:'/pages/tabbar/activity/activity'
			})			
		},
		earnCommission(){
			   const tmplIds = 'WgqUFa8I9neRLbC9r_fFjpYIxRwkZvz1-PKU0ahpnKI'
				 let _this = this
				
			    wx.getSetting({
			      withSubscriptions: true,   //  这里设置为true,下面才会返回mainSwitch
			      success: function(res){   
							console.log(res,'热死');
			        // 调起授权界面弹窗
			        if (res.subscriptionsSetting.mainSwitch) {  // 用户打开了订阅消息总开关
			          if (res.subscriptionsSetting.itemSettings != null) {   // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
			            let moIdState = res.subscriptionsSetting.itemSettings[tmplIds];  // 用户同意的消息模板id
			            if(moIdState === 'accept'){   
			              console.log('接受了消息推送');
										_this.showShare = true
			            }else if(moIdState === 'reject'){
			              console.log("拒绝消息推送");
										_this.showShare = true
			            }else if(moIdState === 'ban'){
			              console.log("已被后台封禁");
			
			            }
			          }else {
			            // 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
									wx.requestSubscribeMessage({   // 调起消息订阅界面
									  tmplIds: [tmplIds],
									  success (res) { 
									    console.log('订阅消息 成功 ');
									    console.log(res);
									  },
									  fail (er){
									    console.log("订阅消息 失败 ");
									    console.log(er);
									  },
										complete:com=>{
											_this.showShare = true
										}
									})
			          }
			
			        }else {
			          console.log('订阅消息未开启')
								uni.showToast({
									title:'请点击右上角三个点，点击设置，开启接收订阅消息',icon:'none',duration:3000
								})
								_this.showShare = true
								// wx.requestSubscribeMessage({   // 调起消息订阅界面
								// 	  tmplIds: [tmplIds],
								// 	  success (res) { 
								// 	    console.log('订阅消息 成功 ');
								// 	    console.log(res);
								// 	  },
								// 	  fail (er){
								// 	    console.log("订阅消息 失败 ");
								// 	    console.log(er);
								// 	  },
								// 		complete:com=>{
								// 			_this.showShare = true
								// 		}
								// 	})
								
			        }      
			      },
			      fail: function(error){
			        console.log(error);
			      },
			    })
		},
		jumpfabu() {
			if (!getApp().globalData.OPENID) {
				this.userLogin();
			} else {
				this.$u.route({ url: 'pages/release/publish_activity' });
			}
		},
		getcurrentpages() {
			let pages = getCurrentPages();
			console.log('页面', pages.length);
			if (pages[pages.length - 2]) {
				this.ispages = false;
			} else {
				this.ispages = true;
			}
		},
		cur_selected_type_change(index) {
			console.log(index, 'index');
			this.cur_selected_type = index;
			this.dataList.ticketList[this.cur_selected_type].limit_num = 1;
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
			console.log(this.navBarHeight, 'nav');
			// #endif

			//#ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			//#endif
			console.log(menuButtonInfo);
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		},
		newEnroll() {
			let data = {
				id: this.dataList._id,
				price: this.dataList.ticketList[this.cur_selected_type].ticket_price
			};
			uni.navigateTo({
				url: '/pages/activity/newEnroll?data=' + JSON.stringify(data)
			});
		},
		// *****
		Merchant_enroll() {
			uni.navigateTo({
				url: '/pages/login/Merchant_enroll?data=' + JSON.stringify(data)
			});
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
							console.log(e, 'asdf');
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
					console.log('tab数据', e);
					getApp().globalData.OPENID = e.openId;
					var form = {};
					console.log(e, '4664');
					if(e.hasSupplierAccount && typeof e.mchidApplyDTO != 'undefined' && e.mchidApplyDTO.applymentState == 7){
						this.state = '已认证';
						form = { ...e, state: '已认证', subMchId: e.mchidApplyDTO.subMchid };
						this.postuser(form);
						return
					}else{
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
		getbmrs(){			
				db.collection('enroll_info')
					.where({
						'dataList._id': this.fenxianid
					})
					.count()
					.then(res => {
						this.bmrs = res.result.total;
					});
			
		},
		gethuodong() {
			// if(!uni.getStorageSync('userinfoKey').openId || !getApp().globalData.OPENID){
			// 	return
			// }
			db.collection('enroll_info')
				.where({
					openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
					'dataList._id': this.fenxianid
					// 'dataList.dataTimeStart':dbCmd.lt(Date.now()),
					// 'dataList.dataTimeEnd':dbCmd.gt(Date.now())
				})
				.get()
				.then(res => {
					this.result = res.result.data[0];
					console.log(this.result,'this.');
					if (res.result.data[0]) {
						this.empty = true;
						this.implemented = 'yes'
					}
				});
		},
		per(url) {
			uni.previewImage({
				urls: [url]
			});
		},

		callphone() {
			uni.makePhoneCall({
				phoneNumber: this.dataList.originatorPhone, //电话号码
				success: function(e) {
					console.log(e);
				}
			});
		},
		callwechar() {
			// 复制到剪贴板
			uni.setClipboardData({
				data: this.dataList.originatorWechar
			});
		},
		saveImg(url) {
			console.log('daxuege', url);
			let _this = this;
			uni.downloadFile({
				url,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								});
							},
							fail: function() {
								uni.showToast({
									title: '保存失败，请稍后重试',
									icon: 'none'
								});
							}
						});
					} else {
						uni.showToast({
							title: '下载失败',
							icon: 'none'
						});
					}
				}
			});
		},
		numberChange(e) {
			console.log(e, 'popi');
		},
		jumpHome() {
			uni.reLaunch({
				url: '/pages/tabbar/activity/activity'
			});
		},
		formatRichText(html) {
			let newContent = html
				.replace(/\<p/gi, '<p style="display: flex;flex-direction: column;"')
				.replace(/\<img/gi, '<img style="width:100%;height:auto;margin:0rpx;padding:0rpx;vertical-align:bottom;"');

			this.describe_list = newContent;
		},
		async visit(id) {
			let openid = getApp().globalData.OPENID || getApp().globalData.INVITATION;
			let userinfo = getApp().globalData.USERINFO;
			console.log(openid, '8888888888888');
			if (openid) {
				let req = await db
					.collection('visit')
					.where({ aid: id, openid: openid })
					.get();
				await uniCloud.callFunction({ name: 'incBrowse', data: { option: 'activity', id: id } }).then();
				if (req.result.data.length == 0) {
					await db
						.collection('visit')
						.add({
							aid: id,
							openid: openid,
							userinfo: userinfo,
							browse: 1,
							createDate: Date.now()
						})
						.then();
				} else {
					await uniCloud
						.callFunction({
							name: 'incBrowse',
							data: {
								option: 'visit',
								createDate: Date.now(),
								aid: this.dataList._id,
								openid: openid
							}
						})
						.then();
				}
			}
		},
		loadData(id) {
			db.collection('activityList')
				.doc(id)
				.get()
				.then(res => {
					this.pageLoading = false;
					this.formatRichText(res.result.data[0].describe_list);
					this.dataList = res.result.data[0];
					if(this.dataList.isDistribution && typeof this.dataList.isDistribution != 'undefined'){
						this.isDistributionShow = true
					}
					console.log(this.dataList,'listlist');
					db.collection('user')
						.where({ openId: this.dataList.openid })
						.get()
						.then(req => {
							this.users = req.result.data[0];
						});
					db.collection('activityList').where({openid: this.dataList.openid,state:dbCmd.neq('已结束').and(dbCmd.neq('未发布'))}).count().then(r=>{
						this.baomingrenshu = r.result.total
					})
					console.log(this.dataList, '9999');
					if (this.dataList.state == '已结束') {
						// uni.showToast({
						// 	title: '活动已结束',
						// 	icon: 'none'
						// });
						this.showStateEnd = true
						
						// this.timeStateEnd = setInterval(()=>{
						// 	this.stateConfirm()
						// })
						// setTimeout(() => {
						// 	uni.redirectTo({
						// 		url:'/pages/tabbar/activity/activity'
						// 	})
						// }, 1000);
						return;
					}
					uni.setNavigationBarTitle({
						title: res.result.data[0].name
					});
					setTimeout(() => {
						this.gethuodong();
					}, 300);
					console.log(this.dataList, 'dataList');
				});
		},
		getLocaltion() {
			uni.openLocation({
				latitude: this.dataList.latitude,
				longitude: this.dataList.longitude,
				success: function() {
					console.log('success');
				}
			});
		},
		baoming() {
			if (!getApp().globalData.OPENID) {
				this.userLogin();
			} else {
				this.apply_pup_show = true;
			}
		},
		next() {
			console.log(111);
			if(this.dataList.ticketList[this.cur_selected_type].ticket_amount == 0){
				uni.showToast({
					title:'库存不足',icon:'none'
				})
				return
			}
			let data = {
				id: this.dataList._id,
				price: this.total,
				title: this.dataList.ticketList[this.cur_selected_type].title,
				ticket_amount: this.dataList.ticketList[this.cur_selected_type].ticket_amount,
				ticket_describe: this.dataList.ticketList[this.cur_selected_type].ticket_describe,
				max_num: this.dataList.ticketList[this.cur_selected_type].max_num,
				retailStore: this.dataList.ticketList[this.cur_selected_type].retailStore || 0,
				limit_num: this.dataList.ticketList[this.cur_selected_type].limit_num
			};
			uni.navigateTo({
				url: '/pages/activity/apply_form?data=' + JSON.stringify(data)
			});
		},
		close() {
			this.call_way_show = false;
		},
		open() {},
		openPop() {
			if (!this.dataList.originatorPhone && !this.dataList.originatorWechar && !this.dataList.qrCodeImgValue.length) {
				uni.showToast({
					title: '发布者未填写联系方式',
					icon: 'none'
				});
				return;
			}
			this.call_way_show = true;
		},
		// 修改票数时触发
		valChange() {
			console.log('当前值为: ' + e.value);
		},
		//二维码2
		qrCodeResult2(item){
			console.log(item,'qrcode');
			uni.showLoading({
				title:'正在绘制二维码...',
				mask:true
		
			})
			this.showShare = false
			uniCloud.callFunction({
				name:'getqrCodeTemporary',
				data:{
					path: 'pages/activity/activity_detail?id=' + this.fenxianid + '&invitation=' + getApp().globalData.OPENID+ '&implemented=' + this.implemented
				},
				success:(res)=> {
					// console.log(res);
					let buffer = res.result.buffer.data;
					let binary = '';
					let bytes = new Uint8Array(buffer);
					let qrCodeImg = 'data:image/jpeg;base64,' + uni.arrayBufferToBase64(bytes)
					// return Promise.resolve(qrCodeImg);
					// uni.hideLoading()
					// this.shareFc(qrCodeImg)
					this.shareFc2(qrCodeImg)
				},
				fail(err) {
					uni.showToast({ title: '分享码加载失败！', icon: 'none' });
				}
			})
		},
		// 绘制2
		async shareFc2(qrCodeImg) {
			try {
				_app.log('准备生成:' + new Date())
				const d = await getSharePoster({
					_this: this, //若在组件中使用 必传
					type: 'testShareType',
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					backgroundImage:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/%E9%A1%B5%E9%9D%A2%204_%E7%8A%B6%E6%80%81%201.png',
					posterCanvasId: this.canvasId,	//canvasId
					delayTimeScale: 20, //延时系数
					// background: {
					// 	width: 1080,
					// 	height: 1920,
					// 	backgroundColor: '#666'
					// },
					drawArray: ({
						bgObj,
						type,
						bgScale
					}) => {
						const dx = bgObj.width * 0.3;
						const fontSize = bgObj.width * 0.045;
						const lineHeight = bgObj.height * 0.04;
						const userInfo = this.userInfo
						return new Promise((rs, rj) => {
							rs([{
									type: 'custom',
									setDraw(Context) {}
								},
								{
									name: 'qrCodeImg',
									type: 'image',
									url: qrCodeImg,
									alpha: 1,
									isBgCenter: true,
									// dx: bgObj.width * 0.46 - bgObj.width * 0.1,
									// dy: bgObj.height - bgObj.width * 0.76,
									dWidth: 900,
									dHeight: 900,
									roundRectSet: {
										r: 10
									}
								}
							]);
						})
					},
					setCanvasWH: ({
						bgObj,
						type,
						bgScale
					}) => { // 为动态设置画布宽高的方法，
						this.poster = bgObj;
					}
				});
				// _app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
				this.poster.finalPath = d.poster.tempFilePath;
				this.qrShow = true;
				uni.hideLoading()
			} catch (e) {
				_app.hideLoading();
				_app.showToast(JSON.stringify(e));
				console.log(JSON.stringify(e));
			}
		},
		saveImage() {
			uni.showLoading({
			  title: '保存中...'
			})
			uni.saveImageToPhotosAlbum({
			    filePath: this.poster.finalPath,
			        success: function (res) {
			            console.log(res,'save success');
						uni.showToast({
						    title: '保存成功',
						    duration: 2000
						});
			        },
					fail:function (err) {
			            console.log(err,'save fail');
			        },
					complete:com=>{
						uni.hideLoading()
						this.qrShow= false
						setTimeout(()=>{
							this.loadData(this.openid)
						},1000)
					}
			});
		},
		hideQr() {
			this.qrShow = false;
		},
	}
};
</script>
<style>
page {
	background-color: #efefef;
}
</style>
<style lang="scss" scoped>
@import '../tabbar/activity/common.scss';
page {
	background-color: #d9d9d9 !important;
}
// 调整样式 start
.main1 {
	height: 308rpx;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 1);
	width: 702rpx;
	padding: 30rpx 0 0 32rpx;
	.block2 {
		width: 639rpx;
		height: 220rpx;
		.word1 {
			width: 280rpx;
			height: 28rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			white-space: nowrap;
			line-height: 28rpx;
			text-align: right;
			margin-left: 136rpx;
		}
		.box2 {
			width: 639rpx;
			height: 1rpx;
			background: #eeeeee;
			margin-top: 30rpx;
		}
	}
}
.applicant-box {
	position: fixed;
	bottom: 100rpx;
	height: 250rpx;
	width: 100%;
	z-index: 100;
	background-color: #fff;
	.txt1 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		white-space: nowrap;
	}
	.txt2 {
		display: block;
		overflow-wrap: break-word;
		color: rgba(253, 111, 45, 1);
		font-size: 22rpx;
	}
	.avatar-box {
		// width: 700rpx;
		padding: 0 10rpx;
		.avatar-image {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
		}
		.name-txt {
			width: 72rpx;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 20rpx;
			white-space: nowrap;
		}
	}
}
.footer-box {
	position: fixed;
	bottom: 0;
	height: 100rpx;
	width: 100%;
	z-index: 100;
	&.bd13 {
		height: 104rpx;
		border: 1px solid rgba(238, 238, 238, 1);
		background-color: rgba(255, 255, 255, 1);
		// margin-top: 61rpx;
		width: 750rpx;
		.main5 {
			height: 104rpx;
			width: 100%;
			.box1 {
				width: 52rpx;
				height: 82rpx;
				margin-top: 12rpx;
				.bd14 {
					height: 48rpx;
					margin-left: 2rpx;
					width: 48rpx;
				}
				.info6 {
					width: 52rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(102, 102, 102, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: justify;
					margin-top: 8rpx;
				}
			}
			.box2 {
				width: 1rpx;
				height: 37rpx;
				background: #eeeeee;
				margin: 20rpx 0 0 36rpx;
			}
			.box3 {
				width: 60rpx;
				height: 88rpx;
				margin: 19rpx 0 0 37rpx;
				.bd15 {
					height: 46rpx;
					margin-left: 2rpx;
					padding-left: 3rpx;
					width: 48rpx;
				}
				.txt8 {
					width: 52rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(102, 102, 102, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: justify;
					margin-top: 8rpx;
				}
			}
			.box4 {
				width: 1rpx;
				height: 37rpx;
				background: #eeeeee;
				margin: 20rpx 0 0 38rpx;
			}
			.box5 {
				width: 60rpx;
				height: 88rpx;
				margin: 11rpx 0 0 36rpx;
				.main7 {
					height: 49rpx;
					background-color: rgba(0, 0, 0, 0);
					margin-left: 2rpx;
					padding-top: 6rpx;
					width: 49rpx;
				}
				.word4 {
					width: 52rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(102, 102, 102, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: justify;
					margin-top: 8rpx;
				}
			}
			.status0 {
				height: 104rpx;
				background-color: rgba(253, 111, 45, 1);
				.word5 {
					width: 144rpx;
					height: 36rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(255, 255, 255, 1);
					font-size: 36rpx;
					white-space: nowrap;
					line-height: 36rpx;
					text-align: right;
				}
			}
			.status1 {
				height: 104rpx;
				background-color: #999999;
				.word5 {
					width: 144rpx;
					height: 36rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(255, 255, 255, 1);
					font-size: 36rpx;
					white-space: nowrap;
					line-height: 36rpx;
					text-align: right;
				}
			}
		}
	}
}
.activity-name {
	font-family: PingFangSC-Regular, PingFang SC;
	color: #333333;
}
.title-tag {
	height: 29rpx;
	border-radius: 3px;
	width: 55rpx;
	padding: 2rpx 7rpx 2rpx 7rpx;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 20rpx;
	white-space: nowrap;
	&.self-red {
		background-color: rgba(235, 40, 18, 1);
	}
	&.self-orange {
		background-color: rgba(253, 111, 45, 1);
	}
}
.title-block {
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 1);
	box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 1);
	margin: -48rpx 20rpx 0 20rpx;
}
.info-text {
	display: block;
	width: 100%;
	overflow-wrap: break-word;
	color: rgba(51, 51, 51, 1);
	font-size: 28rpx;
	white-space: nowrap;
}
.info-text2 {
	display: block;
	overflow-wrap: break-word;
	color: rgba(253, 111, 45, 1);
	font-size: 28rpx;
	white-space: nowrap;
}
.icon-box {
	image {
		width: 40rpx;
		height: 40rpx;
	}
}
.call-popup-box {
	background: rgba(0, 0, 0, 0);
	padding: 24rpx 30rpx;
	[class~='call-pop-btn'] {
		height: 100rpx;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 1);
		margin: 0 auto;
		.txt1 {
			width: 120rpx;
			height: 30rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(253, 111, 45, 1);
			font-size: 30rpx;
			white-space: nowrap;
			line-height: 30rpx;
			text-align: center;
		}
		&.cancel-btn {
			.txt1 {
				color: unset;
			}
		}
	}
}
/deep/ .call-way-pop-box .u-drawer-bottom {
	background-color: rgba(0, 0, 0, 0) !important;
}
/deep/ .apply-pop-box .u-drawer-content {
	border-radius: 24rpx 24rpx 0 0 !important;
}
.apply-pop-box {
	.mod3 {
		height: 670rpx;
		border-radius: 24rpx 24rpx 0 0;
		background-color: rgba(245, 245, 245, 1);
		padding-top: 54rpx;
		width: 750rpx;
		.mod4 {
			width: 702rpx;
			height: 528rpx;
			.txt1 {
				width: 96rpx;
				height: 33rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(0, 0, 0, 1);
				font-size: 24rpx;
				font-family: PingFangSC-Medium;
				white-space: nowrap;
				line-height: 33rpx;
				text-align: right;
			}
			.outer1 {
				width: 702rpx;
				height: 201rpx;
				margin-top: 16rpx;
				justify-content: space-between;
				.layer1 {
					height: 92rpx;
					margin-bottom: 17rpx;
					padding-left: 21rpx;
					width: 702rpx;
					border: 2rpx solid #ffe4d8;
					border-radius: 10rpx;
					&.selected {
						border: 2rpx solid #ff0000;
						position: relative;
						&::after {
							content: ' ';
							display: block;
							background: url(/static/activity/check_icon.png) no-repeat;
							background-size: contain;
							width: 30rpx;
							height: 100rpx;
							position: absolute;
							right: -1rpx;
							top: 42rpx;
						}
					}
					.outer2 {
						width: 655rpx;
						height: 85rpx;
						.info1 {
							width: 140rpx;
							height: 28rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(0, 0, 0, 1);
							font-size: 28rpx;
							white-space: nowrap;
							line-height: 28rpx;
							text-align: center;
						}
						.word1 {
							width: 108rpx;
							height: 28rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(253, 111, 45, 1);
							font-size: 28rpx;
							white-space: nowrap;
							line-height: 28rpx;
							text-align: right;
						}
					}
				}
			}
			.info2 {
				width: 96rpx;
				height: 33rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(0, 0, 0, 1);
				font-size: 24rpx;
				font-family: PingFangSC-Medium;
				white-space: nowrap;
				line-height: 33rpx;
				text-align: right;
				margin-top: 48rpx;
			}
			.outer4 {
				height: 84rpx;
				border-radius: 4px;
				background-color: rgba(255, 255, 255, 1);
				margin-top: 48rpx;
				width: 702rpx;
				.section1 {
					width: 702rpx;
					height: 84rpx;
					.txt3 {
						width: 56rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(0, 0, 0, 1);
						font-size: 28rpx;
						white-space: nowrap;
						line-height: 28rpx;
						text-align: right;
						margin-top: 28rpx;
					}
					.word2 {
						width: 34rpx;
						height: 28rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(253, 111, 45, 1);
						font-size: 28rpx;
						white-space: nowrap;
						line-height: 28rpx;
						text-align: right;
						margin: 28rpx 0 0 20rpx;
					}
					.section2 {
						height: 84rpx;
						border-radius: 4px;
						background-color: red;
						margin-left: 241rpx;
						padding-left: 134rpx;
						width: 351rpx;
						.txt4 {
							width: 84rpx;
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
.section1 {
	width: 702rpx;
	height: 84rpx;
	.txt3 {
		width: 56rpx;
		height: 28rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		white-space: nowrap;
		line-height: 28rpx;
		text-align: right;
		margin-top: 28rpx;
	}
	.word2 {
		width: 34rpx;
		height: 28rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(253, 111, 45, 1);
		font-size: 28rpx;
		white-space: nowrap;
		line-height: 28rpx;
		text-align: right;
		margin: 28rpx 0 0 20rpx;
	}
	.section2 {
		height: 84rpx;
		border-radius: 4px;
		background-color: red;
		margin-left: 241rpx;
		padding-left: 134rpx;
		width: 351rpx;
		.txt4 {
			width: 84rpx;
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
.selected {
	background-color: #ff0000 !important;
	color: white;
}
// 调整样式 end
.page {
	position: relative;
	width: 750rpx;
	min-height: 100vh;
	padding-bottom: 50rpx;
	background-color: #ffffff;
	overflow: hidden;
	.main1 {
		z-index: 2;
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		position: relative;
		.bd1 {
			width: 750rpx;
			.bd3 {
				width: 750rpx;
				height: 431rpx;
				// background-color: rgba(216, 216, 216, 1);
			}
			.bd4 {
				margin: 24rpx 0 0 57rpx;
			}
			.bd5 {
				width: 210rpx;
				height: 32rpx;
				margin: 48rpx 0 0 57rpx;
			}
			.bd6 {
				width: 98rpx;
				height: 32rpx;
				margin: 45rpx 0 0 57rpx;
			}
			.bd7 {
				height: 367rpx;
				background-color: rgba(239, 238, 244, 1);
				margin-top: 23rpx;
				width: 750rpx;
				padding: 13rpx 18rpx 0 18rpx;
				.section3 {
					padding-top: 48rpx;
					padding-bottom: 40rpx;
					background: linear-gradient(132deg, #dbe2e8 0%, #d2d9dc 100%);
					border-radius: 16rpx;
					box-shadow: 0 6rpx 1rpx 0rpx #acb4c4;
					border-image: linear-gradient(180deg, rgba(229, 235, 244, 1), rgba(172, 180, 196, 1)) 6 6;
					.main4 {
						width: 621rpx;
						height: 247rpx;
						.layer2 {
							width: 350rpx;
							height: 99rpx;
							margin-left: 1rpx;
							.group2 {
								width: 99rpx;
								height: 99rpx;
								background-color: rgba(255, 255, 255, 1);
								border-radius: 50%;
							}
							.group3 {
								width: 220rpx;
								height: 76rpx;
								margin-top: 17rpx;
								.txt3 {
									width: 192rpx;
									height: 32rpx;
									display: block;
									overflow-wrap: break-word;
									color: rgba(51, 51, 51, 1);
									font-size: 32rpx;
									white-space: nowrap;
									line-height: 32rpx;
									text-align: justify;
								}
								.group4 {
									width: 220rpx;
									height: 24rpx;
									margin-top: 20rpx;
									.txt4 {
										width: 85rpx;
										height: 24rpx;
										display: block;
										overflow-wrap: break-word;
										color: rgba(116, 123, 127, 1);
										font-size: 24rpx;
										white-space: nowrap;
										line-height: 24rpx;
										text-align: justify;
									}
									.bd8 {
										width: 1rpx;
										height: 14rpx;
										background: #747b7f;
										margin-top: 5rpx;
									}
									.word2 {
										width: 95rpx;
										height: 24rpx;
										display: block;
										overflow-wrap: break-word;
										color: rgba(116, 123, 127, 1);
										font-size: 24rpx;
										white-space: nowrap;
										line-height: 24rpx;
										text-align: justify;
									}
								}
							}
						}
						.txt5 {
							width: 242rpx;
							height: 22rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(51, 51, 51, 1);
							font-size: 22rpx;
							white-space: nowrap;
							line-height: 22rpx;
							text-align: justify;
							margin: 30rpx 0 0 1rpx;
						}
						.layer3 {
							height: 1rpx;
							border: 2rpx solid #bcbcbc;
							margin-top: 24rpx;
							margin-bottom: 24rpx;
						}
						.layer4 {
							.info5 {
								width: 96rpx;
								height: 30rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(51, 51, 51, 1);
								font-size: 30rpx;
								white-space: nowrap;
								line-height: 30rpx;
								text-align: justify;
							}
							.txt6 {
								display: block;
								overflow-wrap: break-word;
								color: rgba(51, 51, 51, 1);
								font-size: 30rpx;
								white-space: nowrap;
								text-align: justify;
							}
							.txt7 {
								width: 60rpx;
								height: 30rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(51, 51, 51, 1);
								font-size: 30rpx;
								white-space: nowrap;
								line-height: 30rpx;
								text-align: justify;
								margin-left: 4rpx;
							}
						}
					}
				}
			}
			.bd9 {
				width: 702rpx;
				height: 346rpx;
				background-color: rgba(216, 216, 216, 1);
				margin: 20rpx 0 0 24rpx;
			}
			.bd10 {
				width: 702rpx;
				height: 346rpx;
				background-color: rgba(216, 216, 216, 1);
				margin: 10rpx 0 0 25rpx;
			}
			.bd11 {
				width: 702rpx;
				height: 346rpx;
				background-color: rgba(216, 216, 216, 1);
				margin: 10rpx 0 0 25rpx;
			}
			.bd12 {
				width: 92rpx;
				height: 32rpx;
				margin: 20rpx;
				.word3 {
					width: 52rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(253, 111, 45, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: justify;
				}
			}
		}
		.bd17 {
			z-index: 40;
			border-radius: 8px;
			background-color: rgba(255, 255, 255, 1);
			box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.05);
			left: 24rpx;
			top: 532rpx;
			.block2 {
				margin: 22rpx 0 18rpx 22rpx;
				.txt9 {
					width: 44rpx;
					height: 24rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(101, 113, 127, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 24rpx;
					text-align: justify;
					margin-left: 8rpx;
				}
				.txt10 {
					width: 38rpx;
					height: 24rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(101, 113, 127, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 24rpx;
					text-align: justify;
					margin: 1rpx 0 0 8rpx;
				}
				.info7 {
					width: 44rpx;
					height: 24rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(101, 113, 127, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 24rpx;
					text-align: justify;
					margin: 1rpx 0 0 10rpx;
				}
			}
		}
	}
}
.hideCanvasView {
	position: relative;
}

.hideCanvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}
.flex_row_c_c {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.modalView {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	outline: 0;
	transform: scale(1.2);
	perspective: 2500upx;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out;
	pointer-events: none;
	backface-visibility: hidden;
	z-index: 999;
}

.modalView.show {
	opacity: 1;
	transform: scale(1);
	pointer-events: auto;
}

.flex_column {
	display: flex;
	flex-direction: column;
}

.backgroundColor-white {
	background-color: white;
}

.border_radius_10px {
	border-radius: 10px;
}

.padding1vh {
	padding: 1vh;
}

.posterImage {
	width: 60vw;
}

.flex_row {
	display: flex;
	flex-direction: row;
}

.marginTop2vh {
	margin-top: 2vh;
}
.blueBtn {
	width: 500rpx;
	margin: 50rpx auto;
	display: block;
	/* line-height: 80rpx; */
	line-height: 80rpx;
}
button::after {
	border: none;
}
button {
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	padding-left: 0px;
	padding-right: 0px;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
	-webkit-tap-highlight-color: transparent;
	color: #000000;
	background-color: #fff;
	width: 100%;
	height: 100%;
}
</style>
