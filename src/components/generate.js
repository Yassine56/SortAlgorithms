export const generate = (length) => {
	length = length < 10 ? 10 : length > 500 ? 500 : length
	let arr = []
	while (arr.length < length) {
		let r = Math.floor(Math.random() * length) + 1
		if (arr.indexOf(r) === -1) arr.push(r)
	}
	return arr
}
