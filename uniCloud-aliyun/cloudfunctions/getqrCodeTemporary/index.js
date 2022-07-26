'use strict';
const openapi = require('mp-cloud-openapi')
exports.main = async (event, context) => {
	const res2 = await uniCloud.httpclient.request(
	 "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf1190d0f25fde018&secret=66b4bd5ae4f273d7484c2770cdd3ec0d", {
	  dataType: "json"
	 })
	const openapiWeixin = await openapi.initWeixin({
	 appId: 'wxf1190d0f25fde018',
	 secret: '66b4bd5ae4f273d7484c2770cdd3ec0d',
	 accessToken: res2.data.access_token
	})
	console.log(event,'evnt');
  try {
    const result = await openapiWeixin.wxacode.get({    
        width: 430,
				path: event.path
      })
	  
    return result
  } catch (err) {
    return err
  }
}
