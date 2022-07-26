<template>
	<view class="container">
    <commonGoods ref="childa2"></commonGoods>
    <image class="topimage" style="position: fixed;top: 0;left: 0;" :src="detailObj.userInfo.backgroundImage || defuImg " mode=""></image>
    <view style="position: relative;top: 500rpx;padding-bottom: 100rpx;">
		<view style="width: 750rpx;height: 200rpx;border-radius: 20rpx;background-color: #fff;margin: 0 auto;margin-top: -80rpx;">
			<image @tap="myShop(detailObj.userInfo.userId)" :src="detailObj.userInfo.headImgUrl" style="width: 110rpx;height: 110rpx;margin-top: -30rpx;margin-left: 40rpx;
			border-radius: 15rpx;" mode=""></image>
			<!-- <view style="margin-left: 50rpx;position: absolute;top: 0;left: 120rpx;">
				<text class="tag1" style="font-size: 30rpx;" >{{detailObj.userInfo.nickName}} </text>
				<view class="tag2" style="color: #FF6D2E;font-size: 24rpx;">
				    <text>成员：{{detailObj.userInfo.userCount}} </text>
				
				    <text v-if="detailObj.userInfo.tj ">
				      <text class="lr" style="margin: 0 10rpx;">|</text>
				      <text>	帮推官：{{detailObj.userInfo.promotionUserCount || '0'  }} </text>
				    </text>
				</view>				
			</view> -->
			<!-- <view style="position: absolute;right: 50rpx;top: 10rpx;display: flex;flex-direction: column;align-items: center;">
				<image src="../../../static/wxiocn.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				<text style="font-size: 20rpx;">分享</text>
			</view> -->
			<!-- <view class="become u-border-bottom"  v-show="!isAttention" > -->
			<!-- <view class="become u-border-bottom"  >
				<view style="margin-top: 20rpx;">
				  <text>关注公众号，掌握实时活动和订单通知</text>
				  <view class="x-button" @tap="jumpAttention" >+关注</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;width: 100%;justify-content: space-around;margin-top: 20rpx;">
					<view class="pyq fx"  @tap="myShop(detailObj.userInfo.userId)" >
				     <image src="../../../static/backicon.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
				     <text>主铺</text>
				   </view>
				   <view class="pyq fx" @tap="downImg">
				     <image src="../../../static/quanicon.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
				     <text>朋友圈</text>
				   </view>
				   <button class="fx" catchtap="share" style="padding: 0 ;margin: 0;"
				           :data-price="detailObj.activity.commodity.showPrice"
				           :data-title="detailObj.activity.commodity.commodityName"
				           :data-img="detailObj.activity.commodity.thumbnail"
				           :data-activityId="detailObj.activityId"
				           :data-promotionId="detailObj.promotionId"
				           open-type="share">
				     <image src="../../../static/shareicon.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
				     <text>分享</text>
				   </button>
			</view> -->
			
			
		<!-- <image
				:src="mainInfoMap.headImgUrl"
				style="width: 110rpx;height: 110rpx;margin-top: -30rpx;margin-left: 40rpx;
		border-radius: 15rpx;"
				mode=""
			></image> -->
			<view style="position: absolute;top: 100rpx;left: 40rpx;">
				<text class="tag1" style="font-size: 30rpx;font-weight: 900;">{{ detailObj.userInfo.nickName }}</text>
				<view class="tag2" style="color: #999999;font-size: 24rpx;" >
					<text>成员：{{ detailObj.userInfo.userCount }}</text>
		
					<text v-if="detailObj.userInfo.tj">
						<text class="lr" style="margin: 0 10rpx;color: #999999;">|</text>
						<text>帮推官：{{ detailObj.userInfo.promotionUserCount }}</text>
					</text>
				</view>
			</view>
			<view style="display: flex;align-items: center;width: 300rpx;justify-content: space-around;position: absolute;right: 30rpx;top: 10rpx;">
				<!-- <view class="box"> -->
					<view class="pyq fx"  @tap="myShop(detailObj.userInfo.userId)">
						<image src="../../../static/backicon.png"mode="aspectFill"></image>
						<text>主铺</text>
					</view>
					<view class="pyq fx" @tap="downImg" style="display: flex;flex-direction: column;align-items: center;">
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/000000.png"mode="aspectFill"></image>
						<text>海报</text>
					</view>
					<button class="fx" catchtap="share" style="padding: 0 ;margin: 0;"
					        :data-price="detailObj.activity.commodity.showPrice"
					        :data-title="detailObj.activity.commodity.commodityName"
					        :data-img="detailObj.activity.commodity.thumbnail"
					        :data-activityId="detailObj.activityId"
					        :data-promotionId="detailObj.promotionId"
					        open-type="share">
					  <image src="../../../static/shareicon.png" style="width: 60rpx;height: 60rpx;" mode=""></image>
					  <text>分享</text>
					</button>
					<!-- <button class="fx" catchtap="share" style="padding: 0;margin: 0;" open-type="share">
						<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/711.png"mode="aspectFill"></image>
						<text>分享</text>
					</button> -->
				<!-- </view> -->
			</view>
			<!-- <view style="position: absolute;left: 40rpx;top: 200rpx;">
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
			</view> -->
			</view>
			<u-gap height="15" bg-color="rgb(247,247,247)"></u-gap>
     <!-- <view class="x-head">
        <view class="addbig">
          <view class="box-left">
            <image @tap="myShop(detailObj.userInfo.userId)" :src="detailObj.userInfo.headImgUrl" mode=""></image>
            <text class="tag1">{{detailObj.userInfo.nickName}} </text> -->

            <!--					<text v-if="detailObj.userInfo.role == 'BT' "  class="x-btn"><text>帮推官</text></text>-->
            <!--					<text v-if="detailObj.userInfo.role == 'TJ' && detailObj.userInfo.internal == true " class="x-btn"><text>商家推荐官</text></text>-->
            <!--					<text v-if="detailObj.userInfo.role == 'TJ' && detailObj.userInfo.internal == false " class="x-btn"><text>推荐官</text></text>-->

            <!-- <text v-if="detailObj.userInfo.tj" class="x-btn"><text>推荐官</text></text>
            <text v-else-if="detailObj.userInfo.bt" class="x-btn"><text>帮推官</text></text>
            <text v-else class="x-btn"><text>团员</text> </text> -->

          <!-- <view class="tag2" v-if="isBenren">
              <text>成员：{{detailObj.userInfo.userCount}} </text>

              <text v-if="detailObj.userInfo.tj ">
                <text class="lr">|</text>
                <text>	帮推官：{{detailObj.userInfo.promotionUserCount || '0'  }} </text>
              </text>
            </view>
          </view> -->


          <!-- <view class="box-right">
            <view class="box"> -->
              <!--              <view class="pyq">-->
              <!--                  <image src="../../../static/sc.png" mode=""></image>-->
              <!--                  <text>收藏</text>-->
              <!--              </view>              -->
           <!--   <view class="pyq"  @tap="myShop(detailObj.userInfo.userId)" >
                <image src="../../../static/grenn.png" mode=""></image>
                <text>主铺</text>
              </view>
              <view class="pyq" @tap="downImg">
                <image src="../../../static/down.png" mode=""></image>
                <text>朋友圈</text>
              </view>
              <button class="fx" catchtap="share"
                      :data-price="detailObj.activity.commodity.showPrice"
                      :data-title="detailObj.activity.commodity.commodityName"
                      :data-img="detailObj.activity.commodity.thumbnail"
                      :data-activityId="detailObj.activityId"
                      :data-promotionId="detailObj.promotionId"
                      open-type="share">
                <image src="../../../static/wxiocn.png" mode=""></image>
                <text>分享</text>
              </button>

            </view> -->
            <!--					<view class="x-button" @tap="attention"  v-if="!detailObj.userInfo.hasAttention == true"  >一键订阅</view> -->
            <!--					<view class="x-button active"  v-if="detailObj.userInfo.hasAttention"> 已订阅</view>-->
           <!-- <view class="x-button active"  v-if="oneself != detailObj.userInfo.userId ">
              已订阅
            </view> -->

            <!--          <view :class="[detailObj.userInfo.hasSubscribe == true  ? 'active' : '' ]" class="x-button" @tap="j_close(detailObj.userInfo.userId)">-->
            <!--            {{detailObj.userInfo.hasSubscribe == true ? '已订阅' : '重新订阅' }}-->
            <!--          </view>-->

            <!-- <view class="x-button" @tap="close_attention"  v-if="detailObj.hasAttention">取消订阅</view> -->
        <!--  </view>
        </view>
      </view> -->

      <view class="box-body">
        <!-- <view style="text-align: center; font-size: 26rpx; font-weight: bold; color: #ff0000;"> 精 心 为 您 推 荐 以 下 商 品</view> -->
		<!-- <view style="text-align: center; font-size: 26rpx; font-weight: bold; color: #FF0000; ">
			<text v-if="detailObj.userInfo.tj" class="x-btn"><text>推荐官</text></text>
			<text v-else-if="detailObj.userInfo.bt" class="x-btn"><text>帮推官</text></text>
			<text v-else class="x-btn"><text>团员</text> </text>
			：好物分享一起团购
		</view>
        <image style="height: 20rpx; width: 100%;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/xssj/MMM.png" mode=""></image> -->
        <!-- <view class="become u-border-bottom"  v-show="!isAttention" >
           <view>
             <text>关注公众号，掌握实时活动和订单通知</text>
             <view class="x-button" @tap="jumpAttention" >+关注</view>
           </view>
         </view> -->
        <!-- 		<view class="become u-border-bottom" @tap="jumpBecome" v-if=" detailObj.promotionApplyStatus != '1' &&  userid_my != detailObj.promotionUser.promotionUserId ">
              <view>
                <text>成为帮推官，让我们并肩战斗，名额有限哦3！ </text>
                <u-icon color="#999" name="arrow-right"></u-icon>
              </view>
            </view> -->

        <text v-if="detailObj.activity.introduce">
          {{detailObj.activity.introduce}}
        </text>

        <view class="x-helpe">
          <view class="tag1">
            <view class="div-line" v-if="detailObj.activity.status != 1">
              <u-count-down :timestamp="totalSj"  separator="zh" font-size='30' color="#ff0000" separator-color="#ff0000"></u-count-down>
              <view style="color: #ff0000;" >后结束</view>
            </view>
            <view class="div-line" v-if="detailObj.activity.status == 1">
              <u-count-down :timestamp="totalSj"  separator="zh" font-size='30' color="#ff0000" separator-color="#ff0000"></u-count-down>
              <view style="color: #ff0000;" >后开始</view>
            </view>
            <text >{{detailObj.activity.browseCount}}人浏览</text>
          </view>
          <!-- 0待审核  1通过 -->
          <!-- <view class="x-button"  v-if="detailObj.promotionApplyStatus != 1" @tap="jumpBecome" >复制帮卖</view> detailObj.promotionUser.promotionUserRole == 'BT'  -->
          <view class="x-button"  v-if="detailObj.userInfo.promotionApplyStatus == 1 && !isBenren" @tap="jumpBecome('goto')"  >复制帮卖</view>
        </view>
        <!-- <view class="boxadd"  v-if="detailObj.promotionApplyStatus == 1 || detailObj.promotionUser.promotionUserRole == 'BT' || detailObj.promotionUser.promotionUserRole == 'TJ' "   > -->
        <!-- v-if="detailObj.promotionUser.promotionUserRole == 'TY' " -->
        <view class="boxadd u-margin-bottom-20" >
          <view  class="goods-award" >
            <image :src="detailObj.activity.commodity.thumbnail" mode=""></image>
            <view>
              <text class="x-block u-line-1"  >{{commodityNameComputed(detailObj.activity.commodity.commodityName)}}</text>
              <text style="color: #ff0000;" class="orange">￥{{detailObj.activity.commodity.showPrice}}</text>
            </view>
          </view>
        </view>

        <view class="boxadd"  v-if="detailObj.userInfo.promotionApplyStatus == 1 || userid_my == detailObj.userInfo.promotionUserId"   >
          <view  class="goods-award">
            <image :src="detailObj.activity.commodity.thumbnail" mode=""></image>
            <view>
              <text>本商品已设置以下奖励</text>
              <text style="color: #ff0000;" class="orange">帮卖佣金:可得{{detailObj.activity.commodity.showCommission}}元佣金奖励</text>
            </view>
          </view>
        </view>
        <!--      <view v-if="detailObj.activity.commodity.describes" style="padding:0 25rpx;">-->
        <!--        {{detailObj.activity.commodity.describes}}-->
        <!--      </view>-->
        <view class="goods-item">

          <view class="box-img">
            <view v-for="(item,index) in detailObj.activity.commodity.fileList" >
              <image v-if="item.location == 3" :src="item.fileUrl" :key="index" mode='widthFix' lazy-load></image>
              <video
                  muted="true"
                  autoplay="true"
                  enable-play-gesture="true"
                  show-mute-btn="true"
                  v-if="item.location == 1"
                  :src="item.fileUrl"
              ></video>
            </view>
          </view>

          <text class="font1"><text class="u-font-26">￥</text>{{detailObj.activity.commodity.showPrice}}</text>
          <text class="font2">{{detailObj.activity.commodity.commodityName}}</text>
        </view>
      </view>
      <view class="rult-sku">
        <view class="sku-item u-border-bottom"  @tap="skushow=true"  >
          <text>规格</text>
          <text class="u-line-1">{{onepra.skuName ||  detailObj.activity.commodity.commoditySku[0].skuName}}</text>
          <image src="../../../static/dian.png" mode=""></image>
        </view>
        <!-- 	<view class="safeguard u-border-bottom">
            <text class="c3">保障</text>
            <text class="c9">放心购·材质保障·假一罚十</text>
          </view> -->
        <view class="x-firm" @tap="lookInfo">
          <image :src="detailObj.activity.commodity.supplier.supplierLogo || 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/minico.png'" mode=""></image>
          <view class="firm-item">
            <text class="u-font-32 thick u-line-1">{{detailObj.activity.commodity.supplier.supplierName }}</text>
            <text class="u-font-24 c9">商家提供资质认证 </text>
          </view>
          <text class="look-shop">企业认证</text>
        </view>
      </view>

      <view class="x-browse">
        <view class="x-down u-border-bottom">
          <view class="x-down-item" v-for="(item2,index2) in recordList" :key="index">
            <view>
              <!-- <text class="font-b">{{index2}}</text> -->
              <image :src="item2.headImgUrl || defuImgHead " mode=""></image>
              <text>{{item2.nickName || '游客'}}</text>
              <view>
                <!-- <text class="orange x-block u-font-24">{{item2.operationTime | mintime }}</text> -->
                <view class="c9 u-font-24 u-margin-top-5">查看了商品</view>
              </view>
            </view>
          </view>
        </view>
        <view class="z-load" @tap="jzgd" v-if="recordList.length >=10" >
          <view v-if="recordList.length ==  pageNum*10">
            加载更多<u-icon name="arrow-down"></u-icon>
          </view>
          <view v-else @tap="zblack">
            我也是有底线的<u-icon name="arrow-up"></u-icon>
          </view>
        </view>
      </view>

      <view class="break-time" v-if="detailObj.activity.status != 2  ">

        {{detailObj.activity.status == 1 ? '该商品活动未开始，请耐心等待' : detailObj.activity.status == 3 ? '该商品活动时间已到，非常抱歉！': '未发布活动或商家已结束'}}
      </view>
      <view class="gsfont">
        <text>“如果发现活动商品含不良信息、违法/诈骗、色情/暴力，请立即联系平台，以便平台快速处理。”  </text>
      </view>
      <view class="x-order">
        <view class="u-margin-left-28" @tap="jump_index">
          <image src="../../../static/home-icon.png" mode=""></image>
          <text>首页</text>
        </view>
        <view class="u-margin-left-48" @tap="jump_order">
          <image src="../../../static/zx.png" mode=""></image>
          <text>订单</text>
        </view>
        <!--      商品状态:1.未上架 2.售卖中 3.已售罄-->
        <text class="order-button" @tap="showSku"  :class="{'c9': detailObj.activity.status != 2, 'c9': detailObj.activity.commodity.status == 3,'c9': detailObj.activity.commodity.status == 1}"  >
          {{detailObj.activity.commodity.status == 3 ? '已售罄': detailObj.activity.commodity.status == 1 ? '未上架' : detailObj.activity.status == 3 ? '活动已结束':  detailObj.activity.status == 1 ? '活动未开始':'推荐跟团下单' }}
        </text>
      </view>
    </view>

		<!-- sku -->
		<u-popup v-model="skushow" mode="bottom">
			<view class="pop-box">
				<view class="top">
					<image @tap="yulanimg(onepra.imageUrl,detailObj.activity.commodity.commoditySku[0].imageUrl,detailObj.activity.commodity.thumbnail  )"  :src="onepra.imageUrl || detailObj.activity.commodity.commoditySku[0].imageUrl || detailObj.activity.commodity.thumbnail"  mode=""></image>
          <view class="info">
            <text class="u-line-1">{{onepra.skuName ||  detailObj.activity.commodity.commoditySku[0].skuName}}</text>
						<text  style="color: #EB1918; font-size: 40rpx; ">￥{{ nowprice || detailObj.activity.commodity.commoditySku[selSpecId].price*numberValue  }} </text>
						<text>库存：{{onepra.stock ||detailObj.activity.commodity.commoditySku[0].stock }}</text>
					</view>
					<!-- <u-icon @tap="skushow=false" class="icon" name="close-circle" size="50"></u-icon> -->
				</view>
				 <view class="guige">规格分类</view>

				<view class="specification-list">
				  <view v-for="(item, index) in detailObj.activity.commodity.commoditySku" :key="index" @tap.stop="selSpecFun(item, index)" :class="['specification-item ' , { 'sel-item': selSpecId == index }]">
