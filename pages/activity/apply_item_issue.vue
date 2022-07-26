<template>
  <view class="page flex-col">
    
		<!-- <view class="options flex-row"> -->
			<view class="group3 flex-row" style="justify-content: space-between;align-items: center;padding: 20rpx;background-color: #fff;border-bottom: 1px solid #999;" :key="index" v-for="(item,index) in option_list">
				<text>{{item.name}}</text>
				<view>
					<u-field
						v-model="item.value"
						label-width="0"
						placeholder="暂未设置"
						placeholder-style="text-align: right;"
						input-align="right"
						class="u-flex-1"
					></u-field>
				</view>
			</view>
		<!-- </view> -->
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="onClick_1">
		    <text class="word6">完成</text>
		  </button>
		</view>
  </view>
</template>
<script>
	const db = uniCloud.database()
	const dbCmd =db.command
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
					label: '单选按钮'
				},
				{
					value: '2',
					label: '多选按钮'
				}
			],
			option_list: [{
				name:'姓名',
				value:''
			},{
				name:'联系电话',
				value:''
			},{
				name:'公司',
				value:''
			},{
				name:'职位',
				value:''
			},
			// {
			// 	name:'微信',
			// 	value:''
			// }
			// ,{
			// 	name:'QQ',
			// 	value:''
			// },
			{
				name:'年龄',
				value:''
			},{
				name:'行业',
				value:''
			},{
				name:'邮箱',
				value:''
			}],
			
    };
  },
	onShow(e) {
		// console.log('cause',e)
	},
	// eventChannel: null,	// 事件存储
	onLoad() {
		// this.eventChannel = this.getOpenerEventChannel()
		db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).get().then(res=>{
			let result = res.result.data[0]
			if(typeof result.toenroll_info != 'undefined'){
				for (let key in result.toenroll_info) {
					if(key == 'name'){
							this.option_list[0].value = result.toenroll_info.name
						}else if(key == 'phone'){
							this.option_list[1].value = result.toenroll_info.phone
						}else if(key == 'company'){
							this.option_list[2].value = result.toenroll_info.company
						}else if(key == 'position'){
							this.option_list[3].value = result.toenroll_info.position
						}else if(key == 'weChat'){
							this.option_list[4].value = result.toenroll_info.weChat
						}else if(key == 'QQ'){
							this.option_list[5].value = result.toenroll_info.QQ
						}else if(key == 'age'){
							this.option_list[6].value = result.toenroll_info.age
						}else if(key == 'industry'){
							this.option_list[7].value = result.toenroll_info.industry
						}else if(key == 'email'){
							this.option_list[8].value = result.toenroll_info.email
						}
				}
			}
				
			
			
			// this.option_list = result.toenroll_info
		})
	},
  methods: {
    onClick_1() {
			if(!uni.getStorageSync('userinfoKey').openId || !getApp().globalData.OPENID){
				uni.showToast({
					title:'请先登录',icon:"none"
				})
				setTimeout(()=>{
					this.$u.route({url:'pages/login/login'})
				},1200)
				return
			}else{
				let toenroll_info = {}
				for (var i = 0; i < this.option_list.length; i++) {
					let item = this.option_list[i]
					if(item.value){
						if(item.name == '姓名'){
							toenroll_info.name = item.value
						}else if(item.name == "联系电话"){
							toenroll_info.phone = item.value
						}else if(item.name == "公司"){
							toenroll_info.company = item.value
						}else if(item.name == "职位"){
							toenroll_info.position = item.value
						}else if(item.name == "微信"){
							toenroll_info.weChat = item.value
						}else if(item.name == "QQ"){
							toenroll_info.QQ = item.value
						}else if(item.name == "年龄"){
							toenroll_info.age = item.value
						}else if(item.name == "行业"){
							toenroll_info.industry = item.value
						}else if(item.name == "邮箱"){
							toenroll_info.email = item.value
						}
					}
				}
				db.collection('user').where({openId:uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID}).update({
					toenroll_info:toenroll_info
				}).then(res=>{
					this.$u.route({
						type: 'back'
					})
				})
			}
			
      // this.eventChannel.emit('ephor',{item_name: this.item_name})
			
    },
		
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
