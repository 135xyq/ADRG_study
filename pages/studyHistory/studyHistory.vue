<template>
	<view class="history-container">
		<u-sticky>
			<u-subsection :list="list" bgColor="#fff" fontSize="14" mode="button" :current="current"
				@change="sectionChange"></u-subsection>
		</u-sticky>
		<view class="content">
			</uni-list>
			<uni-list-item v-for="item in historyList" :key="item.id" :title="item[statusName].title"
				:thumb="config.baseUrl + item[statusName].thumbnail_url" thumb-size="lg"
				:rightText="formateDate(item.total_time)" @click.native="onHandleToDetail(item)" />
			</uni-list>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="已经到底了" />
		</view>
		<u-back-top :scrollTop="scrollTop" :duration="200" mode="circle" :iconStyle="{fontSize: '32rpx',
			color: '#2979ff'}"></u-back-top>
	</view>

</template>

<script>
	import historyApi from "@/api/studyHistory/studyHistory.js"
	import config from "@/common/config.js"
	import {
		formateDate
	} from "@/utils/formate.js"

	export default {
		data() {
			return {
				list: ['视频', '文章'],
				current: 0,
				loadStatus: 'loading', // 加载更多的状态
				pageInfo: {
					page: 1,
					limit: 20,
					total: 0
				},
				type: 1,
				historyList: [],
				statusName: 'video',
				statusNameList: ['video', 'article'],
				scrollTop: 0,
				config,
			};
		},
		async onLoad() {
			await this.getHistoryData()
		},
		/**
		 * 下拉刷新
		 */
		async onPullDownRefresh() {
			this.initHistoryData();
			
			// 获取数据
			await this.getHistoryData()

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
				await this.getHistoryData()
			}
		},
		methods: {
			formateDate,
			/**
			 * 数据重置
			 */
			initHistoryData() {
				this.loadStatus = 'loading'; // 加载更多的状态
				this.pageInfo = {
					page: 1,
					limit: 20,
					total: 0
				};
				this.historyList = [];
				this.scrollTop = 0;
			},
			/**
			 * 获取数据
			 */
			async getHistoryData() {
				const res = await historyApi.getStudyHistoryPage({
					type: this.type,
					...this.pageInfo
				})

				// console.log(res.data);
				this.pageInfo.total = res.data.total
				this.historyList = [...this.historyList, ...res.data.data]

				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 切换类型
			 * @param {Object} index
			 */
			async sectionChange(index) {
				this.current = index
				this.type = index + 1

				//  数据重置
				this.pageInfo = {
					page: 1,
					limit: 20,
					total: 0
				}
				this.historyList = []

				//  修改显示的的是文章还是视频
				this.statusName = this.statusNameList[this.current];

				//  重新获取数据
				await this.getHistoryData()

			},
			/**
			 * 前往文章或视频的详情页
			 * @param {Object} data
			 */
			onHandleToDetail(data) {
				// console.log(data);
				if (data.video) {
					uni.navigateTo({
						url: '/pages/class/videoplay/videoplay?id=' + data.video.id
					})
				} else if (data.article) {
					uni.navigateTo({
						url: '/pages/class/articleread/articleread?id=' + data.article.id
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>