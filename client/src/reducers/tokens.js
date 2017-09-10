import {
  TOKEN_UPDATE_SUCCESS,
  SIGN_OUT,
} from '../actions'

const tokensReducer = (state = null, action) => {

  switch (action.type) {

    case SIGN_OUT:
      return false

    case TOKEN_UPDATE_SUCCESS:
      console.log('Merge old and new token data:', action.payload)
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

export default tokensReducer

