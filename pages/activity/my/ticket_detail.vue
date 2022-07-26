<template>
  <view class="page flex-col">
    <view class="section1 flex-col">
      <view class="outer1 flex-col">
				<view class="u-text-center u-p-20" v-if="is_pass">
					<u-icon name="checkmark-circle" color="#FD6F2D" size="72" label="验票通过" label-color="#FD6F2D" label-size="32"></u-icon>
				</view>
        <view class="mod4 flex-col">
          <view class="wrap1 flex-col">
            <view class="bd1 flex-row justify-between">
              <text class="info2">姓名：</text>
              <text class="word1">啊啊啊</text>
            </view>
            <view class="bd2 flex-row justify-between">
              <text class="word2">电话：</text>
              <text class="word3">12312312389</text>
            </view>
            <view class="bd3 flex-row justify-between">
              <text class="txt4">票种名称：</text>
              <text class="txt5">免费票</text>
            </view>
            <view class="bd4 flex-row justify-between">
              <text class="word4">票种金额：</text>
              <text class="word5">¥0</text>
            </view>
            <view class="bd5 flex-col"></view>
            <text class="txt6">标题名称</text>
            <view class="bd6 flex-row justify-between">
              <view class="section4 flex-col justify-center align-center">
                <u-icon name="clock-fill" color="#333333" size="30"></u-icon>
              </view>
              <text class="info3">01-12&nbsp;00:00至01-15&nbsp;00:00</text>
            </view>
         <!--   <view class="bd7 flex-row justify-between">
              <view class="section5 flex-col"></view>
              <text class="word6">线上活动</text>
            </view> -->
						<view class="bd8 flex-row justify-between">
						  <view class="group2 flex-col justify-center align-center">
						    <u-icon name="map-fill" color="#333333" size="30"></u-icon>
						  </view>
						  <text class="txt7">线上活动</text>
						</view>
            <view class="bd8 flex-row justify-between">
              <view class="group2 flex-col justify-center align-center">
                <u-icon name="chat-fill" color="#333333" size="30"></u-icon>
              </view>
              <text class="txt7">沙龙/会议</text>
            </view>
          </view>
        </view>
        <view v-if="!is_pass" class="mod5 flex-col justify-center align-center" @tap="passCheck">
          <text class="word7">验票通过</text>
        </view>
        <button v-if="!is_pass"
          class="mod6 flex-col justify-center align-center"
          @click="$u.route({type: 'back'})"
        >
          <text class="word8">取消</text>
        </button>
      </view>
    </view>
		<u-toast ref="uToast" />
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			is_pass: false,	// 验票通过
    };
  },
  methods: {
    onClick_1() {
      alert(1);
    },
		passCheck() {
			this.is_pass = true;
			this.$refs.uToast.show({
				title: '验票通过'
			})
		}
  }
};
</script>
<style lang="scss" scoped>
@import '@/pages/tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
/**************** 调整样式 end *********************/
.page {
  position: relative;
  width: 750rpx;
  height: 1643rpx;
  background-color: rgba(247, 247, 247, 1);
  overflow: hidden;
  .section1 {
    height: 1643rpx;
    background-color: rgba(247, 248, 250, 1);
    width: 750rpx;
    .outer1 {
      width: 750rpx;
      height: 1009rpx;
      .mod4 {
        height: 631rpx;
        background: url(/static/activity/ticket_bg.png) -10rpx -9rpx
          no-repeat;
				background-size: contain;
        width: 701rpx;
        position: relative;
        margin: 23rpx 0 0 36rpx;
        padding: 41rpx 0 0 19rpx;
        .wrap1 {
          width: 672rpx;
          height: 556rpx;
          .bd1 {
            width: 262rpx;
            height: 24rpx;
            margin-left: 31rpx;
            .info2 {
              width: 72rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
            .word1 {
              width: 72rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd2 {
            width: 335rpx;
            height: 24rpx;
            margin: 46rpx 0 0 31rpx;
            .word2 {
              width: 72rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
            .word3 {
              width: 145rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd3 {
            width: 262rpx;
            height: 24rpx;
            margin: 46rpx 0 0 31rpx;
            .txt4 {
              width: 120rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
            .txt5 {
              width: 72rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd4 {
            width: 219rpx;
            height: 24rpx;
            margin: 43rpx 0 0 31rpx;
            .word4 {
              width: 120rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
            .word5 {
              width: 29rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd5 {
            width: 672rpx;
            height: 1rpx;
            background: #eeeeee;
            margin-top: 36rpx;
          }
          .txt6 {
            width: 96rpx;
            height: 24rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 24rpx;
            white-space: nowrap;
            line-height: 24rpx;
            text-align: left;
            margin: 51rpx 0 0 31rpx;
          }
          .bd6 {
            width: 334rpx;
            height: 24rpx;
            margin: 47rpx 0 0 31rpx;
            .section4 {
              height: 24rpx;
              background-color: rgba(0, 0, 0, 0);
              width: 24rpx;
              .icon2 {
                width: 20rpx;
                height: 20rpx;
              }
            }
            .info3 {
              width: 293rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd7 {
            width: 137rpx;
            height: 24rpx;
            margin: 47rpx 0 0 31rpx;
            .section5 {
              width: 24rpx;
              height: 24rpx;
              background-color: rgba(0, 0, 0, 0);
            }
            .word6 {
              width: 96rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
          .bd8 {
            width: 149rpx;
            height: 24rpx;
            margin: 47rpx 0 0 31rpx;
            .group2 {
              height: 24rpx;
              background-color: rgba(0, 0, 0, 0);
              width: 24rpx;
              .label1 {
                width: 20rpx;
                height: 20rpx;
              }
            }
            .txt7 {
              width: 108rpx;
              height: 24rpx;
              display: block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 24rpx;
              text-align: left;
            }
          }
        }
      }
      .mod5 {
        height: 78rpx;
        border-radius: 4px;
        background-color: rgba(253, 111, 45, 1);
        width: 702rpx;
        margin: 41rpx 0 0 24rpx;
        .word7 {
          width: 120rpx;
          height: 42rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 30rpx;
          white-space: nowrap;
          line-height: 42rpx;
          text-align: right;
        }
      }
      .mod6 {
        height: 78rpx;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        width: 702rpx;
        margin: 30rpx 0 0 24rpx;
        .word8 {
          width: 60rpx;
          height: 42rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 30rpx;
          white-space: nowrap;
          line-height: 42rpx;
          text-align: right;
        }
      }
    }
  }
}

</style>
