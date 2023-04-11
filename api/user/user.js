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
	},
	// 获取用户设置信息
	getUserSetInfo() {
		return request.post('/applet/appletuserset/getusersetinfo');
	},
	// 修改用户的设置信息
	updateUserSetInfo(data) {
		return request.post('/applet/appletuserset/edituserset',data)
	}
}