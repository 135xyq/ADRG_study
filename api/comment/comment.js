import request from "@/utils/request.js"


export default {
	/**
	 * 获取评论列表
	 * @param {Object} data
	 */
	getCommentList(data) {
		return request.post('/applet/comment/page',data);
	},
	/**
	 * 发布一个评论
	 * @param {Object} data
	 */
	publishComment(data) {
		return request.post('/applet/comment/publishcomment',data);
	},
	/**
	 * 删除一个评论
	 * @param {Object} data
	 */
	deleteComment(data) {
		return request.post('/applet/comment/deletecomment',data);
	}
	
}