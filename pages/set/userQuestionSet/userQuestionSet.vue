<template>
	<view class="user-question-set">
		<u-picker :show="true" :defaultIndex="defaultIndex" :columns="columns" @confirm="onHandleConfirm" @cancel="onHandleCancel"></u-picker>
	</view>
</template>

<script>
	import userApi from "@/api/user/user.js"
	
	export default {
		data() {
			return {
				oldCount: '', // 修改之前的个数
				columns: [[5,10,15,20,25]],
				defaultIndex: [1]
			};
		},
		onLoad(options) {
			this.oldCount = Number(options.count)
			const index = this.columns[0].indexOf(this.oldCount)
			this.defaultIndex = [index]

			
		},
		methods: {
			//  确认修改
			async onHandleConfirm(data) {
				const res = await userApi.updateUserInfo({
					question_count: data.value[0]
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
			},
			// 取消修改
			onHandleCancel() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.button-container{
	position: relative;
	.button{
		width: 180rpx;
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>