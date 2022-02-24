import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types'

const initialState = {
  user: {},
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
    case GET_ERRORS:
      return action.payload
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      }
  }
}
