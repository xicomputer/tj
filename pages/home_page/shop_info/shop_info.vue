<template>
	<view class="cantainer">
    <wm-watermark text="仅供好友推荐官内部使用" opacity="0.4"> </wm-watermark>
      <view class="box">
        <view class="name-title flex-zdy">
          <view class="flex-zdy-item">
            <text>店铺名称</text>
            <text>{{listInfo.supplierName}}</text>
          </view>
        </view>


        <view class="flex-zdy" v-for="(item,index) in listInfo.qualificationList" :key="index"  @tap="isShow(index,item)">
          <view class="flex-zdy-item">
            <text class="u-margin-bottom-20">{{ item.dictLabel}}</text>
            <u-icon name="arrow-down"></u-icon>
          </view>
          <view class="img-box">

              <image :src="item2" @click="kandatu(item.urls)"  v-for="(item2,index2) in item.urls" :key="index2" mode='widthFix' lazy-load></image>


          </view>
        </view>
<!--        <view class="flex-zdy" v-for="(item,index) in listInfo.qualificationList" :key="index"  @tap="isShow(index,item)">-->
<!--          <view class="flex-zdy-item">-->
<!--            <text>{{ item.dictLabel}}</text>-->

<!--            <u-icon v-if="!item.orshow" name="arrow-right"></u-icon>-->
<!--            <u-icon v-if="item.orshow" name="arrow-down"></u-icon>-->

<!--          </view>-->
<!--          <view class="img-box" v-show="item.orshow">-->
<!--            <image :src="item2"  v-for="(item2,index2) in item.urls" :key="index2" mode='widthFix' lazy-load></image>-->
<!--          </view>-->
<!--        </view>-->


      </view>

	</view>
</template>
<script>
import wmWatermark from '../../../components/wm-watermark/wm-watermark';

	export default {
    // components: {},
    components:{
      wmWatermark
    },
		data() {
			return {
        listInfo:{}
			}
		},
    onLoad(option){

      this.$u.api.supplierInfo(option.supplierId).then(e=>{ 		//
        this.listInfo = e
        this.listInfo.qualificationList = this.listInfo.qualificationList.map((item,index)=>{
          return {
            ...item,
            orshow:false,
            urls:item.urls.split(',')
          }
        })

      })
    },
		methods: {
			// kandatu(src){
			// 	console.log(src,'src');
			// 	wx.previewImage({
			// 		current: src[0], // 当前显示图片的http链接
			// 		urls: src // 需要预览的图片http链接列表
			// 	})

			// },
      isShow(index,item){
        console.log(index,   this.listInfo.qualificationList[index].orshow)
        this.listInfo.qualificationList[index].orshow = !this.listInfo.qualificationList[index].orshow
      }
		}
	}
</script>

<style lang="scss">
.img-box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  image{
    // width: 500rpx;
	width: 100%;
	height: 100%;
    background-size: cover;
    margin-bottom: 20rpx;
  }
}
  .box{
    padding: 30rpx;
  }
  .flex-zdy{
    width: 100%;
    margin-bottom: 50rpx;
    .flex-zdy-item{
      display: flex;
      justify-content: space-between;
    }

  }
</style>
