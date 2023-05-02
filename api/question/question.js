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
	},
	// 分页获取刷题记录
	getQuestionRecord(data) {
		return request.post('/applet/questionrecord/getrecordpage',data)
	},
	// 根据试卷获取题目
	getQuestionListByRecordId(data) {
		return request.post('/applet/questionhistoryrecord/getrecordinfo',data)
	},
	// 获取用户每一种分类错题的数量
	getQuestionCategoryCount(data){
		return request.post('/applet/questionhistoryrecord/getQuestionCategoryCount',data)
	},
	// 获取指定分类下的所有错题id
	getAllErrorQuestionId(data){
		return request.post('/applet/questionhistoryrecord/getAllErrorQuestionId',data)
	},
	// 获取题目详情
	getQuestionDetail(data) {
		return request.post('/applet/questionhistoryrecord/getQuestionDetail',data)
	},
	// 获取题目详情
	getQuestionDetailFinal(data) {
		return request.post('/applet/question/getQuestionDetail',data)
	}
}