<template>
	<view class="page flex-col">
		<!-- <view class="u-flex search-box">
			<u-search placeholder="请输入商品名称" v-model="keyword" class="u-flex-1 u-m-r-20" :show-action="false" shape="square"></u-search>
			<view @tap="status_options_show = true">
				<text>筛选</text>
				<u-icon name="arrow-down" size="30"></u-icon>
			</view>
		</view> -->
		<view style="margin-top: 50rpx;" v-if="dataList.length == 0"><u-empty text="暂无数据" mode="list"></u-empty></view>
		<view class="layer1 flex-col">
			<view class="outer1 flex-col justify-between">
				<view class="outer3 flex-col justify-between show-data-end">
					<view class="group3 flex-col u-m-t-20" v-for="(item, index) in dataList" :key="index" @click="current(index)">
						<view class="bd1 flex-col">
							<text class="info4 u-line-1" style="text-align: left;color: black;font-weight: 700;">{{ item.name }}</text>
							<view class="box1 flex-col"></view>
							<view class="box2 flex-row">
								<image :src="item.imageValue[0].url" style="width: 210rpx;height: 150rpx;" mode="aspectFill"></image>
								<view class=" flex-col" style="margin-left: 12rpx;">
									<!-- 	<view style="font-size: 22rpx;color: #999999;">
										报名时间：{{item.enrollTimeStart | date('mm/dd hh:MM')}}至{{item.enrollTimeEnd | date('mm/dd hh:MM')}}
									</view> -->
									<view style="font-size: 22rpx;color: #999999;">开始时间：{{ item.dataTimeStart | date('mm/dd hh:MM') }}至{{ item.dataTimeEnd | date('mm/dd hh:MM') }}</view>
									<view style="font-size: 22rpx;color: #999999;">
										费用：
										<text style="font-size: 22rpx;color: red;" v-if="item.ticketList[0].price == '免费'">{{ item.ticketList[0].price }}</text>
										<text style="font-size: 22rpx;color: red;" v-else>{{ item.ticketList[0].price }}元起</text>
									</view>
									<view style="font-size: 22rpx;color: #999999;">状态：{{ item.state || '未发布' }}</view>
									<view style="font-size: 22rpx;color: #999999;">已报名：{{ item.baomingnum }}人</view>
								</view>
							</view>
							<!-- 推广方式 底部弹窗 -->
							<u-popup mode="bottom" v-model="push_type_show" :custom-style="{ margin: '0rpx 24rpx 40rpx', borderRadius: '6rpx' }">
								<view class="content">
									<view class="main1 flex-col">
										<view class="block2 flex-col">
											<text class="word1">选择以下方式推广活动</text>
											<view class="box2 flex-col"></view>
											<view class="u-flex u-row-around u-p-t-40">
												<view @tap="qrCodeResult(item)">
													<u-icon
														name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/haibao.png"
														class="u-flex u-row-center"
														width="77"
														height="77"
													></u-icon>
													<view>分享海报</view>
												</view>
												<view>
													<button open-type="share">
														<u-icon
															style="margin-top: 10rpx;"
															name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/lianjie.png"
															class="u-flex u-row-center"
															width="77"
															height="77"
														></u-icon>
														<view style="font-size: 28rpx;margin-top: -10rpx;">分享链接</view>
													</button>
												</view>
												<view @tap="qrCodeResult2(item)">
													<u-icon
														name="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/erweima.png"
														class="u-flex u-row-center"
														width="77"
														height="77"
													></u-icon>
													<view>保存二维码</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</u-popup>
							<view class="box3 flex-col"></view>
							<view class="box4 flex-row justify-between">
								<view class="mod5 flex-col" v-if="item.isSubmit" @tap="push_type_show = true"><text class="info61">分享</text></view>
								<view class="mod5 flex-col" v-if="item.isSubmit" @tap="getExcel(item)"><text class="info61">信息下载</text></view>
								<view class="mod5 flex-col" v-if="item.isSubmit" @tap="dataView(item)"><text class="info61">数据查看</text></view>
								<view class="mod5 flex-col" v-if="item.isSubmit" @tap="downData(item)"><text class="info61">下架</text></view>
								<view class="mod5 flex-col" v-if="item.isSubmit" @tap="dingyue()"><text class="info61">订阅</text></view>
								<!-- <view class="mod3 flex-col" @tap="$u.route({ url: 'pages/activity/apply_management' })"><text class="txt3">报名</text></view> -->
								<view class="mod4 flex-col" v-if="!item.isSubmit"><text class="info6" @tap="submitForm(item._id)">立即发布</text></view>
								<view class="mod4 flex-col" v-if="!item.isSubmit"><text class="info6" @tap="$u.route({ url: 'pages/release/publish_activity?edit=' + item._id })">编辑</text></view>
								<view class="mod4 flex-col" @click="deleteForm(item._id)" v-if="!item.isSubmit"><text class="info6">删除</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{ width: (poster.width || 10) + 'px', height: (poster.height || 10) + 'px' }"></canvas>
		</view>

		<u-select v-model="status_options_show" :list="list" @confirm="setStatus"></u-select>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
