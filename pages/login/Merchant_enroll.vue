<template>
	<view>
		<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;background: #ff0000;font-weight: 600;color: white;">
			<view style="margin: 30rpx;">申请成为商家</view>
			<view style="padding-bottom: 50rpx;">发起活动</view>
			
		</view>
		<view class="content-box">
			<view class="content-box">
				<view style="margin: 15rpx;">
					联系人:
				</view>
				<view class="" style="margin: 0 60rpx">
					  <u-input v-model="user.name" placeholder="请输入名称" maxlength="12" :type="'text'"  :border="true" @change="change"/>
				</view>
			</view>
			<view style="color: #999;margin-left: 100rpx;font-size: 22rpx;">
				提交后请注意接听客服电话
			</view>
			<view class="content-box">
				<view style="margin: 15rpx;">
					联系电话:
				</view>
				<view class="" style="margin: 0 60rpx">
					  <u-input v-model="user.phone" placeholder="请输入电话号码" maxlength="11" :type="'text'"  :border="true"/>
				</view>
			</view>
			
			<view class="content-box">
				<view style="margin: 15rpx;">
					所在地区:
				</view>
				<view class="" style="margin: 0 60rpx">
					<!--  <view class="" >
					  	{{user.address || '请选择锁在地区'}}
					  </view> -->
					  <u-input v-model="user.address" placeholder="请选择所在地区" :type="'text'" disabled :border="true" @click="show=true"/>
					  <u-picker mode="region" v-model="show" @confirm="address_func"></u-picker>
				</view>
			</view>
			
			<view class="content-box">
				<view style="margin: 15rpx;">
					活动类型:
				</view>
				<view class="" style="margin: 0 60rpx">
					<u-select v-model="activity_show" :list="active"  @confirm="select_activity" ></u-select>
				<!-- 	<u-action-sheet  v-model="activity_show" @click="select_activity"></u-action-sheet> -->
					<u-button @click="activity_show = true">{{activity_value || '请选择活动类型'}}</u-button>
						
				
				</view>
			</view>
			
			<view style="margin: 200rpx 180rpx;">
				<!-- <u-button style="background: #ff0000;width: 200rpx;" ripple="true" >申请入驻</u-button> -->
				<button style="background: #ff0000;color: white;font-weight: 600;" @click="submit">申请入驻</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	export default{
		data() {
			return {
				user:{
					name:'',
					phone:'',
					address:'' || '请选择所在地区'
				},
				show: false,
				
				active: [{
					value:1,
					label: '会议活动',
				}, {
					value:2,
					label: '亲子活动'
				}, {
					value:3,
					label: '旅游活动' 
				},
				{
					value:4,
					label:'招商活动'
					
				},
				{
					value:5,
					label:'美食活动'
				}
				],
				activity_show:false,
				activity_value:''
				
				
					
				
			}
		},
		methods:{
			submit(){
				if(!this.user.name){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if(!this.user.phone){
					uni.showToast({
						title:'请输入联系方式',
						icon:'none'
					})
					return
				}
				if(!this.user.address){
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
					return
				}
				if(!this.activity_value){
					uni.showToast({
						title:'请选择活动类型',
						icon:'none'
					})
					return
				}
				uniCloud.callFunction({
					name:'getEnrollSubscribe',
					data:{
						name:this.user.name,
						phone:this.user.phone,
						address:this.user.address,
						type:this.activity_value,
						create_date:Date.now()
					}
				}).then(res=>{
					uni.showToast({
						title:'申请成功',
						icon:'none'
					})
				})
				
			},
			address_func(e){
				console.log(e)
				this.user.address = e.province.label+' '+e.city.label+' '+e.area.label
			},
			select_activity(e){
				console.log(e)
				this.activity_value = e[0].label
			}
		}
	}
</script>

<style>
	.content-box{
		margin: 20rpx;
	}
</style>
