<template>
  <!-- <view class="page flex-col">
		<view class="describe-box">			
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 900;margin-bottom: 20rpx;">
					活动描述<text style="color: red;">(根据活动需要可填可不填)</text>
				</view>
				<u-input :border='true' type="textarea" v-model="describe_list.text" :maxlength="-1" placeholder="活动详情描述" />
			</view>
			<u-gap height="20" bg-color="#f8f8f8"></u-gap>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 900;margin-bottom: 20rpx;">
					上传视频
				</view>
				<uni-file-picker  v-model="videoDetailValue" class="activity-poster" fileMediatype="video" returnType="array" @success="(e)=>{selectvideo(e,index)}" :image-styles="imageStyle"  @delete="videoDelete"/>
			</view>
			<u-gap height="20" bg-color="#f8f8f8"></u-gap>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 900;margin-bottom: 20rpx;">
					上传图片
				</view>
				<uni-file-picker  v-model="imageDetailValue" class="activity-poster" fileMediatype="image" returnType="array" @success="(e)=>{selectImg(e,index)}" :image-styles="imageStyle"  @delete="imageDelete"/>
			</view>
		</view>
		<view class="layer1 flex-col">
		  <view class="mod1 flex-col">
		    <view class="layer4 flex-row u-col-center" @tap="addItem">
		      <text class="word5">+</text>
		      <text class="info1">添加文本框</text>
		    </view>
		  </view>
		</view>
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="onClick_1">
		    <text class="word6">完成</text>
		  </button>
		</view>
	</view> -->
	<view>
		<view class="editor_toolbox">
			<i class="iconfont icon-undo" data-method="undo" @tap="edit" />
			<i class="iconfont icon-redo" data-method="redo" @tap="edit" />
			<i class="iconfont icon-img" data-method="insertImg" @tap="edit" />
			<i class="iconfont icon-video" data-method="insertVideo" @tap="edit" />
			<i class="iconfont icon-link" data-method="insertLink" @tap="edit" />
			<i class="iconfont icon-text" data-method="insertText" @tap="edit" />
			<i class="iconfont icon-clear" @tap="clear" />
			<i class="iconfont icon-save" @tap="save" />
		</view>
		<view style="padding-top: 50px;">
			<mp-html ref="article" container-style="padding:20px" :content="describe_list"
				domain="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo" :editable="editable" @remove="remove" />
		</view>
		<block v-if="modal">
			<view class="mask" />
			<view class="modal">
				<view class="modal_title">{{modal.title}}</view>
				<input class="modal_input" :value="modal.value" maxlength="-1" auto-focus @input="modalInput" />
				<view class="modal_foot">
					<view class="modal_button" @tap="modalCancel">取消</view>
					<view class="modal_button" style="color:#576b95;border-left:1px solid rgba(0,0,0,.1)"
						@tap="modalConfirm">确定</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	import mpHtml from '@/components/mp-html/mp-html'
	import content from './content'
	// 上传图片方法
	function upload(src, type) {
		let randomName = Math.floor(Math.random() * 1000000) + '0000' + Date.now() + ['y', 'd', 's', 'x'][Math.floor(Math.random() * 4)]
		return new Promise((resolve, reject) => {
			// console.log('上传', type === 'img' ? '图片' : '视频', '：', src)
			// resolve(src)
			
			uniCloud.uploadFile({
				filePath: src,
				cloudPath:randomName+'.jpg',
				success(res) {
					console.log(res.fileID,'ddd');
				  resolve(res.fileID) // 返回线上地址
				},
				fail: reject
			})
			/*
			// 实际使用时，上传到服务器
			wx.uploadFile({
			  url: 'xxx', // 接口地址
			  filePath: src,
			  name: 'xxx',
			  success(res) {
			    resolve(res.data.path) // 返回线上地址
			  },
			  fail: reject
			})
			*/
		})
	}
	// 删除图片方法
	function remove(src) {
		console.log('删除图片：', src)
		uniCloud.deleteFile(
		  {
		    fileList: [src],
			success(res){
				console.log('删除成功');
			},
			fail(){},
			complete(){}
		  }
		);
		// 实际使用时，删除线上资源
	}
