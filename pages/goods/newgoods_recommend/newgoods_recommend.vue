<template>
  <view class="cantainer">

    <uni-nav-bar :fixed="true" color="#ffffff" background-color="#FF6D2E" :status-bar="true">
      <view slot="left">
        <view class="xp-box">
          <text  @tap="homeorblack">返回首页</text>
          <u-search @search="searchFn" class="set-width" height="58" placeholder="请输入商品名称" :clearabled="true" :show-action="false" v-model="searchValue"></u-search>
        </view>
      </view>
    </uni-nav-bar>
    <view class="tabs" >
<!--      <view class="u-font-32">全部</view>-->
      <view style="width: 680rpx" >
        <u-tabs  class="aaa" :list="classList" active-color="#333333" :is-scroll="true" :current="current"
                :bold="false" gutter="20" inactive-color="#999999" font-size="32"    @change="change">
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
            <u-icon  class="u-icon" v-if="sanjiao === index"  name="arrow-up-fill" color="#FF6D2E"  size="14"> </u-icon>
            <u-icon  class="u-icon"  v-if="!(sanjiao === index)"  name="arrow-down-fill" color="#FF6D2E" size="14"></u-icon>
          </view>

          <view class="sanjiao" v-else>
            <u-icon  class="u-icon"  name="arrow-up-fill" color="#333333"  size="14"> </u-icon>
            <u-icon  class="u-icon"  name="arrow-down-fill" color="#333333" size="14"></u-icon>
          </view>
        </view>
      </view>
<!--      <image @tap="screenShop" src="/static/iconse.png"></image>-->
      <text @tap="screenShop" style="margin-right: 20rpx; color: #FF6D2E;">筛选</text>
    </view>
    <view class="box-list">
      <view class="goods-info" v-for="(item,index) in commodityList" :key="index">
        <image :src="item.thumbnail" mode=""></image>
        <view class="goods-content">
          <text class="tag1 u-line-1">{{item.commodityName}}</text>
          <text class="tagadd u-line-1">{{ item.supplier.supplierName }}&nbsp;&nbsp;</text>
          <view class="u-font-24"> 库存:{{ item.totalStock }}</view>
          <view class="tag2">
            <text>价格：￥{{item.showPrice}}</text>
            <text>总销量:{{item.volume}}</text>

											
            <!-- 	<text>到店消费</text>
              <text>同城配送</text> -->
          </view>
          <view class="tag3">
            <view>赚￥{{ item.showCommission }}</view>
          </view>
          <view class="tag3" style="margin-left: auto;">
            <text :class="item.activityStatus == 1 || item.activityStatus == 2 ? 'active' :''"  @tap="gotoGoods(item)">自购返佣/推荐赚佣</text>
          </view>
        </view>
      </view>
    </view>
    <none-msg :info='tsmsg' :setheight="'50px'"  :goodsno='true' v-if="!commodityList.length" ></none-msg>
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
    <u-popup v-model="skushow2" mode="right">
      <view class="pop-box2">
        <view style="display: flex; justify-content: space-between;width: 100%;">
          <u-icon style="padding:0 15rpx"  @tap="skushow2=false"  name="close" size="24"></u-icon>
          <text style="margin-right: auto">您的云仓货源链路</text>
          <text style="color: #FF6D2E" @tap="resetBtn" >重置</text>
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
    </u-popup>
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
          <view @tap="lookInfo" style="color: #FF6D2E; font-size: 32rpx; margin-left: 20rpx;">商品来源：{{nowgotoData.supplier.supplierName}}</view>

          <view class="pos-box"  >
            店铺评分：<uni-rate  :readonly="true"  :value="nowgotoData.supplier.avgScore || 5 " />
            <u-button style="margin-left: auto;" @click="clickScore" size="min i">{{haspj? '已评价' : '我要评分'}} </u-button>
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



  </view>
</template>

