<template>
	<view class="container">
		<u-skeleton rows="30" title :loading="loading"></u-skeleton>
		<view class="article">
			<view class="title">
				{{article.title}}
			</view>
			<view class="time">
				{{article.create_time}}
			</view>
			<view class="content">
				<u-parse :content="articleContent"></u-parse>
			</view>
			<view class="end">
				<u-loadmore status="nomore" color="rgb(0 0 0 / 40%)" nomoreText="文章到底了"  :line="true"/>
			</view>
		</view>
	
		<view class="user-do-info">
			<view class="view-count">
				{{article.view_count}}次阅读
			</view>
			<view class="right">
				<view class="dianzan item" @click="onHandleLike">
					<uni-icons custom-prefix="iconfont" type="icon-dianzan" :color="isLike?'red':'gray'"></uni-icons>
					<text class="text">{{article.like_count}}</text>
				</view>
				<view class="shoucang item" @click="onHandleStar">
					<uni-icons custom-prefix="iconfont" type="icon-shoucang1"
						:color="isStar?'#FED000':'gray'"></uni-icons>
					<text class="text">{{article.star_count}}</text>
				</view>
			</view>
		</view>
		<view class="comment">
			<view class="publish" @click="onHandlePublishComment">
				<uni-icons type="chat" size="20"></uni-icons>
				<view> 写评论</view>
			</view>
			<view class="comment-title">
				{{pageInfo.total}}个评论
			</view>
			<view class="comment-list-container">
				<!-- 				<view class="" v-if="commentList.length === 0">
					<u-empty text="暂无评论" icon=""></u-empty>
				</view> -->
				<view class="comment-item" v-for="item in commentList" :key="item.id">
					<Comment :commentData="item" @deleteComment="onHandleDeleteComment"></Comment>
				</view>
				<view class="bottom-container">
					<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="没有更多评论了" />
				</view>
				<u-back-top :scrollTop="scrollTop" :duration="200" mode="circle" :bottom="70" :iconStyle="{fontSize: '32rpx',
					color: '#2979ff'}"></u-back-top>
			</view>
		</view>
	</view>
</template>

