<template name="redflower-showTips">
	<view>
		<view class="tipsWrap" :style="{top:70 - scrollTop +'rpx'}" v-if="showTips">
			<view class="arrow"></view>
			<view class="tipsContent">
				<text>点击即可发布</text>
				<text class="closeIcon" @tap="closeTips()">X</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "showTips",
		data() {
			return {
				isFirst: true, //是否首次
				showTips: true, //是否展示
				statusBarHeight:0,
				windowWidth:0,
				navBarHeight:0,
				scrollTop:0,
				menuButtonInfo:{}
			};
		},
		created() {
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// 获取手机系统信息
			const info = uni.getSystemInfoSync();
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log(menuButtonInfo);
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = menuButtonInfo.bottom - info.statusBarHeight + (menuButtonInfo.top - info.statusBarHeight);
			this.windowWidth = menuButtonInfo.left;
			// #endif
		
			//#ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			//#endif
		},
		onReady() {
			const _that = this;
			//获取本地缓存
						uni.$on('onPageScroll', function(data) {
							_that.scrollTop = data;
						});
			let cache = uni.getStorageSync('isFirst');

			if (cache) {
				_that.showTips = true;
			} else {
				_that.showTips = true;
				uni.setStorage({
					key: 'isFirst',
					data: '0'
				})
				setTimeout(() => {
					_that.showTips = false;
				}, 10000); //5s后消失
			}
		},

		methods: {
			getgundong(){
				
			},
			//手动关闭
			closeTips() {
				const _that = this;
				_that.showTips = false;
				uni.setStorage({
					key: 'isFirst',
					data: '0'
				})
			}
		}


	}
</script>

<style>
	.tipsWrap {
		position: fixed;
		/* 距离顶部高度，部分自定义标题栏会覆盖提示栏 */
		right: 0;
		z-index: 999;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: column;
		width: 600rpx;
		animation: rotate .9s linear infinite;
	}
	/* 弹跳动画 */
	@keyframes rotate {
		0% {
			transform: translateY(0);
		}

		25% {
			transform: translateY(2rpx);
		}

		50% {
			transform: translateY(5rpx) scale(1.01, 0.99);

		}

		75% {
			ransform: translateY(2rpx);
		}

		100% {
			transform: translateY(0);
		}
	}

	.arrow {
		width: 0;
		height: 0;
		margin-right: 60rpx;
		border-width: 10rpx;
		border-style: solid;
		border-color: transparent transparent #f10000 transparent;
		/* 箭头颜色 */
	}

	.tipsContent {
		background-color: #ff0000;
		/* 背景颜色 */
		box-shadow: 0 10rpx 20rpx -10rpx #F1F1F1;
		/* 阴影颜色 */
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56rpx;
		padding: 0 10rpx 0 15rpx;
		margin-right: 40rpx;
	}

	.tipsContent>text {
		color: #ffffff;
		font-size: 24rpx;
	}

	.closeIcon {
		font-size: 20rpx !important;
		margin-left: 10rpx;
		padding: 0 8rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}
</style>