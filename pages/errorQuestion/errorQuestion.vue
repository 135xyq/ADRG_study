<template>
	<view class="error-question-container">
		<view class="container" v-if="categoryCountList.length > 0">
			<view class="item" v-for="item in categoryCountList" :key="item.id">
				<view class="left">
					<view class="title">{{item.title}}</view>
					<view class="count">{{item.errorQuestionCount}}题</view>
				</view>
				<view class="detail" @click="onHandleGoToErrorDetailPage">查看</view>
			</view>
		</view>
		<view class="no" v-else>
			<u-empty mode="list" text="暂无错题,请先去练习吧"></u-empty>
		</view>
		<view class="btn">
			<view class="">
				<u-button type="primary" @click="onHandleGoToQuestionPage"  text="继续做题"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js"

	export default {
		data() {
			return {
				categoryCountList: [], // 分类列表
			};
		},
		async onLoad() {
			await this.getQuestionCategory();
		},
		methods: {
			/**
			 * 获取用户每一种分类错题的数量
			 */
			async getQuestionCategory() {
				const res = await questionApi.getQuestionCategoryCount();

				if (res.code === 0) {
					this.categoryCountList = res.data
				}
			},
			// 前往题库
			onHandleGoToQuestionPage() {
				uni.switchTab({
					url:'/pages/question/question'
				})
			},
			// 前往错题详情页
			onHandleGoToErrorDetailPage() {
				
			}
		}
	}
</script>

<style lang="scss">
	.error-question-container {
		.container {
			.item {
				margin: 10px 0;
				background-color: #d2d2d240;
				padding: 10px;
				width: 90%;
				margin: 10px auto;
				border-radius: 10px;
				height: 30px;
				display: flex;
				justify-content: space-between;
				line-height: 30px;
				box-shadow: 2px 4px 2px #4f464673;

				.left {
					display: flex;

					.title {
						padding-left: 10px;
						font-weight: 700;
						font-size: 14px;
						max-width: 70%;
						overflow: hidden;
						color: #000;
					}

					.count {
						margin-left: 10px;
						font-size: 13px;
						color: #828080;
					}
				}

				.detail {
					width: 40px;
					font-size: 13px;
					color: #3c9cff;
					font-weight: 600;
				}

			}
		}
		
		.no{
			margin: 20px 0;
		}
		
		.btn{
			width: 80%;
			margin: 20px auto;
			padding:20px 0;
		}
	}
</style>