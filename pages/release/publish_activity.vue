<template>
	<view>
				<u-navbar :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff" title="发布活动" :custom-back="isback"></u-navbar>
				<u-toast ref="uToast" duration="6000" />
				<!-- header -->
				<view class="activity_box">
					<view class="activity_box_switch">
						<view style="display: flex;align-items: center;">
							
								<text>详情页展示基本信息:</text>
							  <u-icon name="question-circle" color="#ff0000" @click='showinfo(1)' size='28'></u-icon>
							
						</view>
						
						<view class="u-flex">
							<u-switch v-model="form.headerChecked" @change="(e)=>{form.headerChecked = e}"  active-color="green" inactive-color="#eee" size="30"></u-switch>
						</view>
					</view>
					<view>
						<uni-file-picker
								v-model="form.imageValue"
								class="activity-poster"
								fileMediatype="image"
								returnType="array"
								:image-styles="imageStyle"
								:limit="1"
								@delete="imgDelete"
								@success="successimg"
							>
							<image
								src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/xssj/default_poster.png"
								mode="aspectFill"
							></image>
						</uni-file-picker>
					</view>
						<view style="font-size: 24rpx;color: #999999;width: 100%;text-align: center;">建议比例为3:2</view>
						<view class="bob-1px">
								<u-input placeholder-style='{"fontSize: 40rpx"}' placeholder="*请输入活动标题" :border="false" v-model="form.name" input-align="left"></u-input>
						</view>
						<view style="margin-top: 30rpx;" class="flex3jt">
								<view>
										<text><text style="color: red;">*</text>活动类型</text>
										<u-icon name="question-circle" color="#ff0000"  @click='showinfo(2)' size='28'></u-icon>
										
									
								</view>
								
								<view class="">
									<view class="u-flex">
										<text class="word9 u-m-r-10" @tap="showtype = true">{{ form.type ? form.type : '请选择' }}</text>
										<u-icon  name="arrow-right" size='26' color="#c5c5c5"></u-icon>
									</view>
									<u-select v-model="showtype" mode="mutil-column-auto" :list="typeList"  @confirm="selectTypeList" ></u-select>
								</view>				
						</view>
						
						<!-- <view class="ff-m" style="margin-top: 50rpx;"><text style="color: red;">*</text>报名时间<u-icon name="question-circle" color="#ff0000" size='28'  @click='showinfo(3)'></u-icon></view>
						<view class="main6 flex-row" style="display: flex;">
							<text class="word3" @tap="showiftime = true">{{ enrollTimeStart ?enrollTimeStart : enrollnowtime }}</text>
							<text class="txt3">至</text>
							<text class="word4" @tap="showiftime2 = true">{{ enrollTimeEnd ? enrollTimeEnd : enrollnowtime7 }}</text>
						</view> -->
						
						
						<view class="ff-m"style="margin-top: 30rpx;display: flex;align-items: center;justify-content: space-between;">
							<view>
								<text style="color: red;">*</text>活动时间<u-icon name="question-circle" color="#ff0000" size='28'  @click='showinfo(4)'></u-icon>
							</view>							
							<view @click.stop="dataTimeSet" style="width: 100rpx;height: 30rpx;line-height: 30rpx;background-color: #ff0000;color: white;text-align: center;">长期</view>
						</view>
						<view class="main6 flex-row" style="display: flex;margin-top: 30rpx;">
							<text class="word3" @tap="showiftime3 = true">{{ dataTimeStart ? dataTimeStart : nowtime }}</text>
							<text class="txt3">至</text>
							<text class="word4" @tap="showiftime4 = true">{{ dataTimeEnd ? dataTimeEnd : nowtime7 }}</text>
						</view>
				</view>
				<!-- body -->
				<view class="activity_box">
				<!-- 	<view class="activity_box_switch">
						<text>是否展示:</text>
						<view class="u-flex">
							<u-switch v-model="form.bodyChecked" @change="(e)=>{form.bodyChecked = e}" active-color="green" inactive-color="#eee" size="30"></u-switch>
						</view>
					</view> -->
					<view class="flex3jt">
						<text><text style="color: red;">*</text>活动形式:</text>
						<u-radio-group v-model="form.activity_form">
							<u-radio
								@change="activityFormChange"
								v-for="(item, index) in activity_form_list"
								:key="index"
								:name="item.name"
								:disabled="item.disabled"
								active-color="#ff0000"
								label-size="26"
								size="30"
							>
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</view>
					<view v-if="acti == 1">
					<!-- 	<view class="flex3jt  u-m-t-20">
								<text>活动渠道:</text>		
								<view class="">
									<u-input v-model="form.actionSheetqudao" placeholder="请选择渠道" input-align='right' :type="type" :border="border" @click="qudaoshow = true" :disabled="true" />
									<u-action-sheet :list="actionSheetList" v-model="qudaoshow" @click="actionSheetCallback"></u-action-sheet>
								</view>				
						</view> -->
						<view>
							<view class="flex3jt" style="margin-top: 20rpx;">
								<text><text style="color: red;">*</text>仅限服务:</text>
								<u-radio-group v-model="form.only_form">
									<u-radio
										@change="onlyListChange"
										v-for="(item, index) in only_list"
										:key="item.sort"
										:name="item.name"
										:disabled="item.disabled"
										active-color="#ff0000"
										label-size="26"
										size="30"
									>
										{{ item.name }}
									</u-radio>
								</u-radio-group>
								<text v-if="form.onlyList">{{form.onlyList}}</text>
								<u-picker mode="region" v-model="showonlyList" :params="onlyList_params" @confirm="confirmonlyList"></u-picker>
							</view>
						</view>
						<view class="u-m-t-20" style="flex-direction: column;display: flex;">
								<text class="tt-text"><text style="color: red;">*</text>核销信息:</text>		
								<view style="width: 100%;margin-top: 10rpx;">
									<u-input v-model="form.addresstextarea" placeholder="用户报名后，如何参加该活动，此内容将展示在参与者电子票中。"   type="textarea" border height="180" :auto-height="false" :customStyle="{height: '180rpx'}"/>
								</view>				
						</view>
					</view>
					<view v-else>
						<view style="margin: 50rpx 0;" class="flex3jt">
								<text><text style="color: red;">*</text>活动地址:</text>		
								<view class="">
									<view class="u-flex">
										<text class="word9 u-m-r-10" @tap="showRegion = true">{{ form.region ? form.region : '请选择' }}</text>
										<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
									</view>
									<u-picker mode="region" v-model="showRegion" :params="region_params" @confirm="confirmRegion"></u-picker>
								</view>				
						</view>
						<view class="main17 flex3jt">
							<text ><text style="color: red;">*</text>详细地址：</text>
							<view class="u-flex bob-1px">
								<u-input placeholder="请输入详细地址" :border="false" v-model="form.detailedAddress" input-align="left"></u-input>
							</view>
						</view>
						<view class="main17 flex3jt u-m-t-15" @tap="chooseLocation">
							<text ><text style="color: red;">*</text>获取定位位置：</text>
							<view class="u-flex bob-1px">
								<u-input placeholder="请选择定位位置" :border="false" v-model="form.localtion" :disabled='true' input-align="left"></u-input>
								<u-icon name="map-fill" color="#ff0000" size="50" ></u-icon>
							</view>
						</view>
					</view>
				</view>
				<!-- richtext -->
				<view class="activity_box">
					<view v-if="isHtml" @tap="toEditDescribe(form.describe_list)">
						<text class="tt-text"><text style="color: red;">*</text>活动内容:</text>
						<view class="activity_richtext">
							已完善点击编辑
						</view>
					</view>
					<view v-else	@tap="toEditDescribe()">
						<text class="tt-text"><text style="color: red;">*</text>活动内容:</text>
						<view  class="activity_richtext" style="color: red;">
							去完善活动内容
						</view>
					</view>
				</view>
				<!-- info -->
				<view class="activity_box_info" @tap="applySeting(form.enrollSet)">
					<text  class="tt-text"><text style="color: red;">*</text>报名填写信息:</text>	
					<view class="u-flex">
						<text class="word9 u-m-r-10" style="font-size: 26rpx;">{{ activityInfo ? activityInfo : '未设置' }}</text>
						<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
					</view>
				</view>
				<!-- price -->
				<view class="activity_box_price" @tap="jumpticket(form.ticketList)">
				<!-- <view class="activity_box_price"> -->
					<text class="tt-text">报名费用:</text>	
					<view class="u-flex">
						<text class="word9 u-m-r-10" style="font-size: 26rpx;color: red;">{{ activityPrice ? activityPrice : '默认免费' }}</text>
						<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
					</view>
				</view>
				<view class="activity_box_price" @tap="jumpticket(form.ticketList)">
				<!-- <view class="activity_box_price"> -->
					<text class="tt-text">报名按钮文案:</text>	
					<view class="u-flex">
						<u-input v-model="form.btnClerk" :border="false" input-align='right'></u-input>
						<!-- <text class="word9 u-m-r-10" style="font-size: 26rpx;color: red;">{{ form.btnClerk }}</text> -->
						<!-- <u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon> -->
					</view>
				</view>
				<!-- bottom -->
				<view class="activity_box_bottom"  v-if="userstate.state == '已认证'">		
					<view class="activity_box_faqiren">
						<view>
							<text>客服电话</text>
							<u-icon name="question-circle" color="#ff0000" @click='showinfo(5)' size='28'></u-icon>
						</view>
						
						<view>
							<u-input v-model="form.originatorPhone" placeholder="请输入手机号" input-align='right' :type="type" :border="border" />			
						</view>		
					</view>
					
					<view class="activity_box_faqiren"  >
						<text>微信号:</text>
						<view>
							<u-input v-model="form.originatorWechar" placeholder="请输入微信号" input-align='right' :type="type" :border="border" />			
						</view>		
					</view>
					
					<view class="activity_box_faqiren">
						<text>微信/群二维码:</text>
						<view>
							<uni-file-picker
									v-model="form.qrCodeImgValue"
									class="activity-poster"
									fileMediatype="image"
									returnType="array"
									:image-styles="qrCodeImgStyle"
									:limit="1"
									@delete="qrCodeImgDelete"
									@success="successqrCodeImg"
								/>	
						</view>		
					</view>
					
				</view>
				<view class="activity_box_bottom" >
					<text class="tt-text">分享设置:</text>
					<view class="activity_box_faqiren">
						<text>分享链接图片:</text>
						<text style="font-size: 22rpx;color: #999999;">图片比例为5:4</text>
						<view>
							<uni-file-picker
									v-model="form.shareImage"
									class="activity-poster"
									fileMediatype="image"
									returnType="array"
									:image-styles="qrCodeImgStyle"
									:limit="1"
									@delete="shareImageDelete"
									@success="successshareImageImg"
								/>	
						</view>		
					</view>
				</view>
				<view class="activity_box_bottom" >					
					<view class="activity_box_faqiren" style="border-bottom: 0px;color:#1d00f8">
						用户发布的活动达到浏览人数500次且分享次数达到50次，该活动将会推荐到平台首页
					</view>
				</view>
				<u-picker v-model="showiftime" :params="params" :default-time="enrollTimeStart" mode="time" @confirm="confirmenrollStart" :show-time-tag="false"></u-picker>
				<u-picker v-model="showiftime2" :params="params" :default-time="enrollTimeEnd" mode="time" @confirm="confirmenrollEnd" :show-time-tag="false"></u-picker>
				<u-picker v-model="showiftime3" :params="params" :default-time="dataTimeStart" mode="time" @confirm="confirmStart" :show-time-tag="false"></u-picker>
				<u-picker v-model="showiftime4" :params="params" :default-time="dataTimeEnd" mode="time" @confirm="confirmEnd" :show-time-tag="false"></u-picker>	
				
				
				<!-- <enroll-release-header @enrollReleaseHeader="enrollReleaseHeader"  :enrollReleaseHeaderData="enrollReleaseHeaderData"></enroll-release-header>
				<enroll-release-body></enroll-release-body>
				<enroll-release-richtext></enroll-release-richtext>
				<enroll_release_info></enroll_release_info>
				<enroll_release_price></enroll_release_price>
				<enroll_release_bottom></enroll_release_bottom> -->
				<view class="u-text-center u-p-t-10" style="font-size: 24rpx;font-weight: 700;">
				<!-- 	<van-checkbox :value="agreementChecked" data-key="checkbox1" custom-class="u-flex u-row-center u-col-center" checked-color="#ee0a24"
					@change="(e)=>{agreementChecked = e.detail}">
						<text class="text-1">已阅读协议</text>
				
						<text class="text-2"  style="color: blue;" @click.stop="jumpProtocol(8)">《使用协议》</text>
						<text class="text-2">及</text>
						<text class="text-2" style="color: blue;" @click.stop="jumpProtocol(9)">《隐私协议》</text>
					</van-checkbox> -->
					<u-checkbox
					 shape="circle"
					  active-color="red"
						v-model="agreementChecked"	
						@change="(e)=>{agreementChecked = e.detail}"
					>
						<text class="text-1">已阅读协议</text>
										
						<text class="text-2"  style="color: blue;" @click.stop="jumpProtocol(1)">《用户协议》</text>
						<text class="text-2">及</text>
						<text class="text-2" style="color: blue;" @click.stop="jumpProtocol(2)">《隐私协议》</text>
					</u-checkbox>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;width: 700rpx;margin: 20rpx auto;flex-wrap: wrap;">
					<u-button @click="htmlPopShow" class="flex-col justify-center align-center" style="background-color: white;color: black;width: 48%;border: 0;" :hair-line="false">预览</text></u-button>
					<u-button class="flex-col justify-center align-center"  type="error" style="width: 48%;color: white;background-color: #ff0000;" @click="submit(1)" :throttle-time='2000'>
						<text>待发布</text>
						<!-- <view style="display: flex;flex-direction: column;align-items: center;">
							<text>提交</text>
							<text style="font-size: 18rpx;color: #f8f8f8;">将活动放入活动管理，可进行编辑和删除</text>
						</view>	 -->					
					</u-button>
						<u-button class="flex-col justify-center align-center"  type="error" style="width: 100%;color: white;background-color: #ff0000;margin-top: 20rpx;" :throttle-time='2000' @click="submit(2)">
							<text>立即发布</text>
						</u-button>
				</view>
	</view>
