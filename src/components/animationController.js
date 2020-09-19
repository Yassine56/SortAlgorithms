import React, { useState } from 'react'
import { selectionSort } from '../utils/sort'
import { traceState, visualState, timeoutIds } from '../state/animationState'
import { useRecoilState } from 'recoil'
import { generate } from './generate'
const AnimationController = () => {
	let [trace, setTrace] = useRecoilState(traceState)
	let [timeOutIds, setTimeOutIds] = useRecoilState(timeoutIds)
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
	// actions

	const previous = () => {
		return (
			visualArray.sequence > 0 &&
			setTimeout(() => {
				setVisualArray({
					array: trace[visualArray.sequence - 1].array,
					indices: trace[visualArray.sequence - 1].indices,
					sequence: visualArray.sequence - 1,
				})
			}, 100)
		)
	}

	const next = () => {
		return (
			visualArray.sequence < trace.length &&
			setTimeout(() => {
				setVisualArray({
					array: trace[visualArray.sequence + 1].array,
					indices: trace[visualArray.sequence + 1].indices,
					sequence: visualArray.sequence + 1,
				})
			}, 100)
		)
	}

	const resume = () => {
		let tempTimeOutids = trace.slice(visualArray.sequence).map((item, i) => {
			return setTimeout(() => {
				setVisualArray({
					array: item.array,
					indices: item.indices,
					sequence: i + visualArray.sequence,
				})
			}, 100 * i)
		})
		setTimeOutIds([...tempTimeOutids])
	}

	const reset = () => {
		timeOutIds.forEach((id) => clearTimeout(id))
	}

	console.log('timeOutIds', visualArray.sequence)

	const run = (trace) => {
		let tempTimeOutids = trace.map((item, i) => {
			return setTimeout(() => {
				setVisualArray({
					array: item.array,
					indices: item.indices,
					sequence: i,
				})
			}, 100 * i)
		})
		setTimeOutIds([...tempTimeOutids])
	}

	return (
		<div>
			<h1>Hello world</h1>
			<button onClick={onButonClick}>generate</button>
			<button onClick={onSortClick}>sort</button>
			<button onClick={reset}>reset</button>
			<button onClick={resume}>resume</button>
			<button onClick={previous}>previous</button>
			<button onClick={next}>next</button>
		</div>
	)
}

export default AnimationController
