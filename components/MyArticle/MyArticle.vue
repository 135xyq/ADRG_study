<template>
	<view class="article-container">
		<uni-card :title="articleData.title" spacing="5px" margin="2px" padding="0" :thumbnail="config.baseUrl+articleData.thumbnail_url">
			<view class="bottom-info">
				<view class="title">
					<text>{{articleData.description ? articleData.description :'暂无文章的描述信息'}}</text>
				</view>
				<view class="info">
					<view class="left">
						{{articleData.create_time.split(' ')[0]}}
					</view>
					<view class="right">
						<view class="eye item">
							<uni-icons custom-prefix="iconfont" type="icon-eye" size="12" color="gray"></uni-icons>
							<text>{{articleData.view_count}}</text>
						</view>
						<view class="dianzan item">
							<uni-icons custom-prefix="iconfont" type="icon-dianzan" size="12" color="gray"></uni-icons>
							<text>{{articleData.like_count}}</text>
						</view>
						<view class="pinglun item">
							<uni-icons custom-prefix="iconfont" type="icon-pinglun" size="12" color="gray"></uni-icons>
							<text>{{articleData.comment_count}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import config from "@/common/config.js"
	
	export default {
		name: "MyArticle",
		props: ['articleData'],
		data() {
			return {
				config
			};
		}
	}
</script>

<style lang="scss" scoped>
	.article-container {
		width: 100%;
		.img{
			width: 100%;
			height: 300rpx;
		}
		.bottom-info {
			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3; //行数
				-webkit-box-orient: vertical;
			}

			.info {
				display: flex;
				justify-content: space-between;
				.left{
					font-size: 12px;
					color: $gray;
				}
				.right{
					display: flex;
					.item{
						font-size: 12px;
						color: $gray;
						margin: 0 3px;
						text{
							margin-left: 2px;
						}
					}
				}
			}
		}
	}
</style>
