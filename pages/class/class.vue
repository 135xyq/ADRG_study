<template>
	<view class="class-container">
		<view class="left-list">
			<u-list>
				<u-list-item v-for="(item, index) in listData" :key="item.id">
					<view class="list-item" :class="{active:item.id === activeCategory}"
						@click="onHandleChangeCategory(item.id)">
						{{item.name}}
					</view>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>

		<view class="right-list">
			<scroll-view scroll-y="true" scroll-top="0">
				<u-cell :titleStyle="{fontSize:'18px',fontWeight:'bolder'}" title="精选视频" :isLink="true" value="更多"
					@click="onHandleGoToMoreVideo" arrow-direction="right"></u-cell>
				<view class="video-list-container" v-if="videoList.length > 0">
					<view class="" v-for="item in videoList" :key="item.id" @click="onHandleToVideoDetail(item.id)">
						<MyVideo :videoData="item"></MyVideo>
					</view>
				</view>
				<view v-else>
					<u-empty mode="list" text="暂无视频">
					</u-empty>
				</view>
				<u-cell :titleStyle="{fontSize:'18px',fontWeight:'bolder'}" title="精选文章" :isLink="true" value="更多" @click="onHandleGoToMoreArticle"
					arrow-direction="right"></u-cell>
				<view class="video-list-container" v-if="articleList.length > 0">
					<view class="" v-for="item in articleList" :key="item.id" @click="onHandleToArticleDetail(item.id)">
						<MyArticle :articleData="item"></MyArticle>
					</view>
				</view>
				<view v-else>
					<u-empty mode="list"  text="暂无文章">
					</u-empty>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import studySourceApi from "@/api/studySource/category.js"
	export default {
		data() {
			return {
				listData: [],
				activeCategory: '',
				show: false,
				videoList:[],
				articleList:[]
			};
		},
		computed: {
			// 获取对应分类下的视频
			getVideoData() {
				if (this.activeCategory !== '') {
					const video = this.listData.filter(item => item.id === this.activeCategory);
					return video[0].video;
				}
				return []

			},

			// 获取对应分类下的视频
			getArticleData() {
				if (this.activeCategory !== '') {
					const article = this.listData.filter(item => item.id === this.activeCategory);
					return article[0].article;
				}
				return []

			}
		},
		async created() {
			await this.getCategoryList()
		},
		methods: {
			/**
			 * 获取分类列表
			 */
			async getCategoryList() {
				const res = await studySourceApi.getStudyCategoryList()
				this.listData = res.data.data
				
				// 默认展示第一个
				if(this.listData.length > 0) {
					this.activeCategory = this.listData[0].id
					
					// 获取第一个分类的数据
					await this.getSourceList()
				}
			},
			/**
			 * 根据资源分类获取封面资源
			 */
			async getSourceList() {
				const res = await studySourceApi.getSources({category:this.activeCategory});
				
				// 为视频列表和文章列表赋值
				this.videoList = res.data.video
				this.articleList = res.data.article
				
			},
			/**
			 * 切换分类，重新获取资源
			 * @param {Object} id
			 */
			async onHandleChangeCategory(id) {
				this.activeCategory = id
				// console.log(id);
				
				// 重新获取资源
				await this.getSourceList()
			},
			/**
			 * 跳转到视频列表页
			 */
			onHandleGoToMoreVideo() {
				// 携带数据为分类id
				uni.navigateTo({
					url: '/pages/class/videoList/videoList?id=' + this.activeCategory
				})
				
			},
			/**
			 * 跳转到文章列表页
			 */
			onHandleGoToMoreArticle() {
				// 携带数据为分类id
				uni.navigateTo({
					url: '/pages/class/articleList/articleList?id=' + this.activeCategory
				})
			},
			/**
			 * 跳转到视频播放页
			 */
			onHandleToVideoDetail(id) {
				// 携带数据为视频id
				uni.navigateTo({
					url: '/pages/class/videoplay/videoplay?id=' + id
				})
			},
			/**
			 * 跳转到文章阅读页
			 * @param {Object} id
			 */
			onHandleToArticleDetail(id) {
				// 携带数据为视频id
				uni.navigateTo({
					url: '/pages/class/articleread/articleread?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class-container {
		position: relative;
		width: 100%;
	}

	.left-list {
		position: fixed;
		// top: 0;
		width: 35%;
		overflow: hidden;
		background-color: $gray_background;

		.list-item {
			color: $black;
			height: 100rpx;
			line-height: 100rpx;
			padding: 2px 10px;
			overflow: hidden;
			border-left: 3px solid transparent;

			&.active {
				background-color: $white;
				color: $primary;
				border-left: 3px solid $primary;
			}
		}
	}

	.right-list {
		width: 65%;
		// background-color: red;
		color: $gray;
		position: absolute;
		left: 35%;
		padding-bottom: 50px;
	}
</style>
