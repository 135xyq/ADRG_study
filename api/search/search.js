import request from "@/utils/request.js"

export default {
	// 获取查询信息分页列表
	getSearchDataPage(data) {
		return request.post('/applet/search/index',data)
	}
}