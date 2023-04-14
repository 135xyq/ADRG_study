<template>
	<view class="question-answer">
		<view class="top-info">
			<view class="time">00:12</view>
			<view class="record" @click="showPop = true">答题卡</view>
		</view>
		<view class="percent-container">
			<view class="percent">
				<u-line-progress :percentage="getPercent" :showText="false" activeColor="#3c9cff"></u-line-progress>
			</view>
			<view class="text">
				<text class="current">{{currentIndex + 1}}</text>
				<text>/{{questions.length}}</text>
			</view>
		</view>
		<view class="question" v-for="(item,index) in questions" :key="item.id" v-if="index===currentIndex">
			<view class="tag">
				<u-tag :text="questionLevel(item.level).key" class="tag-item" :type="questionLevel(item.level).type"
					></u-tag>
				<u-tag :text="questionType(item.type)" class="tag-item"></u-tag>
			</view>
			<view class="title">
				{{item.title}}
			</view>
			<view class="options">
				<view class="radio" v-if="item.type == 0">
					<u-radio-group placement="column" size="20" labelSize="20" v-model="answers[index][0]">
						<u-radio :customStyle="{marginBottom: '20px'}" v-for="(value, key) in item.options" :key="key"
							:label="key + '. '+ value" :name="key" labelSize="18">
						</u-radio>
					</u-radio-group>
				</view>
				<view class="checkbox" v-if="item.type == 1">
					<u-checkbox-group v-model="answers[index][0]" placement="column">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(value, key) in item.options" :key="key"
							:label="key + '. '+ value" :name="key" labelSize="18">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="text" v-if="item.type == 2">
					<u--input placeholder="请输入内容" border="surround" clearable v-model="answers[index][0]"></u--input>
				</view>
				<view class="textarea" v-if="item.type == 3">
					<u--textarea v-model="answers[index][0]" placeholder="请输入内容"></u--textarea>
				</view>
			</view>
		</view>
		<view class="do">
			<u-button :text="currentIndex === 0?'无':'上一题'" :disabled="currentIndex === 0" class="btn"
				@click="onHandleToPrevQuestion"></u-button>
			<u-button v-if="currentIndex !== questions.length-1" type="primary" text="下一题" class="btn next"
				@click="onHandleToNextQuestion"></u-button>
			<u-button v-if="currentIndex === questions.length-1" type="primary" text="交卷" class="btn next"
				@click="onHandleSubmit"></u-button>
		</view>
		<view class="pop-container">
			<u-popup :show="showPop" @close="showPop = false" :closeable="true">
				<view class="container">
					<view class="title">答题卡</view>
					<view class="info">
						<view class="info-item">
							<text class="circle done"></text>
							<text>已作答</text>
						</view>
						<view class="info-item">
							<text class="circle no"></text>
							<text>未作答</text>
						</view>
						<view class="info-item">
							<text class="circle ing"></text>
							<text>作答中</text>
						</view>
					</view>
					<view class="content">
						<view class="item" v-for="index in questions.length"
							:class="{done:isDone(index),ing:currentIndex === index-1}" :key="index"
							@click="onHandleToQuestion(index)">
							{{index}}
						</view>
					</view>
					<view class="submit">
						<u-button type="primary" text="提交并查看结果" @click="onHandleSubmit"></u-button>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: '',
				currentIndex: 8,
				radiovalue1: '',
				answers: [],
				showPop: false,
				questions: []
			};
		},
		computed: {
			// 答题进度
			getPercent() {
				return Math.floor((this.currentIndex + 1) / this.questions.length * 100);
			},
			// 判断是否已经答题
			isDone(index) {
				return index => {
					console.log(this.questions, index, this.answers, this.answers[index - 1]);
					// console.log(this.questions, index, this.answers, this.answers[index - 1]);
					if(this.questions.length !== 0){
						if (this.questions[index - 1].type <= 1) {
							if (this.answers[index - 1].length == 0) {
								return false;
							} else {
								return true;
							}
						} else {
							if (this.answers[index - 1]) {
								if (this.answers[index - 1][0] === '') {
									return false;
								} else {
									return true;
								}
							}
							return false;
						}
					}
					return false;
				}
			},
			// 题目难度
			questionLevel(level) {
				return level => {
					switch (level) {
						case 0:
							return {
								key: '简单',
									type: 'primary'
							};
						case 1:
							return {
								key: '中等',
									type: 'warning'
							};
						case 2:
							return {
								key: '困难',
									type: 'error'
							};
						default: {
							return {
								key: '未知',
								type: ''
							}
						}
					}
				}
			},
			// 题目类型
			questionType(type) {
				return type => {
					switch (type) {
						case 0:
							return '单选题';
						case 1:
							return '多选题';
						case 2:
							return '填空题';
						case 3:
							return '问答题';
						default:
							return '未知';
					}
				}
			}
		},
		async onLoad(option) {
			console.log(this.questions);
			if (option.category) {
				this.category = option.category

				console.log(this.category);
				this.questions = [{
						"id": 19,
						"type": 0,
						"title": "花园与户外",
						"level": 0,
						"options": {
							"A": "测试对不对的被无情而后进入 去不让回好人 好人 入21他任何别人",
							"B": "js的",
							"C": "未访问"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 152,
						"type": 2,
						"title": "js的使用1",
						"level": 0,
						"options": {
							"A": "1",
							"B": "2",
							"C": "3"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 151,
						"type": 1,
						"title": "js的使用",
						"level": 1,
						"options": {
							"A": "测试对不对的被无情而后进入 去不让回好人 好人 入21他任何别人",
							"B": "js的",
							"C": "未访问"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 154,
						"type": 0,
						"title": "js的使用3",
						"level": 2,
						"options": {
							"A": "测试对不对的被无情而后进入 去不让回好人 好人 入21他任何别人",
							"B": "js的",
							"C": "未访问"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 153,
						"type": 0,
						"title": "js的使用2",
						"level": 0,
						"options": {
							"A": "1",
							"B": "2",
							"C": "3"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 160,
						"type": 0,
						"title": "我很好",
						"level": 0,
						"options": {
							"A": "对",
							"B": "good",
							"C": "very good"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 149,
						"type": 3,
						"title": "js的使用4",
						"level": 0,
						"options": {
							"A": "1",
							"B": "2",
							"C": "3"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 158,
						"type": 1,
						"title": "测试1111",
						"level": 0,
						"options": {
							"A": "1",
							"B": "2",
							"C": "3"
						},
						"question_category_id": 1,
						"status": 1
					},
					{
						"id": 157,
						"type": 2,
						"title": "测试111",
						"level": 0,
						"options": {
							"A": "1",
							"B": "2",
							"C": "3"
						},
						"question_category_id": 1,
						"status": 1
					}]
				this.initAnswer();

			} else {
				uni.navigateBack();
			}
		},
		methods: {
			// 初始化答案数据
			initAnswer() {
				for (let i = 0; i < this.questions.length; i++) {
					if (this.questions[i].type <= 1) {
						this.answers.push(new Array())
					} else {
						this.answers.push([''])
					}

				}
			},

			// 前一题
			onHandleToPrevQuestion() {
				this.currentIndex = (this.currentIndex - 1) % this.questions.length;
			},
			// 下一题
			onHandleToNextQuestion() {
				this.currentIndex = (this.currentIndex + 1) % this.questions.length;
			},
			// 交卷
			onHandleSubmit() {
				console.log(this.answers);
			},
			// 点击答题卡跳转到指定的题目
			onHandleToQuestion(index) {
				this.currentIndex = index - 1;

				this.showPop = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.question-answer {
		.top-info {
			display: flex;
			padding: 10px;
			justify-content: space-between;
		}

		.percent-container {
			display: flex;
			padding: 10px;
			padding-top: 0;
			justify-content: space-between;

			.percent {
				width: 85%;
				padding: 5px 0;

			}

			.text {
				padding-right: 10px;

				.current {
					color: rgb(60, 156, 255);
				}
			}
		}

		.tag {
			display: flex;

			.tag-item {
				margin: 0 10px;
			}
		}

		.question {
			margin-top: 10px;

			.title {
				padding: 10px;
				font-weight: 700;
				font-size: 18px;
			}

			.options {
				.radio {
					padding: 10px;
				}

				.text {
					padding: 10px;
				}
			}
		}

		.do {
			margin-top: 50px;
			display: flex;
			justify-content: space-between;

			.btn {
				margin: 0 20px;
				font-weight: 700;
				color: #000;

				&.next {
					color: #fff;
				}
			}
		}

		.pop-container {
			.container {
				padding: 10px;

				.title {
					text-align: center;
					font-weight: 700;
					font-size: 18px;
				}

				.info {
					margin-top: 40rpx;
					display: flex;

					.info-item {
						font-size: 14px;
						margin: 0 10px;

						.circle {
							display: inline-block;
							width: 10px;
							height: 10px;
							border-radius: 50%;
							margin-right: 5px;

							&.done {
								background-color: rgb(60, 156, 255);
							}

							&.ing {
								background-color: $green;
							}

							&.no {
								background-color: $gray;
							}
						}
					}
				}

				.content {
					margin-top: 30px;
					display: flex;
					flex-wrap: wrap;

					.item {
						width: 100rpx;
						height: 100rpx;
						line-height: 100rpx;
						margin: 10px;
						background-color: $gray;
						color: #828080;
						border-radius: 50%;
						text-align: center;

						&.done {
							color: $white;
							background-color: rgb(60, 156, 255);
						}

						&.ing {
							color: $white;
							background-color: $green;
						}
					}
				}

				.submit {
					display: flex;
					width: 80%;
					margin: 30px auto 10px;
				}
			}
		}
	}
</style>