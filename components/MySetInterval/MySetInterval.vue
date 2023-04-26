<template>
	<view>
	<view class="time">{{formateDateToMinuteAndSecond(time)}}</view>
	</view>
</template>

<script>
	import {
		formateDateToMinuteAndSecond
	} from "@/utils/formate.js"
	
	export default {
		name:"MySetInterval",
		data() {
			return {
				time: 0, // 答题时长
				timer: null
			};
		},
		created() {
			this.timer = setInterval(() => {
				this.time++;
			}, 1000)
			
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods:{
			formateDateToMinuteAndSecond,
			// 停止计时器
			stopTime(){
				clearInterval(this.timer)
			}
		}
	}
</script>

<style lang="scss">

</style>