import _app from '@/components/QS-SharePoster/app.js';
import {getSharePoster} from '@/components/QS-SharePoster/QS-SharePoster.js';
export default {
	data() {
		return {
			poster: {},
			qrShow: false,
			canvasId: 'default_PosterCanvasId',
			showShare: false, //是否显示分享海报
			openid:'',
			dataList: [],
			keyword: '', // 搜索关键字
			constants: {},
			cur_status: '',
			push_type_show: false, // 推广方式
			status_options_show: false, // 活动状态选择器显示
			list: [
				// 退款期限
				{
					value: 1,
					label: '全部'
				},
				{
					value: 2,
					label: '未进行'
				},
				{
					value: 3,
					label: '进行中'
				},
				{
					value: 4,
					label: '已结束'
				}
			],
			activity_list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			userInfo:[],
			cur:0,
			title: 'Hello',
			dataExcel: [],
			mapping: {
				sort: '排序',
				name: '姓名',
				phone: '联系方式',
				company: '公司',
				position: '职位',
				price: '门票',
				weChat: '微信',
				QQ: 'QQ',
				age: '年龄',
				ndustry: '行业',
				email: '邮箱'				
			},
			type: 'file' //base64 转本地下载 file 文件url  其他方法参见 https://www.npmjs.com/package/xlsx 搜索 input type
		};
	},
	onLoad() {
		 this.openid = uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID
		 this.userInfo = uni.getStorageSync('userinfoKey')
		 this.loadData(this.openid)
	},
	onShareAppMessage(res) {
		let _this = this;
		if (res.from === 'button') {
			// 来自页面内分享按钮
			return {
				title: _this.dataList[this.cur].name,
				imageUrl: _this.dataList[this.cur].imageValue[0].url,
				path: '/pages/activity/activity_detail?id=' + _this.dataList[this.cur]._id
			};
		}
	},
	methods: {
		dingyue(){
			wx.requestSubscribeMessage({
			   tmplIds: ['S_a8CtEg1cPQ57cUmpBowcPKBVPxevdQ22rClE4WFiM'],
			   success: res => {
					 if(res.S_a8CtEg1cPQ57cUmpBowcPKBVPxevdQ22rClE4WFiM == 'accept'){
						 uni.showToast({
						 	title:'订阅成功'
						 })
					 }else{
						 uni.showToast({
						 	title:'取消订阅',icon:'none'
						 })
					 }
					 
			    },
			   fail: err => {
			    console.log('调起失败');
			   },
				 
				
			 });
		},
		downData(item){
			console.log(item,'6666');
			if(item.baomingnum > 0){
				uni.showToast({
					title:'该活动已有人报名，无法下架',icon:'none'
				})
				return
			}else{
				uni.showModal({
					title: '提示',
					content: '是否下架该活动',
					success: res => {
						if (res.confirm){
							db.collection('activityList').doc(item._id).update({
								isSubmit:false,
								state:'未发布'
							}).then(res=>{
									uni.showToast({
										title:'下架成功',
										icon:"none"
									})
									setTimeout(()=>{
										this.loadData(this.openid)
									},1000)
							})

						}
					}
				})
			}


		},
		dataView(item){
			this.$u.route({url:'pages/activity/dataView?item=' + item._id})
		},
		async getExcel(item) {
			console.log(item,'item');
			let excel = await db.collection('enroll_info').where({'dataList._id':item._id}).get()
			let dataExcel = excel.result.data
			let excelData = []
			for (var index = 0; index < dataExcel.length; index++) {
				let obj = {}
				obj.sort = index + 1
				obj.price = dataExcel[index].price
				for (var i = 0; i < dataExcel[index].info.length; i++) {
					let it = dataExcel[index].info[i]					
					if(it.name == '姓名'){
						obj.name = it.value
					}else if(it.name == '联系电话'){
						obj.phone = it.value
					}else if(it.name == '公司'){
						obj.company = it.value
					}else if(it.name == '职位'){
						obj.position = it.value
					}else if(it.name == '微信'){
						obj.weChat = it.value
					}else if(it.name == 'QQ'){
						obj.QQ = it.value
					}else if(it.name == '年龄'){
						obj.age = it.value
					}else if(it.name == '行业'){
						obj.ndustry = it.value
					}else if(it.name == '邮箱'){
						obj.email = it.value
					}					
				}
				excelData.push(obj)
			}		
			uni.showToast({
				title:'导出中...',
				icon:"none",
				mask:true
			})
			await uniCloud
				.callFunction({
					name: 'getJsonToExcel',
					data: {
						data: excelData,
						title: this.title,
						mapping: this.mapping,
						type: this.type
					}
				})
				.then(res => {
					if(res.result.data.code == "no data"){
							uni.showToast({
								title: '暂无数据',
								icon: 'none'
							});
							return;
					}
					console.log(res,'jjj');
					this.Excellist = res.result.data;

					wx.downloadFile({
						url: this.Excellist,
						success(res) {
							if (res.statusCode === 200) {
								const filePath = res.tempFilePath;
								wx.openDocument({
									filePath: filePath,
									showMenu: true,
									success: function(res) {
										console.log(res, '打开文档成功');
									},
									complete(end) {
										uni.hideLoading()
									}
								});
							}
						}
					});
				});
		},
		current(index){
			this.cur = index
			console.log(this.cur,'cur');
		},
		//二维码
		qrCodeResult(item){
			console.log(item,'qrcode');
			this.push_type_show = false
			uni.showLoading({
				title:'正在绘制海报...',
				mask:true

			})
			uniCloud.callFunction({
				name:'getqrCode',
				data:{
					path:'pages/activity/activity_detail',
					scene:item._id
				},
				success:(res)=> {
					// console.log(res);
					let buffer = res.result.buffer.data;
					let binary = '';
					let bytes = new Uint8Array(buffer);
					let qrCodeImg = 'data:image/jpeg;base64,' + uni.arrayBufferToBase64(bytes)
					// return Promise.resolve(qrCodeImg);
					// uni.hideLoading()
					this.shareFc(qrCodeImg)
					// this.shareFc2(qrCodeImg)
				},
				fail(err) {
					uni.showToast({ title: '分享码加载失败！', icon: 'none' });
				}
			})
		},
		//二维码2
		qrCodeResult2(item){
			console.log(item,'qrcode');
			this.push_type_show = false
			uni.showLoading({
				title:'正在绘制二维码...',
				mask:true

			})
			uniCloud.callFunction({
				name:'getqrCode',
				data:{
					path:'pages/activity/activity_detail',
					scene:item._id
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
		//绘制海报
		async shareFc(qrCodeImg) {
			try {
				_app.log('准备生成:' + new Date())
				const d = await getSharePoster({
					_this: this, //若在组件中使用 必传
					type: 'testShareType',
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					backgroundImage:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/fenxiang.png',
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
									type: 'image',
									url: userInfo.headImgUrl,
									dx:bgObj.width * 0.415,
									dy: lineHeight ,
									infoCallBack(imageInfo) {
										let scale = bgObj.width * 0.2 / imageInfo.height;
										return {
											circleSet: {
												x: imageInfo.width * scale / 2,
												y: bgObj.width * 0.2 / 2,
												r: bgObj.width * 0.2 / 2
											}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
											dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
											dHeight: bgObj.width * 0.2,
											/* roundRectSet: { // 圆角矩形
												r: imageInfo.width * .1
											} */
										}
									}
								},
								{
									type: 'text',
									fontStyle: 'normal',
									text: userInfo.nickName,
									size: fontSize,
									color: 'black',
									// alpha: .5,
									textAlign: 'top',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.52 - textLength * 0.5,
											dy: lineHeight * 5
										}
									},
									serialNum: 0,
									id: 'tag1'	//自定义标识
								},
								{
									name: 'qrCodeImg',
									type: 'image',
									url: qrCodeImg,
									alpha: 1,
									isBgCenter: true,
									dx: bgObj.width * 0.46 - bgObj.width * 0.1,
									dy: bgObj.height - bgObj.width * 0.76,
									dWidth: bgObj.width * 0.28,
									dHeight: bgObj.width * 0.28,
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
		async loadData(openid) {
			let res = await db.collection('activityList').where({openid:openid}).get()
			let result = res.result.data;
			this.dataList = result;
			for (let i = 0; i < this.dataList.length; i++) {
				this.dataList[i].baomingnum = await this.baomingnum(this.dataList[i]._id);
				this.$set(this.dataList[i], i, this.dataList[i].baomingnum);
			}
					console.log(this.dataList,'6666');

		},
		async baomingnum(id) {
			let count = await db
				.collection('enroll_info')
				.where({ 'dataList._id': id })
				.count();
			return count.result.total;
		},
		deleteForm(id){
			console.log(id,'delete');
			uni.showModal({
				title: '提示',
				content: '是否删除活动',
				success: res => {
					if (res.confirm){
						db.collection('activityList').doc(id).remove().then(res=>{
							console.log(res);
							uni.showToast({
								title:'删除成功',
								icon:"none"
							})
							setTimeout(()=>{
								this.loadData(this.openid)
							},1000)
						})
					}
				}
			})

		},
		submitForm(id){
			uni.showModal({
				title: '是否发布活动',
				content: '注:发布后活动信息无法进行修改、删除',
				success: res => {
					if (res.confirm){
						db.collection('activityList').doc(id)
							.update({
								isSubmit:true,
								state:'进行中'
							})
							.then(res => {
								uni.showToast({
									title:'发布成功',
									icon:"none"
								})
								setTimeout(()=>{
									this.loadData(this.openid)
								},1000)
							});
					}
				}
			})

		},
		onClick_1() {
			alert(1);
		},
		// 删除活动
		delActivity(index) {
			this.activity_list.splice(index, 1);
		},
		onClick_3() {
			alert(1);
		},
		onClick_4() {
			alert(1);
		},
		onClick_5() {
			alert(1);
		},
		setStatus(e) {
			this.cur_status = e[0].value;
		}
	}
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.search-box {
	width: 100%;
	height: 100rpx;
	position: fixed;
	top: 0;
	background-color: #fff;
	padding: 20rpx;
	z-index: 100;
}

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
			margin-left: 179rpx;
		}
		.box2 {
			width: 639rpx;
			height: 1rpx;
			background: #eeeeee;
			margin-top: 30rpx;
		}
	}
}
/**************** 调整样式 end *********************/
.page {
	position: relative;
	width: 750rpx;
	min-height: 100vh;
	padding-bottom: 100rpx;
	background-color: rgba(247, 247, 247, 1);
	.layer1 {
		// padding-top: 100rpx;
		background-color: rgba(245, 245, 245, 1);
		width: 750rpx;
		.outer1 {
			width: 750rpx;
			.outer3 {
				margin: 24rpx 24rpx 0;
				.group3 {
					z-index: 49;
					height: 349rpx;
					border-radius: 10px;
					background-color: rgba(255, 255, 255, 1);
					box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
					width: 702rpx;
					position: relative;
					padding: 23rpx 0 0 19rpx;
					.bd1 {
						width: 674rpx;
						height: 306rpx;
						.info4 {
							width: 362rpx;
							height: 33rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(154, 154, 154, 1);
							font-size: 24rpx;
							white-space: nowrap;
							line-height: 33rpx;
							text-align: right;
						}
						.box1 {
							width: 660rpx;
							height: 1rpx;
							background: #eeeeee;
							margin-top: 24rpx;
						}
						.box2 {
							width: 674rpx;
							height: 120rpx;
							margin-top: 26rpx;
							.main1 {
								height: 120rpx;
								border-radius: 8px;
								background-color: rgba(216, 216, 216, 1);
								width: 200rpx;
								// position: relative;
								// .status-tag {
								// 	position: absolute;
								// 	left: 0;
								// 	top: 0;
								// 	width: 54rpx;
								// 	height: 56rpx;
								// 	image {
								// 		width: 200rpx;
								// 		height: 120rpx;
								// 	}
								// }
								.layer3 {
									height: 55rpx;
									padding-top: 2rpx;
									width: 54rpx;
									.info5 {
										width: 40rpx;
										height: 40rpx;
										display: block;
										overflow-wrap: break-word;
										color: rgba(253, 111, 45, 1);
										font-size: 14rpx;
										line-height: 14rpx;
										text-align: right;
										overflow: hidden;
										text-overflow: ellipsis;
									}
								}
							}
							.main2 {
								width: 448rpx;
								height: 111rpx;
								.word2 {
									width: 448rpx;
									overflow-wrap: break-word;
									color: rgba(0, 0, 0, 1);
									font-size: 28rpx;
									line-height: 38rpx;
									overflow: hidden;
									text-overflow: ellipsis;
								}
								.main3 {
									height: 27rpx;
									margin: 8rpx 0 0 23rpx;
									.group4 {
										width: 1rpx;
										height: 25rpx;
										background: #eeeeee;
										margin: 2rpx 0 0 7rpx;
									}
									.word3 {
										display: block;
										overflow-wrap: break-word;
										color: rgba(253, 111, 45, 1);
										font-size: 22rpx;
										white-space: nowrap;
										margin-left: 5rpx;
										margin-right: 4rpx;
									}
									.word4 {
										display: block;
										overflow-wrap: break-word;
										color: rgba(170, 170, 170, 1);
										font-size: 22rpx;
										white-space: nowrap;
									}
								}
							}
						}
						.box3 {
							width: 660rpx;
							height: 1rpx;
							background: #eeeeee;
							margin-top: 33rpx;
						}
						.box4 {
							width: 556rpx;
							height: 47rpx;
							margin: 21rpx 0 0 93rpx;
							.mod2 {
								height: 47rpx;
								border-radius: 23.5px 23.5px 23.5px 23.5px;
								background-color: rgba(255, 255, 255, 1);
								box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.06);
								width: 129rpx;
								padding: 12rpx 0 0 42rpx;
								.txt2 {
									width: 44rpx;
									height: 22rpx;
									display: block;
									overflow-wrap: break-word;
									color: rgba(0, 0, 0, 1);
									font-size: 22rpx;
									white-space: nowrap;
									line-height: 22rpx;
								}
							}
							.mod3 {
								height: 47rpx;
								border-radius: 23.5px 23.5px 23.5px 23.5px;
								background-color: rgba(255, 255, 255, 1);
								box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.06);
								width: 129rpx;
								padding: 12rpx 0 0 43rpx;
								.txt3 {
									width: 44rpx;
									height: 22rpx;
									display: block;
									overflow-wrap: break-word;
									color: rgba(0, 0, 0, 1);
									font-size: 22rpx;
									white-space: nowrap;
									line-height: 22rpx;
								}
							}
							.mod4 {
								height: 47rpx;
								border-radius: 23.5px 23.5px 23.5px 23.5px;
								background-color: rgba(255, 0, 0, 1);
								box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.06);
								width: 129rpx;
								text-align: center;
								line-height: 47rpx;
								// padding: 12rpx 0 0 42rpx;
								.info6 {
									// width: 44rpx;
									// height: 22rpx;
									// display: block;
									// overflow-wrap: break-word;
									color: rgba(255, 255, 255, 1);
									font-size: 22rpx;
									// white-space: nowrap;
									// line-height: 22rpx;
								}
							}
							.mod5 {
								height: 47rpx;
								border-radius: 23.5px 23.5px 23.5px 23.5px;
								background-color: rgba(76, 118, 255, 1);
								box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.06);
								width: 129rpx;
								text-align: center;
								line-height: 47rpx;
								// padding: 12rpx 0 0 42rpx;
								.info61 {
									// width: 44rpx;
									// height: 22rpx;
									// display: block;
									// overflow-wrap: break-word;
									color: rgba(255, 255, 255, 1);
									font-size: 22rpx;
									// white-space: nowrap;
									// line-height: 22rpx;
								}
							}
						}
					}
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
	// font-size: 18px;
	text-align: center;
	text-decoration: none;
	// line-height: 1;
	// line-height: 1.35;
	// border-radius: 5px;
	-webkit-tap-highlight-color: transparent;
	// overflow: hidden;
	color: #000000;
	background-color: #fff;
	width: 100%;
	height: 100%;
}
</style>
