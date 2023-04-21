<template>
	<view class="container" @touchstart="onHandleTouchStart" @touchend="onHandleTouchEnd"
		:style="{minHeight:recordHeight + 'px'}">
		<view class="title-info">
			<view class="title">{{categoryInfo.title}}</view>
			<view class="count">
				<text class="current">{{currentIndex + 1}}</text>
				<text class="total">/{{errorQuestionIdList.length}}</text>
			</view>
		</view>
		<view v-for="(item,index) in questionList" :key="item.id" v-show="index === currentIndex">
			<view class="question-info">
				<view class="question-type-level">
					<view class="tag-item">
						<u-tag :text="questionLevel[item.level].key" plain
							:type="questionLevel[item.level].type"></u-tag>
					</view>
					<view class="tag-item">
						<u-tag :text="questionType[item.type].key" :type="questionType[item.type].type"
							class="tag-item"></u-tag>
					</view>
				</view>
				<view class="question">
					<view class="question-title">
						{{item.title}}
					</view>
					<view class="options" v-if="item.type <= 1">
						<view class="option" v-for="(value,key) in item.options" :key="key" :class="{'right':(item.answer.indexOf(key) !== -1 && isShowAnswerAndParse)}">
							{{key}} . {{value}}
						</view>
					</view>
				</view>
			</view>
			<view class="btn-container" v-if="!isShowAnswerAndParse">
				<u-button type="primary" text="镂空" @click="onHandleShowAnswerAndParse">查看答案和解析</u-button>
			</view>
			<view class="answer-info" v-show="isShowAnswerAndParse">
				<view class="answer-title">
					答案
				</view>
				<view class="answer-content">
					<view class="has-option" v-if="item.type <= 1">
						<view class="right-answer answer">
							正确答案：{{item.answer.join('')}}
						</view>
					</view>

					<view class="no-option">
						<view class="right-answer answer" v-if="item.type > 1">
							<view class="answer-left-title">正确答案：</view>
							<view class="answer-content">{{item.answer.join('')}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="parse-info" v-show="isShowAnswerAndParse">
				<view class="parse-title">
					解析
				</view>
				<view class="parse-content">
					{{item.parse ? item.parse : '暂无解析'}}
				</view>
			</view>
			<view class="bottom"></view>
		</view>
	</view>
</template>

<script>
	import {
		questionLevel,
		questionType
	} from "@/utils/question.js"
	import questionApi from "@/api/question/question.js"

	export default {
		data() {
			return {
				questionLevel,
				questionType,
				category: '', //分类id
				categoryInfo: {}, // 分类信息
				isShowAnswerAndParse: false, // 是否展示正确答案和解析
				errorQuestionIdList: [], // 错题id列表
				currentIndex: 0, // 当前的题目
				questionList: [], //题目列表
				hasGetIdList: [], // 已经获取过数据的题目id
				recordHeight: 500, // 页面的最小高度
			};
		},
		async onLoad(option) {
			if (option.category) {
				this.category = option.category

				// 获取错题id
				await this.getErrorQuetionIdList();
				
				// 没有错题则返回
				if (this.errorQuestionIdList.length === 0) {
					uni.navigateBack();
				} else {
					// 初始化获取第一道题的信息
					await this.getQuestionDetail();
				}



				// console.log(this.errorQuestionIdList);
			} else {
				uni.navigateBack();
			}

			// 获取页面的高度等信息
			const pageInfo = uni.getSystemInfoSync();
			// console.log(pageInfo);
			// 答题卡的高度
			this.recordHeight = pageInfo.windowHeight;
		},
		watch: {
			// 监听当前题目，变化时隐藏答案和解析
			currentIndex(val) {
				this.isShowAnswerAndParse = false;
			}
		},
		methods: {
			/**
			 * 获取错题列表id
			 */
			async getErrorQuetionIdList() {
				const res = await questionApi.getAllErrorQuestionId({
					category: this.category
				});


				this.errorQuestionIdList = res.data.ids;
				this.categoryInfo = res.data.category;
			},
			/**
			 * 获取题目详情
			 */
			async getQuestionDetail() {
				// console.log(this.hasGetIdList.indexOf(this.errorQuestionIdList[this.currentIndex]),this.hasGetIdList);

				// 判断题目列表是否已经有了，没有则继续获取，有则结束不再获取数据
				if (this.hasGetIdList.indexOf(this.errorQuestionIdList[this.currentIndex]) !== -1) {
					return;
				}

				const res = await questionApi.getQuestionDetail({
					question: this.errorQuestionIdList[this.currentIndex]
				});

				// 将题目id加入到已获取列表
				this.hasGetIdList.push(this.errorQuestionIdList[this.currentIndex])

				this.questionList = [...this.questionList, res.data];
				// console.log(this.questionList);
			},
			// 展示正确答案和解析
			onHandleShowAnswerAndParse() {
				this.isShowAnswerAndParse = true;
			},
			// 监听开始滑动
			onHandleTouchStart(e) {
				this.startX = e.changedTouches[0].clientX
			},
			// 监听结束滑动
			async onHandleTouchEnd(e) {
				const moveX = e.changedTouches[0].clientX
				const deltaX = moveX - this.startX

				if (deltaX > 60) { // 右滑
					this.currentIndex = Math.max(0, this.currentIndex - 1)
				} else if (deltaX < -60) { // 左滑
					this.currentIndex = Math.min(this.errorQuestionIdList.length - 1, this.currentIndex + 1)

					// console.log(this.currentIndex,this.errorQuestionIdList.length);

					// 如果最后一页已经获取，不再重复获取
					if (this.errorQuestionIdList.length === this.questionList.length) {
						return;
					}

					if (this.currentIndex < this.errorQuestionIdList.length) {
						// 右滑获取题目信息
						await this.getQuestionDetail();
					}
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./errorQuestionDetail.scss";
</style>