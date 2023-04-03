<template>
	<view class="comment-list-container">
		<view class="" v-if="commentList.length !== 0">
			<u-empty text="暂无评论" icon=""></u-empty>
		</view>
		<view class="comment-item" v-for="item in commentList" :key="item.id">
			<Comment :commentData="item"></Comment>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="已经到底了" />
		</view>
		<u-back-top :scrollTop="scrollTop" :duration="200" mode="circle" :iconStyle="{fontSize: '32rpx',
			color: '#2979ff'}"></u-back-top>
	</view>
</template>

<script>
	import commentApi from "@/api/comment/comment.js"

	export default {
		name: "CommentList",
		props: ['data'],
		data() {
			return {
				pageInfo: {
					page: 1,
					limit: 2,
					total: 0
				},
				commentList: [],
				scrollTop: 0,
				loadStatus: 'loading', // 加载更多的状态
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			console.log(1);
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getCommentList()
			}
		},
		watch: {
			data: {
				handler: async function(val) {
					await this.getCommentList(val)
				},
				deep: true
			}
		},
		methods: {
			async getCommentList(data) {
				const res = await commentApi.getCommentList({
					...data,
					...this.pageInfo
				})

				this.pageInfo.total = res.data.total;
				this.commentList = [...this.commentList, ...res.data.data];


				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			}
		}
	}
</script>

<style lang="scss">

</style>