</template>
<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	import mpHtml from '@/components/mp-html/mp-html'
	// import enrollReleaseHeader from '@/components/enroll_release_header/enroll_release_header.vue'
	// import enrollReleaseBody from '@/components/enroll_release_body/enroll_release_body.vue'
	// import enrollReleaseRichtext from '@/components/enroll_release_richtext/enroll_release_richtext.vue'
	// import enrollReleasePrice from '@/components/enroll_release_price/enroll_release_price.vue'
	// import enrollReleaseBottom from '@/components/enroll_release_bottom/enroll_release_bottom.vue'
export default {
	// components: {
	// 	mpHtml,enrollReleaseHeader,enrollReleaseBody,enrollReleaseRichtext,enrollReleasePrice,enrollReleaseBottom
	// },
	data() {
		return {
			showtype:false,
			qrCodeImgStyle: {
				height: '200rpx',
				width: '250rpx'
			},
			agreementChecked:false,
			html_show:false,
			isHtml:false,
			supplierInfo:{},
			editid:'',
			enroll_se:[],
			agreement:false,
			imageStyle: {
				height: '426rpx',
				width: '100%',
				position: 'absolute',
				left: '0',
				top: '0',
				opacity:'0'
			},
			fabustate:0,
			constants: {},
			ticket_show: false,
			poster: '', // 海报		
			poster_types_show: false, // 海报类型弹窗
			showRegion: false, // 地区选择器
			showonlyList:false,// 地区选择器
			enrollTimeStart:'',//报名开始时间
			enrollTimeEnd:'',//报名结束时间
			dataTimeStart:'',//活动开始时间
			dataTimeEnd:'',//活动结束时间
			enrollnowtime: '报名开始时间', // 默认开始时间
			enrollnowtime7: '报名结束时间', // 默认结束时间
			nowtime: '活动开始时间', // 默认开始时间
			nowtime7: '活动结束时间', // 默认结束时间
			showiftime:false,
			showiftime2:false,
			showiftime3:false,
			showiftime4:false,
			activityInfo:'',
			activityPrice:'',
			params: {
				// 选中时间分解参数
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true
			},
			
			region_params: {
				// 选中地区分解参数
				province: true,
				city: true,
				area: true
			},
			onlyList_params: {
				// 选中地区分解参数
				province: true,
				city: true,
				area: false
			},
			form: {
				name: '', // 主题
				describe:'',
				is_exposure: true, // 是否允许曝光
				isSubmit: false, // 是否允许检票后退款
				describe_list: '',
				latitude:0,
				longitude:0,
				enrollTimeStart:'',//报名开始时间
				enrollTimeEnd:'',//报名结束时间
				dataTimeStart:'',//活动开始时间
				dataTimeEnd:'',//活动结束时间
				activity_type:'',
				activity_form:'线上活动',
				headerChecked:true,
				bodyChecked:true,
				bottomChecked:true,
				actionSheetqudao:'',
				addresstextarea:'',
				detailedAddress:'',
				only_form:'',
				btnClerk:'我要报名',
				region: '', // 选中地区
				localtion:'',
				isDistribution:'',
				qrCodeImgValue:[],
				imageValue:[],
				enrollSet: [],
				ticketList:[],
				shareCount:0,
				onlyList:'',
				type:'',
				subtype:'',
				cause:'不支持退款',
				state:'',
				originatorName:'',
				originatorPhone:'',
				originatorWechar:'',
				role:'个人',
				openid:'',
				browse:0,
				supplierId:'',
				subMchId:'',
				userinfo:{},
				shareImage:[]
			},		
			only_list: [
				{
					name: '全国',
					sort:11,
					disabled: false
				},
				{
					name: '仅限地区',
					sort:12,
					disabled: false
				}
			],
			activity_form_list: [
				// 活动形式
				{
					name: '线上活动',
					disabled: false
				},
				{
					name: '线下活动',
					disabled: false
				}
			],
			acti:1,
			region_params: {
				// 选中地区分解参数
				province: true,
				city: true,
				area: true
			},
			qudaoshow:false,
			typeList: [
			{
				label: '会议招商',
				children: [   
					{
						label: '招商会'
					},
					// {
					// 	label: '投资研讨会'
					// },
					{
						label: '项目介绍会'
					},
					{
						label: '大型会议'
					},
					{
						label: '沙龙会议'
					}
				]
			}, 
			{
				label: '创业项目',
				children: [     
					{
						label: '项目路演'
					},
					{
						label: '创业分享'
					},
					{
						label: '企业招商'
					}
				]
			}, 
			{
				label: '企业服务',
				children: [
					{
						label: '人力资源服务'
					},
					{
						label: '财税法服务'
					}
					// ,
					// {
					// 	label: '企业战略管理'
					// }
				] 
			},
			{
				label:'互联网'	,
				children: [ 
						{
							label: '互联网'
						},
						{
							label: '区块链'
						},
						{
							label: '新媒体'
						},
						{
							label: '人工智能'
						},
						{
							label: '大数据'
						},
						{
							label: '小程序'
						},
						{
							label: 'VR/AR'
						},
						{
							label: '物联网'
						},
						{
							label: '云计算'
						},
						{
							label: '游戏'
						}
					] 
			},
			{
				label:'求购信息',
				children: [
					{
						label: '二手物品'
					},
					{
						label: '宠物'
					},
					{
						label: '闲置'
					}
				] 
			},
			{
				label:'旅游咨询',
				children: [ 
					{
						label: '周边游'
					},
					{
						label: '国内游'
					},
					{
						label: '出境游'
					},
					{
						label: '主题游'
					},
					{
						label: '景点门票'
					}
				] 
			},
			{
				label:'运动/户外',
				children: [  
					{
						label: '休闲运动'
					},
					{
						label: '体育赛事'
					},
					{
						label: '极限运动'
					},
					{
						label: '健康养生'
					}
				] 
			},
			{
				label:'丽人',
				children: [
					{
						label: '美妆'
					},
					{
						label: '服饰穿搭'
					},
					{
						label: '美容SPA'
					},
					{
						label: '瑜伽'
					},
					{
						label: '瘦身塑形'
					},
					{
						label: '魅力提升'
					},
					{
						label: '心理'
					}
				]
			},
			{
				label:'亲子活动',
				children: [
					{
						label: '早教'
					},
					{
						label: '小初高'
					},
					{
						label: '才艺启蒙'
					},
					{
						label: '家庭教育'
					},
					{
						label: '亲子游'
					},
					{
						label: '亲子DIY'
					},
					{
						label: '主题乐园'
					},
					{
						label: '儿童剧'
					},
					{
						label: '体格锻炼'
					},
					{
						label: '营地教育'
					},
					{
						label: '母婴孕育'
					},
					{
						label: '亲子摄影'
					}
				]
			},
			{
				label:'其它专区',
				children: [
					{
						label: '其它专区'
					}
				]
			}
			],
			userstate:{},
			keyinfo:''
		};
	},
	onShow() {
		let date = new Date().getTime();
		this.enrollTimeStart = uni.$u.timeFormat(date, 'yyyy-mm-dd hh:MM:ss'); //当前时间
		this.enrollTimeEnd = uni.$u.timeFormat(date + 2592000000, 'yyyy-mm-dd hh:MM:ss'); //7天后时间
		this.dataTimeStart = uni.$u.timeFormat(date, 'yyyy-mm-dd hh:MM:ss'); //当前时间
		this.dataTimeEnd = uni.$u.timeFormat(date + 2592000000, 'yyyy-mm-dd hh:MM:ss'); //7天后时间
		this.form.enrollTimeStart = new Date(this.enrollTimeStart.replace(/-/g, '/')).getTime()
		this.form.enrollTimeEnd = new Date(this.enrollTimeEnd.replace(/-/g, '/')).getTime()
		this.form.dataTimeStart = new Date(this.dataTimeStart.replace(/-/g, '/')).getTime()
		this.form.dataTimeEnd = new Date(this.dataTimeEnd.replace(/-/g, '/')).getTime()
	
	},
	onLoad(options) {
		this.editid = options.edit
		this.keyinfo = uni.getStorageSync('userinfoKey')
		this.supplierState()
		// this.getuserinfo()
		if(this.editid){
			this.editdata(this.editid)
			uni.setNavigationBarTitle({
			    title:'编辑活动'
			})
		}
	},
	
	methods: {
		dataTimeSet(){
			let date = new Date().getTime();
			this.dataTimeEnd = uni.$u.timeFormat(date + 2592000000 * 12, 'yyyy-mm-dd hh:MM:ss'); //1年后时间
			this.form.dataTimeEnd = new Date(this.dataTimeEnd.replace(/-/g, '/')).getTime()
		},
		supplierState(){
			db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
				console.log(res,'resssss');
				this.userstate = res.result.data[0]
				if(res.result.data[0].state == '已认证'){
					this.form.supplierId = this.userstate.supplierId
					this.form.subMchId = this.userstate.subMchId
					this.form.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
					this.form.userinfo.nickName = this.userstate.nickName
					this.form.userinfo.avatarUrl = this.userstate.headImgUrl
					this.form.userinfo.status = this.userstate.state
					this.form.userinfo.uid = this.userstate._id
				}else{
					this.form.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
					this.form.userinfo.nickName = this.keyinfo.nickName
					this.form.userinfo.avatarUrl = getApp().globalData.headImgUrl
					this.form.userinfo.status = '未认证'
					this.form.userinfo.uid = this.userstate._id
				}
			})
		},
		showinfo(e){
			if(e == 1){
				this.$refs.uToast.show({
					title: '关闭后商家的头像名称及活动基本设置不会展示在活动详情页，仅能在提交报名时查看。',
					type: 'default',
				})
			}else if(e == 2){
				this.$refs.uToast.show({
					title: '线下:有具体活地活动址,线上:通过网络工具举行的活动',
					type: 'default',
				})
			}else if(e == 3){
				this.$refs.uToast.show({
					title: '用户可以报名的时间，未到达/已超过后无法继续报名。',
					type: 'default',
				})
			}else if(e == 4){
				this.$refs.uToast.show({
					title: '活动举行时间，以实际时间为准。',
					type: 'default',
				})
			}else if(e == 5){
				this.$refs.uToast.show({
					title: '用户联系商家的方式',
					type: 'default',
				})
			}
			
		},
		isback(){
			uni.showModal({
			    title: '提示',
			    content: '你有未发布的活动，是否继续编辑',
					cancelText: "否", // 取消按钮的文字  
					confirmText: "是", // 确认按钮文字  
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#ff0000',
					cancelColor: '#000000',
			    success: function (res) {
			        if (res.confirm) {
								
							}else{
								uni.navigateBack()
							}
					},
			})
		},
		selectTypeList(e){
			console.log(e)
			this.form.type = e[0].label
			this.form.subtype = e[1].label
		},
		getuserinfo(){
			this.form.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
			this.form.userinfo.nickName = this.keyinfo.nickName
			this.form.userinfo.avatarUrl = getApp().globalData.headImgUrl
			this.form.userinfo.status = '未认证'
		},
		successqrCodeImg(e){
			uni.showToast({
				title:'上传成功',
				icon:"none"
			})
		},
		qrCodeImgDelete(e){
			uniCloud.deleteFile({
				fileList:[e.tempFilePath]
			}).then(res=>{
				uni.showToast({
					title:'删除成功',
					icon:"none"
				})
			})
		},
		successshareImageImg(e){
			uni.showToast({
				title:'上传成功',
				icon:"none"
			})
		},
		shareImageDelete(e){
			uniCloud.deleteFile({
				fileList:[e.tempFilePath]
			}).then(res=>{
				uni.showToast({
					title:'删除成功',
					icon:"none"
				})
			})
		},
		confirmonlyList(e){
			console.debug('仅限地区', e);
			this.form.onlyList = `${e.province.label} ${e.city.label}`;
		},
		confirmRegion(e) {
				console.debug('选地区', e);
				this.form.region = `${e.province.label} ${e.city.label} ${e.area.label}`;
			},
			activityFormChange(e){
				this.form.activity_form = e
				console.log(e,'dddd');
				if(e == '线上活动'){
					this.acti = 1
					this.form.detailedAddress = ''
					this.form.region = ''
					this.form.localtion = ''
					this.form.latitude = 0
					this.form.longitude = 0
				}else{
					this.acti = 2
					this.form.actionSheetqudao = ''
					this.form.addresstextarea = ''
				}
			},
			actionSheetCallback(index) {
				this.form.actionSheetqudao = this.actionSheetList[index].text;
							
			},
		
		htmlPopShow(){
			uni.showToast({
				title:'暂未开放',icon:"none"
			})
			return
			if(this.isHtml){
				this.html_show = true
			}else{
				uni.showToast({
					title:'请先编辑活动详情',icon:"none"
				})
				return
			}
		},
		editdata(id){
			db.collection('activityList').doc(id).get().then(res=>{
				console.log(res);
				let result = res.result.data[0]
				this.form = result
				this.isHtml = true
				this.enrollTimeStart = uni.$u.timeFormat(result.enrollTimeStart, 'yyyy-mm-dd hh:MM:ss')
				this.enrollTimeEnd = uni.$u.timeFormat(result.enrollTimeEnd, 'yyyy-mm-dd hh:MM:ss')
				this.dataTimeStart = uni.$u.timeFormat(result.dataTimeStart, 'yyyy-mm-dd hh:MM:ss')
				this.dataTimeEnd = uni.$u.timeFormat(result.dataTimeEnd, 'yyyy-mm-dd hh:MM:ss')
				if(this.form.enrollSet.length >= 1){
					this.activityInfo = '已设置'
				}
				if(this.form.ticketList.length >= 1 && this.form.role !== '个人'){
					this.activityPrice = '已设置'
				}
				if(result.activity_form == '线上活动'){
					this.acti = 1
				}else{
					this.acti = 2
				}
				// for(let i= 0;i<this.activity_set_list.length;i++){
				// 	let item = this.activity_set_list[i]
				// 	for (let j = 0;j<=i;j++) {
				// 		if(item.name == result.enroll_se[j].name){
				// 			item.checked = true
				// 		}
				// 	}
					
				// }
				
			})
		},
		jumpProtocol(e){
			this.$u.route({url:'pages/login/agreement?id='+e})
		},
		chooseLocation(){
			console.log(123);
			uni.chooseLocation({
				success: data=> {
					console.log(data);
					this.form.localtion = data.name
					this.form.latitude = data.latitude;
					this.form.longitude = data.longitude;
				}
			})
		},
		// tianjia() {
		// 	let obj = {
		// 		ticket_title: '',
		// 		ticket_price: 0
		// 	};
		// 	this.enrollSet.push(obj);
		// 	console.log(this.enrollSet.length, this.enrollSet, 'ddd');
		// },
		// shanchu() {
		// 	this.enrollSet.pop();
		// },
		ticketSubmit(){
			this.ticket_show = false

		},

		submitFORM(e){
			if(e == 1){
				if(this.editid){
					delete this.form._id
					console.log(this.form,'form');
					db.collection('activityList').doc(this.editid).update({
						...this.form
					}).then(res=>{
						console.log(res,'res');
						uni.showToast({
							title:'编辑活动成功'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/release/activity_management'
							})
						},500)
					})
				}else{
					db.collection('activityList').add({
						...this.form
					}).then(res=>{
						console.log(res,'res');
						uni.showToast({
							title:'发布活动成功'
						})
						
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/release/activity_management'
							})
						},500)
					})
				}
			}else{
				uni.showModal({
					title: '是否发布活动',
					content: '注:发布后活动信息无法进行修改、删除',
					success: res => {
						if (res.confirm){
							if(this.editid){
								delete this.form._id
								this.form.isSubmit = true
								this.form.state = '进行中'
								console.log(this.form,'form');
								db.collection('activityList').doc(this.editid).update({
									...this.form
								}).then(res=>{
									console.log(res,'res');
									uni.showToast({
										title:'编辑活动成功'
									})
									setTimeout(()=>{
										uni.redirectTo({
											url:'/pages/release/activity_management'
										})
									},500)
								})
							}else{
								this.form.isSubmit = true
								this.form.state = '进行中'
								db.collection('activityList').add({
									...this.form
								}).then(res=>{
									console.log(res,'res');
									uni.showToast({
										title:'发布活动成功'
									})									
									setTimeout(()=>{
										uni.redirectTo({
											url:'/pages/release/activity_management'
										})
									},500)
								})
							}
						}
					}
				})
			}
			
		},
		submit(e) {
			console.log(this.form,'form');
			// var nowdate = Date.now()
			// var stated = ''
			// if(nowdate < this.form.dataTimeStart){
			// 	stated = '待开始'
			// }else if(this.form.dataTimeEnd > nowdate > this.form.dataTimeStart){
			// 	stated = '进行中'
			// }else if(this.form.dataTimeEnd < nowdate){
			// 	stated = '已结束'
			// }
			if(this.form.imageValue.length == 0){
				uni.showToast({
					title:'请选择活动封面',icon:"none"
				})
				return
			}
			if(!this.form.name){
				uni.showToast({
					title:'请输入活动标题',icon:"none"
				})
				return
			}
			if(!this.form.type){
				uni.showToast({
					title:'请选择活动类型',icon:"none"
				})
				return
			}
			// if(!this.form.enrollTimeStart){
			// 	uni.showToast({
			// 		title:'请选择报名开始时间',icon:"none"
			// 	})
			// 	return
			// }
			// if(!this.form.enrollTimeEnd){
			// 	uni.showToast({
			// 		title:'请选择报名结束时间',icon:"none"
			// 	})
			// 	return
			// }
			if(!this.form.dataTimeStart){
				uni.showToast({
					title:'请选择活动开始时间',icon:"none"
				})
				return
			}
			if(!this.form.dataTimeEnd){
				uni.showToast({
					title:'请选择活动结束时间',icon:"none"
				})
				return
			}
			if(!this.form.activity_form){
				uni.showToast({
					title:'请选择活动形式',icon:"none"
				})
				return
			}
			if(this.form.activity_form=='线上活动'){
				if(!this.form.addresstextarea){
					uni.showToast({
						title:'请选择核销信息',icon:"none"
					})
					return
				}
			}else if(this.form.activity_form=='线下活动'){
				if(!this.form.region){
					uni.showToast({
						title:'请选择活动地址',icon:"none"
					})
					return
				}
				if(!this.form.detailedAddress){
					uni.showToast({
						title:'请输入详细地址',icon:"none"
					})
					return
				}
				if(!this.form.localtion){
					uni.showToast({
						title:'请选择定位位置',icon:"none"
					})
					return
				}
			}
			if(!this.isHtml){
				uni.showToast({
					title:'请设置活动内容',icon:"none"
				})
				return
			}
			
			
			if(!this.activityInfo){
				uni.showToast({
					title:'请设置报名信息',icon:"none"
				})
				return
			}
			if(this.form.ticketList.length == 0){
				this.form.ticketList.push({
					title: '参与/报名',
					price: '免费',
					ticket_amount:'不限',
					limit_num:1
				})
				this.form.cause = ''
			}
			
			// if(this.form.enrollTimeStart >= this.form.enrollTimeEnd){
			// 	uni.showToast({
			// 		title:'报名开始时间不能小于结束时间',icon:"none"
			// 	})
			// 	return
			// }
			if(this.form.dataTimeStart >= this.form.dataTimeEnd){
				uni.showToast({
					title:'活动开始时间不能小于结束时间',icon:"none"
				})
				return
			}
			
			if(this.form.shareImage.length == 0){
				uni.showToast({
					title:'请选择分享图片',icon:"none"
				})
				return
			}
			
			if(!this.agreementChecked){
				uni.showToast({
					title:'请勾选协议',icon:"none"
				})
				return
			}

			wx.requestSubscribeMessage({
			   tmplIds: ['S_a8CtEg1cPQ57cUmpBowcPKBVPxevdQ22rClE4WFiM'],
			   success: res => {
			     console.log('调起成功');
			    },
			   fail: err => {
			    console.log('调起失败');
			   },
				 complete:com=>{
					 this.submitFORM(e)
				 }
				
			 });
			
			
		},
		
		toEditDescribe(item) {
			console.log(item,'696969');
			uni.navigateTo({
				url: '/pages/release/edit_activity_describe',
				// url: '/pages/activity/edit_activity_describe',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: data => {
						console.log(data,'qqqqq');
						this.form.describe_list = data.describe_list;
						this.isHtml = true
						console.log(this.form.describe_list,'data.describe_list');
					},
					someEvent: function(data) {
					}
				},
				success: function(res) {
				    // 通过eventChannel向被打开页面传送数据
					// console.log(res,'998');
				    res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
				}
			});
		},
		checkboxChange(n) {
			if(this.editid){
				this.agreement = true
			}else{
				this.agreement = n.value
			}
		},
	
		
		imgDelete(e){
			uniCloud.deleteFile({
				fileList:[e.tempFilePath]
			}).then(res=>{
				uni.showToast({
					title:'删除成功',
					icon:"none"
				})
			})
		},
		successimg(e){
			uni.showToast({
				title:'上传成功',
				icon:"none"
			})
			this.$emit('enrollReleaseHeader',e);
		},
		confirmStart(e) {
			this.dataTimeStart = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
			this.form.dataTimeStart = new Date(this.dataTimeStart.replace(/-/g, '/')).getTime()
		},
		confirmEnd(e) {
			console.debug('选时间', e);
			this.dataTimeEnd = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
			this.form.dataTimeEnd = new Date(this.dataTimeEnd.replace(/-/g, '/')).getTime()
		},
		confirmenrollStart(e) {
			this.enrollTimeStart = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
			this.form.enrollTimeStart = new Date(this.enrollTimeStart.replace(/-/g, '/')).getTime()
		},
		confirmenrollEnd(e) {
			console.debug('选时间', e);
			this.enrollTimeEnd = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
			this.form.enrollTimeEnd = new Date(this.enrollTimeEnd.replace(/-/g, '/')).getTime()
		},
	
		

		// 选择活动类型时触发
		activityTypeChange(e) {
			console.log(e,'pppp');
			this.form.activity_type = e
		},
		onlyListChange(e){
			console.log(e,'qqq');
			if(e == '仅限地区'){
				this.showonlyList = true
			}else{
				this.form.onlyList = ''
			}
		},
		choosePoster() {
			this.poster_types_show = true;
		},
		chooseImg(type) {
			this.poster_types_show = false;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: [type], //从相册选择
				success: res => {
					this.poster = res.tempFilePaths[0];
				}
			});
		},

	

		// 报名设置
		applySeting(item) {
			uni.navigateTo({
				url: '/pages/release/apply_seting',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: data => {
						this.form.enrollSet = data.item_list;
						if(data.item_list.length >= 1){
							this.activityInfo = '已设置'
						}else{
							this.activityInfo = ''
						}
					},
					someEvent: function(data) {
						console.log(data);
					}
				},
				success: function(res) {
					console.log(res,'res');
				    res.eventChannel.emit('applySetingFormtextandoptions', { data: item })
				}
			});
		},
		jumpticket(item){
			if(this.userstate.state == '已认证' && this.userstate.subMchId){
			
			// if(!this.supplierInfo.supplierId){
			// 		uni.showModal({
			// 		    title: '温馨提示',
			// 		    content: '认证后可发起收费活动，未认证只能享受平台免费活动发布，请点击开通',
			// 				cancelText: "取消", // 取消按钮的文字  
			// 				confirmText: "去开通", // 确认按钮文字  
			// 				showCancel: true, // 是否显示取消按钮，默认为 true
			// 				confirmColor: '#ff0000',
			// 				cancelColor: '#000000',
			// 		    success: function (res) {
			// 		        if (res.confirm) {
			// 		            uni.navigateTo({
			// 		            	url:'/pages/login/Merchant_enroll'
			// 		            })
			// 		        } else if (res.cancel) {
			// 		            console.log('用户点击取消');
			// 		        }
			// 		    }
			// 		});
			// 		return
			// }
			uni.navigateTo({
				url:'/pages/release/set_entry_fee',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: data => {
						console.log(data,'777777');
						console.log(data.tickets,data.cause,'8888');
						this.form.ticketList = data.tickets;
						this.form.cause = data.cause;
						this.form.isDistribution = data.isDistribution
						if(data.tickets.length >= 1){
							this.activityPrice = '已设置'
						}else{
							this.activityPrice = ''
						}
					},
					someEvent: function(data) {
						console.log(data);
					}
				},
				success: res => {					
					let _this = this
					let result = {
						tickets:item,
						cause:_this.form.cause,
						isDistribution:_this.form.isDistribution
					}
					console.log(res,'res');
				     res.eventChannel.emit('applySetingFormtickList', { data: result })
				}
			})
			}
		},
		
		// 售后电话
		afterSaleTelSeting() {
			uni.navigateTo({
				url: '/pages/activity/after_sale_tel',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: data => {
						this.form.service_call = data.tel;
					},
					someEvent: function(data) {
						
					}
				}
			});
		}
	}
}
</script>
<style>
	page{
		background-color: #e7e7e7;
	}
