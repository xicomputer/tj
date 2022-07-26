<template>
	<view class="cantainer">
<!--     <view class="nobt" v-if="isTJ == false">-->
<!--        <view class="top-head">-->
<!--          <image src="/static/haowu.png" mode=""></image>-->
<!--          <text class="font1">如何推荐好物</text>-->
<!--          <text class="font2" @tap="jumpexplain">不会使用，查看推荐教程和案例> </text>-->
<!--        </view>-->

<!--        <view class="x-box1"  @tap="jumpexplain">-->
<!--          <u-icon name="plus-circle-fill" color="#ff0000" size="64"></u-icon>-->
<!--          <text class="u-font-30 c3 u-margin-left-20">推荐好货物给朋友</text>-->
<!--        </view>-->

<!--        <view class="down-foot">-->
<!--          <view class="title-h2">推荐动态</view>-->
<!--          <view class="hd">-->
<!--            <swiper class="swiper"  display-multiple-items=7 circular=true  autoplay=true interval=2000 duration=500 vertical=true   catchtouchmove="catchTouchMove">-->
<!--              <swiper-item v-for="(item,index) in imgdata" :key="index" catchtouchmove="catchTouchMove" >-->
<!--                <view class="uni-zd">-->
<!--                  &lt;!&ndash;                {{item.operationTime}}&ndash;&gt;-->
<!--                  <text style="width: 110rpx;">{{item.operationTime|mintime }} </text>-->
<!--                  <image :src="item.headImgUrl" mode=""></image>-->
<!--                  <text style="width: 200rpx;" class="u-line-1">{{item.nickName}}</text>-->
<!--                  <text>推荐好货物给朋友</text>-->
<!--                </view>-->
<!--              </swiper-item>-->
<!--            </swiper>-->
<!--          </view>-->

