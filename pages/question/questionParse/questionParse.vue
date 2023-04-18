<template>
	<view class="container">
		<view class="record-info">
			<view class="record-title">试卷测试</view>
			<view class="question-number">
				第2题
			</view>
		</view>
		<view class="question-info">
			<view class="question-type-level">
				<view class="tag-item">
					<u-tag :text="questionLevel[1].key" plain :type="questionLevel[1].type"></u-tag>
				</view>
				<view class="tag-item">
					<u-tag :text="questionType[2].key" :type="questionType[2].type" class="tag-item"></u-tag>
				</view>
			</view>
			<view class="question">
				<view class="question-title">
					DHTML的优点是什么？
				</view>
				<view class="has-option">
					<view class="options">
						<view class="option right">
							A. 动态样式
						</view>
						<view class="option">
							B. 动态样式
						</view>
						<view class="option error">
							C. 动态样式
						</view>
						<view class="option">
							D. 动态样式
						</view>
					</view>
					<view class="answer-info">
						<view class="right-answer answer">
							正确答案：A
						</view>
						<view class="user-answer  answer">
							你的答案：C
						</view>
					</view>
				</view>
				<view class="no-option">
					<view class="answer-info">
						<view class="right-answer answer">
							<view class="answer-title">正确答案：</view>
							<view class="answer-content">测试网全国人不太 进入前往后台为u途虎体温枪图画图为何 u委托函</view>
						</view>
						<view class="user-answer  answer">
							<view class="answer-title">你的答案：</view>
							<view class="answer-content">测试网全国人不太 进入前往后台为u途虎体温枪图画图为何 u委托函</view>
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
				解析内容呀哈哈哈
			</view>
		</view>
	</view>
</template>

<script>
	import {
		questionLevel,
		questionType
	} from "@/utils/question.js"

	export default {
		data() {
			return {
				questionLevel,
				questionType
			};
		},
		onLoad(options) {
			console.log(options);
		}
	}
</script>

<style lang="scss">
	@import "./questionParse.scss";
</style>