</style>
<style lang="scss" scoped>
	// /deep/ .u-size-default.data-v-6e15e680{
	// 	line-height: 1.2;
	// }
	// /deep/ .u-btn--default.data-v-6e15e680{
	// 	border-color: #fff;
	// }
	.activity_box{
		width: 700rpx;background-color: #fff;box-shadow: 0 0 10px 0 #bcbcbc;margin: 20rpx auto;padding: 40rpx;
	}
	.activity_box_switch{
		display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;
		text{
			font-size: 26rpx;font-weight: 700;
		}
	}
	.bob-1px{
		border-bottom: 1px solid #bcbcbc;
	}
	.ff-m{
		font-weight: 700;font-size:26rpx;margin: 20rpx 0;
	}
	.flex3jt{
		display: flex;align-items: center;justify-content: space-between;
		text{
			font-size: 26rpx;font-weight: 700;
		}
	}
	.activity_richtext{
		width: 100%;height: 300rpx;display: flex;align-items: center;justify-content: center;border: 1px dashed #bcbcbc;margin-top: 20rpx;
	}
	.activity_box_info{
		width: 700rpx;height:100rpx;background-color: #fff;box-shadow: 0 0 10px 0 #bcbcbc;margin: 20rpx auto;padding: 10rpx 40rpx ;display: flex;align-items: center;justify-content: space-between;
	}
	.tt-text{
		font-size: 26rpx;font-weight: 700;
	}
	.activity_box_price{
		width: 700rpx;height:100rpx;background-color: #fff;box-shadow: 0 0 10px 0 #bcbcbc;margin: 0rpx auto;padding: 10rpx 40rpx ;display: flex;align-items: center;justify-content: space-between;
	}
	.activity_box_bottom{
		width: 700rpx;background-color: #fff;box-shadow: 0 0 10px 0 #bcbcbc;margin: 20rpx auto;padding: 10rpx 40rpx ;
		.content{
			display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;
		}
	}
	.activity_box_faqiren{
		display: flex;align-items: center;border-bottom: 1px solid #bcbcbc;justify-content: space-between;margin: 20rpx 0;
		text{
			font-size: 26rpx;font-weight: 700;
		}
	}
	.word9 {
						display: block;
						overflow-wrap: break-word;
						color: rgba(197, 205, 218, 1);
						font-size: 26rpx;
						white-space: nowrap;
						text-align: right;
					}
.main6 {
				width: 100%;
				height: 40rpx;
				// margin: 24rpx 0;
				// padding: 20rpx 0;
				margin-top: 20rpx;
				border-bottom: 1px solid #bcbcbc;
				.word2 {
					width: 78rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(0, 0, 0, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: right;
				}
				.word3 {
					width: 224rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: center;
					// border-bottom: 1px solid #bcbcbc;
					// margin-left: 9rpx;
				}
				.txt3 {
					width: 26rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 26rpx;
					font-weight: 700;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: center;
					margin-left: 75rpx;
				}
				.word4 {
					width: 224rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 26rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: left;
					margin-left: 15rpx;
				}
			}
</style>