export default {
  components: {
  	mpHtml
  },
  data() {
    return {
			constants: {},
			action: '',
			imageDetailValue:[],
			videoDetailValue:[],			
			describe_list:'',
			content,
			modal: null,
			editable: true
    };
  },
	eventChannel: null,
	onLoad(options) {
		this.eventChannel = this.getOpenerEventChannel()
		this.eventChannel.on('acceptDataFromOpenerPage', data=> {
		    console.log(data,'dddddd')
		    console.log(typeof data.data,'dddddd')
			if(typeof data.data === 'string'){
				this.describe_list = data.data
			}
			console.log(this.describe_list,'6666');
		  })	
		
		
	
	},
  methods: {
	  
	  	// 删除图片/视频/音频标签事件
	  	remove(e) {
	  		// 删除线上资源
	  		remove(e.src)
	  	},
	  	// 处理模态框
	  	modalInput(e) {
	  		this.value = e.detail.value
	  	},
	  	modalConfirm() {
	  		this.callback.resolve(this.value || this.modal.value || '')
	  		this.$set(this, 'modal', null)
	  	},
	  	modalCancel() {
	  		this.callback.reject()
	  		this.$set(this, 'modal', null)
	  	},
	  	// 调用编辑器接口
	  	edit(e) {
	  		this.$refs.article[e.currentTarget.dataset.method]()
	  	},
	  	// 清空编辑器内容
	  	clear() {
	  		uni.showModal({
	  			title: '确认',
	  			content: '确定清空内容吗？',
	  			success: res => {
	  				if (res.confirm)
	  					this.$refs.article.clear()
	  			}
	  		})
	  	},
	  	// 保存编辑器内容
	  	save() {
	  		setTimeout(() => {
	  			var content = this.$refs.article.getContent()
	  			uni.showModal({
	  				title: '是否保存当前布局',
	  				// content,
	  				confirmText: '完成',
	  				success: res => {
	  					if (res.confirm) {
							// this.describe_list = content
	  						// 复制到剪贴板
	  						// uni.setClipboardData({
	  						// 	data: content,
	  						// })
	  						// 结束编辑
	  						this.editable = false
								setTimeout(()=>{
									this.eventChannel.emit('ephor',{describe_list: content})
									this.$u.route({type: 'back'})
								},1200)
							
	  					}
	  				}
	  			})
	  		}, 50)
	  	}
	  
		//   imageDelete(e) {
		// 	this.imageDetailValue.splice(this.imageDetailValue.findIndex(x => x.url == e.url), 1);
			
		//   },
		//   videoDelete(e) {
		//   	this.videoDetailValue.splice(this.videoDetailValue.findIndex(x => x.url == e.url), 1);
		  			
		//   },
		// onClick_1() {
		// 	this.eventChannel.emit('ephor',{describe_list: this.describe_list})
		// 	this.$u.route({type: 'back'})
		// },
		// addItem() {
		// 	this.describe_list.concat(this.describe_list)
		// 	console.log(this.describe_list,'uuu');
		// },
		// selectImg(e,index){
		// 	console.log('upload images',e)
		// 	this.describe_list.imgs = e.tempFiles
		// },
		// selectvideo(e,index){
		// 	console.log('upload video',e)
		// 	this.describe_list.videos = e.tempFiles
		// }
  },
  onReady() {
  	/**
  	 * @description 设置获取链接的方法
  	 * @param {String} type 链接的类型（img/video/audio/link）
  	 * @param {String} value 修改链接时，这里会传入旧值
  	 * @returns {Promise} 返回线上地址
  	 *   type 为音视频时可以返回一个数组作为源地址
  	 *   type 为 audio 时，可以返回一个 object，包含 src、name、author、poster 等字段
  	 */
  	this.$refs.article.getSrc = (type, value) => {
  		return new Promise((resolve, reject) => {
  			if (type === 'img' || type === 'video') {
  				uni.showActionSheet({
  					itemList: ['本地选取', '远程链接'],
  					success: res => {
  						if (res.tapIndex === 0) {
  							// 本地选取
  							if (type === 'img') {
  								uni.chooseImage({
  									count: value === undefined ? 9 : 1, // 2.2.0 版本起插入图片时支持多张（修改图片链接时仅限一张）
  									success: res => {
  										// #ifdef MP-WEIXIN
  										if (res.tempFilePaths.length == 1 && wx.editImage) {
  											// 单张图片时进行编辑
  											wx.editImage({
  												src: res.tempFilePaths[0],
  												complete: res2 => {
  													uni.showLoading({
  														title: '上传中'
  													})
  													upload(res2.tempFilePath || res.tempFilePaths[0], type).then(res => {
  														uni.hideLoading()
  														resolve(res)
  													})
  												}
  											})
  										} else {
  											// #endif
  											uni.showLoading({
  												title: '上传中'
  											});
  											(async () => {
  												const arr = []
  												for (let item of res.tempFilePaths) {
  													// 依次上传
  													const src = await upload(item, type)
  													arr.push(src)
  												}
  												return arr
  											})().then(res => {
  												uni.hideLoading()
  												resolve(res)
  											})
  											// #ifdef MP-WEIXIN
  										}
  										// #endif
  									},
  									fail: reject
  								})
  							} else {
  								uni.chooseVideo({
  									success: res => {
  										uni.showLoading({
  											title: '上传中'
  										})
  										upload(res.tempFilePath, type).then(res => {
  											uni.hideLoading()
  											resolve(res)
  										})
  									},
  									fail: reject
  								})
  							}
  						} else {
  							// 远程链接
  							this.callback = {
  								resolve,
  								reject
  							}
  							this.$set(this, 'modal', {
  								title: (type === 'img' ? '图片' : '视频') + '链接',
  								value
  							})
  						}
  					}
  				})
  			} else {
  				this.callback = {
  					resolve,
  					reject
  				}
  				let title
  				if (type === 'audio') {
  					title = '音频链接'
  				} else if (type === 'link') {
  					title = '链接地址'
  				}
  				this.$set(this, 'modal', {
  					title,
  					value
  				})
  			}
  		})
  	}
  },
};
</script>
<style lang="scss" scoped>
	.editor_toolbox {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
		background-color: #EDEDED;
		display: flex;
		padding: 5px;
		box-sizing: border-box;
		line-height: 1.6;
	}
	
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAeYAAsAAAAADlAAAAdLAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEAgqOYItrATYCJAMkCxQABCAFhG0HcBv/CzOjdoNyEiD7nwnxpstuRCLrGmPTaffv/hnWZJHUNtWZeOD/3t03mks73vmC/3jA8SRom0aatimgfv7d9M8lBEJCIHRBKua0E7EEOqedMBEJm8N7js0MWpgq9PlMkGcTsS8NgH3X/AEbFaFGZNFvH+xR2uYofWlu9NO9ypmTgvNlW8CitMbdT7rHpgAXaKxBOfzWBdQCFgyrMV3kKtMLUFGd7GEC0JSkACq79OKAIMbDAW2W48z1QESSiQsUARGRZFyYAZ0AR8Q1ogsAjs7vhy+UBQIgwhPwR83HdB4F7R6gR25M+CrAUEwAobtM6LuBBBRA1qlLZvYO80KFg8isxmImAH1xHwzc0UPpQ/ph9cNLD+8+cn/9mnAgGQwUGkVj0B1kUhL4EP94IgQIVeCoDc62pg7uyLCRwUMCauARlsQ0ElWAq5EoAV9CogB8FzYieLq7qQM0rM5DYAriAik/Li6hNpHBj2knBBuokIJWymUizhppEknSNKNTIHnPfnR5WRIjFnmB0MgyTh9CFr9W5WgCNNfq00hdfi0KEVVL7I0kQvMYjy8OUbDAQIFwzDiGGzMKX+/PVu1sih2FbLk8PneQ0e84zT9a9GckbXu06x/h1C0hw45Twmlb0BLgUtCw7qqMfsqCGhV6bZl8tzTOhwXIwI1ZQCJLIIvccUoHE88h4XC2eGu4M/1XNB3fedRypMHlpyhbEwA5zn0qQ+4JIFxpmvQRIqHR6kOYxT8yRF6DufwjDl1JEG+8Wqk8ej0Z33StarLSdvb0fhAL+06dIRXWc4EDCLccDJ7nRTRGNUgi5S3sUk8hG4BAIuuqdJzCcXaWtWpZK0O7I0Mqs9SeBk6HJs+pMZ3cqWSo18Up8nh2vcql1drvYnRZfFaWawwlbAjnNuUeD0fz47f2GNsa/fF7o5EiX96JqiMhfWMOZ3c32aoWarUuu1GgZb3ZijxTszPBoebYYVU51WtjNSTXad3ekZzB2YUmmynf7Frv87CjOrjBApsDIHqPD//DhUKGSMSAEKRwBgqH+XDUGI0YIlaOKiYk2EnSqUEWF7XAageI3OVCf/PhsDEaNSKnhrSzKBTiQlVdDbJsPEl0ONSUS4ssTnLO4dOJ8O/y7lwLIsG9w6MxwIZTFYojgSR8c7B6ksJqZ8UOB6W0ubb0SifPuQb42mUpNFyJuQI0OLvELTPRSN5ODs3CBUKIBoDa1xrz1K/SNy3fVPVDMKK2XqdM6a9QLFycnZWRVUJ89QUvJOjZoAOfr7zKhGDrb79CEfP5M8/DTEvPngRh8AWBr9OZ66+89rX3tVtZ8tVf0r2fhur6+fMn0ALooJU7KIuS79+fpFNWX018UNVONCAU6vv7QGWHX5rbxpdvCW5JI9sFt9aUVW1pjXfr1K+5X6dOeOsts8vm/p1Iq+glCpUiObh4EVm2JbClPL5V603DrqjoTQomnlFsolUURBISwDpcroJ7b0oA02NQonc6VOv1iZVzBiYiduCcysTgHXF6OAN6GftRd0b3kZV9q0+AxEQ+IRESEvhEqIl262o2d+ZSUQfnmQcNY2dMXbp06rKxDTkJDJeW6vN3QmnfdO+etSJLmp0tSazIHjphQaZo7r6Dq2MZ3eom36nkLlp5St+X1jcrBkv4xK/79qbGfer3tXOWL0+NzJUNjuev1m2r8TwarGszs8uaVXMJRufavYvjGRWXNvLMw4a6hqnTp+OWddN3rFg+ixl4/IR5XXolag7ZzhxpDtvDmd17wTeo3HzocG+79mhzQ6GYS6SY3AUFNu1aUC5jsE6YcVIdLZk+YIqhI161tOWSVwtt2jUJey9Kv5VI+tWYJCCe8U3j1Nhp6t/ry8zF48oidd2GdLkxpPOAeiG9UXgmkpyh9YWSltIkJvUm3/2XckNk/emn1TPGhuRv5ddp5qpQ5XLRDWCzQqyzQ4tWrMxPsIRfxsInjYr7g9evq5O7w5KQAvAPYk1YW0p4kkSoGpozaS3WThNOfixfE8B+wzrpbqcdWAzzu1akq+jGw+IgeIpNPUYoW30gqPdHzI3c6qeif0AMzVuoE4HK3keDt+KE/PXzUOM3K4anQW5D40VTGYGmWAAeCflDN7ulJpW9TyBKHUAklQgJIYOROQVQQamAKkJbaMrX9fKWFqYDBmUZgJkVDBDGXhBRCAKGcdEJJzg3AKfxAiSYgAHJgFrckJIVVqPJSTBWzCD5AKVcG5mmE7ftHW1TxhL2O+o/lEBlsJjO43U3rFG6OCU87VLVgBGu4Moeh2XJ4IVzTHXqVP1xNjNZp05TrlqTVkfBWC3zDJKPPaVcm611kvj5O9qmjKVgyI/9H0qg7cNiOq/AuKG60pBT6RyedqmUacDoLVzBlTKxFNUMPnu/HFOdugaV/jijqUxVNB2eqs41gtM3LCcta4sQhsQIRxIkRQSSIRLEim8daOMprvsqcXCDRdX2cFgMy8TbcsJh6vBNMY++jmv7bXgQHHmqWy0A') format('woff2');
	}
	
	.iconfont {
		flex: 1;
		text-align: center;
		font-family: "iconfont" !important;
		font-size: 22px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-undo:before {
		content: "\e607";
	}
	
	.icon-redo:before {
		content: "\e606";
	}
	
	.icon-img:before {
		content: "\e6e2";
	}
	
	.icon-video:before {
		content: "\e798";
	}
	
	.icon-link:before {
		content: "\e60d";
	}
	
	.icon-text:before {
		content: "\e6ce";
	}
	
	.icon-clear:before {
		content: "\e637";
	}
	
	.icon-save:before {
		content: "\e501";
	}
	
	/* 模态框 */
	.modal {
		position: fixed;
		top: 50%;
		left: 16px;
		right: 16px;
		background-color: #fff;
		border-radius: 12px;
		transform: translateY(-50%);
	}
	
	.modal_title {
		padding: 32px 24px 16px;
		font-size: 17px;
		font-weight: 700;
		text-align: center;
	}
	
	.modal_input {
		display: block;
		padding: 5px;
		margin: 0 24px 32px 24px;
		font-size: 14px;
		border: 1px solid #dfe2e5;
	}
	
	.modal_foot {
		display: flex;
		line-height: 56px;
		font-weight: 700;
		border-top: 1px solid rgba(0, 0, 0, .1);
	}
	
	.modal_button {
		flex: 1;
		text-align: center;
	}
	
	/* 蒙版 */
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: black;
		opacity: 0.5;
	}
