<template>
	<view class="cantainer">
		<view class="soso">
			<u-search class="set-width" height="76" placeholder="请输入推荐官名称" :clearabled="true" :show-action="false" v-model="param.searchValue"></u-search>
			<view class="x-enter" @tap="onSearch" >搜索</view>
		</view>
		<view class="box">
			<view class="box-item" v-for="(item,index) in attention" :key="index"  @tap="jumpMain(item.userId)">
				<image v-if="item.userInfo.headImgUrl" :src="item.userInfo.headImgUrl" mode=""></image>
				<image v-else src="/static/moren.png" mode=""></image>
			
				<view>
					<text class="u-font-32 c3 thick">{{item.userInfo.nickName || "默认推荐官"}}</text>
					<text class="u-font-24 c9">
<!--              <text>团员：{{item.activity.userCount || 0}}</text>-->
<!--              <text  class="u-margin-left-20">帮推官：{{item.activity.promotionUserCount || 0}} </text>-->
            <text>团员：{{item.userInfo.userCount || 0}}</text>
            <text  class="u-margin-left-20">帮推官：{{item.userInfo.promotionUserCount || 0}} </text>

          </text>
				</view>
			</view>
		</view>
		<node-msg v-if="!attention"></node-msg>
    <none-msg :info='tsmsg' :goodsno='true' v-if="!attention.length" ></none-msg>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        tsmsg:'您目前还没有绑定任何推荐官',
				attention:[],
				keyword:'',
        pageNum:1
			}
		},
    onReachBottom(){
      this.pageNum = (++this.pageNum)
      this.listfn()
    },
		onShow() {
		},
    onLoad(){
      this.listfn()
    },
		methods: {
			listfn(){
        let param = {
          "isAsc": "",
          "orderBy": "",
          "orderByColumn": "",
          "pageNum": this.pageNum,
          "pageSize": 10,
          "searchValue": ""
        }
				this.$u.api.bindtjg(param).then(e=>{
					if(e){
            this.attention = this.attention.concat(e.rows); //将数据拼接在一起
          }

				}).catch(err=>{
					console.log(err)
				})
			},
			onSearch(){
				this.param.searchValue = this.$u.trim(this.param.searchValue)
				this.listfn(this.param)
			},
      jumpMain(id){
        uni.navigateTo({
          url:"/pages/home_page/my_shop/my_shop?mainUserId="+id
        })
      }
		},

	}
</script>

<style lang="scss">
	.cantainer{
		background-color: #f7f7f7;
		min-height: 100vh;
		overflow: hidden;
	}
	.soso{
		background-color: #FFFFFF;
		height: 120rpx;
		margin: 2rpx 0 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		.set-width{
			width: 100%;
		}
		.x-enter{
			text-align: center;
			width: 114rpx;
			color: #333333;
			font-size: 30rpx;
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
			image{
				height: 116rpx;
				width: 116rpx;
			}
			>view{
				height: 116rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
			}
		}
	}

</style>
