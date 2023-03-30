<template>
	<view>
		<!-- <u-loading-page loading-text="文章加载中...." :loading="loading"></u-loading-page> -->
			<u-skeleton
			    rows="30"
			    title
				:loading="loading"
			></u-skeleton>
		<view class="markdown-container">
			<u-parse :content="articleContent"></u-parse>
		</view>
	</view>
</template>

<script>
	import articleApi from "@/api/article/article.js"
	import MarkdownIt from 'markdown-it'

	export default {
		data() {
			return {
				id: '', // 文章id
				article: {},
				articleContent: '',
				loading:false
			};
		},
		async onLoad(option) {
			// 获取文章id
			this.id = option.id;

			if (!this.id) {
				// 文章id有误跳回原页面
				uni.navigateBack()
			} else {
				await this.getArticleDetail();
			}
		},
		methods: {
			/**
			 * 获取文章详情
			 */
			async getArticleDetail() {
				// 展示骨架屏
				this.loading = true 
				
				const res = await articleApi.getDetail({
					id: this.id
				});

				this.article = res.data;

				const md = new MarkdownIt()
				this.articleContent = md.render(this.article.content)
				
				this.loading = false

			}
		}
	}
</script>

<style lang="scss" scoped>
	.markdown-container {
		padding: 24rpx;
		font-size: 28rpx;
		color: $u-content-color;
		line-height: 1.6;
	}
</style>