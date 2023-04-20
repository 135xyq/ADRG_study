<template>
	<view class="container">
		<view class="record-info">
			<view class="top-title">
				<view class="top">
					<view class="name">
						试卷名称
					</view>
					<view class="time">
						{{formateDateToHMS(time)}}
					</view>
				</view>
				<view class="title">
					{{recordInfo.questionCategory ? recordInfo.questionCategory.title:''}}-专项练习
				</view>

				<view class="true">
					<!-- <MyProgress :percent="60" label="测试"></MyProgress> -->
					<MyProgress :progress="progress" :diameter="200"></MyProgress>
				</view>
			</view>
		</view>
		<view class="question-info">
			<view class="title">作答情况</view>
			<view class="count-info">
				<view class="count-info-item">
					<view class="count">{{total}}</view>
					<view class="text">共计</view>
				</view>
				<view class="count-info-item">
					<view class="count right">{{currentCount}}</view>
					<view class="text">答对</view>
				</view>
				<view class="count-info-item">
					<view class="count error">{{errorCount}}</view>
					<view class="text">答错</view>
				</view>
				<view class="count-info-item">
					<view class="count">{{noAnswerCount}}</view>
					<view class="text">未作答</view>
				</view>
			</view>
		</view>
		<view class="result-info">
			<view class="title">答题卡</view>
			<view class="info">
				<view class="info-item">
					<text class="circle right"></text>
					<text>正确</text>
				</view>
				<view class="info-item">
					<text class="circle error"></text>
					<text>错误</text>
				</view>
				<view class="info-item">
					<text class="circle no"></text>
					<text>未作答</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in questionList" :key="item.id"
				:class="{right:item.is_current === 1,error:isDoneError(item)}" @click="onHandleToParse('all',index)">
					{{index + 1}}
				</view>
			</view>
		</view>

		<view class="botttom-info">
			<view class="btn">
				<u-button shape="circle" text="全部解析" @click="onHandleToParse('all')"></u-button>
			</view>
			<view class="btn">
				<u-button type="primary" shape="circle" text="错题解析" @click="onHandleToParse('error')"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js"
	import {formateDateToHMS} from "@/utils/formate.js"
	export default {
		data() {
			return {
				record: '', // 试卷id
				total: 10, // 题目数量
				recordInfo: {}, // 试卷信息
				questionList: [], // 试卷列表
				currentCount: 0, // 正确题的数量
				noAnswerCount: 0, // 未答题的数量
				errorCount: 0, // 错题数量
				time:0 ,// 用户做题时间
			};
		},
		computed:{
			// 用户答题正确率
			progress() {
				if(this.total !== 0) {
					return Number((this.currentCount / this.total * 100).toFixed(2));
				}
				return 0.0;
			}
		},
		async onLoad(option) {
			if (option.record) {
				this.record = option.record;
				
				// 获取试卷信息
				await this.getValidateResult();
				
				// 统计各种题目数量
				this.computerEveryCount()
			} else {
				uni.navigateBack();
			}
		},
		methods: {
			formateDateToHMS,
			/**
			 * 获取做题报告
			 */
			async getValidateResult() {
				const res = await questionApi.getQuestionRecordValidateResult({
					record: this.record
				})

				if (res.code === 0) {
					this.total = res.data.total;
					this.time = res.data.record.total_time;
					this.recordInfo = res.data.record;
					this.questionList = res.data.data
				}

				// console.log(this.total, this.recordInfo, this.questionList);

			},
			/**
			 * 统计错题、正确的题、未答的题
			 */
			computerEveryCount() {
				for (let i = 0; i < this.questionList.length; i++) {
					const temp = this.questionList[i];
					if (temp.is_current === 1) {
						this.currentCount++
					} else {
						if (temp.question.type <= 1) {
							// 判断用户是否没有答题
							if (!temp.answer || temp.answer.length == 0) {
								this.noAnswerCount++
							} else {
								this.errorCount++
							}
						} else {
							if (temp.answer[0] === '') {
								this.noAnswerCount++;
							} else {
								this.errorCount++
							}
						}

					}
				}
			},
			/**
			 * 判断用户题目做错
			 * @param {Object} question
			 */
			isDoneError(question){
				// console.log(question.id);
				if(question.is_current === 0) {
					if (question.question.type <= 1) {
						// console.log(question.id,question.answer,question.answer.length);
						if (!question.answer || question.answer.length == 0) {
							return false
						} else {
							return true
						}
					} else {
						if (question.answer[0] === '') {
							return false
						} else {
							return true
						}
					}
				}
				return false;
			},
			/**
			 * 前往解析页
			 * @param {Object} type 是看全部解析还是错题
			 * @param {Object} index 点击单一题时对应的题目
			 */
			onHandleToParse(type,index) {
				let url = '/pages/question/questionParse/questionParse'
				
				if(type === 'all') {
					url += '?record='+ this.record + '&type=all&' + 'index=' +  (index ? index:0);
				}else if(type === 'error'){
					url += '?record=' + this.record + '&type=error&index=0';
				}
				// console.log(url);
				
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./questionResult.scss";
</style>