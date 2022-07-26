<template>
  <view class="content">
    <!-- 说明 -->
    <button type="primary" style="display: none;" @tap="shareFc()">生成海报</button>

    <!-- 生成海报 -->

    <!-- 图片展示由自己实现 -->
    <QSPopup ref="popup">
      <view class="flex_column">
        <view class="backgroundColor-white padding1vh border_radius_10px">
          <image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
        </view>
        <view class="flex_row marginTop2vh">
          <button type="primary" size="mini" @tap.prevent.stop="saveImage()">下载图片</button>
          <button    open-type="share"
                     type="primary"
                     size="mini"
                      >分享
          </button>

<!--          <button catchtap="share"-->
<!--                  id="mainShopDetail"-->
<!--                  :data-title="item.activity.commodity.commodityName"-->
<!--                  :data-img="item.activity.commodity.thumbnail"-->
<!--                  :data-activityId="item.activityId"-->
<!--                  :data-promotionId="item.promotionId"-->
<!--                  open-type="share">-->
<!--            <image src="../../../static/wxiocn.png" mode=""></image>-->
<!--            <text>分享</text>-->
<!--          </button>-->


        </view>
      </view>
    </QSPopup>
    <!-- 画布 -->
    <view class="hideCanvasView">
      <canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId"
              :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}">

      </canvas>
    </view>
  </view>

</template>

<script>
import _app from '../QS-SharePoster/app.js';

import {
  getSharePoster
} from '../QS-SharePoster/QS-SharePoster';

