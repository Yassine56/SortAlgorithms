import React from 'react'

const Bar = ({ value, isEvaluated, length, index }) => {
	const style = {
		backgroundColor: isEvaluated ? 'red' : '#6892b3',
		height: (value / length) * 500 + 'px',
		width: 100 / length + '%',
		borderColor: 'white',
		borderLeft: '2px',
		order: index,
	}

	return <div style={style} />
}

export default Bar
