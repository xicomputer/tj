<template>
	<view class="cantainer">
    <common ref="childa"></common>

		<view class="x-function" v-if="userInfo.tj ">
			<!-- <view class="x-title">推荐官/商家推荐官</view> -->
			<view class="down-head">
				<navigator hover-class="none" url="/pages/my/money_box/money_box" >
					<image src="/static/my1.png" mode=""></image>
					<text>明细</text>
				</navigator>
				<navigator hover-class="none" url="/pages/my/i_recommend/i_recommend" >
					<image src="/static/xz4.png" mode=""></image>
					<text> 我发布的商品</text>
				</navigator>
				<view @tap="mymainShop" >
					<image src="/static/xz5.png" mode=""></image>
					<text>我的主铺</text>
				</view>
				<navigator hover-class="none" url="/pages/my/my_shops/my_shops" >
					<image src="/static/xz7.png" mode=""></image>
					<text>我的帮推官</text>
				</navigator>
				<view hover-class="none"   @click="parentF">
					<image src="/static/xz6.png" mode=""></image>
					<text>招募帮推官</text>
				</view>
				<navigator hover-class="none" url="/pages/my/audit_shops/audit_shops" >
					<image src="/static/g4.png" mode=""></image>
					<text>帮推官审核</text>
					<view v-if="redDot" class="dw"></view>
				</navigator>
<!--				<navigator hover-class="none" url="/pages/my/nokf/nokf" >-->
<!--					<image src="/static/g2.png" mode=""></image>-->
<!--					<text>发起关联商家</text>-->
<!--				</navigator>-->
<!--				<navigator hover-class="none" url="/pages/my/nokf/nokf" >-->
<!--					<image src="/static/g2.png" mode=""></image>-->
<!--					<text>发起关联特约官</text>-->
<!--				</navigator>-->

			</view>
		</view>
		
		<view class="x-head" v-if="dealerNameList.length">
		<!-- 	<view class="x-step u-border-bottom">
				<view class="x-top">
					<text class="active">1</text>
					<text>2</text>
					<text>3</text>
				</view>
				<view class="x-font">
					<text>选择推荐商品</text>
					<text>发布推荐商品</text>
					<text>分享推荐商品</text>
				</view>
			</view> -->
