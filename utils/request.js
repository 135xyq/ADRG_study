import config from '@/common/config.js'
import store from '@/store/index.js'

const request = (url, data, method = 'POST',) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
			icon: 'loading',
			mask: true
		});
		uni.request({
			url: config.baseUrl+url,
			method: method,
			data: {...data,...store.getters.getReq},
			success(res) {
				if (res.data.code == 0) {
					resolve(res.data)
				} else {
                    if(res.data.code == 1 && res.data.msg=='token不存在'){
                        // 清空store
                        store.commit('clearStore');
                        // 清空本地存储的token
                        uni.clearStorageSync('token');
                        // 重定向到登录页
                        uni.reLaunch({
                        	url:'/pages/login/login'
                        })
                    }else{
						uni.showToast({
							title: res.data.msg,
							icon:'error',
							duration: 2000
						});
					}
					reject(res.data.msg);
				}
				uni.hideLoading(); //关闭loading
			},
			fail(error) {
				reject(error);
				// throw new Error(error);
				uni.hideLoading(); //关闭loading
			},
			complete() {
				uni.hideLoading(); //关闭loading
			}
		})
	})
}
//get请求
const get = (url, data) => {
	return request(url, data, 'GET')
}
//post请求
const post = (url, data) => {
	return request(url, data, 'POST')
}

export default {
	get,
	post
}
