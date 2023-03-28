import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		userInfo:uni.getStorageSync('userInfo') || null,
		token: uni.getStorageSync('token') || ''
	},
	getters: {
		// 获取网络请求所需信息, token
		getToken(state) {
			return  {
				token:state.token,
			};
		}
	  },
	mutations:{
		updateUserInfo (state, userInfo) {
		  state.userInfo = userInfo;
		},
		updateToken (state, token) {
		  state.token = token;
		},
	},
	actions:{
		updateUserInfo({commit},userInfo){
			uni.setStorageSync('userInfo', userInfo);
			commit("updateUserInfo",userInfo);
		},
		updateToken({commit},token){
			uni.setStorageSync('token', token);
			commit("token",token);
		}
	}
})