<script>
	import articleApi from "@/api/article/article.js"
	import MarkdownIt from 'markdown-it'
	import config from "@/common/config.js"
	import commentApi from "@/api/comment/comment.js"
	import starApi from "@/api/star/star.js"
	import likeApi from "@/api/like/like.js"

	export default {
		data() {
			return {
				id: '', // 文章id
				article: {},
				articleContent: '',
				loading: false,
				config,
				pageInfo: {
					page: 1,
					limit: 20,
					total: 0
				},
				commentList: [],
				scrollTop: 0,
				loadStatus: 'loading', // 加载更多的状态
				isStar: false, // 是否已经收藏
				isLike: false, // 是否已经点赞
			};
		},
		async onLoad(option) {
			// 获取文章id
			this.id = option.id;

			if (!this.id) {
				// 文章id有误跳回原页面
				uni.navigateBack()
			} else {
				// 获取文章详情和评论列表
				await this.getArticleDetail();
				await this.getCommentList()
				
				// 文章的收藏和点赞信息
				await this.getArticleStarInfo()
				await this.getArticleLikeInfo()
			}
		},
		/**
		 * 下拉刷新
		 */
		async onPullDownRefresh() {
			this.initCommentData();
		
			// 获取文章详情和评论列表
			await this.getCommentList()
			await this.getArticleDetail()
		
			// 文章的收藏和点赞信息
			await this.getArticleLikeInfo()
			await this.getArticleStarInfo()
		
			uni.stopPullDownRefresh()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getCommentList()
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

			},
			/**
			 * 初始化评论的数据
			 */
			initCommentData() {
				this.pageInfo = {
					page: 1,
					limit: 10,
					total: 0
				}
			
				this.commentList = []
				this.scrollTop = 0
				this.loadStatus = 'loading' // 加载更多的状态
			},
			/**
			 * 获取评论列表
			 */
			async getCommentList() {
				const res = await commentApi.getCommentList({
					...this.pageInfo,
					articleId: this.id
				})
			
				this.pageInfo.total = res.data.total;
				this.commentList = [...this.commentList, ...res.data.data];
			
			
				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 判断文章是否已经收藏
			 */
			async getArticleStarInfo() {
				const res = await starApi.isStar({
					articleId: this.id
				})
			
				if (res.code === 0) {
					this.isStar = res.data.result;
				}
			
			},
			/**
			 * 判断文章是否已经点赞
			 */
			async getArticleLikeInfo() {
				const res = await likeApi.isLike({
					articleId: this.id
				})
			
				if (res.code === 0) {
					this.isLike = res.data.result;
				}
			
			},
			/**
			 * 文章点赞
			 */
			async onHandleLike() {
				// 已经点赞，再次点击取消点赞
				if (this.isLike) {
					const res = await likeApi.cancelLike({
						articleId: this.id
					})
			
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 500
					})
			
					this.isLike = false
					this.article.like_count--;
			
					// 重新获取，感觉没必要
					// await this.getArticleLikeInfo()
					// await this.getArticleDetail()
				} else {
					// 点赞
					const res = await likeApi.newLike({
						articleId: this.id
					})
			
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
			
					this.isLike = true
					this.article.like_count++;
			
					// 重新获取，感觉没必要
					// await this.getArticleLikeInfo()
					// await this.getArticleDetail()
				}
			
			},
			/**
			 * 收藏和取消收藏
			 */
			async onHandleStar() {
				// 已经收藏，再次点击取消收藏
				if (this.isStar) {
					const res = await starApi.cancelStar({
						articleId: this.id
					})
			
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
			
					this.isStar = false
					this.article.star_count--;
			
			
					// 重新获取，感觉没必要
					// await this.getArticleStarInfo()
					// await this.getArticleDetail()
				} else {
					// 收藏
					const res = await starApi.newStar({
						articleId: this.id
					})
			
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
			
					// 不再进行网络请求，直接本地增加
					this.isStar = true;
					this.article.star_count++;
			
					// 重新获取，感觉没必要
					// await this.getArticleStarInfo()
					// await this.getArticleDetail()
				}
			
			},
			/**
			 * 发布评论
			 */
			onHandlePublishComment() {
				uni.navigateTo({
					url: '/pages/commentPublish/commentPublish?articleId=' + this.id
				})
			},
			/**
			 * 删除评论
			 * @param {Number} id 评论的id
			 */
			async onHandleDeleteComment(id) {
				const res = await commentApi.deleteComment({
					id: id
				});
			
				// console.log(res);
				if (res.code === 0) {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
			
					setTimeout(async () => {
						this.initCommentData(); // 重置数据
						await this.getCommentList()
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 24rpx;

		.title {
			font-size: 16px;
			font-weight: 700;
			margin-bottom: 20rpx;
			letter-spacing: 2px;
		}
		
		.time{
			font-size: 14px;
			color: $gray;
			margin-bottom: 20px;
		}

		.content {
			font-size: 28rpx;
			color: $u-content-color;
			line-height: 1.6;
		}
		.end{
			margin: 20px 0;
		}
		.user-do-info {
			display: flex;
			justify-content: space-between;
			color: $gray;
		
			.view-count {
				padding-left: 10rpx;
			}
		
			.right {
				display: flex;
				justify-content: left;
		
				.item {
					margin-right: 20px;
		
					.text {
						padding-left: 5px;
					}
				}
			}
		}
		
		.comment {
			margin-top: 20px;
		
			.publish {
				padding-right: 20px;
				display: flex;
				justify-content: flex-end;
				font-size: 14px;
			}
		
			.comment-title {
				padding: 10px;
			}
		}
	}
</style>