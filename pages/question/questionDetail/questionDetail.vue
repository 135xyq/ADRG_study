<template>
	<view class="container"
		:style="{minHeight:recordHeight + 'px'}">
		<view  v-if="questionInfo.id">
			<view class="question-info">
				<view class="question-type-level">
					<view class="tag-item">
						<u-tag :text="questionLevel[questionInfo.level].key" plain
							:type="questionLevel[questionInfo.level].type"></u-tag>
					</view>
					<view class="tag-item">
						<u-tag :text="questionType[questionInfo.type].key" :type="questionType[questionInfo.type].type"
							class="tag-item"></u-tag>
					</view>
				</view>
				<view class="question">
					<view class="question-title">
						{{questionInfo.title}}
					</view>
					<view class="options" v-if="questionInfo.type <= 1">
						<view class="option" v-for="(value,key) in questionInfo.options" :key="key"
							:class="{'right':(questionInfo.answer.indexOf(key) !== -1 && isShowAnswerAndParse)}">
							{{key}} . {{value}}
						</view>
					</view>
				</view>
			</view>
			<view class="btn-container" >
				<u-button type="primary" text="镂空" @click="onHandleShowAnswerAndParse">{{isShowAnswerAndParse ? '隐藏答案和解析' :'查看答案和解析'}}</u-button>
			</view>
			<view class="answer-info" v-show="isShowAnswerAndParse">
				<view class="answer-title">
					答案
				</view>
				<view class="answer-content">
					<view class="has-option" v-if="questionInfo.type <= 1">
						<view class="right-answer answer">
							正确答案：{{questionInfo.answer.join('')}}
						</view>
					</view>

					<view class="no-option">
						<view class="right-answer answer" v-if="questionInfo.type > 1">
							<view class="answer-left-title">正确答案：</view>
							<view class="answer-content">{{questionInfo.answer.join('')}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="parse-info" v-show="isShowAnswerAndParse">
				<view class="parse-title">
					解析
				</view>
				<view class="parse-content">
					{{questionInfo.parse ? questionInfo.parse : '暂无解析'}}
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
				questionId:'' ,// 题目id
				isShowAnswerAndParse: false, // 是否展示正确答案和解析
				recordHeight: 500, // 页面的最小高度
				questionInfo: {} ,// 题目信息
			};
		},
		async onLoad(option) {
			// console.log(option.id);
			if (option.id) {
				this.questionId = option.id

				// 获取题目详情
				questionApi.getQuestionDetailFinal({
					id: this.questionId
				}).then(res => {
					this.questionInfo = res.data
				}).catch(res => {
					uni.navigateBack()
				})
				// console.log(this.errorQuestionIdList);
			} else {
				uni.navigateBack();
			}

		},
		methods: {
			// 展示正确答案和解析
			onHandleShowAnswerAndParse() {
				this.isShowAnswerAndParse = !this.isShowAnswerAndParse;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.question-info {
			background-color: #18171705;
			width: 95%;
			margin: 10px auto;
			border-radius: 20px;
			box-shadow: 5px 5px 5px #4d444447;

			.question-type-level {
				padding: 20px 10px;
				display: flex;

				.tag-item {
					margin: 0 10px;
				}

			}

			.question {
				padding: 10px;

				.question-title {
					font-size: 18px;
					font-weight: 700;
					color: #000;
					margin-bottom: 20px;
				}

				.options {
					.option {
						margin: 10px 0px;
						color: #00000096;
						background-color: #fff;
						padding: 15px;
						border-radius: 15px;

						&.error {
							background-color: #ff0000a3;
							color: #fff;
						}

						&.right {
							background-color: #008000c4;
							color: #fff;
						}
					}
				}
			}
		}

		.btn-container {
			width: 80%;
			margin: 20px auto;
			padding: 20px 0;
		}

		.answer-info {
			background-color: #18171705;
			width: 95%;
			margin: 10px auto;
			border-radius: 10px;
			box-shadow: 5px 5px 5px #4d444447;

			.answer-title {
				padding: 20px 15px;
				color: #000;
				font-weight: 700;
				font-size: 34rpx;
			}

			.answer-content {
				display: flex;
				font-size: 14px;

				.answer {
					margin: 20px 10px;
				}

				.user-answer {
					color: #00000096;

					&.error-answer {
						color: #ff0000a3;
					}
				}

				.right-answer {
					color: #008000c4;
				}
			}

		}

		.parse-info {
			background-color: #18171705;
			width: 95%;
			margin: 10px auto;
			border-radius: 10px;
			box-shadow: 5px 5px 5px #4d444447;

			.parse-title {
				padding: 20px 15px;
				color: #000;
				font-weight: 700;
				font-size: 34rpx;
			}

			.parse-content {
				padding: 0 15px;
				padding-bottom: 20px;
				color: #00000096;
			}
		}

		.bottom {
			height: 10px;
		}
	}
</style>