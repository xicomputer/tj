<template>
	<view>
		<view>
			<view class="bd3 flex-col"></view>
			<view class="bd17 flex-col u-p-t-20 u-p-b-20">
				<view class="outer4 flex-col">
					<view class="outer5 flex-row justify-between">
						<view class="layer2 flex-col"></view>
						<text class="txt4">全球人资研究院</text>
					</view>
					<view class="outer6 flex-row">
						<text class="word9">29&nbsp;活动</text>
						<view class="group3 flex-col"></view>
						<text class="word10">297&nbsp;粉丝</text>
						<view class="group4 flex-col align-center">
							<text class="word11">已关注</text>
						</view>
						<view class="group5 flex-col align-center">
							<text class="txt5">分享</text>
						</view>
					</view>
				</view>
				<view class="box4 flex-row u-col-center">
					<text class="info2">Ta的简介</text>
					<text class="word3">企业管理者、HR、财务人员学习交流平台。</text>
				</view>
			</view>
			<view>
				<view> <text class="tit">Ta的公开活动</text></view>
				<view class="u-p-b-20 bg-white card-bottom-line" v-for="item in 4">
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
		</view>
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
@import '../tabbar/activity/common.scss';
/**************** 调整样式 start *******************/
.bd3 {
	width: 750rpx;
	height: 271rpx;
	background-color: rgba(216, 216, 216, 1);
}
.bd17 {
	z-index: 40;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.05);
	left: 24rpx;
	top: 532rpx;
	.block1 {
		width: 55rpx;
		height: 29rpx;
		margin: 44rpx 0 0 22rpx;
		.bd18 {
			height: 29rpx;
			border-radius: 3px;
			background-color: rgba(235, 40, 18, 1);
			width: 55rpx;
			padding: 5rpx 0 0 8rpx;
			.word6 {
				width: 40rpx;
				height: 20rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 20rpx;
				white-space: nowrap;
				line-height: 20rpx;
			}
		}
	}
	.block2 {
		margin: 22rpx 0 18rpx 22rpx;
		.label5 {
			width: 22rpx;
			height: 22rpx;
			margin-top: 2rpx;
		}
		.txt9 {
			width: 44rpx;
			height: 24rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(101, 113, 127, 1);
			font-size: 24rpx;
			white-space: nowrap;
			line-height: 24rpx;
			text-align: justify;
			margin-left: 8rpx;
		}
		.label6 {
			width: 22rpx;
			height: 22rpx;
			margin: 2rpx 0 0 24rpx;
		}
		.txt10 {
			width: 38rpx;
			height: 24rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(101, 113, 127, 1);
			font-size: 24rpx;
			white-space: nowrap;
			line-height: 24rpx;
			text-align: justify;
			margin: 1rpx 0 0 8rpx;
		}
		.icon2 {
			width: 22rpx;
			height: 22rpx;
			margin: 2rpx 0 0 22rpx;
		}
		.info7 {
			width: 44rpx;
			height: 24rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(101, 113, 127, 1);
			font-size: 24rpx;
			white-space: nowrap;
			line-height: 24rpx;
			text-align: justify;
			margin: 1rpx 0 0 10rpx;
		}
	}
	.block3 {
		position: absolute;
		left: 22rpx;
		top: 33rpx;
		width: 658rpx;
		height: 100rpx;
		overflow-wrap: break-word;
		text-align: justify;
		font-size: 0;
		.word7 {
			font-size: 28rpx;
			color: rgba(51, 51, 51, 1);
			line-height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.word8 {
			font-size: 34rpx;
			color: rgba(51, 51, 51, 1);
			line-height: 50rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	.box4 {
		margin: 24rpx 0 0 24rpx;
		.info2 {
			width: 150rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(153, 153, 153, 1);
			font-size: 22rpx;
			white-space: nowrap;
			text-align: left;
			margin-top: 4rpx;
		}
		.word3 {
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 26rpx;
			white-space: nowrap;
			line-height: 26rpx;
			text-align: left;
		}
	}
}
.bg-white {
	background-color: #ffffff;
}
.card-bottom-line {
	border-bottom: 1rpx solid #eeeeee;
	&:last-child {
		border-bottom: none;
	}
}
.tit {
	display: block;
	overflow-wrap: break-word;
	color: rgba(102, 102, 102, 1);
	font-size: 26rpx;
	white-space: nowrap;
	margin: 20rpx 0 0 24rpx;
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
/**************** 调整样式 end   *******************/
.outer4 {
	height: 300rpx;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 1);
	box-shadow: 0px 1px 20px 0px rgba(253, 111, 45, 0.2);
	width: 702rpx;
	margin: -50rpx auto 0;
	.outer5 {
		width: 392rpx;
		height: 114rpx;
		margin: 46rpx 0 0 60rpx;
		.layer2 {
			width: 114rpx;
			height: 114rpx;
			background-color: rgba(216, 216, 216, 1);
			border-radius: 50%;
		}
		.txt4 {
			width: 238rpx;
			height: 34rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 34rpx;
			white-space: nowrap;
			line-height: 34rpx;
			text-align: left;
			margin-top: 19rpx;
		}
	}
	.outer6 {
		width: 602rpx;
		height: 53rpx;
		margin: 22rpx 0 65rpx 60rpx;
		.word9 {
			width: 85rpx;
			height: 24rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(179, 186, 199, 1);
			font-size: 24rpx;
			white-space: nowrap;
			line-height: 24rpx;
			text-align: left;
			margin-top: 14rpx;
		}
		.group3 {
			width: 1rpx;
			height: 20rpx;
			background: #E5E5E5;
			margin: 16rpx 0 0 39rpx;
		}
		.word10 {
			width: 98rpx;
			height: 24rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(179, 186, 199, 1);
			font-size: 24rpx;
			white-space: nowrap;
			line-height: 24rpx;
			text-align: left;
			margin: 14rpx 0 0 36rpx;
		}
		.group4 {
			height: 53rpx;
			border-radius: 4rpx;
			border: 2rpx solid rgba(173, 186, 203, 1);
			margin-left: 95rpx;
			padding-top: 12rpx;
			width: 114rpx;
			.word11 {
				width: 72rpx;
				height: 24rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(152, 164, 180, 1);
				font-size: 24rpx;
				white-space: nowrap;
				line-height: 24rpx;
				text-align: left;
			}
		}
		.group5 {
			height: 53rpx;
			border-radius: 4px;
			background-color: rgba(253, 111, 45, 1);
			margin-left: 20rpx;
			padding-top: 14rpx;
			width: 114rpx;
			.txt5 {
				width: 48rpx;
				height: 24rpx;
				display: block;
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 24rpx;
				white-space: nowrap;
				line-height: 24rpx;
				text-align: left;
			}
		}
	}
}

</style>