<!--      <view class="btn-list">-->
<!--        <view class="common" :class="ftitleIndex == index ? 'active' : '' "  v-for="(item,index) in dealerNameList" @tap="dealerNameFn(index, item.dealerId)"-->
<!--              :key="index">{{item.nickName}}</view>-->
<!--      </view>-->

    <view class="tyll">
      <text><text class="fontx">让生意变得更简单</text></text>
    </view>
    <view class="boxscr">

      <scroll-view class="btn-list u-border-bottom" scroll-x="true" >
        <view class="box-common">
          <view class="common"
                :class="ftitleIndex == index ? 'active' : ''"
                v-for="(item,index) in dealerNameList"
                @tap="dealerNameFn(index, item.dealerId)"
                :key="index">{{item.nickName}}链路
          </view>
        </view>
      </scroll-view>

      <scroll-view class="btn-list-f"  scroll-x="true"  v-if="nameShow.length" >
        <view class="box-common">
          <view class="common"
                style="font-size: 38rpx"
                :class="titleIndex == index ? 'active' : '' "
                v-for="(item,index) in nameShow"
                @tap="selectTitle(index, item.supplierId)"
                :key="index">{{item.supplierName | ellipsis}}
          </view>
        </view>
      </scroll-view >
    </view>

		</view>

		<view class="x-body" v-if="nameShow.length">
			<view class="x-search">
				<view class="s-item">
					<u-search height="72" placeholder="请搜索商品名称" :clearabled="true" :show-action="false"
						v-model="keyword"></u-search>
				</view>
				<!-- 	<view class="x-btn">复制已有团</view> -->
			</view>
			<view class="sst">
				<view class="x-left">
					<view :class="twoIndex == index ? 'action' : '' " @tap="classify(index,item.supplierId)"
						v-for="(item,index) in goodsCategoryList" :key="index">{{item.categoryName}}</view>
				</view>
				<view class="x-right">
					<view class="list-item" v-for="(item,index) in goodsList" :key="index">
						<view class="x-one">
							<image :src="item.thumbnail" mode=""></image>
							<view class="bwm">
								<view class="u-line-2 u-font-30 thick">{{item.commodityName}}</view>
								<text class="c9 u-font-24">库存：{{item.totalStock}}</text>
								<text class="orange u-font-26">推荐价:￥{{item.showPrice}}</text>
							</view>
						</view>
						<view class="x-two">
							<view class="q1">
								<view>佣金奖励:￥{{item.showCommission}}</view>
								<view>食品商品不支持退款（包退换）</view>
							</view>
							<view class="xbtn" :class="item.activityStatus == 1 || item.activityStatus == 2 ? 'c9' :''"
								@tap="jumpTwo(item)">带货</view>
						</view>
					</view>
          <view class="img-node"  v-if="!goodsCategoryList.length">
            <image  src="/static/cl3.png" mode=""></image>
            <text>亲，没有推荐商品哦！</text>
          </view>

				</view>
			</view>
		</view>
		<none-msg v-else :info='tsmsg' :goodsno2='true'></none-msg>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				tsmsg: '亲，没有推荐商品哦！',
        ftitleIndex:0,
				keyword: '',
				nameShow: [],
				goodsCategoryList: [], //分类
				goodsList: [],         //商品列表
				titleIndex: 0,
				twoIndex: 0,
				pageNum: 1,
				pageSize: 10,
				total: 0,
				userInfo:{},
        redDot:false,
        dealerNameList:[]
			}
		},
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 5) {
          return value.slice(0, 5) + "...";
        }
        return value;
      }
    },
    onShareAppMessage(event) {
      let {nickName,userId} = uni.getStorageSync('tokenorid');
      //分享详情
      return {
        title: `${nickName}邀请您成为TA的帮推官！`,
        path: `pages/home_page/my_shop/my_shop?mainUserId=${userId}&enterBT=BT`,
        imageUrl: '/static/fxtp.jpg',
      };
    },
		onLoad() {
			this.goodsList = [];
      this.sysUserInfo()
      // this.dealerListApi()
      this.dealerListApi()
		},
		onShow() {
      // this.listItem()

    },
		onReachBottom() {
			this.pageNum++
			this.pacKGoodsList(this.twoIndex, this.pageNum)
		},
		methods: {
      sysUserInfo(){  //拿数据
        this.$u.api.getUserInfo().then(e=>{
          if(e){
            this.userInfo = e
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      parentF(){
        this.$refs.childa.shareFc()
      },
      async  dealerListApi(){     //经销商列表1
              let param={
                "isAsc": "",
                "orderBy": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "searchValue": "",
              }
        await this.$u.api.dealerList(param).then(e => { //经销商
              if(e){
                this.dealerNameList =   e.rows
                this.linkbtn(this.dealerNameList[0].dealerId)
                this.$store.commit('sendid',this.dealerNameList[0].dealerId)
              }
             })
      },
      dealerNameFn(index,id){   //  一级点击 经销商
        this.ftitleIndex = index
          console.log(index,id)
          this.linkbtn(id)
        this.$store.commit('sendid',id)
      },
      linkbtn(dealerId){           //二级点击 商家
        let goodsname = {
          "isAsc": "",
          "orderBy": "",
          "orderByColumn": "",
          "pageNum": "",
          "pageSize": "",
          "params": {},
          "searchValue": "",
          "dealerId": dealerId
        }
        this.$u.api.supplier(goodsname).then(e => {
          if (!e) {
            this.nameShow = [];
            return false;
          }
          this.nameShow = [];
          this.goodsCategoryList= []
          this.goodsList=[]

          this.nameShow = e.rows

          this.selectTitle(0, this.nameShow[0].supplierId)
        })
      },
			selectTitle(nowindex, supplierId) {       //三级点击 分类

        this.goodsCategoryList= [] //分类 初始化
        this.goodsList=[]       //商品列表 初始化
				this.pageNum = 1
				this.titleIndex = nowindex
				let goodsCategoryList = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": '',
					"pageSize": '',
					"searchValue": "",
					supplierId
				}
				this.$u.api.goodsCategoryList(goodsCategoryList).then(e => { //初始化分类接口
          if(e){
            this.goodsCategoryList = e.rows
            this.pacKGoodsList(this.twoIndex)

          }else{
            this.goodsCategoryList = []
          }
				})
			},
			classify(index, supplierId) {       //点分类
				console.log(index)
				this.twoIndex = index;
				this.pageNum = 1
				this.goodsList = []
				this.pacKGoodsList(index)
			},
			pacKGoodsList(index){          //商品
				let goodsList = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"searchValue": "",
					supplierId: this.goodsCategoryList[index].supplierId,
					categoryId: this.goodsCategoryList[index].categoryId
				}
				this.$u.api.goodsList(goodsList).then(e => { //商品
					if (e) {
						this.goodsList = this.goodsList.concat(e.rows); //将数据拼接在一起
					} else {
						console.log(e)
					}
				}).catch(err => {
					console.log(err)
				})
			},
      listItem(){
        let param={
          "status": 0
        }
        this.$u.api.helpApplyList(param).then(e=>{
          if(e){
            this.redDot = true
          }else{
            this.redDot = false
          }

        })
      },
      mymainShop(){
        uni.navigateTo({
          url:"/pages/home_page/my_shop/my_shop?mainUserId="+this.userInfo.userId
        })
      },
      jumpTwo(item) {
        if (item.activityStatus == 1 || item.activityStatus == 2) {
          this.$tools.toast("您已发布过该商品");
          return false;
        }
        uni.navigateTo({
          url: `/pages/goods/goods_two/goods_two?commodityId=${item.commodityId}`
        })
      },
		}
	}
</script>

<style lang="scss">
	.cantainer {
		background-color: #f7f7f7;
		min-height: 100vh;
	}
  .img-node{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image{
      width: 200rpx;
      height: 200rpx;
    }
    text{
      font-size: 24rpx;
      color: #999999;
      margin-top: 20rpx;
    }
  }
	.orange {
		color: #FF6D2E;
	}
	.x-head {
		// height: 240rpx;
		width: 750rpx;
		background-color: #FFFFFF;

		.x-step {
			height: 138rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.x-top {
				display: flex;
				justify-content: space-between;
				width: 494rpx;
				overflow: hidden;

				text {
					height: 36rpx;
					width: 36rpx;
					background-color: #f7f7f7;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					font-size: 22rpx;
					color: #000000;
					border: 1rpx solid #999;
					box-sizing: border-box;
					line-height: 100%;
					position: relative;
				}

				.active {
					background-color: #FF6D2E;
					color: #FFFFFF;
					border: 1rpx solid #FF6D2E;
				}

				text::before {
					position: absolute;
					left: 34rpx;
					content: "";
					height: 1px;
					width: 1000rpx;
					background-color: #E1E1E1;
				}
			}

			.x-font {
				margin-top: 10rpx;
				width: 690rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				text {
					font-size: 24rpx;
				}
			}
		}
    .tyll{
      background: #FF6D2E;
      height: 60rpx;
      text-align:center;
      text{
        background: #FF6D2E;
        line-height: 60rpx;
        font-size: 38rpx;
        color:#fff;
      }
      .fontx{
        font-size: 30rpx;
      }
    }
	.boxscr{
    width: 750rpx;
    overflow: hidden;
    .btn-list {
      height: 70rpx;
      padding:20rpx;
      width: 100%;
      .box-common {
        width: 750px;
        height: 70 rpx;
        text {
          padding: 2rpx 25rpx;
        }
        .common {
          height: 50rpx;
          line-height: 50rpx;
          margin:0 15rpx;
          display: inline-block;
          white-space:nowrap;
        }

        .active {
          color: #FF6D2E;
          border-bottom: 2rpx solid #FF6D2E;
        }
      }
    }

    .btn-list-f{
      height: 50rpx;
      padding:0 20rpx;
      padding-top: 20rpx;
      width: 750rpx;
      overflow: hidden;
      .box-common{
        overflow: hidden;
        width: 750px;
        height: 50rpx;
        .common {
          height: 50rpx;
          line-height: 50rpx;
          padding:0 20px;
          display: inline-block;
          white-space:nowrap;
        }
        .active {
          padding: 0 25rpx;
          background: #FF6D2E;
          border-radius: 50rpx;
          color: #FFFFFF;
          line-height: 52rpx;
          text-align: center;
          font-size: 28rpx;
        }
      }

    }
  }
	}

	.x-body {
		.x-search {
			background-color: #FFFFFF;
			height: 112rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;

			.s-item {
				width: 100%;
			}

			.x-btn {
				padding: 6rpx 15rpx;
				border: 1px solid #FF6D2E;
				border-radius: 10rpx;
				color: #FF6D2E;
				font-size: 26rpx;
				text-align: center;
				margin-left: auto;
			}
		}

		.sst {
			display: flex;
			min-height: 1000rpx;

			.x-left {
				width: 180rpx;
				background-color: #F7F7F7;

				view {
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-left: 8rpx solid #F7F7F7;
				}

				.action {
					background-color: #FFFFFF;
					border-left: 8rpx solid #FF6D2E;
				}
			}

			.x-right {
				width: 570rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: #FFFFFF;

				.list-item {
					margin-bottom: 20rpx;

					.x-one {
						height: 180rpx;
						display: flex;

						image {
							height: 180rpx;
							width: 180rpx;
							border-radius: 8rpx;
						}

						.bwm {
							width: 330rpx;
							margin-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
						}
					}

					.x-two {
						height: 90rpx;
						display: flex;
						justify-content: space-between;

						.q1 {
							view {
								margin-top: 8rpx;
								font-size: 26rpx;
								color: #FF6D2E;
								font-family: PingFang SC, sans-serif;
							}
						}

						.xbtn {
							align-self: flex-end;
							width: 116rpx;
							height: 52rpx;
							background: #FF6D2E;
							border-radius: 6rpx;
							color: #FFFFFF;
							font-size: 26rpx;
							line-height: 52rpx;
							text-align: center;
						}

						.c9 {
							background-color: #ccc;

						}

					}

				}
			}
		}
	}

	.x-function{
		width: 710rpx;
		margin: 0 auto;
		
		overflow: hidden;
		.x-title{
			font-size: 32rpx;
			color: #333333;
			padding: 20rpx;
		}
		.down-head{
			background-color: #FFFFFF;
			margin: 6rpx 0 20rpx 0;
			border-radius: 8rpx;
			display: flex;
			flex-wrap: wrap;
		 	navigator, view{
				width: 25%;
				height: 100rpx;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				position: relative;
				image{
					height:48rpx ;
					width: 48rpx;
				}
				text{
					font-size: 24rpx;
					margin-top: 4rpx;
				}
				.dw{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: red;
					position: absolute;
					top: 0;
					right: 50rpx;
					margin: 0;
				}
			}
		}
	}
</style>
