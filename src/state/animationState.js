import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

export const visualState = atom({
	key: 'visualArray', // unique ID (with respect to other atoms/selectors)
	default: {
		array: [],
		indices: {
			i: null,
			j: null,
		},
		length: 100,
	}, // default value (aka initial value)
})
export const traceState = atom({
	key: 'traceState',
	default: [
		{
			array: [],
			indices: {
				i: null,
				j: null,
			},
			sequence: null,
		},
	],
})