<!--					<image  class="product-img" :src="item.imageUrl || detailObj.activity.commodity.thumbnail" mode=""></image>-->
					<text class="u-line-1" >{{ item.skuName }}</text>
				  </view>
				</view>
				<view class="jbq">
					<text>购买数量</text>
					<u-number-box v-model="numberValue"  @change="valChange" disabled-input=true :min="1" :max="onepra.stock || detailObj.activity.commodity.commoditySku[0].stock "></u-number-box>
				</view>
				<view class="x-btn" :class="{'c9': detailObj.activity.status != 2, 'c9': detailObj.activity.commodity.status == 3 }"   @tap="place_order" >

          {{detailObj.activity.commodity.status == 3 ? '已售罄': '确定'}}
        </view>
			</view>
		</u-popup>

<!--    <view v-if='authtate' @tap='showLoginAuth' class='mark-content'></view>-->

<!--    <logoPopTodo  @callFather="activeSon"></logoPopTodo>-->
	</view>
</template>

<script>
	import utils from '@/common/logic/utils/util.js'
	export default {
		data() {
			return {
				isBenren:false,
				defuImg:'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/bannerbig.png',
        defuImgHead:'/static/moren.png',
				detailObj:{},
				skushow:false,
				selSpecId:0,
				numberValue:1,
				onepra:'',
				isAttention:false,
				userid_my:'',
				timestamp:'',
				recordList:[],
        apiInfo:null,
        nowprice:null,
        totalSj:null,
        // authtate:false,
        oneself:'',
        data1028:null,
        scene1028:null,
        pageNum:1,
        recordParam:{},
        shiftY:0
			}
		},
    computed: {
		commodityNameComputed(){
			return function(item){
				if(item.length > 24){
					let str =  item.slice(0,23)
					return str
				}
				return item
			}
		}
      // authtate:{
      //   get () {
      //     return this.$store.state.cover
      //   },
      //   set (value) {
      //     console.log(value,'vuex')
      //     this.$store.commit('coverFn', value)
      //   }
      // }
    },
		filters:{
			mintime(value){
				if(value){
					let _fromatTime = value.replace(/-/g,"/");
					let oldTime = new Date(_fromatTime)
					oldTime = oldTime.getTime(oldTime)

					let newTime = new Date()
					newTime = newTime.getTime(newTime)
					let surplus =  newTime - oldTime
					surplus = utils.dateUtil.humanize(surplus)
					return surplus
				}
			},
      numFilter(num) {
          num = String(num)
          return num.substring(0,num.indexOf(".")+3);
      },

    },
    // onPageScroll(e){
    //   console.log(e)
    //   if (e.scrollTop > 350){
    //     this.shiftY = 350
    //   }else{
    //     this.shiftY = e.scrollTop
    //   }
    // },
		 onLoad(option){
			 
			 console.log(this.detailObj.userInfo,'detailObj.userInfo.tj');
       this.$store.commit('saveDetailsOption', option)
        wx.showShareMenu({
              withShareTicket: true,
              menus: ['shareAppMessage']
        })
			  console.log("详情进来参数",option)

		},
		onShow(){
      let option=this.$store.state.DetailsOptionObj
      console.log('show',option)

      this.recordList=[];
      this.scene1028 = option.scene || null

      this.data1028 = {
        promotionId:option.promotionId || null
      }
      uni.getStorage({
        key:'tokenorid',
        success:res=>{
          if(this.scene1028){
            //二维码进来
            this.pjseo(this.scene1028)
          }else{
            //分享链接进来
            console.log("分享链接进来")
            this.detailInfoFn( this.data1028)
          }
        },
        fail:err=>{
          this.getToken().then(e=>{
            if(this.scene1028){
              //二维码进来
              this.pjseo(this.scene1028)
            }else{
              //分享链接进来
              console.log("分享链接进来")
              this.detailInfoFn( this.data1028)
            }
          })
        }
      });


    },
		onShareAppMessage(event) {
			if (event.from == 'button') {
				let {price,title,img,activityid:activityId,promotionid:promotionId} = event.target.dataset
				return {
					title:`${title}`,
					path:`/pages/home_page/index_details/index_details?activityId=${activityId}&promotionId=${promotionId}`,
					imageUrl: img,
				};
			}else{
				return {
					title: "你的推荐官，让你购物更实惠，品质更有保障！",
					path:`/pages/home_page/index_details/index_details?activityId=${this.detailObj.activityId}&promotionId=${this.detailObj.promotionUser.promotionId}`,
					imageUrl: this.detailObj.activity.commodity.thumbnail,
				};
			}
		},
		methods: {
      lookInfo(){
				return
         uni.navigateTo({
           url:"/pages/home_page/shop_info/shop_info?supplierId="+this.detailObj.activity.supplierId
         })
      },
      yulanimg(a,b,c){
        let d = a||b||c
        uni.previewImage({
          urls: [d],
          success: function(e) {
            console.log(e)
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        });
      },
      pjseo(send){
        console.log("send",send)
        this.$u.api.getAppletCodeScene(send).then(e=>{
          let indexEvent = {
            promotionId:e.promotionId
          }
          this.data1028 = indexEvent
          this.detailInfoFn(indexEvent)
        }).catch(err=>{
          console.log(err)
        })
      },

			myShop(mainUserid){
				uni.navigateTo({
					url:"/pages/home_page/my_shop/my_shop?mainUserId="+mainUserid
				})
			},
			activityjl(op,item){
				console.log(op,'op');
				if(op.promotionUserId == this.$store.state.authtab.userId){
					this.isBenren = true
				}
				let data = {
			    ...op,
					"isAsc": "",
					"operation": "browse",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": this.pageNum,
					"pageSize": 10,
				}
				this.$u.api.operation(data).then(e=>{
          if(item){
            this.recordList = e.rows
          }else{
            this.recordList = this.recordList.concat(e.rows); //将数据拼接在一起
          }
					// this.recordList = e.rows
				}).catch(err=>{
					console.log(err)
				})
			},
      jzgd(){
        console.log(this.recordList.length)
        if( this.recordList.length ==  this.pageNum*10){
          this.pageNum++
          console.log(111)
          this.activityjl(this.recordParam)
        }
      },
      zblack(){
        this.pageNum=1
        this.activityjl(this.recordParam,1)
      },
      getToken(){
        return	new Promise((resolve,reject)=>{
          let that=this
          uni.login({
            success(res) {
              console.log('微信code',res.code)
              that.$u.api.logoin(res.code).then(el=>{
                uni.setStorage({
                  key:'tokenorid', data:el,
                  success:function (){
                    resolve(el)
                  }
                });
              }).catch(err=>{
                reject(err)
              })
            }
          })
        })
      },

      xtgetInfo(){
        this.$u.api.getUserInfo().then(e=>{
          this.oneself = uni.getStorageSync('tokenorid').userId;
          this.apiInfo = e
          console.log(this.apiInfo.headImgUrl,9999999999)
          // if(!this.apiInfo.headImgUrl){
          //   this.$store.commit('imporIsAuto',true)
          //   this.authtate = this.$store.state.isAuto
          //
          //   //TODO 单独带关注
          //   this.$store.commit('detailPromotion',this.detailObj.promotionUserId)
          //   // this.member(this.detailObj.promotionUserId)
          //
          // }
          this.isAttention = e.isSubscribe
          this.userid_my = e.userId
          uni.setStorage({
            key:'userinfoKey',data:e,
          });

        }).catch(err=>{
          console.log(err)

        })

      },
      activeSon(){
        this.detailInfoFn(this.data1028)
      },
			detailInfoFn(indexEvent){
        console.log(indexEvent)
				this.$u.api.activityDetail(indexEvent).then(e=>{
					this.detailObj = e
          this.$store.commit("hbmap",e)   //海报
          let param = {
            promotionUserId:e.promotionUserId,
            activityId:e.activityId
          }
          this.recordParam = param
          if(this.detailObj.activity.status != 1){
            this.countTime(e.activity.endTime)
          }else{
            this.countTime(e.activity.startTime)
          }

          this.activityjl(param)
          this.xtgetInfo()
          this.member(this.detailObj.promotionUserId)
          // if(	!this.detailObj.userInfo.hasAttention){
          //   // console.log('aaa', this.detailObj.userInfo.hasAttention)
          //   this.$store.commit('detailPromotion',this.detailObj.promotionUserId)
          //
          //   // this.authtate = this.$store.state.isAuto
          //   this.$store.commit('coverFn',true)    //遮罩层
          //   console.log("遮罩层!!!!!!!!!!!!!!!!!!!!!!!",this.$store.state.cover)
          // }
				})
			},
			close_attention(){
					let promotionUserId =this.detailObj.promotionUser.promotionUserId
					this.$u.api.cancelAttention(promotionUserId).then(e=>{		//	取消关注
						this.$tools.toast("已取消订阅")
					}).catch(err=>{
						console.log("err")
					})
			},
			attention(){
        console.log("isAttention")
				let promotionUserId =this.detailObj.promotionUser.promotionUserId
				this.$u.api.isAttention(promotionUserId).then(e=>{		//	关注
					this.$tools.toast("已订阅")
				}).catch(err=>{
					console.log("err")
				})
			},
			selSpecFun(item,index){
        this.nowprice = null
        console.log("点击",item)
				this.numberValue = 1;
				this.onepra = item
				this.selSpecId =index
			},
			place_order(){
				console.log(this.onepra,222222)

        if(this.onepra){
          if(this.onepra.stock < 1){
            this.$tools.toast("库存为空");
            return false
          };
        }else{
          if(this.detailObj.activity.commodity.commoditySku[0].stock<1){
            this.$tools.toast("库存为空");
            return false
          }
        }


				if(this.detailObj.activity.status != 2 )return false;

        // if( onepra.stock = 0)
        // ||detailObj.activity.commodity.commoditySku[0].stock


        let orderData={
					 activityPrice : this.detailObj.activity.commodity.commoditySku[this.selSpecId].price,
					 skuName : this.detailObj.activity.commodity.commoditySku[this.selSpecId].skuName ,
					 skuId : this.detailObj.activity.commodity.commoditySku[this.selSpecId].skuId,
					 activityId : this.detailObj.activity.activityId,
					 amount : this.numberValue,
					 promotionId : this.detailObj.promotionId,
					 commodityName : this.detailObj.activity.commodity.commodityName,
					 thumbnail :  this.detailObj.activity.commodity.thumbnail,
           supportRefund :this.detailObj.activity.commodity.supportRefund,
           dealerId:this.detailObj.activity.dealerId || null
				}
        console.log("是否支持退换",orderData)
				 this.$store.commit('addOrderData',orderData)

				this.skushow = true
				uni.navigateTo({
					url:`../place_order/place_order`
				})
			},
       toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      valChange(e) {
       let nowprice =  this.detailObj.activity.commodity.commoditySku[this.selSpecId].price* this.numberValue
       nowprice =  this.toDecimal2(nowprice)
       this.nowprice = nowprice
			},
			showSku(){
				if(this.detailObj.status == 3)return false;
				this.skushow = true;
			},
			jumpBecome(param){
				if(this.detailObj.status == 3)return false;
				if(this.detailObj.hasBeenPromotion == true){
					this.$tools.toast("亲  只能帮卖一次哦")
					return false;
				}


				console.log(param)
				this.$store.commit('detailinfo',this.detailObj )
				if(param == 'goto'){
					uni.navigateTo({
						url:'/pages/goods/goods_two_copy/goods_two_copy'
					})
				}else{
					let {userId} = this.detailObj
					uni.navigateTo({
						url:'/pages/home_page/become/become?userId='+userId
					})
				}


			},
			jump_index(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			jump_order(){
				uni.switchTab({
						url:'/pages/tabbar/order_form/order_form'
					})

			},
			jumpAttention(){
				uni.navigateTo({
					url:"/pages/home_page/official_account"
				})
			},
      j_close(pro){   //订阅
        uni.showLoading({
          title: '加载中',
          mask:true
        });
        this.$u.api.cancelSubscribe(pro).then(e=>{		//	订阅
          uni.hideLoading();
          this.detailObj.userInfo.hasSubscribe = !this.detailObj.userInfo.hasSubscribe

        }).catch(err=>{
          console.log("err")
        })
      },
      downImg(){
        let param = {
          "page": "pages/home_page/index_details/index_details",
          "scene": JSON.stringify({
            promotionId:this.detailObj.promotionId
          })
        }

        this.$u.api.createCode(param).then(e=>{
          this.$store.commit("wxwewm",e)
          this.$refs.childa2.shareFc()


        }).catch(err=>{
          console.log(err)

        })
      },
      countTime(value){
        if (!value) return 0
        let clsj =  value;
        let oTargetDate = new Date(clsj.replace(/-/g, '/'));
        let nTarget = oTargetDate.getTime();

        let oNowDate = new Date();
        let nNow = oNowDate.getTime();
        // 总秒数
        let total = parseInt((nTarget - nNow) / 1000);
        this.totalSj = total
      },

      member(targetId){
        this.$u.api.isAttention(targetId).then(e=>{
          console.log('关注成为成员')
        }).catch(err=>{
          console.log(err)
        })
      }
		}
	}

</script>

<style lang="scss">
	.fx{
		display: flex;
		flex-direction: column;
		image{
			height: 56rpx;
			width: 56rpx;
			background-size: 100% 100%;
			margin: 0 10rpx;
		}
		text{
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			line-height: 30rpx;
		}
	}
	.x-button{
			margin-top: 20rpx;
			width: 136rpx;
			height: 52rpx;
			background: #ff0000;
			border-radius: 10rpx;
			color: #FFFFFF;
			font-size: 26rpx;
			line-height: 52rpx;
			text-align: center;
			margin-left: auto;
			margin-bottom: 20rpx;
	}
	.become{
		padding: 20rpx;
		height: 106rpx;
		>view{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #FFF9E4;
			height: 64rpx;
			padding: 0 20rpx;
			text{
				font-size: 28rpx;
				color: #333;
			}
			
		}
		}
	button::after {
		border: none;

	}
  .mark-content{
    position:fixed;top:0;left:0;
    width:100%;height:100%;
    z-index: 1000;
  }
	button {
		background-color: transparent;

		padding-left: 0;

		padding-right: 0;

		line-height:inherit;

	}

	button {
		border-radius:0;

	}
	.break-time{
		height: 64rpx;
		background-color: #FFF9E4;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #ff0000;
		margin-top: 50rpx;
	}
	.pop-box{
		min-height: 500rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		.top{
			display: flex;
			align-items: center;
			>image{
				height: 160rpx;
				width: 160rpx;
        border-radius: 8rpx;
			}
			.info{
				height: 160rpx;
				display: flex;
        flex: 1;
        overflow: hidden;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
			}
			.icon{
				align-self: flex-start;
				margin-left: auto;
			}

		}
		.guige{
			font-size: 32rpx;
			font-weight: bold;
			margin-top: 20rpx;
		}
		.specification-list {
		  margin-top: 22rpx;
		  display: flex;
      flex-wrap: wrap;
		  .specification-item {
		    border: 2rpx solid #f4f4f4;
		    border-radius: 12rpx;
		    padding: 0 50rpx;
        margin-right: 30rpx;
		    box-sizing: border-box;
		    height: 74rpx;
		    margin-bottom: 20rpx;
		    display: flex;
		    align-items: center;
        background-color:#999999;
        color: #FFFFFF;
		    .product-img {
		      width: 60rpx;
		      height: 60rpx;
		      border-radius: 10rpx;
		      background-color: #ccc;
		      margin-right: 20rpx;
		    }
		  }
      .specification-item:nth-last-child(1){
        margin-right: 0;
      }
      .sel-item {
        color: #ff0000;
		    border-color:#ff0000;
		    background-color:rgba(255, 109, 46, 0.3);
		  }
      text{
        display: block;
      }
		}
		.jbq{
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			text{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.x-btn{
			height: 70rpx;
			width: 710rpx;
			background: #ff0000;
			text-align: center;
			border-radius: 70rpx;
			line-height: 70rpx;
			color: #FFFFFF;
			font-size: 32rpx;
		}
		.c9{
			background-color: #999999 !important;
		}
	}
	.container{
		background-color: #f7f7f7;
		padding-bottom: 150rpx;
	}
	.orange{
		color: orange;
	}
  .topimage{
    height: 500rpx;
    width: 100%;
    background-size: 100% 100%;
    background: #707070;
  }
	.x-head{
		background: #FFFFFF;

		.addbig{
			display: flex;
			justify-content: space-between;
			height: 236rpx;
			border-radius: 20rpx 20rpx 0 0;
			position: relative;
			padding: 0 20rpx 20rpx 40rpx;
			background: #FFFFFF;
			.x-btn{
				text{
					color: #fff;
					font-size: 26rpx;
					background-color: #ff0000;
					display: inline-block;
				}
			}
			.box-left{
				display: flex;
				flex-direction: column;
				margin-top: -80rpx;
				padding-bottom: 20rpx;
				position: relative;
				.x-btn{
					font-size: 26rpx;
					margin-top: 10rpx;
				}
				image{
					height: 156rpx;
					width: 156rpx;
					position: absolute;
					left: 0rpx;
					top: -10rpx;
					border-radius: 8rpx;

				}
				.tag1{
					font-size: 32rpx;
					color: #000000;
					margin-top: 156rpx;
				}
				.tag2{
					color: #c3b091;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					height: 50rpx;
					margin-top: 15rpx;
					.lr{
						margin: 0 6rpx;
						line-height: 100%;
						font-size: 26rpx;

					}
				}
			}

			.box-right{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.box{
					margin-top: 16rpx;
					display: flex;
					flex-direction: row;
					.pyq{
						display: flex;
						flex-direction: column;
						margin-right: 40rpx;
						image{
							height: 56rpx;
							width: 56rpx;
							background-size: 100% 100%;
							margin: 0 10rpx;
						}
						text{
							font-size: 24rpx;
							color: #999999;
							text-align: center;
							line-height: 30rpx;
						}
					}
					.fx{
						display: flex;
						flex-direction: column;
						image{
							height: 56rpx;
							width: 56rpx;
							background-size: 100% 100%;
							margin: 0 10rpx;
						}
						text{
							font-size: 24rpx;
							color: #999999;
							text-align: center;
							line-height: 30rpx;
						}
					}
				}
				.x-button{
						margin-top: 20rpx;
						width: 136rpx;
						height: 52rpx;
						background: #ff0000;
						border-radius: 10rpx;
						color: #FFFFFF;
						font-size: 26rpx;
						line-height: 52rpx;
						text-align: center;
						margin-left: auto;
						margin-bottom: 20rpx;
				}
				.active{
					opacity: 0.5;
				}
			}
		}
	}
	.box-body{
		background: #FFFFFF;
		>text{
			font-size: 30rpx;
			color: #000000;
			font-weight: bold;
			display: block;
			line-height: 40rpx;
			padding: 20rpx;
		}
		.become{
			padding: 20rpx;
			height: 106rpx;
			>view{
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #FFF9E4;
				height: 64rpx;
				padding: 0 20rpx;
				text{
					font-size: 28rpx;
					color: #333;
				}
				view{

				}
			}
			.x-button{
				width: 90rpx;
				height: 40rpx;
				background: #ff0000;
				border-radius: 6rpx;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 40rpx;
				text-align: center;

			}
		}
		.x-helpe{
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			width: 100%;
			padding:0 20rpx;
			margin-bottom: 20rpx;
			.tag1{
				display: flex;
				flex-direction: column;
				>text{
					color: #999999;
					font-size: 24rpx;
					line-height: 100%;
				}
				.div-line{
					margin-bottom: 20rpx;
          height: 50rpx;
					display: flex;
					align-items: center;
					view{
						color: #999999;
						font-size: 30rpx;
            font-weight: bold;
					}
				}
			}
			.x-button{
					margin-top: 20rpx;
					width: 136rpx;
					height: 52rpx;
					background: #fff;
					border: 1px solid #333333;
					border-radius: 10rpx;
					color: #333333;
					font-size: 26rpx;
					line-height: 52rpx;
					text-align: center;
					margin-left: auto;
			}
		}
		.boxadd{
			background-color: #FFFFFF;
			padding:0 20rpx;
			.goods-award{
				background-color: #F7F7F7;
				// width: 116rpx;
				height: 116rpx;
				display: flex;
				align-items: center;
				padding:0 20rpx;
				box-sizing: border-box;
				image{
					height: 66rpx;
					width: 66rpx;
					border-radius: 6rpx;
				}
				view{
					height: 60rpx;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					margin-left: 10rpx;
					text{
						display: block;
						font-size: 28rpx;
						line-height: 100%;
					}
				}
			}
		}
		.goods-item{
			margin-top: 20rpx;
			.box-img{
				display: flex;
				flex-direction: column;
				image{
					width: 100%;
					background-size: 100% 100%;
				}
        video{
          width: 710rpx;
          margin-left: 20rpx;
        }
			}
			.font1{
				font-size: 48rpx;
				font-weight: bold;
				color: #ff0000;
				display: block;
				padding: 0 20rpx;
				line-height: 82rpx;
			}
			.font2{
				font-size: 30rpx;
				font-weight: bold;
				padding: 0 20rpx;
				display: block;
				line-height: 42rpx;
				color: #333333;
			}

		}
	}
	.rult-sku{
		background: #FFFFFF;
		padding: 0 20rpx;
		.sku-item{
			display: flex;
			min-height: 92rpx;
			align-items: center;
      text:nth-child(1){
        white-space:nowrap;
      }
			text{
				color: #333333;
				font-size: 30rpx;
				margin-right: 36rpx;
				color: red;
			}
			image{
				height: 40rpx;
				width: 40rpx;
				background-size: 100% 100%;
				margin-left: auto;
			}
		}
		.safeguard{
			display: flex;
			height: 92rpx;
			align-items: center;
			text{
				font-size: 28rpx;
				margin-right: 36rpx;
			}
		}
		.x-firm{
			display: flex;
			align-items: center;
			width: 100%;
			height: 140rpx;
			image{
				height: 100rpx;
				width: 100rpx;
			}
			.firm-item{
				margin-left: 20rpx;
				display: flex;
        flex: 1;
				flex-direction: column;
				justify-content: space-around;
				height: 100rpx;
				.renz{
					background-color: #F83603;
					font-size: 24rpx;
					color: #FFFFFF;
					border-radius: 4rpx;
					margin-left: 20rpx;
				}
			}
			.look-shop{
				align-self:flex-start;
				margin-top: 25rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 92rpx;
				height: 40rpx;
        background-color: #F83603;
				border-radius: 8rpx;
				text-align: center;
				font-size: 20rpx;
        color: #FFFFFF;
				box-sizing: border-box;
				margin-left: auto;
			}
		}
	}
	.x-browse{
		background: #FFFFFF;
		.x-down{
			padding: 20rpx;
			border-top: 20rpx solid #F7F7F7;
			.x-down-item{
				>view{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					.font-b{
						color: #333333;
					}
					>text{
						font-size: 24rpx;
						color: #999999;
					}
					image{
						width: 38rpx;
						height: 38rpx;
						background-size: 100% 100%;
						margin: 0 16rpx;
					}
					view{
						margin-left: auto;
					}
				}

			}
		}
		.z-load{
			height: 96rpx;
			text-align: center;
			line-height: 96rpx;
		}
	}
	.x-order{
		background: #FFFFFF;
		padding:0 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: #FFFFFF;
		z-index: 10;
		>view{
			display: flex;
			flex-direction: column;
			image{
				width: 56rpx;
				height: 56rpx;
			}
			text{
				font-size: 20rpx;
				color: #333333;
				text-align: center;
			}
		}
		.order-button{
			display: block;
			width: 476rpx;
			height: 80rpx;
			background: #ff0000;
			border-radius: 50rpx;
			color: #FFFFFF;
			font-size: 38rpx;
			line-height: 80rpx;
			text-align: center;
			margin-left: auto;

		}
		.c9{
			background-color: #999999 !important;
		}
	}
	.gsfont{
		height: 150rpx;
		background-color: #FFFFFF;
		text-align: center;
		margin: 40rpx 0rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			font-size: 24rpx;
		}
	}
</style>
