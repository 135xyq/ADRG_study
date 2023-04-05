import request from "@/utils/request.js"

export default {
	// 获取用户指南
	getAppletAbout(data) {
		return request.post('/applet/appletabout/getappletabout',data)
	}
}