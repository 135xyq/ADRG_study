import request from "@/utils/request.js";

// 问题反馈等信息
export default {
	//  列表
	feedbackList(data){
		return request.post('/applet/feedback/list',data);
	},
	//  提交一个反馈
	publishFeedback(data) {
		return request.post('/applet/feedback/publish',data)
	}
}