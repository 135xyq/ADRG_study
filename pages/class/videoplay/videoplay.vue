<template>
	<view>
		<view class="video-container">
			<video id="myVideo" class="video" :src="config.baseUrl + videoData.url" :title="videoData.title"
				:direction="90" :show-mute-btn="true" :enable-play-gesture="true" :vslide-gesture="true"
				object-fit="cover" :poster="videoData.thumbnail_url"></video>
		</view>
		<view class="video-info">
			<u-collapse :border="false">
				<u-collapse-item class="title" :title="videoData.title" value="简介">
					<text class="description">{{videoData.description ? videoData.description: '暂无简介'}}</text>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="user-do-info">
			<view class="view-count">
				{{videoData.view_count}}次播放
			</view>
			<view class="right">
				<view class="dianzan item" @click="onHandleLike">
					<uni-icons custom-prefix="iconfont" type="icon-dianzan" color="gray"></uni-icons>
					<text class="text">{{videoData.like_count}}</text>
				</view>
				<view class="shoucang item">
					<uni-icons custom-prefix="iconfont" type="icon-shoucang" color="gray"></uni-icons>
					<text class="text">{{videoData.star_count}}</text>
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
					<Comment :commentData="item"></Comment>
				</view>
				<view class="bottom-container">
					<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="已经到底了" />
				</view>
				<u-back-top :scrollTop="scrollTop" :duration="200" mode="circle" :iconStyle="{fontSize: '32rpx',
					color: '#2979ff'}"></u-back-top>
			</view>
		</view>
	</view>
</template>

<script>
	import videoApi from "@/api/video/video.js"
	import config from "@/common/config.js"
	import commentApi from "@/api/comment/comment.js"

	export default {
		data() {
			return {
				id: '', // 视频id
				config,
				videoData: {}, // 视频详情
				pageInfo: {
					page: 1,
					limit: 20,
					total: 0
				},
				commentList: [],
				scrollTop: 0,
				loadStatus: 'loading', // 加载更多的状态
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		async onLoad(option) {
			// 获取视频id
			this.id = option.id

			// 如果没有id则跳转回原页面
			if (this.id) {
				await this.getVideoDetail();
				await this.getCommentList()



				// console.log(this.videoData);
			} else {
				uni.navigateBack();
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getCommentList()
			}
		},
		methods: {
			/**
			 * 获取视频详情
			 */
			async getVideoDetail() {
				const res = await videoApi.getVideoDetail({
					id: this.id
				});

				this.videoData = {
					...res.data
				}
			},
			/**
			 * 获取评论列表
			 */
			async getCommentList() {
				const res = await commentApi.getCommentList({
					...this.pageInfo,
					videoId: this.id
				})

				this.pageInfo.total = res.data.total;
				this.commentList = [...this.commentList, ...res.data.data];


				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 视频点赞
			 */
			onHandleLike() {
				console.log('点赞');
			},
			/**
			 * 发布评论
			 */
			onHandlePublishComment() {
				uni.navigateTo({
					url:'/pages/commentPublish/commentPublish?videoId=' + this.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		width: 100%;
		height: 400rpx;

		.video {
			width: 100%;
			height: 100%;
		}
	}

	.video-info {
		margin: 10px 5px;

		.title {
			font-size: 18px;
			font-weight: 600;
		}

		.description {
			font-size: 14px;
			font-weight: normal;
		}
	}

	.user-do-info {
		display: flex;
		justify-content: space-between;
		color: $gray;

		.view-count {
			padding-left: 20px;
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
</style>