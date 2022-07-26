<template>
	<view class='me-fx-col-c-c login-popup' v-if='show'>
		<view class='popup-content'>
			<view class='me-fx-row-c-c title-box'>温馨提示</view>
			<view class='me-fx-row-c-c content-text'>
				先登录才能使用小程序哦
			</view>
			<view class='me-fx-row-sb-c'>
				<button class='btn cancel-btn' @tap='btnClick(0)'>取消</button>
				<button class='btn confirm-btn' @tap='btnClick(1)'>确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"wx-login-popup",
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			btnClick(num){
				this.$emit('hideEvent',num);
			}
		}
	}
</script>

<style lang="scss">
	.me-fx-col-c-c{
		    display: flex;
		    flex-direction: column;
		    justify-content: center;
		    align-items: center;
	}
	.me-fx-row-c-c{
		    display: flex;
		    justify-content: center;
		    align-items: center;
	}
	.me-fx-row-sb-c{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.login-popup{
		position:fixed;top:0;left:0;
		z-index: 1000;
		width:100%;height:100%;
		background-color:rgba(0,0,0,0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		.popup-content{
			width:690rpx;border-radius:20rpx;
			background-color:#fff;overflow:hidden;
			.title-box{height:100rpx;font-size:30rpx;font-weight:bold;}
			.content-text{height:200rpx;font-size:32rpx;color:#999;}
			.btn{
				flex:1;font-size:32rpx;height:90rpx;
				line-height:90rpx;border-radius:0;
			}
			.cancel-btn{background-color:#fff;}
			.confirm-btn{
				background-color:#00AFFF;color:#fff;
			}
		}
	}
</style>
