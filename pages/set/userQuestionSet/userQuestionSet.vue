<template>
	<view class="user-question-set">
		<u-picker :show="true" :defaultIndex="defaultIndex" :columns="columns" @confirm="onHandleConfirm" @cancel="onHandleCancel"></u-picker>
<!-- 		<view class="button-container">
			<u-button :disabled="oldCount === newCount" :loading="loading" class="button" type="success" text="确定" @click="onHandleSet"></u-button>
		</view> -->
	</view>
</template>

<script>
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
			onHandleConfirm(data) {
				console.log(data.value[0]);
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