import 'babel-polyfill'
import { put, takeLatest } from 'redux-saga/effects'
import fbApp from '../firebaseApp.js'
import firebase from 'firebase'
import { userFetchRequested } from '../actions'
import { SIGN_IN_REQUESTED } from '../actions/types'
import FB from 'fb';
import crypto from 'crypto'

const hmac = crypto.createHmac('sha256', process.env.REACT_APP_FACEBOOK_SECRET_KEY)
/*going to do without all of these constants
 * import {
  CREATE_USER,
  EMAIL,
  FACEBOOK,
  GITHUB,
  GOOGLE,
  NEW_EMAIL,
  PROVIDER,
  SUCCESS,
} from 'utils/constants'*/

const success = data => ({ result: 'SUCCESS', user: data.user })

function* createUserWithEmail(data) {
  const password = Math.random().toString(36).slice(-8) 

  // The user data returned by firebase is one level flatter
  // than the user data for an existing user so we have to pass obj
  const createUserResult = yield firebase.auth()
    .createUserWithEmailAndPassword(data.email, password)
    .then((user) => {
      const userData = user
      userData.redirect = true
      userData.history = data.history
      return success({ user: userData })
    })

  return createUserResult
}

function* signInWithEmail(data) {
  const signInResult = yield firebase.auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(user => success(user))

  return signInResult
}

function* signInWithProvider(provider) {
  let authProvider

  switch (provider) {
    case 'FACEBOOK':
      authProvider = new firebase.auth.FacebookAuthProvider()
      break
    case 'GITHUB':
      authProvider = new firebase.auth.GithubAuthProvider()
      break
    case 'GOOGLE':
      authProvider = new firebase.auth.GoogleAuthProvider()
      break
  }

  const signInResult = yield firebase.auth()
    .signInWithPopup(authProvider)
    .then((result) => {
 
      //will build off of this object and then send it
      let data = result.user

      // This gives you a Auth Access Token. You can use it to access the Google API/Facebook API etc..
      var token = result.credential.accessToken;

      if (provider  == 'FACEBOOK') {
        //TODO: might want to do this somewhere else; might be slightly slower, but would make this whole thing much more simple
        FB.setAccessToken(token)
      //create a hash of the token using sha256 and Facebook secret as the key (which Facebook requires)
        hmac.update(token)
        //TODO: require this in the Facebook app, then pass it in with each request
        data.facebookAppSecretProof = hmac.digest();
      }

      //  The signed-in user info.
      //  Only using this data for now, so assigning to the result.user
      data.redirect = true
      if (result.history) {
        data.history = result.history
      }

      return success( {user: result.user} )
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("PROVIDER SIGN IN ERROR:", error);
    }); 

  return signInResult
}

function* signIn(action) {
  try {
    const signInType = action.payload.signInType
    const credentials = action.payload.credentials
    const provider = action.payload.provider

    let signInResult
    switch (signInType) {
      case 'CREATE_USER':
        signInResult = yield createUserWithEmail(credentials)
        break
      case 'EMAIL':
        signInResult = yield signInWithEmail(credentials)
        break
      case 'NEW_EMAIL':
        signInResult = yield createUserWithEmail(credentials)
        break
      case 'PROVIDER':
        signInResult = yield signInWithProvider(provider)
        break
    }

    if (signInResult) {
      const user = signInResult.user
      yield put(userFetchRequested(user))
    } else {
      //no user found
      yield put(userFetchRequested(null))
    }
  } catch (err) {
    console.log('Error in Sign In Saga', err)
  }
}

export default function* signInSaga() {
  yield takeLatest(SIGN_IN_REQUESTED, signIn)
}
