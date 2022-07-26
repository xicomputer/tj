<template>
  <view class="page flex-col">
    <view class="layer7 flex-col">
      <view class="group3 flex-row">
        <text class="word7">姓名</text>
      </view>
			<view class="group3 flex-row">
			  <text class="word7">手机</text>
			</view>
			<view class="group3 flex-row" v-for="(item,index) in item_list">
				<u-icon name="minus-circle-fill" color="#D9E2EB" size="36" class="u-m-r-10" @tap="removeItem(index)"></u-icon>
			  <text class="word7">{{item.name}}</text>
			</view>
    </view>
		<view class="layer1 flex-col">
		  <view class="mod1 flex-col">
		    <view class="layer4 flex-row u-col-center" @tap="apply_item_type_show = true">
		      <text class="word5">+</text>
		      <text class="info1">添加报名项</text>
		    </view>
		  </view>
		</view>
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="onClick_1">
		    <text class="word6">完成</text>
		  </button>
		</view>
		<!-- 报名项 底部弹出框 -->
		<u-popup v-model="apply_item_type_show" mode="bottom" class="apply-type-pop-box">
			<view class="type-popup-box">
				<view class="call-pop-btn flex-col justify-center align-center u-m-b-20" @tap="toAddTextItem">
					<text class="txt1">文本</text>
				</view>
				<view class="call-pop-btn flex-col justify-center align-center u-m-b-20" @tap="toAddOptionItem">
					<text class="txt1">问题</text>
				</view>
				<view class="call-pop-btn cancel-btn flex-col justify-center align-center" @tap="apply_item_type_show = false">
					<text class="txt1">取消</text>
				</view>
			</view>
		</u-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			superior_ticket_peice: '',	// 高级票价格
			cause: '活动结束前均可退款',
			apply_item_type_show: false,	// 报名项 底部弹窗
			item_list: []
    };
  },
	onShow(e) {
		console.log('cause',e)
	},
  methods: {
    onClick_1() {
      alert(1);
    },
		// 添加报名项  文本
		toAddTextItem(){
			this.apply_item_type_show = false
			uni.navigateTo({
			  url: '/pages/activity/apply_item_text',
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.item_list.push({
							name: data.item_name
						})
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
			  },
			})
		},
		toAddOptionItem() {
			this.apply_item_type_show = false
			uni.navigateTo({
			  url: '/pages/activity/apply_item_issue',
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.item_list.push({
							name: data.item_name
						})
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
			  },
			})
		},
		// 移除报名项
		removeItem(idx) {
			this.item_list.splice(idx,1)
		},
		// 添加票种
		addTicket() {
			this.$u.route({
				url: 'pages/activity/edit_ticket'
			})
		}
  }
};
</script>
<style lang="scss" scoped>
@import '../tabbar/activity/common.scss';
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
// 选海报底部弹窗
.type-popup-box {
		background: rgba(0,0,0,0);
		padding: 24rpx 30rpx;
		[class~="call-pop-btn"] {
			height: 100rpx;
			border-radius: 6px;
			background-color: rgba(255, 255, 255, 1);
			margin: 0 auto;
			.txt1 {
				width: 120rpx;
				height: 30rpx;
				display: block;
				overflow-wrap: break-word;
				color: #333333;
				font-size: 30rpx;
				white-space: nowrap;
				line-height: 30rpx;
				text-align: center;
			}
			&.cancel-btn {
				.txt1 {
					color: unset;
				}
			}
		}
	}
/deep/ .apply-type-pop-box .u-drawer-bottom {
	background-color: rgba(0,0,0,0) !important;
}
/**************** 调整样式 end *******************/
.page {
  position: relative;
  background-color: #EFEEF4;
	min-height: 100vh;
  .layer1 {
    background-color: rgba(239, 238, 244, 1);
    width: 750rpx;
    .mod1 {
      width: 750rpx;
      .layer4 {
        width: 127rpx;
        height: 50rpx;
        margin: 20rpx 0 0 25rpx;
        .word5 {
          display: block;
          overflow-wrap: break-word;
          color: rgba(253, 111, 45, 1);
          font-size: 30rpx;
					height: 50rpx;
          white-space: nowrap;
          text-align: justify;
        }
        .info1 {
          width: 104rpx;
          height: 30rpx;
          display: block;
          overflow-wrap: break-word;
          color: rgba(253, 111, 45, 1);
          font-size: 26rpx;
          white-space: nowrap;
          line-height: 30rpx;
          text-align: justify;
        }
      }
    }
  }
  .layer7 {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    .group3 {
			padding: 35rpx 24rpx;
			border-bottom: 1rpx solid #D9E2EB;
      .word7 {
        display: block;
        overflow-wrap: break-word;
        color: #233040;
        font-size: 28rpx;
        white-space: nowrap;
      }
    }
  }
}
</style>
