<template>
	<view class="login-contianer">
		<image class="login-avatar" src="/static/default_avatar.jpg" size="100"></imager>
		<button class="login-button" @click="onHandleLogin">微信登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		methods: {
			// 获取临时登录凭证code
			getCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: "weixin",
						success: (e) => {
							resolve(e)
						},
						fail: (err) => {
							reject(new Error("获取code失败"))
						}
					})
				})
			},
			onHandleLogin(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-contianer{
		display: flex;
		flex-direction: column;
		align-items: center;
		#center;
		top: 40%;
		.login-avatar{
			width: 250rpx;
			height: 250rpx;
			border-radius: 50%;
		}
		.login-button{
			margin-top: 30rpx;
			width: 400rpx;
			font-size: 40rpx;
			background-color: @green;
			color: @white;
			border-radius: 10px;
		}
	}
</style>
