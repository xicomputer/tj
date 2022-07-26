<template>
	<view class="cantainer">
		
		<view class="top-head">
			<image src="/static/haowu.png" mode=""></image>
			<text class="font1">如何推荐好物</text>
			<text @tap="jumpexplain" class="font2">不会使用，查看推荐教程和案例> </text>
		</view>
		
		<view class="box-img">
			<image src="../../../static/apply.png"  mode='widthFix' lazy-load></image>
			<view  class="btn"  v-if="sqState== '0' "><text style="background-color: #ccc;">待审核</text></view>
			<view class="btn" @tap="jumpIndex"   v-else-if="sqState== '1' "><text style="background-color: #f20c00"  class="u-font-28">你已成为帮推官，点击进入云仓商城</text> </view>
			<view class="btn"   v-else-if= "sqState== '2' "  @tap="apply">
				<text>重新申请</text>
			</view>
			<view class="btn"    v-else @tap="apply"> <text>申请</text></view>
		</view>
		
		<view class="zhdjj"   v-if= "sqState == '2' " >	原因：你不符合我的要求，不合适带货，不好意思</view>	
		<!-- TODO -->

		<me-login-popup 
			:show='showLoginPopup'
			@hideEvent='loginHide'
		></me-login-popup>

	</view>
</template>
<!-- 0 待审核   
undefind 申请
2重新申请 -->
<script>
	export default {
		data() {
			return {
				showLoginPopup:false,
				sqState:'',
				userId:'',
				userIdCard:'',
				scene:''
			}
		},
		onLoad(option) {
			// console.log(option.userId)
			// this.userId = option.userId || {}

			let scene =option.scene
      this.scene= scene

			uni.getStorage({
				key:'tokenorid',
				success:res=>{
            if(scene){
              //二维码进来
              this.pjseo(this.scene)
              console.log("二维码进来")
            }else{
              //分享链接进来
              this.userId = option.userId
              this.applyState( this.userId)
              console.log("分享链接进来")
            }
				},
				fail:err=>{
					this.getToken().then(e=>{
            if(scene){
              //二维码进来
              this.pjseo(this.scene)
            }else{
              //分享链接进来
              this.userId = option.userId
              this.applyState( this.userId)
            }
					})
				}
			});
			
		},
		methods: {
      intoState(){

      },
			getToken(indexEvent){
				return	new Promise((resolve,reject)=>{
					let that=this
					uni.login({
						success(res) {
							that.$u.api.logoin(res.code).then(el=>{
									uni.setStorage({
										key:'tokenorid', data:el,
                    success:function (){
                      resolve(el)
                    }
									})
									
									
							}).catch(err=>{
								    reject(err)
							})
						}
					})
				})
			},
			loginHide(e){
				console.log(e)
				this.showLoginPopup=false;
				if(e){
					this.getUserInfo();
					// this.userLogin();
				}
			},
			getUserInfo(){     // 授权
				uni.getUserProfile({
					desc:'用于信息展示',
					success:res=>{
						console.log("用户信息",res.userInfo)
						
						uni.setStorage({
							key:'userinfoKey',data:res.userInfo,
						});
						let data={
							"headImgUrl":res.userInfo.avatarUrl,
							"nickName": res.userInfo.nickName,
						}
						this.$u.api.pushHead(data).then(e=>{
							console.log("上传头像姓名",e)
							this.$tools.toast("授权成功请重新申请")
						}).catch(err=>{
							console.log(err)
						})
					}
				});
			},
			apply(){
					let {avatarUrl} = uni.getStorageSync('userinfoKey');
					if(!avatarUrl){
						this.showLoginPopup = true
						return false
					};
					
					let param = this.userId 
					this.$u.api.hhelpApplyList(param).then(e=>{
						this.$tools.toast("申请中")
						this.applyState(param)
					}).catch(err=>{
						console.log(1111,err)
					})
			},
			applyState(userId){
				this.$u.api.isApplyState(userId).then(e=>{
						if(e){
							this.sqState = e.status
						}else{
							this.sqState = e
						}
						
				}).catch(err=>{
					console.log(err)
				})
			},
			jumpIndex(){
				uni.switchTab({
					url:"/pages/tabbar/fine_goods/fine_goods"
				})
			},
			pjseo(send){
				console.log(send)
				this.$u.api.getAppletCodeScene(send).then(e=>{
					// this.dealerId = e.dealerId
					// let jxsId = e.dealerId
					this.userId = e.userId
					let param = e.userId
					this.applyState(param)
					
				}).catch(err=>{
					console.log(err)
				})
			},
			jumpexplain(){
				uni.navigateTo({
					url:"/pages/tabbar/fine_goods/explain"
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-head{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 26rpx;
		image{
			width: 514rpx;
			height: 364rpx;
		}
		.font1{
			font-size: 30rpx;
			font-family: PingFang SC, Arial;
			font-weight: bold;
			line-height: 40rpx;
		}
		.font2{
			color: #999999;
			font-size: 20rpx;
		}
	}
	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
		overflow: hidden;
		padding: 20rpx;
		
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.zhdjj{
		margin-top: 66rpx; background-color: #FFFFFF; color: #FF0000; height: 200rpx; line-height: 200rpx; width: 710rpx; text-align: center;
	}
	.box{
		min-height: 100vh;
		display: flex;
	
		align-items: center;
		flex-direction: column;
		.y1{
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 60rpx;
		}
		image{
			height: 80rpx;
			width: 80rpx;
			margin: 10rpx 0;
		}
		.y2{
			font-size: 32rpx;
			font-weight: bold;
	
		}
		.y3{
			font-size: 32rpx;
			font-weight: bold;
			color: #999999;
			margin-top: 10rpx;
		}
		.y4{
			margin-top: 100rpx;
			font-size: 36rpx;
			font-weight: bold;
		}
		view{
			border: 1px solid #cccccc;
			padding: 10rpx 0;
			width: 200rpx;
			border-radius: 8rpx;
			text-align: center;
			position:fixed;
			bottom: 100rpx;
			left: 50%;
			margin-left: -100rpx;
		}
	}
	.box-img{
		height: 648rpx;
		position: relative;
		width: 100%;
		border-radius: 20rpx;
		position: relative;
		image{
			width: 100%;
			height: 648rpx;
			border-radius: 20rpx;
		}
		.btn{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: absolute;
			bottom: 84rpx;
			
			text{
					background: #30D57D;
					padding: 18rpx 70rpx;
					border-radius: 60rpx;
			}
		}
		view{
			min-height: 92rpx;
			border-radius: 46rpx;
			position:absolute;
			left: 0;
			font-size: 34rpx;
			color: #FFFFFF;
			position: absolute;

			
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.c9{
			background-color: #999999;
		}
	}
	
</style>
