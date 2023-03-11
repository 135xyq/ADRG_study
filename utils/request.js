import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


//创建axios实例
const service = axios.create({
	baseURL: "http://localhost:9000",
	timeout: 6000, // 请求时长 
	crossDomain: true //允许跨域
})

//requset拦截器
service.interceptors.request.use(
	config => {
		//在发送请求前做些什么

		// console.log('客户端发送:', config.url, config.data, new Date().valueOf())
		return config
	}, error => {
		console.log(error);
		//对请求错误做些什么
		return Promise.reject(error)
	})

//response拦截器
service.interceptors.response.use(
	response => {
		//2xx范围内的状态码都会触发该函数
		// 对响应数据做点什么
		// console.log('客户端收到', response.config.url, response, new Date().valueOf());
		if (response.statusText == "request:fail timeout") {
			uni.showToast({
				title: '连接超时，请检查网络',
				icon: 'none'
			})
		} else if (response.status != 200) {
			uni.showToast({
				title: '服务器繁忙',
				icon: 'none'
			})
		} else if (response.data.code === 1) {
			uni.showToast({
				title: response.data.data || '请求出错,稍后重试',
				icon: 'none',
				duration: 1000,
				mask: true
			});
		}
		return response
	},
	error => {
		// 超出2xx范围的状态码都会触发该函数
		// 对响应错误做点什么
		return Promise.reject(error)
	}
)

//  解决微信小程序不兼容 adapter is not a function 
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		// console.log(1,config)
		let settle = require('axios/lib/core/settle');
		let buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType, 
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				// console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

export default service
