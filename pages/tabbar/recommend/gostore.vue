<template>
  <view class="container">
    <view class="nav-title">
      <view :style="{height: filterBoxTop+'px'}"> </view>
      <view class="nima u-border-top"  :style="{ height: titleHeight+'px'}" >
        <u-icon @tap="jblack" class="tb" name="arrow-left" size="32" color="#ffffff"></u-icon>
        <u-search @click="searchFn" focus="true" :style="{height:higd +'px',overflow:hidden}"  class="set-width" :height="higd*2" placeholder="请输入商品名称" :clearabled="true" :show-action="false" ></u-search>
      </view>
    </view>
    <view class="box-past" :style="{ marginTop: filterBoxTop+titleHeight+10 +'px'}">
        <view class="z-head">
          <image :src="vendData.supplierLogo"></image>
          <view class="z-left">
            <view class="title">{{vendData.supplierName}}</view>
            <text class="rz">企业认证</text>
            <view class="zhpf">
              <text>综合评分：</text>
              <uni-rate size="20" :readonly="true"  :value="vendData.avgScore" />
              <text class="orange"> {{vendData.avgScore}}</text>
            </view>
          </view>
        </view>
    </view>
    <view class="box">
      <view class="z-leftz">
          <view class="xhitem" @tap="selectCaFn(index)"  :class="{'active': caindex == index}" v-for="(item,index) in CategoryList" :key="index">
              <view>
                {{item.categoryName}}
              </view>
          </view>
      </view>
      <view class="z-right" >
        <view  v-for="(item,index) in commodityList" :key="index">
          <view class="z-zdhead">
            <image :src="item.thumbnail"></image>
            <view class="z-left2">
              <view class="title u-line-2">{{item.commodityName}}</view>
              <text class="rz">自购价：￥{{ item.showPrice }}</text>
              <view class="down">
                  <view>
                    <text>库存：{{ item.totalStock }}&nbsp;</text>
                    <text>游览：{{item.browseCount}}人</text>
                  </view>
                  <text class="wl">物流</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "gostore",
  data(){
    return{
      filterBoxTop:'',
      paddingtop:'',
      jlheight:'',
      titleHeight:'',
      higd:'',
      nowIndex:0,
      supplierId:'',
      vendData:'',
      CategoryList:[],
      commodityList:'',
      caindex:0
    }
  },
  onLoad(options){
    this.filterBoxTop = uni.getSystemInfoSync()['statusBarHeight']; //信号高
    this.paddingtop = wx.getMenuButtonBoundingClientRect().top    //胶囊距离顶部高
    let jlheight = wx.getMenuButtonBoundingClientRect().height    //胶囊高
    this.higd = jlheight
    this.jlheight = ( this.paddingtop -this.filterBoxTop) //
    this.titleHeight =  jlheight+ this.jlheight*2

    console.log('ccc',JSON.parse(options.param))

    this.supplierId = JSON.parse(options.param).supplierId
    this.vendorinfo(this.supplierId)
    this.goodsCategoryFn(this.supplierId)
  },
  methods:{
    goodsCategoryFn(supplierId){ //分类信息

      let param = {
        "isAsc": "",
          "orderBy": "",
          "orderByColumn": "",
          "pageNum": 1,
          "pageSize": 10,
          "searchValue": "",
          "supplierId": supplierId
      }
      this.$u.api.goodsCategoryList(param).then(e=>{
        this.CategoryList=e.rows
        this.outletsinfo(e.rows[0])
      }).catch(err=>{
        console.log(err)
      })
    },
    outletsinfo(item){  //商品信息
      this.commodityList = []
      let param = {
        "categoryId": item.categoryId,
        "supplierId": this.supplierId,
        "pageNum": 1,
        "pageSize": 10,
      }
      this.$u.api.outlets(param).then(e=>{
        this.commodityList = e.rows
      }).catch(err=>{
        console.log(err)
      })
    },
    selectCaFn(index){
      this.caindex = index
      this.outletsinfo(this.CategoryList[index])
    },
    vendorinfo(supplierId){ //  企业信息
      this.$u.api.supplierInfo(supplierId).then(e=>{
        this.vendData = e

      }).catch(err=>{
        console.log(err)
      })
    },
    jblack(){
      uni.navigateBack({
        delta: 2
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  background: #f7f7f7;
  min-height: 100vh;
}
.box{
  display: flex;
  margin-top: 30rpx;
  background: #FFFFFF;
  .z-leftz{
    width: 170rpx;
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    .xhitem{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
        height:100rpx;
        width: 100%;
        background: #f7f7f7;
        padding:0 30rpx;
      view{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
        -webkit-line-clamp: 2; /* 控制最多显示几行 */
        -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
      }
    }

    .active{
      border-left: 4px solid #fc5610;
      color:#fc5610;
      font-weight: bold;
      background: #FFFFFF;

    }
  }
  .z-right{
    width: 580rpx;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    .z-zdhead{
      display: flex;
      margin-top: 30rpx;
      padding: 0 20rpx;
      image{
        width: 180rpx;
        height: 180rpx;
        border-radius: 8rpx;
      }
      .z-left2{
        padding-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 400rpx;
        .title{
          font-size: 30rpx;
          font-weight: bold;
        }
        .rz{
          color: #FF6D2E;
        }
        .down{
          font-size: 24rpx;
          display: flex;
          justify-content: space-between;
          color: #00AFFF;
          .wl{
            color: #FF6D2E;
            background: #fcddd0;
            padding: 1rpx 8rpx;
            border-radius: 6rpx;
          }
        }
      }
    }
  }
}
.nav-title{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: #FF6D2E;
  .nima{
    box-sizing: border-box;
    height: 80rpx;
    width: 100%;
    display: flex;
    padding-left: 20rpx;
    align-items: center;
    .set-width{
    }
    .tb{
      margin: 0 10rpx;
    }
    image{
      margin-bottom: auto;
      height: 60rpx;
      width: 60rpx;
    }
    text{
      padding-left: 10rpx;
      font-size: 30rpx;
      color: #FF6D2E;
    }
  }
}
.box-past{
  background: #FFFFFF;
  width: 100%;
  padding: 20rpx;
  .z-head{
    display: flex;
    image{
      width: 180rpx;
      height: 180rpx;
    }
    .z-left{
      padding-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        font-size: 30rpx;
        font-weight: bold;
      }
      .rz{
        background: #FF6D2E;
        color: #f7f7f7;
        padding: 2rpx 4rpx;
        width: 130rpx;
        text-align: center;
        border-radius: 8rpx;
      }
      .zhpf{
        display: flex;
        align-items: center;
        .orange{
          margin-left: 20rpx;
          font-size: 24rpx;
          color: #FF6D2E;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>