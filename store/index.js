import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || null,
		token: uni.getStorageSync('token') || ''
	},
	getters: {
		// 获取网络请求所需信息, token
		getToken(state) {
			return {
				token: state.token,
			};
		},
		// 获取用户信息
		getUser(state) {
			let Storage = uni.getStorageSync('userInfo');
			if (JSON.stringify(state.userInfo) == '{}' && Storage) {
				store.commit('updateUserInfo', Storage);
			}
			return JSON.parse(state.userInfo);
		},
	},
	mutations: {
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		updateToken(state, token) {
			state.token = token;
		},
		// 清空store
		clearStore(state) {
			state.token = '';
			state.userInfo = {}
		},
	},
	actions: {
		updateUserInfo({
			commit
		}, userInfo) {
			uni.setStorageSync('userInfo', userInfo);
			commit("updateUserInfo", userInfo);
		},
		updateToken({
			commit
		}, token) {
			uni.setStorageSync('token', token);
			commit("updateToken", token);
		},
		// 退出登录
		logout({commit}) {
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
			commit("clearStore");
		}
	}
})
