import request from "@/utils/request.js"

export default {
	// 获取学习记录分页列表
	getStudyHistoryPage(data) {
		return request.post('/applet/studyhistory/page',data)
	},
	// 统计学习记录
	newStudyHistory(data) {
		return request.post('/applet/studyhistory/newstudyhistory',data)
	}
}