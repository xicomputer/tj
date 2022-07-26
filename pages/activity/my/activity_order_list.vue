<template>
	<view class="cantainer">
		<view class="tabs">
			<u-tabs class="aaa" :list="list" active-color="#FF6D2E" :is-scroll="false" :current="current"
				@change="change"></u-tabs>
			<view class="x-line u-border-bottom"></view>
		</view>
		
		<!-- 物流 -->
		<view v-show="current ==0" class="logistics">
			<none-msg :info='tsmsg' :orderno='true'v-if="orderList.length == 0" ></none-msg>
			<view class="order-list">
				<view class="group3 flex-col" v-for="item in 5">
					<view class="group4 flex-col">
						<view class="mod10 flex-row">
							<view class="group5 flex-col"></view>
							<text class="info6">用户名名名</text>
							<text class="txt4">待参与</text>
						</view>
						<view class="mod11 flex-col">
							<view class="bd1 flex-col justify-between">
								<view class="section4 flex-row justify-between">
									<view class="bd2 flex-col"></view>
									<view class="bd3 flex-col">
										<text class="word14">
											活动标题活动标题活动标题活动标活动标题活动标题活动标题题…
										</text>
										<text class="info7">时间：2022-01-21&nbsp;14:00开始</text>
										<text class="txt5">地点：广州白云区广东省广州市机场路…</text>
										<text class="info8">线上活动</text>
									</view>
								</view>
								<view class="section5 flex-row">
									<text class="txt6">默认免费票</text>
									<text class="info9">¥0</text>
									<text class="word15">x2</text>
								</view>
							</view>
						</view>
						<view class="mod12 flex-row justify-between">
							<view class="section6 flex-col justify-between">
								<text class="word16">合计：¥0.00</text>
								<text class="word17">共1张票</text>
							</view>
							<view class="section7 flex-col" @tap="$u.route({url:'pages/activity/my/electronic_ticket'})">
								<text class="info10">查看电子票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 待付款 -->
		<view v-show="current ==1" class="after-sale">
			<none-msg :info='tsmsg' :orderno='true' v-if="afterOrderList == 0" ></none-msg>
			<view class="order-list">
				<view class="group3 flex-col" v-for="item in 1">
					<view class="group4 flex-col">
						<view class="mod10 flex-row">
							<view class="group5 flex-col"></view>
							<text class="info6">用户名名名</text>
							<text class="txt4">待付款</text>
						</view>
						<view class="mod11 flex-col">
							<view class="bd1 flex-col justify-between">
								<view class="section4 flex-row justify-between">
									<view class="bd2 flex-col"></view>
									<view class="bd3 flex-col">
										<text class="word14">
											活动标题活动标题活动标题活动标活动标题活动标题活动标题题…
										</text>
										<text class="info7">时间：2022-01-21&nbsp;14:00开始</text>
										<text class="txt5">地点：广州白云区广东省广州市机场路…</text>
										<text class="info8">线上活动</text>
									</view>
								</view>
								<view class="section5 flex-row">
									<text class="txt6">默认免费票</text>
									<text class="info9">¥0</text>
									<text class="word15">x2</text>
								</view>
							</view>
						</view>
						<view class="mod12 flex-row justify-between">
							<view class="section6 flex-col justify-between">
								<text class="word16">合计：¥0.00</text>
								<text class="word17">共1张票</text>
							</view>
							<view class="section7 flex-col">
								<text class="info10">查看电子票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 待参与 -->
		<view v-show="current ==2" class="logistics">
			<none-msg :info='tsmsg' :orderno='true'v-if="orderList.length == 0" ></none-msg>
			<view class="order-list">
				<view class="group3 flex-col" v-for="item in 1">
					<view class="group4 flex-col">
						<view class="mod10 flex-row">
							<view class="group5 flex-col"></view>
							<text class="info6">用户名名名</text>
							<text class="txt4">待参与</text>
						</view>
						<view class="mod11 flex-col">
							<view class="bd1 flex-col justify-between">
								<view class="section4 flex-row justify-between">
									<view class="bd2 flex-col"></view>
									<view class="bd3 flex-col">
										<text class="word14">
											活动标题活动标题活动标题活动标活动标题活动标题活动标题题…
										</text>
										<text class="info7">时间：2022-01-21&nbsp;14:00开始</text>
										<text class="txt5">地点：广州白云区广东省广州市机场路…</text>
										<text class="info8">线上活动</text>
									</view>
								</view>
								<view class="section5 flex-row">
									<text class="txt6">默认免费票</text>
									<text class="info9">¥0</text>
									<text class="word15">x2</text>
								</view>
							</view>
						</view>
						<view class="mod12 flex-row justify-between">
							<view class="section6 flex-col justify-between">
								<text class="word16">合计：¥0.00</text>
								<text class="word17">共1张票</text>
							</view>
							<view class="section7 flex-col">
								<text class="info10">查看电子票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款 -->
		<view v-show="current ==3" class="logistics">
			<none-msg :info='tsmsg' :orderno='true'v-if="orderList.length == 0" ></none-msg>
			<view class="order-list">
				<view class="group3 flex-col" v-for="item in 3">
					<view class="group4 flex-col">
						<view class="mod10 flex-row">
							<view class="group5 flex-col"></view>
							<text class="info6">用户名名名</text>
							<text class="txt4">已退款</text>
						</view>
						<view class="mod11 flex-col">
							<view class="bd1 flex-col justify-between">
								<view class="section4 flex-row justify-between">
									<view class="bd2 flex-col"></view>
									<view class="bd3 flex-col">
										<text class="word14">
											活动标题活动标题活动标题活动标活动标题活动标题活动标题题…
										</text>
										<text class="info7">时间：2022-01-21&nbsp;14:00开始</text>
										<text class="txt5">地点：广州白云区广东省广州市机场路…</text>
										<text class="info8">线上活动</text>
									</view>
								</view>
								<view class="section5 flex-row">
									<text class="txt6">默认免费票</text>
									<text class="info9">¥0</text>
									<text class="word15">x2</text>
								</view>
							</view>
						</view>
						<view class="mod12 flex-row justify-between">
							<view class="section6 flex-col justify-between">
								<text class="word16">合计：¥0.00</text>
								<text class="word17">共1张票</text>
							</view>
							<view class="section7 flex-col">
								<text class="info10">查看电子票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已完成 -->
		<view v-show="current ==4" class="logistics">
			<none-msg :info='tsmsg' :orderno='true'v-if="orderList.length == 0" ></none-msg>
			<view class="order-list">
				<view class="group3 flex-col" v-for="item in 3">
					<view class="group4 flex-col">
						<view class="mod10 flex-row">
							<view class="group5 flex-col"></view>
							<text class="info6">用户名名名</text>
							<text class="txt4">已完成</text>
						</view>
						<view class="mod11 flex-col">
							<view class="bd1 flex-col justify-between">
								<view class="section4 flex-row justify-between">
									<view class="bd2 flex-col"></view>
									<view class="bd3 flex-col">
										<text class="word14">
											活动标题活动标题活动标题活动标活动标题活动标题活动标题题…
										</text>
										<text class="info7">时间：2022-01-21&nbsp;14:00开始</text>
										<text class="txt5">地点：广州白云区广东省广州市机场路…</text>
										<text class="info8">线上活动</text>
									</view>
								</view>
								<view class="section5 flex-row">
									<text class="txt6">默认免费票</text>
									<text class="info9">¥0</text>
									<text class="word15">x2</text>
								</view>
							</view>
						</view>
						<view class="mod12 flex-row justify-between">
							<view class="section6 flex-col justify-between">
								<text class="word16">合计：¥0.00</text>
								<text class="word17">共1张票</text>
							</view>
							<view class="section7 flex-col">
								<text class="info10">查看电子票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dome from "@/common/logic/dome.js"
	export default {
		data() {
			return {
        tabbar:{},
				tsmsg:'亲，没有推荐订单哦！',
				applyrm:false,
				list: [{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待参与'
					},
					{
						name: '退款'
					},
					{
						name: '已完成'
					},
				],
				current: 0,
				orderList:[{}],
				orderNumber:'',
				refundReason:'',
				afterOrderList:null
			}
		},
    onLoad(e){
      this.tabbar = this.$store.state.tab
			if(e.status_code){
				this.current = e.status_code;
				return
			}
      this.current=0;
    },
		onShow(){
		},
    onHide(){
    },
		methods: {
			// 顶部选择tab
			change(index) {
				console.log("qiant",index)
				this.current = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/tabbar/activity/common.scss';
	/**************** 调整样式 start *******************/
	.group3 {
		height: 458rpx;
		border-radius: 6rpx;
		background-color: rgba(255, 255, 255, 1);
		width: 702rpx;
		padding: 17rpx 0 0 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
		.group4 {
			width: 663rpx;
			height: 420rpx;
			.mod10 {
				width: 662rpx;
				height: 39rpx;
				.group5 {
					width: 39rpx;
					height: 39rpx;
					background-color: rgba(216, 216, 216, 1);
					border-radius: 50%;
				}
				.info6 {
					width: 120rpx;
					height: 24rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(51, 51, 51, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 24rpx;
					margin: 7rpx 0 0 14rpx;
				}
				.txt4 {
					width: 72rpx;
					height: 24rpx;
					display: block;
					overflow-wrap: break-word;
					color: rgba(252, 98, 34, 1);
					font-size: 24rpx;
					white-space: nowrap;
					line-height: 24rpx;
					margin: 7rpx 0 0 417rpx;
				}
			}
			.mod11 {
				height: 281rpx;
				border-radius: 6px;
				background-color: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
				margin-top: 13rpx;
				width: 662rpx;
				padding: 24rpx 0 0 20rpx;
				.bd1 {
					width: 620rpx;
					height: 240rpx;
					.section4 {
						width: 620rpx;
						height: 198rpx;
						.bd2 {
							width: 152rpx;
							height: 198rpx;
							border-radius: 4px;
							background-color: rgba(216, 216, 216, 1);
						}
						.bd3 {
							width: 448rpx;
							height: 197rpx;
							margin-top: 1rpx;
							.word14 {
								width: 448rpx;
								height: 76rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(0, 0, 0, 1);
								font-size: 28rpx;
								line-height: 38rpx;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.info7 {
								width: 344rpx;
								height: 24rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(152, 164, 181, 1);
								font-size: 24rpx;
								white-space: nowrap;
								line-height: 24rpx;
								margin-top: 17rpx;
							}
							.txt5 {
								width: 436rpx;
								height: 24rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(152, 164, 181, 1);
								font-size: 24rpx;
								white-space: nowrap;
								line-height: 24rpx;
								margin-top: 16rpx;
							}
							.info8 {
								width: 103rpx;
								height: 24rpx;
								display: block;
								overflow-wrap: break-word;
								color: rgba(152, 164, 181, 1);
								font-size: 24rpx;
								white-space: nowrap;
								line-height: 24rpx;
								margin-top: 16rpx;
							}
						}
					}
					.section5 {
						width: 611rpx;
						height: 24rpx;
						margin: 18rpx 0 0 9rpx;
						.txt6 {
							width: 120rpx;
							height: 24rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(0, 0, 0, 1);
							font-size: 24rpx;
							white-space: nowrap;
							line-height: 24rpx;
						}
						.info9 {
							width: 29rpx;
							height: 24rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(0, 0, 0, 1);
							font-size: 24rpx;
							white-space: nowrap;
							line-height: 24rpx;
							margin-left: 21rpx;
						}
						.word15 {
							width: 27rpx;
							height: 24rpx;
							display: block;
							overflow-wrap: break-word;
							color: rgba(0, 0, 0, 1);
							font-size: 24rpx;
							white-space: nowrap;
							line-height: 24rpx;
							margin-left: 414rpx;
						}
					}
				}
			}
			.mod12 {
				width: 663rpx;
				height: 62rpx;
				margin-top: 25rpx;
				.section6 {
					width: 148rpx;
					height: 60rpx;
					margin-top: 2rpx;
					.word16 {
						width: 148rpx;
						height: 26rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(253, 111, 45, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 26rpx;
					}
					.word17 {
						width: 82rpx;
						height: 24rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(152, 164, 181, 1);
						font-size: 24rpx;
						white-space: nowrap;
						line-height: 24rpx;
						margin-top: 10rpx;
					}
				}
				.section7 {
					height: 59rpx;
					border-radius: 7px;
					background-color: rgba(253, 111, 45, 1);
					width: 175rpx;
					padding: 17rpx 0 0 22rpx;
					.info10 {
						width: 130rpx;
						height: 26rpx;
						display: block;
						overflow-wrap: break-word;
						color: rgba(255, 255, 255, 1);
						font-size: 26rpx;
						white-space: nowrap;
						line-height: 26rpx;
					}
				}
			}
		}
	}
	/**************** 调整样式 end *********************/
	.cantainer {
		min-height: 100vh;
		padding-top: 100rpx;
		background-color: #f7f7f7;
	}

	.orange {
		color: #FF6D2E;
	}
	.tabs {
		position: fixed;
		top: 0;
		height: 90rpx;
		width: 100%;
		.x-line {
			position: absolute;
			bottom: 4rpx;
			left: 0;
			height: 1px;
			width: 100%;
		}
	}

	.logistics {
		width: 750rpx;
		background-color: #f7f7f7;
		.order-list {
			padding: 0 20rpx;
			margin-top: 20rpx;
			padding-bottom: 100rpx;
		}
	}
	.after-sale{
		width: 750rpx;
		background-color: #f7f7f7;
		
		.order-list {
			padding: 0 20rpx;
			margin-top: 20rpx;
			padding-bottom: 100rpx;
		}
	}
</style>
