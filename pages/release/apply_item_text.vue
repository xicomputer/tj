<template>
  <view class="page flex-col">
    <view class="layer7 flex-col">
      <view class="group3 flex-row">
				<u-field
					v-model="item_name"
					placeholder="文本"
					label-width="0"
					placeholder-style="text-align: left;"
					class="u-flex-1"
				>
				</u-field>
      </view>
    </view>
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="onClick_1">
		    <text class="word6">完成</text>
		  </button>
		</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			item_name: '',
			superior_ticket_peice: '',	// 高级票价格
			cause: '不支持退款',
			apply_item_type_show: false,	// 报名项 底部弹窗
    };
  },
	onShow(e) {
		console.log('cause',e)
	},
	eventChannel: null,	// 事件存储
	onLoad() {
		this.eventChannel = this.getOpenerEventChannel()
	},
  methods: {
    onClick_1() {
      this.eventChannel.emit('ephor',{item_name: this.item_name})
			this.$u.route({
				type: 'back'
			})
    },
  }
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.is-footer {
	width: 100%;
	height: 131rpx;
	position: fixed;
	bottom: 0;
}
.layer5 {
	height: 131rpx;
	background-color: rgba(255, 255, 255, 1);
	padding-top: 19rpx;
	width: 750rpx;
	.block1 {
		height: 79rpx;
		border-radius: 6px;
		background-color: rgba(253, 111, 45, 1);
		width: 702rpx;
		.word6 {
			width: 68rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 34rpx;
			white-space: nowrap;
			text-align: justify;
		}
	}
}
/**************** 调整样式 end *******************/
.page {
  position: relative;
  background-color: #EFEEF4;
	min-height: 100vh;
  .layer7 {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    .group3 {
			padding: 20rpx;
			border-bottom: 1rpx solid #D9E2EB;
      .word7 {
        width: 112rpx;
        display: block;
        overflow-wrap: break-word;
        color: #233040;
        font-size: 28rpx;
        white-space: nowrap;
      }
      .info2 {
        width: 252rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(101, 113, 127, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: right;
        margin: 1rpx 0 0 12rpx;
      }
    }
  }
}
</style>
