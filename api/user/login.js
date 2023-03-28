import request from "@/utils/request.js";

// 用户登录和退出登录
export default {
	//  登录
	login(data){
		return request.post('/applet/login/login',data);
	},
	//  退出登录
	logout(data) {
		return request.post('/applet/login/logout',data)
	}
}