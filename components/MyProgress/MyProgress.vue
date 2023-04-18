<template>
  <view class="circle-container">
    <canvas class="circle-canvas" canvas-id="canvas" :style="{width: diameter +'px', height: diameter+'px'}"></canvas>
    <view class="circle-label" >
		<view class="">
			正确率
		</view>
		<view class="number" :class="{error:progress < 50}">{{progress}}%</view>
	</view>
  </view>
</template>

<script>
  export default {
    props: {
      diameter: {  // 圆环直径
        type: Number,
        default: 100
      },
      progress: {  // 圆环进度（0-100）
        type: Number,
        default: 0
      }
    },
    methods: {
      drawCircle() {
        // 获取画布和上下文
        const canvas = uni.createCanvasContext('canvas', this);
        const center = this.diameter / 2;
        const radius = this.diameter / 2 - 10;  // 圆环半径
        const startAngle = -Math.PI / 2;  // 起始角度为12点钟方向

        // 画底部灰色圆环
        canvas.setStrokeStyle('#eee');
        canvas.setLineWidth(15);
        canvas.beginPath();
        canvas.arc(center, center, radius, 0, 2 * Math.PI, false);
        canvas.stroke();

        // 画进度圆环
        const endAngle = startAngle + 2 * Math.PI * (this.progress / 100);  // 终止角度
        canvas.setStrokeStyle('#007aff');  // 进度圆环颜色为蓝色
        canvas.setLineWidth(15);
        canvas.beginPath();
        canvas.arc(center, center, radius, startAngle, endAngle, false);
        canvas.stroke();

        // 将画布绘制出来
        canvas.draw();
      }
    },
    watch: {
      progress() {
        // 当进度改变时重新绘制圆环
        this.drawCircle();
      }
    },
    mounted() {
      // 组件渲染完成后绘制圆环
      this.drawCircle();
    }
  }
</script>

<style lang="scss" scoped>
  .circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .circle-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32rpx;
    color: #333;
	text-align: center;
	
	.number{
		font-weight: 700;
		font-size: 60rpx;
	}
	
	.error{
		color: red;
	}
  }
</style>
