<template>
	<view class="video-container">
		<uni-card spacing="5px" margin="2px" padding="0">
			<image mode="aspectFill" class="img" :src="videoData.thumbnail_url"></image>
			<view class="bottom-info">
				<view class="title">
					<text>{{videoData.description ? videoData.description : '暂无视频介绍信息'}}</text>
				</view>
				<view class="info">
					<view class="left">
						{{videoData.create_time.split(' ')[0]}}
					</view>
					<view class="right">
						<view class="eye item">
							<uni-icons custom-prefix="iconfont" type="icon-eye" size="12" color="gray"></uni-icons>
							<text>{{videoData.view_count}}</text>
						</view>
						<view class="dianzan item">
							<uni-icons custom-prefix="iconfont" type="icon-dianzan" size="12" color="gray"></uni-icons>
							<text>{{videoData.like_count}}</text>
						</view>
						<view class="pinglun item">
							<uni-icons custom-prefix="iconfont" type="icon-pinglun" size="12" color="gray"></uni-icons>
							<text>{{videoData.comment_count}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "MyVideo",
		props: ['videoData'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
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
				-webkit-line-clamp: 2; //行数
				-webkit-box-orient: vertical;
				color: $black;
				height: 40px;
			}

			.info {
				// display: flex;
				// justify-content: space-between;
				.left{
					font-size: 12px;
					color: $gray;
				}
				.right{
					display: flex;
					justify-content: right;
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
