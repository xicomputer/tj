import App from './App'
import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'

import QSPopup from './components/QS-popup/QS-popup.vue'
Vue.component('QSPopup', QSPopup)

import common from './components/QS-popup/common.vue'
Vue.component('common', common)

import commonGoods from './components/QS-popup/common-goods.vue'
Vue.component('commonGoods', commonGoods)

import commonGoodsCode from './components/QS-popup/common-goods-code.vue'
Vue.component('commonGoodsCode', commonGoodsCode)

import commonShops from './components/QS-popup/common-shops.vue'
Vue.component('commonShops', commonShops)

import commonShopsCode from './components/QS-popup/common-shops-code.vue'
Vue.component('commonShopsCode', commonShopsCode)

import MeLoginPopup from "./components/me-login-popup/me-login-popup.vue";
Vue.component('me-login-popup',MeLoginPopup);

import popPhone from "./components/logo-ppo/pop-phone";
Vue.component('popPhone',popPhone);

import logoPop from "./components/logo-ppo/logo-pop";
Vue.component('logoPop',logoPop);

import logoPopTodo from "./components/logo-ppo/logo-pop-todo";
Vue.component('logoPopTodo',logoPopTodo);


import NoneMsg from "./components/none-msg/none-msg.vue";
Vue.component('node-msg',NoneMsg);



import tools from './common/logic/utils/tools.js';
Vue.prototype.$tools=tools;

import store from './common/logic/store/index.js';

const app = new Vue({
    ...App,store
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from './common/logic/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from './common/logic/http.api.js';
Vue.use(httpApi, app);

// mock
import mock from './common/mock/get_mock_data.js'
Vue.prototype.$mock = mock

app.$mount()