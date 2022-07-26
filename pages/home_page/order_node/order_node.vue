<template>
	<view class="container">
		<view class="box">
			<textarea maxlength=50 @input="numerical" v-model="textareaValue" class="texta"  placeholder="请填写备注最多50个字"/>
			<text>{{figure}}/50</text>
		</view>
		<view class="x-button" @tap="tvalueBlack">
			确定
		</view>
	
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				figure:0,
				textareaValue:''
			}
		},
		methods: {
			numerical(e){
				this.figure = e.detail.cursor
			},
			tvalueBlack(){
				let {textareaValue} = this;
				uni.redirectTo({
				    url: "../place_order/place_order?textvalue="+textareaValue
				});
			}
		}
	}
</script>

<style lang="scss">
	.box{
		height: 206rpx;
		width: 710rpx;
		margin: 0 auto;
		position: relative;
		text{
			position: absolute;
			bottom: 10rpx;
			right: 25rpx;
			color: #ccc;
		}
	}
	.texta{
		border: 1px solid #ccc;
		height: 206rpx;
		width: 710rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
	
	}
	.x-button{
		width: 710rpx;
		height: 72rpx;
		background: linear-gradient(270deg, #F64756 0%, #FC5800 100%);
		box-shadow: 0rpx 6rpx 12rpx rgba(235, 35, 15, 0.1);
		border-radius: 44rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 72rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		margin-top: 40rpx;
	}
</style>
