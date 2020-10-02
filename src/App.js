import React from 'react'
import './App.css'
import ArrayVisualizer from './components/arrayVisualizer'
import AnimationController from './components/animationController'
import { RecoilRoot } from 'recoil'
import Header from './components/header'
const App = () => {
	return (
		<RecoilRoot>
			<div style={{ backgroundColor: 'black', height: '100%' }}>
				<Header />
				<br />
				<ArrayVisualizer />
				<br />
				<AnimationController />
			</div>
		</RecoilRoot>
	)
}

export default App
