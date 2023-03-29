<template>
	<view class="feedbackItem-container">
		<uni-card  :extra="data.create_time" :cover="data.image">
			<text class="uni-body">{{data.content}}</text>
		</uni-card>
	</view>
</template>Z

<script>
	export default {
		name: "FeedbackItem",
		props: ['data'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>