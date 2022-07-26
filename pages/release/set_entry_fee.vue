<template>
  <view class="page flex-col">
		<view style="color: #999999;display: flex;flex-direction: column;font-size: 24rpx;">
			<text style="font-weight: 700;font-size: 30rpx;">平台说明</text>
			<text>1、付费报名后平台会收取3%的订单技术服务费</text>
			<text>2、用户购买后支付金额直接到微信商户号，需核销订单后才能提现</text>
			<text>3、因微信商户号要求佣金最高限制30%</text>
			<text>4、如设置佣金后平台抽取的服务会将在佣金中扣除，不影响商家到账金额</text>
		</view>
		
    <view class="layer7 flex-col" @tap="toRefundSeting">
      <view class="group3 flex-row">
        <text class="word7">退款设置</text>
        <view class="bd1 flex-col"></view>
        <text class="info2">{{cause}}</text>
        <u-icon name="arrow-right" color="#DDDDDD"></u-icon>
      </view>
    </view>
		
		<view class="layer7 flex-col">
		  <view class="group3 flex-row" style="justify-content: space-between;">
		    <text class="word7">是否开启分销</text>
				<u-switch v-model="isDistribution" @change="(e)=>{isDistribution = e}"  active-color="green" inactive-color="#eee" size="30"></u-switch>
		  </view>
		</view>
		
		<!-- <view class="layer7 flex-col" v-if="isDistribution">
		  <view class="group3 flex-row" style="justify-content: space-between;">
		    <text class="word7">分销比例</text>
				<u-switch v-model="isDistribution" @change="(e)=>{isDistribution = e}"  active-color="green" inactive-color="#eee" size="30"></u-switch>
		  </view>
		</view> -->
		
		
		<text class="word4 u-m-24">设置报名费用</text>
    <view class="layer8 flex-col u-p-l-24 u-p-r-24" @tap="edtiTicket(item,index)" v-for="(item,index) in tickets">
      <view class="mod3 flex-row u-col-center u-row-between" style="align-items: center;">
        <view class="u-flex">
					<u-icon name="minus-circle-fill" color="#DDDDDD" size="36" @tap.stop="delTicketType(index)"></u-icon>
					<text class="word8">{{item.title}}</text>
				</view>
				<view class="u-flex">
					<text class="word9" v-if="item.price =='免费'">{{item.price}}</text>
					<text class="word9" v-else>{{item.price}}元</text>
					<u-icon name="arrow-right" color="#DDDDDD"></u-icon>
				</view>
      </view>
    </view>
		<view class="layer1 flex-col">
		  <view class="mod1 flex-col">
		    <view class="layer4 flex-row u-col-center" @tap="addTicket(isDistribution)">
		      <text class="word5">+</text>
		      <text class="info1">添加票种</text>
		    </view>
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
			isDistribution:false,
      constants: {},
			superior_ticket_price: '',	// 高级票价格
			cause: '不支持退款',
			tickets: [
				{
					title: '默认费用项',
					price: '免费'
				},
				{
					title: '高级票',
					price: '89'
				}
			]
    };
  },
	eventChannel: null,
	onLoad(options) {
		this.eventChannel = this.getOpenerEventChannel()
		this.eventChannel.on('applySetingFormtickList', data=> {
				this.tickets = data.data.tickets
				this.cause = data.data.cause
				this.isDistribution = data.data.isDistribution
		})
	},
  methods: {
    onClick_1() {
      this.eventChannel.emit('ephor',{tickets: this.tickets,cause:this.cause,isDistribution:this.isDistribution})
      this.$u.route({type: 'back'})
    },
		toRefundSeting(){
			return
			uni.navigateTo({
			  url: '/pages/release/refund_seting',
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.cause = data.cause
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
			  },
			})
		},
		// 添加票种
		addTicket(isDistribution) {
			uni.navigateTo({
			  url: '/pages/release/edit_ticket?isDistribution='+isDistribution,
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.tickets.push(data.ticket)
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
					// success: (res) => {
					// 	// 通过eventChannel向被打开页面传送数据
					// 	res.eventChannel.emit('acceptOrder', { isDistribution: isDistribution })
					// }
			  }
			})
		},
		edtiTicket(item,index){
			uni.navigateTo({
			  url: '/pages/release/edit_ticket?isDistribution='+this.isDistribution,
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
						this.tickets.splice(index,1,data.ticket)
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
			  },
				success: (res) => {
			    // 通过eventChannel向被打开页面传送数据
			    res.eventChannel.emit('acceptOrder', { ticket_type: item })
			  }
			})
		},
		// 删除票种
		delTicketType(index) {
			this.tickets.splice(index,1)
		}
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
  .layer1 {
    background-color: rgba(239, 238, 244, 1);
    width: 750rpx;
    .mod1 {
      width: 750rpx;
      .word4 {
        width: 180rpx;
        height: 30rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(101, 113, 125, 1);
        font-size: 30rpx;
        white-space: nowrap;
        line-height: 30rpx;
        text-align: right;
        margin: 143rpx 0 0 24rpx;
      }
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
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    padding: 34rpx 0 0 23rpx;
		margin-top: 20rpx;
    .group3 {
      width: 712rpx;
      height: 30rpx;
      .word7 {
        width: 112rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: right;
        margin-top: 1rpx;
      }
      .bd1 {
        width: 22rpx;
        height: 22rpx;
        margin: 5rpx 0 0 284rpx;
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
  .layer8 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    padding: 34rpx 0 0 23rpx;
		border-bottom: 1rpx solid #eeeeee;
    .mod3 {
      .word8 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        margin: 1rpx 0 0 16rpx;
      }
      .word9 {
        display: block;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 28rpx;
        white-space: nowrap;
        text-align: right;
        margin: 1rpx 0 0 16rpx;
      }
    }
  }
  .layer9 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
    padding: 34rpx 0 0 23rpx;
    .section1 {
      width: 712rpx;
      height: 30rpx;
      .label1 {
        width: 28rpx;
        height: 28rpx;
        margin-top: 1rpx;
      }
      .word10 {
        width: 84rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: right;
        margin: 1rpx 0 0 16rpx;
      }
    }
  }
}
</style>
