import App from '../../firebaseApp';
import { signInRequested, signOutRequested } from '../../actions'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import firebase from 'firebase';
import helpers from '../../helpers'
import { PROVIDERS } from '../../constants'

class Login extends Component {
  constructor() {
    super()
    const c = this;
    c.state = {
      email: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    
    let value = e.target.value
    this.setState({email: value});
  }

  providerLogin(provider) {
    this.props.signInRequested({
      signInType: 'PROVIDER', 
      provider
    })
  }

  handleSignOut(e) {
    e.preventDefault()
    console.log(" logout click");
    this.props.signOutRequested()
  }

  render() {
    const c = this;
    const user = this.props.user;
    const preposition = user ? "to" : "with";
    return (
      <div id="login">
        {user ? (
          <div>
            Welcome {user.displayName}!&nbsp;
            <button onClick={c.handleSignOut}>Logout</button>
          </div>
        ) : (
          <form onSubmit={c.onSubmit}>
            <label> Login with email </label>
            <input onChange={c.handleChange} value={c.state.value}></input>
          </form>
        )}
        {user && _.values(PROVIDERS).map((p) => {
          const token = `${p.toLowerCase()}Token`
          //this works, but temporarily disabling ticket because neatest button available in case the token expires
          //if (!helpers.safeDataPath(c.props, `user.${p}`, false)) {
            return <button key={p} onClick={c.providerLogin.bind(c, p.toUpperCase())}>{`Login ${preposition} ${p.capitalize()}`}</button>
          //}
        })}
      </div>
    );
  }
}

// getting redux state passed into the *state* of ConnectedLogin, to be passed into the *props* of index
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

// can be passed in as { signInRequested } into connect as a shortcut, but learning the long way for now until I can get used to it, and know how to modify the dispatches for later on
const mapDispatchToProps = (dispatch) => {
  return {
    signInRequested: (data) => dispatch(signInRequested(data)),
    signOutRequested: () => {
      console.log("the dispatch call from the props");
      dispatch(signOutRequested())
    }
  }
}
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin
