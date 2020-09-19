import React, { useState } from 'react'
import { selectionSort } from '../utils/sort'
import { traceState, visualState } from '../state/animationState'
import { useRecoilState } from 'recoil'
import { generate } from './generate'
const AnimationController = () => {
	let [trace, setTrace] = useRecoilState(traceState)
	let [timeOutIds, setTimeOutIds] = useState([])
	let [visualArray, setVisualArray] = useRecoilState(visualState)

	const onSortClick = () => {
		let [sortedArray, trace] = selectionSort([...visualArray.array])
		setTrace(trace)
		run(trace)
	}

	const onButonClick = () => {
		let array = generate(visualArray.array.length)
		setVisualArray({
			...visualArray,
			array,
		})
	}

	const run = (trace) => {
		trace.forEach((item, i) => {
			let timeOutId = setTimeout(() => {
				setVisualArray({
					array: item.array,
					indices: item.indices,
				})
			}, 100 * i)
			setTimeOutIds([timeOutId, ...timeOutIds])
		})
	}

	return (
		<div>
			<h1>Hello world</h1>
			<button onClick={onButonClick}>generate</button>
			<button onClick={onSortClick}>sort</button>
		</div>
	)
}

export default AnimationController
