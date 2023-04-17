<template>
	<view class="container">
		<view class="record-info">
			<view class="top-title">
				<view class="top">
					<view class="name">
						试卷名称
					</view>
					<view class="time">
						10:20:00
					</view>
				</view>
				<view class="title">
					专项练习
				</view>

				<view class="true">
					<!-- <MyProgress :percent="60" label="测试"></MyProgress> -->
					<MyProgress :progress="30.12" :diameter="200"></MyProgress>
				</view>
			</view>
		</view>
		<view class="question-info">
			<view class="title">作答情况</view>
			<view class="count-info">
				<view class="count-info-item">
					<view class="count">5</view>
					<view class="text">共计</view>
				</view>
				<view class="count-info-item">
					<view class="count right">2</view>
					<view class="text">答对</view>
				</view>
				<view class="count-info-item">
					<view class="count error">1</view>
					<view class="text">答错</view>
				</view>
				<view class="count-info-item">
					<view class="count">2</view>
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
				<view class="item" v-for="(index,item) in total"
					 :key="item">
					{{item + 1}}
				</view>
			</view>
		</view>
		
		<view class="botttom-info">
			<view class="btn">
				<u-button shape="circle" text="全部解析"></u-button>
			</view>
			<view class="btn">
				<u-button type="primary" shape="circle" text="错题解析"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	
	import questionApi from "@/api/question/question.js"
	export default {
		data() {
			return {
				record:'' ,// 试卷id
				total:10 , // 题目数量
				recordInfo:{} ,// 试卷信息
				questionList:[] ,// 试卷列表
			};
		},
		async onLoad(option) {
			if(option.record) {
				this.record = option.record;
				
				// await this.getValidateResult();
			}else{
				uni.navigateBack();
			}
		},
		methods: {
			/**
			 * 获取做题报告
			 */
			async getValidateResult() {
				const res = await questionApi.getQuestionRecordValidateResult({
					record:this.record
				})
				
				if(res.code === 0) {
					this.total = res.data.total;
					this.recordInfo = res.data.record;
					this.questionList = res.data.data
				}
				
				console.log(this.total,this.recordInfo,this.questionList);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./questionResult.scss";

</style>
