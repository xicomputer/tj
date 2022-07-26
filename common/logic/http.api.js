// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	
	//登录
	let logoin = (params = {}) => vm.$u.post("/distribution-client/user/login", params);
	
	//首页列表
	// let homeList = (params = {}) => vm.$u.post("/distribution-client/activity/allList", params);
	//首页列表
	let homeList = (params = {}) => vm.$u.post("/distribution-client/user/index", params);
	
		
	//供应商名字接口
	let supplier = (params = {}) => vm.$u.post("/distribution-client/supplier/list", params);
		
	//商品分类列表
	let goodsCategoryList = (params = {}) => vm.$u.post("/distribution-client/commodity/category/list", params);
	
	//app进来
	let appEnter = (params = {}) => vm.$u.post("/distribution-client/user/merchantToTJ", params);
	

	//商品列表
	let goodsList = (params = {}) => vm.$u.post("/distribution-client/commodity/list", params);

	//第二步发布列表
	let goodsIssue = (params = {}) => vm.$u.post("/distribution-client/activity/createOrUpdate", params);
	
	//编辑第二步商品详情
	let goodsDateilTwo = (params = {}) => vm.$u.post("/distribution-client/commodity/detail", params);	
	
	//首页商品详情
	let activityDetail = (params = {}) => vm.$u.post("/distribution-client/activity/detail", params);
	
	//收货地址
	
	let addressList = (params = {}) => vm.$u.post("/distribution-client/user/address/list", params);
	
	//创建订单
	let createOrder = (params = {}) => vm.$u.post("/distribution-client/order/create", params);
	
	//提交订单
	let submitOrder = (params = {}) => vm.$u.post("/distribution-client/order/submit", params);
	
	//默认收货地址
	let addressDefault = (params = {}) => vm.$u.post("/distribution-client/user/address/setDefault", params);
	
		//地址详情
	let addressDetail = (params = {}) => vm.$u.post("/distribution-client/user/address/detail", params);
	
		//删除地址
	let removeAddress = (params = {}) => vm.$u.post("/distribution-client/user/address/remove", params);


	//新增收货地址
	let addAddress = (params = {}) => vm.$u.post("/distribution-client/user/address/add", params);
	
	//获取默认地址										
	let getDefaultAddress = (params = {}) => vm.$u.post("/distribution-client/user/address/getDefault", params);
	
	
	//订单
	let allOrder = (params = {}) => vm.$u.post("/distribution-client/order/list", params);
	
	
	//申请退款
	let refundApply = (params = {}) => vm.$u.post("/distribution-client/order/refund/apply", params);
	
	// 售后订单列表
	let refundList = (params = {}) => vm.$u.post("/distribution-client/order/refund/list", params);
	
	//获取用户信息
	let getUserInfo =  (params = {}) => vm.$u.post("/distribution-client/user/getUserInfo", params);
	
	//上传头像
	let pushHead =  (params = {}) => vm.$u.post("/distribution-client/user/edit", params);
	
	//关注
	let isAttention =  (params = {}) => vm.$u.post("/distribution-client/user/attention", params);
	
	// //关注列表
	let attentionList =  (params = {}) => vm.$u.post("/distribution-client/user/attention/list", params);
	
	//帮推官审核
	let helpApplyList =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/apply/list", params);
	
	//帮推官审核
	let hhelpApplyList =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/apply", params);
	
	//售后取消申请退款
	let cancelApply =  (params = {}) => vm.$u.post("/distribution-client/order/refund/cancel", params);
	
	//售后取消申请退款
	let deleteOrder =  (params = {}) => vm.$u.post("/distribution-client/order/delete", params);
	
	
	//确认收货
	let enterGoods =  (params = {}) => vm.$u.post("/distribution-client/order/confirmReceipt", params);
	
	//我的推荐
	let myallList =  (params = {}) => vm.$u.post("/distribution-client/activity/allList", params);
	
	//刷新token
	let refreToken =  (params = {}) => vm.$u.post("/distribution-client/user/refreshToken", params);
	
	//团员
	let memberList =  (params = {}) => vm.$u.post("/distribution-client/user/attention/reversal/list", params);
	
	//我的推荐
	let activityMyList =  (params = {}) => vm.$u.post("/distribution-client/activity/myList", params);
	
	//结束推荐
	let endRecomment =  (params = {}) => vm.$u.post("/distribution-client/activity/end", params);
	
	//绑定推荐官列表
	let bindtjg =  (params = {}) => vm.$u.post("/distribution-client/user/bindUser/list", params);
	
	//审核通过
	let applyPass =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/apply/pass", params);
	
	//审核拒绝
	let applyReject =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/apply/reject", params);
	
	//取消关注
	let cancelAttention =  (params = {}) => vm.$u.post("/distribution-client/user/attention/cancel", params);

	//取消收藏
	let cancelSubscribe =  (params = {}) => vm.$u.post("/distribution-client/user/subscribe", params);

	//帮卖发布
	let HelpToSell =  (params = {}) => vm.$u.post("/distribution-client/activity/promotion", params);
	
	//售后订单发货
	let ordersForShipment =  (params = {}) => vm.$u.post("/distribution-client/order/refund/shipments", params);
	
	//售后订单发货
	let getRefundAddress =  (params = {}) => vm.$u.post("/distribution-client/supplier/getRefundAddress", params);
	
	//售后订单快递
	let refundLogisticsInfo =  (params = {}) => vm.$u.post("/distribution-client/order/refund/logisticsInfo", params);
	
	//已发货订单发货
	let orderLogisticsInfo =  (params = {}) => vm.$u.post("/distribution-client/order/logisticsInfo", params);
	
	//统计
	let statistics =  (params = {}) => vm.$u.post("/distribution-client/finance/statistics", params);
	
	//列表
	let financeList =  (params = {}) => vm.$u.post("/distribution-client/finance/list", params);
	
	//特约推荐官-推荐官申请
	let dealerApply =  (params = {}) => vm.$u.post("/distribution-client/user/dealer/user/apply", params);
														 // distribution-client/dealer/user/apply
	//发送短信
	let sendSms =  (params = {}) => vm.$u.post("/distribution-client/user/sendSms", params);
	
	//申请状态
	let isApplyState =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/apply/detail", params);
	
	//活动操作记录列表
	let operation =  (params = {}) => vm.$u.post("/distribution-client/activity/operation/list", params);
	
	//特约推荐官-》申请推荐官 状态
	let applytystatic =  (params = {}) => vm.$u.post("/distribution-client/user/dealer/user/apply/detail", params);
	
	//我的主铺
	let getUserShop =  (params = {}) => vm.$u.post("/distribution-client/user/getUserShop", params);
	
	
	//创建小程序码
	let createCode =  (params = {}) => vm.$u.post("/distribution-client/user/createAppletCode", params);
	
	//????app 跳转过来解析，因为是二维码
	let getAppletCodeScene =  (params = {}) => vm.$u.post("/distribution-client/user/getAppletCodeScene", params);
	
	
	// 单个明细店铺统计
	let statisticsOfSupplier =  (params = {}) => vm.$u.post("/distribution-client/finance/statisticsOfSupplier", params);
	
	// 明细店铺列表外
	let statisticsList =  (params = {}) => vm.$u.post("/distribution-client/finance/supplier/statistics/list", params);
	
	// 单个供应商带货明细列表
	let listOfSupplier =  (params = {}) => vm.$u.post("/distribution-client/finance/listOfSupplier", params);
	
	
	// 查看推荐官信息
	let  lookInfoTJ=  (params = {}) => vm.$u.post("/distribution-client/user/viewUserInfo", params);

	// 查看推荐官信息
	let  fileUp =  (params = {}) => vm.$u.post("/distribution-client/file/upload/single", params);

	// 经销商列表
	let  dealerList =  (params = {}) => vm.$u.post("/distribution-client/dealer/list", params);

	// 经销商列表
	let  applystatisticsList =  (params = {}) => vm.$u.post("/distribution-client/dealer/getDealerInfo", params);
	// 解析获取手机号
	let  getWxPhoneNo =  (params = {}) => vm.$u.post("/distribution-client/user/getWxPhoneNo", params);

	// 新分类接口
	let  categoryList =  (params = {}) => vm.$u.post("/distribution-client/platform/categoryList", params);

	// 帮推官列表
	let  promotionList =  (params = {}) => vm.$u.post("/distribution-client/user/promotion/list", params);

	// 	企业信息
	let  supplierInfo =  (params = {}) => vm.$u.post("/distribution-client/supplier/info", params);

	// 	商家申请状态
	let  goodsState =  (params = {}) => vm.$u.post("/distribution-client/supplier/user/apply/detail", params);

	// 	商家申请状态
	let  merchantApply=  (params = {}) => vm.$u.post("/distribution-client/supplier/user/apply", params);

	// 	是否评分
	let  isGraded=  (params = {}) => vm.$u.post("/distribution-client/supplier/hasGraded", params);

	// 	评分
	let  grade=  (params = {}) => vm.$u.post("/distribution-client/supplier/grade", params);

	// 	是否是商城推广员
	let  isPromoter =  (params = {}) => vm.$u.post("/distribution-client/dealer/mall/isPromoter", params);

	// 	成为商城推广员
	let  promoter =  (params = {}) => vm.$u.post("/distribution-client/dealer/mall/promoter", params);

	// 	商城商品列表
	let  promoterList =  (params = {}) => vm.$u.post("/distribution-client/commodity/mall/list", params);
	// 	门店
	let  outlets =  (params = {}) => vm.$u.post("/distribution-client/commodity/shop/list", params);
	
	
	
	// 获取活动列表
	let  getActivityList =  (params = {}) => vm.$u.post("/distribution-client/activity/list", params);





	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {logoin,homeList,supplier,goodsCategoryList,goodsList,goodsIssue,
	goodsDateilTwo,activityDetail,addressList,createOrder,submitOrder,addressDefault,
	addAddress,getDefaultAddress,allOrder,refundApply,refundList,getUserInfo,pushHead,
	attentionList,helpApplyList,hhelpApplyList,addressDetail,removeAddress,cancelApply,
	deleteOrder,enterGoods,appEnter,myallList,refreToken,memberList,activityMyList,endRecomment,
	bindtjg,applyPass,applyReject,isAttention,cancelAttention,HelpToSell,ordersForShipment,
	getRefundAddress,refundLogisticsInfo,orderLogisticsInfo,statistics,financeList,
	dealerApply,sendSms,isApplyState,operation,applytystatic,getUserShop,createCode,getAppletCodeScene,
	statisticsOfSupplier,statisticsList,listOfSupplier,lookInfoTJ,fileUp,cancelSubscribe,
	dealerList,applystatisticsList,getWxPhoneNo,categoryList,promotionList,supplierInfo,
	goodsState,merchantApply,isGraded,grade,isPromoter,promoter,promoterList,outlets,getActivityList
	};
}

export default {
	install
}