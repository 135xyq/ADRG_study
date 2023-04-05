<template>
	<view class="user-gender-container">
		<u-radio-group v-model="newGender" placement="column" iconPlacement="right" :borderBottom="true">
			<u-radio activeColor="green" :customStyle="{padding: '20px'}" label="男" :name="1"></u-radio>
			<u-radio activeColor="green" :customStyle="{padding: '20px'}" label="女" :name="2"></u-radio>
		</u-radio-group>
		<view class="button-container">
			<u-button :customStyle="{width:'150px',}" :disabled="newGender === oldGender" :loading="loading"  type="success" text="确定" @click="onHandleSet"></u-button>
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/user/user.js"
	
	export default {
		data() {
			return {
				oldGender: '',
				newGender: '',
				loading: false
			}
		},
		onLoad(options) {
			this.oldGender = Number(options.gender);
			this.newGender = Number(options.gender);
		},
		methods: {
			//  设置性别
			async onHandleSet() {
				this.loading  =  true;
				
				const res = await userApi.updateUserInfo({
					gender: this.newGender
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

<style lang="scss" scoped>
.button-container{
	margin-top: 10px;
	position: relative;
	.button{
		width: 180rpx;
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
