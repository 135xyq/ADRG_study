<template>
	<view class="about-container">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	import aboutApi from "@/api/appletAbout/appletAbout.js"
	import MarkdownIt from 'markdown-it'


	export default {
		data() {
			return {
				content: ''
			};
		},
		async onLoad() {
			await this.getAboutData()
		},
		methods: {
			async getAboutData() {
				const res = await aboutApi.getAppletAbout();

				if (res.code === 0) {
					const md = new MarkdownIt()
					this.content = md.render(res.data.content);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about-container {
		padding: 20rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 1.6;

	}
</style>