import { POST_LOADING, GET_ALLPOST } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false,
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ALLPOST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
