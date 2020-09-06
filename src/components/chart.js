import React from 'react'
import Bar from './bar'
const Chart = ({ array, length }) => {
	return (
		<div className='Chart'>
			{array.map((el, i) => (
				<Bar index={i} value={el} isEvaluated={false} key={el} length={length} />
			))}
		</div>
	)
}
export default Chart
