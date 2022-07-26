<template>
	<view >
		<view  :class="{bjorange:allshow}" class="x-right-now" style="" v-if="!apiInfo.tj">
				<none-msg :info='tsmsg' :color="'#717171'" :setheight="'50px'"  :goodsno2='true' ></none-msg>
								
		</view>
		<view  v-else>
			<view style="width: 514rpx;height: 364rpx;margin: 0 auto;">
				<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/goods.png" class="imgs"></image>
			</view>
			<view  style="text-align: center;">
				<text style="font-size: 30rpx;font-weight: 800;">如何推荐好物</text>
			</view>
			
			<view style="text-align: center;padding: 10rpx 0;" @click="jumpexplain()">
				<text style="color:#999999;font-size: 20rpx;">不会使用，查看推荐教程和案例></text>
			</view>
			
			<navigator class="content" url="/pages/goods/newgoods_recommend/new_shop">
				<view class="content_box1" style="line-height: 200rpx;padding:0 30rpx;box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;">
					<image src="/static/minico.png" class="imgs_login"></image>
					<text class="font-box1" style="flex:1;margin-left: -200rpx;">推荐官专属选品推荐</text>
					<u-icon name="arrow-right" color="#000000" size="28"></u-icon>
				</view>
			</navigator>
			<view class="floor" >
				<navigator class="floor-box" url="/pages/my/i_recommend/i_recommend" style="box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/tuijianhaowu_iconhuojian.png" class="imgs_login" ></image>
					<text class="font-box1">我发布的商品</text>
				</navigator>
				<view  class="floor-box" @click="mymainShop" style="box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/tuijianhaowu_icondianpu.png" class="imgs_login" ></image>
					<text  class="font-box1">我的主铺</text>
				</view>
				
			</view>
		</view>
		
		<u-tabbar :list="tabbar" ></u-tabbar>
	</view>
</template>

<script>
	import permiss from '@/common/logic/permiss'
	export default {
		data() {
			return {
				tabbar:{},
				Style:{
					height:0,
				},
				tsmsg: '您还不是推荐官，无法发布商品！',
				apiInfo:{}
			}
		},
		onShow() {
			this.sysUserInfo()
		},
		methods:{
			
			sysUserInfo() {  //拿数据
			  this.$u.api.getUserInfo().then(e => {
			    // this.isTJ = e.tj
				this.apiInfo = e
					
				
			    this.$store.commit('tabAuth',e)
			    permiss(this).then(()=>{
			      this.tabbar = this.$store.state.tab
			    })
			  }).catch(err => {
			    console.log(err)
			
			  })
			},
			jumpexplain(){
				uni.navigateTo({
					url:"/pages/tabbar/fine_goods/explain"
				})
			},
			
			_window(){
				this.Style.height = uni.getSystemInfoSync().windowHeight * 2 + 150
				 
			},
			mymainShop(){
				let mainUserid = uni.getStorageSync('tokenorid').userId;
				uni.navigateTo({
						url:"/pages/home_page/my_shop/my_shop?mainUserId="+mainUserid
				})
			},
		
			
		},
		onload() {
			this.tabbar = this.$store.state.tab
			this._window()
		}
	}
		
</script>
	<style>
		page{
			background: #ECECEC;
		}
	</style>
<style lang="scss" scoped>
	
	.imgs{
		width:100%;
		height: 100%;
		// margin-left:20px;
	}
	.imgs_login{
		width: 80rpx;height: 80rpx;
	}
	.content{
		width: 660rpx;
		height: 200rpx;
		border-radius: 16rpx  ;
		background: #FFFFFF;
		line-height: 200rpx;
		margin: 20rpx auto;
	}
	.content_box1{
		// position: relative; top: 66rpx;left: 20rpx;
		display: flex;align-items: center;justify-content: center;
		
	}
	.font-box1{
		color: #333333;font-size: 30rpx;
		font-weight: 600;
		display: flex;align-items: center;justify-content: center;
		// position: relative;
		// bottom: 25rpx;
		// left: 40rpx;
	}
	.icon-box1{
		color: #b6b6b6;font-weight: 800;font-size: 40rpx;
		position: relative;
		left: 250rpx;
		bottom: 25rpx;
	}
	.floor{
		width: 660rpx;
		height: 200rpx;
		display: flex;align-items: center;justify-content: space-between;
		margin: 30rpx auto;
		.floor-box{
			width: 320rpx;height: 200rpx;background: #fff;border-radius: 16rpx;line-height: 200rpx;display: flex;align-items: center;justify-content: space-evenly;
		}
	}
	.floor .floor_left{
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 8pt  8pt  8pt  8pt  ;
		width: 340rpx;
		float:left;
		
	}
	
	.floor .floor_right{
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 8pt  8pt  8pt  8pt  ;
		width: 270rpx;
		float: left;
		margin-left: 40rpx;
	}
	
</style>
