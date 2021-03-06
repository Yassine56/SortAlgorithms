import React from 'react'
import Bar from './bar'

const Chart = ({ array, length, indices }) => {
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