<!--        </view>-->
     <!-- </view> -->

     <view   class="cantainer_two">
       <view class="xp-box" >

        <view class="top-view" :style="{height:filterBoxTop +'px'}"> </view>
         <!-- <view class="navself u-border-bottom" :style="{top:filterBoxTop +'px',height:!topNav ? calcTopBlockH+'rpx'  : 340-jlheight+'rpx'}"> -->
         <view class="navself" :style="{top:filterBoxTop +'px',height:!topNav ? 10+'rpx'  : 330+'rpx'}">
           <view class="manifesto" :class="{ nomanifesto:topNav}" :style="{paddingTop:(paddingtop-filterBoxTop)+'px'}" >
             <view class="title-red">品牌商家直供100%正品</view>
             <text> 商家直发，保税仓直发，退换无忧 </text>
           </view>
           <!-- <u-search @search="searchFn" :style="{width:!topNav ? '710rpx' : '400rpx',paddingTop:(paddingtop-filterBoxTop)+'px'}" class="set-width" height="58" placeholder="请输入商品名称" :clearabled="true" :show-action="false" v-model="searchValue"></u-search> -->
			<!-- <block v-if="!topNav">				 -->
			<u-sticky>
				<block >
					<view class="u-flex u-p-l-28 u-p-t-40">
					  <view class="top-subtitle-title" v-for="(item,index) in goodspor"
					   :class="{active: newNowIndex.index0 == index }"
					   :key="index" @tap="selecClass(index)" >{{ item.name}}</view>
					</view>
					
					<block v-if="newNowIndex.index0 == 0">
						
						<scroll-view :scroll-x="true" style="white-space: nowrap;margin-top: 20rpx;" class="navbar">
							<view  v-for="(list, list_index) in scroll_name_list" :key="list_index" >
								<view v-for="(item, index) in list" :key="index"   @click="tabClick(index)" @tap="shopNmae(item,index)"  class="nav-item" :class="{ current: tabCurrentIndex == index}">
									{{ item.nickName }}
								</view>
							</view>
						</scroll-view>
						<!-- <swiper class="swiper" @change="(e)=>{this.list_current = e.detail.current;}">
							<swiper-item :key="list_index" v-for="(list, list_index) in scroll_name_list">
								<u-grid :border="false" :col="5" hover-class="hover-class">
									<u-grid-item v-for="(item, index) in list" :index="index" :key="index" @tap="shopNmae(item,(index + list_index * 10))">								 
										<view class="u-flex-col u-row-center u-col-center supplier-avatar" style="padding: 5rpx; border-radius: 5000px;width: 120rpx;height: 120rpx;" :class="{'name-active':(index + list_index * 10) === newNowIndex.index1}">
											<u-icon :customStyle="{borderRadius: '5000px',overflow:'hidden'}" :name="item.headImgUrl||'/static/tabarn4.png'" :width="80" :height="80"></u-icon>
											<text class="u-line-1" style="width: 115rpx; text-align: center;font-weight: 800;">{{ item.nickName }}</text>
										</view>
									</u-grid-item>
								</u-grid>
							</swiper-item>
						</swiper> -->
					</block>
					<block v-else>
						<scroll-view :scroll-x="true" style="white-space: nowrap;margin-top: 20rpx;" class="navbar">
							<view v-for="(list, list_index) in scroll_name_list" :key="list_index" >
											<view  v-for="(item, index) in list"  :key="index"  @click="tabClick(index)"@tap="()=>{
											this.newNowIndex.index2 = 0;
											this.newNowIndex.index1 = index;
											selectShop(index,item)}"
											class="nav-item" :class="{ current: tabCurrentIndex == index }">
												{{ item.supplierName }}
											</view>
							</view>
						</scroll-view>
						<!-- <swiper class="swiper" @change="(e)=>{this.list_current = e.detail.current;}">
							<swiper-item :key="list_index" v-for="(list, list_index) in scroll_name_list">
								<u-grid :border="false" :col="5" hover-class="hover-class">
									<u-grid-item  v-for="(item, index) in list" :index="index" :key="index" 
										@tap="()=>{
											this.newNowIndex.index2 = 0;
											this.newNowIndex.index1 = index + list_index * 10;
											selectShop((index + list_index * 10),item)}">
										<view class="u-flex-col u-row-center u-col-center supplier-avatar" style="padding: 5rpx; border-radius: 5000px;width: 120rpx;height: 120rpx;" :class="{'name-active':(index + list_index * 10) === newNowIndex.index1}">
											<u-icon :customStyle="{borderRadius: '5000px',overflow:'hidden'}" :name="item.supplierLogo||'/static/tabarn4.png'" :width="80" :height="80"></u-icon>
											
											<text class="u-line-1" style="width: 115rpx; text-align: center;font-weight: 800;">{{ item.supplierName }}</text>
										</view>
									</u-grid-item>
								</u-grid>
							</swiper-item>
						</swiper> -->
					</block>
					<!-- <view class="indicator-dots">
						<view class="indicator-dots-item" :class="[list_current == list_index ? 'indicator-dots-active' : '']" :key="list_index" v-for="(list, list_index) in scroll_name_list">
						</view>
					</view> -->
				</block>
					<view class="tabs" >
					  <!--      <view class="u-font-32">全部</view>-->
					  <view style="width: 680rpx;" >
					    <u-tabs :list="classList" active-color="#ff0000"
					            :active-item-style="{
					             fontSize:'30rpx'
					            }"
					            :is-scroll="true" :current="current"
					            gutter="20" inactive-color="#333333" font-size="28"    @change="change">
					    </u-tabs>
					  </view>
					  <view class="x-link" @tap="skushow1=true">
					    <u-icon name="arrow-down" color="#333333" size="28"></u-icon>
					  </view>
					</view>
					<view class="sele-param">
					  <view class="sele-son">
					    <view class="sele-item" v-for="(item,index) in twolist" @tap="clickSort(index)" :key="index"  >
					      <view>{{ item.name }} </view>
					      <view class="sanjiao" v-if="item.volumedesc">
					        <u-icon  class="u-icon" v-if="sanjiao === index"  name="arrow-up-fill" color="#333333"  size="14"> </u-icon>
					        <u-icon  class="u-icon"  v-if="!(sanjiao === index)"  name="arrow-down-fill" color="#333333" size="14"></u-icon>
					      </view>
					
					      <view class="sanjiao" v-else>
					        <u-icon  class="u-icon"  name="arrow-up-fill" color="#333333"  size="14"> </u-icon>
					        <u-icon  class="u-icon"  name="arrow-down-fill" color="#333333" size="14"></u-icon>
					      </view>
					    </view>
					  </view>
					  <!--      <image @tap="screenShop" src="/static/iconse.png"></image>-->
					  <!-- <text @tap="screenShop" style="margin-right: 20rpx; color: #ff0000; font-weight: bold;">筛选</text> -->
					</view>
			</u-sticky>
			
			
			
			
			<!-- 
			<scroll-view :scroll-x="true" style="white-space: nowrap;margin-top: 20rpx;" class="navbar">
				<view v-for="(item, index) in scroll_name_list[0]" :key="index"  class="nav-item" :class="{ current: tabCurrentIndex == index }" @click="tabClick(index)">{{ item.nickName }}</view>
			</scroll-view> -->
		  
         </view>
      </view >
		  
     <view class="box-list"
     :style="{marginTop:!topNav ? contentBlockTop+filterBoxTop*2+'rpx' : 360-jlheight+filterBoxTop*2 +'rpx',
     minHeight:commodityList.length > 0?'80vh':'unset',
     paddingBottom: commodityList.length > 0?'100rpx':'unset'}">
        <view class="goods-info" v-for="(item,index) in commodityList" :key="index" @tap="gotoGoods(item)" >
          <image :src="item.thumbnail" mode="" style="width: 236rpx;height: 236rpx;"></image>
          <view class="goods-content">
                      <text class="tag1 ">{{item.commodityName}}</text>
                      <view class="tagadd u-line-1" style="display: flex;align-items: center;">
      						  <view style="width: 40%; " class=" u-line-1">{{ item.supplier.supplierName}}  </view>
      						  <text style="margin-left: 20rpx;">库存:{{ item.totalStock }}</text>
      					  </view>
             
             <view style="display: flex;font-size: 18rpx;align-items: center;">
      				 <view style="display: flex;align-items: center;">
      				 	<view style="color: white;background:#ff0000 ;padding: 9rpx 4rpx;border-bottom-left-radius: 8rpx;border-top-left-radius: 8rpx;"
      					:style="{background:item.activityStatus == 1 || item.activityStatus == 2 ? '#999999' :'#ff0000'}">
      						邀请赚佣
      					</view>
      				 	<text style="color: red;padding: 5rpx 0;border-bottom-right-radius: 8rpx;border-top-right-radius: 8rpx;padding-right: 8rpx;"
      					:style="{border:item.activityStatus == 1 || item.activityStatus == 2 ? '2px solid #999999;' :'2px solid #ff0000;',color:item.activityStatus == 1 || item.activityStatus == 2 ? '#999999;' :'#ff0000;'}">
      						￥{{showCommission(item.showCommission) }}
      					</text>      
      				 </view>
                 <view style="display: flex;align-items: center;margin-left: 40rpx;">
                  	<view style="color: white;background:#00D674 ;padding: 9rpx 4rpx;border-bottom-left-radius: 8rpx;border-top-left-radius: 8rpx;"
      					:style="{background:item.activityStatus == 1 || item.activityStatus == 2 ? '#999999' :'#00D674'}"
      					>自购返佣 </view>
                  	<text style="color: #00D674;border: 2px solid #00D674;padding: 5rpx 0;border-bottom-right-radius: 8rpx;border-top-right-radius: 8rpx;padding-right: 8rpx;"
      					:style="{border:item.activityStatus == 1 || item.activityStatus == 2 ? '2px solid #999999;' :'2px solid #00D674;',color:item.activityStatus == 1 || item.activityStatus == 2 ? '#999999;' :'#00D674;'}">
      						￥{{showCommission(item.showCommission) }}
      					</text>     
                  </view>
             </view>
             <view>
               <view class="u-font-24" style="color: #999999;">
      				  <text style="color: red;font-weight: 600;width: 280rpx;font-size: 26rpx;"> 推荐价￥{{item.showPrice}}</text>
      				   <text style="font-size: 23rpx;color: #999999;position: absolute;right: 5%;">已售:{{item.volume}}</text></view>
              
             
             </view>
             
                    </view>
       </view>
      </view> 
	  </scroll-view>
	  </swiper-item>
	  </swiper>	
      <none-msg :info='tsmsg' :color="'#ff0000'" :setheight="'50px'" :goodsno='true' v-if="!commodityList.length" ></none-msg>
      <u-popup v-model="skushow1" mode="bottom">
        <u-icon  style="padding: 15rpx" @tap="skushow1=false" class="icon" name="close" size="24"></u-icon>
        <view class="u-text-center u-margin-top-20 u-margin-bottom-20 u-font-30">选择类目</view>
        <view class="pop-box">

          <view class="x-title">所有类目</view>
          <!--        <view  class="btn-item">-->
          <!--          <view>全部</view>-->
          <!--          <view v-for="(item,index) in classList">{{ item.name }}</view>-->
          <!--        </view>-->
          <scroll-view  style="height: 300px;"
                        scroll-y="true"
                        @scrolltolower="ondown"
                        :lower-threshold="50" >
            <view class="btn-item">
              <view  v-for="(item,index) in classList"
                     :class="{active:index === navshopindex}"
                     @tap="changeTwo(index,item)"><text class="u-line-1">{{ item.name }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </u-popup>
      <!-- <u-popup v-model="skushow2" mode="right">
        <view class="pop-box2">
          <view style="display: flex; justify-content: space-between;width: 100%;">
            <u-icon style="padding:0 15rpx"  @tap="skushow2=false"  name="close" size="24"></u-icon>
            <text style="margin-right: auto">您的云仓货源链路</text>
            <text style="color: #ff0000" @tap="resetBtn" >重置</text>
          </view>
          <view class="x-top">
            <view :class="{active: newNowIndex.index0 == index }" v-for="(item,index) in goodspor" :key="index" @tap="selecClass(index)">{{item.name}}</view>
          </view>
          <view v-if="newNowIndex.index0 != 1" style="height: 1px; width: 100%; margin:20rpx 0; background: #cccccc; overflow: hidden"></view>

          <view class="box">
            <view class="x-title" v-if="newNowIndex.index0 != 1">
              <text>您已关联的云仓货源链路</text>
              <view @tap="isShrink1 = !isShrink1">
                <text> {{isShrink1 ? '收起' : '展开'}}</text>
                <u-icon v-if="isShrink1" name="arrow-down"size="24"></u-icon>
                <u-icon v-else name="arrow-right"size="24"></u-icon>
              </view>
            </view>
            <scroll-view class="x-left"  scroll-y="true" v-if="newNowIndex.index0 != 1" >
              <view class="box-ghost" v-if="isShrink1">
                <view class="u-line-1" :class="{active:index === newNowIndex.index1}" v-for="(item,index) in nameList" :key="index" @tap="shopNmae(item,index)" >{{ item.nickName}}</view>
              </view>
            </scroll-view>
            <view style="height: 1px; width: 100%; margin:20rpx 0; background: #cccccc; overflow: hidden"></view>
            <view class="x-title"  v-if="shopNmaeList.length > 1">
              <text>商品来源以下店铺</text>
              <view @tap="isShrink = !isShrink">
                <text> {{isShrink ? '收起' : '展开'}}</text>
                <u-icon v-if="isShrink" name="arrow-down"size="24"></u-icon>
                <u-icon v-else name="arrow-right"size="24"></u-icon>
              </view>
            </view>
            <scroll-view  :class="{bjorange:allshow}" class="x-right-now" style="height: 550rpx;" scroll-y="true" v-if="shopNmaeList.length > 1">
              <view class="box-ghost"  v-if="isShrink" >
                <view  :class="{active:index === newNowIndex.index2}" v-for="(item,index) in shopNmaeList" @tap="selectShop(index,item)" :key="index" >
                  <text class="u-line-1" >{{item.supplierName}}</text>
                </view>
              </view>
            </scroll-view>
            <none-msg  v-if="shopNmaeList.length <= 1" :info='tsmsg' :setheight="'50px'"  :goodsno='true' ></none-msg>
            <view class="x-down">
              <view @tap="defaultData">设置默认</view>
              <view @tap="seEnter">确定</view>
            </view>
          </view>
        </view>
      </u-popup> -->
      <u-popup v-model="skushow3" mode="bottom">
        <view class="pop-box3">
          <u-icon  style="padding: 15rpx"  @tap="skushow3=false" class="icon" name="close" size="24"></u-icon>
          <view class="u-text-center u-margin-top-20 u-margin-bottom-20 u-font-30">您正在选择该商品推荐</view>
          <view class="box">
            <view class="x-head">
              <image :src="nowgotoData.thumbnail"></image>
              <view class="x-right">
                <view class="tag1">{{nowgotoData.commodityName}}</view>
                <view class="tag2">
                  <text>推荐价：￥{{nowgotoData.showPrice}}</text>
                  <text>佣金奖励：￥{{nowgotoData.showCommission}}</text>
                </view>
              </view>
            </view>
            <view class="x-center">
              <view class="tag2">
                <text v-if="supportRefund">七天无理由退货</text>
                <text>物流配送</text>
              </view>
            </view>
            <view class="x-select" v-if="judgeThreeIndex.index0 !=1">
              <view class="font-wz">您正在共享TA的云仓链路：</view>
              <!--            <u-input v-model="inputVal"  type="select" border="true" placeholder="请选择"  @click="selectShow = true" />-->

              <picker class="x-input" mode="selector" :range="selectList" range-key="nickName" @change="picker1" >
                <view v-if="seleInpt"> {{ defaName.nickName == '全部' ? selectList[addInputIndex].nickName : defaName.nickName }}</view>
                <view v-else>{{selectList[addInputIndex].nickName}} </view>
              </picker>
            </view>
            <view @tap="lookInfo" style="color: #ff0000; font-size: 32rpx; margin-left: 20rpx;">商品来源：{{nowgotoData.supplier.supplierName}}</view>

            <view class="pos-box"  >
              店铺评分：<uni-rate  :readonly="true"  :value="nowgotoData.supplier.avgScore || 5 " />
              <u-button style="margin-left: auto;" @click="clickScore" size="mini">{{haspj? '已评价' : '我要评分'}} </u-button>
            </view>
            <view class="pfc" v-if="nowgotoData.supplier.scoreCount"> {{ nowgotoData.supplier.scoreCount}}人参与了评分</view>
            <view style="padding: 20rpx;">注释：为保障商家以及用户利益：除食品生鲜类不支持退款，其它品类商品用户确认收货后佣金分配，如在自购或推荐收到商品后，如有损坏等其它问题及时与商家沟通，如未沟通达成一致可向平台反应。</view>
            <view class="x-btn">
              <view @tap="jumpTwo">自购返佣/推荐赚佣</view>
            </view>

          </view>
        </view>
      </u-popup>
      <u-popup v-model="popFont" mode="center">
        <view class="pop-box4">
          <view>评分</view>
          <view>
            <text>当前评分：</text>
            <uni-rate  :readonly="true"  :value="nowgotoData.supplier.avgScore || 5 " />
          </view>
          <view>
            <text>我要评分：</text>
            <uni-rate @change="grade" :value="0" />
          </view>

          <view>
            <button @tap.stop="popFont=false">取消</button>
            <button @tap.stop="gradeEnter">确定</button>
          </view>
        </view>
      </u-popup>
      <!--    <u-select @confirm="seleConfirm" v-model="selectShow" :default-value='selectDefault' :list="selectList"></u-select>-->
      <!--    <picker mode="selector" :range="selectList"  @change="seleConfirm">-->
      <!--      <view>{{selectList[0]}}</view>-->
      <!--    </picker>-->
	  <u-popup v-model="shopsShow" mode="bottom" class="shop-pop">
		  <view class="pop-box2">
			  <view class="box">
				<view class="x-title u-row-center"  v-if="shopNmaeList.length > 1">
				<!-- <u-icon style="padding:0 15rpx"  @tap="shopsShow=false"  name="close" size="24"></u-icon> -->
				<text>商品来源以下店铺</text>
				<!-- <view @tap="isShrink = !isShrink">
				  <text> {{isShrink ? '收起' : '展开'}}</text>
				  <u-icon v-if="isShrink" name="arrow-down"size="24"></u-icon>
				  <u-icon v-else name="arrow-right"size="24"></u-icon>
				</view> -->
			  </view>
			  <scroll-view  :class="{bjorange:allshow}" class="x-right-now" style="height: 550rpx;" scroll-y="true" v-if="shopNmaeList.length > 1">
				<view class="box-ghost"  v-if="isShrink" >
				  <view  :class="{active:index === newNowIndex.index2}" v-for="(item,index) in shopNmaeList" @tap="selectShop(index,item)" :key="index" >
					<text class="u-line-1" >{{item.supplierName}}</text>
				  </view>
				</view>
			  </scroll-view>
			  <none-msg  v-if="shopNmaeList.length <= 1" :color="'#ff0000'" :info='tsmsg' :setheight="'50px'"  :goodsno='true' ></none-msg>
			  <view class="x-down">
				<view @tap="defaultData">设置默认</view>
				<view @tap="seEnter">确定</view>
			  </view>
			  </view>
		  </view>
	  </u-popup>


    </view>
    <u-tabbar :list="tabbar" ></u-tabbar>
	</view>
	
</template>

<script>
import utils from '@/common/logic/utils/util.js'
import permiss from '@/common/logic/permiss'
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
		list_current: 0,	// 当前swiper容器的点下标
        scroll_name_list: [],	// 二维数组 云仓链路推荐官
		tabbar:{},
        isTJ:false,
				imgdata:[],
        haspj:false,
        score:0,
        goodspor:[
          {name:'特约推荐官云仓链路'},
          {name:'商家链路'}
        ],
        popFont:false,
        count: 5,
        start: 2.9,
        newNowIndex:{
          index0:0,	// 链路类型
          index1:0,
          index2:0,
        },
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
        classList:[{name:'全部'}],
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
        twolist:[
          {
            name: '销量',
            volumedesc:false
          },
          {
            name: '佣金',
            volumedesc:false
          },
          {
            name: '库存',
            volumedesc:false
          },
          {
            name: '推荐价',
            volumedesc:false
          }
        ]
			};
		},
		computed: {
			calcTopBlockH(){	// 顶部固定部分高度
				if(this.newNowIndex.index0 == 1){
					// return 260
					return 260
				} else {
					return 260
				}
			},
			showCommission(){
				return function(item){
					let showC = item.split('-')
					if(showC.length > 1){
						return showC[1]
					}
					return showC[0]
				}
			},
			contentBlockTop(){	// 内容防止挡住的内边距
				if(this.newNowIndex.index0 == 1){
					// return 500
					return 480
				} else {
					return 480
				}
			}
		},
    filters: {
      mintime(value) {
        let _fromatTime = value.replace(/-/g, "/");
        let oldTime = new Date(_fromatTime)
        oldTime = oldTime.getTime(oldTime)

        let newTime = new Date()
        newTime = newTime.getTime(newTime)
        let surplus = newTime - oldTime
        surplus = utils.dateUtil.humanize(surplus)

        return surplus
      }
    },
    onPageScroll(e){
      if (e.scrollTop > 50){
        if(this.commodityList.length)this.topNav = true
      }else{
        this.topNav = false
      }
    },
    onLoad(){
		console.debug('uview api',this.$u)
      this.filterBoxTop = uni.getSystemInfoSync()['statusBarHeight'] ;

      this.paddingtop = wx.getMenuButtonBoundingClientRect().top
      let jlheight = wx.getMenuButtonBoundingClientRect().height

      this.jlheight = ( jlheight+ (this.paddingtop -this.filterBoxTop)*2)*2
      console.log( 'top',this.filterBoxTop)
      console.log( '胶囊',wx.getMenuButtonBoundingClientRect())

      this.categoryFn()
      var page = getCurrentPages()
      if(page.length<=1){
        console.log('外部')
        this.ishome = false
      }else{
        console.log("正常")
        this.ishome = true
      }
	  this.Quadratic(true)
    },
    onShow(){
      this.sysUserInfo()
      let data = {
        "isAsc": "",
        "operation": "promotion",
        "orderBy": "",
        "orderByColumn": "",
        "pageNum": 1,
        "pageSize": 30,
      }
      this.$u.api.operation(data).then(e=>{
        // this.recordList = this.recordList.concat(e.rows); //将数据拼接在一起
        this.imgdata = e.rows
      }).catch(err=>{
        console.log(err)
      })

    },
    onReachBottom(){
      this.pageNumber++
      this.goodsListFn(this.currentObj)
    },
	methods:{
      sysUserInfo() {  //拿数据
        this.$u.api.getUserInfo().then(e => {
          this.isTJ = e.tj
          this.$store.commit('tabAuth',e)
          permiss(this).then(()=>{
            this.tabbar = this.$store.state.tab
          })

        }).catch(err => {
          console.log(err)

        })
      },
	  //swiper 切换
	  changeTab(e) {
	  	console.log(e, 'eeee');
	  	this.tabCurrentIndex = e.target.current;
	  	this.navList[this.tabCurrentIndex].orderList = [];
	  },
	  //顶部tab点击
	  tabClick(index) {
	  	console.log(index);
	  	this.tabCurrentIndex = index;
	  },
      catchTouchMove(){
        return false
      },
			jump(){
				uni.navigateTo({
					url:"/pages/goods/newgoods_recommend/newgoods_recommend"
				})
			},
			jumpexplain(){
				uni.navigateTo({
					url:"/pages/tabbar/fine_goods/explain"
				})
			},

      clickScore(){
        if(this.haspj){
          this.$tools.toast("已评价")
        }else{
          this.popFont=true
        }
      },
      grade(e){
        this.score = e.value
      },
      gradeEnter(){
        let para = {
          "score": this.score,
          "supplierId": this.nowgotoData.supplierId
        }
        this.$u.api.grade(para).then(e=>{
          this.categoryFn()
          console.log('BALCK',e)
          this.popFont=false
          this.$tools.toast("感谢您的评价")
          this.skushow3 = false
        }).catch(err=>{
          console.log(err)

        })
      },
      lookInfo(){
				return
        uni.navigateTo({
          url:"/pages/home_page/shop_info/shop_info?supplierId="+this.nowSupplierId
        })
      },
	  // 筛选
      screenShop(){
        if( uni.getStorageSync('nowindex')){
          this.newNowIndex =uni.getStorageSync('nowindex')
        }
        this.skushow2=true
        this.Quadratic()
        this.nameList=[{nickName:'全部'}]
        // this.nameList=[]
      },
      picker1(e){
        this.seleInpt = false
        this.addInputIndex = e.detail.value
        this.$store.commit('sendid', this.selectList[this.addInputIndex].dealerId)
      },
      homeorblack(){
        uni.switchTab({
          url: '/pages/tabbar/index/index'
        });
      },
      categoryFn(){ //初始化

        this.navinit().then(e=>{
          if(!this.judgeThreeIndex)this.judgeThreeIndex = uni.getStorageSync('nowindex');
          let now = this.laborer ? this.currentObj : uni.getStorageSync('nowgoods')
          console.log("now",now)
          // now.nickName
          this.defaName = now || 	{"nickName":"全部"}
          this.currentObj= now || this.classList[0] //保存当前类1
          this.goodsListFn(this.currentObj)
        })
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
      change(index){    //导航点击事件
	  console.log(111);
        this.current = index;
        this.commodityList= [];
        this.pageNumber=1;
        this.currentObj=this.classList[index]  //保存当前类2
        // console.log("qiant",this.classList[index]);
        this.goodsListFn(this.currentObj)
      },
      changeTwo(index,item){
		  console.log(222);
        this.current = index
        this.initFn();
        this.commodityList=[]
        this.navshopindex=index
        console.log(item)
        this.currentObj=item  //保存当前类3
        this.goodsListFn(item)
      },
      ondown(){     //弹窗分类下拉
        console.log("触发")
        this.pageNum++
        this.navinit();
      },
      goodsListFn(item){    //商品列表
        console.log("商品列表",item)
        let param = {
          "sysCategoryId": item.categoryId,
          "dealerId": item.dealerId || null,          //经销商id
          "isAsc": item.isAsc || null,
          "orderBy": "",
          "orderByColumn": item.orderByColumn || null,    //排序
          "pageNum": this.pageNumber,
          "pageSize":10,
          "searchValue": item.searchValueName ||null,
          "supplierIds":item.supplierId ? [item.supplierId] : null,
          'role':this.selectRole
        }
				if(this.newNowIndex.index0 == 0) {
					console.log(this.nameList[this.newNowIndex.index1],'数据大');
					param['dealerId'] = this.nameList[this.newNowIndex.index1].dealerId || null
					param['supplierIds'] = this.shopNmaeList[this.newNowIndex.index2].supplierId?[this.shopNmaeList[this.newNowIndex.index2].supplierId] : null
				}
				if(this.newNowIndex.index0 == 1) {
					param['supplierIds'] = this.shopNmaeList[this.newNowIndex.index1].supplierId?[this.shopNmaeList[this.newNowIndex.index1].supplierId] : null
				}
		console.log('param009',param);
        this.$u.api.goodsList(param).then(e=>{
          if(e){
            // this.commodityList = [];
            this.commodityList = this.commodityList.concat(e.rows);
            // console.log( 222, this.commodityList)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*排序*/
      initFn(){
        let that = this
        for (let twolistKey in that.twolist) {
          that.twolist[twolistKey].volumedesc=false
        }
      },
      clickSort(index){
        if( this.sanjiao === index){
          this.sanjiao =  !this.sanjiao;

        }else{
          this.sanjiao = index
        }

        this.commodityList=[];
        this.pageNumber = 1

        switch (index) {
          case 0:     //销量
            // this.volumedesc = true

            this.initFn()

            this.twolist[0].volumedesc =!this.twolist[0].volumedesc

            let sort = {};
            if(this.currentObj.isAsc == 'desc'){   //正序 降序
              sort = {
                orderByColumn:'volume',
                isAsc:'asc',
              }
            }else{
              sort = {
                orderByColumn:'volume',
                isAsc:'desc'
              }
            }
            this.currentObj =Object.assign(this.currentObj,sort)
            this.goodsListFn(this.currentObj)
            break
          case 1: //佣金
            this.initFn()
            this.twolist[1].volumedesc =!this.twolist[1].volumedesc
            let sort1 = {};
            if(this.currentObj.isAsc == 'desc'){   //正序 降序
              sort1 = {
                orderByColumn:'maxCommission',
                isAsc:'asc'
              }
            }else{
              sort1 = {
                orderByColumn:'maxCommission',
                isAsc:'desc'
              }
            }
            this.currentObj =Object.assign(this.currentObj,sort1)
            this.goodsListFn(this.currentObj)

            break
          case 2: //库存
            this.initFn()
            this.twolist[2].volumedesc =!this.twolist[2].volumedesc
            let sort2 = {};
            if(this.currentObj.isAsc == 'desc'){   //正序 降序
              sort2 = {
                orderByColumn:'totalStock',
                isAsc:'asc'
              }
            }else{
              sort2 = {
                orderByColumn:'totalStock',
                isAsc:'desc'
              }
            }
            this.currentObj =Object.assign(this.currentObj,sort2)
            this.goodsListFn(this.currentObj)
            break
          case 3: //推荐价
            this.initFn()
            this.twolist[3].volumedesc =true
            let sort3 = {};
            if(this.currentObj.isAsc == 'desc'){   //正序 降序
              sort3 = {
                orderByColumn:'minPrice',
                isAsc:'asc'
              }
            }else{
              sort3 = {
                orderByColumn:'minPrice',
                isAsc:'desc'
              }
            }

            Object.assign(this.currentObj,sort3)
            this.goodsListFn(this.currentObj)
            break
        }

        //volume asc desc
        //maxCommission  asc desc
        //totalStock
        //minPrice
      },
      selecClass(e){
        this.newNowIndex.index0= e
        console.log(e)
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
			console.log(this.nameList[this.newNowIndex.index1]);
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
				  let cur_index = Math.floor((index)/100)
				  if(!this.scroll_name_list[cur_index]){
					  this.scroll_name_list[cur_index]=[]
					  this.scroll_name_list[cur_index].push(item)
				  } else {
					  this.scroll_name_list[cur_index].push(item)
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
      shopNmae(dealerId,index){    //商家类目
        this.shopNmaeList =[{supplierName:'全部','dealerId':dealerId.dealerId}]
		if(this.newNowIndex.index0 == 1){
			this.scroll_name_list = []
		}
		if(this.newNowIndex.index0 == 0){this.shopsShow = true;}
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
            // this.pop_currentObj= this.shopNmaeList[this.newNowIndex.index2]  //保存当前类3
			if(this.newNowIndex.index0 == 1) {
				this.shopNmaeList.forEach((item,index)=>{
				  let cur_index = Math.floor((index)/10)
				  if(!this.scroll_name_list[cur_index]){
					  this.scroll_name_list[cur_index]=[]
					  this.scroll_name_list[cur_index].push(item)
				  } else {
					  this.scroll_name_list[cur_index].push(item)
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

        // this.pop_currentObj ={
        //   supplierId:item.supplierId
        // }
        //全部店铺名称
        if(item.supplierName == '全部'){
          //点全部
          this.pop_currentObj= {"dealerId":item.dealerId}  //保存当前

        }else{
          //单点选择店铺名称
          this.pop_currentObj = Object.assign(this.pop_currentObj,item)
        }
		if(this.newNowIndex.index0 == 1 && !this.shopsShow){
			this.seEnter()
		}
      },
      seEnter(){

        this.initFn()
        // this.skushow2 = false
        this.shopsShow = false
        this.pageNumber = 1
        this.current = 0;
        this.commodityList=[]

        this.judgeThreeIndex =  this.newNowIndex

        this.currentObj = this.pop_currentObj
        // this.goodsListFn(this.pop_currentObj)
        this.laborer = true
        this.categoryFn()
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
      resetBtn(){
        this.newNowIndex={
          index0:0,
          index1:0,
          index2:0,
        }
        uni.setStorage({
          key:'nowindex',data:this.newNowIndex,
        });
        this.pop_currentObj={'nickName':'全部'}
        this.currentObj = {}
        let that =this
        uni.removeStorage({
          key: 'nowgoods',
          success: function (res) {
            that.$tools.toast('已重置')
          }
        });
        this.Quadratic()


      },
      dealerListApi(item){     //经销商列表1

        let param={
          "isAsc": "",
          "orderBy": "",
          "orderByColumn": "",
          "pageNum": 1,
          "pageSize": 10,
          "searchValue": "",
          "supplierId": item
        }
        this.$u.api.dealerList(param).then(e => { //经销商
          if(e){
            let dispose = e.rows
            this.selectList = dispose

            this.$store.commit('sendid',dispose[0].dealerId) //默认
            // console.log('特约推荐官',dispose[0].dealerId)
            if(this.defaName.nickName && this.defaName.nickName != '全部' ){
              this.$store.commit('sendid',this.defaName.dealerId)
            }else{
              this.$store.commit('sendid',dispose[0].dealerId) //默认
            }

          }
        })
      },
      scoreState(p){
        this.$u.api.isGraded(p).then(e=>{
          this.haspj = e
        }).catch(err=>{
          if(err.code == 200){
            this.haspj = err.data
          }
        })
      },
      gotoGoods(item){

        console.log('详情',item)
        this.seleInpt = true
        this.nowSupplierId =item.supplierId
        this.addInputIndex = 0
        console.log(this.selectList)
        if (item.activityStatus == 1 || item.activityStatus == 2) {
          this.$tools.toast("您已发布过该商品");
          return false;
        }
        this.supportRefund = item.supportRefund
        this.skushow3 = true
        console.log('单个商品info',item)
        this.nowgotoData = item
        this.scoreState(this.nowgotoData.supplierId)
        this.dealerListApi(item.supplierId)
      },
      jumpTwo(){
        // uni.navigateTo({
        //   url: `/pages/goods/goods_two/goods_two?commodityId=${this.nowgotoData.commodityId}`
        // })
        //
        uni.navigateTo({
          url: `/pages/goods/buy_or_sellgoods/buy_or_sellgoods?commodityId=${this.nowgotoData.commodityId}`,
        })
        this.skushow3 = false
      },
      searchFn(value){     //搜索
        console.log('搜索',value)
        this.commodityList=[];
        this.pageNumber = 1;
        // let value = this.searchValue
        // value =  this.$u.trim(value)
        // if(!value){
        //   this.$tools.toast("请输入商品名字")
        //   return false
        // }
        let obj={
          searchValueName: value
        }
        debugger
        this.currentObj = Object.assign(this.currentObj,obj)
        console.log(this.currentObj)
        this.goodsListFn(obj)
      },
		}
	}
</script>

<style lang="scss">
	.cantainer{

	}
	// 链路选择样式 start
	.top-title {
		background: #FC6222;
		color: white;
	}
	.top-subtitle-title {
		font-size: 28rpx;
		font-weight: 400;
		margin-right: 36rpx;
		color: #666666;
		&.active{
			font-size: 32rpx;
			font-weight: 800;
			color: #ff0000;
		}
	}
	.swiper {
		height: 350rpx;
	}
	.indicator-dots {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}
	
	.indicator-dots-active {
		background-color: $u-type-primary;
	}
	.name-active {
		// background-color:  #FC6222;
		color: #FC6222;
	}
	.shop-pop {
		/deep/.u-drawer .u-drawer-content {
			border-radius: 24rpx 24rpx 0 0;
		}
	}
	/deep/.supplier-avatar .u-icon .u-icon__img {
		height: 80rpx !important;
		width: 80rpx !important;
	}
	
	// 链路选择样式 end
	
	.top-head{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 26rpx;
		image{
			width: 514rpx;
			height: 364rpx;
		}
		.font1{
			font-size: 30rpx;
			font-family: PingFang SC, Arial;
			font-weight: bold;
			line-height: 40rpx;
		}
		.font2{
			color: #999999;
			font-size: 20rpx;
		}
	}
  .nobt{
    min-height: 100vh;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
	.x-box1{
		height: 188rpx;
		width: 670rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06);
		display: flex;
		align-items: center;
		padding: 24rpx;
		border-radius: 16rpx;
	}
	.down-foot{
		width: 750rpx;
		padding:20rpx 50rpx;
		.title-h2{
			text-align: center;
			position: relative;
			color: #ff0000;
		
			overflow: hidden;
			&::before{
				 content: "";
				 display: block;
				 width: 240rpx;
				 height: 1px;
				 background: #ff0000;
				 position: absolute;
				 left:0;
				 top: 50%;
			}
			&::after{
				content: "";
				display: block;
				width: 240rpx;
				height: 1px;
				background: #ff0000;
				position: absolute;
				right:0;
				top: 50%;
			}
		}
		.hd{
			background-color: #FFFFFF;
			padding: 20rpx;
			margin-top: 30rpx;
			.swiper{
				width: 100%;
				height: 520rpx;
				 swiper-item{
					overflow: hidden;
					height: 100rpx;
					.uni-zd{
						display: flex;
						height: 60rpx;
						align-items: center;
						text{
							font-size: 24rpx;
							color: #333333;
						}
						image{
							height: 60rpx;
							width: 60rpx;
							margin: 0 20rpx;
							border-radius: 6rpx;
						}
						text:nth-last-child(1){
							margin-left: auto;
							color: #ff0000;
						}
					}
				}
			}
		}
		
	}

  .pop-box4{
    width: 600rpx;
    height: 400rpx;
    display: flex;
    justify-content: space-around;

    padding: 20rpx;
    flex-direction: column;

    >view{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button{

    }
  }

  .xp-box {
    width: 750rpx;
    overflow: hidden;
	
    .top-view{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      background: #FFFFFF;
    }
    .navself{
        background-color: #FFFFFF;
        width: 750rpx;
        display: flex;
        height: 340rpx;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        flex-direction: column;
        transition-duration: 0.4s;
      .set-width{
        padding-left:20rpx;
        width: 710rpx;
        padding-top: 10rpx;
      }
      .manifesto{
		  .title-red {color:#Ff0000;}
        color: #333333;
        margin-left: 30rpx;
        font-weight: 900;
        transition-duration: 0.4s;
        view{
          font-size: 32rpx;
        }
        text{
          font-size: 22rpx;
          font-weight:400 ;
        }
      }
     .nomanifesto{
        display: none;
      }
    }

  }
  .actived{
    height: 250rpx;
    padding-top: 33rpx;
    opacity: 1;
  }
  .tabs {
    height: 104rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10rpx;
    .u-scroll-view{
      view{
        font-family:"Microsoft YaHei";
      }
    }
    .arrow-dowm{

    }
    .x-link{
      width: 70rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .sele-param{
    font-family:'Microsoft YaHei';
    height: 86rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333333;
    .sele-son{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .sele-item{
        display: flex;
        align-items: center;
        .sanjiao{
          display: flex;
          flex-direction: column;
          .u-icon{
            margin-left: 5rpx;
          }
        }

      }
    }
    image{
      height: 36rpx;
      width: 36rpx;
      padding: 0 20rpx 0 30rpx;
    }
  }
  .box-list{
	// &.has-commodity{
	// 	padding-bottom: 100rpx;
	// 	min-height: 80vh;
	// }
    .goods-info{
      display: flex;
      // height: 300rpx;
      width: 100%;
      padding: 0 20rpx;
      margin-top: 20rpx;
      >image{
        height: 300rpx;
        width: 300rpx;
        border-radius: 8rpx;
      }
      .goods-content{
        width: 410rpx;
        padding:0 20rpx;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .tag1{
          font-size: 30rpx;
          color: #333333;
          font-weight: 800;
        }
        .tagadd{
          color: #999999;
        }
        .tag2{
          width: 100%;
          display: flex;
          margin-top: 10rpx;
          text{
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 2rpx 10rpx;
            height: 40rpx;
            background-color: #d3e1ee;
            border-radius: 8rpx;
            text-align: center;
            font-size: 20rpx;
            color: #2e97ff;
            margin-right: 10rpx;
            box-sizing: border-box;
          }
        }
        .tag3{
          color:#ff0000;
          font-size: 30rpx;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          view{
            color: #FE3936;
            font-family:
                DIN-Bold,
                sans-serif;
          }
          text{
            color: #FFFFFF;
            background: #ff0000;
            padding: 2rpx 10rpx;
            border-radius: 4rpx;
          }
          .active{background: #999999;}
        }
        .tag4{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
  .pop-box{
    min-height: 500rpx;
    width: 750rpx;
    background-color: #FFFFFF;
    padding: 20rpx;
    position: relative;
    .x-title{
      color: #999999;
      font-size: 24rpx;
      line-height: 60rpx;
    }
    .btn-item{
      display: flex;
      flex-wrap: wrap;
      padding: 0 38rpx;
      view{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10rpx;
        width: 198rpx;
        height: 80rpx;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8rpx;
        margin-top: 20rpx;
        padding: 0 6rpx;
      }
      .active{
        background: #ff0000;
        color: #FFFFFF;
      }
    }
  }
  .icon{
    position: absolute;
    left: 20rpx;
    top: 20rpx;
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
        background:#ff0000;
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
        background:rgba(255, 109, 46, 1);
        color: #FFFFFF;
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
            background-image: linear-gradient(to right,#ff0000, #fc5e1b);
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
            background: #ff0000;
            color: #FFFFFF;
          }
          .bjorange{
            background: rgba(55, 255, 0, 0.1);
          }
        }

      }

    }
  }
  .pop-box3{
    min-height: 500rpx;
    width: 750rpx;
    background-color: #FFFFFF;
    padding: 20rpx;
    position: relative;
    .box{
      width: 100%;
      .x-head{
        background: #f7f7f7;
        padding: 10rpx;
        border-radius: 8rpx;
        height: 198rpx;
        overflow: hidden;
        width: 100%;
        display: flex;
        image{
          height: 178rpx;
          width: 178rpx;
        }
        .x-right{
          margin-left: 20rpx;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .tag1{
            font-size: 32rpx;
          }
          .tag2{
            text{
              margin-top: 15rpx;
              display: block;
              font-size: 26rpx;
              color: #ff0000;
            }
          }
        }
      }
      .x-center{
        background-color: #f7f7f7;
        height: 78rpx;
        padding: 0 20rpx;
        .tag2{
          border-top:1px solid #E4E4E4;
          height: 78rpx;
          width: 100%;
          display: flex;
          align-items: center;
          text{
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 0 10rpx;
            height: 40rpx;
            background-color: #F8E7E1;
            border-radius: 8rpx;
            text-align: center;
            font-size: 20rpx;
            color:#ff0000;
            margin-right: 10rpx;
            box-sizing: border-box;
          }
        }
      }
      .pos-box{
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        margin-top: 10rpx;
      }
      .pfc{
        padding:10rpx 20rpx;
        font-size: 26rpx;
        color: #999;
      }
      .x-select{
        display: flex;
        height: 100rpx;
        align-items: center;
        padding: 0 20rpx;
        .font-wz{
          font-size: 30rpx;
          color: #0F0F0F;
        }
        .x-input{
          flex: 1;
          padding: 10rpx;
          border: 1px solid #f7f7f7;
          border-radius: 8rpx;
        }
      }
      .x-btn{
        view{
          background-color: #ff0000;
          text-align: center;
          color: #FFFFFF;
          height: 80rpx;
          font-size: 36rpx;
          line-height: 80rpx;
          border-radius: 8rpx;
          margin-top: 60rpx;

        }
      }
    }
  }
  // .swiper-box {
  // 	height: calc(100% - 40px);
  // }
  .navbar {
	  width: 100%;
  	display: flex;
  	// height: 40px;
  	padding: 0 5px;
  	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  	// position: relative;
  	z-index: 10;
  	.nav-item {
		overflow-wrap: break-word;
  		flex: 1;
  		display: inline-block;
		padding: 8rpx 30rpx;
		margin-right: 15rpx;
  		justify-content: center;
  		align-items: center;
  		// height: 100%;
		border: 1px solid #333333;
		border-radius: 10rpx;
  		font-size: 15px;
  		color: #000;
		background: #ebebeb;
  		// position: relative;
  		&.current {
  			color: #fff;
			border: 1px solid red;
			background-color: #ff0000;
  		// 	&:after {
  		// 		content: '';
  		// 		position: absolute;
  		// 		left: 50%;
  		// 		bottom: 0;
  		// 		transform: translateX(-50%);
  		// 		width: 44px;
  		// 		height: 0;
  		// 		border: 1px solid #ff0000;
				// background-color: red;
				// color: #fff;
  		// 	}
  		}
  	}
  }
</style>
