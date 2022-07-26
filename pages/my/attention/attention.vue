<template>
	<view class="cantainer">
		<view class="soso">
			<u-search  class="set-width" height="76" :placeholder="titleinput" :clearabled="true" :show-action="false" v-model="searchValue"></u-search>
			<view class="x-enter" @tap="onSearch" >搜索</view>
		</view>

		<view class="box">
			<view class="box-item" v-for="(item,index) in attention" :key="index" @tap="jumpMain(item.userInfo.userId)" >
        <view class="additem" v-if="item.targetId != oneself">
          <image v-if="item.userInfo.headImgUrl" :src="item.userInfo.headImgUrl" mode=""></image>
          <image v-else src="/static/moren.png" mode=""></image>

          <view class="z-center">
            <text class="u-font-32 c3 thick">{{item.userInfo.nickName || "默认推荐官"}}</text>
            <text class="u-font-24 c9">
              <text>团员：{{item.userInfo.userCount || 0}}</text>
              <text v-if="role =='TJ' " class="u-margin-left-20">帮推官：{{item.userInfo.promotionUserCount || 0}} </text>
            </text>
          </view>
          <view :class="[item.subscribe == true  ? 'forbid' : '' ]" class="css-close" @tap.stop="j_close(item.targetId,index)">
            {{item.subscribe == true ? '已订阅' : '订阅' }}
          </view>
        </view>
<!--        <u-button  @tap="j_close(item.targetId,index,'success')"  v-if="item.subscribe" type="success"  size="mini" plain=true >订阅</u-button>-->
<!--        <u-button  @tap="j_close(item.targetId,index,'error')" v-if="!item.subscribe" type="error" size="mini" plain=true >取消订阅</u-button>-->

			</view>
		</view>
	
		<none-msg :info='tsmsg' :goodsno='true' v-if="!attention.length" ></none-msg>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tsmsg:"您目前还没有关注任何人",
				attention:[],
				keyword:'',
				searchValue:'',
				role:null,
				pageNum: 1,
				isclose:false,
				nowIndex:null,
        oneself:'',
        titleinput:''
				
			}
		},
		onLoad(option) {
			this.role = option.role
      if(this.role == "TJ"){
        this.titleinput = '请输入推荐官名称'
      }else{
        this.titleinput = '请输入帮推官名称'
      }
      this.oneself = uni.getStorageSync('tokenorid').userId;

			this.listfn()
		},
		onShow() {
		
		},
		onReady() {
			if(this.role == "TJ"){
				uni.setNavigationBarTitle({
				    title: '我关注的推荐官'
				});
			}else{
				uni.setNavigationBarTitle({
				    title: '我关注的帮推官'
				});
			}
		
		},
		onReachBottom(){
			this.pageNum = (++this.pageNum)
			this.listfn()
		},
		methods: {
			j_close(pro,index,param){
          uni.showLoading({
            title: '加载中',
            mask:true
          });
          this.$u.api.cancelSubscribe(pro).then(e=>{		//	订阅
            uni.hideLoading();
            this.nowIndex = index
            this.attention[index].subscribe = !this.attention[index].subscribe

          }).catch(err=>{
            console.log("err")
          })
			},
			listfn(){
				let	param = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": this.pageNum,
					"pageSize": 10,
					"searchValue": this.searchValue,
					"userRole": this.role
				}
				this.$u.api.attentionList(param).then(e=>{
					if(!e){
						return false
					}else{
						this.attention = this.attention.concat(e.rows); //将数据拼接在一起
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			onSearch(){
				this.searchValue = this.$u.trim(this.searchValue)
				this.attention = []
				this.listfn()
			},
      jumpMain(id){
        uni.navigateTo({
          url:`/pages/home_page/my_shop/my_shop?mainUserId=${id}`
        })
      }
		}
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
		  .additem{
        height: 156rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        background-color: #FFFFFF;
        margin-top: 20rpx;
        image{
          height: 116rpx;
          width: 116rpx;
          border-radius: 8rpx;
        }
        .z-center{
          height: 116rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20rpx;
        }
        .css-close{
          margin-left: auto;
          align-self: flex-end;
          font-size: 24rpx;
          padding: 4rpx 0;
          width: 90rpx;
          text-align: center;
          margin-bottom: 20rpx;
          background: #FF3030;
          border-radius: 6rpx;
          color: #FFFFFF;
        }
        .forbid{
          background-color: #FF3030;
          opacity: 0.4;
        }
      }
		}
	}

</style>
