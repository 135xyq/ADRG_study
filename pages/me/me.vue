<template>
	<view class="me-container">
		<div class="top">
			<div class="set">
				<uni-icons custom-prefix="iconfont" type="icon-shezhi" size="35" @click="onHandleGoPageUserSet">
				</uni-icons>
			</div>
			<div class="user-info">
				<u-row>
					<u-col span="4">
						<view class="avatar">
							<u-avatar :src="getUser.avatar" size="80"></u-avatar>
						</view>
					</u-col>
					<u-col span="6">
						<view>{{getUser.nick_name}}</view>
					</u-col>
				</u-row>
			</div>
		</div>
		<div class="bottom">
			<view class="content">
				<u-line></u-line>
				<u-cell size="large" isLink @click="onHandleGoPageStudyHistory">
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-lishijilu" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">学习记录</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink @click="onHandleGoPageStar">
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-shoucang" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">收藏</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink @click="onHandleGoPageErroQuestion">
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-cuotiben" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">错题本</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink @click="onHandleGoPageNote">
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-a-bijibenbiji" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">笔记</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink @click="onHandleGoPageFeedBack">
					<view slot="icon" class="u-slot-icon">
						<uni-icons custom-prefix="iconfont" type="icon-yijianfankui" size="25"></uni-icons>
					</view>
					<view slot="title" class="u-slot-title">
						<view class="select-item">意见反馈</view>
					</view>
				</u-cell>
				<u-cell size="large" isLink @click="onHandleLogout">
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
	import loginApi from "@/api/user/login.js"

	export default {
		data() {
			return {}
		},
		computed: {
			getUser() {
				return this.$store.getters.getUser;
			}
		},
		onLoad() {
			if(this.$store.state.token === ''){
				uni.navigateTo({
					url:'/pages/me/login/login'
				})
			}
		},
		methods: {
			/**
			 * 前往用户设置界面
			 */
			onHandleGoPageUserSet() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			},
			/**
			 * 前往学习记录页
			 */
			onHandleGoPageStudyHistory() {
				uni.navigateTo({
					url: '/pages/studyHistory/studyHistory'
				})
			},
			/**
			 * 前往收藏页
			 */
			onHandleGoPageStar() {
				uni.navigateTo({
					url: '/pages/star/star'
				})
			},
			/**
			 * 前往笔记
			 */
			onHandleGoPageNote() {
				uni.navigateTo({
					url: '/pages/note/note'
				})
			},
			/**
			 * 前往错题记录页
			 */
			onHandleGoPageErroQuestion() {
				uni.navigateTo({
					url: '/pages/errorQuestion/errorQuestion'
				})
			},
			/**
			 * 前往意见反馈
			 */
			onHandleGoPageFeedBack() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},
			/**
			 * 退出登录
			 */
			async onHandleLogout() {
				const res = await loginApi.logout();

				if (res.code === 0) {
					this.$store.dispatch('logout');
					uni.navigateTo({
						url: '/pages/me/login/login'
					})
					uni.showToast({
						title: res.msg,
						icon: "success",
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		margin-bottom: 40px;

		.set {
			height: 50px;
			text-align: right;
			padding: 10px;
		}

		.user-info {
			.avatar {
				margin-left: 30px;
				vertical-align: top;
			}

			.name {
				overflow: hidden;
			}
		}
	}

	.content {
		.u-slot-icon {
			margin-right: 20rpx;
			font-weight: 600;
		}

		.u-slot-title {
			font-size: 16px;
			font-weight: 600;
		}
	}
</style>
