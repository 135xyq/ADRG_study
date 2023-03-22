<template>
	<view>
		article
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryId:'', // 分类id
			};
		},
		onLoad(option) {
			// 获取传递的分类id
			this.categoryId = option.id;
		}
	}
</script>

<style lang="scss">

</style>
