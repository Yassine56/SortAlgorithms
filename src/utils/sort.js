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

export const bubbleSort = (array) => {
	let len = array.length
	let trace = []
	let sequence = 0
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len; j++) {
			if (array[j] > array[j + 1]) {
				swap(array, j, j + 1)
				calculateTrace(trace, array, j, j + 1, sequence++)
			}
		}
	}
	calculateTrace(trace, array, null, null, sequence++)
	return [array, trace]
}

export const insertionSort = (array) => {
	let trace = []
	let sequence = 0
	let length = array.length
	for (let i = 1; i < length; i++) {
		let key = array[i]
		let j = i - 1
		while (j >= 0 && array[j] > key) {
			array[j + 1] = array[j]

			j = j - 1
		}
		array[j + 1] = key
		calculateTrace(trace, array, i, j, sequence++)
		// calculateTrace(trace, array, i, j + 1, sequence++)
	}
	calculateTrace(trace, array, null, null, sequence++)
	return [array, trace]
}
export const quickSort = (
	unsortedArray,
	comparator = (a, b) => {
		if (a < b) {
			return -1
		}
		if (a > b) {
			return 1
		}
		return 0
	}
) => {
	let trace = []
	let sequence = 0
	// Create a sortable array to return.
	const sortedArray = [...unsortedArray]

	// Recursively sort sub-arrays.
	const recursiveSort = (start, end) => {
		// If this sub-array is empty, it's sorted.
		if (end - start < 1) {
			return
		}

		const pivotValue = sortedArray[end]
		let splitIndex = start
		for (let i = start; i < end; i++) {
			const sort = comparator(sortedArray[i], pivotValue)

			// This value is less than the pivot value.
			if (sort === -1) {
				// If the element just to the right of the split index,
				//   isn't this element, swap them.
				if (splitIndex !== i) {
					const temp = sortedArray[splitIndex]
					sortedArray[splitIndex] = sortedArray[i]
					sortedArray[i] = temp
					calculateTrace(trace, sortedArray, splitIndex, i, sequence++)
				}

				// Move the split index to the right by one,
				//   denoting an increase in the less-than sub-array size.
				splitIndex++
			}

			// Leave values that are greater than or equal to
			//   the pivot value where they are.
		}

		// Move the pivot value to between the split.
		sortedArray[end] = sortedArray[splitIndex]
		sortedArray[splitIndex] = pivotValue
		calculateTrace(trace, sortedArray, end, splitIndex, sequence++)

		// Recursively sort the less-than and greater-than arrays.
		recursiveSort(start, splitIndex - 1)
		recursiveSort(splitIndex + 1, end)
	}
	// Sort the entire array.
	recursiveSort(0, unsortedArray.length - 1)
	calculateTrace(trace, sortedArray, null, null, sequence++)
	return [sortedArray, trace]
}
