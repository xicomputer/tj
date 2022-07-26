<template>
  <view class="page flex-col">
    <view class="layer5 flex-col"></view>
    <view class="layer6 flex-col" @tap="cur = 1">
      <view class="group1 flex-row justify-between">
        <text class="txt1">申请后直接退款</text>
        <view class="radio_btn flex-col" :class="{active:cur == 1}"></view>
      </view>
    </view>
    <view class="layer7 flex-col" @tap="cur = 2">
      <view class="box1 flex-row justify-between">
        <text class="txt2">申请后需商家审核</text>
        <view class="radio_btn flex-col" :class="{active:cur == 2}"></view>
      </view>
    </view>
    <view class="layer8 flex-col" @tap="cur = 3">
      <view class="main3 flex-row justify-between">
        <text class="txt3">不支持退款</text>
        <view class="radio_btn flex-col" :class="{active:cur == 3}"></view>
      </view>
    </view>
		<view class="layer1 flex-col">
		  <view class="layer2 flex-col">
		    <view class="bd3 flex-row justify-between">
		      <image
		        class="icon2"
		        referrerpolicy="no-referrer"
		        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3dc060e19c8462bec6f58781200130f8db6dc1256809a9ef5fdab79e4f83055a"
		      />
		      <text class="word4">活动发布后，不能更改退款设置</text>
		    </view>
		    <button class="bd4 flex-col align-center" @click="onClick_1">
		      <text class="word5">完成</text>
		    </button>
		  </view>
		</view>
		<u-select v-model="refund_date_show" :list="list" @confirm="setRefundDate"></u-select>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			cur: 3,
			refund_date: '',
			refund_date_show: false,
			list: [	// 退款期限
				{
					value: '7',
					label: '7'
				},
				{
					value: '10',
					label: '10'
				},
				{
					value: '15',
					label: '15'
				}
			],
    };
  },
	eventChannel: null,	// 事件存储
	onLoad() {
		this.eventChannel = this.getOpenerEventChannel()
	},
  methods: {
    onClick_1() {
			let cause = ''
			switch(this.cur){
				case 1:
					cause = '申请后直接退款'
					break;
				case 2:
					cause = `申请后需商家审核`
					break;
				case 3:
					cause = '不支持退款'
					break;
			}
			this.eventChannel.emit('ephor',{cause:cause})
      this.$u.route({
				type:'back'
			})
    },
		setRefundDate(e) {
			this.refund_date = e[0].value
		}
  }
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.radio_btn {
	width: 32rpx;
	height: 32rpx;
	background: url(../../static/activity/radio.png) -1rpx
		0rpx no-repeat;
	background-size: contain;
	&.active {
		background: url(../../static/activity/radio_selected.png) -1rpx
			0rpx no-repeat;
		background-size: contain;
	}
}
/**************** 调整样式 end *******************/
.page {
  position: relative;
  width: 750rpx;
  background-color: rgba(247, 247, 247, 1);
  overflow: hidden;
  .layer1 {
    background-color: rgba(239, 238, 244, 1);
    width: 750rpx;
    .layer2 {
      width: 750rpx;
      .bd3 {
        width: 530rpx;
        height: 26rpx;
        margin: 24rpx 0 0 24rpx;
        .icon2 {
          width: 26rpx;
          height: 26rpx;
        }
        .word4 {
          width: 494rpx;
          height: 26rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(172, 185, 197, 1);
          font-size: 26rpx;
          white-space: nowrap;
          line-height: 26rpx;
          text-align: right;
        }
      }
      .bd4 {
        height: 79rpx;
        border-radius: 6px;
        background-color: rgba(253, 111, 45, 1);
        padding-top: 24rpx;
        width: 702rpx;
        margin: 49rpx 0 0 24rpx;
        .word5 {
          width: 68rpx;
          height: 34rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 34rpx;
          white-space: nowrap;
          line-height: 34rpx;
          text-align: justify;
        }
      }
    }
  }
  .layer5 {
  }
  .layer6 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(217, 226, 235, 1);
    padding: 33rpx 0 0 24rpx;
		border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    .group1 {
      width: 701rpx;
      height: 32rpx;
      .txt1 {
        width: 252rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin-top: 2rpx;
      }
      .group2 {
        width: 32rpx;
        height: 32rpx;
        background: url(../../static/activity/radio_selected.png) -1rpx
          0rpx no-repeat;
				background-size: contain;
      }
    }
  }
  .layer7 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    padding: 33rpx 0 0 24rpx;
		border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    .box1 {
      width: 701rpx;
      height: 32rpx;
      .txt2 {
        width: 322rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin-top: 2rpx;
      }
      .box2 {
        width: 32rpx;
        height: 32rpx;
        background: url(../../static/activity/radio.png) -1rpx
          0rpx no-repeat;
				background-size: contain;
      }
    }
  }
  .layer8 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    padding: 33rpx 0 0 24rpx;
    .main3 {
      width: 701rpx;
      height: 32rpx;
      .txt3 {
        width: 140rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin-top: 2rpx;
      }
      .bd5 {
        width: 32rpx;
        height: 32rpx;
        background: url(../../static/activity/radio.png) -1rpx
          0rpx no-repeat;
        background-size: contain;
      }
    }
  }
}

</style>
