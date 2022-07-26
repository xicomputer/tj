<template>
  <view class="page flex-col">
    <view class="mod1 flex-col">
      <view class="box1 flex-col">
        <view class="layer3 flex-col justify-center">
          <view class="outer1 flex-col justify-between">
            <text class="word2">活动名称：活动名称名称名称</text>
            <text class="word3">所选票种：免费票</text>
            <text class="txt3">实付金额：¥0.00</text>
            <text class="word4">报名状态：待审核</text>
          </view>
        </view>
        <view class="layer4 flex-col">
          <view class="bd3 flex-col">
            <text class="txt4">姓名</text>
            <text class="txt5">卢莉</text>
            <view class="section2 flex-col"></view>
            <text class="word5">手机</text>
            <text class="info2">14222018556</text>
            <view class="section3 flex-col"></view>
            <text class="info3">地址</text>
            <text class="word6">广州白云机场路。。。。</text>
          </view>
        </view>
        <view class="layer5 flex-col">
          <view class="section4 flex-col justify-between">
            <text class="info4">订单编号：11111111111111111</text>
            <text class="word7">创建时间：2022-01-06&nbsp;15:20:10</text>
          </view>
        </view>
      </view>
    </view>
		<view class="is-footer u-flex" v-if="page_type=='verify'">
			<view class="box4 flex-col justify-center">
			  <view class="section5 flex-row justify-between">
			    <view class="outer2 flex-col"></view>
			    <text class="word9">审核不通过</text>
			  </view>
			</view>
			<view class="box4 flex-col justify-center">
			  <view class="section5 flex-row justify-between" @tap="verify_show = true">
			    <view class="outer2 flex-col"></view>
			    <text class="word9">审核通过</text>
			  </view>
			</view>
		</view>
		<!-- 审核弹窗 -->
		<u-popup v-model="verify_show" mode="center" class="verify-pop-box" :custom-style="{borderRadius: '8rpx'}">
			<view class="wrap2 flex-col justify-center align-center">
				<view class="group1 flex-col">
					<view class="flex-col justify-between">
						<text class="word1">确定同意通过审核吗？</text>
					</view>
				</view>
				<view class="group2 flex-col"></view>
				<view class="u-flex" style="width: 100%;">
					<view class="flex-col u-flex-1 u-flex u-col-center u-row-center" @tap="verify_show=false"><text class="">取消</text></view>
					<view class="group3 flex-col u-flex-1 u-flex u-col-center u-row-center" @tap="verifyPass"><text class="info1">确定</text></view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="modal_tip_show" :mask-close-able="true" :show-title="false" :show-confirm-button="false" width="300">
			<view class="u-flex-col u-de u-col-center u-row-center u-p-l-100 u-p-r-100 u-p-t-30 u-p-b-30">
				<u-icon name="checkmark-circle" color="#FD6F2D" size="70"></u-icon>
				<text class="u-p-t-20 u-font-xs">审核通过</text>
			</view>
		</u-modal>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			verify_show: false,	// 审核弹窗
			modal_tip_show: false,
			page_type: 'info'	// 页面显示类型
    };
  },
	onLoad(e) {
		if(e.type){
			this.page_type = e.type
		}
	},
  methods: {
		verifyPass() {
			this.verify_show = false,
			this.modal_tip_show = true
			setTimeout(()=>{
				this.modal_tip_show = false
			},1500)
		}
	}
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.is-footer {
	position: fixed;
	bottom: 0;
	height: 100rpx;
	width: 100%;
	z-index: 100;
	background-color: #FFFFFF;
	.box4 {
	  height: 84rpx;
	  background-color: rgba(255, 255, 255, 1);
	  width: 375rpx;
	  .section5 {
	    width: 236rpx;
	    height: 66rpx;
	    .outer2 {
	      width: 1rpx;
	      height: 66rpx;
	      background: #eeeeee;
	    }
	    .word9 {
	      width: 96rpx;
	      height: 24rpx;
	      display: block;
	      overflow-wrap: break-word;
	      color: rgba(51, 51, 51, 1);
	      font-size: 24rpx;
	      white-space: nowrap;
	      line-height: 24rpx;
	      text-align: right;
	      margin-top: 21rpx;
	    }
	  }
	}
}
/deep/ .verify-pop-box .u-mode-center-box {
		background-color: rgba(0,0,0,0) !important;
	}
	 /deep/ .verify-pop-box .u-mode-center-box {
		 border-radius: 24rpx 24rpx 0 0 !important;
	 }
