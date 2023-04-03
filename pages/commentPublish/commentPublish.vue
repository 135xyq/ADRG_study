<template>
	<view class="publish-comment-container">
		<view class="content">
			<u--textarea v-model="content" maxlength="200" height="120"   focus placeholder="写下你的评论" count ></u--textarea>
		</view>
		<view class="btn">
			<u-button :customStyle="{width:'150px',}" :disabled="disabled" @click="onHandlePublish" type="success" text="发表"></u-button>
		</view>
	</view>
</template>

<script>
	import commentApi from "@/api/comment/comment.js"
	
	export default {
		data() {
			return {
				belongInfo:{}, // 文章或视频信息
				content:'', // 评论内容
			};
		},
		computed:{
			disabled(){
				if(this.content.trim() === '') {
					return true;
				}else{
					return false;
				}
			}
		},
		onLoad(option) {
			if(JSON.stringify(option) !== '{}') {
				this.belongInfo = {...option};
			}else{
				uni.navigateBack();
			}
		},
		methods: {
			/**
			 * 发表评论
			 */
			async onHandlePublish(){
				const res = await commentApi.publishComment({
					content: this.content,
					...this.belongInfo
				})
				
				if(res.code === 0){
					uni.showToast({
						title:res.msg,
						icon:'success',
						duration:1000,
					})
					
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	margin: 10px;
}
.btn{
	margin-top: 30px;
}

</style>
