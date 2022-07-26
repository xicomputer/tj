<template>
	<view>
		<web-view :src="agreement"></web-view>
	</view>
</template>

<script>
	export default {
	  data() {
	    return {
				agreement:''
			}
		},
		onLoad(e) {
			if(e.id==1){
				this.agreement = 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/yhxy.html'
			}else if(e.id==2){
				this.agreement = 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguanguangjia/ysxy.html'
			}
		},
	}
</script>

<style>
</style>