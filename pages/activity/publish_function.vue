<template>
  <view class="page flex-col">
		<view class="top-title">
			<text class="word3">选择功能</text>
		</view>
    <view>
			<u-grid
				:border="false"
				col="3"
				class="grid-box"
			>
				<u-grid-item
					v-for="(listItem,listIndex) in list"
					:key="listIndex"
					@click="clickIcon(listIndex)"
					class="icon-cell"
				>
					<u-icon
						width="64"
						height="64"
						:customStyle="{paddingTop:20+'rpx'}"
						:name="listItem.name"
						:size="22"
					></u-icon>
					<text class="grid-text icon-text">{{listItem.title}}</text>
					<text class="word6">{{listItem.subtitle}}</text>
					<view class="icon-tag" v-if="!listItem.url">
						<image src="../../static/activity/icon_tag.png" mode="aspectFit"></image>
					</view>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		<view class="bd5 flex-col">
      <view class="outer4 flex-col align-center">
        <view class="box8 flex-col">
          <view class="wrap2 flex-row justify-between">
            <view class="mod5 flex-col"></view>
            <view class="mod6 flex-col justify-between">
              <view class="box9 flex-row justify-between">
                <text class="word13">用户名称名称</text>
                <view class="box10 flex-col">
									<u-icon name="edit-pen"></u-icon>
                </view>
              </view>
              <view class="box11 flex-row justify-between">
                <text class="word14">活动&nbsp;22</text>
                <view class="group2 flex-col"></view>
                <text class="word15">粉丝&nbsp;180</text>
              </view>
            </view>
          </view>
          <view class="wrap3 flex-row justify-between">
            <text class="txt7">个人简介：</text>
            <text class="word16">个人简介</text>
          </view>
          <view class="wrap4 flex-col"></view>
          <view class="wrap5 flex-row justify-between">
            <text class="word17">手机号码：</text>
            <text class="info3">18343895717</text>
          </view>
          <view class="wrap6 flex-col"></view>
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
			list: [{
					name: '/static/activity/applied_activity_icon.png',
					title: '报名活动',
					subtitle: '线上线下全场景通用',
					url: 'pages/activity/publish/publish_activity'
				},
				{
						name: '/static/activity/my_activity_icon.png',
						title: '我的活动',
						subtitle: '线上线下全场景通用',
						url: 'pages/activity/publish/my_activities'
				},
				{
						name: '/static/activity/activity_management_icon.png',
						title: '活动管理',
						subtitle: '线上线下全场景通用',
						url: 'pages/activity/publish/activity_management'
				},
				{
						name: '/static/activity/view_data_icon.png',
						title: '查看数据',
						subtitle: '线上线下全场景通用',
						url: 'pages/activity/publish/participant_list'
				},
				{
						name: '/static/activity/my_fans_icon.png',
						title: '我的粉丝',
						subtitle: '线上线下全场景通用',
						url: 'pages/activity/publish/my_fans'
				},
				{
						name: '/static/activity/financial_settlement_icon.png',
						title: '财务结算',
						subtitle: '线上线下全场景通用',
						url: 'pages/activity/publish/my_financial'
				},
				{
						name: '/static/activity/distribution_icon.png',
						title: '分销',
						subtitle: '线上线下全场景通用'
				}
			],
    };
  },
  methods: {
		clickIcon(e) {
			console.log('点了',e);
			this.$u.route({
				url: this.list[e].url
			})
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.icon-cell {
	position: relative;
	.icon-tag {
		position: absolute;
		right: 4rpx;
		top: 48rpx;
		image {
			width: 100rpx;
			height: 30rpx;
			border-radius: 5000rpx;
		}
	}
}
/deep/.u-grid-item {
	background: rgba(0,0,0,0)!important;
}
/deep/.grid-box .u-icon .u-icon__img {
	width: 64rpx!important;
	height: 64rpx!important;
}
.top-title {
	text-align: center;
	margin-top: 80rpx;
	margin-bottom: 53rpx;
	.word3 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
	}
}
.icon-text {
	margin-top: 10rpx;
	overflow-wrap: break-word;
	color: rgba(253, 111, 45, 1);
	font-size: 26rpx;
	font-family: PingFangSC-Medium;
	white-space: nowrap;
}
.word6 {
	margin-top: 14rpx;
	overflow-wrap: break-word;
	color: rgba(124, 124, 124, 1);
	font-size: 22rpx;
	font-family: PingFangSC-Medium;
	white-space: nowrap;
}
/deep/ .u-grid-item-box {
	border: 1rpx solid #F3F3F3;
}
/**************** 调整样式 end *******************/
.page {
  position: relative;
  background-color: rgba(247, 247, 247, 1);
  overflow: hidden;
  .bd5 {
    background-color: rgba(239, 238, 244, 1);
    padding: 12rpx 18rpx 12rpx 18rpx;
    .outer4 {
      height: 342rpx;
      border-radius: 32rpx;
      // border: 1rpx solid #ACB4C4;
      box-shadow: 0 5rpx 1rpx 5rpx #ACB4C4;
      padding-top: 48rpx;
      width: 715rpx;
			// border-image: linear-gradient(180deg, rgba(229, 235, 244, 1), rgba(172, 180, 196, 1)) 6 6;
      background: linear-gradient(132deg, #DBE2E8 0%, #D2D9DC 100%);
			.box8 {
        width: 621rpx;
        height: 255rpx;
        .wrap2 {
          width: 352rpx;
          height: 99rpx;
          margin-left: 1rpx;
          .mod5 {
            width: 99rpx;
            height: 99rpx;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 50%;
          }
          .mod6 {
            width: 222rpx;
            height: 76rpx;
            margin-top: 17rpx;
            .box9 {
              width: 222rpx;
              height: 32rpx;
              .word13 {
                width: 192rpx;
                height: 32rpx;
                display: block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 32rpx;
                white-space: nowrap;
                line-height: 32rpx;
                text-align: justify;
              }
              .box10 {
                height: 24rpx;
                background-color: rgba(0, 0, 0, 0);
                width: 24rpx;
                padding: 1rpx 0 0 1rpx;
              }
            }
            .box11 {
              width: 220rpx;
              height: 24rpx;
              margin-top: 20rpx;
              .word14 {
                width: 85rpx;
                height: 24rpx;
                display: block;
                overflow-wrap: break-word;
                color: rgba(116, 123, 127, 1);
                font-size: 24rpx;
                white-space: nowrap;
                line-height: 24rpx;
                text-align: justify;
              }
              .group2 {
                width: 1rpx;
                height: 14rpx;
                background: #747B7F;
                margin-top: 5rpx;
              }
              .word15 {
                width: 95rpx;
                height: 24rpx;
                display: block;
                overflow-wrap: break-word;
                color: rgba(116, 123, 127, 1);
                font-size: 24rpx;
                white-space: nowrap;
                line-height: 24rpx;
                text-align: justify;
              }
            }
          }
        }
        .wrap3 {
          width: 198rpx;
          height: 22rpx;
          margin: 30rpx 0 0 1rpx;
          .txt7 {
            width: 110rpx;
            height: 22rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 22rpx;
            white-space: nowrap;
            line-height: 22rpx;
            text-align: justify;
          }
          .word16 {
            width: 88rpx;
            height: 22rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 22rpx;
            white-space: nowrap;
            line-height: 22rpx;
            text-align: justify;
          }
        }
        .wrap4 {
          width: 621rpx;
          height: 1rpx;
          background: #BCBCBC;
          margin-top: 24rpx;
        }
        .wrap5 {
          width: 245rpx;
          height: 22rpx;
          margin: 33rpx 0 0 1rpx;
          .word17 {
            width: 110rpx;
            height: 22rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 22rpx;
            white-space: nowrap;
            line-height: 22rpx;
            text-align: justify;
          }
          .info3 {
            width: 135rpx;
            height: 22rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 22rpx;
            white-space: nowrap;
            line-height: 22rpx;
            text-align: justify;
          }
        }
        .wrap6 {
          width: 621rpx;
          height: 1rpx;
          background: #BCBCBC;
          margin-top: 23rpx;
        }
      }
    }
  }
}

</style>

