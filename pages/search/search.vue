<template>
	<view class="container">
		<view class="search" bgColor="#fff">
			<u-search placeholder="请输入要搜索的内容" v-model="keyword" :clearabled="true" @custom="onHandleUserSearch"
				@search="onHandleUserSearch" @change="onHandleSearchDataChange"></u-search>
		</view>
		<view class="type-container" v-if="isHasSubmitSearch">
			<u-sticky><u-subsection :list="list" bgColor="#fff" fontSize="14" mode="button" :current="current"
					@change="sectionChange"></u-subsection></u-sticky>
			<view class="content">
				<view class="data-item" v-for="item in searchData" :key="item.id"
					@click="onHandleGoToDetailPage(item.id)">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="no-search" v-if="!isHasSubmitSearch">
			<view class="">
				请输入要查询的内容来获取信息
			</view>
			<view class="">
				支持查询文章、视频、题目信息
			</view>
		</view>
		<view class="bottom-container" v-if="isHasSubmitSearch && keyword.trim()!==''">
			<u-loadmore :status="loadStatus" height="50" :line="true" :nomoreText="'没有更多关于' + keyword + '的信息了'" />
		</view>
	</view>
</template>

<script>
	import searchApi from '@/api/search/search.js'
	import {
		onLoad
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';

	export default {
		data() {
			return {
				keyword: '', // 查询输入的内容
				current: 0, // 分段器当前的下标
				list: ['文章', '视频', '题目'],
				listValue: ['article', 'video', 'question'],
				pageInfo: {
					page: 1,
					limit: 20,
					total: 0
				},
				loadStatus: 'loading', // 加载更多的状态
				scrollTop: 0,
				searchData: [], // 查询得到的数据
				isHasSubmitSearch: false, // 是否提交了查询信息
				loading: false, // 数据加载中
			};
		},
		/**
		 * 页面到底底部事件
		 */
		async onReachBottom() {
			// 没有数据了
			if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
				this.loadStatus = 'nomore'
			} else {
				// 每次请求下一页
				this.pageInfo.page++;
				await this.getSearchData()
			}
		},
		methods: {
			/**
			 * 获取查询的数据
			 */
			async getSearchData() {
				const res = await searchApi.getSearchDataPage({
					type: this.listValue[this.current],
					content: this.keyword,
					page: this.pageInfo.page,
					limit: this.pageInfo.limit
				})

				this.pageInfo.total = res.data.total;
				this.searchData = [...this.searchData, ...res.data.data]

				// 没有数据了
				if (this.pageInfo.page * this.pageInfo.limit >= this.pageInfo.total) {
					this.loadStatus = 'nomore'
				}
			},
			/**
			 * 切换类型
			 * @param {Object} index
			 */
			async sectionChange(index) {
				this.current = index

				//  数据重置
				this.pageInfo = {
					page: 1,
					limit: 20,
					total: 0
				}
				this.searchData = []

				// 获取数据
				await this.getSearchData()
			},
			/**
			 * 用户搜索
			 */
			async onHandleUserSearch() {
				// 正在请求数据时不能重复请求查询
				if (this.loading) {
					return
				}
				// console.log(this.keyword.trim(),this.keyword);

				// 不能为空
				if (this.keyword.trim() == '') {
					uni.showToast({
						title: '请输入要搜索的内容',
						icon: 'none'
					})
					return;
				}

				// 正在搜索中
				this.isHasSubmitSearch = true

				//  数据重置
				this.pageInfo = {
					page: 1,
					limit: 20,
					total: 0
				}
				this.searchData = []

				this.loading = true

				// 请求数据
				await this.getSearchData();

				this.loading = false
			},
			/**
			 * 监听输入框数据变化
			 */
			onHandleSearchDataChange() {
				// console.log(this.keyword);

				if (this.keyword.trim() === '') {
					this.isHasSubmitSearch = false
				}
			},
			/**
			 * 前往指定页面，查看详情
			 * @param {Object} id
			 */
			onHandleGoToDetailPage(id) {
				const type = this.listValue[this.current];

				// 文章
				if (type === 'article') {
					uni.navigateTo({
						url: '/pages/class/articleread/articleread?id=' + id
					})
				} else if (type === 'video') {
					// 视频

					uni.navigateTo({
						url: '/pages/class/videoplay/videoplay?id=' + id
					})
				} else if (type === 'question') {
					// 题目

					uni.navigateTo({
						url: '/pages/question/questionDetail/questionDetail?id=' + id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.search {
			width: 90%;
			margin: 10px auto;
			background-color: #fff;
			margin-bottom: 20px;
		}

		.type-container {
			.content {
				padding: 10px 10px;

				.data-item {
					height: 40px;
					line-height: 40px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 16px;
					background-color: #312f2f0a;
					margin-bottom: 15px;
					padding: 2px 10px;
					padding-left: 15px;
					border-radius: 5px;
					box-shadow: 2px 4px 3px #ccc;
				}
			}
		}

		.no-result {
			text-align: center;
			margin: 20px 0;
		}

		.no-search {
			margin-top: 20px;
			padding: 5px 10px;
			color: #060606b3;
			text-align: center;
		}
	}
</style>