.verify-pop-box {
	margin: 0 24rpx;
	.wrap2 {
		border-radius: 8rpx;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 1);
		.group1 {
			padding: 62rpx 0;
				.word1 {
					display: block;
					overflow-wrap: break-word;
					font-size: 28rpx;
					font-family: PingFangSC-Medium;
					white-space: nowrap;
					text-align: center;
				}
				.outer1 {
					height: 75rpx;
					background-color: rgba(255, 255, 255, 1);
					margin-top: 50rpx;
					width: 351rpx;
					padding: 24rpx 0 0 148rpx;
					.txt1 {
						width: 56rpx;
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
		}
		.group2 {
			left: 24rpx;
			top: 854rpx;
			width: 703rpx;
			height: 1rpx;
			background: #eeeeee;
		}
		.group3 {
			height: 75rpx;
			// border-radius: 0 0 8rpx 0;
			background-color: rgba(253, 111, 45, 1);
			text-align: center;
			.info1 {
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

/**************** 调整样式 end   *******************/
.page {
  position: relative;
  width: 750rpx;
	min-height: 100vh;
  background-color: rgba(247, 247, 247, 1);
  overflow: hidden;
  .mod1 {
    z-index: 2;
    background-color: rgba(247, 248, 250, 1);
    width: 750rpx;
    position: relative;
    .box1 {
      width: 750rpx;
      .layer3 {
        height: 224rpx;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 20rpx;
        padding-left: 24rpx;
        width: 750rpx;
        .outer1 {
          width: 340rpx;
          height: 164rpx;
          .word2 {
            width: 338rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-left: 2rpx;
          }
          .word3 {
            width: 208rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin: 20rpx 0 0 2rpx;
          }
          .txt3 {
            width: 200rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 20rpx;
          }
          .word4 {
            width: 208rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 20rpx;
          }
        }
      }
      .layer4 {
        height: 358rpx;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 20rpx;
        width: 750rpx;
        padding: 30rpx 0 0 24rpx;
        .bd3 {
          width: 703rpx;
          height: 293rpx;
          .txt4 {
            width: 52rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(203, 203, 203, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-left: 2rpx;
          }
          .txt5 {
            width: 52rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin: 20rpx 0 0 2rpx;
          }
          .section2 {
            width: 702rpx;
            height: 1rpx;
            background: #eeeeee;
            margin: 20rpx 0 0 1rpx;
          }
          .word5 {
            width: 52rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(203, 203, 203, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 19rpx;
          }
          .info2 {
            width: 162rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 19rpx;
          }
          .section3 {
            width: 702rpx;
            height: 1rpx;
            background: #eeeeee;
            margin: 19rpx 0 0 1rpx;
          }
          .info3 {
            width: 52rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(203, 203, 203, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 20rpx;
          }
          .word6 {
            width: 286rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 18rpx;
          }
        }
      }
      .layer5 {
        height: 153rpx;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 20rpx;
        width: 750rpx;
        padding: 30rpx 0 0 24rpx;
        .section4 {
          width: 387rpx;
          height: 86rpx;
          .info4 {
            width: 308rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
          }
          .word7 {
            width: 387rpx;
            height: 26rpx;
            display: block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 26rpx;
            text-align: left;
            margin-top: 34rpx;
          }
        }
      }
    }
  }
}

</style>
