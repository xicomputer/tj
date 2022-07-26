<template>
  <view class="page flex-col">
    <view class="layer7 flex-col u-m-b-20">
			<view class="group3 flex-row" style="display: flex;align-items: center;" @click="apply_item_type_show = false">
				<text>{{option_type==1?'单选':'多选'}}</text>
				<u-icon name="arrow-right u-p-t-10 u-p-l-10 u-p-b-10" color="#444444" @click="apply_item_type_show = false"></u-icon>
			</view>
      <view class="group3 flex-row">
				<u-field
					v-model="item_name"
					:placeholder="option_type==1?'请输入单选标题':'请输入多选标题'"
					label-width="0"
					placeholder-style="text-align: left;"
					class="u-flex-1"
				>
				</u-field>
			
      </view>
    </view>
		<view class="options flex-row" :key="index" v-for="(item,index) in option_list">
			<u-icon name="minus-circle-fill" color="#D9E2EB" size="36" class="u-m-r-10" @tap="removeOption(index)"></u-icon>
		  <u-field
		  	v-model="item.option_name"
		  	placeholder="选项"
		  	label-width="0"
		  	placeholder-style="text-align: left;"
		  	class="u-flex-1"
		  >
		  </u-field>
		</view>
		<view class="layer1 flex-col" @tap="addOption">
		  <text class="add-icon">+</text>
		</view>
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="onClick_1">
		    <text class="word6">完成</text>
		  </button>
		</view>
		<u-select v-model="apply_item_type_show" :list="type_list" @confirm="setItemType"></u-select>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
			item_name: '',
			option_type: '1',
			superior_ticket_peice: '',	// 高级票价格
			cause: '活动结束前均可退款',
			apply_item_type_show: false,	// 报名项 底部弹窗
			type_list: [	// 退款期限
				{
					value: '1',
					label: '单选'
				},
				{
					value: '2',
					label: '多选'
				}
			],
			option_list: []	// 选项
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
			let result = {
				name:this.item_name,
				type:this.option_type,
				options:this.option_list
			}
			console.log(result,'result');
      this.eventChannel.emit('ephor',{item_name:result})
			this.$u.route({
				type: 'back'
			})
    },
		setItemType(e) {
			this.option_type = e[0].value
		},
		addOption() {
			this.option_list.push({
				option_name: ''
			})
		},
		removeOption(idx){
			this.option_list.splice(idx,1)
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
.layer1 {
	height: 100rpx;
	text-align: center;
	background: #fff;
	.add-icon {
		line-height: 100rpx;
		font-size: 50rpx;
		color: rgba(253, 111, 45, 1);
	}
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
.options {
	background: #fff;
	padding: 0 20rpx;
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
