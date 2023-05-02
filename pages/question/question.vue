<template>
	<view class="question-container">
		<view class="top-btn">
			<u-search placeholder="请输入搜索内容" :disabled="true" v-model="keyword" :showAction="false" @click="onHandleGoToSearch"></u-search>
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
			async onHandleGoToQuestionList(category) {
				const res = await questionApi.isHasQuestion({category:category});
				
				if(res.code === 0) {
					// 无法组卷
					if(res.data.flag === false) {
						uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration:2000
						})
					}else{
						uni.navigateTo({
							url: '/pages/question/questionAnswer/questionAnswer?category=' + category
						})
					}
				}
				
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
			},
			/**
			 * 前往搜索页
			 */
			onHandleGoToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./question.scss";
</style>