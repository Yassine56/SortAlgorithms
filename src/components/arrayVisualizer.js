import React, { useState, useEffect } from 'react'
import Chart from './chart'
import { generate } from './generate'
import { useRecoilState } from 'recoil'
import { visualState } from '../state/animationState'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexWrap: 'wrap',
	},
	element: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.primary,
		borderRadius: '15px',
		// backgroundColor: '#6892b3',
	},
}))

const ArrayVisualizer = () => {
	let [length, setLength] = useState(100)
	let [visualArray, setVisualArray] = useRecoilState(visualState)

	const classes = useStyles()

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
		<div className={classes.root}>
			<Grid container alignItems='center' direction='row' justify='center' spacing={2}>
				<Grid className={classes.element} item xs={7}>
					<input type='number' value={length} onChange={onLengthChange} />
					<Chart array={visualArray.array} length={size} indices={visualArray.indices} />
				</Grid>
			</Grid>
		</div>
	)
}
export default ArrayVisualizer
