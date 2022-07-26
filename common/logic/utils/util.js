export default {
	jointStr(params,symbol='&'){
		var str='';
		if(typeof params=='object'){
			for(var key in params){
				str+=symbol+key+'='+params[key];
			}
			str=str.substring(1);
		}
		return str;
	},
	
	// 手机号 校验
	verify(type,content){
		if(type=='phone'){
			var reg=/^1[3,4,5,6,7,8,9]\d{9}$/;
			return reg.test(content);
		}
	},
	
	//日期时间
	dateUtil:{
		UNITS: {
			'年': 31557600000,
			'月': 2629800000,
			'天': 86400000,
			'小时': 3600000,
			'分钟': 60000,
			'秒': 1000
		},
		tick: function(value) {
			// 目标时间
			var oTargetDate = new Date( value);
			var nTarget = oTargetDate.getTime();
			// 当前时间
			var oNowDate = new Date();
			var nNow = oNowDate.getTime();
			// 总秒数
			var total = parseInt((nTarget - nNow) / 1000);
			// 转换
			var d = parseInt(total / 86400);
			total %= 86400;
			var h = parseInt(total / 3600);
			total %= 3600;
			var m = parseInt(total / 60);
			total %= 60;
			var s = total;
			 s= s<10?('0'+ s): s;
			
			console.log("?????",d,h,m,s)
			let time21 =d + '天' + h + ':' + m + ':' + s + '后结束';
			
			
			
			return time21;
		},
		humanize: function (milliseconds) {
			if(typeof milliseconds == 'string'){
				milliseconds=this.parse(milliseconds,'number');
			}
			var humanize = '';
			milliseconds=Math.abs(milliseconds);
			for (var key in this.UNITS) {
				if (milliseconds >= this.UNITS[key]) {
					humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
					break;
				}
			}
			return humanize || '刚刚';
		},
		
		format: function (dateStr) {
			var date = this.parse(dateStr)
			var diff = Date.now() - date.getTime();
			if (diff < this.UNITS['天']) {
				return this.humanize(diff);
			}
			return this.stringifyDate({date,template:'YYYY/MM/DD-hh:mm:ss'});
		},
		
		//毫秒数转天数
		msTurnDays(diffMs){
			var days=diffMs/this.UNITS['天'];
			return parseInt(days);
		},
		
		//计算某个日期距离num天后的日期
		computedTime: function(options={}){
			var {baseTime,num,template,resType} = options;
			baseTime=baseTime || new Date();
			num=num || 7;
			template=template || 'YYYY-MM-DD';
			resType=resType || 'string';//返回的结果类型 
			
			if(typeof baseTime == 'string'){
				baseTime=this.parse(baseTime);
			}
			var baseMs=baseTime.getTime();
			var diffMs=this.UNITS['天']*num;
			var tarTimeMs=baseMs+diffMs;
			
			var result='';
			if(resType=='string'){
				result = this.stringifyDate({date:tarTimeMs,template});
			}else if(resType=='number'){
				result = tarTimeMs;
			}else if(resType=='object'){
				result = new Date(tarTimeMs);
			}
			return result;
		},
		beforeComputedTime: function(options={}){
			var {baseTime,num,template,resType} = options;
			baseTime=baseTime || new Date();
			num=num || 30;
			template=template || 'YYYY-MM-DD';
			resType=resType || 'string';//返回的结果类型

			if(typeof baseTime == 'string'){
				baseTime=this.parse(baseTime);
			}
			var baseMs=baseTime.getTime();
			var diffMs=this.UNITS['天']*num;
			var tarTimeMs=baseMs-diffMs;

			var result='';
			if(resType=='string'){
				result = this.stringifyDate({date:tarTimeMs,template});
			}else if(resType=='number'){
				result = tarTimeMs;
			}else if(resType=='object'){
				result = new Date(tarTimeMs);
			}
			return result;
		},
		//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		parse: function (str,resType) { //resType 取值 'object' | 'number'
			var a = str.split(/[^0-9]+/);
			var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
			return resType == 'number' ? date.getTime() : date;
		},
		
		stringifyDate: function(options={}){
			var template=options.template || 'YYYY-MM-DD hh:mm:ss';
			var date=options.date || new Date();
			if(typeof date == 'string'){
				date=this.parse(date);
			}else if(typeof date == 'number'){
				date=new Date(date);
			}
			var Y=date.getFullYear();
			var M=date.getMonth()+1;
			M=M<10?('0'+M):M;
			var D=date.getDate();
			D=D<10?('0'+D):D;
			var h=date.getHours();
			h=h<10?('0'+h):h;
			var mi=date.getMinutes();
			mi=mi<10?('0'+mi):mi;
			var s=date.getSeconds();
			s=s<10?('0'+s):s;
			var reg=/YYYY|MM|DD|hh|mm|ss/g;
			var str=template.replace(reg,(key)=>{
				switch(key){
					case 'YYYY': return Y; case 'MM': return M;
					case 'DD': return D; case 'hh': return h;
					case 'mm': return mi; case 'ss': return s;
				}
			});
			return str;
		},
		stringifyDateYmd: function(options={}){
			var template=options.template || 'YYYY-MM-DD';
			var date=options.date || new Date();
			if(typeof date == 'string'){
				date=this.parse(date);
			}else if(typeof date == 'number'){
				date=new Date(date);
			}
			var Y=date.getFullYear();
			var M=date.getMonth()+1;
			M=M<10?('0'+M):M;
			var D=date.getDate();
			D=D<10?('0'+D):D;
			var reg=/YYYY|MM|DD/g;
			var str=template.replace(reg,(key)=>{
				switch(key){
					case 'YYYY': return Y; case 'MM': return M;
					case 'DD': return D;
				}
			});
			return str;
		},
	}
	
}


