import request from "@/utils/request.js";

export default{
	// 获取分类列表和每个分类用户的刷题数据
	getQuestionCategoryList(data) {
		return request.post('/applet/questioncategory/getquestioncategorylist',data);
	}
}