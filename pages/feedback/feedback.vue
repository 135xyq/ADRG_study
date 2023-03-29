<template>
	<view>
		<view class="history" @click="onHandleGoToHistory">
			历史记录
		</view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<u--textarea v-model="content" placeholder="请输入要反馈的内容" count></u--textarea>
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="1"></u-upload>
		</view>
		<button class="feedback-button" type="warn"  @click="onHandleSubmitFeedback">提交反馈意见</button>
	</view>
</template>

<script>
	import config from "@/common/config.js"
	import feedbackApi from "@/api/feedback/feedback.js"
	
	export default {
		data() {
			return {
				content: '',
				image: '',
				fileList1:[]
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
					this.image =  result.data.url;
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.baseUrl + '/applet/upload/upload', 
						filePath: url,
						name: 'file',
						formData: {
							token: this.$store.getters.getToken
						},
						success: (res) => {
							const result = JSON.parse(res.data)
							resolve(result)
						}
					});
				})
			},
			/**
			 * 前往历史记录页
			 */
			onHandleGoToHistory() {
				uni.navigateTo({
					url: '/pages/feedback/feedbackHistory/feedbackHistory'
				})
			},
			async onHandleSubmitFeedback() {
				if(this.content.trim() === '') {
					uni.showToast({
						title:'内容不能为空',
						icon:'error',
						duration:1500
					})
				}
				const res = await feedbackApi.publishFeedback({
					content: this.content,
					image:this.image
				})
				
				if(res.code === 0) {
					uni.showToast({
						title:res.msg,
						icon:'success',
					})
					
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		text-align: right;
		padding: 5px;
	}

	.feedback-title {
		margin: 30rpx;
		margin-bottom: 0;
		font-size: 28rpx;
		color: #666;
	}

	.feedback-content {
		margin: 20rpx;
	}

	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;

		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				@include center;
				right: 0;
				top: 0;
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				border-radius: 50%;
				z-index: 2;
				background-color: red;
			}

			.image-box {
				@include center;
				top: 10rpx;
				right: 10rpx;
				bottom: 10rpx;
				left: 10rpx;
				border: 1px solid #eee;
				border-radius: 10rpx;
				overflow: hidden;
				position: absolute;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-button {
		margin: 0 30rpx;
		background-color: green;
	}
</style>