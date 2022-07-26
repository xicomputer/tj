<template>
  <view class="cantainer">

    <view class="top-head">
      <image class="topimage" :src="statisticsList.supplierLogo"></image>
      <text>{{ statisticsList.supplierName }}</text>
      <view>邀请您成为TA的推荐官</view>
    </view>
    <view class="box-list u-border-bottom u-border-top">
<!--      <view>-->
<!--        <text>{{ statisticsList.statistics.totalUserCount  }}</text>-->
<!--        <text>团员</text>-->
<!--      </view>-->
      <view>
        <text>{{ statisticsList.tjCount }}</text>
        <text>推荐官</text>
      </view>
      <view>
        <text>{{ statisticsList.commodityCount}}</text>
        <text>分销商品</text>
      </view>
    </view>
    <view class="box-img">
      <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/btgjx.png"  mode='widthFix' lazy-load></image>
      <view  class="btn"  v-if="sqState== '0' "><text style="background-color: #ccc;">待审核</text></view>
      <view  class="btn" @tap="jumpIndex"   v-else-if="sqState== '1' "><text style="background-color: #f20c00;"   class="u-font-28">你已成为推荐官，点击进入云仓商城</text> </view>
      <view class="btn"   v-else-if= "sqState== '2' "  @tap="apply">
        <text>重新申请</text>
      </view>
      <view class="btn"    v-else @tap="apply"> <text>申请</text></view>

      <view class="zhdjj"   v-if= "sqState == '2' " >	原因：{{ sqStatebeco.rejectReason }}</view>
    </view>

    <view class="top-head u-margin-top-20">
      <!--			<image src="/static/haowu.png" mode=""></image>-->
      <text class="font1">如何推荐好物</text>
      <text @tap="jumpexplain" class="font2">不会使用，查看推荐教程和案例> </text>
    </view>


    <logoPop></logoPop>
  </view>
  <!--
   0 待审核
  undefind 申请
  2重新申请
  -->
</template>

<script>
export default {
  data() {
    return {
      showLoginPopup:false,
      sqState:'',
      dealerId:"",
      supplierId:'',
      sqStatebeco:'',
      statisticsList:''
    }
  },
  onLoad(option) {

    console.log(option)

    let scene =option.scene || null
    this.dealerId = option.dealerId || null
    this.supplierId = option.supplierId || null
    //扫码进来
    uni.getStorage({
      key:'tokenorid',
      success:res=>{
        if(option.supplierId){
          //链接进来
          this.applyState(option.supplierId)
          this.applystatisticsList(option.supplierId)
        }else{
          this.pjseo(scene)
        }
      },
      fail:err=>{
        this.getToken().then(e=>{
          if(option.supplierId){
            //链接进来
            this.applyState(option.supplierId)
            this.applystatisticsList(option.supplierId)
          }else{
            this.pjseo(scene)
          }
        })

      }
    });
  },
  methods: {
    getToken(indexEvent){
      return	new Promise((resolve,reject)=>{
        let that=this
        uni.login({
          success(res) {
            that.$u.api.logoin(res.code).then(el=>{
              that.$store.commit('SAVETOKEN',el)
              uni.setStorage({
                key:'tokenorid', data:el,
                success:function (){
                  resolve(el)
                }
              })
            }).catch(err=>{
              reject(err)
            })
          }
        })
      })
    },
    apply(){
      console.log(11111)
      let param={
        dealerId:this.dealerId,
        supplierId:this.supplierId
      }
      this.$u.api.merchantApply(param).then(e=>{

        this.applyState(this.supplierId)
      }).catch(err=>{
        console.log(1111,err)
      })
    },

    applyState(id){		//获取申请状态
      this.$u.api.goodsState(id).then(e=>{
        if(e){
          this.sqState = e.status
          this.sqStatebeco = e
        }else{
          this.sqState = e
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    pjseo(send){			//破解二维码
      console.log(send)
      this.$u.api.getAppletCodeScene(send).then(e=>{
        this.dealerId = e.dealerId
        this.supplierId = e.supplierId
        this.applyState(this.supplierId)
        this.applystatisticsList(e.supplierId)
      }).catch(err=>{
        console.log(err)
      })
    },
    jumpIndex(){
		console.log('点击');
      uni.switchTab({
        url:"/pages/tabbar/fine_goods/fine_goods"
      })
    },
    jumpexplain(){
      uni.navigateTo({
        url:"/pages/tabbar/fine_goods/explain"
      })
    },
    applystatisticsList(supplierId){
      this.$u.api.supplierInfo(supplierId).then(e=>{
        this.statisticsList = e
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-list{
  background-color: #fff;
  padding: 20rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-radius: 10rpx;
  margin-bottom: 10rpx;
  view{
    display: flex;
    flex-direction: column;
    align-items: center;
    text{

    }
  }

}
.top-head{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 26rpx;
  .topimage{
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
  }
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
.cantainer{
  background-color: #f7f7f7;
  min-height: 100vh;
  overflow: hidden;
  padding: 20rpx;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.zhdjj{
  background-color: #FFFFFF; color: #FF0000 !important; height: 60rpx;
  line-height: 60rpx; width: 710rpx; text-align: center;
  position: absolute;
  bottom: 200rpx;
  left: 50%;
  z-index: 99;
}
.box{
  min-height: 100vh;
  display: flex;

  align-items: center;
  flex-direction: column;
  .y1{
    font-size: 36rpx;
    font-weight: bold;
    margin-top: 60rpx;
  }
  image{
    height: 80rpx;
    width: 80rpx;
    margin: 10rpx 0;
  }
  .y2{
    font-size: 32rpx;
    font-weight: bold;

  }
  .y3{
    font-size: 32rpx;
    font-weight: bold;
    color: #999999;
    margin-top: 10rpx;
  }
  .y4{
    margin-top: 100rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
  view{
    border: 1px solid #cccccc;
    padding: 10rpx 0;
    width: 200rpx;
    border-radius: 8rpx;
    text-align: center;
    position:fixed;
    bottom: 100rpx;
    left: 50%;
    margin-left: -100rpx;
  }
}
.box-img{
  height: 648rpx;
  position: relative;
  width: 100%;
  border-radius: 20rpx;
  position: relative;
  image{
    width: 100%;
    height: 648rpx;
    border-radius: 20rpx;
  }
  .btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: 84rpx;

    text{
      background: #30D57D;
      padding: 18rpx 70rpx;
      border-radius: 60rpx;
    }
  }
  view{
    min-height: 92rpx;
    border-radius: 46rpx;
    position:absolute;
    left: 0;
    font-size: 34rpx;
    color: #FFFFFF;
    position: absolute;


    display: flex;
    align-items: center;
    justify-content: center;
  }
  .c9{
    background-color: #999999;
  }
}
</style>
