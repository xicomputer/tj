<template>
	<view>
		<view class="layer7 flex-col">
		  <view class="group3 flex-row" style="display: flex;flex-direction: column;">
				<view style="display: flex;flex-direction: row-reverse;">
					<uni-file-picker
							v-model="form.avatarUrl"
							class="activity-poster"
							fileMediatype="image"
							returnType="array"
							:image-styles="qrCodeImgStyle"
							:limit="1"
							@delete="qrCodeImgDelete"
							@success="successqrCodeImg"
						/>	
				</view>
				
				<u-field
					v-model="form.nickName"
					placeholder="请输入昵称"
					label="昵称"
					label-width="200"
					input-align='right'
					placeholder-style="text-align: right;"
					class="u-flex-1"
				>
				</u-field>
				<u-field
					v-model="form.status"
					label="状态"
					disabled
					label-width="200"
					input-align='right'
					placeholder-style="text-align: right;"
					class="u-flex-1"
				>
				</u-field>
				<u-field
					v-model="form.introduction"
					placeholder="请输入简介"
					label="简介"
					border
					label-width="200"
					placeholder-style="text-align: right;"
					class="u-flex-1"
					type='textarea'
					:maxlength="150"
				>
				</u-field>
				<u-button @click='addsupplierInfo()'>编辑</u-button>
		  </view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
	  data() {
	    return {
				qrCodeImgStyle: {
					height: '200rpx',
					width: '200rpx',
					borderRadius:'50%'
				},
				id:'',
				edit:false,
				dataList:[],
				supplierId:'',
				form:{
					avatarUrl:'',
					nickName:'',
					introduction:'',
					state:'',
					status:'',
					supplierId:''
				}
			}
		},
		onLoad() {
			this.supplierId = uni.getStorageInfo('userInfo').supplierId
			this.loadData()
			this.getuserinfo()
		},
		methods:{
			addsupplierInfo(){
				if(this.edit){
					delete this.form._id
					db.collection('activity_business').doc(this.id).update({
						...this.form
					}).then(res=>{
						uni.showToast({
							title:'编辑成功',icon:"none"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'../index/activity'
							})
						},800)
					})
				}else{
					db.collection('activity_business').add({
						...this.form
					}).then(res=>{
						uni.showToast({
							title:'新增成功',icon:"none"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'../index/activity'
							})
						},800)
					})
				}
				
			},
			loadData(){
				db.collection('activity_business').where({supplierId:this.supplierId}).get().then(res=>{
					console.log(res);
					this.form = res.result.data[0]
					if(res.result.data[0]){
						this.edit = true
						this.id = res.result.data[0]._id
					}
				})
			},
			getuserinfo(){
				this.$apis.getSupplierInfo().then(res => {
					console.debug('供应商信息', res)					
					if(res.code == 200) {
						this.form.nickName = res.data.supplierName
						this.form.avatarUrl = res.data.supplierLogo
						this.form.state = res.data.mchidApplyInfo.applymentState
						this.form.supplierId = res.data.supplierId
						if(res.data.mchidApplyInfo.applymentState == 7){
							this.form.status = '已认证'
						}
					}
				})
			},
		}
}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.layer7 {
	    background-color: rgba(255, 255, 255, 1);
	    box-shadow: 0px 1px 0px 0px rgba(217, 226, 235, 1);
	    .group3 {
				padding: 20rpx;
				border-bottom: 1rpx solid #D9E2EB;
	      .word7 {
	        width: 112rpx;
	        display: block;
	        overflow-wrap: break-word;
	        color: #233040;
	        font-size: 28rpx;
	        white-space: nowrap;
	      }
	      .info2 {
	        width: 252rpx;
	        height: 28rpx;
	        display: block;
	        overflow-wrap: break-word;
	        color: rgba(101, 113, 127, 1);
	        font-size: 28rpx;
	        white-space: nowrap;
	        line-height: 28rpx;
	        text-align: right;
	        margin: 1rpx 0 0 12rpx;
	      }
	    }
	  }
	
</style>