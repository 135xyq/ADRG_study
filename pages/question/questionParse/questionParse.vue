<template>
	<view class="container" @touchstart="onHandleTouchStart" @touchend="onHandleTouchEnd">
		<view class="record-info">
			<view class="flex-item">
				<view class="record-title">
					{{recordInfo.QuestionCategory ? recordInfo.QuestionCategory.title:''}}-专项练习
				</view>
				<view class="question-number">
					第{{getIndex}}题
				</view>
			</view>
			<view class="flex-item">
				<view class="answer-record" @click="showPop = true">
					答题卡
				</view>
			</view>
		</view>
		<view v-for="(item,index) in questionList" :key="item.id" v-show="index === currentIndex">
			<view class="question-info">
				<view class="question-type-level">
					<view class="tag-item">
						<u-tag :text="questionLevel[item.question.level].key" plain
							:type="questionLevel[item.question.level].type"></u-tag>
					</view>
					<view class="tag-item">
						<u-tag :text="questionType[item.question.type].key"
							:type="questionType[item.question.type].type" class="tag-item"></u-tag>
					</view>
				</view>
				<view class="question">
					<view class="question-title">
						{{item.question.title}}
					</view>
					<view class="has-option" v-if="item.question.type <= 1">
						<view class="options">
							<view class="option" v-for="(option,key) in item.question.options" :key="option.index">
								{{key}}. {{option}}
							</view>
						</view>
						<view class="answer-info">
							<view class="right-answer answer">
								正确答案：{{item.question.answer.join('')}}
							</view>
							<view class="user-answer  answer"
								:class="{'error-answer':(item.is_current === 0 && isDone(item)),'right-answer':item.is_current === 1}">
								你的答案：{{isDone(item) ? item.answer.join('') : '空'}}
							</view>
						</view>
					</view>
					<view class="no-option" v-if="item.question.type > 1">
						<view class="answer-info">
							<view class="right-answer answer">
								<view class="answer-title">正确答案：</view>
								<view class="answer-content">{{item.question.answer.join('')}}</view>
							</view>
							<view class="user-answer  answer"
								:class="{'error-answer':(item.is_current === 0 && isDone(item)),'right-answer':item.is_current === 1}">
								<view class="answer-title">你的答案：</view>
								<view class="answer-content">{{isDone(item)? item.answer.join('') : '空'}}</view>
							</view>
							<view class="answer">
								<view>答案匹配度：<text class="user-answer"
										:class="{'error-answer':(item.is_current === 0 && isDone(item)),'right-answer':item.is_current === 1}">{{(item.current_probability * 100).toFixed(2)}}%</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="parse-info">
				<view class="parse-title">
					解析
				</view>
				<view class="parse-content">
					{{item.question.parse ? item.question.parse : "暂无解析"}}
				</view>
			</view>
		</view>
		<view class="show-tips">
			<u-overlay :show="showTips" @click="showTips = false">
				<view class="warp" @tap.stop>
					<view class="content">
						再接再厉，继续提升
					</view>
					<view class="close">
						<u-icon name="close" size="18" @click="showTips = false"></u-icon>
					</view>
					<view class="button">
						<view class="btn"> <u-button text="返回首页" size="normal" @click="onHandleGoToHome"></u-button>
						</view>
						<view class="btn"> <u-button type="primary" text="返回报告" size="normal"
								@click="onHandleGoToBack"></u-button></view>
					</view>
				</view>
			</u-overlay>
		</view>
		<view class="pop-container">
			<u-popup :show="showPop" @close="showPop = false" :closeable="true">
				<view class="container" :style="{height:recordHeight + 'px'}">
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
						<view class="item" v-for="(item,index) in questionList" :key="index"
							:class="{right:item.is_current === 1,error:(item.is_current === 0  && isDone(item)),no:(item.is_current === 0  && !isDone(item))}"
							@click="onHandleChangeQuestion(index)">
							{{getRecordIndex(index)}}
						</view>
					</view>
				</view>
			</u-popup>
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
				type: 'all', // 解析的题目类型
				currentIndex: 0, // 当前所看到的题目
				record: '', // 试卷id
				total: '', // 题目数量
				recordInfo: '',
				startX: 0, // 起始位置
				tempQuestionList: [], //题目列表原始数据
				questionList: [], //题目列表筛选后的数据
				showTips: false, // 显示用户下一步的操作
				showPop:false, // 答题卡显示
				recordHeight:400
			};
		},
		async onLoad(options) {
			if (!options.record) {
				uni.navigateBack();
			} else {
				this.record = options.record;
				this.type = options.type || 'all';
				this.currentIndex = Number(options.index) || 0;
			}

			await this.getValidateResult();
			
			// 获取页面的高度等信息
			const pageInfo = uni.getSystemInfoSync();
			// console.log(pageInfo);
			// 答题卡的高度
			this.recordHeight = pageInfo.windowHeight;
		},
		computed: {
			//  获取题目的下标
			getIndex() {
				if (this.questionList.length > 0) {
					for (let i = 0; i < this.tempQuestionList.length; i++) {
						if (this.tempQuestionList[i].id === this.questionList[this.currentIndex].id) {
							return i + 1;
						}
					}
					return 1;
				}
				return 1;
			},
			// 计算答题卡的题目编号
			getRecordIndex(index) {
				return index=>{
					if (this.questionList.length > 0) {
						for (let i = 0; i < this.tempQuestionList.length; i++) {
							if (this.tempQuestionList[i].id === this.questionList[index].id) {
								return i + 1;
							}
						}
						return 1;
					}
				}
			}
		},
		methods: {
			/**
			 * 获取做题报告
			 */
			async getValidateResult() {
				const res = await questionApi.getQuestionRecordValidateResult({
					record: this.record
				})

				if (res.code === 0) {
					this.total = res.data.total;
					this.recordInfo = res.data.record;
					this.questionList = res.data.data;
					this.tempQuestionList = res.data.data

					if (this.type === 'error') {
						this.questionList = this.questionList.filter(item => item.is_current === 0)
						this.total = this.questionList.length
					}
				}

				// console.log(this.total, this.recordInfo, this.questionList);

			},
			/**
			 * 判断用户是否做题
			 * @param {Object} question
			 */
			isDone(question) {
				// console.log(question.id);
				if (question.is_current === 0) {
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
				return true;
			},
			// 监听开始滑动
			onHandleTouchStart(e) {
				this.startX = e.changedTouches[0].clientX
			},
			// 监听滑动结束
			onHandleTouchEnd(e) {
				const moveX = e.changedTouches[0].clientX
				const deltaX = moveX - this.startX
				if (deltaX > 60) { // 右滑
					this.currentIndex = Math.max(0, this.currentIndex - 1)
				} else if (deltaX < -60) { // 左滑
					this.currentIndex = Math.min(this.questionList.length - 1, this.currentIndex + 1)
					if (this.currentIndex === this.questionList.length - 1) {
						this.showTips = true
					}
				}
			},
			// 返回首页
			onHandleGoToHome() {
				uni.switchTab({
					url: '/pages/question/question'
				})
			},
			// 返回报告页
			onHandleGoToBack() {
				uni.navigateBack()
			},
			/**
			 * 切题
			 * @param {Object} index
			 */
			onHandleChangeQuestion(index) {
				this.currentIndex = index
				this.showPop = false
			}
		}
	}
</script>

<style lang="scss">
	@import "./questionParse.scss";
</style>