<template>
	<view class="user-gender-container">
		<u-radio-group v-model="newGender" placement="column" iconPlacement="right" :borderBottom="true">
			<u-radio activeColor="green" :customStyle="{padding: '20px'}" label="男" :name="1"></u-radio>
			<u-radio activeColor="green" :customStyle="{padding: '20px'}" label="女" :name="2"></u-radio>
		</u-radio-group>
		<view class="button-container">
			<u-button :disabled="newGender === oldGender" :loading="loading" class="button" type="success" text="确定" @click="onHandleSet"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldGender: '',
				newGender: '',
				loading: false
			}
		},
		onLoad(options) {
			this.oldGender = options.gender;
			this.newGender = options.gender;
		},
		methods: {
			//  设置性别
			onHandleSet() {
				this.loading = true
				console.log(this.newGender);
			}
		}
	}
</script>

<style lang="scss" scoped>
.button-container{
	position: relative;
	.button{
		width: 180rpx;
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
