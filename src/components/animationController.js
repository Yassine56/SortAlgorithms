import React, { useState, useEffect } from 'react'
import { selectionSort, bubbleSort, insertionSort, quickSort } from '../utils/sort'
import { traceState, visualState, timeoutIds } from '../state/animationState'
import { useRecoilState } from 'recoil'
import { generate } from './generate'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'

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
		width: '80%',
		borderRadius: '15px',
		backgroundColor: '#6892b3',
	},
}))

const AnimationController = () => {
	let [trace, setTrace] = useRecoilState(traceState)
	let [timeOutIds, setTimeOutIds] = useRecoilState(timeoutIds)
	let [visualArray, setVisualArray] = useRecoilState(visualState)
	let [algorithm, setAlgorithm] = useState('selection')
	let [isPlaying, setIsplaying] = useState(false)
	let [shouldResume, setShouldResume] = useState(false)
	const classes = useStyles()

	useEffect(() => {
		if (trace.length && visualArray.sequence + 1 === trace.length) {
			setShouldResume(false)
			setIsplaying(false)
		} else if (trace.length && visualArray.sequence + 1 !== trace.length) {
			setShouldResume(true)
		}
	}, [visualArray, trace])

	const sortMapping = {
		selection: selectionSort,
		bubble: bubbleSort,
		insertion: insertionSort,
		quick: quickSort,
	}

	const onSortClick = () => {
		let [sortedArray, trace] = sortMapping[algorithm]([...visualArray.array])
		setTrace(trace)
		run(trace)
	}

	const onButonClick = () => {
		let array = generate(visualArray.array.length)
		setVisualArray({
			...visualArray,
			array,
		})
		setShouldResume(false)
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
		setIsplaying(true)
	}

	const reset = () => {
		timeOutIds.forEach((id) => clearTimeout(id))
		setIsplaying(false)
		setShouldResume(true)
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
			}, 200 * i)
		})
		setTimeOutIds([...tempTimeOutids])
		setIsplaying(true)
	}

	const renderSortingoptions = () => {
		let options = Object.keys(sortMapping)
		return options.map((option) => (
			<option key={option} value={option}>
				{option}
			</option>
		))
	}

	const onAlgoChange = ({ target: { value } }) => {
		setAlgorithm(value)
	}
	return (
		<div>
			<div className={classes.root}>
				<Grid container alignItems='center' direction='row' justify='center' spacing={2}>
					<Grid item xs={1}>
						<ShuffleIcon className={classes.element} onClick={onButonClick} />
					</Grid>
					<Grid item xs={1}>
						<SkipPreviousIcon className={classes.element} onClick={previous} />
					</Grid>
					<Grid item xs={1}>
						{isPlaying ? (
							<PauseCircleFilledIcon className={classes.element} onClick={reset} />
						) : (
							<PlayCircleFilledIcon
								className={classes.element}
								onClick={shouldResume ? resume : onSortClick}
							/>
						)}
					</Grid>
					<Grid item xs={1}>
						<SkipNextIcon className={classes.element} onClick={next} />
					</Grid>
					<Grid item xs={2}>
						<select className={classes.element} onChange={onAlgoChange}>
							{renderSortingoptions()}
						</select>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default AnimationController
