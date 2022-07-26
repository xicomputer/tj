<template>
  <view class="page flex-col">
    <view class="main1 flex-col">
      <view class="wrap2 flex-col align-center">
        <view class="mod3 flex-col">
          <view class="mod4 flex-row justify-between">
            <text class="word3">默认费用项</text>
            <text class="info3">¥00.1</text>
          </view>
          <text class="info4">陈哈哈(1873968888)</text>
          <view class="mod10 flex-col"></view>
          <text class="word4">6248&nbsp;6193&nbsp;5834</text>
          <view class="mod6 flex-col"></view>
          <text class="info5">待检票</text>
          <view class="mod7 flex-col"></view>
          <view class="mod8 flex-row justify-between">
            <text class="word5">活动名称名称名称</text>
            <u-icon name="arrow-right" color="#444444" size="26" class="u-m-l-20"></u-icon>
          </view>
          <view class="mod10 flex-col"></view>
          <text class="info6">活动时间：2022-01-16&nbsp;00:00</text>
          <view class="mod10 flex-col"></view>
          <view class="mod11 flex-row justify-between">
            <text class="info7">
              地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：地点地点地点
            </text>
            <u-icon name="arrow-right" color="#444444" size="26" class="u-m-l-20"></u-icon>
          </view>
          <view class="mod10 flex-col"></view>
          <view class="mod13 flex-row">
            <view class="bd2">
              <text class="info8">主办方</text>
              <text class="word6">：名字名字名字</text>
            </view>
            <text class="info9">联系Ta</text>
            <u-icon name="arrow-right" color="#444444" size="26" class="u-m-l-20"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {}
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import '@/pages/tabbar/activity/common.scss';
/**************** 调整样式 start *******************/

/**************** 调整样式 end *********************/
.page {
  position: relative;
  width: 750rpx;
	min-height: 100vh;
  background-color: rgba(247, 247, 247, 1);
  .main1 {
    z-index: 2;
    background-color: rgba(245, 245, 245, 1);
    width: 750rpx;
    position: relative;
    .wrap2 {
      z-index: 48;
      height: 794rpx;
      background: url(/static/activity/e_ticket_bg.png)
        100% no-repeat;
			background-size: contain;
      padding-top: 20rpx;
      width: 702rpx;
			margin: 0 auto;
			margin-top: 20rpx;
      .mod3 {
        width: 662rpx;
        .mod4 {
          width: 220rpx;
          height: 28rpx;
          .word3 {
            width: 140rpx;
            height: 28rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 28rpx;
            text-align: right;
          }
          .info3 {
            width: 70rpx;
            height: 28rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 28rpx;
            text-align: right;
          }
        }
        .info4 {
          width: 264rpx;
          height: 28rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 28rpx;
          white-space: nowrap;
          line-height: 28rpx;
          text-align: left;
          margin-top: 18rpx;
        }
        .word4 {
          width: 261rpx;
          height: 34rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 34rpx;
          font-family: PingFangSC-Medium;
          white-space: nowrap;
          line-height: 34rpx;
          text-align: left;
          margin: 22rpx 0 0 198rpx;
        }
        .mod6 {
          width: 240rpx;
          height: 240rpx;
          border: 1px solid rgba(151, 151, 151, 1);
          background-color: rgba(255, 255, 255, 1);
          margin: 16rpx 0 0 209rpx;
        }
        .info5 {
          width: 72rpx;
          height: 24rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(252, 98, 34, 1);
          font-size: 24rpx;
          white-space: nowrap;
          line-height: 24rpx;
          text-align: left;
          margin: 11rpx 0 0 293rpx;
        }
        .mod7 {
          width: 662rpx;
          height: 1rpx;
          background: #eeeeee;
          margin-top: 47rpx;
        }
        .mod8 {
          width: 662rpx;
          height: 36rpx;
          margin-top: 11rpx;
          .word5 {
            width: 224rpx;
            height: 28rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 28rpx;
            text-align: left;
            margin-top: 8rpx;
          }
        }
        .info6 {
          width: 327rpx;
          height: 28rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 24rpx;
          white-space: nowrap;
          line-height: 28rpx;
          text-align: left;
          margin-top: 23rpx;
        }
        .mod10 {
          width: 661rpx;
          height: 1rpx;
          background: #EEEEEE;
          margin-top: 23rpx;
        }
        .mod11 {
          width: 662rpx;
          height: 30rpx;
          margin-top: 19rpx;
          .info7 {
            width: 264rpx;
            height: 28rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 24rpx;
            white-space: nowrap;
            line-height: 28rpx;
            text-align: left;
            margin-top: 2rpx;
          }
        }
        .mod13 {
          width: 662rpx;
          height: 31rpx;
          margin-top: 19rpx;
          .bd2 {
            width: 262rpx;
            height: 28rpx;
            overflow-wrap: break-word;
            text-align: left;
            white-space: nowrap;
            margin-top: 3rpx;
            font-size: 0;
            .info8 {
              font-size: 24rpx;
              color: rgba(51, 51, 51, 1);
              line-height: 28rpx;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .word6 {
              font-size: 24rpx;
              color: rgba(51, 51, 51, 1);
              line-height: 28rpx;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .info9 {
            width: 70rpx;
            height: 22rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 22rpx;
            white-space: nowrap;
            line-height: 22rpx;
            text-align: left;
            margin: 6rpx 0 0 288rpx;
          }
        }
      }
    }
  }
}
</style>

