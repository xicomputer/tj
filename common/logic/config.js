var config=null;
if(process.env.NODE_ENV === 'development'){
	//开发环境
    config={
		// apiReqBaseUrl:'http://192.168.0.100:2920',
		// apiReqBaseUrl:'https://test.xssj.letterbook.cn',
		apiReqBaseUrl:'https://xinshu.distribution.letterbook.cn',
	}
}else{
	//生产环境
	config={
		// apiReqBaseUrl:'http://192.168.0.100:2920',
		// apiReqBaseUrl:'https://test.xssj.letterbook.cn',
		apiReqBaseUrl:'https://xinshu.distribution.letterbook.cn',
	}
}

//信书商家小程序appid
config.miniProgramAppid='wxf1190d0f25fde018';
config.homepageUrl='/pages/tabbar/index/index';



export default config;
