<template>
  <view class="cantainer">
    <u-popup v-model="isAuto" mode="center" border-radius=10 z-index="100076">
      <view class="x-conter">
          <text class="tag1">温馨提示</text>
          <text class="tag2">登录后才能体验完整功能</text>
          <view class="box u-border-top">
              <view @tap="onClose" class="u-border-right">取消</view>
              <view @tap="autoEnter">确认</view>
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

    }
  },
  computed: {
    isAuto:{
      get () {
        return this.$store.state.isAuto
      },
      set (value) {
        console.log(value,'vuex')
        this.$store.commit('imporIsAuto', value)
      }
    }
  },
  methods:{
    onClose(){
      this.$store.commit('imporIsAuto',false)
    },
    autoEnter(){  // 授权
        let that = this
        uni.getUserProfile({
          desc:'用于信息展示',
          success:param=>{
            console.log("用户信息",param)
            uni.setStorage({
              key:'userinfoKey',data:param.userInfo,
            });
            let data={
              "headImgUrl":param.userInfo.avatarUrl,
              "nickName": param.userInfo.nickName,
            }
            this.$store.commit('imporIsAuto',false)
            that.headUpDate(data)
          }
        });
    },
    headUpDate(data){
      this.$u.api.pushHead(data).then(e=>{
      }).catch(err=>{
        console.log(err)
      })
    },

  }
}
</script>

<style lang="scss" scoped>
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
      view{
        flex: 1;
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
</style>