<template>
  <view class="cantainer">
    <u-popup v-model="isAuto" mode="center" border-radius=10 z-index="100076">
      <view class="x-conter">
          <text class="tag1">温馨提示</text>
          <text class="tag2">获取手机号才能体验完整功能</text>
          <view class="box u-border-top">
              <button @tap="onClose" class="u-border-right">取消</button>

               <button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认</button>

          </view>
      </view>
    </u-popup>

  </view>
</template>


<script>
export default {
  name: "logo-pop",
  data(){
    return{
			subMchId: '',
			state: '未认证',
    }
  },
  computed: {
    isAuto:{
      get() {
        return this.$store.state.isAutoPhone
      },
      set (value) {
        console.log(value,'vuex')
        this.$store.commit('imporIsAutoPhone', value)
      }
    }
  },
  methods:{
    onClose(){
      this.$store.commit('imporIsAutoPhone',false)
			
    },
		postuser(form) {
			uniCloud
				.callFunction({
					name: 'postuser',
					data: { ...form }
				})
				.then(res => {
					console.log(res,'ooooooooooo');
					
				});
		},
		sysUserInfo() {
		
			//拿数据
			this.$u.api
				.getUserInfo()
				.then(e => {
					console.log('tab数据', e);
					var form = {};
					if(e.hasSupplierAccount && typeof e.mchidApplyDTO != 'undefined' && e.mchidApplyDTO.applymentState == 7){					
						this.state = '已认证';
						form = { ...e, state: '已认证', subMchId: e.mchidApplyDTO.subMchid };
						this.postuser(form);
						return
					}else{
						form = { ...e, state: this.state, subMchId: this.subMchId, supplierId: '' };
						this.postuser(form);
					}
					uni.setStorageSync({
						key: 'userinfoKey',
						data: e
					});
		
					this.$store.commit('tabAuth', e);
					permiss(this).then(() => {
						this.tabbar = this.$store.state.tab;
						console.log(this.tabbar, '444');
					});
				})
				.catch(err => {
					console.log(err);
				});
				
		},
    getPhoneNumber(e){  // 获取手机号
           let that = this
            if(e.detail.errMsg == 'getPhoneNumber:ok'){
              let param = {
                "encryptedData": e.detail.encryptedData,
                "ivStr": e.detail.iv
              }
              that.$u.api.getWxPhoneNo(param).then(e=>{
                console.log(e.phoneNumber)
                console.log(e,'99999')
								if(e.phoneNumber){
									this.sysUserInfo()
								}
              }).catch(err=>{
                console.log("参数",param)
                console.log("解密失败进",err)

                uni.login({
                  success(res) {
                    console.log('402code',res.code) //保存token
                    that.$u.api.logoin(res.code).then(e=>{
                      uni.setStorage({
                        key:'tokenorid', data:e,
                      });
                      that.$u.api.getWxPhoneNo(param).then(e=>{
                        console.log(e.phoneNumber)
												if(e.phoneNumber){
														this.$u.route({url:'pages/activity/personal'})
													
												}
												
                      }).catch(er=>{
                        console.log(er)
                      })



                    }).catch(err=>{
                      console.log("错误",err)
                    })

                  }
                })


              })
            }else{
              console.log('拒绝')
            }

      this.$store.commit('imporIsAutoPhone',false)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        //406 调接口

       // getWxPhoneNo

        // this.$store.commit('imporIsAutoPhone',false)
        // that.headUpDate(data)
    },


  }
}
</script>

<style lang="scss" scoped>
button::after {
  border: none;

}

button {
  background-color: transparent;

  padding-left: 0;

  padding-right: 0;

  line-height:inherit;

}

button {
  border-radius:0;

}
  .x-conter{
    height: 450rpx;
    width: 550rpx;
    background-color: #FFFFFF;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    .tag1{
      font-size: 32rpx;
      font-weight: bold;
      margin-top: 30rpx;
    }
    .tag2{
      margin-top: 120rpx;
    }
    .box{
      height: 80rpx;
      width: 100%;
      margin-top: auto;
      display: flex;
     button, view{
        flex: 1;
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
</style>