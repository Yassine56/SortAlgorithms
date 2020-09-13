export const selectionSort = (array) => {
	let min_idx
	let trace = []
	let sequence = 0
	for (let i = 0; i < array.length - 1; i++) {
		min_idx = i
		for (let j = i + 1; j < array.length; j++) {
			if (array[j] < array[min_idx]) {
				min_idx = j
			}
		}
		swap(array, i, min_idx)
		calculateTrace(trace, array, i, min_idx, sequence++)
	}
	calculateTrace(trace, array, null, null, sequence++)
	return [array, trace]
}

const swap = (array, i, j) => {
	let temp = array[j]
	array[j] = array[i]
	array[i] = temp
}

export const calculateTrace = (trace, array, i, j, sequence) => {
	trace.push({
		array: [...array],
		indices: { i, j },
		sequence,
	})
}
