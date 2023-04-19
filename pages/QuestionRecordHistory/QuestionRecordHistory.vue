<template>
	<view class="container">
		<u-sticky>
			<u-subsection :list="list" bgColor="#fff" fontSize="14" mode="button" :current="current"
				@change="sectionChange"></u-subsection>
		</u-sticky>
		<view class="record-content">
			<view class="record-item" v-for="(value,key) in orderByDate" :key="key">
				<view class="item-time">
					<view class="icon"></view>
					<view class="time">{{key}}</view>
				</view>
				<view class="question-record-item" v-for="item in value" :key="item.id" @click="onHandleGoToPage(item)">
					<view class="title">{{item.questionCategory.title}}-专项练习</view>
					<view class="info">
						<view class="type" :class="{'no-submit':!item.is_submit}">{{item.is_submit ? '已完成' :'未完成'}}
						</view>
						<view class="count">题目数量 ：{{item.question_history_record_count}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<u-loadmore :status="loadStatus" height="50" :line="true" nomoreText="没有更多记录了" />
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js";

	export default {
		data() {
			return {
				list: ['全部', '已完成', '未完成'],
				typeList: [-1, 1, 0],
				current: 0,
				total: 0,
				searchInfo: {
					page: 1,
					limit: 10,
					type: -1
				},
				questionRecordList: [],
				loadStatus: 'loading', // 加载更多的状态
			};
		},
		computed: {
			// 将记录按照时间进行分类
			orderByDate() {
				const tempList = {};
				for (let i = 0; i < this.questionRecordList.length; i++) {
					const date = this.questionRecordList[i].create_time.split(' ')[0];
					if (tempList[date]) {
						tempList[date].push(this.questionRecordList[i])
					} else {
						tempList[date] = [this.questionRecordList[i]]
					}
				}
				return tempList;
			}
		},
		async onLoad() {
			await this.getQuestionRecord();
			// console.log(this.orderByDate);
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.searchInfo.page * this.searchInfo.limit >= this.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.searchInfo.page++;
				await this.getQuestionRecord()
			}
		},
		methods: {
			/**
			 * 分页获取刷题记录
			 */
			async getQuestionRecord() {
				const res = await questionApi.getQuestionRecord(this.searchInfo);

				if (res.code === 0) {
					this.total = res.data.total;
					this.questionRecordList = [...this.questionRecordList, ...res.data.data]
				}

				// console.log(this.total, this.questionRecordList);

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
				// console.log(index);
				
				this.current = index;
				this.searchInfo.type = this.typeList[index]


				// 数据重置
				this.total = 0;
				this.searchInfo = {
					...this.searchInfo,
					page: 1,
					limit: 10
				}
				this.questionRecordList = [];

				// 切换标签重新获取数据
				await this.getQuestionRecord();
			},
			/**
			 * 跳转至指定的页面，做题界面或者是做练习报告页
			 * @param {Object} record
			 */
			onHandleGoToPage(record) {
				// 已完成，前往练习报告
				if(record.is_submit === 1) {
					uni.navigateTo({
						url:'/pages/question/questionResult/questionResult?record=' + record.id
					})
				}else{
					// 前往答题页
					uni.navigateTo({
						url:'/pages/question/questionAnswer/questionAnswer?record=' + record.id
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./questionRecordHistory.scss";
</style>