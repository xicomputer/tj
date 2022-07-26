// import {browseSave,getOpenId} from '@/common/logic/apis/apis.js';
import utils from './util.js';

export default {
	getStoreToken(){
		//var token=uni.getStorageSync('token_key');
		var userInfo=uni.getStorageSync('userinfo_key');
		return userInfo.token || '';
	},
	

	
	
	setStoreToken(token){
		uni.setStorageSync('token_key',token);
	},
	
	//提示信息
	toast(title='',icon='none',duration=1500){
		uni.showToast({
			title,icon,duration
		});
	},
	
	log(){//打印日志
		if(process.env.NODE_ENV=='development'){
			console.log(...arguments);
		}else{
			
		}
	},
	
	payMoney(data,callback){
		uni.requestPayment({
			...data,
			success() {
				typeof callback == 'function' && callback();
			}
		})
	},
	
	getStatusHeight(){
		var menuButtonInfo={
			height:32,top:24
		}
		// #ifdef MP-WEIXIN
		menuButtonInfo=wx.getMenuButtonBoundingClientRect();
		// #endif
		
		var {height,top} = menuButtonInfo;
		var {statusBarHeight,pixelRatio} = uni.getSystemInfoSync();
		var diffHeight=(height-statusBarHeight)/pixelRatio;
		var completeHeight=statusBarHeight+height+diffHeight*2;
		return {completeHeight,statusBarHeight,menuBtnH:height};
	},
	
	wxLogin(){
		return new Promise((resolve,reject)=>{
			uni.login({
				success:res=>{
					var code=res.code;
					getOpenId(code).then(res=>{
						if(res.code==200){
							var secret=res.data;
							secret.userCode=code;
							uni.setStorage({
								key:'secretinfo_key',data:secret
							});
							
							resolve(secret);
						}else{
							reject(res)
						}
					})
				}
			})
		});
	},
	
	saveBrowseInfo(that){
		var userInfo=uni.getStorageSync('userinfo_key') || {};
		var adInfo=uni.getStorageSync('adinfo_key') || {};
		var phoneNum=uni.getStorageSync('phonenum_key') || '';
		var secretinfo=uni.getStorageSync('secretinfo_key');
		var browseEndTime=new Date();
		var {browseStartTime,pageTarget,promoterId,promotionRole,employeeId} = that;
		console.log(8888,that)
		
		var reqData={
			appType:'applet',
			city:adInfo.city || '',
			province:adInfo.province || '',
			endTime:utils.dateUtil.stringifyDate({date:browseEndTime}),
			startTime:utils.dateUtil.stringifyDate({date:browseStartTime}),
			mobile:that.phoneNum || phoneNum,
			imei:secretinfo.unionid,

	
			/* target  浏览目标：
			* 1.顶部banner 2.商家案例 
			* 3.公司简介 4.平台 5.功能介绍 6.行业信息 
			* 7.视频介绍 8.营销技巧 9.信书说 10.营销首页
			*/ 
			target:pageTarget,	
									
			nickName:userInfo.nickName,
			headImgUrl:userInfo.avatarUrl
		}
		promoterId && (reqData.promoterId=promoterId);
		promotionRole && (reqData.promotionRole=promotionRole);
		employeeId && (reqData.employeeId=employeeId);
			
		
		browseSave(reqData).then(res=>{
			if(res.code==200){
				console.log('tools保存成功!');
			}
		});
	},
	
}