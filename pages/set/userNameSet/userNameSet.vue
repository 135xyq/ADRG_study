<template>
	<view class="username-set-container">
		<u--input placeholder="请输入名字" maxlength="30" v-model="newName" border="bottom" clearable></u--input>
		<view class="button-container">
			<u-button :disabled="newName === oldName || newName.trim() === ''" :loading="loading" class="button" type="success" text="确定" @click="onHandleSet"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldName: '', // 修改之前的姓名
				newName: '',// 修改之后的姓名
				loading: false // 加载中
			};
		},
		onLoad(options) {
			this.oldName = options.name
			this.newName = options.name
		},
		methods: {
			async onHandleSet() {
				console.log('修改用户名',this.newName);
				
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.button-container{
	position: relative;
	.button{
		width: 140rpx;
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
