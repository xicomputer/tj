<template>
	<view class="">
			<view >
				<!-- <view style="display: flex;background: #fff;height: 220rpx;width: 90%;border-radius: 16rpx;margin: 20rpx 40rpx;box-shadow: 1rpx 1rpx 10rpx 1rpx;">
					<image style="margin: 20rpx;width: 32%;height: 180rpx;" src="https://img1.baidu.com/it/u=3746501447,173439636&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656608400&t=4a779142238895cc5b89591ea558530c" ></image>
					<view style="margin-top: 20rpx;">
						<view style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">活动名称活动名称活动名称</view>
						<view style="color:#999;font-size: 22rpx;margin-top: 10rpx;">时间:04/04 18:00开始</view>
						<view style="color:#999;font-size: 22rpx;margin-top: 10rpx;">地址:湖南省长沙市雨花区凤凰海天界苑</view>
						<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
							<view>线下活动</view>
							<view>亲子活动</view>
						</view>
						
					</view>
				</view> -->
				<view style="background: #fff;width: 100%;height: 500rpx;display: flex;align-items: center;justify-content:center;flex-direction: column;">
					
					<view class="" style="display: flex;align-items: center;justify-content:center;">
						<image  src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/baoming1.png" style="height: 128rpx;width: 128rpx;margin-right: 60rpx;"></image>
						<view style="font-weight: 600;margin-left: 20rpx;">
							报名成功!
						</view>
					</view>
					<view class="" style="display: flex;justify-content: space-between;margin: 40rpx;">
						<view style="border-radius: 8rpx;margin:40rpx 20rpx;border: 1rpx solid #ff0000;width: 160rpx;height: 60rpx;display: flex;align-items: center;justify-content: center;color: #ff0000;" @tap="$u.route({ url: 'pages/tabbar/activity/huodong?id='+id })">查看凭据</view>
						<view style="border-radius: 8rpx;margin: 40rpx 20rpx;border: 1rpx solid #ff000voucher_list0;width: 160rpx;height: 60rpx;display: flex;align-items: center;justify-content: center;color: #ff0000;" @tap="$u.route({ url: 'pages/activity/activity_detail?id='+id })">查看活动</view>
					</view>
				</view>
					
			</view>
		</view>
			
		
	</view>
</template>

<script>

	export default {
		data() {
			return {}
		},
		onLoad(e) {
			this.id = e.id
			console.log(this.id,'dsfsdfsdf');
		},
		methods:{

		}
		
	}
</script>

<style>
	page{
		background-color: #f4f4f5;
		height: 100vh;
	}

</style>
