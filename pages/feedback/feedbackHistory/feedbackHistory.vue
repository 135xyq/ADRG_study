<template>
	<view class="history-container">
		<u-sticky>
			<u-subsection mode="subsection" :list="list" :current="current" @change="onHandleChangeType"></u-subsection>
		</u-sticky>
		<view class="">
			<view v-for="item in feedbacList" :key="item.id">
				<view class="not-response" v-if="current == 0">
					<uni-card :extra="item.create_time" :cover="item.image">
						<text class="uni-body">{{item.content}}</text>
					</uni-card>
				</view>
				<view class="response" v-if="current== 1">
					<uni-card  :extra="item.create_time" :cover="item.image">
						<text class="uni-body">{{item.content}}</text>
						<view slot="actions" class="card-actions no-border">
							<u-collapse
							  >
							    <u-collapse-item
							      title="回复内容"
							      name="Docs guide"
							    >
							      <text class="u-collapse-content">{{item.response_content}}</text>
							    </u-collapse-item>
							  </u-collapse>
						</view>
					</uni-card>
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="已经到底了" />
		</view>
	</view>
</template>

<script>
	import feedbackApi from "@/api/feedback/feedback.js"
	
	export default {
		data() {
			return {
				list: ['未回复', '已回复'],
				current: 0,
				feedbacList:[],
				status: 0,
				loadStatus: 'loading', // 加载更多的状态
				pageInfo: {
					page: 1,
					limit: 20,
					total:0
				}
			};
		},
		async onLoad() {
			await this.getFeedbackData();
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
				await this.getFeedbackData()
			}
		},
		methods: {
			async getFeedbackData() {
				const res = await feedbackApi.getFeedbackList({status:this.status,...this.pageInfo});
				
				this.feedbacList = [...this.feedbacList,...res.data.data]
				this.pageInfo.total = res.data.total
				
				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit > this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
				
			},
			/**
			 * 更改选择
			 * @param {Object} index
			 */
			async onHandleChangeType(index) {
				
				this.current = index
				this.status = index
				
				//  数据重置
				this.pageInfo = {
					page:1,
					limit: 20,
					total:0
				}
				this.feedbacList = []
				
				await this.getFeedbackData()
			}
		}
	}
</script>

<style lang="scss">

</style>