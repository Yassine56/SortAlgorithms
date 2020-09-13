import React, { useState, useEffect } from 'react'
import Chart from './components/chart'
import './App.css'
import { generate } from './components/generate'
import { selectionSort } from './utils/sort'
const App = () => {
	let [length, setLength] = useState(100)
	let [visualArray, setVisualArray] = useState({
		array: [],
		indices: {
			i: null,
			j: null,
		},
	})
	let [trace, setTrace] = useState([
		{
			array: [],
			indices: {
				i: null,
				j: null,
			},
			sequence: null,
		},
	])
	let [timeOutIds, setTimeOutIds] = useState([])
	let [isRunning, setIsRunning] = useState(false)

	useEffect(() => {
		let array = generate(length)
		setVisualArray({
			...visualArray,
			array,
		})
	}, [])
	useEffect(() => {
		if (isRunning) {
			run(trace)
			setIsRunning(false)
		}
	})
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
	const onButonClick = () => {
		let array = generate(length)
		setVisualArray({
			...visualArray,
			array,
		})
	}
	const onLengthChange = (e) => {
		let newVal = e.target.value || 100
		setVisualArray({
			...visualArray,
			array: generate(newVal),
		})
		setLength(newVal)
	}
	let size = length < 100 ? 100 : length > 500 ? 500 : length

	const onSortClick = () => {
		let [sortedArray, trace] = selectionSort([...visualArray.array])
		console.log('sorted ARRAY ', sortedArray)
		console.log(' trace ', trace)
		setTrace(trace)
		setIsRunning(true)
	}

	return (
		<div>
			<h1>Hello world</h1>
			<button onClick={onButonClick}>generate</button>
			<button onClick={onSortClick}>sort</button>
			<input type='number' value={length} onChange={onLengthChange} />
			<Chart array={visualArray.array} length={size} indices={visualArray.indices} />
		</div>
	)
}

export default App
