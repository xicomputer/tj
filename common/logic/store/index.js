import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //
		orderDataInfo:{},
		editAddress:{},
		detailparp:{},
		addressState:'',
		intodetail:{},
		backsAddress:{},
		hbmap:{},
		wxwewmimg:'',
		isAuto:false,
		isAutoPhone:false,
		detailUserid:null,
		cover:false,
		jxsid:'',
		DetailsOptionObj:{},
		mainInfos:{},
		renovatePages:false,
		tokenobj:{},
		tab: [],
		authtab:{}
    },
    mutations: {
        //
		addOrderData(state,pop){
		state.orderDataInfo = pop
		},
		editAddress(state,pop){
		state.editAddress = pop
		},
		saveGoods(state,pop){
		 state.detailparp = pop
		},
		addressStateFn(state,pop){
		 state.addressState = pop
		},
		detailinfo(state,pop){
		state.intodetail = pop
		},
		backGoodsAddress(state,pop){
		state.backsAddress = pop
		},
		hbmap(state,pop){
		   state.hbmap = pop
		},
		msterShops(state,pop){
			state.mainInfos = pop
		},
		wxwewm(state,pop){
			state.wxwewmimg = pop
		},
		imporIsAuto(state,pop){
			state.isAuto = pop
		},
		detailPromotion(state,pop){
			state.detailUserid = pop
		},
		imporIsAutoPhone(state,pop){
			state.isAutoPhone = pop
		},
		coverFn(state,pop){
			state.cover = pop
		},
		sendid(state,pop){
			state.jxsid = pop
		},
		saveDetailsOption(state,pop){
			state.DetailsOptionObj = pop
		},
		renovate(state,pop){
			state.renovatePages = pop
		},
		SAVETOKEN(state,pop){
			state.tokenobj = pop
		},
		alter(state,pop){
			state.tab = pop
		},
		tabAuth(state,pop){
			state.authtab = pop
		}


    },
    actions: {

    },
    getters:{

    },

})

export default store


