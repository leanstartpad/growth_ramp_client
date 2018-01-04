import {
  CREATE_ACCOUNT_SUBSCRIPTION_SUCCESS,
  FETCH_ACCOUNT_SUBSCRIPTION_SUCCESS,
  UPDATE_ACCOUNT_SUBSCRIPTION_SUCCESS,
  SIGN_OUT,
} from 'constants/actionTypes'

const accountSubscriptionReducer = (state = null, action) => {
  const pld = action.payload
  switch (action.type) {
    case FETCH_ACCOUNT_SUBSCRIPTION_SUCCESS:
      //payload should be the found accountsSubscription
      return Object.assign({}, pld)

    case CREATE_ACCOUNT_SUBSCRIPTION_SUCCESS:
      //payload should be the new accountsSubscription
      return Object.assign({}, pld)

    case UPDATE_ACCOUNT_SUBSCRIPTION_SUCCESS:
      //payload should be the updated accountsSubscription
      if (state && state.id === action.payload.id) {
        return Object.assign({}, pld)
      } else {
        return state
      }

    case SIGN_OUT:
      return false

    default:
      return state
  }
}

export default accountSubscriptionReducer

