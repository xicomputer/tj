<template>
	<view class="page flex-col">
		<view class="layer7 flex-col" style="position: relative;">
			<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/220713193033.png" style="width: 750rpx;height: 100vh;" mode="aspectFill"></image>
			<view style="font-size: 38rpx;font-weight: 900;color: white;display: flex;flex-direction: column;position: absolute;left: 30rpx;bottom: 160rpx;">
				<text style="margin-bottom: 20rpx;">登录网页发布活动</text>
				<text>在电脑浏览器输入</text>
				<text style="font-size: 30rpx;">https://static-5b4958f3-8387-43ef-abbd-ca9cfeee20e3.bspapp.com/admin#/</text>
				<text>可在PC后台发布活动</text>
				<text @click="onClick_1" style="font-size: 26rpx;margin-top: 20rpx;">点击文字即可复制链接</text>
			</view>
		</view>
		<!-- <view class="is-footer layer5 flex-col align-center">
			<button class="block1 flex-col align-center" @click="onClick_1"><text class="word6">点击复制</text></button>
		</view> -->
	</view>
</template>
<script>
export default {
  data() {
    return {};
  },
	onShow(e) {},
	onLoad() {

	},
  methods: {
    onClick_1() {
			     wx.setClipboardData({
			       data: 'https://static-5b4958f3-8387-43ef-abbd-ca9cfeee20e3.bspapp.com/admin#/',
			       success: function (res) {
			         wx.getClipboardData({
			           success: function (res) {
			             console.log(res.data) // data
			             wx.showToast({
			               title: '复制成功',
			             })
			           }
			         })
			       }
			     })
			   
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
.layer5 {
	height: 131rpx;
	background-color: rgba(255, 255, 255, 1);
	padding-top: 19rpx;
	width: 750rpx;
	.block1 {
		height: 79rpx;
		line-height: 79rpx;
		border-radius: 6px;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(253, 111, 45, 1);
		width: 702rpx;
		// .word6 {
		// 	width: 68rpx;
		// 	display: block;
		// 	overflow-wrap: break-word;
		// 	color: rgba(255, 255, 255, 1);
		// 	font-size: 34rpx;
		// 	white-space: nowrap;
		// 	text-align: justify;
		// }
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
