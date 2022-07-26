<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="address_info.name" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="address_info.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" v-model="address_map"  placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="address_info.detail" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom" >
			<view class="default">
				<view class="left" >
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch  color="red" :checked="isDefault" @change="setDefault" /></view>
			</view>
		</view>
		
		<view class="addSite" @tap="submit_address" >
			<view class="add">
				保存
			</view>
		</view>
		<u-picker @confirm="confirmAddress" mode="region" ref="uPicker" v-model="show" />
	</view>
</template>

<script>
import queryMap from "../address/get_code";
export default {
	data() {
		return {
			show: false,
			isDefault:true,
			address_info:{
				name:'',
				phone:'',
				detail:''
			},
			address_map:null,
			address_map_data:{},
			addressId:''
		};
	},
	onLoad(option) {

		if(option.edit){
			let obj = this.$store.state.editAddress
			// console.log(obj)
			let getCode =  obj.area
			for (let codeKey in queryMap) {
				if(queryMap[codeKey] == getCode){
				  getCode = codeKey
				}
			}
			this.address_info.name = obj.contacts
			this.address_info.phone = obj.contactNumber
			this.address_info.detail = obj.address
			this.address_map_data.area = obj.area //区域
			this.address_map_data.city = obj.city	//城市
			this.address_map_data.code = getCode	//编码 //TODO await
			this.address_map_data.province = obj.province //省份
			this.address_map = `${ obj.province}${obj.city}${obj.area }`
			this.addressId=	obj.addressId
			this.isDefault = false
		}
	},
	methods: {
		setDefault(e) {
			this.isDefault = e.detail.value
		},
		showRegionPicker() {
			this.show = true;
		},
		submit_address(){
			let {address_info} = this
			console.log(address_info.detail)
			console.log(this.address_info.detail)
			if(!address_info.name){this.$tools.toast("请输入收货人")}
			else if(!address_info.phone){this.$tools.toast("请输入手机号")}
			else if(!address_info.detail){this.$tools.toast("请输入详细地址")}
			else if(!this.address_map){this.$tools.toast("请输入地址")}
			let param = {
				"address": this.address_info.detail, // 详细地址
				"area": this.address_map_data.area,  //区域
				"city": this.address_map_data.city,	//城市
				"province": this.address_map_data.province,  //省份
				"contactNumber": this.address_info.phone, //联系电话
				"contacts": this.address_info.name,			//	联系人
				"isDefault": this.isDefault,  //是否默认
				"areaId" : this.address_map_data.code,//TODO await
				"addressId":this.addressId
			}
			this.$u.api.addAddress(param).then(e=>{
				uni.navigateTo({
					url:"/pages/my/address/address"
				})
			})
			
		},
		confirmAddress(e){
			this.address_map = `${e.province.label}${e.city.label}${e.area.label }`
			
			this.address_map_data={
				province:e.province.label,
				city:e.city.label,
				area:e.area.label,
				code :e.area.value
			}
			console.log(e)
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				flex: 1;
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		padding:20rpx 0 0 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 400rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 50%;
	margin-left: -200rpx;
	background-color: #FF6D2E;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
	
	}
}
</style>