<script>
// import a from '../../../components/uni-rate/uni-rate'
// import UPopup from "@/uview-ui/components/u-popup/u-popup";
// import UButton from "@/uview-ui/components/u-button/u-button";
export default {
  // components: {UButton, UPopup},
  data() {
    return {
      haspj:false,
      score:0,
      goodspor:[
        {name:'特约推荐官链路'},
        {name:'商家链路'}
      ],
      popFont:false,
      count: 5,
      start: 2.9,
      newNowIndex:{
        index0:0,
        index1:0,
        index2:0,
      },
      seleInpt:true,
      laborer:false,
      nameList:[{nickName:'全部'}],
      addInputIndex:0,
      selectDefault:[],
      skushow1:false,
      skushow2:false,
      skushow3:false,
      selectShow:false,
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
      selectRole:'DEALER',
      judgeThreeIndex:'',
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
    }
  },

  onLoad() {
    this.categoryFn()
    var page = getCurrentPages()
    if(page.length<=1){
      console.log('外部')
      this.ishome = false
    }else{
      console.log("正常")
      this.ishome = true
    }
  },
  onShow() {

  },
  onReachBottom(){
    this.pageNumber++
    this.goodsListFn(this.currentObj)
  },
  methods:{
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
        console.log('BALCK',e)
        this.popFont=false
        this.$tools.toast("感谢您的评价")
      }).catch(err=>{
        console.log(err)

      })
    },
    lookInfo(){
      uni.navigateTo({
        url:"/pages/home_page/shop_info/shop_info?supplierId="+this.nowSupplierId
      })
    },
    screenShop(){
      if( uni.getStorageSync('nowindex')){
        this.newNowIndex =uni.getStorageSync('nowindex')
      }
      this.skushow2=true
      this.Quadratic()
      this.nameList=[{nickName:'全部'}]
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
            this.classList = this.classList.concat(dispose); //将数据拼接在一起
          }
        }).catch(err=>{
          console.log(err)
        })

    },
    change(index){    //导航点击事件
      this.current = index;
      this.commodityList= [];
      this.pageNumber=1;
      this.currentObj=this.classList[index]  //保存当前类2
      console.log("qiant",this.classList[index]);
      this.goodsListFn(this.classList[index])
    },
    changeTwo(index,item){
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
      // console.log("商品列表",item)

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

      this.$u.api.goodsList(param).then(e=>{
        if(e){
          // this.commodityList = [];
          this.commodityList = this.commodityList.concat(e.rows);
          console.log( 222, this.commodityList)
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
    },
    Quadratic(){     //经销商列表1
      console.log("选择链路")
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

            // let a = this.nameList[this.newNowIndex.index1].dealerId
            // console.log(a)
            this.shopNmae(this.nameList[this.newNowIndex.index1])
          }
        })
      }


    },
    shopNmae(dealerId,index){    //商家类目
      this.shopNmaeList =[{supplierName:'全部','dealerId':dealerId.dealerId}]
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
      this.$u.api.supplier(param).then(e => {
        console.log(3333,e)
        if (e) {
          this.shopNmaeList = this.shopNmaeList.concat( e.rows); //将数据拼接在一起
          let wz = {'dealerId':dealerId.dealerId,'nickName':dealerId.nickName}
          this.pop_currentObj=  Object.assign(wz,this.shopNmaeList[this.newNowIndex.index2])
          // this.pop_currentObj= this.shopNmaeList[this.newNowIndex.index2]  //保存当前类3
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
    },
    seEnter(){

      this.initFn()
      this.skushow2 = false
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
      this.skushow2 = false
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
        url: `/pages/goods/buy_or_sellgoods/buy_or_sellgoods?commodityId=${this.nowgotoData.commodityId}`

      })
    },
    searchFn(){     //搜索
      this.commodityList=[];
      this.pageNumber = 1;
      let value = this.searchValue
      value =  this.$u.trim(value)
      if(!value){
        this.$tools.toast("请输入商品名字")
        return false
      }
      let obj={
        searchValueName: value
      }
      this.currentObj = Object.assign(obj,this.currentObj)
      console.log(this.currentObj)
      this.goodsListFn(obj)
    },

  },
}
</script>

<style lang="scss">
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
  background-color: #FF6D2E;
  width: 750rpx;
  display: flex;
  align-items: center;
  height: 58rpx;
  margin-bottom: 10rpx;
  .swing{
    padding-right: 15rpx;
    padding-left: 20rpx;
  }
  .set-width{
    margin-left: 20rpx;
    width: 366rpx;
  }

}
.tabs {
  height: 104rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 86rpx;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding-bottom: 100rpx;
  .goods-info{
    display: flex;
    height: 300rpx;
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
        color:#FF6D2E;
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
          background: #FF6D2E;
          padding: 2rpx 10rpx;
          border-radius: 4rpx;
        }
        .active{background: #999999;}
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
      background: #FF6D2E;
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
  width: 700rpx;
  height: 100vh;
  background-color: #FFFFFF;
  padding: 20rpx;
  position: relative;
  padding-top: 140rpx;
  .x-down{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80rpx;
    display: flex;
    width: 100%;
    z-index: 100;
    view{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFFFFF;
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
      background:rgba(255, 109, 46, 1);
      color: #FFFFFF;
    }


  }
  .box{
    width: 100%;
    .x-title{
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
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
          width: 43%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80rpx;
          border-radius: 8rpx;
          margin: 20rpx;
          color: #333;
          background: rgba(0, 0, 0, 0.05);
          padding:0 6px;

        }
        .active{
          background: #FF6D2E;
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
            color: #FF6D2E;
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
          color:#FF6D2E;
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
        background-color: #FF6D2E;
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
</style>
