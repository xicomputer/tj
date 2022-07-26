<template>
	<view class="page flex-col">
		<view class="layer7 ">
			<view class="group3 flex-row" style="justify-content: space-between;align-items: center;">
				<text>头像</text>				
				<view style="display: flex;align-items: center;flex-direction: column;">
					
					<u-avatar :src="dataList.edit_avatarUrl[0].url?dataList.edit_avatarUrl[0].url:dataList.headImgUrl" size="80"></u-avatar>
					<view @click="editavatarshow = true" style="padding: 2rpx 6rpx;background-color: crimson;color: white;font-size: 22rpx;">修改头像</view>
				</view>
			</view>
			<view class="group3 flex-row" style="justify-content: space-between;align-items: center;">
				<text>名称</text>
				<view style="display: flex;align-items:right;flex-direction: column;">
					<view>						
						<text>{{dataList.edit_nickName?dataList.edit_nickName:dataList.nickName}}</text>
					</view>					
					<view @click="editnicknameshow = true" style="width:100rpx;height:30rpx;background-color: crimson;color: white;font-size: 22rpx;line-height:30rpx;text-align:center">修改名称</view>
				</view>
			</view>
			<view class="group3 flex-row" style="justify-content: space-between;align-items: center;">
				<text>联系方式</text>
				<view>
					<u-field
						v-model="dataList.phone"
						placeholder="联系方式"
						label-width="0"
						placeholder-style="text-align: right;"
						input-align="right"
						:disabled="true"
						class="u-flex-1"
					></u-field>
				</view>
			</view>
			<view class="group3 flex-row" style="justify-content: space-between;align-items: center;">
				<view style="width: 250rpx;">简介</view>
				<view style="flex: 1;">
					<!-- <u-field
						v-model="dataList.introduction"
						placeholder="暂未设置简介"
						label-width="0"
						placeholder-style="text-align: right;"
						:maxlength="150"
						input-align="right"
						class="u-flex-1"
					></u-field> -->
					<u-input v-model="dataList.introduction" placeholder="暂未设置简介" input-align="left" auto-height type="textarea" :border="true" 	:maxlength="150"/>
				</view>
				</view>
				<view class="group3 flex-row" style="justify-content: space-between;align-items: center;">
					<text>背景图片(尺寸为3:1)</text>
					<view style="display: flex;align-items: right: ;flex-direction: column;">
						<u-image :src="dataList.edit_backgroundImage[0].url?dataList.edit_backgroundImage[0].url:dataList.backgroundImage" width="300rpx" height="180rpx" mode=""></u-image>
						<view @click="editbackgroundshow = true" style="width:300rpx;height:50rpx;background-color: crimson;color: white;font-size: 22rpx;line-height:50rpx;text-align:center">修改背景图片</view>
					</view>					
				</view>
				<view class="activity_box_info" style="margin-top: 20rpx;" @tap="$u.route({url:'pages/activity/apply_item_issue'})">
					<text  class="tt-text">用户资料:</text>	
					<view class="u-flex">
						<text class="word9 u-m-r-10" style="font-size: 22rpx;color: red;"></text>
						<u-icon name="arrow-right" size='26' color="#c5c5c5"></u-icon>
					</view>
				</view>
			<view class="is-footer layer5 flex-col align-center">
				<button class="block1 flex-col align-center" @click="onClick_1"><text class="word6">完成</text></button>
			</view>
			<u-popup v-model="editnicknameshow" mode="center">
						<view>							
								<u-input v-model="dataList.edit_nickName" placeholder="请输入名称" :type="text" :border="true" />				
						</view>
			</u-popup>
			<u-popup v-model="editavatarshow" mode="center">
						<view>							
								<uni-file-picker
									v-model="dataList.edit_avatarUrl"
									class="activity-poster"
									fileMediatype="image"
									returnType="array"
									:image-styles="avatarStyle"
									:limit="1"
									@delete="avatarDelete"
									@success="avatarsuccessimg"
								/>							
						</view>
			</u-popup>
			<u-popup v-model="editbackgroundshow" mode="center">
						<view>							
								<uni-file-picker
									v-model="dataList.edit_backgroundImage"
									class="activity-poster"
									fileMediatype="image"
									returnType="array"
									:image-styles="imageStyle"
									:limit="1"
									@delete="imgDelete"
									@success="successimg"
								
								/>							
						</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {
			constants: {},
			dataList: [],
			avatarStyle: {
				height: '360rpx',
				width: '360rpx',
				borderRadius:'50%'
			},
			imageStyle: {
				height: '300rpx',
				width: '500rpx'
			},
			editavatarshow:false,
			editbackgroundshow:false,
			editnicknameshow:false,
			superior_ticket_peice: '', // 高级票价格
			cause: '活动结束前均可退款',
			apply_item_type_show: false // 报名项 底部弹窗
		};
	},
	onShow(e) {
		console.log('cause', e);
	},
	eventChannel: null, // 事件存储
	onLoad() {
		this.eventChannel = this.getOpenerEventChannel();
		this.eventChannel.on('applySetingFormedit_data', data => {
			console.log(data, 'dddddd');
			this.dataList = data.data;
			// console.log(typeof data.data,'dddddd')
		});
	},
	methods: {
		
		imgDelete(e) {
			uniCloud
				.deleteFile({
					fileList: [e.tempFilePath]
				})
				.then(res => {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					});
				});
		},
		successimg(e) {
			uni.showToast({
				title: '上传成功',
				icon: 'none'
			});
			this.editbackgroundshow = false
		},
		avatarDelete(e) {
			uniCloud
				.deleteFile({
					fileList: [e.tempFilePath]
				})
				.then(res => {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					});
				});
		},
		avatarsuccessimg(e) {
			uni.showToast({
				title: '上传成功',
				icon: 'none'
			});
			this.editavatarshow = false
		},
		onClick_1() {
			if(this.dataList.headImgUrl.length == 0){
				uni.showToast({
					title:'请设置头像',icon:"none"
				})
				return
			}
			if(!this.dataList.nickName){
				uni.showToast({
					title:'请设置名称',icon:"none"
				})
				return
			}
			db.collection('user')
				.doc(this.dataList._id)
				.update({
					edit_nickName:this.dataList.edit_nickName,
					edit_avatarUrl:this.dataList.edit_avatarUrl,
					edit_backgroundImage:this.dataList.edit_backgroundImage,
					introduction: this.dataList.introduction,					
				})
				.then(res => {
					this.eventChannel.emit('ephor', { dataList: this.dataList });
					this.$u.route({
						type: 'back'
					});
				});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.activity_box_info{
		width: 750rpx;height:100rpx;margin: 0rpx auto;padding: 10rpx 40rpx ;display: flex;align-items: center;justify-content: space-between;
	}
	.tt-text{
		font-size: 26rpx;font-weight: 700;
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
	background-color: #efeef4;
	min-height: 100vh;
	.layer7 {
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
		.group3 {
			padding: 20rpx;
			border-bottom: 1rpx solid #d9e2eb;
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
