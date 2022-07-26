<template>
  <view class="page flex-col">
    <view class="main1 flex-col">
      <view class="block1 flex-col justify-between">
        <view class="mod4 flex-col align-center">
          <view class="main2 flex-col">
            <text class="txt2">请输入验票码验票</text>
            <view class="box1 flex-col">
							<view class="main5 flex-col u-flex u-col-center u-row-center">
								<!-- <text class="txt3">请输入用户出示的数字码</text> -->
								<u-input v-model="code" placeholder="请输入用户出示的数字码" placeholderStyle="text-align:center" :customStyle="{width:'480rpx'}"></u-input>
							</view>
						</view>
            <view class="box2 flex-row justify-between">
              <view class="main3 flex-col" @tap="scan">
                <view class="layer2 flex-row justify-between">
									<u-icon name="scan" size="30" color="#eeeeee"></u-icon>
                  <text class="info2">扫码验票</text>
                </view>
              </view>
              <button
                class="main4 flex-col justify-center align-center"
                @click="onClick_1"
              >
                <text class="word3">确定</text>
              </button>
            </view>
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
      constants: {},
			code: ''
    };
  },
  methods: {
    onClick_1() {
      this.$u.route({
				url: 'pages/activity/my/ticket_detail'
			})
    },
		
		// 扫码检票
		scan() {
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
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
	min-height: 100vh;
  background-color: #2d1d15;
  .main1 {
    background-color: rgba(247, 248, 250, 1);
    width: 750rpx;
    .block1 {
      width: 750rpx;
      .mod4 {
        z-index: 39;
        background-color: rgba(45, 29, 21, 1);
        padding-top: 182rpx;
        width: 750rpx;
        position: relative;
        .main2 {
          width: 546rpx;
          height: 295rpx;
          .txt2 {
            width: 224rpx;
            height: 28rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(255, 255, 255, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 28rpx;
            text-align: right;
            margin-left: 161rpx;
          }
          .box1 {
            width: 538rpx;
            height: 68rpx;
            border-radius: 2px;
            background-color: rgba(255, 255, 255, 1);
            margin: 42rpx 0 0 4rpx;
          }
          .box2 {
            width: 546rpx;
            height: 80rpx;
            margin-top: 77rpx;
            .main3 {
              height: 80rpx;
              border-radius: 40px;
              background-color: rgba(87, 60, 46, 1);
              width: 260rpx;
              padding: 19rpx 0 0 44rpx;
              .layer2 {
                width: 161rpx;
                height: 43rpx;
                .info2 {
                  width: 112rpx;
                  height: 28rpx;
                  display: block;
                  overflow-wrap: break-word;
                  color: rgba(255, 255, 255, 1);
                  font-size: 28rpx;
                  white-space: nowrap;
                  line-height: 28rpx;
                  text-align: right;
                  margin-top: 7rpx;
                }
              }
            }
            .main4 {
              height: 80rpx;
              border-radius: 40px;
              background-color: rgba(253, 111, 45, 1);
              width: 260rpx;
              .word3 {
                width: 56rpx;
                height: 28rpx;
                display: block;
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 28rpx;
                white-space: nowrap;
                line-height: 28rpx;
                text-align: right;
              }
            }
          }
        }
        .main5 {
          height: 80rpx;
          width: 550rpx;
          padding: 0 20rpx;
        }
      }
    }
  }
}

</style>
