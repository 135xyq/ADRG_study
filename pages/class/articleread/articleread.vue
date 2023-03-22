<template>
	<view>
		articleread
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'' ,// 文章id
			};
		},
		onLoad(option) {
			// 获取文章id
			this.id = option.id;
			console.log('文章',this.id);
		}
	}
</script>

<style lang="scss">

</style>
