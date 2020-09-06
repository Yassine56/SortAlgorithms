import React, { useState } from 'react'
import Chart from './components/chart'
import './App.css'
import { generate } from './components/generate'

const App = () => {
	let [length, setLength] = useState(100)
	let [arr, setArray] = useState(generate(length))
	const onButonClick = () => {
		let array = generate(length)
		setArray(array)
	}
	const onLengthChange = (e) => {
		let newVal = e.target.value || 100
		setArray(generate(newVal))
		setLength(newVal)
	}
	let size = length < 100 ? 100 : length > 500 ? 500 : length
	console.log('size', size)
	return (
		<div>
			<h1>Hello world</h1>
			<button onClick={onButonClick}>generate</button>
			<input type='number' value={length} onChange={onLengthChange} />
			<Chart array={arr} length={size} />
		</div>
	)
}

export default App
