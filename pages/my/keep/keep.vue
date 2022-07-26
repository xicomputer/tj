<template>
  <view class="cantainer">
    <view class="soso">
      <u-search class="set-width" height="76" placeholder="请输入店铺名称" :clearabled="true" :show-action="false" v-model="searchValue"></u-search>
      <view class="x-enter" @tap="onSearch" >搜索</view>
    </view>
    <view class="box">
      <view class="box-item" v-for="(item,index) in attention" :key="index" >
        <image v-if="item.userInfo.headImgUrl" :src="item.userInfo.headImgUrl" mode=""></image>
        <image v-else src="/static/moren.png" mode=""></image>

        <view class="z-center">
          <text class="u-font-32 c3 thick">{{item.userInfo.nickName || "默认推荐官"}}</text>
          <text class="u-font-24 c9">推荐商品次数：{{item.activityCount || 0}}</text>
        </view>
        <view :class="[nowIndex == index ? 'forbid' : '' ]" class="css-close" @tap="j_close(item.targetId,index)">
          {{nowIndex == index ? '已取消' : '取消订阅' }}
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
      tsmsg:"您目前还没有关注任何人",
      attention:[],
      keyword:'',
      searchValue:'',
      role:null,
      pageNum: 1,
      isclose:false,
      nowIndex:null

    }
  },
  onLoad(option) {
    this.role = option.role
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
    j_close(pro,index){

      this.$u.api.cancelAttention(pro).then(e=>{		//	取消关注  或订阅
        this.nowIndex = index
        this.$tools.toast("已取消")
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
          this.attention = []
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
      background: #FF3030;
      color: #fff;
      font-size: 24rpx;
      padding: 4rpx 8rpx;
      border-radius: 6rpx;
      margin-bottom: 20rpx;
    }
    .forbid{
      background: #cccccc !important;
    }
  }
}

</style>
