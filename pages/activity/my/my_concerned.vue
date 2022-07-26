<template>
  <view class="page flex-col">
    <view class="section1 flex-col">
      <view class="bd1 flex-col">
        <text class="word2">我关注了2个主办方</text>
        <view class="block2 flex-col">
          <view
            class="mod4 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
						@tap="$u.route({url: 'pages/activity/sponsor_home_page'})"
          >
            <view class="outer1 flex-col">
              <view class="main1 flex-row justify-between">
                <view class="group1 flex-col"></view>
                <view class="group2 flex-col justify-between">
                  <text class="word3">{{item.lanhutext0}}</text>
                  <text class="word4">{{item.lanhutext1}}</text>
                </view>
              </view>
              <view class="main2 flex-col"></view>
              <view class="main3 flex-row">
                <view class="group3 flex-col u-row-center">
                  <!-- <view class="mod5 flex-col"></view> -->
									<u-icon name="calendar" size="30" color="#999999" class="u-flex u-row-center"></u-icon>
                  <text class="word5">{{item.lanhutext2}}</text>
                </view>
                <view class="group4 flex-col"></view>
                <view class="group5 flex-col u-row-center u-rol-center u-text-center">
                  <!-- <image
                    class="label2"
                    referrerpolicy="no-referrer"
                    :src="item.lanhuimage0"
                  /> -->
									<u-icon name="account" size="30" color="#999999" class="u-flex u-row-center"></u-icon>
                  <text class="txt2">{{item.lanhutext3}}</text>
                </view>
              </view>
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
      loopData0: [
        {
          lanhutext0: '全球人资研究院',
          lanhutext1: '企业管理者、HR、财务人员学习交流平台。',
          lanhutext2: '29场活动',
          lanhuimage0:
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng0fce7067574dd4d0466ffae75aab7fcc172a9000d6938a06ffb067f2166835cc',
          lanhutext3: '297人报名'
        },
        {
          lanhutext0: '全球人资研究院',
          lanhutext1: '企业管理者、HR、财务人员学习交流平台。',
          lanhutext2: '34场活动',
          lanhuimage0:
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng0fce7067574dd4d0466ffae75aab7fcc172a9000d6938a06ffb067f2166835cc',
          lanhutext3: '168人报名'
        }
      ],
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
  .section1 {
    background-color: rgba(247, 248, 250, 1);
    width: 750rpx;
    .bd1 {
      width: 750rpx;
      height: 684rpx;
      .word2 {
        width: 224rpx;
        height: 26rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 26rpx;
        white-space: nowrap;
        line-height: 26rpx;
        text-align: left;
        margin: 40rpx 0 0 24rpx;
      }
      .block2 {
        width: 702rpx;
        height: 470rpx;
        justify-content: space-between;
        margin: 20rpx 0 0 24rpx;
        .mod4 {
          height: 225rpx;
          background-color: rgba(255, 255, 255, 1);
          margin-bottom: 20rpx;
          width: 702rpx;
          padding: 18rpx 0 18rpx 18rpx;
          .outer1 {
            width: 663rpx;
            height: 193rpx;
            .main1 {
              width: 507rpx;
              height: 87rpx;
              margin-left: 1rpx;
              .group1 {
                width: 70rpx;
                height: 70rpx;
                background-color: rgba(216, 216, 216, 1);
                border-radius: 50%;
              }
              .group2 {
                width: 427rpx;
                height: 75rpx;
                margin-top: 12rpx;
                .word3 {
                  width: 182rpx;
                  height: 26rpx;
                  display: block;
                  overflow-wrap: break-word;
                  color: rgba(88, 107, 148, 1);
                  font-size: 26rpx;
                  font-family: PingFangSC-Medium;
                  white-space: nowrap;
                  line-height: 26rpx;
                  text-align: left;
                }
                .word4 {
                  width: 427rpx;
                  height: 26rpx;
                  display: block;
                  overflow-wrap: break-word;
                  color: rgba(153, 153, 153, 1);
                  font-size: 22rpx;
                  white-space: nowrap;
                  line-height: 26rpx;
                  text-align: left;
                  margin-top: 23rpx;
                }
              }
            }
            .main2 {
              width: 663rpx;
              height: 1rpx;
              background: #EEEEEE;
              margin-top: 19rpx;
            }
            .main3 {
              width: 454rpx;
              height: 66rpx;
              margin: 20rpx 0 0 109rpx;
              .group3 {
                width: 93rpx;
                height: 64rpx;
                .mod5 {
                  width: 28rpx;
                  height: 28rpx;
                  background: #EEEEEE;
                  margin-left: 34rpx;
                }
                .word5 {
                  width: 93rpx;
                  height: 22rpx;
                  display: block;
                  overflow-wrap: break-word;
                  color: rgba(35, 48, 64, 1);
                  font-size: 22rpx;
                  white-space: nowrap;
                  line-height: 22rpx;
                  text-align: left;
                  margin-top: 14rpx;
                }
              }
              .group4 {
                width: 1rpx;
                height: 66rpx;
                background: #EEEEEE;
                margin-left: 131rpx;
              }
              .group5 {
                width: 105rpx;
                height: 64rpx;
                margin-left: 124rpx;
                .label2 {
                  width: 28rpx;
                  height: 28rpx;
                  margin-left: 38rpx;
                }
                .txt2 {
                  width: 105rpx;
                  height: 22rpx;
                  display: block;
                  overflow-wrap: break-word;
                  color: rgba(35, 48, 64, 1);
                  font-size: 22rpx;
                  white-space: nowrap;
                  line-height: 22rpx;
                  text-align: left;
                  margin-top: 14rpx;
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
