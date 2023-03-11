<template>
	<view>
		<button @click="onHandleLogin">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转去登录界面
			onHandleLogin(){
				uni.navigateTo({
					url:'/pages/me/login/login'
				})
			}
		}
	}
</script>

<style>

</style>
