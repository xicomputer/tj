<template>
  <view class="page flex-col u-p-t-20">
    <view class="box7 flex-col" >
      <view class="outer2 flex-row justify-between u-col-center" style="margin-left: 20rpx;">
        <text class="word4">票种名称：</text>
				<u-input
					:border="false"
					class="u-flex-1"
					v-model="form.title"
				></u-input>
      </view>
    </view>
    <view class="box8 flex-col">
      <view class="outer3 flex-row justify-between u-col-center" style="margin-left: 20rpx;">
        <text class="word5">票价(元)：</text>
				<u-input
					:border="false"
					placeholder="请输入价格,不输入则为免费"
					class="u-flex-1"
					v-model="form.price"
					:minlength='1'
					type="number"
				></u-input>
      </view>
    </view>
    <view class="box9 flex-col" >
      <view class="section3 flex-row justify-between u-col-center" style="margin-left: 20rpx;">
        <text class="txt3">数量：</text>
				<u-input
					placeholder="票种总数,不输入则为不限"
					:minlength='1'
					class="u-flex-1"
					:border="false"
					v-model="form.ticket_amount"
					type="number"
				></u-input>
      </view>
    </view>
		<view class="box9 flex-col">
		  <view class="section3 flex-row justify-between u-col-center" style="margin-left: 20rpx;">
		    <text class="txt3">描述：</text>
				<u-input
					placeholder="票种描述"
					class="u-flex-1"
					:border="false"
					v-model="form.ticket_describe"
				></u-input>
		  </view>
		</view>
		<view class="box9 flex-col" v-if="isDistribution == 'true'">
		  <view class="section3 flex-row justify-between u-col-center" style="margin-left: 20rpx;">
		    <text class="txt3">分销比例%：</text>
				<u-number-box :min="0" v-model="form.retailStore" :max="30" :step="5"></u-number-box>
				<!-- <u-input
					placeholder="分销比例"
					class="u-flex-1"
					:type="number"
					input-align="rigth"
					:border="false"
					v-model="form.retailStore"
				></u-input> -->
				
		  </view>
		</view>
   <!-- <view class="box10 flex-col">
      <view class="layer1 flex-row u-row-between">
        <view class="u-flex u-col-center">
					<text class="txt4">票种名称：</text>
					<text class="info4">不需要我审核</text>
				</view>
				<u-switch v-model="form.check_switch" active-color="#fd6f2d"></u-switch>
      </view>
    </view>
    <view class="box12 flex-col">
      <view class="outer4 flex-row justify-between">
        <text class="word6">限购：</text>
        <view class="word7 u-flex u-col-center">
					<view class="num-txt" @click="()=>{limit_num_selector_show = true}">{{form.limit_num||'&nbsp;&nbsp;&nbsp;&nbsp;'}}</view>
					<text>张起售，每人最多购买</text>
					<view class="num-txt" @tap="()=>{max_num_selector_show = true}">{{form.max_num||'&nbsp;&nbsp;&nbsp;&nbsp;'}}</view>
					<text>张</text>
				</view>
      </view>
    </view>
		<view v-if="is_sale_set_time" class="box13 flex-col" @tap="sale_time_show=true">
			<view class="outer5 flex-row u-row-between">
			  <view class="u-flex">
					<text class="info5">售票时间：</text>
					<view>
						<view class="date-time" @tap.stop="showiftime = true">{{dataTimeStart ? dataTimeStart : nowtime}}</view>
						<view class="date-time u-m-t-20" @tap.stop="showiftime2 = true">{{dataTimeEnd ? dataTimeEnd : nowtime7}}</view>
					</view>
				</view>
				<u-icon name="arrow-right" color="#444444"></u-icon>
			</view>
		</view>
    <view v-else class="box13 flex-col" @tap="sale_time_show=true">
      <view class="outer5 flex-row">
        <text class="info5">售票时间：</text>
        <text class="word8">活动结束前均可报名</text>
				<u-icon name="arrow-right" color="#444444"></u-icon>
      </view>
    </view> -->
		<view class="footer-box box1 flex-col">
		  <view class="main1 flex-col justify-between">
		    <view class="section2 flex-col align-center">
		      <button class="bd3 flex-col align-center" @tap="addTicketType">
		        <text class="word3">完成</text>
		      </button>
		    </view>
		  </view>
		</view>
		<!-- 起售数和最大数选择器 -->
		<u-select v-model="limit_num_selector_show" :list="limit_num_options" @confirm="(e)=>{form.limit_num = e[0].value}"></u-select>
		<u-select v-model="max_num_selector_show" :list="max_num_options" @confirm="(e)=>{form.max_num = e[0].value}"></u-select>
		<!-- 售票时间 底部弹出框 -->
		<u-popup v-model="sale_time_show" mode="bottom" class="sale-time-pop-box">
			<view class="sale-popup-box">
				<view class="call-pop-btn flex-col justify-center align-center u-m-b-20" @tap="()=>{is_sale_set_time = true;sale_time_show = false}">
					<text class="txt1">自定义售票时间</text>
				</view>
				<view class="call-pop-btn flex-col justify-center align-center u-m-b-20" @tap="()=>{is_sale_set_time = false;sale_time_show = false}">
					<text class="txt1">活动结束前均可报名</text>
				</view>
				<view class="call-pop-btn cancel-btn flex-col justify-center align-center" @tap="sale_time_show = false">
					<text class="txt1">取消</text>
				</view>
			</view>
		</u-popup>
		<u-picker v-model="showiftime" :params="params" :default-time="dataTimeStart" mode="time" @confirm="confirmStart"></u-picker>
		<u-picker v-model="showiftime2" :params="params" :default-time="dataTimeEnd" mode="time" @confirm="confirmEnd"></u-picker>
	</view>
