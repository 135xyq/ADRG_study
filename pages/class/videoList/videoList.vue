<template>
	<view class="video-list-container">
		<view class="swiper-container">
			<u-swiper :list="list1"></u-swiper>
		</view>
		<view class="list-container">
			<view class="title">
				<uni-icons custom-prefix="iconfont" type="icon-shipin" size="22"></uni-icons>
				<text>视频</text>
			</view>
			<view class="list">
				<u-grid :border="false" col="2">
					<u-grid-item v-for="item in videoList" :key="item.id">
						<view class="list-item" @click="onHandleGoToVideoPlay(item.id)">
							<MyVideo :videoData="item"></MyVideo>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="status" height="50" :line="true" nomoreText="已经到底了" />
		</view>
		<view class="top">
			<u-back-top :scrollTop="scrollTop" :duration="500" mode="circle" :iconStyle="{fontSize: '32rpx',
				color: '#2979ff'}"></u-back-top>
		</view>
	</view>
</template>


<script>
	// 视频列表页

	import videoApi from "@/api/video/video.js";

	export default {
		data() {
			return {
				categoryId: '', // 分类id
				videoList: [], // 视频列表
				scrollTop: 0, // 页面滚动距离
				status: 'loading', // 当前数据列表的状态
				pageInfo: {
					page: 1,
					limit: 20,
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
			await this.getVideoList();
		},
		/**
		 * 监听页面滚动
		 * @param {Object} e
		 */
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
				this.status = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getVideoList()
			}
		},
		methods: {
			/**
			 * 获取视频分页数据
			 */
			async getVideoList() {
				const res = await videoApi.getPage({
					...this.pageInfo,
					category_id: this.categoryId
				});
				this.pageInfo.total = res.data.total;
				this.videoList = [...this.videoList, ...res.data.data];
				
				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
					this.status = 'nomore'
				}
			},
			/**
			 * 跳转到视频详情页
			 * @param {Object} id 视频id
			 */
			onHandleGoToVideoPlay(id) {
				uni.navigateTo({
					url:"/pages/class/videoplay/videoplay?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.video-list-container {
		.list-container {
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
