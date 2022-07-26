// <template>
//     <view class="cantainer">
//
//         <view class="x-function" v-if="userInfo.role == 'TJ' ">
//             <!-- <view class="x-title">推荐官/商家推荐官</view> -->
//             <view class="down-head">
//                 <navigator hover-class="none" url="/pages/my/money_box/money_box" >
//                     <image src="/static/my1.png" mode=""></image>
//                     <text>明细</text>
//                 </navigator>
//                 <navigator hover-class="none" url="/pages/my/i_recommend/i_recommend" >
//                     <image src="/static/xz4.png" mode=""></image>
//                     <text> 我发布的商品</text>
//                 </navigator>
//                 <view @tap="mymainShop" >
//                 <image src="/static/xz5.png" mode=""></image>
//                 <text>我的主铺</text>
//             </view>
//             <navigator hover-class="none" url="/pages/my/my_shops/my_shops" >
//                 <image src="/static/xz7.png" mode=""></image>
//                 <text>我的帮推官</text>
//             </navigator>
//             <navigator hover-class="none" url="/pages/my/poster/poster" >
//                 <image src="/static/xz6.png" mode=""></image>
//                 <text>招募帮推官</text>
//             </navigator>
//             <navigator hover-class="none" url="/pages/my/audit_shops/audit_shops" >
//                 <image src="/static/g4.png" mode=""></image>
//                 <text>帮推官审核</text>
//                 <view v-if="redDot" class="dw"></view>
//             </navigator>
//             <navigator hover-class="none" url="/pages/my/nokf/nokf" >
//                 <image src="/static/g2.png" mode=""></image>
//                 <text>发起关联商家</text>
//             </navigator>
//             <navigator hover-class="none" url="/pages/my/nokf/nokf" >
//                 <image src="/static/g2.png" mode=""></image>
//                 <text>发起关联特约官</text>
//             </navigator>
//         </view>
//     </view>
//
//     <view class="x-head" v-if="nameShow.length">
//         <!-- 	<view class="x-step u-border-bottom">
//                 <view class="x-top">
//                     <text class="active">1</text>
//                     <text>2</text>
//                     <text>3</text>
//                 </view>
//                 <view class="x-font">
//                     <text>选择推荐商品</text>
//                     <text>发布推荐商品</text>
//                     <text>分享推荐商品</text>
//                 </view>
//             </view> -->
//         <view class="btn-list" v-if="nameShow.length">
//             <view class="common" :class="titleIndex == index ? 'active' : '' " v-for="(item,index) in nameShow"
//             @tap="selectTitle(index, item.supplierId)" :key="index">{{item.supplierName}}</view>
//     </view>
// </view>
//
// <view class="x-body" v-if="nameShow.length">
//     <view class="x-search">
//         <view class="s-item">
//             <u-search height="72" placeholder="请搜索商品名称" :clearabled="true" :show-action="false"
//             v-model="keyword"></u-search>
//     </view>
//     <!-- 	<view class="x-btn">复制已有团</view> -->
// </view>
// <view class="sst">
//     <view class="x-left">
//         <view :class="twoIndex == index ? 'action' : '' " @tap="classify(index,item.supplierId)"
//         v-for="(item,index) in goodsCategoryList" :key="index">{{item.categoryName}}</view>
// </view>
// <view class="x-right">
//     <view class="list-item" v-for="(item,index) in goodsList" :key="index">
//     <view class="x-one">
//         <image :src="item.thumbnail" mode=""></image>
//     <view class="bwm">
//         <view class="u-line-2 u-font-30 thick">{{item.commodityName}}</view>
//         <text class="c9 u-font-24">库存：{{item.totalStock}}</text>
//         <text class="orange u-font-26">推荐价:￥{{item.showPrice}}</text>
//     </view>
// </view>
// <view class="x-two">
//     <view class="q1">
//         <view>佣金奖励:￥{{item.showCommission}}</view>
//         <view>平台服务费3%</view>
//     </view>
//     <view class="xbtn" :class="item.activityStatus == 1 || item.activityStatus == 2 ? 'c9' :''"
//     @tap="jumpTwo(item)">发布</view>
// </view>
// </view>
// </view>
// </view>
// </view>
// <none-msg v-else :info='tsmsg' :goodsno2='true'></none-msg>
// </view>
// </template>
//
// <script>
//     export default {
//     data() {
//     return {
//     tsmsg: '亲，没有推荐商品哦！',
//     keyword: '',
//     nameShow: [],
//     goodsCategoryList: [],
//     goodsList: [],
//     titleIndex: 0,
//     twoIndex: 0,
//     pageNum: 1,
//     pageSize: 10,
//     total: 0,
//     userInfo:{},
//     redDot:false
// }
// },
//     onLoad() {
//     this.goodsList = [];
//     this.btnLits()
//
//     this.userInfo = uni.getStorageSync('userinfoKey');
//
//     this.dealerListFn()
// },
//     onShow() {
//     this.listItem()
// },
//     onReachBottom() {
//     this.pageNum++
//     this.pacKGoodsList(this.twoIndex, this.pageNum)
// },
//     methods: {
//     dealerListFn(){
//     let param={
//     "isAsc": "",
//     "orderBy": "",
//     "orderByColumn": "",
//     "pageNum": 0,
//     "pageSize": 0,
//     "searchValue": "",
//
// }
//     this.$u.api.dealerList(param).then(e => { //经销商
//     console.log(e)
// })
//
// },
//     mymainShop(){
//     uni.navigateTo({
//     url:"/pages/home_page/my_shop/my_shop?mainUserId="+this.userInfo.userId
// })
// },
//     jumpTwo(item) {
//     if (item.activityStatus == 1 || item.activityStatus == 2) {
//     this.$tools.toast("您已发布过该商品");
//     return false;
// }
//
//     uni.navigateTo({
//     url: `/pages/goods/goods_two/goods_two?commodityId=${item.commodityId}`
// })
// },
//     btnLits() {
//     let goodsname = {
//     "isAsc": "",
//     "orderBy": "",
//     "orderByColumn": "",
//     "pageNum": "",
//     "pageSize": "",
//     "params": {},
//     "searchValue": "",
// }
//     this.$u.api.supplier(goodsname).then(e => { //名称
//     if (!e) {
//     this.nameShow = [];
//     return false;
// }
//     this.nameShow = e.rows
//
//     this.selectTitle(0, this.nameShow[0].supplierId)
//     console.log(999, this.nameShow);
// })
// },
//     selectTitle(nowindex, supplierId) {
//     console.log(nowindex)
//     this.pageNum = 1
//     this.goodsList = []
//
//     this.titleIndex = nowindex
//     let goodsCategoryList = {
//     "isAsc": "",
//     "orderBy": "",
//     "orderByColumn": "",
//     "pageNum": '',
//     "pageSize": '',
//     "searchValue": "",
//     supplierId
// }
//     this.$u.api.goodsCategoryList(goodsCategoryList).then(e => { //分类
//     if(e){
//     this.goodsCategoryList = e.rows
//     this.pacKGoodsList(this.twoIndex)
//
// }else{
//     this.goodsCategoryList = []
//
// }
//
//     // let threep={
//     // 	supplierId:	this.goodsCategoryList[0].supplierId,
//     // 	categoryId:	this.goodsCategoryList[0].categoryId
//     // }
//
//
//
// })
// },
//     classify(index, supplierId) {
//     console.log(index)
//     this.twoIndex = index;
//     this.pageNum = 1
//     this.goodsList = []
//     this.pacKGoodsList(index)
// },
//     pacKGoodsList(index) {
//     let goodsList = {
//     "isAsc": "",
//     "orderBy": "",
//     "orderByColumn": "",
//     "pageNum": this.pageNum,
//     "pageSize": this.pageSize,
//     "searchValue": "",
//     supplierId: this.goodsCategoryList[index].supplierId,
//     categoryId: this.goodsCategoryList[index].categoryId
// }
//     this.$u.api.goodsList(goodsList).then(e => { //商品
//     if (e) {
//     this.goodsList = this.goodsList.concat(e.rows); //将数据拼接在一起
// } else {
//     console.log(e)
// }
// }).catch(err => {
//     console.log(err)
// })
// },
//     listItem(){
//     let param={
//     "status": 0
// }
//     this.$u.api.helpApplyList(param).then(e=>{
//     if(e){
//     this.redDot = true
// }else{
//     this.redDot = false
// }
//
// })
// },
// }
// }
// </script>
//
// <style lang="scss">
//     .cantainer {
//     background-color: #f7f7f7;
//     min-height: 100vh;
// }
//     .orange {
//     color: #FF6D2E;
// }
//     .x-head {
//     // height: 240rpx;
//     width: 750rpx;
//     background-color: #FFFFFF;
//
//     .x-step {
//     height: 138rpx;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//
//     .x-top {
//     display: flex;
//     justify-content: space-between;
//     width: 494rpx;
//     overflow: hidden;
//
//     text {
//     height: 36rpx;
//     width: 36rpx;
//     background-color: #f7f7f7;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 50%;
//     font-size: 22rpx;
//     color: #000000;
//     border: 1rpx solid #999;
//     box-sizing: border-box;
//     line-height: 100%;
//     position: relative;
// }
//
//     .active {
//     background-color: #FF6D2E;
//     color: #FFFFFF;
//     border: 1rpx solid #FF6D2E;
// }
//
//     text::before {
//     position: absolute;
//     left: 34rpx;
//     content: "";
//     height: 1px;
//     width: 1000rpx;
//     background-color: #E1E1E1;
// }
// }
//
//     .x-font {
//     margin-top: 10rpx;
//     width: 690rpx;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//
//     text {
//     font-size: 24rpx;
// }
// }
// }
//
//     .btn-list {
//     display: flex;
//     align-items: center;
//     height: 100rpx;
//     padding: 0 20rpx;
//     flex-wrap: wrap;
//
//     text {
//     padding: 2rpx 25rpx;
// }
//
//     .common {
//     margin-right: 20rpx;
// }
//
//     .active {
//     padding: 2rpx 25rpx;
//     background: #FF6D2E;
//     border-radius: 50rpx;
//     color: #FFFFFF;
//     line-height: 52rpx;
//     text-align: center;
//     font-size: 28rpx;
// }
// }
// }
//
//     .x-body {
//     .x-search {
//     background-color: #FFFFFF;
//     height: 112rpx;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 20rpx;
//
//     .s-item {
//     width: 100%;
// }
//
//     .x-btn {
//     padding: 6rpx 15rpx;
//     border: 1px solid #FF6D2E;
//     border-radius: 10rpx;
//     color: #FF6D2E;
//     font-size: 26rpx;
//     text-align: center;
//     margin-left: auto;
// }
// }
//
//     .sst {
//     display: flex;
//     min-height: 1000rpx;
//
//     .x-left {
//     width: 180rpx;
//     background-color: #F7F7F7;
//
//     view {
//     height: 100rpx;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-left: 8rpx solid #F7F7F7;
// }
//
//     .action {
//     background-color: #FFFFFF;
//     border-left: 8rpx solid #FF6D2E;
// }
// }
//
//     .x-right {
//     width: 570rpx;
//     box-sizing: border-box;
//     padding: 20rpx;
//     background-color: #FFFFFF;
//
//     .list-item {
//     margin-bottom: 20rpx;
//
//     .x-one {
//     height: 180rpx;
//     display: flex;
//
//     image {
//     height: 180rpx;
//     width: 180rpx;
//     border-radius: 8rpx;
// }
//
//     .bwm {
//     width: 330rpx;
//     margin-left: 20rpx;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
// }
// }
//
//     .x-two {
//     height: 90rpx;
//     display: flex;
//     justify-content: space-between;
//
//     .q1 {
//     view {
//     margin-top: 8rpx;
//     font-size: 26rpx;
//     color: #FF6D2E;
//     font-family: PingFang SC, sans-serif;
// }
// }
//
//     .xbtn {
//     align-self: flex-end;
//     width: 116rpx;
//     height: 52rpx;
//     background: #FF6D2E;
//     border-radius: 6rpx;
//     color: #FFFFFF;
//     font-size: 26rpx;
//     line-height: 52rpx;
//     text-align: center;
// }
//
//     .c9 {
//     background-color: #ccc;
//
// }
//
// }
//
// }
// }
// }
// }
//
//     .x-function{
//     width: 710rpx;
//     margin: 0 auto;
//
//     overflow: hidden;
//     .x-title{
//     font-size: 32rpx;
//     color: #333333;
//     padding: 20rpx;
// }
//     .down-head{
//     background-color: #FFFFFF;
//     margin: 6rpx 0 20rpx 0;
//     border-radius: 8rpx;
//     display: flex;
//     flex-wrap: wrap;
//     navigator, view{
//     width: 25%;
//     height: 100rpx;
//     margin: 20rpx 0;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     position: relative;
//     image{
//     height:48rpx ;
//     width: 48rpx;
// }
//     text{
//     font-size: 24rpx;
//     margin-top: 4rpx;
// }
//     .dw{
//     width: 10rpx;
//     height: 10rpx;
//     border-radius: 50%;
//     background-color: red;
//     position: absolute;
//     top: 0;
//     right: 50rpx;
//     margin: 0;
// }
// }
// }
// }
// </style>
