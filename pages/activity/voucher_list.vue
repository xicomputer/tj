<template>
	<view class="">
		<view>
			<view  v-if="!dataList.length" style="margin-top: 50rpx;">
				<u-empty text="暂无凭证" mode="list" ></u-empty>
			</view>
			<view style="margin: 20rpx;" v-for="(item, index) in dataList" :key="index">
				<view style="background: #fff;box-shadow: 1rpx 1rpx 10rpx 1rpx;width: 100%;height: 340rpx;border-radius: 16rpx;display: flex;flex-direction: column;">
					<view style="font-weight: 600;font-size: 36rpx;margin:20rpx 40rpx;">{{ item.title }}</view>
					<view style="display: flex;justify-content: space-between;margin:0rpx 40rpx;">
						<view style="color: #999;">{{ item.ticket_describe }}</view>
						<view>x1</view>
					</view>
					<view class="" style="color: #999;margin:10rpx 40rpx;">
						<view>报名时间:{{ item.payDate | date }}</view>
					</view>
					<view style="color: #999;margin:10rpx 40rpx;font-weight: 100;display: flex;justify-content: space-between;">
						<view style="font-weight: 600;color: #000000;">{{ item.dataList.cause }}</view>
						<view style="font-weight: 600;color: #000000;">{{ item.state }}</view>
					</view>
					<view style="color: white;font-weight: 600;margin:20rpx 40rpx;display: flex;justify-content: space-around;">
						<view @click="voucherShow" style="background: #ff0000;border-radius: 8rpx;width: 180rpx;height: 60rpx;display:flex;justify-content: center;align-items: center;">
							查看凭证
						</view>
						<view @click="show1 = true" style="background: #ff0000;border-radius: 8rpx;width: 180rpx;height: 60rpx;display:flex;justify-content: center;align-items: center;">
							报名信息
						</view>
					</view>
				</view>
				<u-popup v-model="show" mode="center" height="50%" width="80%">
					<view style="">
						<view style="display: flex;justify-content: center;align-items: center;font-weight: 600;margin: 20rpx;">{{ item.dataList.name }}</view>
						<!-- <view style="margin: 10rpx 40rpx;">双击编辑文本</view> -->
						<view style="margin: 10rpx 40rpx;display: flex;justify-content: space-between;">
							<view>报名项目</view>
							<view style="display: flex;flex-direction: column;text-align: right;">
								<text>{{ item.title }}</text>
								<text>X{{ item.limit_num }}</text>
							</view>
						</view>
						<view style="margin: 10rpx 40rpx;">报名时间:{{ item.payDate | date }}</view>
						<view style="width: 160rpx;margin: 0 auto;text-align: center;margin-top: 100rpx;">
							<canvas id="qrcode" canvas-id="qrcode" style="z-index: 0;" :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
						</view>
					</view>
				</u-popup>
				<u-popup v-model="show1" mode="center" width="80%" border-radius="16">
					<view style="display: flex;flex-direction: column;justify-content: space-around;">
						<view v-for="(it,idx) in item.info" :key="idx" style="display: flex;justify-content: space-between;margin:10rpx 40rpx;margin-top: 20rpx;">
							<view>
								{{it.name}}
							</view>
							<view>{{it.value}}</view>
						</view>
					</view>
					<view class="confrim-btn" style="margin-top: 40rpx;display: flex;justify-content: space-around;">
						<u-button @click="show1 = false">修改</u-button>
						<u-button @click="show1 = false">确定</u-button>
					</view>
				</u-popup>
			</view>
			<view @click="fabClick">
				<fab ></fab>
			</view>
			<view></view>
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
const dbCmd = db.command;
import fab from '@/components/fab.vue'
import uQRCode from '@/uni_modules/u-qrcode';
export default {
	components:{fab},
	data() {
		return {
			dataList: [],
			aid: '',
			show: false,
			show1: false,
			size: 80
		};
	},
	onLoad(e) {
		this.aid = e.id;
		this.loadData(e.id);
	},
	methods: {
		fabClick(){
			console.log(this.dataList[0],'ddd');
				uni.openLocation({
					latitude: this.dataList[0].dataList.latitude,
					longitude: this.dataList[0].dataList.longitude,
					success: function() {
						console.log('success');
					}
				});
			
			
		},
		loadData(id) {
			db.collection('enroll_info')
				.where({
					openid: uni.getStorageSync('userinfoKey').openId || getApp().globalData.OPENID,
					'dataList._id': id
				})
				.get()
				.then(res => {
					console.log(res, 'dddd');
					this.dataList = res.result.data;
				});
		},
		voucherShow() {
			this.buildQrcode();
		},
		buildQrcode() {
			this.show = true;
			const ctx = uni.createCanvasContext('qrcode');
			const uqrcode = new uQRCode(
				{
					text: '大旭哥',
					size: this.size
				},
				ctx
			);
			uqrcode.make();
			uqrcode.draw();
		}
	}
};
</script>

<style>
page {
	background-color: #f4f4f5;
	height: 100vh;
}
</style>
