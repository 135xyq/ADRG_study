// let path = require('path');
// let stylePath = path.resolve(__dirname, 'common/style/init.less') //less的路径
// module.exports = {
// 	css: {
// 		loaderOptions: {
// 			less: {
// 				globalVars: {
// 					"hack": `true; @import "${stylePath}"`
// 				}
// 			}
// 		}
// 	},
// }

module.exports = {
	devServer: {
		proxy: {
			'/storage':{
				target: 'http://localhost:9000'
			}
		}
	}
}