</template>
<script>
export default {
  data() {
    return {
			isDistribution:false,
      constants: {},
			is_sale_set_time: false,	// 是否设置售票时间
			form: {
				title: '',
				retailStore:0,
		  	price: '',
				ticket_amount: '',
				limit_num: 1,
				max_num: 5,
				check_switch: false	// 是否分销
			},
			sale_time_show: false,	// 售票时间 底部弹窗
			limit_num_selector_show: false,
			max_num_selector_show: false,
			limit_num_options: [	// 起售票数
				{value: 1,label: '1'},
				{value: 2,label: '2'},
				{value: 3,label: '3'}
			],
			max_num_options: [	// 最大票数
				{value: 5,label: '5'},
				{value: 7,label: '7'},
				{value: 15,label: '15'}
			],
			showiftime:false,		// 开始时间选择器
			showiftime2:false,	// 结束时间选择器
			showRegion: false,	// 地区选择器
			dataTimeStart:'',		// 开始时间
			dataTimeEnd:'',			// 结束时间
			nowtime:null,				// 默认开始时间
			nowtime7:null,			// 默认结束时间
			params:{						// 选中时间分解参数
				year:true,
				month: true,
				day: true,  
				hour: true,
				minute: true,
				second: true
			},
    };
  },
	
	eventChannel: null,	// 事件存储: null,
	onLoad(e) {
		this.isDistribution = e.isDistribution
		
		this.form.max_num = Math.floor(Math.random() * 1000000) + '0000' + Date.now() + ['y', 'd', 's', 'x'][Math.floor(Math.random() * 4)];
		this.eventChannel = this.getOpenerEventChannel()
		this.eventChannel.on('acceptOrder', (data) => {
		    console.log(data,'bababa')
				this.isDistribution = e.isDistribution
				this.form = data.ticket_type
		  })
	},
	onShow() {
	  let date = new Date().getTime()
	  this.nowtime  = uni.$u.timeFormat(date, 'yyyy-mm-dd hh:MM:ss') //当前时间
	  this.nowtime7 = uni.$u.timeFormat( date+604800000, 'yyyy-mm-dd hh:MM:ss') //7天后时间
	},
  methods: {
		
    addTicketType() {
			if(!this.form.title){
				uni.showToast({
					title:'请输入票种名',
					icon:"none"
				})
				return
			}
			if(this.form.retailStore){
				this.form.retailStore = Number(this.form.retailStore)
				if(this.form.retailStore > 30){
					uni.showToast({
						title:'分销最高比例为30%',
						icon:"none"
					})
					return
				}
				if(this.form.retailStore < 10){
					uni.showToast({
						title:'分销最低比例为10%',
						icon:"none"
					})
					return
				}
			}
			if(this.form.retailStore == '' || !this.form.retailStore){
					this.form.retailStore = '0'
			}		
			if(this.form.price === '' || this.form.price == 0 || this.form.price == '0' ){
				this.form.price = '免费'
			}
			if(this.form.ticket_amount === '' || this.form.ticket_amount == 0 || this.form.ticket_amount == '0'){
				this.form.ticket_amount = '不限'
			}  
      this.eventChannel.emit('ephor', {ticket: this.form})
			this.$u.route({type: 'back'})
    },
		confirmStart(e){
			this.dataTimeStart =`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		},
		confirmEnd(e){
			console.debug('选时间',e)
			this.dataTimeEnd =`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}` 
		},
  }
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.footer-box {
	width: 100%;
	height: 131rpx;
	position: fixed;
	bottom: 0;
}
.num-txt {
	color: rgba(253, 111, 45, 1);
	border-bottom: 1rpx solid black;
	display: inline-block;
	min-width: 30rpx;
	text-align: center;
}
// 售票时间底部弹窗
.sale-popup-box {
		background: rgba(0,0,0,0);
		padding: 24rpx 30rpx;
		[class~="call-pop-btn"] {
			height: 100rpx;
			border-radius: 6px;
			background-color: rgba(255, 255, 255, 1);
			margin: 0 auto;
			.txt1 {
				display: block;
				overflow-wrap: break-word;
				color: #333333;
				font-size: 30rpx;
				white-space: nowrap;
				text-align: center;
			}
			&.cancel-btn {
				.txt1 {
					color: unset;
				}
			}
		}
	}
/deep/ .sale-time-pop-box .u-drawer-bottom {
	background-color: rgba(0,0,0,0) !important;
}
.date-time {
	min-width: 280rpx;
	min-height: 30rpx;
	border-bottom: 1px solid #979797;
}
/**************** 调整样式 end *********************/
.page {
  position: relative;
  width: 750rpx;
  background-color: #efeef4;
	min-height: 100vh;
  .box1 {
    background-color: rgba(239, 238, 244, 1);
    width: 750rpx;
    .main1 {
      width: 750rpx;
      height: 1643rpx;
      .section2 {
        height: 131rpx;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 20rpx;
        padding-top: 19rpx;
        width: 750rpx;
        .bd3 {
          height: 79rpx;
          border-radius: 6px;
          background-color: rgba(253, 111, 45, 1);
          padding-top: 24rpx;
          width: 702rpx;
          .word3 {
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
  }
  .box7 {
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 35rpx 23rpx 0 23rpx;
    .outer2 {
      height: 28rpx;
      .word4 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .box8 {
    z-index: 45;
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 35rpx 23rpx 0 23rpx;
    .outer3 {
      height: 28rpx;
      .word5 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .box9 {
    z-index: 46;
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 35rpx 23rpx 0 23rpx;
    .section3 {
      height: 28rpx;
      .txt3 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .box10 {
    z-index: 42;
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 26rpx 23rpx 0 23rpx;
    .layer1 {
      width: 703rpx;
      height: 48rpx;
      .txt4 {
        width: 140rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin-top: 9rpx;
      }
      .info4 {
        width: 168rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin-top: 9rpx;
      }
    }
  }
  .box12 {
    z-index: 43;
    height: 99rpx;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 35rpx 23rpx 0 23rpx;
    .outer4 {
      width: 532rpx;
      .word6 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        white-space: nowrap;
        text-align: left;
      }
      .word7 {
        width: 392rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .box13 {
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1rpx solid rgba(217, 226, 235, 1);
    padding: 35rpx 23rpx 35rpx 23rpx;
    .outer5 {
      width: 710rpx;
      .info5 {
        width: 140rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(152, 164, 180, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
      }
      .word8 {
        width: 252rpx;
        height: 28rpx;
        display: block;
        overflow-wrap: break-word;
        color: rgba(35, 48, 64, 1);
        font-size: 28rpx;
        white-space: nowrap;
        line-height: 28rpx;
        text-align: left;
        margin: 1rpx 0 0 280rpx;
      }
    }
  }
}
</style>
