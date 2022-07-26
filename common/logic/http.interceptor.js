// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import {wxCode} from './utils/tools.js'
import httpurl from "./config.js"
let zdyConfig = {}
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: httpurl.apiReqBaseUrl,
		showLoading: true,// 是否显示请求中的loading
		loadingTime: 800,
		loadingMask: true,
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// 	originalData: true,
		// 设置自定义头部content-type
		header: {
			'Authorization': ''
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		zdyConfig =config.url
		if( config.url == '/distribution-client/user/login'){
			return config;
		}
		let token =vm.$store.state.tokenobj.token || uni.getStorageSync('tokenorid').token;
		config.header.Authorization =token ;
		return config;
		// console.log("拦截器token",token)
		// config.header.Authorization =token ;
		
	
		
		

		
		// if(token){
		// 	//有token 直接返回不做处理
		// 	config.header.Authorization =token;
		// 	return config; 
			
		// }else{
		// 	//没有token 1.获取token， 2获取登陆不要token 
			
		// 	// uni.login({
		// 	// 	success:res=>{
		// 	// 		var code=res.code;
			
		// 	// 		uni.request({
		// 	// 			url: 'https://test.xssj.letterbook.cn/distribution-client/user/login' ,
		// 	// 			method: 'POST',
		// 	// 			data:code ,
		// 	// 			success(cg) {
		// 	// 				console.log(cg.data.data.token)
		// 	// 				config.header.Authorization =cg.data.data.token
		// 	// 				return config;   
		// 	// 			}
		// 	// 		})
					
		// 	// 		// vm.$u.api.logoin(res.code).then(e=>{
		// 	// 		// 	// uni.setStorage({
		// 	// 		// 	// 	key:'tokenorid', data:e,
		// 	// 		// 	// });
		// 	// 		// 	config.header.Authorization =e.token;
		// 	// 		// 	console.log(e.token)
		// 	// 		// 	return config;   
		// 	// 		// }).catch(err=>{
		// 	// 		// 	console.log("错误",err)
		// 	// 		// })
		// 	// 	}
		// 	// })
			
			
		// }
		
			// console.log(config.url)
			// 	let that = vm;
			// 	uni.getStorage({
			// 		key:'tokenorid',
			// 		success:res=>{
			
			// 			config.header.Authorizatio=res.data.token
			// 			console.log("成功",config.header.Authorizatio)
			// 		},
			// 		fail:err=>{
			// 			console.log("失效")
			// 			// uni.login({
			// 			// 	success:res=>{
			// 			// 		var code=res.code;
			// 			// 		vm.$u.api.logoin(res.code).then(e=>{
			// 			// 			uni.setStorage({
			// 			// 				key:'tokenorid', data:e,
			// 			// 				success: function () {
			// 			// 				}
			// 			// 			});
			// 			// 			console.log(1111111111111111111111)
			// 			// 		}).catch(err=>{
			// 			// 			console.log("错误",err)
			// 			// 		})
			// 			// 	}
			// 			// })
			// 		}
			// 	});
				
		
				
		
		
			// let token = '';
		
		
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
	}
	// 响应拦截，判断状态码是否通过
	let isintercept = true
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if(res.code == 200){
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res.data;  
		}else if(res.code == 401){
			if(isintercept){

				isintercept = false
				uni.navigateTo({
					url:"/pages/login/login",
				})
			}
		}else if(res.code == 406){

			if(zdyConfig == '/distribution-client/activity/detail'){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}else{
				vm.$store.commit('imporIsAuto',true)
			}
		}else if(res.code == 407){
				console.log(407)
				vm.$store.commit('imporIsAutoPhone',true)
		}else if(res.code == 500){
			if(res.errorCode != 'session.key.invalid'){
				uni.showToast({
					title:res.msg,
					icon:'none'
				})
			}
			return Promise.reject(res);
		}else{
			return Promise.reject(res);
		}
	}
}

export default {
	install
}