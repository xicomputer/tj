<template>
  <view class="page flex-col">
	
    <view class="layer7 flex-col">
      <!-- <view class="group3 flex-row">
        <text class="word7">姓名</text>
      </view>
			<view class="group3 flex-row">
			  <text class="word7">手机</text>
			</view> -->
			<view class="group3 flex-row" v-for="(item,index) in item_list" :key="index" style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;padding:0 40rpx;">
					<u-icon name="minus-circle-fill" color="#D9E2EB" size="46" class="u-m-r-10" @tap="removeItem(index)"></u-icon>
					<text class="word7">{{item.name}}</text>
				</view>				
				<u-checkbox-group active-color="#ff0000">
							<u-checkbox 
								v-model="item.checked"								
							>必填</u-checkbox>
				</u-checkbox-group>
			</view>
    </view>
		<view class="layer1 flex-col">
		  <view class="mod1 flex-col">
				<view style="width: 700rpx;margin: 0 auto;margin-top: 20rpx;display: flex;align-items: center;justify-content: space-evenly;">
					<view class="flex-row u-col-center" style="padding: 10rpx 20rpx;border-radius: 15rpx;background-color: red;color:white" @tap="apply_item_changyong_show = true">
					  <text class="word5" style="color: white;">+</text>
					  <text class="info1" style="color: white;">常用报名项</text>
					</view>
					<view class="flex-row u-col-center" style="padding: 10rpx 20rpx;border-radius: 15rpx;background-color: red;color:white" @tap="apply_item_type_show = true">
					  <text class="word5" style="color: white;">+</text>
					  <text class="info1" style="color: white;">自定义报名项</text>
					</view>
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
					<text class="txt1">选项</text>
				</view>
				<view class="call-pop-btn cancel-btn flex-col justify-center align-center" @tap="apply_item_type_show = false">
					<text class="txt1">取消</text>
				</view>
			</view>
		</u-popup>
		
		<!-- 常用报名项 -->
		<u-popup v-model="apply_item_changyong_show" mode="bottom" :closeable="true">
			<view style="width: 100%;text-align: center;margin-top: 20rpx;">
				常用选项
			</view>
			<view  style="width: 100%;height: 400rpx;display: flex;justify-content: space-around;flex-wrap: wrap;padding: 40rpx;">
				<view v-for="(item,index) in tagList" :key="index" @click="selectTag(index)" :class="{'cur': currentList.indexOf(index) != -1 }" style="border-radius: 80rpx;color: white;width: 200rpx;height: 60rpx;line-height: 60rpx;text-align: center;background-color: #999999;">
					{{item.name}}
				</view>				
			</view>
			<u-button @click="apply_item_changyong_show = false;" type="error">保存</u-button>
		</u-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
			currentList:[],
      constants: {},
			superior_ticket_peice: '',	// 高级票价格
			cause: '活动结束前均可退款',
			apply_item_type_show: false,	// 报名项 底部弹窗
			apply_item_changyong_show:false,
			item_list: [{
				name:'姓名',
				checked:true
			},{
				name:'联系电话',
				checked:true
			}],
			tagList:[{
				name:'姓名',
				checked:true
			},{
				name:'联系电话',
				checked:true
			},{
				name:'公司',
				checked:true
			},{
				name:'职位',
				checked:true
			},{
				name:'微信',
				checked:true
			},{
				name:'QQ',
				checked:true
			},{
				name:'年龄',
				checked:true
			},{
				name:'行业',
				checked:true
			},{
				name:'邮箱',
				checked:true
			}]
    };
  },
	eventChannel:null,
	onLoad() {
		this.eventChannel = this.getOpenerEventChannel()  
		this.eventChannel.on('applySetingFormtextandoptions', data=> {
			if(data.data.length){
				this.item_list = data.data
			}
		
			console.log(this.item_list,'6666');
		})
	},
	onShow(e) {
		console.log('cause',e)
	},
  methods: {
    onClick_1() {
			
	     console.log(this.item_list,'ddddd');
			 this.eventChannel.emit('ephor',{item_list: this.item_list})
			 this.$u.route({type: 'back'})
    },
		selectTag(index){
			if (this.currentList.indexOf(index) == -1) {
			  this.currentList.push(index); // 选中添加到数组⾥(下标)
				this.item_list.push({
					name: this.tagList[index].name,
					checked:true
				})
			} else {
			  this.currentList.splice(this.currentList.indexOf(index), 1);
				this.item_list.splice(this.item_list.findIndex(x => x.name == this.tagList[index].name), 1)
			}
		},
		// 添加报名项  文本
		toAddTextItem(){
			this.apply_item_type_show = false
			uni.navigateTo({
			  url: '/pages/release/apply_item_text',
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.item_list.push({
							name: data.item_name,
							checked:true
						})
			    },
			    someEvent: function(data) {
			      // res.eventChannel.emit('toAddTextItem', { data: item })
			    }
			  },
			})
		},
		toAddOptionItem() {
			this.apply_item_type_show = false
			uni.navigateTo({
			  url: '/pages/release/apply_item_issue',
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					ephor: (data)=> {
			      this.item_list.push({
							name: data.item_name.name,
							checked:true,
							options:data.item_name.options,
							type:data.item_name.type
						})
						console.log(data,'dataitem');
						console.log(this.item_list,'item');
			    },
			    someEvent: function(data) {
			      // res.eventChannel.emit('toAddOptionItem', { data: item })
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
				url: 'pages/release/edit_ticket'
			})
		}
  }
};
</script>
<style lang="scss" scoped>
@import 'common.scss';
/**************** 调整样式 start *******************/
.cur{
	background-color: #ff0000 !important;
}
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
		background-color: rgba(255, 0, 0, 1.0);
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
        // width: 127rpx;
        // height: 50rpx;
        // margin: 20rpx 0 0 25rpx;
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
