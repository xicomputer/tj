<template>
  <view class="container">
    <view class="nav-title">
      <view :style="{height: filterBoxTop+'px'}"> </view>
      <view class="nima u-border-top"  :style="{ height: titleHeight+'px'}" >
        <u-icon @tap="jblack" class="tb" name="arrow-left" size="32" color="#ffffff"></u-icon>
        <u-search @focus="focus" @search="searchFn" focus="true" :style="{height:higd +'px',overflow:hidden}"  class="set-width" :height="higd*2" placeholder="请输入推荐官名称" :clearabled="true" :show-action="false" ></u-search>
      </view>
    </view>
    <view v-show="isShow"  class="box-past" :style="{ marginTop: filterBoxTop+titleHeight+10 +'px'}">
      <view class="past-title">
        <text class="t1">历史纪录</text>
        <text class="t2" @tap="clearl">全部删除</text>
      </view>
      <view class="z-conter">
        <text v-for="(item,index) in history" :key="index">{{item}}</text>
      </view>
    </view>
    <view class="listsy" :style="{ marginTop: filterBoxTop+titleHeight+10 +'px'}">
      <view class="list-item" v-for="(item,index) in commodityList" :key="index">
        <image class="img" :src="item.thumbnail"></image>
        <view class="title u-line-1">{{item.commodityName}}</view>
        <view class="zg">自购价：￥{{ item.showPrice }}</view>
        <view class="kc">库存：{{ item.totalStock }} 浏览：{{item.browseCount}}人</view>
        <view class="down">
          <view>来自{{item.supplier.supplierName}}</view>
          <view @tap="gotoStore">进店 > </view>
        </view>
      </view>
    </view>
    <none-msg :info='tsmsg' :orderno='true' v-if="commodityList.length == 0" ></none-msg>


  </view>
</template>

<script>
export default {
  name: "search_page",
  data(){
    return{
      tsmsg:"亲~ 暂无该商品",
      filterBoxTop:'',
      paddingtop:'',
      jlheight:'',
      titleHeight:'',
      higd:'',
      search:null,
      commodityList:[],
      isShow:true,
      history:[]
    }
  },
  onLoad(){
    this.filterBoxTop = uni.getSystemInfoSync()['statusBarHeight']; //信号高
    this.paddingtop = wx.getMenuButtonBoundingClientRect().top    //胶囊距离顶部高
    let jlheight = wx.getMenuButtonBoundingClientRect().height    //胶囊高
    this.higd = jlheight
    this.jlheight = ( this.paddingtop -this.filterBoxTop) //
    this.titleHeight =  jlheight+ this.jlheight*2

    let history = uni.getStorageSync('shistory')
    // let ishistory= (JSON.stringify(history) == "{}");
    if(history){
      this.history = history
    }else{
      this.isShow =false
    }
  },
  onshow(){

  },
  methods:{
    clearl(){
      uni.removeStorageSync('shistory');
      this.history=[]
    },
    focus(){
      this.isShow =true
    },
    searchFn(value){
      this.isShow =false
      this.search =  uni.$u.trim(value)
      if(!this.search){
        this.$tools.toast("请输入商品名字");
        return false;
      }
      debugger
      let history = uni.getStorageSync('shistory')
      // let ishistory= (JSON.stringify(history) == "{}");


      if(!history){       //没有
        let arr = [value]
        uni.setStorage({
          key: 'shistory',
          data: arr,
        });
        this.history = arr

      }else{              //有
        //搜索历史去重
        let his = history.filter(item => {
          return item !== this.search
        })
        //限制长度为10
        if(his.length>9){
          his.pop();
        }
        //添加新历史
        his.unshift(this.search);
        //存入localStorage
        uni.setStorageSync('shistory',his);
        this.history = his
      }
      //搜索历史去重

      let param = {
        "pageNum": 1,
        "pageSize": 20,
        // "role": "",
        "searchValue": this.search,
        "sysCategoryId": null,
        // "userId": 0
      }
      this.$u.api.promoterList(param).then(e=>{
          if(e){
            this.commodityList = this.commodityList.concat(e.rows);
            console.log( 999, this.commodityList)
          }
      }).catch(err=>{
        console.log(err)
      })
    },
    jblack(){
      uni.navigateBack({
        delta: 2
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  background: #f7f7f7;
  min-height: 100vh;
}
.listsy{
  background: #f7f7f7;
  display: flex;

  flex-wrap: wrap;
  .list-item{
    width: 342rpx;
    background: #FFFFFF;
    padding-bottom: 20rpx;
    margin: 20rpx 0 20rpx 22rpx;
    overflow: hidden;
    border-radius: 8rpx;
    >view{
      padding:3rpx 6rpx;
    }
    .img{
      width: 342rpx;
      height:342rpx;
    }
    .title{
      font-size: 30rpx;
      color: #000000;
    }
    .zg{
      color: #FE3936;
      font-size: 28rpx;
    }
    .kc{
      color: #1577FF;
      font-size: 26rpx;
    }
    .down{
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;
      color: #999999;
    }
  }
}
.nav-title{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: #FF6D2E;
  .nima{
    box-sizing: border-box;
    height: 80rpx;
    width: 100%;
    display: flex;
    padding-left: 20rpx;
    align-items: center;
    .set-width{
    }
    .tb{
      margin: 0 10rpx;
    }
    image{
      margin-bottom: auto;
      height: 60rpx;
      width: 60rpx;
    }
    text{
      padding-left: 10rpx;
      font-size: 30rpx;
      color: #FF6D2E;
    }
  }
}
.box-past{
  width: 100%;
  padding: 0 20rpx;
  .past-title{
    display: flex;
    justify-content: space-between;
    .t1{
      color: #000000;
    }
    .t2{
      color: #999999;
    }
  }
  .z-conter{
    display: flex;
    flex-wrap: wrap;
    text{
      background: #f7f7f7;
      margin:0 20rpx;
      padding: 4rpx 10rpx;
      margin-top: 20rpx;
      border-radius: 20rpx;
    }
  }
}
</style>