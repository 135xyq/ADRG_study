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
				status: 0
			};
		},
		async onLoad() {
			await this.getFeedbackData();
		},
		methods: {
			async getFeedbackData() {
				const res = await feedbackApi.getFeedbackList({status:this.status});
				
				this.feedbacList = res.data.data
			},
			/**
			 * 更改选择
			 * @param {Object} index
			 */
			async onHandleChangeType(index) {
				
				this.current = index
				this.status = index
				
				await this.getFeedbackData()
			}
		}
	}
</script>

<style lang="scss">

</style>