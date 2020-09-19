import React, { useState, useEffect } from 'react'
import Chart from './chart'
import { generate } from './generate'
import { useRecoilState } from 'recoil'
import { visualState } from '../state/animationState'
const ArrayVisualizer = () => {
	let [length, setLength] = useState(100)
	let [visualArray, setVisualArray] = useRecoilState(visualState)

	useEffect(() => {
		let array = generate(length)
		setVisualArray({
			...visualArray,
			array,
		})
	}, [])

	const onLengthChange = (e) => {
		let newVal = e.target.value || 100
		setVisualArray({
			...visualArray,
			array: generate(newVal),
		})
		setLength(newVal)
	}
	let size = length < 10 ? 10 : length > 500 ? 500 : length

	return (
		<div>
			<input type='number' value={length} onChange={onLengthChange} />
			<Chart array={visualArray.array} length={size} indices={visualArray.indices} />
		</div>
	)
}
export default ArrayVisualizer
