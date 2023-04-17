<template>
	<view class="question-container">
		<view class="top-btn">
			<u-search placeholder="请输入搜索内容" v-model="keyword" :showAction="false"></u-search>
			<view class="btn">
				<uni-icons type="tune-filled" size="30" @click="onHandleOpenPopup"></uni-icons>
			</view>
			<view class="btn">
				<uni-icons custom-prefix="iconfont" type="icon-zuotijilu" size="30"
					@click="onHandleGoToQuestionHistory"></uni-icons>
			</view>
		</view>
		<view class="category">
			<view class="title">专项练习</view>
			<view class="list-container">
				<view class="item" v-for="item in categoryList" :key="item.id"
					@click="onHandleGoToQuestionList(item.id)">
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
		<view class="popup-container">
			<u-popup :show="show" closeable @close="onHandleClosePopup">
				<view class="pop-content">
					<view class="title">刷题设置</view>
					<view class="count">
						<view class="count-title">
							单次出题数
						</view>
						<view class="count-content">
							<view class="count-item" :class="{active:item===userSet.question_count}"
								v-for="(item,index) in questionCount" :key="index" @click="onHandleChangeCount(item)">
								{{item}}
							</view>
						</view>
					</view>
					<view class="count">
						<view class="count-title">
							出题来源
						</view>
						<view class="count-content">
							<view class="count-item" :class="{active:item.value===userSet.question_type}"
								v-for="item in questionType" :key="item.value" @click="onHandleChangeType(item.value)">
								{{item.key}}
							</view>
						</view>
					</view>
					<view class="count">
						<view class="count-title">
							题目难度
						</view>
						<view class="count-content">
							<view class="count-item" :class="{active:item.value===userSet.level}"
								v-for="item in questionLevel" :key="item.value"
								@click="onHandleChangeLevel(item.value)">
								{{item.key}}
							</view>
						</view>
					</view>
					<view class="button">
						<u-button type="primary" text="确定" @click="onHandleSubmitUserSet"></u-button>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import questionApi from "@/api/question/question.js"
	import userApi from "@/api/user/user.js"
	import {
		onLoad
	} from "../../uni_modules/uview-ui/libs/mixin/mixin";


	export default {
		data() {
			return {
				keyword: '',
				categoryList: [],
				show: false, // 展示修改刷题设置
				userSet: {}, // 用户设置
				questionCount: [10, 15, 20, 25],
				questionType: [{
					key: '只出新题',
					value: 1
				}, {
					key: '只出错题',
					value: 2
				}, {
					key: '错题+新题',
					value: 3
				}, {
					key: '不限制',
					value: 4
				}],
				questionLevel: [{
					key: '简单',
					value: 0
				}, {
					key: '中等',
					value: 1
				}, {
					key: '困难',
					value: 2
				}, {
					key: '不限制',
					value: 3
				}],
			}
		},
		async onLoad() {
			await this.getCategoryList();
			await this.getUserSetInfo();
		},
		methods: {
			async getUserSetInfo() {
				const res = await userApi.getUserSetInfo();

				this.userSet = res.data;
			},
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
				uni.navigateTo({
					url: '/pages/question/questionAnswer/questionAnswer?category=' + category
				})
			},
			/**
			 * 弹出设置框
			 */
			onHandleOpenPopup() {
				this.show = true
			},
			async onHandleClosePopup() {
				this.show = false
			},
			/**
			 * 修改出题数量
			 * @param {Object} count
			 */
			onHandleChangeCount(count) {
				this.userSet.question_count = count
			},
			/**
			 * 修改出题种类
			 * @param {Object} type
			 */
			onHandleChangeType(type) {
				this.userSet.question_type = type
			},
			/**
			 * 修改出题难度
			 * @param {Object} level
			 */
			onHandleChangeLevel(level) {
				this.userSet.level = level
			},
			/**
			 * 提交修改用户出题设置
			 */
			async onHandleSubmitUserSet() {
				// 修改
				const res = await userApi.updateUserSetInfo(this.userSet);

				if (res.code === 1) {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
				}

				// 关闭弹窗
				this.onHandleClosePopup();
				await this.getUserSetInfo()

			},
			/**
			 * 前往历史记录页
			 */
			onHandleGoToQuestionHistory() {
				uni.navigateTo({
					url: '/pages/QuestionRecordHistory/QuestionRecordHistory'
				})
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

			.list-container {
				margin-top: 20px;

				.item {
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

					.question-title {
						color: rgba(16, 16, 16, 100);
						height: 30px;
						line-height: 30px;
						font-size: 14px;
						overflow: hidden;
					}

					.count {
						color: #453838b5;
						height: 25px;
						line-height: 25px;
						font-size: 12px;
					}

					.right {
						height: 55px;
						line-height: 55px;
					}
				}
			}
		}

		.popup-container {
			.pop-content {
				position: relative;
				height: 900rpx;
				padding: 10px;

				.title {
					text-align: center;
					font-size: 18px;
					font-weight: 700;
					margin-bottom: 20px;
				}

				.count {
					margin: 20px 0;

					.count-title {
						margin-bottom: 20px;
						font-weight: 600;
					}

					.count-content {
						display: flex;

						.count-item {
							width: 25%;
							margin: 0 10rpx;
							padding: 5px 0px;
							text-align: center;
							background-color: #80808033;
							border-radius: 10rpx;
							border: 1px solid transparent;

							&.active {
								border: 1px solid $primary;
								background-color: #55aaff42;
								color: $primary;
							}
						}
					}
				}

				.button {
					position: absolute;
					bottom: 20px;
					width: 80%;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
</style>