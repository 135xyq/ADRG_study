// 文章相关的接口

import request from "@/utils/request.js"

export default {
	// 根据分类id获取文章列表
	getList(data) {
		return request.post('/applet/article/list', data);
	},
	// 分页获取
	getPage(data) {
		return request.post('/applet/article/page', data);
	},
	// 获取文章详情
	getDetail(data) {
		return request.post('/applet/article/detail', data);
	}
}