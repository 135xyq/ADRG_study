// 视频相关的接口

import request from "@/utils/request.js"

export default {
	// 根据分类id获取视频列表
	getList(data){
		return request.post('/applet/video/list',data);
	},
	// 分页获取
	getPage(data){
		return request.post('/applet/video/page',data);
	},
	// 获取视频详情
	getVideoDetail(data) {
		return request.post('/applet/video/detail',data);
	}
}