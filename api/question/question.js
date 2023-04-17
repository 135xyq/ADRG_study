import request from "@/utils/request.js";

export default{
	// 获取分类列表和每个分类用户的刷题数据
	getQuestionCategoryList(data) {
		return request.post('/applet/questioncategory/getquestioncategorylist',data);
	},
	// 随机组卷
	getRandomQuestions(data) {
		return request.post('/applet/question/getRandomQuestions',data);
	},
	// 判断是否还能组卷，能出得题目数量不为0
	isHasQuestion(data) {
		return request.post('/applet/question/ishasquestion',data);
	},
	// 交卷判题
	postQuestionToValidate(data) {
		return request.post('/applet/question/validatequestionanswer',data);
	},
	// 获取判题的结果
	getQuestionRecordValidateResult(data) {
		return request.post('/applet/question/getvalidateresult',data);
	}
}