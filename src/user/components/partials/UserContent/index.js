import { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom'
import { Alert, Flexbox } from 'shared/components/elements'
import { Home } from 'user/components/templates'
import requireAuthenticated from 'lib/requireAuthenticated'
import forbidAuthenticated from 'lib/forbidAuthenticated'
import { connect } from 'react-redux'
import classes from './style.scss'

class UserContent extends Component {
  render() {
    const alerts = _.values(this.props.alerts)
    const modalOpen = this.props.currentModal

    return (
      <main>
        <Flexbox className={classes.rightColumn} direction="column">
          {alerts && !modalOpen && alerts.map((alert) => {
            return <Alert alert={alert} />
          })}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Home} />
          </Switch>
        </Flexbox>
      </main>
    )
  }
}

UserContent.propTypes = {
  history: PropTypes.object,
}
const mapStateToProps = (state) => {
  return {
    alerts: state.shared.alerts,
    currentModal: state.shared.viewSettings.currentModal,
  }
}

export default withRouter(connect(mapStateToProps)(UserContent))
