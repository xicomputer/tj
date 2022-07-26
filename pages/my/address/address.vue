<template>
	<view class="cantainer">
		<view class="box">
			<view  class="box-item" v-for="(res, index) in addressList" :key="index">
				<view class="top" @tap.stop="j_black(res.addressId)">
					<view class="name">{{ res.contacts }}</view>
					<view class="phone">{{ res.contactNumber }}</view>
					<view class="tag">
						<text  v-if="res.isDefault == true"> 默认</text>
					</view>
				</view>
				<view class="bottom"  @tap.stop="j_black(res.addressId)" >
					{{res.province}}{{res.city}}{{res.area}}{{res.address}}
					<u-icon @tap.stop="j_edit(res)" name="edit-pen" :size="40" color="#999999"></u-icon>
				</view>
				<view class="last  u-border-top">
					<view class="x-select">
						<view v-if="!res.isDefault" class="active" @tap="setDefault(res.addressId)"></view>
						<image v-if="res.isDefault"  src="/static/ty.png" mode=""></image>
						<text>默认地址</text>
					</view>
					<text @tap.stop="removeAddress(res.addressId)">删除</text>
					
				</view>
			</view>
		</view>
		
		<none-msg :info='tsmsg' :goodsno='true' v-if="!addressList.length" ></none-msg>
		
		<view class="addSite">
			<view class="add add1" @tap.stop="getaddress">微信地址</view>
			<view class="add"  @tap.stop="toAddSite" >新建收货地址</view>
		</view>
		
		
	</view>
</template>

<script>
import queryMap from  './get_code'
export default {	
	data() {
		return {
			tsmsg:'您还没有新建地址',
			value1:"true",
			addressList:[],
			order:false
		};
	},
	onLoad(option) {


	},
	onShow() {
	this.pageAddressList()
		
	},
	methods:{
		pageAddressList(){
			let data = {
					"isAsc": "",
					"orderBy": "",
					"orderByColumn": "",
					"pageNum": 0,
					"pageSize": 0,
					"searchValue": ""
			}
			this.$u.api.addressList(data).then(e=>{
				if(e){
					this.addressList = e.rows
				}else{
					this.addressList = []
				}
			})
		},
		toAddSite(){
			uni.redirectTo({
			    url: '/pages/my/add_site/add_site'
			});
		},
		getaddress(){
			let that = this
			wx.chooseAddress({
			  success (res) {
				  console.log('微信',res)
          let getCode = res.countyName
          for (let codeKey in queryMap) {
              if(queryMap[codeKey] == getCode){
                getCode = codeKey
              }
          }
          console.log(getCode,res.countyName)
          let param = {
            "address": res.detailInfo, // 详细地址
            "area": res.countyName,  //区域
            "city": res.cityName,	//城市
            "contactNumber": res.telNumber, //联系电话
            "contacts": res.userName,			//	联系人
            "isDefault": true,  //是否默认
            "province": res.provinceName,  //省份
            'areaId':getCode

          }
          that.$u.api.addAddress(param).then(e=>{
              this.pageAddressList()
              that.$tools.toast("添加成功")
          }).catch(err=>{
            console.log(err)
          })


			  },
			  fail(err){
				  console.log(err)
			  }
			})
		},
		j_black(address){
			let order = this.$store.state.addressState 
			console.log(order)
			if(order == 'order'){
				uni.redirectTo({
					url:`/pages/home_page/place_order/place_order?address=${address}`
				})
			}else{
				return false;
			}
		},
		setDefault(data){
			this.$u.api.addressDefault(data).then(e=>{
					this.pageAddressList()
					
			}).catch(err=>{
				console.log(err)
			})
		},
		removeAddress(data){
			this.$u.api.removeAddress(data).then(e=>{
					this.$tools.toast("删除成功")
					this.pageAddressList()
					
			}).catch(err=>{
				console.log(err)
			})
		},
		j_edit(item){
			
			this.$store.commit("editAddress",item)
			uni.redirectTo({
			    url: '/pages/my/add_site/add_site?edit=1'
			});
		}
	}
};
</script>

<style lang="scss">
.cantainer{
	background-color: #f7f7f7;
	min-height: 100vh;
	overflow: hidden;
}

.box{
	// background-color: #f7f7f7;
	padding: 20rpx;
	padding-bottom: 100rpx;
}
.box-item {
	background-color: #FFFFFF;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	padding-top: 20rpx;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;
		
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
	.last{
		height: 76rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.x-select{
			display: flex;
			align-items: center;
			height: 76rpx;
			view{
				width: 36rpx;
				height: 36rpx;
				background: #FFFFFF;
				border: 2rpx solid #707070;
				border-radius: 50%;
			}
			image{
				height: 36rpx;
				width: 36rpx;
			}
			text{
				margin-left: 10rpx;
			}
			.active{
				
			}
		}
		
		text{
			
		}
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 750rpx;
	line-height: 100rpx;
	position: fixed;
	z-index: 200;
	bottom: 30rpx;
	left: 0;

	font-size: 30rpx;
	.add{
		border-radius: 60rpx;
		width: 328rpx;
		height: 100%;
		background-color: #FF6D2E;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
	
	}
	.add1{
			background-color: #fff;
			border: 1px solid #FF6D2E;
			color: #FF6D2E;
			box-sizing: border-box;
	}
}
</style>
