import React from 'react'
import './App.css'
import ArrayVisualizer from './components/arrayVisualizer'
import AnimationController from './components/animationController'
import { RecoilRoot } from 'recoil'
const App = () => {
	return (
		<RecoilRoot>
			<ArrayVisualizer />
			<br />
			<AnimationController />
		</RecoilRoot>
	)
}

export default App
