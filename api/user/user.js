import request from "@/utils/request.js";

// 用户操作Api
export default {
	//  获取用户详情
	getUserInfo(data){
		return request.post('/applet/appletuser/getuserinfo',data);
	},
	// 修改用户信息
	updateUserInfo(data) {
		return request.post('/applet/appletuser/edit',data);
	}
}