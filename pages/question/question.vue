<template>
	<view class="question-container">
		<view class="top-btn">
			<u-search placeholder="请输入搜索内容" v-model="keyword" :showAction="false"></u-search>
			<view class="btn">
				<uni-icons type="tune-filled" size="30"></uni-icons>
			</view>
			<view class="btn">
				<uni-icons custom-prefix="iconfont" type="icon-lishijilu" size="30"></uni-icons>
			</view>
		</view>
		<view class="category">
			<view class="title">专项练习</view>
			<view class="list-container">
				<view class="item" v-for="item in categoryList" :key="item.id" @click="onHandleGoToQuestionList(item.id)">
					<view class="left">
						<view class="question-title">{{item.title}}</view>
						<view class="count">
							共{{item.question_count}}题 | 已练习{{item.reslove_count}}题
						</view>
					</view>
					<view class="right">
						<uni-icons custom-prefix="iconfont" type="icon-gengduo" size="25"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js"
import { onLoad } from "../../uni_modules/uview-ui/libs/mixin/mixin";
	
	export default {
		data() {
			return {
				keyword: '',
				categoryList:[],
			}
		},
		async onLoad() {
			await this.getCategoryList();
		},
		methods: {
			/**
			 * 获取分类列表
			 */
			async getCategoryList() {
				const res = await questionApi.getQuestionCategoryList();
				this.categoryList = res.data.data;
			},
			/**
			 * 前往出题页
			 * @param {Object} category
			 */
			onHandleGoToQuestionList(category) {
				console.log(category);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.question-container {
		.top-btn {
			margin-top: 10px;
			margin-left: 10px;
			display: flex;

			.btn {
				margin: 0 10rpx;
			}
		}

		.category {
			margin-top: 20px;

			.title {
				padding-left: 10rpx;
				font-weight: 600;
				font-size: 16px;
			}
			
			.list-container{
				margin-top: 20px;
				.item{
					width: 85%;
					height: 55px;
					border-radius: 10px;
					margin: auto;
					margin-bottom: 20px;
					padding: 10px;
					display: flex;
					justify-content: space-between;
					box-shadow: 3px 3px 8px gray;
					background-color: #a095950f;
					
					.question-title{
						color: rgba(16, 16, 16, 100);
						height: 30px;
						line-height: 30px;
						font-size: 14px;
						overflow: hidden;
					}
					.count{
						color: #453838b5;
						height: 25px;
						line-height:25px;
						font-size: 12px;
					}
					
					.right{
						height: 55px;
						line-height: 55px;
					}
				}
			}
		}
	}
</style>