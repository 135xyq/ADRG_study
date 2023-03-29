import config from "@/common/config.js"
import store from "@/store/index.js"


export default function upload(params = {}) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: params.count || 1, //默认9
			sizeType: params.sizeType || ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: params.sourceType || ['album','camera'], //从相册和拍照选择
			loop: true,
			success: res => {
				var tempFilePaths = res.tempFilePaths;
				uni.uploadFile({
					url: config.baseUrl + '/applet/upload/upload',
					filePath: tempFilePaths[0],
					name: 'file',
					formData: store.getters.getToken,
					success: rel => {
						let fileRes = JSON.parse(rel.data);
						fileRes.path = res.tempFilePaths[0];
						resolve(fileRes)
					},
					fail(err) {
						reject(err);
					}
				});
			}
		});
	})
}