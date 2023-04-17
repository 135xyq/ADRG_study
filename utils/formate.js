/**
 * 格式化时间 x时x分x秒
 * @param date
 * @returns {string}
 */
export function formateDate(date) {
	date = Number(date)
	const hour = Math.floor(date / 3600)
	const minute = Math.floor((date - hour * 3600) / 60)
	const second = Math.floor(date % 60)
	return `${hour}时${minute}分${second}秒`
}



/**
 * 格式化时间 00:00 分：秒
 * @param date
 * @returns {string}
 */
export function formateDateToMinuteAndSecond(date) {
	date = Number(date)
	let minute = Math.floor(date / 60)
	let second = Math.floor(date % 60)
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	return `${minute}:${second}`
}


/**
 * 格式化时间 00:00:00
 * @param date
 * @returns {string}
 */
export function formateDateToHMS(date) {
	date = Number(date)
	let hour = Math.floor(date / 3600)
	let minute = Math.floor((date - hour * 3600) / 60)
	let second = Math.floor(date % 60)
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	return `${hour}:${minute}:${second}`
}