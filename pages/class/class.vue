<template>
	<view class="class-container">
		<u-row>
			<u-col span="4">
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
			</u-col>
			<u-col span="8">
				<view class="test">
					qwewqe
				</view>
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
				activeCategory: '',
				show: false
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
				console.log(id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.left-list {
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
	
</style>
