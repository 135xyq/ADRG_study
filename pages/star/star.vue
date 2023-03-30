<template>
	<view class="star-container">
		<u-sticky>
			<u-subsection :list="list" bgColor="#fff" fontSize="14" mode="button" :current="current"
				@change="sectionChange"></u-subsection>
		</u-sticky>
		<view class="content">
			</uni-list>
			<uni-list-item v-for="item in starList" :key="item.id" :title="item[statusName].title"
				:note="item[statusName].description" :thumb="config.baseUrl + item[statusName].thumbnail_url"
				thumb-size="lg" @click.native="onHandleToDetail(item)" />
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
	import starApi from "@/api/star/star.js"
	import config from "@/common/config.js"

	export default {
		data() {
			return {
				list: ['文章', '视频', '帖子'],
				current: 0,
				loadStatus: 'loading', // 加载更多的状态
				pageInfo: {
					page: 1,
					limit: 20,
					total: 0
				},
				status: 0,
				starList: [],
				statusName: 'article',
				statusNameList: ['article', 'video'],
				scrollTop: 0,
				config,
			};
		},
		async onLoad() {
			await this.getStarData()
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
				await this.getStarData()
			}
		},
		methods: {
			/**
			 * 获取数据
			 */
			async getStarData() {
				const res = await starApi.getStarPage({
					status: this.status,
					...this.pageInfo
				})

				// console.log(res.data);
				this.pageInfo.total = res.data.total
				this.starList = [...this.starList, ...res.data.data]

				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 切换类型
			 * @param {Object} index
			 */
			async sectionChange(index) {
				this.current = index
				this.status = index

				//  数据重置
				this.pageInfo = {
					page: 1,
					limit: 20,
					total: 0
				}
				this.starList = []

				//  修改显示的的是文章还是视频
				this.statusName = this.statusNameList[this.current];

				//  重新获取数据
				await this.getStarData()

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