<template>
	<view class="set-container">
		<u-cell-group>
			<u-cell isLink @click="onHandleSetAvatar">
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">头像</text>
				</view>
				<view slot="value" class="u-slot-title">
					<u-avatar :src="config.baseUrl+userInfo.avatar" size="80"></u-avatar>
				</view>
			</u-cell>
				<u-cell isLink center @click="onHandleSetName" size="large">
					<view slot="title" class="u-slot-title">
						<text class="u-cell-text">昵称</text>
					</view>
					<view slot="value" class="u-slot-title">
						{{userInfo.nick_name}}
					</view>
				</u-cell>
				<u-cell isLink center @click="onHandleSetGender" size="large">
					<view slot="title" class="u-slot-title">
						<text class="u-cell-text">性别</text>
					</view>
					<view slot="value" class="u-slot-title">
						<text>{{getGender(userInfo.gender)}}</text>
					</view>
				</u-cell>

			<!-- 			<u-cell isLink center class="item" @click="onHandleSetQuestion">
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">一次出题数量</text>
				</view>
				<view slot="value" class="u-slot-title">
					<text>{{userInfo.question_count}}</text>
				</view>
			</u-cell> -->
		</u-cell-group>
	</view>
</template>

<script>
	import upload from "@/api/upload.js"
	import userApi from "@/api/user/user.js"
	import config from "@/common/config.js"

	export default {
		data() {
			return {
				config
			};
		},
		computed: {
			userInfo() {
				if (this.$store.getters.getUser) {
					return this.$store.getters.getUser;
				} else {
					return {}
				}

			},
			getGender(gender) {
				return gender => {
					switch (gender) {
						case 1:
							return '男';
						case 2:
							return '女'
						default:
							return '未知'
					}
				}
			}
		},
		methods: {
			/**
			 * 修改昵称
			 */
			onHandleSetName() {
				//  参数
				const query = `?name=${this.userInfo.nick_name}`

				uni.navigateTo({
					url: '/pages/set/userNameSet/userNameSet' + query
				})
			},
			/**
			 * 修改性别
			 */
			onHandleSetGender() {
				//  参数
				const query = `?gender=${this.userInfo.gender}`

				uni.navigateTo({
					url: '/pages/set/userGenderSet/userGenderSet' + query
				})
			},
			/**
			 * 出题个数设置
			 */
			onHandleSetQuestion() {
				//  参数
				const query = `?count=${this.userInfo.question_count}`

				uni.navigateTo({
					url: '/pages/set/userQuestionSet/userQuestionSet' + query
				})
			},
			/**
			 * 修改头像
			 */
			async onHandleSetAvatar() {
				const res = await upload();
				if (res.code === 0) {

					// 文件上传成功
					const userUpdateInfo = await userApi.updateUserInfo({
						avatar: res.data.url
					})

					if (userUpdateInfo.code === 0) {
						// 成功后清空存储的用户信息
						this.$store.dispatch('clearUserInfo');

						//  重新获取数据
						const res = await userApi.getUserInfo()
						this.$store.dispatch('updateUserInfo', JSON.stringify(res.data))
					} else {
						uni.showToast({
							title: res.msg,
							duration: 1000,
							icon: "error"
						});
					}


				} else {
					uni.showToast({
						title: res.msg,
						duration: 1000,
						icon: "error"
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>