<template>
	<view class="login-contianer">
		<image class="login-avatar" src="/static/default_avatar.jpg" size="100">
			</imager>
			<button class="login-button" @click="onHandleLogin">微信登录</button>
	</view>
</template>

<script>
	import axios from "axios"
	import {
		login
	} from "@/api/user/login.js";
	export default {
		data() {
			return {
				src: ''
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
			// 获取code后登录
			async onHandleLogin() {
				uni.showLoading({
					title: '登录中',
					mask: true
				});
				// 获取用户信息
				uni.getUserProfile({
					desc: '获取头像和昵称',
					success: async res => {
						let userInfo = res.userInfo;
						const {
							code
						} = await this.getCode();

						// 登录
						let result = await login({
							code,
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatarUrl,
							gender: userInfo.gender
						})
						//  登录成功,将数据存储到本地，跳转会原页面
						if (result.data.code === 0) {
							// console.log(result.data);
							this.$store.dispatch('userInfo/updateUserInfo', result.data.data);
							uni.hideLoading(); // 关闭加载框
							// 消息提示
							uni.showToast({
								title: '登录成功',
								duration: 1000,
								icon: 'success',
								success: () => {
									// 跳转会原页面
									setTimeout(()=>{
										uni.navigateBack();
									},1000)
								}
							})
						} else {
							uni.showToast({
								title: '登录失败',
								duration: 2000,
								icon: 'error'
							})
						}
					},
					fail: res => {
						uni.showToast({
							title: '拒绝授权，登录失败',
							duration: 2000,
							icon: 'error'
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-contianer {
		display: flex;
		flex-direction: column;
		align-items: center;
		@include center;
		top: 40%;

		.login-avatar {
			width: 250rpx;
			height: 250rpx;
			border-radius: 50%;
		}

		.login-button {
			margin-top: 30rpx;
			width: 400rpx;
			font-size: 40rpx;
			background-color: $green;
			color: $white;
			border-radius: 10px;
		}
	}
</style>
