<template>
	<view class="cantainer">
    <view class="x-head">
      <view class="x-step ">
        <view class="x-top">
          <text class="active">√</text>
          <text  class="active">1</text>
          <text>2</text>
          <text>3</text>
        </view>
        <view class="x-font">
          <text @tap="oneFn" >发布/自购</text>
          <text @tap="twoFn" >查看商品详情</text>
          <text @tap="threeFn" >设置活动参数</text>
          <text @tap="fourFn" > 分享商品</text>
        </view>
      </view>
    </view>
    <view style="padding:0 20rpx;">店铺介绍</view>
    <view class="x-firm" @tap="lookInfo">
      <image :src="skuMap.supplier.supplierLogo" mode=""></image>
      <view class="firm-item">
        <text class="u-font-32 thick u-line-1">{{skuMap.supplier.supplierName }}</text>
        <text class="u-font-24 c9">商家提供资质认证 </text>
      </view>
      <text class="look-shop">企业认证</text>
    </view>
    <view class="goods-item">
      <text class="font2 u-margin-bottom-20" style="color: #f31c1c;">{{skuMap.commodityName}}</text>

      <view class="u-margin-20 u-font-26" style="border:1px solid #7b95ef; padding: 5rpx 20rpx; border-radius: 6rpx; " v-if="skuMap.describes">商品介绍：{{skuMap.describes}}</view>
<!--      <text class="font1"><text class="u-font-26">￥</text>{{skuMap.showPrice}}</text>-->
      <view class="box-img">
        <view v-for="(item,index) in skuMap.fileList" >
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
    </view>

    <view class="x-select">
      <view @tap="skushow=true">自购返佣</view>
      <view @tap="jumpTwo">推荐赚佣</view>
    </view>

    <!-- sku -->
    <u-popup v-model="skushow" mode="bottom">
      <view class="pop-box">
        <view class="top">
          <image :src="onepra.imageUrl || skuMap.commoditySku[0].imageUrl || skuMap.thumbnail"  mode=""></image>
          <view class="info">
            <text class="u-line-1">{{ onepra.skuName || skuMap.commoditySku[0].skuName}}</text>
            <text  style="color: #EB1918; font-size: 40rpx; ">￥{{ nowprice || skuMap.commoditySku[selSpecId].price  }} </text>
            <text>库存：{{ onepra.stock || skuMap.commoditySku[0].stock }}</text>
          </view>
          <u-icon @tap="skushow=false" class="icon" name="close-circle" size="50"></u-icon>
        </view>
        <view class="guige">规格分类</view>
        <view class="specification-list">
          <view v-for="(item, index) in skuMap.commoditySku" :key="index" @tap.stop="selSpecFun(item, index)" :class="['specification-item ' , { 'sel-item': selSpecId == index }]">
            <text class="u-line-1" >{{ item.skuName }}</text>
          </view>
        </view>
        <view class="jbq">
          <text>购买数量</text>
          <u-number-box v-model="numberValue"  @change="valChange" disabled-input=true :min="1" :max="onepra.stock || skuMap.commoditySku[0].stock "></u-number-box>
        </view>
        <view class="x-btn"  @tap="place_order" >
          {{skuMap.status == 3 ? '已售罄': '确定'}}
        </view>
      </view>
    </u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
        skuMap:{},
        skushow:false,
        selSpecId:0,
        numberValue:1,
        onepra:{},
        nowprice:null,
        jxsid:''
			}
		},
    onLoad(option) {

      this.jxsid = option.commodityId
      console.log("经销商id",option.commodityId)
      this.$u.api.goodsDateilTwo(option.commodityId).then(e => { //商品详情sku
        this.skuMap = e
        console.log(e)
      })

    },
		methods: {
      jumpTwo(){
        uni.navigateTo({
          url: `/pages/goods/goods_two/goods_two?commodityId=${this.jxsid}`
        })

        // uni.navigateTo({
        //   url: `/pages/goods/buy_or_sellgoods/buy_or_sellgoods?commodityId=${this.jxsid}`
        // })
      },
      selSpecFun(item,index){
        this.nowprice = null
        console.log("点击",item)
        this.numberValue = 1;
        this.onepra = item
        this.selSpecId =index
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
        let nowprice =  this.skuMap.commoditySku[this.selSpecId].price* this.numberValue
        nowprice =  this.toDecimal2(nowprice)
        this.nowprice = nowprice
      },
      place_order(){
        if( JSON.stringify(this.onepra) != "{}"){
          if(this.onepra.stock < 1){
            this.$tools.toast("库存为空");
            return false
          };
        }else{
          if(this.skuMap.commoditySku[0].stock<1){
            this.$tools.toast("库存为空");
            return false
          }
        }
        if(this.skuMap.status != 2 )return false;

        // if( onepra.stock = 0)
        // ||detailObj.activity.commodity.commoditySku[0].stock

        var dealerId = this.$store.state.jxsid;
        let orderData= {
          activityPrice : this.skuMap.commoditySku[this.selSpecId].price,
          skuName : this.skuMap.commoditySku[this.selSpecId].skuName ,
          skuId : this.skuMap.commoditySku[this.selSpecId].skuId,
          // activityId : this.skuMap.activityId,
          amount : this.numberValue,
          // promotionId : this.skuMap.promotionId,
          commodityName : this.skuMap.commodityName,
          thumbnail :  this.skuMap.thumbnail,
          supportRefund :this.skuMap.supportRefund,
          dealerId:dealerId || null,
          commodityId:this.skuMap.commodityId
        }

        console.log('参数',orderData)
        this.$store.commit('addOrderData',orderData)

        this.skushow = true
        uni.navigateTo({
          url:`/pages/home_page/place_order/place_order`,
        })
      },
      lookInfo(){
        uni.navigateTo({
          url:"/pages/home_page/shop_info/shop_info?supplierId="+this.skuMap.supplier.supplierId
        })
      },
		}
	}
</script>

<style lang="scss">
.x-head {
  height: 140rpx;
  width: 750rpx;
  background-color: #FFFFFF;
  .x-step {
    height: 138rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .x-top {
      display: flex;
      justify-content: space-between;
      width: 580rpx;
      overflow: hidden;
      text {
        height: 36rpx;
        width: 36rpx;
        background-color: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 22rpx;
        color: #000000;
        border: 1rpx solid #999;
        box-sizing: border-box;
        line-height: 100%;
        position: relative;
      }
      .active {
        background-color: #FF6D2E;
        color: #FFFFFF;
        border: 1rpx solid #FF6D2E;
      }
      text::before {
        position: absolute;
        left: 34rpx;
        content: "";
        height: 1px;
        width: 1000rpx;
        background-color: #E1E1E1;
      }
    }
    .x-font {
      margin-top: 10rpx;
      width: 690rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;

      text {
        font-size: 24rpx;
      }
    }
  }
}
.goods-item{
  margin-top: 20rpx;
  margin-bottom: 80rpx;
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
    color: #FF6D2E;
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
.x-select{

  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  view{
   flex: 1;
    height: 80rpx;

    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #fdc71f, #ff8d1a);
  }
  view:nth-child(2){
    background-image: linear-gradient(to right, #fd5e37, #ec1125);
  }
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
      color: #FF6D2E;
      border-color:#FF6D2E;
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
    background: #FF6D2E;
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
.x-firm{
  display: flex;
  align-items: center;
  width: 100%;
  height: 140rpx;
  padding: 20rpx;
  background: #f6f1f1;
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
</style>
