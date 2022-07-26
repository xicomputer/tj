<script>
	export default {
    globalData: {
      Logistics: null,
	  OPENID:'',
		USERINFO:'',
		INVITATION:'',
		IMPLEMENTED:'no',
	  pop_currentObj:{},
	  newNowIndex:{},
	  shopNmaeList:{},
	  nameList:{},
	  currentObj:{},
	  selectRole:'',
	  defaName:{},
	  dealerId:'',
	  addInputnickName:''
    },
    onLaunch: function() {

      /* #ifdef MP-WEIXIN */
			  const updateManager = uni.getUpdateManager();
          if(updateManager){
            updateManager.onCheckForUpdate(function (res) {
              // 请求完新版本信息的回调
              console.log(res.hasUpdate);
            });

            updateManager.onUpdateReady(function (res) {
              uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              });
            });

            updateManager.onUpdateFailed(function (res) {
              // 新的版本下载失败
              console.log('download error')
              uni.showModal({
                title: '提示',
                content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
                confirmText: "知道了"
              });
            });
          }

		  /* #endif*/
		},
		onShow: function() {
			
		},
		methods:{
	
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	 // @import "uview-ui/libs/css/style.components.scss";
		@import "uview-ui/index.scss";
		.c9{
			color: #999999;
		}
		.c3{
			color: #333333;
		}
		.thick{
			font-weight: bold;
		}
		.x-block{
			display: block;
		}
		view,text{
			font-family: PingFang SC,sans-serif,Arial, Helvetica;
		}
		// 数据加载完毕  文字
		.show-data-end {
			&::after {
				content: '已全部加载';
				padding: 20rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #333333;
				text-align: center;
				display: block;
			}
		}
</style>