// @import 'common.scss';
// .page {
// 	min-height: 100vh;
// 	background-color: #EFEEF4;
// 	padding-bottom: 131rpx;
// }
// /deep/ .describe-box textarea {
// 	height: 360rpx!important;
// }
// .describe-box { 
// 	background-color: #fff;
// }
// .layer1 {
// 	background-color: rgba(239, 238, 244, 1);
// 	width: 750rpx;
// 	.mod1 {
// 		width: 750rpx;
// 		.layer4 {
// 			width: 127rpx;
// 			height: 50rpx;
// 			margin: 20rpx 0 0 25rpx;
// 			.word5 {
// 				display: block;
// 				overflow-wrap: break-word;
// 				color: rgba(253, 111, 45, 1);
// 				font-size: 30rpx;
// 				height: 50rpx;
// 				white-space: nowrap;
// 				text-align: justify;
// 			}
// 			.info1 {
// 				width: 104rpx;
// 				height: 30rpx;
// 				display: block;
// 				overflow-wrap: break-word;
// 				color: rgba(253, 111, 45, 1);
// 				font-size: 26rpx;
// 				white-space: nowrap;
// 				line-height: 30rpx;
// 				text-align: justify;
// 			}
// 		}
// 	}
// }
// .is-footer {
// 	width: 100%;
// 	height: 131rpx;
// 	position: fixed;
// 	bottom: 0;
// }
// .layer5 {
// 	height: 131rpx;
// 	background-color: rgba(255, 255, 255, 1);
// 	padding-top: 19rpx;
// 	width: 750rpx;
// 	.block1 {
// 		height: 79rpx;
// 		border-radius: 6px;
// 		background-color: rgba(253, 111, 45, 1);
// 		width: 702rpx;
// 		.word6 {
// 			width: 68rpx;
// 			display: block;
// 			overflow-wrap: break-word;
// 			color: rgba(255, 255, 255, 1);
// 			font-size: 34rpx;
// 			white-space: nowrap;
// 			text-align: justify;
// 		}
// 	}
// }

</style>
