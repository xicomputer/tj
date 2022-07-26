<template>
	<view>
    <view class="nav-title">
        <view :style="{height: filterBoxTop+'px'}"> </view>
        <view class="nima"  :style="{paddingTop: jlheight+'px',height: titleHeight+'px'}" >
          <image src="/static/logo.png"></image>
          <text :style="{paddingBottom: jlheight+'px'}">xxxx商城</text>
        </view>
    </view>
    <image class="dj-banner" :style="{paddingTop: titleHeight+filterBoxTop+ 10 + 'px'}" src="/static/ba.png"></image>

    <view class="jjpm">
      <view class="jjpm-item" v-for="(item,index) in 10" :key="index">
        <image src="/static/logo.png"></image>
        <text>个护化妆</text>
      </view>
    </view>
    <view class="set-box">
      <u-search @click="searchFn" disabled="true" class="set-width" height="58" placeholder="请输入商品名称" :clearabled="true" :show-action="false" ></u-search>
    </view>
    <view class="tabs" >
      <view>
        <u-tabs :list="classList"
                active-color="#333333"
                :active-item-style="{
                       fontSize:'30rpx'
                      }"
                :is-scroll="true"
                :current="current"
                gutter="20"
                inactive-color="#333333"
                font-size="28"
                :show-bar="false"
                @change="change">
        </u-tabs>
      </view>
    </view>
    <view class="listsy">
        <view class="list-item" v-for="(item,index) in commodityList" :key="index">
          <image class="img" :src="item.thumbnail"></image>
          <view class="title u-line-1">{{item.commodityName}}</view>
          <view class="zg">自购价：￥{{ item.showPrice }}</view>
          <view class="kc">库存：{{ item.totalStock }} 浏览：{{item.browseCount}}人</view>
          <view class="down">
            <view>来自{{item.supplier.supplierName}}</view>
            <view @tap="gotoStore(item)">进店 > </view>
          </view>
        </view>
    </view>
    <u-tabbar :list="tabbar" ></u-tabbar>
  </view>
</template>

<script>
import permiss from '@/common/logic/permiss'
	export default {
		data() {
			return {
        tabbar:'',
        filterBoxTop:'',
        paddingtop:'',
        jlheight:'',
        titleHeight:'',
        current:0,
        classList:[
          {name:'全部'},
        ],
        sign:'',
        whetherPro:'',
        search:null,
        commodityList:[]
			}
		},
    onLoad(){
      this.filterBoxTop = uni.getSystemInfoSync()['statusBarHeight']; //信号高
      this.paddingtop = wx.getMenuButtonBoundingClientRect().top    //胶囊距离顶部高
      let jlheight = wx.getMenuButtonBoundingClientRect().height    //胶囊高
      this.jlheight = ( this.paddingtop -this.filterBoxTop) //
      this.titleHeight =  jlheight+ this.jlheight*2

      this.sign = "1430097937108615169";

      uni.getStorage({
        key:'tokenorid',
        success:res=>{
            this.prommoterFn(this.sign)
        },
        fail:err=>{
          this.getToken().then(e=>{
            this.prommoterFn(this.sign)
          })
        }
      });
    },
		methods: {
      prommoterFn(sign){
        this.$u.api.isPromoter(sign ).then(e=>{
          if(e){
            this.whetherPro =e
            if(e){
              this.navinit()
              this.sysUserInfo()
            }else{
              this.become(sign)
            }
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      become(sign){
        this.$u.api.promoter(sign).then(e=>{
          console.log(e)
          this.navinit()
          this.sysUserInfo()
        }).catch(err=>{
          console.log(err)
        })
      },
      async navinit(){    //  类目接口
        let param = {
          "isAsc": "",
          "level": 1,
          "orderBy": "",
          "orderByColumn": "",
          "pageNum": 1,
          "pageSize": 20,
          // "parentId": 0,
          "searchValue": ""
        }
        await this.$u.api.categoryList(param).then(e=>{
          if(e){
            let dispose = e.rows;
            dispose =  dispose.map((item,index)=>{
              return{
                name:item.categoryName,
                ...item
              }
            })
            this.classList = this.classList.concat(dispose); //将数据拼接在一起
            console.log( this.classList)
            this.goodsListFn({})
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      goodsListFn(item){
        let param = {
          "pageNum": 1,
          "pageSize": 10,
          // "role": "",
          "searchValue": this.search,
          "sysCategoryId": item.categoryId || null,
          // "userId": 0
        }
        this.$u.api.promoterList(param).then(e=>{
            if(e){
              this.commodityList = this.commodityList.concat(e.rows);
              console.log( 999, this.commodityList)
            }
        }).catch(err=>{
          console.log(err)
        })
      },
      getToken(indexEvent){
        return	new Promise((resolve,reject)=>{
          let that=this
          uni.login({
            success(res) {
              that.$u.api.logoin(res.code).then(el=>{
                that.$store.commit('SAVETOKEN',el)
                uni.setStorage({
                  key:'tokenorid', data:el,
                  success:function (){
                    resolve(el)
                  }
                })
              }).catch(err=>{
                reject(err)
              })
            }
          })
        })
      },
      change(index){    //导航点击事件
        this.current = index;
        console.log(index)
        this.current = index;
        this.commodityList= [];
        this.pageNumber=1;
        this.goodsListFn(this.classList[index])
      },
      searchFn(){
        uni.navigateTo({
          url:"/pages/tabbar/recommend/search_page"
        })
      },
      gotoStore(item){
        let param={
          supplierId:item.supplierId
        }

        uni.navigateTo({
          url:"/pages/tabbar/recommend/gostore?param="+JSON.stringify(param)
        })
      },
      sysUserInfo() { //拿数据
        this.$u.api.getUserInfo().then(e => {
          uni.setStorageSync({
            key: 'userinfoKey',
            data: e,
          });
          this.$store.commit('tabAuth',e)
          permiss(this).then(()=>{
            this.tabbar = this.$store.state.tab
          })
        }).catch(err => {
          console.log(err)

        })
      },
		}
	}
</script>

<style lang="scss">
  .tabs{
    width: 710rpx;
    margin: 0 auto;
  }
  .nav-title{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: #FFFFFF;
    .nima{
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 30rpx;
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
  .dj-banner{
    height: 280rpx;
    width: 710rpx;
    margin-left: 20rpx;
  }
  .set-box{

    width: 710rpx;
    padding-top: 10rpx;
    margin: 0 auto;
  }
  .listsy{
     background: #f7f7f7;
     display: flex;

    flex-wrap: wrap;
    .list-item{
      width: 342rpx;
      background: #FFFFFF;
      padding-bottom: 20rpx;
      margin: 20rpx 0 20rpx 22rpx;
      overflow: hidden;
      border-radius: 8rpx;
      >view{
        padding:3rpx 6rpx;
      }
      .img{
        width: 342rpx;
        height:342rpx;
      }
      .title{
        font-size: 30rpx;
        color: #000000;
      }
      .zg{
        color: #FE3936;
        font-size: 28rpx;
      }
      .kc{
        color: #1577FF;
        font-size: 26rpx;
      }
      .down{
        display: flex;
        justify-content: space-between;
        font-size: 26rpx;
        color: #999999;
      }
    }
  }
  .jjpm{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    .jjpm-item{
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      image{
        width: 100rpx;
        height: 100rpx;
      }
      text{
        font-size: 24rpx;
      }
    }
  }
</style>
