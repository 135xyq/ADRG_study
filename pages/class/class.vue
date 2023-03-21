<template>
	<view class="class-container">
		<u-row>
			<u-col span="4">
				<view class="left-list">
					<!-- 					<ul>
						<li v-for="item  in listData" :key="item.id" class="list-item"
							:class="{active:item.id === activeCategory}" @click="onHandleChangeCategory(item.id)">
							{{item.name}}
						</li>
					</ul> -->

					<u-list @scrolltolower="scrolltolower">
						<u-list-item v-for="(item, index) in listData" :key="index" class="list-item"
							:class="{active:item.id===activeCategory}" @click.native="onHandleChangeCategory(item.id)">
							{{item.name}}
						</u-list-item>
					</u-list>
				</view>
			</u-col>
			<u-col span="8">
				<view class="right-data"><u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss"></u-count-down></view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import api from "@/api/studySource/category.js"
	export default {
		data() {
			return {
				listData: [],
				activeCategory: ''
			};
		},
		async created() {
			await this.getCategoryList()
		},
		methods: {
			/**
			 * 获取分类列表
			 */
			async getCategoryList() {
				const res = await api.getCategoryList()
				this.listData = res.data.data
				this.activeCategory = this.listData[0].id

			},
			/**
			 * 切换分类
			 * @param {Object} id
			 */
			onHandleChangeCategory(id) {
				this.activeCategory = id
			}
		}
	}
</script>

<style lang="less" scoped>
	.left-list {
		background-color: @gray_background;

		.list-item {
			color: @black;
			height: 100rpx;
			line-height: 100rpx;
			padding: 2px 10px;
			overflow: hidden;

			&.active {
				background-color: @white;
				color: @primary;
				border-left: 3px solid @primary;
			}
		}
	}
</style>
