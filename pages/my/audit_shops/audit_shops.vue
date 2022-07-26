<template>
	<view  class="cantainer">
		<view class="tabs">
			<u-tabs class="aaa" :list="list" active-color="#FF6D2E" :is-scroll="false" :current="current"
				@change="change"></u-tabs>
			<view class="x-line u-border-bottom"></view>
		</view>
		
		<view class="box" v-show="current == 0" >
			<view class="addf"  v-for="(item,index) in auditList" :key="index" >
				<view class="box-item">
					<image :src="item.userInfo.headImgUrl" mode=""></image>
					<view class="q1">
						<text class="u-font-32 c3 thick">{{item.userInfo.nickName}}</text>
						<text class="u-font-24 c9" v-show="item.userInfo.phone">手机号：{{item.userInfo.phone}}</text>
					</view>
					<view class="q2">
				<!-- 		<view>店铺类型</view> -->
					</view>
				</view>
				<view class="z-last">
					<text class="c9 u-font-24">申请时间：{{item.createTime}}</text>
					<view class="sf-selet">
						<view @tap="j_enter(item.userInfo.userId)">
							<image src="/static/ty.png" mode=""></image>
							<text>同意</text>
						</view>
						
						<view @tap="j_reject(item.userInfo.userId)">
							<image src="/static/jj.png" mode=""></image>
							<text>拒绝</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box" v-show="current == 1" >
			<view class="addf"  v-for="(item,index) in auditList" :key="index" >
				<view class="box-item">
						<image :src="item.userInfo.headImgUrl" mode=""></image>
					<view class="q1">
						<text class="u-font-32 c3 thick">{{item.userInfo.nickName}}</text>
						<text class="u-font-24 c9" v-show="item.userInfo.phone">手机号：{{item.userInfo.phone}}</text>
					</view>
					<view class="q2">
						<!-- <view>店铺类型</view> -->
					</view>
				</view>
				<view class="z-last">
					<text class="c9 u-font-24">申请时间：{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<view class="box" v-show="current == 2" >
			<view class="addf"  v-for="(item,index) in auditList" :key="index" >
				<view class="box-item">
						<image :src="item.userInfo.headImgUrl" mode=""></image>
					<view class="q1">
						<text class="u-font-32 c3 thick">{{item.userInfo.nickName}}</text>
						<text class="u-font-24 c9" v-show="item.userInfo.phone">手机号：{{item.userInfo.phone}}</text>
					</view>
					<view class="q2">
						<!-- <view>店铺类型</view> -->
					</view>
				</view>
				<view class="z-last">
					<text class="c9 u-font-24">申请时间：{{item.createTime}}</text>
				</view>
				<view class="z-last-add c9 u-font-24">拒绝原因：{{item.rejectReason}}</view>
			</view>
		</view>
		
		<none-msg :info='tsmsg' :goodsno='true' v-if="!auditList.length" ></none-msg>
			<u-popup v-model="reject_pop" mode="center" border-radius=10>
					<view class="pop-center">
						<text>是否拒绝成为推荐官</text>
						 <textarea  placeholder-style="color:#999" placeholder="填写拒绝理由" v-model="refundReason"/>
						<view class="btn-box">
							<view @tap="Jclose">取消</view>
							<view @tap="Jenter">确定</view>
						</view>
					</view>
			</u-popup>
			<u-modal  @confirm="confirm"  show-cancel-button="true" v-model="enterModel" title="是否添加该商家"  content="注：同意后，即可为此商家帮卖商品"></u-modal>
			<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tsmsg:"暂无数据",
				list: [{
						name: '待审核'
					},
					{
						name: '已同意'
					},
					{
						name: '已拒绝'
					},
				],
				reject_pop:false,
				refundReason:'',
				current: 0,
				enterModel:false,
				param:{
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": 0,
					"pageSize": 0,
					"searchValue": "",
					"status": 0
				},
				auditList:'',
				userId:'',
		
			}
		},
    onLoad(option){
      this.current = option.current || 0
    },
		onShow() {
			this.listItem(0)
		},
		methods: {
			j_enter(id){
				this.enterModel=true;
				this.userId = id
			},
			j_reject(id){
				this.reject_pop=true;
				this.userId = id
			},
			change(index) {
				this.current = index;
				this.listItem(index)
				
			},
			confirm(){
				let {userId} = this
				this.$u.api.applyPass(userId).then(e=>{
					this.listItem(0)
				}).catch(err=>{
					console.log(err)
				})
				// this.$refs.uToast.show({
				// 	title: '成功',
				// 	type: 'success',
				// })
			},
			listItem(index){
				this.param.status = index;
				let {param} = this 
				this.$u.api.helpApplyList(param).then(e=>{
					if(e){
						this.auditList = e.rows
						console.log(e.rows)
					}else{
						this.auditList = ''
					}
				})
			},
			Jclose(){
				this.reject_pop = false;
			},
			Jenter(){
				if(!this.refundReason){this.$tools.toast("请填写拒绝理由");return false;}
				
				let para ={
					"rejectReason": this.refundReason,
					"userId": this.userId
				}
				
				this.$u.api.applyReject(para).then(res=>{		//  
					this.reject_pop = false;
				}).catch(err=>{
					console.log(err)
				})
			},

		}
	}
</script>

<style lang="scss">
	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
		overflow: hidden;
	}


.box{
	.addf{
		.box-item{
			width: 750rpx;
			min-height: 136rpx;
			display: flex;
			align-items: flex-end;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			image{
				height: 116rpx;
				width: 116rpx;
			}
			.q1{
				height: 116rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
			}
			.q2{
				align-self: flex-start; 
				margin-top: 20rpx;
				margin-left: auto;
				view{
					background-color: #FFFFFF;
					width: 136rpx;
					height: 44rpx;
					line-height: 44rpx;
					color: #FF6D2E;
					text-align: center;
					border: 1px solid #FF6D2E;
					font-size: 24rpx;
					border-radius: 44rpx;
				}
				.c9{
					background: #999;
				}
			}
		}
		.z-last{
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			height: 60rpx;
			.sf-selet{
				display: flex;
				align-items: center;
				>view{
					margin-left: 30rpx;
					align-items: center;
					display: flex;
					image{
						height: 36rpx;
						width: 36rpx;
					}
					text{
						font-size: 22rpx;
						margin: 0 8rpx;
					}
				}
			}
		}
		.z-last-add{
			background: #FFFFFF;
			padding: 0 20rpx;
			padding-bottom: 20rpx;
		}
	}
}
	.pop-center{
		height: 530rpx;
		width: 710rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		display: flex;
		align-items: center;
		flex-direction: column;
		textarea{
			background-color: #F7F7F7;
			width: 648rpx;
			height: 240rpx;
			border-radius: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;
			margin-top: 20rpx;
			color: #333;
		}
		.btn-box{
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 160rpx;
			view{
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex: 1;
				text-align: center;
				font-size: 32rpx;
		
			}
			view:nth-child(1){
				height: 80rpx;
			
			}
			view:nth-child(2){
				height: 80rpx;
				color: #FF6D2E;
			}
		}
		text{
			font-size: 48rpx;
			margin-top: 40rpx;
		}
	}
</style>
