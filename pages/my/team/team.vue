<template>
	<view class="cantainer">


		<view class="x-sort"  style=" display: none;">
			<view class="x-left">
				<text>帮卖次数</text>
				<view>
					<u-icon class="font-m" name="arrow-up-fill" color="#ff0000" size="20"></u-icon>
					<u-icon class="font-m" name="arrow-down-fill" color="#ff0000" size="20"></u-icon>
				</view>
				<view>
					<u-icon class="font-m" name="arrow-up-fill" color="#ff0000" size="20"></u-icon>
					<u-icon class="font-m" name="arrow-down-fill" color="#ff0000" size="20"></u-icon>
				</view>
			</view>
			<view class="x-right">
				<text class="c9">购买次数</text>
				<view>
					<u-icon class="font-m" name="arrow-up-fill" color="#c999999" size="20"></u-icon>
					<u-icon class="font-m" name="arrow-down-fill" color="#c999999" size="20"></u-icon>
				</view>
			</view>
		</view>
		<view v-show="attention">
			<view class="box" >
				<view class="box-item" v-for="(item,index) in attention" :key="index" >
					<view class="f-title">
						<image :src="item.userInfo.headImgUrl" mode=""></image>
						<view>
              <text v-if="item.userInfo.tj" >推荐官</text>
              <text v-else-if="apiInfo.bt" >帮推官</text>
              <text v-else >团员 </text>
						</view>
					</view>
					<view class="f-right">
						<text class="u-font-32 c3 thick">{{item.userInfo.nickName}}</text>
						<view v-if="item.browseCount">
							<text class="u-font-24 c9">浏览次数：{{item.browseCount}}</text>
							<text class="u-font-24 c9 u-margin-left-20">购买次数：{{item.buyCount || 0 }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<none-msg :info='tsmsg' :goodsno='true' v-if="!attention.length" ></none-msg>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tsmsg:'您还没有团队成员，快去发展吧！',
				total:0,
				pageNum:1,
				pageSize:10,
				attention:[],
				// idcard:{
				// 	角色:团员.TY 帮推官.BT 推荐官.TJ,可用值:TY,BT,TJ
				// }
			}
		},
		onShow() {
			this.listfn()

		},
		onReachBottom(){
			
			let {total} = this
			this.pageNum = (++this.pageNum)
			console.log(this.pageNum , Math.ceil(total/this.pageSize))
			if(this.pageNum > Math.ceil(total/this.pageSize)){
				console.log("stop")
				return false
			}
			console.log("stop2")
			this.listfn()
			
		},
		methods: {

			listfn(){
				let param={
						"isAsc": "",
						"orderBy": "",
						"orderByColumn": "",
						"pageNum": this.pageNum,
						"pageSize": this.pageSize,
						"searchValue": ""
					}
				this.$u.api.memberList(param).then(e=>{
					if(e){
						this.total =e.total
						this.attention = this.attention.concat(e.rows); //将数据拼接在一起
					}else{
							this.attention = []
					}
				
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
	.x-sort{
		display: flex;
		padding: 0 78rpx;
		height: 116rpx;
		justify-content: space-between;
		align-items: center;
		.x-left{
				display: flex;
				align-items: center;
				>view{
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
				}
		}
		.x-right{
				display: flex;
				align-items: center;
				>view{
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
				}
		}
	}
	.box{
		.box-item{
			height: 156rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			.f-title{
				height: 116rpx;
				width: 116rpx;
				position: relative;
				image{
					height: 116rpx;
					width: 116rpx;
				}
				view{
					height: 28rpx;
					width: 116rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					text-align: center;
					font-size: 24rpx;
					line-height: 28rpx;
					color: #FFFFFF;
					background: #ff0000;
				}
			}
			.f-right{
				height: 116rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
				view{
					display: flex;
		
				}
			}
		}
	}

</style>
