<template>
	<view>
		<view class="img-node" :style="{paddingTop:setheight}">
			<image v-show="goodsno"  src="/static/cl1.png" mode=""></image>
			<image v-show="orderno"  src="/static/cl2.png" mode=""></image>
			<image v-show="goodsno2" src="/static/cl3.png" mode=""></image>
			<text :style="{color:color}">{{info}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"none-msg",
		props: {
      info:{
        type: String,
        default:'暂无数据'
      },
      goodsno:{
        type: Boolean,
        default: false
      },
      orderno:{
        type: Boolean,
        default: false
      },
      goodsno2:{
        type: Boolean,
        default: false
      },
      setheight: {
        type: String,
        default:'280rpx'
      },
	  color:{
		  type:String,
		  default:'#999999'
	  }
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.img-node{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width: 300rpx;
			height: 300rpx;
		}
		text{
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	}
</style>
