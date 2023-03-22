<template>
	<view>
		videoplay
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'' ,// 视频id
			};
		},
		onLoad(option) {
			// 获取视频id
			this.id = option.id
			console.log('视频',this.id);
		}
	}
</script>

<style lang="scss">

</style>
