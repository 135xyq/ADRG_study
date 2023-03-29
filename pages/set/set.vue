<template>
	<view class="set-container">
		<u-cell-group>
			<u-cell isLink>
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">头像</text>
				</view>
				<view slot="value" class="u-slot-title">
					<u-avatar :src="userInfo.avatar" size="80"></u-avatar>
				</view>
			</u-cell>
			<u-cell isLink center class="item" @click="onHandleSetName">
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">昵称</text>
				</view>
				<view slot="value" class="u-slot-title">
					{{userInfo.nickName}}
				</view>
			</u-cell>
			<u-cell isLink center class="item" @click="onHandleSetGender">
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">性别</text>
				</view>
				<view slot="value" class="u-slot-title">
					<text>{{getGender(userInfo.gender)}}</text>
				</view>
			</u-cell>
			<u-cell isLink center class="item">
				<view slot="title" class="u-slot-title">
					<text class="u-cell-text">一次出题数量</text>
				</view>
				<view slot="value" class="u-slot-title">
					<text>{{10}}</text>
				</view>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			userInfo() {
				return this.$store.getters.getUser;
			},
			getGender(gender) {
				return gender=>{
					switch(gender) {
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
		methods:{
			/**
			 * 修改昵称
			 */
			onHandleSetName() {
				//  参数
				const query = `?name=${this.userInfo.nickName}`
				
				uni.navigateTo({
					url:'/pages/set/userNameSet/userNameSet' + query
				})
			},
			/**
			 * 修改性别
			 */
			onHandleSetGender() {
				//  参数
				const query = `?gender=${this.userInfo.gender}`
				
				uni.navigateTo({
					url:'/pages/set/userGenderSet/userGenderSet' + query
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-container {
		.item {
			line-height: 50px;
		}
	}
</style>
