<template>
	<view class="comment-container">
		<view class="user-info">
			<u-avatar class="avatar" size="35" :src="commentData.avatar"></u-avatar>
			<view class="user">
				<view class="name">
					{{commentData.nick_name}}
				</view>
				<view class="date">
					{commentData.create_time}
				</view>
			</view>
		</view>
		<view class="content">
			{{commentData.content}}
		</view>
		<view class="response-button" @click="onHandleResponseComment">
			回复
		</view>
		<view class="response">
			<view class="item" v-for="item in commentData.response" :key="item.id">
				<text class="name">{{item.nick_name}}</text>
				<text>{{item.content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Comment",
		props: ['commentData'],
		data() {
			return {

			};
		},
		methods: {
			/**
			 * 回复评论
			 */
			onHandleResponseComment() {
				console.log('回复评论');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-container {
		.user-info {
			display: flex;

			.user {
				margin-left: 20rpx;
				font-size: 12px;
				color: #737373;

				.name {
					padding-bottom: 5px;
				}
			}
		}

		.content {
			margin-top: 20rpx;
			margin-left: 45px;
			font-size: 14px;
		}
		
		.response-button{
			padding-right: 20rpx;
			text-align: right;
			color: #1684FC;
			font-size: 14px;
		}

		.response {
			padding: 20rpx;
			background-color: #73737363;
			margin-top: 20rpx;
			margin-left: 45px;
			font-size: 14px;

			.name {
				color: #1684FC;
			}
		}
	}
</style>