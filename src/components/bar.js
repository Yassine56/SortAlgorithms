import React from 'react'

const Bar = ({ value, isEvaluated, length, index }) => {
	const style = {
		backgroundColor: isEvaluated ? '#8fe3df' : '#6892b3',
		height: (value / length) * 500 + 'px',
		width: 100 / length + '%',
		// borderColor: 'red !important',
		borderLeft: '1px solid white',
		order: index,
	}

	return <div style={style} />
}

export default Bar
