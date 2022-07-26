<template>
	<view >
		<view class="header">
		<!-- 	<view class="header_box" v-for="(item,index) in icons">
				<image src="{{item.url}}" class="_icon"></image>
			</view> -->
			<view class="header_box" v-for="(item,index) in icons" @click="header(item)">
				<image :src="item.img" class="_icon"></image>
				<view style="font-size: 24rpx;">{{item.name}}</view>
			</view>
			
		</view>
		<view class="x-top" style="display: flex;width: 628rpx;justify-content: space-evenly;align-items: center;margin: 0 auto;margin-top: 30rpx;margin-bottom: 30rpx;">
		  <view :style="{color: newNowIndex.index0 == index?'#ff6d2e':'#000' }" v-for="(item,index) in goodspor" :key="index" @tap.stop="selecClass(index)" style="font-size: 32rpx;font-weight: 530;">{{item.name}}</view>
		</view>
		
		
		  
		  <view class="floor"  v-for="(list,idx) in scroll_name_list" :key="idx">
		  	<skeleton
		  		:loading="loading" 
		  		:avatarSize="skeleton1.avatarSize" 
		  		:row="skeleton1.row" 
		  		:showTitle="skeleton1.showTitle" 
		  		:flexType="skeleton1.flexType"
		  		:avatarShape="square">
		  	<view class="floob_box" @click="user_func(list,idx)">
		  		
		  		<view v-if="!newNowIndex.index0" class="tt-box" style="height: 100%;box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;">
		  			<image  :src="list.headImgUrl || 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/minico.png'" class="tupian_box"  >	
		  			<view style="display: flex;flex-direction: column;margin-left: 40rpx;justify-content: space-between;height: 80%;" >
		  				<text style="font-size: 30rpx;font-weight: 600;;">{{list.nickName}}</text>
		  				<view style="display: flex;align-items: center;">
		  					<view style="display: flex;flex-direction: column;">
		  						<view style="color: #ff0000;font-weight: 600;text-align: center;">
		  							{{list.statistics.totalUserCount}}
		  						</view>
		  						<view style="font-weight: 600;font-size: 24rpx;">
		  							团员
		  						</view>
		  					</view>
		  					<view style="display: flex;flex-direction: column;margin-left: 40rpx;">
		  						<view style="color: #ff0000;font-weight: 600;text-align: center;">
		  							{{list.statistics.tjCount}}
		  						</view>
		  						<view style="font-weight: 600;font-size: 24rpx;">
		  							推荐官
		  						</view>
		  					</view>
		  				</view>					
		  			</view>		
		  		</view>
		  		<view v-else class="tt-box" style="height: 100%;display: flex;align-items: center;box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;">
		  			<image :src="list.supplierLogo || 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/default%20avatar.png '" class="tupian_box"  >	
		  			<text style="font-size: 30rpx;font-weight: 600;margin-left: 40rpx;;">{{list.supplierName}}</text>
		  				
		  		</view>
		  	</view>
			</skeleton>
		  </view>
		  
		
		
		
		<u-popup v-model="shopsShow" mode="bottom" class="shop-pop">
				  <view class="pop-box2">
					  <view class="box">
						<view class="x-title u-row-center"  v-if="shopNmaeList.length >= 0">
						<text>商品来源以下店铺</text>
					  </view>
					  
					 <scroll-view  :class="{bjorange:allshow}" class="x-right-now" style="height: 550rpx;" scroll-y="true"  v-if="shopNmaeList.length > 1">

						<view class="box-ghost" v-if="isShrink">
						  <view :class="{active:index === newNowIndex.index2}"  v-for="(item,index) in shopNmaeList" @tap="selectShop(index,item)" :key="index" class="but">
							<text class="u-line-1" >{{item.supplierName}}</text>
						  </view>
						  </view>
					 </scroll-view>
					 <view  :class="{bjorange:allshow}" class="x-right-now" style=""  v-else>
						<none-msg :info='tsmsg' :color="'#717171'" :setheight="'50px'"  :goodsno='true' ></none-msg>
					 						
					 </view>
					  <!-- <scroll-view   class="x-right-now" style="height: 550rpx;" scroll-y="true" v-if="shopNmaeList.length > 1">
						<view class="box-ghost"  v-if="isShrink" >
						  <view  v-for="(item,index) in shopNmaeList" @tap="selectShop(index,item)" :key="index" >
							<text class="u-line-1" >{{item.supplierName}}</text>
						  </view>
						</view>
					  </scroll-view> -->
					  <!-- <none-msg  v-if="shopNmaeList.length <= 1" :info='tsmsg' :setheight="'50px'"  :goodsno='true' ></none-msg> -->
					  
					 <!-- <view class="x-down">
						<view @tap="defaultData">设置默认</view>
						<view @tap="seEnter">确定</view>
					  </view> -->
					  </view>
				  </view>
		</u-popup>
		
		
		<!-- <view class="hand" v-if="showIS">
			<view >
				<scroll-view class="scroll-view" scroll-x="true">
					<view class="scollInfo">
						<view class="dataList" v-for="(item,index) in shop" :key='index'>
							<image :src="item.thumbnail" @click="scrollClick(index)"></image>
							<text>{{item.supplier.supplierName}}</text>
						</view>
					</view>
				</scroll-view>
				<button type="default" style="width: 100%;" @click="show_func">关闭</button>
			</view> -->
				
						<!-- circular="false"  easing-function="false"  indicator-dots='false'  :interval="2000" :duration="200"  -->
				<!-- <uni-popup ref="Popup" type="center" :animation="false">
					<view class="Popup">
						<view class="swiperMain">
							<swiper @change="changeswiper"
								indicator-color="#000" indicator-active-color='#f63' 
								:current='scrollIndex'
								style="width: 600rpx;height:700rpx;margin: 0 auto;background-color: #fff;">
								<swiper-item v-for="(item,index) in shop" :key='index' @click="shop_func(shop)">
									<image :src="item.thumbnail" style="width: 400rpx;height:400rpx;position: relative;left:100rpx;top: 20rpx;"></image>
									<view class="textInfo">
										<text>{{item.supplier.supplierName}}</text>
										<text style="color: red;font-size: 40rpx;">￥{{item.showPrice}}</text>
									</view>
								</swiper-item>
								
							</swiper>
							
						</view>
						
					</view>
				</uni-popup> -->
				<!-- 分享弹窗-->
				<view class="share-pro">
				  <view class="share-pro-mask" v-if="deliveryFlag"></view>
				  <view class="share-pro-dialog" :class="deliveryFlag ? 'open' : 'close'">
				    <view class="close-btn" @tap="handleClose">
				      <span class="font_family">&#xe81d;</span>
				    </view>
				    <view class="share-pro-title">分享</view>
				    <view class="share-pro-body">
				      <view class="share-item">
				        <button open-type="share">
				          <view class="font_family share-icon">&#xe786;</view>
				          <view>分享给好友</view>
				        </button>
				
				        <!-- 	<button catchtap="share"
				            :data-title="item.commodity.commodityName"
				            :data-img="item.commodity.thumbnail"
				            :data-activityId="item.activityId"
				            :data-promotionId="item.promotionUser.promotionId"
				            open-type="share">
				            <image src="../../../static/wxiocn.png" mode=""></image>
				            <text>分享</text>
				          </button> -->
				
				
				      </view>
				      <view class="share-item" @tap="handleShowPoster">
				        <view class="font_family share-icon">&#xe600;</view>
				        <view>生成分享图片</view>
				      </view>
				    </view>
				  </view>
				</view>
				<hch-poster
				    ref="hchPoster"
				    @cancel="handleCancel"
				    :posterData.sync="posterData"
				    @previewImage="previewImage"
				/>
				
			</view>
			
		
	</view>
