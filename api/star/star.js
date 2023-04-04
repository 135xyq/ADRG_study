import request from "@/utils/request.js"

export default {
	// 获取收藏分页列表
	getStarPage(data) {
		return request.post('/applet/star/page',data)
	},
	// 收藏
	newStar(data) {
		return request.post('/applet/star/star',data)
	},
	// 取消收藏
	cancelStar(data) {
		return request.post('/applet/star/cancelstar',data)
	},
	// 判断是否已经收藏
	isStar(data) {
		return request.post('/applet/star/isstar',data)
	}
}