<template>
	<view class="question-answer" v-if="answers.length > 0" @touchstart="onHandleTouchStart"
		@touchend="onHandleTouchEnd">
		<view class="top-info">
			<!-- <view class="time">{{formateDateToMinuteAndSecond(time)}}</view> -->
			<view class="record" @click="showPop = true">答题卡</view>
		</view>
		<view class="percent-container">
			<view class="percent">
				<u-line-progress :percentage="getPercent" :showText="false" activeColor="#3c9cff"></u-line-progress>
			</view>
			<view class="text">
				<text class="current">{{currentIndex + 1}}</text>
				<text>/{{total}}</text>
			</view>
		</view>
		<view class="question" v-for="(item,index) in questions" :key="item.id" v-show="index===currentIndex">
			<view class="tag">
				<view class="tag-item">
					<u-tag :text="questionLevel[item.level].key" plain :type="questionLevel[item.level].type"></u-tag>
				</view>
				<view class="tag-item">
					<u-tag :text="questionType[item.type].key" :type="questionType[item.type].type"
						class="tag-item"></u-tag>
				</view>
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
					<u-checkbox-group v-model="answers[index]" placement="column">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(value, key) in item.options" :key="key"
							:label="key + '. '+ value" :name="key" labelSize="18">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="text" v-if="item.type == 2">
					<u--input placeholder="请输入答案" border="surround" clearable v-model="answers[index][0]"></u--input>
				</view>
				<view class="textarea" v-if="item.type == 3">
					<u--textarea v-model="answers[index][0]" placeholder="请输入答案"></u--textarea>
				</view>
			</view>
		</view>
		<view class="do">
			<u-button :text="currentIndex === 0?'无':'上一题'" :disabled="currentIndex === 0" class="btn"
				@click="onHandleToPrevQuestion" :customStyle="{width: '40%',
				margin: '0 20px',
				fontWeight: 700,
				color: '#000',}"></u-button>
			<u-button v-if="currentIndex !== total-1" type="primary" text="下一题" class="btn next"
				@click="onHandleToNextQuestion" :customStyle="{width: '40%',
				margin: '0 20px',
				fontWeight: 700,
				color: '#fff',}"></u-button>
			<u-button v-if="currentIndex === total-1" type="primary" text="交卷" class="btn next" @click="showPop = true"
				:customStyle="{width: '40%',
				margin: '0 20px',
				fontWeight: 700,
				color: '#fff',}"></u-button>
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
						<view class="item" v-for="(index,item) in total"
							:class="{done:isDone(item),ing:currentIndex === item}" :key="item"
							@click="onHandleToQuestion(item)">
							{{item + 1}}
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
	import {
		formateDateToMinuteAndSecond
	} from "@/utils/formate.js"
	import questionApi from "@/api/question/question.js"
	import {
		questionLevel,
		questionType
	} from "@/utils/question.js"

	export default {
		data() {
			return {
				category: '',
				currentIndex: 0,
				total: 0, // 题目数量
				answers: [], // 答案列表
				showPop: false, // 显示答题卡
				startX: 0, // 起始位置
				questions: [], // 题目列表
				time: 0, // 答题时长
				timer: null,
				record_id: '', // 试卷id
				questionType,
				questionLevel,
				loading: true
			};
		},
		computed: {
			// 答题进度
			getPercent() {
				return Math.floor((this.currentIndex + 1) / this.total * 100);
			}
		},
		async onLoad(option) {
			if (option.category) {
				this.category = option.category


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
						"type": 1,
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
						"type": 0,
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
						"type": 1,
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
						"type": 2,
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
						"type": 0,
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
					}
				]

				this.total = 9;
				this.record_id = 46
				
				// await this.getRandomQuestion();
				// // console.log(this.total,this.questions,this.record_id);
				
				this.initAnswer();
				// 开启答题计时
				this.timer = setInterval(() => {
					this.time++;
				}, 1000)
			} else {
				uni.navigateBack();
			}
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			formateDateToMinuteAndSecond,
			async getRandomQuestion() {
				const res = await questionApi.getRandomQuestions({
					category: this.category
				});

				if (res.code === 0) {
					this.total = res.data.total;
					this.record_id = res.data.record_id;
					this.questions = res.data.data
				}
			},
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
			// 判断是否已经答题
			isDone(index) {
				if (this.questions.length !== 0 && this.showPop) {
					if (this.questions[index].type <= 1) {
						if (this.answers[index].length == 0) {
							return false;
						} else {
							return true;
						}
					} else {
						if (this.answers[index]) {
							if (this.answers[index][0] === '') {
								return false;
							} else {
								return true;
							}
						}
						return false;
					}
				}
				return false;
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
			async onHandleSubmit() {
				const answers = []
				for(let i = 0;i < this.answers.length; i++) {
					const temp = {
						id: this.questions[i].id,
						answer: this.answers[i]
					}
					
					answers.push(temp);
				}
				
				// 组合数据
				const data = {
					record: this.record_id,
					time: this.time,
					answers: answers
				}
				
				// console.log(data);
				
				// const res =  await questionApi.postQuestionToValidate(data);
				const res = {code:0}
				
				// 交卷成功,跳转到练习报告界面
				if(res.code === 0) {
					uni.navigateTo({
						url:'/pages/question/questionResult/questionResult?record=' + this.record_id
					})
				}
				
			},
			// 点击答题卡跳转到指定的题目
			onHandleToQuestion(index) {
				this.currentIndex = index;

				this.showPop = false
			},
			// 监听左滑
			onHandleTouchStart(e) {
				this.startX = e.changedTouches[0].clientX
			},
			// 监听右滑
			onHandleTouchEnd(e) {
				const moveX = e.changedTouches[0].clientX
				const deltaX = moveX - this.startX
				if (deltaX > 60) { // 右滑
					this.currentIndex = Math.max(0, this.currentIndex - 1)
				} else if (deltaX < -60) { // 左滑
					this.currentIndex = Math.min(this.questions.length - 1, this.currentIndex + 1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./questionAnswer.scss";
</style>