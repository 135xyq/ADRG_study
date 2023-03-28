import request from "@/utils/request.js";

// 用户登录
export default {
	//  获取分类
	login(data){
		return request.post('/applet/login/login',data);
	}
}