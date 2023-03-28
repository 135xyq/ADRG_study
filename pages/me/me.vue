<template>
	<view class="me-container">
		<div class="top">
			<div class="set">
				<uni-icons custom-prefix="iconfont" type="icon-shezhi" size="30"></uni-icons>
			</div>
		</div>
		<div class="user-info">
			<u-avatar :src="src"></u-avatar>
		</div>
		<div class="bottom">
			<button @click="onHandleLogin">登录</button>
		</div>
	</view>
</template>

<script>
	import userApi from "@/api/user/user.js"
	
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		async created() {
			const res = await userApi.getUserInfo();
			console.log(res);
		},
		methods: {
			// 跳转去登录界面
			onHandleLogin() {
				uni.navigateTo({
					url: '/pages/me/login/login'
				})
			}
		}
	}
</script>

<style>

</style>
