<template>
	<view class="me-container">
		<div class="top">
			<div class="set">
				<uni-icons custom-prefix="iconfont" type="icon-shezhi" size="35"></uni-icons>
			</div>
			<div class="user-info">
				<u-row>
					<u-col span="4">
						<view class="avatar">
							<u-avatar :src="getUser.avatar" size="80"></u-avatar>
						</view>
					</u-col>
					<u-col span="6">
						<view>{{getUser.nickName}}</view>
					</u-col>
				</u-row>
			</div>
		</div>

		<div class="bottom">
			<view class="content">
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-lishijilu" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">学习记录</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-shoucang" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">收藏</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-cuotiben" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">错题本</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-a-bijibenbiji" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">笔记</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-yijianfankui" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">意见反馈</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink>
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-tuichudenglu" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">退出登录</view>
					</view>
				</u-cell>
			</view>
		</div>
	</view>
</template>

<script>
	import userApi from "@/api/user/user.js"

	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		async created() {
			await userApi.getUserInfo()
		},
		computed: {
			getUser() {
				return this.$store.getters.getUser;
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.top{
		margin-bottom: 40px;
		.set{
			height: 50px;
			text-align: right;
			padding: 10px;
		}
		
		.user-info{
			.avatar{
				margin-left: 30px;
				vertical-align: top;
			}
			.name{
				overflow: hidden;
			}
		}
	}
	
	.content{
		.u-slot-icon{
			margin-right: 20rpx;
			font-weight: 600;
		}
		.u-slot-title{
			font-size: 16px;
			font-weight: 600;
		}
	}

</style>
