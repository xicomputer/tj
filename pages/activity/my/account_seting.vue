<template>
	<view class="page u-p-b-20">
		<view class="">
			<view class="u-flex u-row-between line-item u-col-center" @tap="editUserInfo('name',name)">
				<view class="u-flex u-col-center">
					<text class="txt">名称</text>
				</view>
				<view class="u-flex u-col-center">
					<text>{{name}}</text>
					<u-icon name="arrow-right" color="#444444" class="u-m-l-10"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center" @tap="editAvatar">
				<view class="u-flex u-col-center">
					<text class="txt">logo</text>
				</view>
				<view class="u-flex u-col-center" @tap.stop="preViewAvatar">
					<image class="logo" :src="avatar" mode="aspectFill"></image>
					<u-icon name="arrow-right" color="#444444" class="u-m-l-10"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between line-item u-col-center" @tap="editUserInfo('intro',intro)">
				<view class="u-flex u-col-center">
					<text class="txt">简介</text>
				</view>
				<view class="u-flex u-col-center u-flex-1 u-line-1">
					<text class="u-flex-1 u-line-1 u-text-right">{{intro}}</text>
					<u-icon name="arrow-right" color="#444444" class="u-m-l-10"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn u-flex u-col-center u-row-center u-m-t-20">
			切换账号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '诗和远方',
				intro: '千里之行，始于足下',
				avatar: '../../../static/logo.png'
			}
		},
		methods: {
			editUserInfo(type,value) {
				uni.navigateTo({
				  url: '/pages/activity/my/edit_user_info' + `?type=${type}&value=${value}`,
				  events: {
				    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						ephor: (data)=> {
							this[type] = data
				    },
				    someEvent: function(data) {
				      console.log(data)
				    }
				  },
				});
			},
			editAvatar() {
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], //从相册选择
				    success: (res) => {
				        this.avatar = res.tempFilePaths[0]
				    }
				});
			},
			preViewAvatar() {
				// 预览图片
				uni.previewImage({
						urls: [this.avatar],
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/pages/tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.page {
	background: #F7F8FA;
	min-height: 100vh;
}
.logo {
	width: 55rpx;
	height: 55rpx;
	border-radius: 50%;
}
.txt {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: #000000;
	min-width: 100rpx;
}
.btn {
	width: 750rpx;
	height: 95rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 1rpx 0rpx 0rpx #EEEEEE;
}
/**************** 调整样式 end *********************/
.line-item {
	background: #fff;
	margin: 0rpx 20rpx 0;
	padding: 31rpx 16rpx;
	border-bottom: 1rpx solid #EEEEEE;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	// font-weight: 400;
	color: #333333;
	&:last-child {
		border-bottom: none;
	}
}
</style>
