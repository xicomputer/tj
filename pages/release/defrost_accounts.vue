<template>
  <view class="page flex-col">
    <view class="layer1 flex-col">
			<view class="info-text u-p-l-24 u-p-t-20">
				待解冻：积累7笔，总额+0.02
			</view>
      <view class="outer1 flex-col justify-between">
        <view class="outer3 flex-col justify-between show-data-end">
          <view class="section4 flex-col" v-for="item in 20" @tap="$u.route({url: 'pages/activity/publish/apply_detail', params:{type: 'info'}})">
						<view class="mod2 flex-row">
							<view class="layer2 flex-col"></view>
							<view class="layer3 flex-col justify-between">
								<text class="info3">卢莉</text>
								<text class="word5">14222018556</text>
							</view>
							<view class="layer4 flex-col justify-between">
								<text class="word6">免费票</text>
								<text class="word7">¥0.00</text>
							</view>
							<text class="txt2">待解冻</text>
						</view>
					</view>
				</view>
      </view>
    </view>
		<!-- 推广方式 底部弹窗 -->
		<u-popup mode="bottom" v-model="push_type_show" :custom-style="{margin:'0rpx 24rpx 40rpx',borderRadius: '6rpx'}">
			<view class="content">
				<view class="main1 flex-col">
					<view class="block2 flex-col">
						<text class="word1">选择以下方式推广活动</text>
						<view class="box2 flex-col"></view>
						<view class="u-flex u-row-around u-p-t-40">
							<view>
								<u-icon name="/static/activity/weixin.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view>微信好友</view>
							</view>
							<view>
								<u-icon name="/static/activity/share_link.png" class="u-flex u-row-center" width="77" height="77"></u-icon>
								<view>复制链接</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
			keyword: '',	// 搜索关键字
      constants: {},
			cur_status: '',
			push_type_show: false ,// 推广方式
			status_options_show: false,// 活动状态选择器显示
    };
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.main1 {
	height: 308rpx;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 1);
	width: 702rpx;
	padding: 30rpx 0 0 32rpx;
	.block2 {
		width: 639rpx;
		height: 220rpx;
		.word1 {
			width: 280rpx;
			height: 28rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			white-space: nowrap;
			line-height: 28rpx;
			text-align: right;
			margin-left: 179rpx;
		}
		.box2 {
			width: 639rpx;
			height: 1rpx;
			background: #eeeeee;
			margin-top: 30rpx;
		}
	}
}
/**************** 调整样式 end *********************/
.page {
  position: relative;
  width: 750rpx;
  min-height: 100vh;
	padding-bottom: 100rpx;
  background-color: rgba(247, 247, 247, 1);
  .layer1 {
    background-color: rgba(245, 245, 245, 1);
    width: 750rpx;
    .outer1 {
      width: 750rpx;
      .outer3 {
        margin: 24rpx 0rpx 0;
				.section4 {
					// background-color: rgba(255, 255, 255, 1);
					box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
					padding: 16rpx 24rpx 16rpx 24rpx;
					border-bottom: 1rpx solid #eeeeee;
					&:last-child {
						border-bottom: none;
					}
					.mod2 {
						.layer2 {
							width: 78rpx;
							height: 78rpx;
							background-color: rgba(216, 216, 216, 1);
							border-radius: 50%;
						}
						.layer3 {
							width: 162rpx;
							height: 70rpx;
							margin: 7rpx 0 0 17rpx;
							.info3 {
								width: 52rpx;
								height: 26rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(0, 0, 0, 1);
								font-size: 26rpx;
								white-space: nowrap;
								line-height: 26rpx;
								text-align: left;
							}
							.word5 {
								width: 162rpx;
								height: 26rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(203, 203, 203, 1);
								font-size: 26rpx;
								white-space: nowrap;
								line-height: 26rpx;
								text-align: left;
								margin-top: 18rpx;
							}
						}
						.layer4 {
							width: 78rpx;
							height: 70rpx;
							margin: 7rpx 0 0 114rpx;
							.word6 {
								width: 78rpx;
								height: 26rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(0, 0, 0, 1);
								font-size: 26rpx;
								white-space: nowrap;
								line-height: 26rpx;
								text-align: left;
							}
							.word7 {
								width: 70rpx;
								height: 26rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(253, 111, 45, 1);
								font-size: 26rpx;
								white-space: nowrap;
								line-height: 26rpx;
								text-align: left;
								margin: 18rpx 0 0 4rpx;
							}
						}
						.txt2 {
							width: 78rpx;
							height: 26rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(153, 153, 153, 1);
							font-size: 26rpx;
							white-space: nowrap;
							line-height: 26rpx;
							text-align: right;
							margin: 27rpx 0 0 174rpx;
						}
					}
				}
      }
    }
  }
}

</style>
