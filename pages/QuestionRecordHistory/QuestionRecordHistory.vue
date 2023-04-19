<template>
	<view class="container">
		<u-sticky>
			<u-subsection :list="list" bgColor="#fff" fontSize="14" mode="button" :current="current"
				@change="sectionChange"></u-subsection>
		</u-sticky>
		<view class="bottom-container">
			<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="已经到底了" />
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js";
	
	export default {
		data() {
			return {
				list: ['全部','已完成','未完成'],
				typeList:[-1,0,1],
				current:0,
				total: 0,
				searchInfo: {
					page:1,
					limit:10,
					type:-1
				},
				questionRecordList:[],
				loadStatus: 'loading', // 加载更多的状态
			};
		},
		async onLoad() {
			await this.getQuestionRecord();
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.searchInfo.page * this.searchInfo.limit >= this.searchInfo.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.searchInfo.page++;
				await this.getQuestionRecord()
			}
		},
		methods:{
			/**
			 * 分页获取刷题记录
			 */
			async getQuestionRecord(){
				const res = await questionApi.getQuestionRecord();
				
				if(res.code === 0) {
					this.total = res.data.total;
					this.questionRecordList = res.data.data
				}
				
				console.log(this.total,this.questionRecordList);
				
				// 没有数据了
				if (this.searchInfo.page * this.searchInfo.limit >= this.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 切换类型
			 * @param {Object} index
			 */
			async sectionChange(index) {
				console.log(index);
				this.current = index;
				this.searchInfo.type = this.typeList[index]
			},
		}
	}
</script>

<style lang="scss">

</style>
