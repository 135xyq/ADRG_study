<template>
	<view class="article-list-container">
		<!-- 		<view class="swiper-container">
			<u-swiper :list="list1"></u-swiper>
		</view> -->

		<view class="search">
			<u-search placeholder="请输入搜索内容" :disabled="true" :showAction="false" @click="onHandleGoToSearch"></u-search>
		</view>
		<view class="list-container">
			<view class="title">
				<uni-icons custom-prefix="iconfont" type="icon-wenzhang-copy" size="22"></uni-icons>
				<text>文章</text>
			</view>
			<view class="list">
				<u-grid :border="false" col="1">
					<u-grid-item v-for="item in articleList" :key="item.id">
						<view class="list-item" @click="onHandleGoToArticleRead(item.id)">
							<MyArticle :articleData="item"></MyArticle>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="status" height="50" :line="true" nomoreText="没有更多文章了" />
		</view>
		<view class="top">
			<u-back-top :scrollTop="scrollTop" :duration="200" mode="circle" :iconStyle="{fontSize: '32rpx',
				color: '#2979ff'}"></u-back-top>
		</view>
	</view>
</template>


<script>
	// 文章列表页

	import articleApi from "@/api/article/article.js";

	export default {
		data() {
			return {
				categoryId: '', // 分类id
				articleList: [], // 文章列表
				scrollTop: 0, // 页面滚动距离
				status: 'loading', // 当前数据列表的状态
				pageInfo: {
					page: 1,
					limit: 10,
					total: 0,
				}, // 分页信息
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			};
		},
		async onLoad(option) {
			// 获取传递的分类id
			this.categoryId = option.id;
			await this.getArticleList();
		},
		/**
		 * 监听页面滚动
		 * @param {Object} e
		 */
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 页面到底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
				this.status = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getArticleList()
			}
		},
		methods: {
			/**
			 * 获取文章分页数据
			 */
			async getArticleList() {
				const res = await articleApi.getPage({
					...this.pageInfo,
					category_id: this.categoryId
				});
				this.pageInfo.total = res.data.total;
				this.articleList = [...this.articleList, ...res.data.data];

				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
					this.status = 'nomore'
				}
			},
			/**
			 * 跳转到文章详情页
			 * @param {Object} id 文章id
			 */
			onHandleGoToArticleRead(id) {
				uni.navigateTo({
					url: "/pages/class/articleread/articleread?id=" + id
				})
			},
			/**
			 * 前往搜索页
			 */
			onHandleGoToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.article-list-container {
		.search{
			margin: 10px auto;
			width: 90%;
		}
		.list-container {
			margin-top: 30px;
			.title {
				font-size: 20px;
				font-weight: 600;
				margin: 10px 10px;

				text {
					margin-left: 5px;
				}
			}

			.list-item {
				margin: 5px;
				width: calc(100% - 10px);
			}
		}
	}
</style>