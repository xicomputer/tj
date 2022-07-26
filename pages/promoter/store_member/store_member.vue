<template>
	<view class="cantainer">
      <view class="mqpx_sort">
        <view class="ps1">排序</view>
        <view class="ps2" @tap="popishow = !popishow">全部</view>
        <view class="sort-box" v-show="popishow">
          <view>生产收益</view>
          <view>消费金额</view>
          <view>支付订单数</view>
        </view>
      </view>

      <view class="box">
        <view class="box-item" v-for="(item,index) in 5" :key="index">
          <image src="/static/logo.png"></image>
          <view>
            <text>用户名</text>
            <text>产生效益 100</text>
            <text>消费金额 :xxxxxxxxxxx</text>
          </view>
        </view>
      </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        popishow:false,

			}
		},
		methods: {
      // isshow(){
      //   this.popishow = true
      // }
		}
	}
</script>

<style lang="scss">
  .cantainer{
    background: #f7f7f7;
    min-height: 100vh;
    width: 100vw;
  }
  .box{
    padding: 20rpx;
    .box-item{
      background: #FFFFFF;
      display: flex;
      margin: 10rpx 0;
      border-radius: 6rpx;
      image{
        height: 120rpx;
        width: 120rpx;
        border-radius: 6rpx;
      }
      >view{
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;

      }
    }
  }
  .mqpx_sort{
    height: 80rpx;
    padding:0 20rpx;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    background: #FFFFFF;
    border-top: 10rpx solid #f7f7f7;
    padding-bottom: 10rpx;
    .ps1{
      height: 45rpx;
      line-height: 45rpx;
    }
    .ps2{
      border:1px solid #FF6D2E;
      border-radius: 6rpx;
      margin: 0 20rpx;
     text-align: center;
      width: 200rpx;
      height: 45rpx;
      line-height: 45rpx;
    }
    .sort-box{
      position: absolute;
      top: 65rpx;
      right: 40rpx;
      width: 200rpx;
      border:1px solid #fff1f1;
      text-align: center;
      background: #FFFFFF;
      >view{
        line-height: 60rpx;
      }

    }
  }
</style>
