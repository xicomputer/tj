import config from "./config";

async function permiss(that) {
    console.log(that)
    let power ={}

    if(that.$store.state.authtab.token){

        power = that.$store.state.authtab
    }else{
        power = uni.getStorageSync('userinfoKey');
    }
    let tg = power.isMallPromoter
    let tj = power.tj
    let bt =  power.bt

    //团员
    if(tg ==false && tj ==false && bt ==false){
        let tab=[
            {
                pagePath: "/pages/tabbar/index/index",
                iconPath: "/static/recommend.png",
                selectedIconPath: "/static/recommend2.png",
                text: "推荐"
            },
            {
                "pagePath": "/pages/tabbar/order_form/order_form",
                "iconPath": "/static/tabarn2.png",
                "selectedIconPath": "/static/tabar2.png",
                "text": "订单"
            },
			{
			    "pagePath": "/pages/tabbar/activity/activity",
			    "iconPath": "/static/activity-icon.png",
			    "selectedIconPath": "/static/activity-active-icon.png",
			    "text": "活动"
			},
            {
                "pagePath": "/pages/tabbar/my/my",
                "iconPath": "/static/tabarn4.png",
                "selectedIconPath": "/static/tabar4.png",
                "text": "个人中心"
            }
        ]
        that.$store.commit('alter',tab)
    }
    //推荐官
    if(tg ==false && tj ==true ){
        let tab=[
            {
                pagePath: "/pages/tabbar/index/index",
                iconPath: "/static/recommend.png",
                selectedIconPath: "/static/recommend2.png",
                text: "推荐"
            },
            {
                "pagePath": "/pages/tabbar/order_form/order_form",
                "iconPath": "/static/tabarn2.png",
                "selectedIconPath": "/static/tabar2.png",
                "text": "订单"
            },
			{
			    "pagePath": "/pages/tabbar/activity/activity",
			    "iconPath": "/static/activity-icon.png",
			    "selectedIconPath": "/static/activity-active-icon.png",
			    "text": "活动"
			},
            {
                "pagePath": "/pages/tabbar/fine_goods/fine_goods",
                "iconPath": "/static/tabarn3.png",
                "selectedIconPath": "/static/tabar3.png",
                "text": "云仓好物"
            },
            {
                "pagePath": "/pages/tabbar/my/my",
                "iconPath": "/static/tabarn4.png",
                "selectedIconPath": "/static/tabar4.png",
                "text": "个人中心"
            }
        ]
        that.$store.commit('alter',tab)
    }
    //共享商城推荐官
    if(tg ==true && tj ==false ){
        let tab=[
            {
                iconPath: "/static/tabarn1.png",
                selectedIconPath: "/static/tabar1.png",
                text: '首页',
                pagePath: "/pages/tabbar/recommend/recommend"
            },
            {
                "pagePath": "/pages/tabbar/order_form/order_form",
                "iconPath": "/static/tabarn2.png",
                "selectedIconPath": "/static/tabar2.png",
                "text": "订单"
            },
            {
                "pagePath": "/pages/tabbar/my/my",
                "iconPath": "/static/tabarn4.png",
                "selectedIconPath": "/static/tabar4.png",
                "text": "个人中心"
            }
        ]
        that.$store.commit('alter',tab)
    }
    //推荐官 又获取到了共享商城
    if(tg ==true && tj ==true ){
        let tab=[
            {
                iconPath: "/static/tabarn1.png",
                selectedIconPath: "/static/tabar1.png",
                text: '首页',
                pagePath: "/pages/tabbar/recommend/recommend"
            },
            {
                pagePath: "/pages/tabbar/index/index",
                iconPath: "/static/recommend.png",
                selectedIconPath: "/static/recommend2.png",
                text: "推荐"
            },
            {
                "pagePath": "/pages/tabbar/order_form/order_form",
                "iconPath": "/static/tabarn2.png",
                "selectedIconPath": "/static/tabar2.png",
                "text": "订单"
            },
            {
                "pagePath": "/pages/tabbar/fine_goods/fine_goods",
                "iconPath": "/static/tabarn3.png",
                "selectedIconPath": "/static/tabar3.png",
                "text": "云仓好物"
            },
            {
                "pagePath": "/pages/tabbar/my/my",
                "iconPath": "/static/tabarn4.png",
                "selectedIconPath": "/static/tabar4.png",
                "text": "个人中心"
            }
        ]
        that.$store.commit('alter',tab)
    }



}

export default permiss;