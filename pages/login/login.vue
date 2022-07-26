<template>
	<view class="cantainer">
		<view class="box">
			<image src="../../static/login.png" mode="widthFix" lazy-load></image>
		
			<view @tap="getUserInfo">一键授权登录</view>
<!--			<text @tap="qxsq">取消授权登录</text>-->
      <navigator open-type="exit" target="miniProgram">取消授权登录</navigator>

		</view>
		
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				subMchId:'',
				state:'未认证',
			}
		},
    onLoad(){
    },
		methods: {
			jump(){
				uni.switchTab({
				    url: '/pages/tabbar/index/index'
				});
			},
			postuser(form){
				uniCloud.callFunction({
					name:'postuser',
					data:{...form}
				}).then(res=>{
					console.log(res);
					uni.$emit('app-before-ready')
				})
			},
			getUserInfo(){     // 授权
				let that = this
				uni.login({
					success(res) {
						console.log('logo页微信code',res.code) //保存token

						that.$u.api.logoin(res.code).then(el=>{
								
								getApp().globalData.OPENID = el.openId
								uni.setStorage({
									key:'tokenorid', data:el,
								});
								that.$u.api.getUserInfo().then(e => {
									console.log('数据',e);
									
									var form = {}
									if(e.hasSupplierAccount && typeof e.mchidApplyDTO != 'undefined' && e.mchidApplyDTO.applymentState == 7){
										that.state = '已认证';
										form = { ...e, state: '已认证', subMchId: e.mchidApplyDTO.subMchid };
										that.postuser(form);
										return
									}else{
										form = { ...e, state: that.state, subMchId: that.subMchId, supplierId: '' };
										that.postuser(form);
									}
									
									uni.setStorageSync({
										key: 'userinfoKey',
										data: e,
									});
								}).catch(err => {
									console.log(err)
								
								})
						}).catch(err=>{
							console.log("错误",err)
						})
						
						
					}
				})

				uni.getUserProfile({
					desc:'用于信息展示',
					success:param=>{
						console.log("用户信息",param)
						uni.setStorage({
							key:'userinfoKey',data:param.userInfo,
						});
						let data={
							"headImgUrl":param.userInfo.avatarUrl,
							"nickName": param.userInfo.nickName,
						}
						that.$u.api.pushHead(data).then(e=>{

						}).catch(err=>{
							console.log(err)
						})
					// uni.switchTab({
					// 	url:"../tabbar/index/index",
          //   success: function(e) {
          //     var page = getCurrentPages().pop();
          //     if (page == undefined || page == null) return;
          //     page.onLoad();
          //   }
					// })
            uni.navigateBack({
              delta: 1
            });
					}
				});
			},
			qxsq(){
				uni.switchTab({
					url:"../tabbar/index/index",
          success: function(e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
				})
			}
		}
	}
</script>

<style lang="scss">
	.cantainer{
		min-height: 100vh;
		overflow: hidden;
	}
	.box{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 750rpx;
		}
		view{
			width: 582rpx;
			height: 90rpx;
			background: #FF6D2E;
			border-radius: 46rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			line-height: 90rpx;
			text-align: center;
			margin-top: 88rpx;
			margin-bottom: 50rpx;
		}
    navigator, text{
			color: #999999;
			font-size: 32rpx;
		}
	}
	
</style>