</template>

<script>
	import {ref} from 'vue';
	import Skeleton from '@/components/skeleton/skeleton.vue'
	import HchPoster from '@/components/hch-poster/hch-poster.vue'
	import DrawDemo from '@/components/hch-poster/draw-demo.vue'
	export default {
		components:{
			Skeleton,
			HchPoster,
			DrawDemo
		},
		data() {
			return {
				
				loading: true,
				skeleton1: {
					imgTitle:false,
				    avatarSize: '80px',
				    row: 2,
				    showTitle: true,
					flexType:'space-between',
					showAvatar:false
				},
				
				detailList:{},
				goodspor:[
				  {name:'特约链路'},
				  {name:'商家链路'}
				],
				list_current: 0,	// 当前swiper容器的点下标
				scroll_name_list: [],	// 二维数组 云仓链路推荐官
				tabbar:{},
				isTJ:false,
				imgdata:[],
				haspj:false,
				score:0,
				popFont:false,
				count: 5,
				start: 2.9,
	
				seleInpt:true,
				laborer:false,
				nameList:[
					{nickName:'全部'},
				],
				addInputIndex:0,
				selectDefault:[],
				skushow1:false,
				skushow2:false,
				skushow3:false,
				selectShow:false,
				shopsShow: false, 	// 控制选择供应店铺弹窗的显示/隐藏 
				current:0,
				classList:[],
				pageNum:1,
				pageNumber:1,
				commodityList:[],
				currentObj:{},
				pop_currentObj:{},
				volumedesc:false,
				tsmsg: '您共享的特约推荐官正在努力找优质货源，请等待上货！',
				shopNmaeList:[{supplierName:'全部'}],
				defaName:{},
				nowgotoData:null,
				searchValue:'',
				ishome:true,
				sanjiao:'',
				selectList:[],
				supportRefund:'', //是否支持7天无理由退货
				navshopindex:'',
				isonce:'',
				allshow:true,
				nowSupplierId:'',
				holdData:'',
				isShrink:true,
				isShrink1:true,
				UserInfo:{},
				selectRole:null,
				judgeThreeIndex:'',
				topNav:false,
				filterBoxTop:'',
				paddingtop:'',
				jlheight:'',
				shopsShow:false,
				list:[],
				// shopNmaeList:[{supplierName:'全部'}],
				allshow:true,
				newNowIndex:{
				  index0:0,	// 链路类型
				  index1:0,
				  index2:0,
				},
				Style:{
					height:0,
				},	
				showIS:false,
				
				icons:[
					{
					img:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/7.png',
					name:'我的帮推官',
					url:'/pages/my/my_shops/my_shops'
					},
					{
						img:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/4.png',
						name:'招募帮推官',
						// url:'/pages/my/poster/poster'
						url:''
					},
					{
						img:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/3.png',
						name:'帮推官审核',
						url:'/pages/my/audit_shops/audit_shops'
					},
					
				],
				shop:[],
				
				scrollIndex: null,
				switeList: [],
				
				deliveryFlag: false, //
				  // 海报模板数据
				  posterData: {
				    poster: {
				      //根据屏幕大小自动生成海报背景大小
				      url: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/yqhb.jpg', //图片地址
				      r: 10, //圆角半径
				      w: 340, //海报宽度
				      h: 480, //海报高度
				      p: 60 //海报内边距padding
				    },
				    mainImg: {
				      //海报主商品图
				      url: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/yqhb.jpg', //图片地址
				      r: 35, //圆角半径
				      w: 70, //宽度
				      h: 70 ,//高度
				
				    },
				    title: {
				      //商品标题
				      text: '', //文本
				      fontSize: 16, //字体大小
				      color: '#000', //颜色
				      lineHeight: 25, //行高
				      mt: 20 //margin-top
				    },
				    codeImg: {
				      //小程序码
				      url: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/erwm.jpg', //图片地址
				      w: 80, //宽度
				      h: 80, //高度
				      mt: 180, //margin-top
				      r: 40 //圆角半径
				    },
				    tips: [
				      //提示信息
				      {
				        text: '', //文本
				        fontSize: 14, //字体大小
				        color: '#2f1709', //字体颜色
				        align: 'center', //对齐方式
				        lineHeight: 25, //行高
				        mt: 20 //margin-top
				      },
				      {
				        text: '', //文本
				        // text: '长按/扫描识别查看商品', //文本
				        fontSize: 12, //字体大小
				        color: '#2f1709', //字体颜色
				        align: 'center', //对齐方式
				        lineHeight: 25, //行高
				        mt: 20 //margin-top
				      }
				    ]
				  }
				
				
				
			}
		},
		
		methods:{
			selecClass(e){
			  this.newNowIndex.index0= e
			  if(e == 0){
			
			    this.selectRole = 'DEALER';
			    this.newNowIndex.index1= 0
			    this.newNowIndex.index2= 0
			    this.Quadratic()
			  }else{
			    this.selectRole ='SUPPLIER';
			    this.newNowIndex.index1= 0
			    this.newNowIndex.index2= 0
			    this.Quadratic()
			
			  }
					if(this.newNowIndex.index0==1){
						this.seEnter()
					}
			},
			Quadratic(is_onload){     //经销商列表1
			  console.log("选择链路")
			
			  this.nameList = [{nickName:'全部'}]
			  this.scroll_name_list = []
			
			  if(this.newNowIndex.index0 == 1){
			    this.shopNmae(this.nameList[this.newNowIndex.index1])
			  }else{
			    this.selectRole ='DEALER';
			    let param={
			      "isAsc": "",
			      "orderBy": "",
			      "orderByColumn": "",
			      "pageNum": 1,
			      "pageSize": 30,
			      "searchValue": "",
			      // "supplierId": item
			    }
			   this.$u.api.dealerList(param).then(e => { //经销商
			      if(e){
			        this.nameList = this.nameList.concat( e.rows); //将数据拼接在一起
						  this.nameList.forEach((item,index)=>{
							  if(item.nickName != '全部'){
								  this.$u.api.applystatisticsList(item.dealerId).then(e1=>{
								  	this.scroll_name_list.push(e1)
									setTimeout(()=>{this.loading = false},1500)
								  })
								  // let cur_index = Math.floor((index)/10)
								  // if(!this.scroll_name_list[cur_index]){
								  // 		this.scroll_name_list[cur_index]=[]
										// this.scroll_name_list[cur_index].push(item)
								  // } else {
								  // 		this.scroll_name_list[cur_index].push(item)
								  // }
							  }
							  
						  })
			        // let a = this.nameList[this.newNowIndex.index1].dealerId
						  if(!is_onload){
							  this.shopNmae(this.nameList[this.newNowIndex.index1])
						  }
			      }
			    })
			  }
			},
			// applystatisticsdata(id){
			// 	this.$u.api.applystatisticsList(id).then(e=>{
			// 		this.scroll_name_list.statistics = e.statistics										
			// 	})
			// },
			shopNmae(dealerId,index){    //商家类目
			  this.shopNmaeList =[{supplierName:'全部','dealerId':dealerId.dealerId}]
					if(this.newNowIndex.index0 == 1){
						this.scroll_name_list = []
					}
					// if(this.newNowIndex.index0 == 0){this.shopsShow = true;}
			  this.allshow = true
			  if(index != undefined){   // 默认不传
			    this.newNowIndex.index2= 0
			    this.newNowIndex.index1 = index
			  }
			  let param = {
			    "isAsc": "",
			    "orderBy": "",
			    "orderByColumn": "",
			    "pageNum": 1,
			    "pageSize": 100,
			    "params": {},
			    "searchValue": "",
			    "dealerId":dealerId.dealerId,
			    'role': this.newNowIndex.index0 == 1 ? 'SUPPLIER': null
			  }
					console.log(param,'param');
			  this.$u.api.supplier(param).then(e => {
			    console.log('供应商列表',e)
			    if (e) {
			      this.shopNmaeList = this.shopNmaeList.concat( e.rows); //将数据拼接在一起
			      let wz = {'dealerId':dealerId.dealerId,'nickName':dealerId.nickName}
			      this.pop_currentObj=  Object.assign(wz,this.shopNmaeList[this.newNowIndex.index2])
				  console.log(this.pop_currentObj,'wz');
			      // this.pop_currentObj= this.shopNmaeList[this.newNowIndex.index2]  //保存当前类3
						if(this.newNowIndex.index0 == 1 ) {
							this.shopNmaeList.forEach((item,index)=>{
							if(item.supplierName != '全部'){
								this.scroll_name_list.push(item)
							  // let cur_index = Math.floor((index)/10)
							  // if(!this.scroll_name_list[cur_index]){
								 //  this.scroll_name_list[cur_index]=[]
								 //  this.scroll_name_list[cur_index].push(item)
							  // } else {
								 //  this.scroll_name_list[cur_index].push(item)
							  // }
							} 
							})
						}
			    }
				
			  })
			},
			
			selectShop(index,item){
			  console.log("保存两个",item)
			  
			  this.allshow = false;
			  //TODO 取消选择
			  // let addId=''
			  // if(this.isonce == item.supplierId){
			  //   this.isonce =false
			  //   this.shopindex=false
			  //    addId = {
			  //     supplierId:''
			  //   }
			  // }else{
			  //   this.shopindex=index
			  //   this.isonce =  item.supplierId
			  //    addId = {
			  //     supplierId:item.supplierId
			  //   }
			  // }
			
			  this.newNowIndex.index2= index
			  getApp().globalData.dealerId = item.dealerId
			  getApp().globalData.newNowIndex = this.newNowIndex
			  getApp().globalData.shopNmaeList = this.shopNmaeList
			  getApp().globalData.nameList = this.nameList
			  getApp().globalData.pop_currentObj = this.pop_currentObj
			  getApp().globalData.selectRole = this.selectRole
			  getApp().globalData.currentObj = this.currentObj  
			  getApp().globalData.defaName = this.defaName
				 uni.navigateTo({
				 				url:'/pages/tabbar/fine_goods/fine_goods'
				 }) 
			
			  // this.pop_currentObj ={
			  //   supplierId:item.supplierId
			  // }
			  //全部店铺名称
			//   if(item.supplierName == '全部'){
			//     //点全部
			//     this.pop_currentObj= {"dealerId":item.dealerId}  //保存当前
			
			//   }else{
			//     //单点选择店铺名称
			//     this.pop_currentObj = Object.assign(this.pop_currentObj,item)
			//   }
					if(this.newNowIndex.index0 == 1 && !this.shopsShow){
						this.seEnter()
					}
			},
			// seEnter(){
			// 	console.log('kaishi');
			//   this.initFn()
			//   // this.skushow2 = false
			//   this.shopsShow = false
			//   this.pageNumber = 1
			//   this.current = 0;
			//   this.commodityList=[]
			
			//   this.judgeThreeIndex =  this.newNowIndex
			
			//   this.currentObj = this.pop_currentObj
			//   // this.goodsListFn(this.pop_currentObj)
			//   this.laborer = true
			//   this.categoryFn()
			//   uni.navigateTo({
			// 	url:'/pages/tabbar/fine_goods/fine_goods'
			//   })
			// },
			// Quadratic(is_onload){     //经销商列表1
			//   console.log("选择链路")
			//   this.nameList = []
			//   this.list= []
			//   this.scroll_name_list = []
			
			//   if(this.newNowIndex.index0 == 1){
			//     this.shopNmae(this.nameList)
			//   }else{
			//     this.selectRole ='DEALER';
			//     let param={
			//       "isAsc": "",
			//       "orderBy": "",
			//       "orderByColumn": "",
			//       "pageNum": 1,
			//       "pageSize": 30,
			//       "searchValue": "",
			//       // "supplierId": item
			//     }
			//     this.$u.api.dealerList(param).then(e => { //经销商
			//       if(e){
			//         this.nameList = this.nameList.concat( e.rows); //将数据拼接在一起
			// 					for(var index=0;this.nameList.length > index;index++){
									
			// 						console.log("ss",e.rows[index])
			// 						this.$u.api.applystatisticsList(this.nameList[index].dealerId).then(e=>{
										
			// 						  if(e){
			// 							this.list.push(e)
									
			// 						  }
			// 						}).catch(err=>{
			// 						  console.log(err)
									
			// 						})
			// 						}
			// 			  // this.nameList.forEach((item,index)=>{
			// 				 //  let cur_index = Math.floor((index)/10)
			// 				 //  if(!this.scroll_name_list[cur_index]){
			// 					//   this.scroll_name_list[cur_index]=[]
			// 					//   this.scroll_name_list[cur_index].push(item)
			// 				 //  } else {
			// 					//   this.scroll_name_list[cur_index].push(item)
			// 				 //  }
			// 			  // })
			//         // let a = this.nameList[this.newNowIndex.index1].dealerId
			// 		// console.log(a,'sdfsdf');
			// 			  // if(!is_onload){
			// 				 //  this.shopNmae(this.nameList[this.newNowIndex.index1])
			// 			  // }
			//       }
			//     })
			//   }
			// },
			// shopNmae(dealerId,index){    //商家类目
			// console.log(dealerId,'dealerID');
			//   this.shopNmaeList =[{'dealerId':dealerId.dealerId}]
			// 		if(this.newNowIndex.index0 == 1){
			// 			this.scroll_name_list = []
			// 		}
			// 		// if(this.newNowIndex.index0 == 0){this.shopsShow = true;}
			//   this.allshow = true
			//   if(index != undefined){   // 默认不传
			//     this.newNowIndex.index2= 0
			//     this.newNowIndex.index1 = index
			//   }
			//   let param = {
			//     "isAsc": "",
			//     "orderBy": "",
			//     "orderByColumn": "",
			//     "pageNum": 1,
			//     "pageSize": 100,
			//     "params": {},
			//     "searchValue": "",
			//     "dealerId":dealerId.dealerId,
			//     'role': this.newNowIndex.index0 == 1 ? 'SUPPLIER': null
			//   }
			//   this.$u.api.supplier(param).then(e => {
			//     console.log('供应商列表',e)
			//     if (e) {
			// 		// this.shopNmaeList = this.shopNmaeList.concat( e.rows); //将数据拼接在一起
			// 		for(var index=0;e.rows.length > index;index++){
						
			// 				this.list.push(e.rows[index])
						
						
			// 		}
			//       // let wz = {'dealerId':dealerId.dealerId,'nickName':dealerId.nickName}
			//       // this.pop_currentObj=  Object.assign(wz,this.shopNmaeList[this.newNowIndex.index2])
			//       // this.pop_currentObj= this.shopNmaeList[this.newNowIndex.index2]  //保存当前类3
			// 			if(this.newNowIndex.index0 == 1) {
			// 				// this.shopNmaeList.forEach((item,index)=>{
			// 				//   let cur_index = Math.floor((index)/10)
			// 				//   if(!this.scroll_name_list[cur_index]){
			// 				// 	  this.scroll_name_list[cur_index]=[]
			// 				// 	  this.scroll_name_list[cur_index].push(item)
			// 				//   } else {
			// 				// 	  this.scroll_name_list[cur_index].push(item)
			// 				//   }
			// 				// })
			// 			}
			//     }
			//   })
			// },
			header(item){
				console.log(item);
				if(item.name == '招募帮推官'){
					this.shareEvn()
				}else{
					uni.navigateTo({
						url:item.url
					})
				}
				
			},
			
			// selectShop(index,item){
			//   console.log("保存两个",item)
			//   this.allshow = false;
			  
			//   //TODO 取消选择
			//   // let addId=''
			//   // if(this.isonce == item.supplierId){
			//   //   this.isonce =false
			//   //   this.shopindex=false
			//   //    addId = {
			//   //     supplierId:''
			//   //   }
			//   // }else{
			//   //   this.shopindex=index
			//   //   this.isonce =  item.supplierId
			//   //    addId = {
			//   //     supplierId:item.supplierId
			//   //   }
			//   // }
			
			//   this.newNowIndex.index2= index
			
			//   // this.pop_currentObj ={
			//   //   supplierId:item.supplierId
			//   // }
			//   //全部店铺名称
			//   if(item.supplierName == '全部'){
			//     //点全部
			//     this.pop_currentObj= {"dealerId":item.dealerId}  //保存当前
			
			//   }else{
			//     //单点选择店铺名称
			//     this.pop_currentObj = Object.assign(this.pop_currentObj,item)
			//   }
			// if(this.newNowIndex.index0 == 1 && !this.shopsShow){
			// 	this.seEnter()
			// }
			// this.pop_currentObj.dealerId = this.dealerId
			// this.pop_currentObj.newNowIndex = this.newNowIndex
			// this.pop_currentObj.selectRole = this.selectRole
			// getApp().globalData.pop_currentObj = this.pop_currentObj
			// uni.navigateTo({
			// 	url:'/pages/tabbar/fine_goods/fine_goods?id='+JSON.stringify(this.pop_currentObj)
			// })
					
			
			// },
			// goodsListFn(item){    //商品列表
			//   // console.log("商品列表",item)
			//   let param = {
			//     "sysCategoryId": item.categoryId,
			//     "dealerId": item.dealerId || null,          //经销商id
			//     "isAsc": item.isAsc || null,
			//     "orderBy": "",
			//     "orderByColumn": item.orderByColumn || null,    //排序
			//     "pageNum": this.pageNumber,
			//     "pageSize":10,
			//     "searchValue": item.searchValueName ||null,
			//     "supplierIds":item.supplierId ? [item.supplierId] : null,
			//     'role':this.selectRole
			//   }
			// 				if(this.newNowIndex.index0 == 0) {
			// 					param['dealerId'] = this.nameList[this.newNowIndex.index1].dealerId || null
			// 					param['supplierIds'] = this.shopNmaeList[this.newNowIndex.index2].supplierId?[this.shopNmaeList[this.newNowIndex.index2].supplierId] : null
			// 				}
			// 				if(this.newNowIndex.index0 == 1) {
			// 					param['supplierIds'] = this.shopNmaeList[this.newNowIndex.index1].supplierId?[this.shopNmaeList[this.newNowIndex.index1].supplierId] : null
			// 				}
					
			//   this.$u.api.goodsList(param).then(e=>{
			//     if(e){
			//       // this.commodityList = [];
			//       this.commodityList = this.commodityList.concat(e.rows);
			//       // console.log( 222, this.commodityList)
			//     }
			//   }).catch(err=>{
			//     console.log(err)
			//   })
			// },
			seEnter(){

			  this.initFn()
			  // this.skushow2 = false
			  this.shopsShow = false
			  this.pageNumber = 1
			  this.current = 0;
			  this.commodityList=[]
			
			  this.judgeThreeIndex =  this.newNowIndex
			  this.currentObj = this.pop_currentObj
			 
			  this.laborer = true
			  this.categoryFn()
			  console.log("Sss")
			  // 发送请求
			  uni.switchTab({
			      url: '/pages/tabbar/fine_goods/fine_goods'
			  });
			  
			  
			  
			},
			// selecClass(e){
			//   this.newNowIndex.index0= e
			//   console.log(e,'eeeeeeeee')
			//   if(e == 0){
			
			//     this.selectRole = 'DEALER';
			//     this.newNowIndex.index1= 0
			//     this.newNowIndex.index2= 0
			//     this.Quadratic()
			//   }else{
			//     this.selectRole ='SUPPLIER';
			//     this.newNowIndex.index1= 0
			//     this.newNowIndex.index2= 0
			//     this.Quadratic()
			
			//   }
			// 		// if(this.newNowIndex.index0==1){
			// 		// 	this.seEnter()
			// 		// }
			// },
			_window(){
				this.Style.height = uni.getSystemInfoSync().windowHeight * 2 + 150
				 
			},
		
			
			user_func(item,index){
				console.log(item,'xuanzhe');
				console.log(index,'xuanzhe1');
				if(this.newNowIndex.index0 == 1){
					this.newNowIndex.index1 = index + 1
					getApp().globalData.newNowIndex = this.newNowIndex
					getApp().globalData.shopNmaeList = this.shopNmaeList
					getApp().globalData.nameList = this.nameList
					getApp().globalData.pop_currentObj = this.pop_currentObj
					getApp().globalData.selectRole = this.selectRole
					getApp().globalData.defaName = this.defaName
					getApp().globalData.currentObj = this.currentObj 
					uni.navigateTo({
						url:'/pages/tabbar/fine_goods/fine_goods'
					})
				}else{
					this.shopsShow = true
				}
				this.shopNmaeList = [{supplierName:'全部','dealerId':item.dealerId}]
				let param = {
				    "isAsc": "",
				    "orderBy": "",
				    "orderByColumn": "",
				    "pageNum": 1,
				    "pageSize": 100,
				    "params": {},
				    "searchValue": "",
				    "dealerId":item.dealerId,
				    'role': this.newNowIndex.index0 == 1 ? 'SUPPLIER': null
				  }
				  this.$u.api.supplier(param).then(e => {
				    console.log('供应商列表',e)
				    if (e) {
				      this.shopNmaeList = this.shopNmaeList.concat( e.rows); //将数据拼接在一起
					  }
					})
				     
			},
			// 控制图片流动
			// changeswiper(e) {
			// 	this.scolList.forEach((item, index) => {
			// 		if (index == e.detail.current) {
			// 			this.switeList = item
			// 		}
			// 	})
			// },
			scrollClick(index) {
				this.scrollIndex = index
				this.scolList.forEach((v, i) => {
					if (index == i) {
						this.switeList = v
					}
				})
				this.$refs.Popup.open('top')
			},
			shop_func(e){
				console.log(e)
			},
			defaultData(){
			  this.initFn()
			  this.judgeThreeIndex = ''
			  this.laborer = false
			  // this.skushow2 = false
			  this.shopsShow = false
			  this.pageNumber = 1
			  this.current = 0;
			  this.commodityList=[]
			  this.currentObj = this.pop_currentObj
			  uni.setStorage({
			    key:'nowgoods',data:this.pop_currentObj
			  });
			  uni.setStorage({
			    key:'nowindex',data:this.newNowIndex,
			  });
			  this.$tools.toast("设置成功")
			  this.categoryFn()
			
			},
			categoryFn(){ //初始化
			
			  this.navinit().then(e=>{
			    if(!this.judgeThreeIndex)this.judgeThreeIndex = uni.getStorageSync('nowindex');
			    let now = this.laborer ? this.currentObj : uni.getStorageSync('nowgoods')
			    console.log("now",now)
			    // now.nickName
			    this.defaName = now || 	{"nickName":"全部"}
			    this.currentObj= now || this.classList[0] //保存当前类1
			    // this.goodsListFn(this.currentObj)
			  })
			},
			initFn(){
			  let that = this
			  for (let twolistKey in that.twolist) {
			    that.twolist[twolistKey].volumedesc=false
			  }
			},
			async navinit(){
			  let param = {
			    "isAsc": "",
			    "level": 1,
			    "orderBy": "",
			    "orderByColumn": "",
			    "pageNum": this.pageNum,
			    "pageSize": 20,
			    // "parentId": 0,
			    "searchValue": ""
			  }
			  await this.$u.api.categoryList(param).then(e=>{
			    if(e){
			      let dispose = e.rows;
			      dispose =  dispose.map((item,index)=>{
			        return{
			          name:item.categoryName,
			          ...item
			        }
			      })
						this.classList = [{name:'全部'}].concat(dispose);
			      // this.classList = this.classList.concat(dispose); //将数据拼接在一起
			    }
			  }).catch(err=>{
			    console.log(err)
			  })
			
			},
			
			  createCode(){
			    let {userId} = uni.getStorageSync('tokenorid');
			    let param = {
			      "page": "pages/home_page/become/become",
			      "scene": JSON.stringify(
			          {
			            'userId':userId
			          }
			      )
			    }
			    this.$u.api.createCode(param).then(e=>{
			      debugger;
			      console.log(e,8888)
			      this.posterData.codeImg.url= e
			      console.log(this.posterData.codeImg.url)
			
			    }).catch(err=>{
			      console.log(err)
			
			    })
			  },
			
			  /**
			   * @description: 生成海报
			   * @param {type}
			   * @return {type}
			   * @author: hch
			   */
			  handleShowPoster() {
			    this.$refs.hchPoster.posterShow()
			    this.deliveryFlag = false
			  },
			  /**
			   * @description: 分享弹窗
			   * @param {type}
			   * @return {type}
			   * @author: hch
			   */
			  shareEvn(type) {
			    this.deliveryFlag = true
			  },
			  /**
			   * @description: 关闭分享弹窗
			   * @param {type}
			   * @return {type}
			   * @author: hch
			   */
			  handleClose() {
			    this.deliveryFlag = false
			  },
			  /**
			   * @description: 取消海报
			   * @param {type}
			   * @return {type}
			   * @author: hch
			   */
			  handleCancel(val) {
			    // this.canvasFlag = val
			  },
			  /**
			   * @description: h5的情况下，点击海报保存按钮到图片预览海报，可以长按保存
			   * @param {*} base64
			   * @return {*}
			   * @author: hch
			   */
			  previewImage(base64) {
			    // 预览图片
			    uni.previewImage({
			      urls: [base64]
			    })
			  }
			
				
		},
		onLoad() {
				this.posterData.mainImg.url= uni.getStorageSync('tokenorid').headImgUrl;
				// this.posterData.title.text= uni.getStorageSync('tokenorid').nickName;
				wx.showShareMenu({
				  withShareTicket: true,
				  menus: ['shareAppMessage']
				})
				
				this.createCode()
		},
		onShareAppMessage(event) {
		  let {userId} = uni.getStorageSync('tokenorid');
		  let {nickName} = uni.getStorageSync('tokenorid');
		
		  return {
		    title: `${nickName}邀请您成为我的帮推官` ,
		    path:`/pages/home_page/become/become?userId=${userId}`,
		    imageUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/yqhb.jpg',
		  };
		},
		created() {
			this.Quadratic(true)
		}
	}
