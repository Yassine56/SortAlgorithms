import React from 'react'
import Bar from './bar'
import { visualState } from '../state/animationState'
import { useRecoilValue } from 'recoil'
const Chart = ({ array, length, indices }) => {
	// console.log('array in chart', array) i == indices.i || i == indices.j
	// let visualArray = useRecoilValue(visualState)
	// console.log('in chart ', visualArray)
	return (
		<div className='Chart'>
			{array && array.length ? (
				array.map((el, i) => (
					<Bar
						index={i}
						value={el}
						isEvaluated={i == indices.i || i == indices.j}
						key={el}
						length={length}
					/>
				))
			) : (
				<div> ...loading </div>
			)}
		</div>
	)
}
export default Chart
