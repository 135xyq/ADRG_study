<template>
	<view class="username-set-container">
		<u--input placeholder="请输入名字" maxlength="30" v-model="newName" border="bottom" clearable></u--input>
		<view class="button-container">
			<u-button :disabled="newName === oldName || newName.trim() === ''" :loading="loading" class="button"
				type="success" text="确定" @click="onHandleSet"></u-button>
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/user/user.js"

	export default {
		data() {
			return {
				oldName: '', // 修改之前的姓名
				newName: '', // 修改之后的姓名
				loading: false // 加载中
			};
		},
		onLoad(options) {
			this.oldName = options.name
			this.newName = options.name
		},
		methods: {
			async onHandleSet() {
				this.loading  =  true;
				
				const res = await userApi.updateUserInfo({
					nick_name: this.newName
				})
				if (res.code === 0) {
					uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: "success",
						success: async()=>{
							// 成功后清空存储的用户信息
							this.$store.dispatch('clearUserInfo');
							
							//  重新获取数据
							const res = await userApi.getUserInfo()
							this.$store.dispatch('updateUserInfo', JSON.stringify(res.data))
							
							uni.navigateBack();
						}
					});
				}
				
				this.loading = false;
			}
		}
	}
</script>

<style lang="scss">
	.button-container {
		margin-top: 10px;
		position: relative;

		.button {
			width: 180rpx;
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}
</style>