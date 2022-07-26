<template>
	<view class="cantainer">
		<view class="tabs">
			<u-tabs class="aaa" :list="list" active-color="#FF0000" :is-scroll="false" :current="current"
				@change="change"></u-tabs>
			<view class="x-line u-border-bottom"></view>
		</view>
		
		<!-- 物流 -->
		<view v-show="current ==0" class="logistics">
			<view class="btn-item">
				<view @tap="selectState(index)" v-for="(item,index) in statesSelect" :key="index"
					:class="index == stateindex ? 'active' : '' ">{{item.state}}</view>
			</view>
			<none-msg :info='tsmsg' :orderno='true'v-if="orderList.length == 0" ></none-msg>
			<view class="order-list">
				<!-- 带发货 -->
				<view class="await-send" v-show="stateindex==0">
					<view class="order-item" v-for="(item, index) in orderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.orderNumber}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.actualMoney}}</text>
						</view>
					
						<view class="last-font">
							下单时间：{{item.orderTime}}
						</view>
						<view class="last-font">
							姓名：{{item.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">
							收货地址：{{item.shippingAddress.province}}{{item.shippingAddress.city}}{{item.shippingAddress.area}}{{item.shippingAddress.address}}
						</view>
						<view>商品来源：{{item.supplier.supplierName}}</view>
						<view v-show="item.message" class="last-font">
							备注：{{item.message}}
						</view>

						<view class="last-btn">
							<text  v-if="!item.orderItem.refundStatus && item.isEnd == false"  @tap="applyReMo(item.orderNumber,0)">申请退款</text>
							
							<text class="bjc" v-if="item.orderItem.refundStatus">申请中...</text>
							
							<!-- <text @tap="contact">联系买家</text> -->
						</view>
					</view>
				</view>
				<!-- 待收货 -->
				<view class="await-accept" v-show="stateindex==1">
					<view class="order-item" v-for="(item, index) in orderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.orderNumber}}</text>
							<!-- <text class="orange thick">待收货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.actualMoney}}</text>
						</view>
						<view class="last-font">
							下单时间：{{item.orderTime}}
						</view>
						<view class="last-font">
							姓名：{{item.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">
							收货地址：{{item.shippingAddress.province}}{{item.shippingAddress.city}}{{item.shippingAddress.area}}{{item.shippingAddress.address}}
						</view>
            <view>商品来源：{{item.supplier.supplierName}}</view>
						<view v-show="item.message" class="last-font">
							备注：{{item.message}}
						</view>
						<view class="last-btn">
							<text @tap="logistics_info(item.orderNumber)">物流信息</text>
							<text @tap="enter_goods(item.orderNumber)">确认收货</text>
						</view>
					</view>
				</view>
				<!-- 已完成 -->
				<view class="finish" v-show="stateindex==2">
					<view class="order-item" v-for="(item, index) in orderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.orderNumber}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.actualMoney}}</text>
						</view>
						<view class="last-font">
							下单时间：{{item.orderTime}}
						</view>
						<view class="last-font">
							姓名：{{item.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">
							收货地址：{{item.shippingAddress.province}}{{item.shippingAddress.city}}{{item.shippingAddress.area}}{{item.shippingAddress.address}}
						</view>
            <view>商品来源：{{item.supplier.supplierName}}</view>
						<view v-show="item.message" class="last-font">
							备注：{{item.message}}
						</view>
						<view class="last-btn">
							<text @tap="delect_order(item.orderNumber)">删除订单</text>
							<text  v-if="!item.orderItem.refundStatus  && item.isEnd == false"  @tap="applyReMo(item.orderNumber,2)">申请退货</text>
							<text class="bjc" v-if="item.orderItem.refundStatus">申请中...</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 售后 -->
		<view v-show="current ==1" class="after-sale">
			<view class="btn-item">
	
			<view @tap="afterSelectState(index)" v-for="(item,index) in afterStatesSelect" :key="index"
				:class="index == afterStateindex ? 'active' : '' ">{{item.state}}</view>
			</view>
			<none-msg :info='tsmsg' :orderno='true' v-if="afterOrderList == 0" ></none-msg>
			<view class="order-list">
				<!-- 待退款 -->
				<view class="await-send" v-show="afterStateindex==0">
					<view class="order-item" v-for="(item, index) in afterOrderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.refundNo}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
								
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderInfo.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.refundMoney}}</text>
						</view>
						
						<view class="last-font">
							姓名：{{item.orderInfo.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.orderInfo.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">申请时间：{{item.createTime}}</view>
						<view class="last-font u-line-1">退款原因：{{item.refundReason}}</view>
            <view>商品来源：{{item.orderInfo.supplier.supplierName}}</view>
						<!-- <view class="last-font u-line-1">店铺地址：湖南省长沙市岳麓区xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view> -->
						
						<view class="last-btn">
							<text @tap="cancel_apply(item.refundNo,0)">取消申请</text>
						</view>
					</view>
				</view>
				
				<!-- 待退货 -->
				<view class="await-send" v-show="afterStateindex==1">
					<view class="order-item" v-for="(item, index) in afterOrderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.refundNo}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderInfo.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.refundMoney}}</text>
						</view>
						<view class="last-font">
							姓名：{{item.orderInfo.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.orderInfo.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">申请时间：{{item.createTime}}</view>
						<view class="last-font u-line-1">退款原因：{{item.refundReason}}</view>
						<!-- <view class="last-font u-line-1">店铺地址：湖南省长沙市岳麓区xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view> -->
            <view>商品来源：{{item.orderInfo.supplier.supplierName}}</view>
						<view class="last-btn">
							<text @tap="send_back(item)">待寄回</text>
						</view>
					</view>
				</view>
				
				<!-- 待退中 -->
				<view class="await-send" v-show="afterStateindex==2">
					<view class="order-item" v-for="(item, index) in afterOrderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.refundNo}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
								
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderInfo.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.refundMoney}}</text>
						</view>
						<view class="last-font">
							姓名：{{item.orderInfo.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.orderInfo.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">申请时间：{{item.createTime}}</view>
						<view class="last-font u-line-1">退款原因：{{item.refundReason}}</view>
						<!-- <view class="last-font u-line-1">店铺地址：湖南省长沙市岳麓区xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view> -->
            <view>商品来源：{{item.orderInfo.supplier.supplierName}}</view>
						<view class="last-btn">
							<text @tap="look_wl(item.refundNo)">查看物流</text>
						</view>
					</view>
				</view>
				
				<!-- 已退款 -->
				<view class="await-accept" v-show="afterStateindex==3">
					<view class="order-item" v-for="(item, index) in afterOrderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.refundNo}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderInfo.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.refundMoney}}</text>
						</view>
						<view class="last-font">
							姓名：{{item.orderInfo.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.orderInfo.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">申请时间：{{item.createTime}}</view>
		
						<view class="last-font u-line-1">退款原因：{{item.refundReason}}</view>
            <view>商品来源：{{item.orderInfo.supplier.supplierName}}</view>
						<view class="last-btn">
							<!-- <text @tap="delect_order(item.orderInfo.orderNumber)">删除订单</text> -->
						</view>
					</view>
				</view>
				<!-- 已拒绝 -->
				<view class="finish" v-show="afterStateindex==4">
					<view class="order-item" v-for="(item, index) in afterOrderList" :key="index">
						<view class="o-head">
							<text class="c9">订单号：{{item.refundNo}}</text>
							<!-- <text class="orange thick">待发货</text> -->
						</view>
						<view class="o-name">
							<image :src="item.userInfo.headImgUrl" mode=""></image>
							<text>{{item.supplierId}}</text>
						</view>
						<view class="x-in">
							<image :src="item.orderInfo.orderItem.commodityImage" mode=""></image>
							<view class="x-title">
								<view>{{item.orderInfo.orderItem.commodityName}}</view>
								<text class="x-button">{{item.orderInfo.orderItem.skuName}}</text>
								<text class="c9">*{{item.orderInfo.orderItem.amount}}</text>
							</view>
						</view>
						<view class="last-font">
							实付款<text class="orange thick u-font-20 u-margin-left-20">￥</text><text
								class="orange thick">{{item.refundMoney}}</text>
						</view>
						<view class="last-font">
							姓名：{{item.orderInfo.shippingAddress.contacts}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.orderInfo.shippingAddress.contactNumber}}
						</view>
						<view class="last-font">申请时间：{{item.createTime}}</view>
								
						<view class="last-font u-line-1">退款原因：{{item.refundReason}}</view>
						<view class="last-font u-line-1">拒绝原因：{{item.refuseReason}}</view>
            <view>商品来源：{{item.orderInfo.supplier.supplierName}}</view>
						<view class="last-btn">
							<!-- <text @tap="delect_order(item.orderInfo.orderNumber)">删除订单</text> -->
							<text @tap="cancel_apply(item.refundNo,3)">取消申请</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<u-popup v-model="applyrm" mode="center" border-radius=10>
				<view class="pop-center">
					<text>请输入退款理由</text>
					 <textarea placeholder="请输入" v-model="refundReason"/>
					<view class="btn-box">
						<view @tap="Jclose">取消</view>
						<view @tap="Jenter">确定</view>
					</view>
				</view>
		</u-popup>
    <u-tabbar :list="tabbar" ></u-tabbar>
	</view>
</template>

<script>
	import dome from "@/common/logic/dome.js"
	export default {
		data() {
			return {
        tabbar:{},
        transmitIndex:'',
				tsmsg:'亲，没有推荐订单哦！',
				applyrm:false,
				list: [{
						name: '物流订单'
					},
					{
						name: '售后订单'
					},
				],
				current: 0,
				statesSelect: [{
						state: '待发货'
					},
					{
						state: '待收货'
					},
					{
						state: '已完成'
					},
				],
				stateindex: 0,
				afterStatesSelect: [{
						state: '待退款'
					},
					{
						state: '待退货'
					},
					{
						state: '退货中'
					},
					{
						state: '已退款'
					},
					{
						state: '已拒绝'
					},
				],
				afterStateindex: 0,
				orderList:null,
				orderNumber:'',
				refundReason:'',
				afterOrderList:null
			}
		},
    onLoad(){
      this.tabbar = this.$store.state.tab
      this.current=0;
      this.stateindex=0;
      this.initOrder(1)
    },
		onShow(){
      // if(getApp().globalData.Logistics=='w'){
      //   this.initOrder(2)
      // }else if(getApp().globalData.Logistics=='t'){
      //   this.afterOrder(4)
      // }else{
      //   this.initOrder(1)
      // }


		},
    onHide(){
      // console.log('页面隐藏')
      // this.stateindex=0;
      // getApp().globalData.Logistics = ''
    },
		methods: {
			// 顶部选择tab
			change(index) {
				console.log("qiant",index)
				this.current = index;
				if(index == 0){
					this.afterStateindex = 0
					this.selectState(0)
				}else{
					this.stateindex = 0
					this.afterSelectState(0)
				}
			},
			// 二级选择 物流
			selectState(e) {
				this.stateindex = e

				if(e == 0){ //待发货
					this.initOrder(1)
				}
				if(e == 1){ //待收货
					this.initOrder(2)

				}
				if(e == 2){ //已完成
					this.initOrder(4)
				}
			},
			//0 无退款 1审核中 2通过 3拒绝 4退货中 5完成 
			afterSelectState(e){
				this.afterStateindex = e
				// 
				if(e == 0){ //待退款
					this.afterOrder(1)
				}
				if(e == 1){ 
					this.afterOrder(2)
				}
				if(e == 2){ 
					this.afterOrder(4)
				}
				if(e == 3){ 				//已退款
					this.afterOrder(5)
				}
				if(e == 4){ 
					this.afterOrder(3)
				}
				
			},
			initOrder(indexNow){ //物流
				let param = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"orderState": indexNow,
					"pageNum": 1,
					"pageSize": 10,
					"searchValue": ""
				}
						
				this.$u.api.allOrder(param).then(res=>{		//	 默认待收货
					if(!res){
						this.orderList=[]
					}else{
						let data1 =  res.rows
							data1.map((item,index)=>{
								data1[index].shippingAddress = JSON.parse(item.shippingAddress)
						})
						this.orderList =data1
					}
				
				})
			},
			afterOrder(indexNow){
				let param = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"refundStatus": indexNow,
					"pageNum": 1,
					"pageSize": 10,
					"searchValue": ""
				}
				this.$u.api.refundList(param).then(res=>{		//	 默认待收货
					if(!res){this.afterOrderList=[]}else{
						this.afterOrderList = res.rows
						let data1 =  res.rows
							data1.map((item,index)=>{
								data1[index].orderInfo.shippingAddress = JSON.parse(item.orderInfo.shippingAddress)
						})
						this.afterOrderList =data1
						
					}
				
				})
			},
			applyReMo(orderNumber,index){
				this.refundReason = ''
				this.applyrm = true;
				this.orderNumber = orderNumber
        this.transmitIndex = index
			},
			Jclose(){
				this.applyrm = false;
			},
			Jenter(){
				let {orderNumber,refundReason,transmitIndex} = this
				this.$u.api.refundApply({orderNumber,refundReason}).then(res=>{		//  申请退款
					this.applyrm = false;
					this.$tools.toast("申请成功")
					this.refundReason = ''
          this.selectState(transmitIndex)
				}).catch(err=>{
					console.log(err)
				})
			},
			cancel_apply(order,index){
				this.$u.api.cancelApply(order).then(res=>{		//  取消申请退款
					this.$tools.toast("取消成功")
						this.afterSelectState(index)
				}).catch(err=>{
					console.log(err)
				})
			},
			delect_order(order){
				this.$u.api.deleteOrder(order).then(res=>{		//  删除订单
					this.$tools.toast("删除成功")
					
						this.selectState(2)
				}).catch(err=>{
					console.log(err)
				})
			},
			logistics_info(order){
        console.log('wuliu fahhui ')
        uni.navigateTo({
					url:`/pages/tabbar/order_form/express_info?refundNo=${order}&wldd=1`
				})
			},
			enter_goods(order){
				
				this.$u.api.enterGoods(order).then(res=>{		//  确认收货
					this.$tools.toast("已确认")
						this.selectState(1)
				}).catch(err=>{
					console.log(err)
				})
				
			},
			send_back(order){
				let that = this;
				that.$store.commit("backGoodsAddress",order)
				uni.navigateTo({
					url:"/pages/tabbar/order_form/expressage"
				})
			},
			look_wl(order){
				uni.navigateTo({
					url:"/pages/tabbar/order_form/express_info?refundNo="+order
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.cantainer {
		min-height: 100vh;
		background-color: #f7f7f7;
	}

	.orange {
		color: #ff0000;
	}
	.pop-center{
		height: 350rpx;
		width: 500rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		textarea{
			border: 1px solid #cccccc;
			width: 450rpx;
			height: 160rpx;
			border-radius: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;
		}
		.btn-box{
			width: 100%;
			display: flex;
			justify-content: space-around;
			view{
				flex: 1;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #FFFFFF;
			}
			view:nth-child(1){
				height: 80rpx;
				background-color: #cccccc;
			}
			view:nth-child(2){
				height: 80rpx;
				background-color: #ff0000;
			}
		}
		text{
			font-size: 34rpx;
			font-weight: bold;
			margin-top: 20rpx;
		}
	}
	.tabs {
		position: relative;

		.x-line {
			position: absolute;
			bottom: 4rpx;
			left: 0;
			height: 1px;
			width: 100%;
		}
	}

	.logistics {
		width: 750rpx;
		background-color: #f7f7f7;
		.btn-item {
			display: flex;
			height: 100rpx;
			align-items: center;
			background: #FFFFFF;
			padding: 0 40rpx;
			view {
				padding: 4rpx 15rpx;
				background: #F7F7F7;
				border-radius: 10rpx;
				color: #999;
				font-size: 28rpx;
				line-height: 52rpx;
				text-align: center;
				color: #999999;
				margin-right: 40rpx;
			}

			.active {
				background-color: #FEDED1;
				color: #ff0000;
			}
		}

		.order-list {
			padding: 0 20rpx;
			margin-top: 20rpx;
			padding-bottom: 100rpx;

			.order-item {
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;

				.o-head {
					height: 72rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.o-name {
					display: none;
					align-items: center;
					height: 50rpx;

					image {
						height: 50rpx;
						width: 50rpx;
					}

					text {
						font-size: 24rpx;
						color: #999999;
						margin-left: 10rpx;
					}
				}

				.x-in {
					display: flex;
					margin: 20rpx 0;

					image {
						height: 120rpx;
						width: 120rpx;
						border-radius: 6rpx;
					}

					.x-title {
						margin-left: 20rpx;

						view {
							font-size: 26rpx;
							font-weight: bold;
						}

						text {
							font-size: 24rpx;
						}

						.x-button {
							padding: 4rpx 15rpx;
							background: #F7F7F7;
							border-radius: 10rpx;
							color: #999;
							font-size: 24rpx;
							line-height: 52rpx;
							text-align: center;
							color: #999999;
						}
					}
				}

				.last-font {
					font-size: 24rpx;
					margin-bottom: 20rpx;
				}

				.last-btn {
					text-align: right;
					.bjc{
						background: #ff0000;
					}
					text {
						padding: 8rpx 20rpx;
						border-radius: 10rpx;
						font-size: 28rpx;
						line-height: 52rpx;
						text-align: center;
						margin-left: 20rpx;
						border: 1px solid #E4E4E4;
					}
				}
			}
		}
	}
	.after-sale{
		width: 750rpx;
		background-color: #f7f7f7;
		
		.btn-item {
			display: flex;
			height: 100rpx;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			padding: 0 40rpx;
			view {
				padding: 4rpx 15rpx;
				background: #F7F7F7;
				border-radius: 10rpx;
				color: #999;
				font-size: 28rpx;
				line-height: 52rpx;
				text-align: center;
				color: #999999;
			}
		
			.active {
				background-color: #FEDED1;
				color: #ff0000;
			}
		}
		
		.order-list {
			padding: 0 20rpx;
			margin-top: 20rpx;
			padding-bottom: 100rpx;
		
			.order-item {
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;
		
				.o-head {
					height: 72rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
		
				.o-name {
					display: none;
					align-items: center;
					height: 50rpx;
		
					image {
						height: 50rpx;
						width: 50rpx;
					}
		
					text {
						font-size: 24rpx;
						color: #999999;
						margin-left: 10rpx;
					}
				}
		
				.x-in {
					display: flex;
					margin: 20rpx 0;
		
					image {
						height: 120rpx;
						width: 120rpx;
						border-radius: 6rpx;
					}
		
					.x-title {
						margin-left: 20rpx;
		
						view {
							font-size: 26rpx;
							font-weight: bold;
						}
		
						text {
							font-size: 24rpx;
						}
		
						.x-button {
							padding: 4rpx 15rpx;
							background: #F7F7F7;
							border-radius: 10rpx;
							color: #999;
							font-size: 24rpx;
							line-height: 52rpx;
							text-align: center;
							color: #999999;
						}
					}
				}
		
				.last-font {
					font-size: 24rpx;
					margin-bottom: 20rpx;
				}
		
				.last-btn {
					text-align: right;
					.bjc{
						background: #ff0000;
					}
					text {
						padding: 8rpx 20rpx;
						border-radius: 10rpx;
						font-size: 28rpx;
						line-height: 52rpx;
						text-align: center;
						margin-left: 20rpx;
						border: 1px solid #E4E4E4;
					}
					
				}
			}
		}
	}
</style>
