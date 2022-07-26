<template>
	<view>
		<view>
			<view class="u-p-b-20 bg-white card-bottom-line" v-for="item in 3">
				<view class="mod8 flex-row justify-between"
				@click="$u.route({url: 'pages/activity/activity_detail'})">
					<view class="mod9 flex-col"></view>
					<view class="mod10 flex-col">
						<view class="u-flex">
							<text class="u-line-2">
								<text class="title-tag self-red">
									<text class="txt8">推荐</text>
								</text>
								标题名称标题名称标题标题名称标题名称名称名···
							</text>
						</view>
						<text class="word6">简介简介简介</text>
						<view class="box1 flex-row justify-between">
							<text class="word7">免费</text>
							<view class="section4 flex-col">
								<text class="word8">报名将截止</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-info">已全部加载</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
@import '@/pages/tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.page {
	min-height: 100%;
	background: #F7F8FA;
}
.bg-white {
	background-color: #ffffff;
}
.footer-info {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	color: #333333;
	text-align: center;
}
.card-bottom-line {
	border-bottom: 1rpx solid #eeeeee;
	&:last-child {
		border-bottom: none;
	}
}
.mod8 {
	width: 702rpx;
	height: 206rpx;
	margin: 29rpx 0 0 24rpx;
	background-color: #fff;
	.mod9 {
		width: 350rpx;
		height: 206rpx;
		background-color: rgba(216, 216, 216, 1);
	}

	.mod10 {
		width: 339rpx;
		height: 206rpx;

		.info5 {
			width: 332rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			text-align: justify;
			margin-left: 3rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.word6 {
			width: 120rpx;
			height: 20rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(152, 163, 182, 1);
			font-size: 20rpx;
			white-space: nowrap;
			line-height: 20rpx;
			text-align: justify;
			margin: 9rpx 0 0 3rpx;
		}

		.box1 {
			width: 339rpx;
			height: 47rpx;
			margin-top: 42rpx;

			.word7 {
				width: 52rpx;
				height: 26rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(253, 111, 45, 1);
				font-size: 26rpx;
				white-space: nowrap;
				line-height: 26rpx;
				text-align: justify;
				margin-top: 16rpx;
			}

			.section4 {
				height: 47rpx;
				border-radius: 6rpx;
				border: 2rpx solid rgba(253, 111, 45, 1);
				background-color: rgba(255, 247, 243, 1);
				width: 159rpx;
				padding: 9rpx 0 0 17rpx;

				.word8 {
					width: 122rpx;
					height: 26rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(253, 111, 45, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 26rpx;
					text-align: justify;
				}
			}
		}
	}
}
/**************** 调整样式 end *********************/

</style>
