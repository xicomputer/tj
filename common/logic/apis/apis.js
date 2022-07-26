import HttpRequest from '../request.js';
import config from '../config.js';

let http=new HttpRequest(config.apiReqBaseUrl);


/*-----------内容浏览接口-----------*/
//登录
export let browseList = p=>http.post('/content/browse/list',p);
