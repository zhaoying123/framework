import * as actionTypes from '../constants/comment'

const initialState = []

export default function store (state = initialState, action) {
	switch (action.type) {
		case actionTypes.COMMENT_ADD:
			state.push(action.data)
			return state
		default:
			return state
	}
}
