import request from "@/utils/request.js";
/**
 * 微信登录
 * @param {Object} data 微信登录获取的临时登录凭证和用户信息
 */
export function login(data) {
	return request({
		url: '/applet/login',
		method: 'post',
		data,
	})
}
