<template>
	<view>
		<u-navbar :background="{ background: '#ff0000' }" title-color="#fff" :is-back="true" :title-bold="true" back-icon-color="#fff" title="发布活动"></u-navbar>
		<view class="paltitle"><text>好友推荐官活动</text></view>
		<view class="palcontent">
			<view class="content" @tap="$u.route({ url: 'pages/activity/publish_activity' })">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0001.png"  mode=""></image>
					<text>会议活动</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
			<view class="content desabled" @tap="desabled">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0002.png"  mode=""></image>
					<text>亲子活动</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
			<view class="content desabled" @tap="desabled">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0003.png"  mode=""></image>
					<text>招商活动</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
			<view class="content desabled" @tap="desabled">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0004.png"  mode=""></image>
					<text>旅游报名</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
			<view class="content desabled" @tap="desabled">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0005.png"  mode=""></image>
					<text>美食活动</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
			<view class="content desabled" @tap="desabled">
				<view class="item">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/0006.png"  mode=""></image>
					<text>更多活动敬请期待</text>
				</view>
				<u-icon name="plus" color="#000" size="40"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
const dbCmd = db.command;
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		desabled(){
			uni.showToast({
				title:'暂不符合发布条件',icon:"none"
			})
			return
		}
	}
};
</script>
<style>
page {
	background-color: rgba(172, 172, 172, 0.18);
}
</style>
<style lang="scss" scoped>
.paltitle {
	background-color: #ff0000;
	width: 750rpx;
	height: 200rpx;
	border-radius: 0 0 50px 50px;
	text-align: center;
	font-size: 60rpx;
	font-weight: 900;
	color: white;
	line-height: 200rpx;
}
.palcontent {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 50rpx;
	.content {
		width: 100%;
		margin: 30rpx auto;
		height: 120rpx;
		box-shadow: 0 0 8px 0px #b7b7b7;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #fff;
		.item {
			display: flex;
			align-items: center;
			image{
				width: 100rpx;height: 100rpx;margin-right: 15rpx;
			}
			text{
				font-weight: 700;
			}
		}
	}
}
.desabled{
	background-color: #bdbdbd !important; 
}
</style>
