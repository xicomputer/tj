<template>
  <view class="x-center">
    <text class="u-line-4" style="max-height: 190rpx; overflow: hidden">{{item2.activity.introduce}} </text>
    <text class="tag3"><text class="u-font-20">￥</text>{{item2.activity.commodity.showPrice}}</text>
    <view class="goods-info">

      <view class="box-img" v-for="(item3,index3) in  item2.activity.commodity.fileList " :key="index2">
        <view >
          <image class="img-detail" :src="item3.fileUrl" mode=""></image>
          <image v-if="item3.location == 0" class="img-off" src="/static/bf.png"></image>
        </view>
      </view>
    </view>

    <view class="goods-content">

      <view class="x-info">
        <text>{{item2.promotionTime|mintime }}发布</text>
        <text> {{item2.activity.browseCount|| 0}} 人浏览</text>
      </view>

      <view class="tag2">
        <!-- <text class="tag1 u-line-2">{{item.commodity.commodityName}}</text> -->
        <view>物流发货</view>
      </view>
    </view>
  </view>
</template>

<script>
import utils from '@/common/logic/utils/util.js'
export default {
  name: "refdeo",
  props:['item2'],
  filters: {
    mintime(value) {
      let _fromatTime = value.replace(/-/g, "/");
      let oldTime = new Date(_fromatTime)
      oldTime = oldTime.getTime(oldTime)

      let newTime = new Date()
      newTime = newTime.getTime(newTime)
      let surplus = newTime - oldTime
      surplus = utils.dateUtil.humanize(surplus)

      return surplus
    }
  },
  mounted() {
    this.$emit('childByValue', '你好')
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.x-center {
>text {
  font-size: 36rpx;
  color: #333333;
  padding-bottom: 20rpx;
  font-weight: 800;
}
.tag3 {
  color: #FF6D2E;
  font-size: 50rpx;
  font-weight: bold;
  overflow: hidden;
  padding: 0;
}

.goods-info {
  display: flex;
  width: 100%;
  overflow: hidden;
  padding-top: 20rpx;
.box-img {
  width: 33.33%;
  height: 200rpx;
  margin-left: 20rpx;
view{
  width: 100%;
  height: 100%;
  position: relative;
.img-detail{
  width: 100%;
  height: 200rpx;
  background-size: 100% 100%;
  border-radius: 8rpx;
}
.img-off{
  height: 80rpx;
  width: 80rpx;
  background-size: 100% 100%;
  position:absolute;
  left: 50%;
  top: 50%;
  margin-left:-40rpx;
  margin-top: -40rpx;
}
}
}
.box-img:nth-child(1) {
  margin-left: 0;
}
}

.goods-content {
  margin-top: 15rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
.tag1 {
  font-size: 30rpx;
  color: #333333;
  font-weight: 800;
}
.x-info {
text {
  padding: 0;
  margin: 0;
  font-size: 26rpx;
  color: #00D674;
  border-right: 1px solid #00D674;
  line-height: 100%;
  margin-right: 15rpx;
  padding-right: 15rpx;
}

text:nth-child(2) {
  border-right: none;
}
}
.tag2 {
  padding: 10rpx 0;
  display: flex;
  justify-content: space-between;

text {
  font-size: 30rpx;
  color: #333333;
  font-weight: 800;
}

view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112rpx;
  height: 40rpx;
  background-color: #FF6D2E;
  color: #FFFFFF;
  border-radius: 8rpx;
  text-align: center;
  font-size: 26rpx;
  margin-left: 10rpx;
  box-sizing: border-box;


}
}


}
}
</style>