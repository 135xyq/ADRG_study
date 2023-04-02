<template>
	<view>
		<view class="video-container">
			<video id="myVideo" class="video" :src="config.baseUrl + videoData.url" :title="videoData.title"
				:direction="90" :show-mute-btn="true" :enable-play-gesture="true" :vslide-gesture="true"
				object-fit="cover" :poster="videoData.thumbnail_url"></video>
		</view>
		<view class="video-info">
			<u-collapse :border="false">
				<u-collapse-item class="title" :title="videoData.title" value="简介">
					<text class="description">{{videoData.description ? videoData.description: '暂无简介'}}</text>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="user-do-info">
			<view class="view-count">
				{{videoData.view_count}}次播放
			</view>
			<view class="right">
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
</template>

<script>
	import videoApi from "@/api/video/video.js"
	import config from "@/common/config.js"


	export default {
		data() {
			return {
				id: '', // 视频id
				config,
				videoData: {}, // 视频详情
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		async onLoad(option) {
			// 获取视频id
			this.id = option.id

			// 如果没有id则跳转回原页面
			if (this.id) {
				await this.getVideoDetail()

				console.log(this.videoData);
			} else {
				uni.navigateBack();
			}
		},
		methods: {
			/**
			 * 获取视频详情
			 */
			async getVideoDetail() {
				const res = await videoApi.getVideoDetail({
					id: this.id
				});

				this.videoData = {
					...res.data
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		width: 100%;
		height: 400rpx;

		.video {
			width: 100%;
			height: 100%;
		}
	}

	.video-info {
		margin: 10px 5px;

		.title {
			font-size: 18px;
			font-weight: 600;
		}

		.description {
			font-size: 14px;
			font-weight: normal;
		}
	}
	
	.user-do-info{
		display: flex;
		justify-content: space-between;
		.right{
			display: flex;
			justify-content: left;
		}
	}
</style>