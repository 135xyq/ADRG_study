// 学习资源分类的相关接口
import request from "@/utils/request.js"

/**
 * 获取分类数据
 */
export default {
	//  获取分类列表和展示在封面的资源
	getCategoryList(data){
		return request.post('/applet/studycategory/list',data);
	},
	// 获取资源分类列表
	getStudyCategoryList(data){
		return request.post('/applet/studycategory/getStudyCategoryList',data);
	},
	// 根据资源分类获取封面资源
	getSources(data){
		return request.post('/applet/studycategory/sources',data);
	}
	
}