</script>
<style>
	page{
		background: #efefef;
	}
</style>
<style lang="scss">
	.header{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width:668rpx;
		height: 140rpx;
		margin:0 auto;
		// line-height: 200rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}
	.header_box{
		
		width: 33%;
		display: flex;justify-content: space-evenly;align-items: center;flex-direction: column;
		
		
	}
	._icon{
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 10rpx;
		// margin-left: 70rpx;
		// margin-top: 40rpx;
	}
	.center{
		width: 668rpx;
		height: 40rpx;
		/* background: red; */
		position: relative;
		top: 80rpx;
		
	}
	.center_font{
		font-weight: 600;
		font-size: 18rpx;
		
	}
	// .floor{
	// 	position: relative;
	// 	bottom: 130rpx;
	// }
	.floob_box{
		background: #FFFFFF;
		width:628rpx;
		height: 200rpx;
		// position: relative;
		// top: 50rpx;
		// left: 62rpx;
		border-radius: 16rpx;
		margin: 20rpx auto;
		margin-top: 10rpx;
	}
	.tt-box{
		display: flex;align-items: center;
		
	}
	.tupian_box{
		width: 160rpx;
		height: 160rpx;
		margin-left: 20rpx;
		border-radius: 12rpx;
		// background: red;width: 220rpx;height: 200rpx;border-radius: 12pt;position: relative;top: 50rpx;left: 40rpx;
	}
	.content{
		
	}
	.shop_name{
		width: 280rpx;float: left;position: relative;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;
		font-weight: 600;
		font-size: 38rpx;
	}
	.num_box{
		/* background: red; */
		width: 100rpx;
		height: 100rpx;
		position: relative;
		top: 40rpx;
		float: left;
		margin-left: 6rpx;
		text-align: center;
		right: 20rpx;
	}
	
	
.scollInfo {
		width: 95%;
		display: flex;
		text-align: center;
	}
 
	.scollInfo .dataList {
		padding-right: 20rpx;
	}
 
	.scollInfo .dataList:last-child {
		padding-right: 0;
	}
 
	.scollInfo .dataList image {
		width: 180rpx;
		height: 200rpx;
		display: block;
		border: 1px solid #eee;
		padding: 10rpx;
		box-sizing: border-box;
	}
 
	.scollInfo .dataList text {
		font-size: 25rpx;
		color: #777;
		font-weight: bold;
	}
 
 
	.Popup {
		background-color: hsla(0, 0%, 100%, .0);
		height: 100%;
		width: 500rpx;
		margin: 0 auto;
	}
 
	.Popup .del {
		display: block;
		text-align: right;
		width: 83%;
		display: block;
		margin: 0 auto;
	}
 
	.Popup .del image {
		width: 70rpx;
		height: 70rpx;
	}
 
	.Popup .swiperMain swiper {
		height: 600rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
 
	.Popup .swiperMain image {
		width: 100%;
		height: 100%;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
 
	.Popup .textInfo {
		width: 75%;
		margin: 0 auto;
		background-color: #fff;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		text-align: center;
		padding: 20rpx 0;
		border-top: 1px solid #222;
	}
 
 
	.Popup .textInfo text {
		font-size: 38rpx;
		color: #000;
		font-weight: bold;
		display: block;
	}
 
	.Popup .textInfo text:last-child {
		font-weight: normal;
		font-size: 30rpx;
		color: #777;
	}
	.hand{
		// background: pink;
		background: #F1F1F1;
		position: fixed;

		// top: 400rpx;
		bottom: 30rpx;
		// right: 0;
		
	}
	
	.shop-pop {
		/deep/.u-drawer .u-drawer-content {
			border-radius: 24rpx 24rpx 0 0;
		}
	}
	.pop-box2{
	  // width: 700rpx;
	  height: 717rpx;
	  overflow: hidden;
	  background-color: #FFFFFF;
	  padding: 20rpx;
	  position: relative;
		border-radius: 24rpx 24rpx 0 0;
	  // padding-top: 140rpx;
	  .x-down{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    height: 100rpx;
	    display: flex;
	    width: 100%;
		  padding: 0 24rpx 24rpx 24rpx;
	    z-index: 100;
	    view{
	      flex: 1;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      // background: #FFFFFF;
			background: #F2F2F2;
			border-radius: 4px;
	    }
	    view:nth-child(2){
	      background:rgba(255, 109, 46, 1);
	      color: #FFFFFF;
	    }
	
	  }
	  .x-top{
	    height: 80rpx;
	    display: flex;
	    width: 100%;
	    margin: 30rpx 0;
	    view{
	      flex: 1;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      background: rgba(0, 0, 0, 0.05);
	      margin: 0 20rpx;
	      border-radius: 8rpx;
	    }
	    .active{
	      // background:rgba(255, 109, 46, 1);
	      color: #ff0000;
	    }
	
	
	  }
	  .box{
	    width: 100%;
	    .x-title{
	      display: flex;
	      // justify-content: space-between;
	      padding: 0 20rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
	    }
	    .x-left{
	      width: 100%;
	      max-height: 300rpx;
	      .box-ghost{
	        width: 100%;
	        display: flex;
	        flex-wrap: wrap;
	        view{
	          width: 45%;
	          display: flex;
	          margin-left: 20rpx;
	          align-items: center;
	          justify-content: center;
	          height: 80rpx;
	          margin-top: 20rpx;
	          border-radius: 8rpx;
	          padding: 0 8rpx;
	          background-image: linear-gradient(to right, #efebe9, #e7d7d0);
	        }
	        .active{
	          background-image: linear-gradient(to right,#FF6D2E, #fc5e1b);
	          color: #fff;
	        }
	      }
	
	    }
		
	    .x-right-now{
	      flex: 100%;
	      .box-ghost {
	        width: 100%;
	        display: flex;
	        flex-wrap: wrap;
	        view{
	          // width: 43%;
	          width: 100%;
	          display: flex;
	          justify-content: center;
	          align-items: center;
	          height: 80rpx;
	          border-radius: 8rpx;
	          // margin: 20rpx;
				margin: 20rpx 6rpx;
	          color: #333;
	          background: rgba(0, 0, 0, 0.05);
	          padding:0 6px;
	
	        }
	        .active{
	          background: #FF0000;
	          color: #FFFFFF;
	        }
	        .bjorange{
	          background: rgba(55, 255, 0, 0.1);
	        }
	      }
	
	    }
	
	  }
	}
.share-pro {
  z-index: 5;
  display: flex;
  line-height: 1;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  .share-pro-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .share-pro-dialog {
    position: relative;
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 310rpx;
    overflow: hidden;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
    box-sizing: border-box;

    .close-btn {
      position: absolute;
      top: 0rpx;
      right: 29rpx;
      padding: 20rpx 15rpx;
    }

    .share-pro-title {
      padding: 28rpx 41rpx;
      font-size: 28rpx;
      color: #1c1c1c;
      background-color: #f7f7f7;
    }

    .share-pro-body {
      display: flex;
      font-size: 28rpx;
      color: #1c1c1c;
      flex-direction: row;
      justify-content: space-around;

      .share-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: space-around;

        .share-icon {
          margin-top: 39rpx;
          margin-bottom: 16rpx;
          font-size: 70rpx;
          color: #42ae3c;
          text-align: center;
        }

        &:nth-child(2) {
          .share-icon {
            color: #ff5f33;
          }
        }
      }
    }
  }

  /* 显示或关闭内容时动画 */

  .open {
    transform: translateY(0);
    transition: all 0.3s ease-out;
  }

  .close {
    transform: translateY(310rpx);
    transition: all 0.3s ease-out;
  }
}
.box-img{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20rpx;
  overflow: hidden;
  image{
    width: 670rpx;

  }
}
@font-face {
  font-family: 'font_family'; /* project id 1991769 */
  src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot');
  src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff') format('woff'),
  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.svg#iconfont') format('svg');
}

.font_family {
  font-family: 'font_family' !important;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  -webkit-text-stroke-width: 0.2px;
}

/* 按钮去掉边框 */
button::after {
  border: none;
}

button {
  height: auto; //支付宝需要加
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
  font-size: 28rpx;
  line-height: 1;
  color: #1c1c1c;
  background: none;
  border: none; //支付宝需要加
}

.button-hover {
  color: #1c1c1c;
  background: none;
}

.poster-img {
  width: 40%;
}
</style>
