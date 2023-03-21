// 学习资源分类的相关接口
import request from "@/utils/request.js"

/**
 * 获取分类数据
 */
export default {
	//  获取分类
	getCategoryList(data){
		return request.post('/applet/studycategory/list',data);
	}
}