export default {
  data() {
    return {
      poster: {},
      posterImage: '',
      canvasId: 'default_PosterCanvasId',
      wxCodeImg:'',
      nickName:'',
      headImgUrl:'',
      userId:null
    }
  },

  methods: {
    shareFc(){

      let {nickName,headImgUrl,userId} = uni.getStorageSync('tokenorid');
      this.nickName = nickName
      this.headImgUrl = headImgUrl
      this.userId = userId
      let param = {
        "page": "pages/home_page/my_shop/my_shop",
        "scene": JSON.stringify(
            {
              'mainUserId':userId,
               "enterBT":'BT'

            }
        )
      }
      this.$u.api.createCode(param).then(e=>{
        this.wxCodeImg= e
        console.log("this.wxCodeImg",this.wxCodeImg)
        this.shareFc2(e,headImgUrl,nickName)


        uni.showLoading({
          title: '加载中',
          mask:true
        });
      }).catch(err=>{
        console.log(err)

      })
    },
    async shareFc2(imagewxewm,headImg,nameWx) {
      try {
        const d = await getSharePoster({
          _this: this, //若在组件中使用 必传
          type: 'testShareType',
          formData: {
            //访问接口获取背景图携带自定义数据

          },
          backgroundImage: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/yqhb2.png',
          posterCanvasId: this.canvasId, //canvasId
          delayTimeScale: 20, //延时系数
          /* background: {
            width: 1080,
            height: 1920,
            backgroundColor: '#666'
          }, */
          drawArray: ({
                        bgObj,
                        type,
                        bgScale
                      }) => {
            const dx = bgObj.width * 0.3;
            // const fontSize = bgObj.width * 0.045;
            const lineHeight = bgObj.height * 0.04;
            //可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
            return new Promise((rs, rj) => {
              rs([ {
                  type: 'image',
                  url: imagewxewm,
                  infoCallBack(imageInfo) {
                    let scale = bgObj.width * 0.2 / imageInfo.height;
                    console.log(bgObj.width , imageInfo.width*scale,999)
                    return {
                      circleSet: {
                        x: imageInfo.width * scale / 2,
                        y: bgObj.width * 0.2 / 2,
                        r: bgObj.width * 0.2 / 2
                      }, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
                      dWidth: imageInfo.width *scale, // 因为设置了圆形图片 所以要乘以2
                      dHeight: bgObj.width * 0.2,
                      dx:( bgObj.width / 2 - imageInfo.width*scale / 2),
                      dy: 350,
                      /* roundRectSet: { // 圆角矩形
                        r: imageInfo.width * .1
                      } */
                    }
                  }
                },
                {
                  type: 'image',
                  url: headImg,
                  infoCallBack(imageInfo) {
                    let scale = bgObj.width * 0.2 / imageInfo.height;
                    console.log(bgObj.width , imageInfo.width*scale,999)
                    return {
                      circleSet: {
                        x: imageInfo.width * scale / 2,
                        y: bgObj.width * 0.2 / 2,
                        r: bgObj.width * 0.2 / 2
                      }, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
                      dWidth: imageInfo.width *scale, // 因为设置了圆形图片 所以要乘以2
                      dHeight: bgObj.width * 0.2,
                      dx:( bgObj.width / 2 - imageInfo.width*scale / 2),
                      dy: 30,
                      /* roundRectSet: { // 圆角矩形
                        r: imageInfo.width * .1
                      } */
                    }
                  }
                },
                {
                  type: 'text',
                  text: nameWx,
                  textAlign: "center",
                  size: 30,
                  color: 'black',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    console.log(bgObj.height, lineHeight,1111111111111111)
                    return {
                      dx: bgObj.width / 2,
                      dy: 110
                    }
                  }
                },

                {
                  type: 'text',
                  text: '邀请你加入我的',
                  textAlign: "center",
                  size: 20,
                  color: 'black',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 160
                    }
                  }
                }
                ,{
                  type: 'text',
                  text: '圈层线上云仓商城',
                  textAlign: "center",
                  size: 20,
                  color: 'black',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 190
                    }
                  }
                },
                {
                  type: 'text',
                  text: '自购返利又省钱',
                  textAlign: "center",
                  size: 16,
                  color: '#FF6D2E',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 230
                    }
                  }
                },
                {
                  type: 'text',
                  text: '帮我推荐赚佣金',
                  textAlign: "center",
                  size: 16,
                  color: '#FF6D2E',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 260
                    }
                  }
                },
                {
                  type: 'text',
                  text: '成为我的好友推荐官',
                  textAlign: "center",
                  size: 16,
                  color: '#FF6D2E',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 290
                    }
                  }
                },{
                  type: 'text',
                  text: '开始品宣赚钱吧',
                  textAlign: "center",
                  size: 16,
                  color: '#FF6D2E',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 320
                    }
                  }
                },


                {
                  type: 'text',
                  text: '长按扫码成为帮推官',
                  textAlign: "center",
                  size: 22,
                  color: '#000000',
                  alpha: 1,
                  textBaseline: 'top',
                  infoCallBack(textLength) {
                    return {
                      dx: bgObj.width / 2,
                      dy: 450
                    }
                  }
                },

              ]);
            })
          },
          setCanvasWH: ({
                          bgObj,
                          type,
                          bgScale
                        }) => { // 为动态设置画布宽高的方法，
            this.poster = bgObj;
          }
        });
        _app.log('海报生成成功, 时间:' + new Date() + '， 临时路径1: ' + d.poster.tempFilePath)
        this.posterImage = d.poster.tempFilePath;
        uni.hideLoading()
        this.$refs.popup.show()

      } catch (e) {

        _app.showToast(JSON.stringify(e));
        console.log(JSON.stringify(e));
      }
    },
    saveImage() {
     let that =  this
      console.log(this.posterImage)
      uni.authorize({
        scope: 'scope.writePhotosAlbum',
        success(e) {
          console.log(e)
          uni.saveImageToPhotosAlbum({
            filePath: that.posterImage,
            success(res) {
              that.$refs.popup.hide()
              that.$tools.toast("亲~ 已成功下载到您的相册");
            },
            fail(e){
              console.log(e)
            }
          })
        }
      })
      // #ifndef H5

      // #endif
      // #ifdef H5
      _app.showToast('保存了');
      // #endif
    },
    share() {
      // #ifdef APP-PLUS
      _app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
      // #endif

      // #ifndef APP-PLUS
      _app.showToast('分享了');
      // #endif
    },
    hideQr() {
      this.$refs.popup.hide()
    }
  }
}
</script>

<style>
.last-img{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.last-img image{
  width: 300rpx;
  height: 200rpx;
}
.last-img text{
  font-size: 26rpx;
  width: 200rpx;
  height: 200rpx;
}

.hideCanvasView {
  position: relative;
}

.hideCanvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}

.flex_row_c_c {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modalView {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  outline: 0;
  transform: scale(1.2);
  perspective: 2500upx;
  background: rgba(0, 0, 0, 0.6);
  transition: all .3s ease-in-out;
  pointer-events: none;
  backface-visibility: hidden;
  z-index: 999;
}

.modalView.show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.flex_column {
  display: flex;
  flex-direction: column;
}

.backgroundColor-white {
}

.border_radius_10px {
  border-radius: 10px;
}

.padding1vh {

}

.posterImage {
  width: 80vw;
}

.flex_row {
  display: flex;
  flex-direction: row;
}

.marginTop2vh {
  margin-top: 2vh;
}
</style>
