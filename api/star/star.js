import request from "@/utils/request.js"

export default {
	// 获取收藏分页列表
	getStarPage(data) {
		return request.post('/applet/star/page',data)
	}
}