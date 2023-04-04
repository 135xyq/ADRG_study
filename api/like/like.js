import request from "@/utils/request.js"

export default {
	// 获取点赞分页列表
	getLikePage(data) {
		return request.post('/applet/like/page',data)
	},
	// 点赞
	newLike(data) {
		return request.post('/applet/like/like',data)
	},
	// 取消点赞
	cancelLike(data) {
		return request.post('/applet/like/cancellike',data)
	},
	// 判断是否已经点赞
	isLike(data) {
		return request.post('/applet/like/islike',data)
	}
}