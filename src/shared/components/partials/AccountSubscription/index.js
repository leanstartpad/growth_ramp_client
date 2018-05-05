import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewSettingActions } from 'shared/actions'
import { Button, Flexbox, Input, Alert, Icon } from 'shared/components/elements'
import { PaymentDetailsWrapper, AccountSubscriptionPlans } from 'shared/components/partials'
import classes from './style.scss'
import { withRouter } from 'react-router-dom'
import {
  CHECK_STRIPE_STATUS_REQUEST,
  CANCEL_ACCOUNT_SUBSCRIPTION_REQUEST,
  REACTIVATE_ACCOUNT_SUBSCRIPTION_REQUEST,
  UPDATE_ACCOUNT_SUBSCRIPTION_REQUEST,
} from 'constants/actionTypes'
import {ALLOWED_EMAILS, PAYMENT_PLANS} from 'constants/accountSubscriptions'
import { errorActions, formActions, alertActions } from 'shared/actions'

class AccountSubscription extends Component {
  constructor() {
    super()

    this.state = {
      pending: false,
      plansVisible: false,
      updatingCard: false,
      cancellingPayment: false,
      updatingWebsiteQuantity: false,
    }

    this.togglePending = this.togglePending.bind(this)
    this.reactivate = this.reactivate.bind(this)
    this.toggleCancellingPayment = this.toggleCancellingPayment.bind(this)
    this.cancelPayment = this.cancelPayment.bind(this)
    this.updateAccountSubscription = this.updateAccountSubscription.bind(this)
    this.togglePlans = this.togglePlans.bind(this)
    this.toggleUpdatingCard = this.toggleUpdatingCard.bind(this)
    this.updateWebsiteQuantityParam = this.updateWebsiteQuantityParam.bind(this)
  }

  componentWillMount() {
    this.props.checkStripeStatus()
  }

  togglePending(value = !this.state.pending) {
    this.setState({pending: value})
  }

  updateAccountSubscription () {
    this.togglePending(true)

    const cb = () => {
      this.togglePending(false)
      this.toggleCancellingPayment(false)
      alertActions.newAlert({
        title: "Successfully updated account!",
        level: "SUCCESS",
      })

      this.toggleUpdatingWebsiteQuantity(false)
    }

    const onFailure = () => {
      this.togglePending(false)
      alertActions.newAlert({
        title: "Unknown error updating account: ",
        message: "Please contact support for help (hello@growthramp.io)", //TODO for this and the other one, make it a link instead of just a string
        level: "DANGER",
      })
    }

    const params = {}
    if (this.state.updatingWebsiteQuantity) {
      params.websiteQuantity = this.state.websiteQuantityParam
    }

    this.props.updateAccountSubscription(params, cb, onFailure)
  }

  //cancels account before making next payment (ie, when next payment is due)
  cancelPayment() {
    this.togglePending(true)

    const cb = () => {
      this.togglePending(false)
      this.toggleCancellingPayment(false)
      alertActions.newAlert({
        title: "Successfully cancelled payment",
        level: "SUCCESS",
      })
    }

    const onFailure = () => {
      this.togglePending(false)
      alertActions.newAlert({
        title: "Unknown error cancelling payment: ",
        message: "Please contact support for help (hello@growthramp.io)",
        level: "DANGER",
      })
    }

    this.props.cancelPayment(cb, onFailure)
  }


  //reactivates cancelled account
  reactivate() {
    this.togglePending(true)

    const cb = () => {
      this.togglePending(false)
      alertActions.newAlert({
        title: "Successfully reactivated account",
        level: "SUCCESS",
      })
    }

    const onFailure = () => {
      this.togglePending(false)
      alertActions.newAlert({
        title: "Unknown error reactivating account: ",
        message: "Please contact support for help (hello@growthramp.io)",
        level: "DANGER",
      })
    }

    this.props.reactivateAccount(cb, onFailure)
  }

  toggleCancellingPayment(value, e) {
    e && e.preventDefault()
    this.setState({cancellingPayment: value})
  }

  togglePlans (e) {
    e.preventDefault()
    this.setState({plansVisible: !this.state.plansVisible})
  }

  toggleUpdatingWebsiteQuantity (value, e) {
    e && e.preventDefault()
    if (value) {
      //set param to default as current quantity
      this.setState({websiteQuantityParam: this.props.accountSubscription.websiteQuantity || 1})
    }

    this.setState({updatingWebsiteQuantity: value})
  }

  updateWebsiteQuantityParam(value) {
    if (value < 1) {return }

    // don't let them lower below their current website count
    if (value < Object.keys(this.props.websites).length) {
      alertActions.newAlert({
        title: "Can't Drop Below Your Current Website Count:",
        message: "Please remove a website before going any lower",
        level: "DANGER",
      })

      return
    }

    this.setState({websiteQuantityParam: value})
  }

  toggleUpdatingCard (value, e) {
    e && e.preventDefault()
    this.setState({updatingCard: value})
  }

  render (){
    const {accountSubscription} = this.props

    // if it's set, use that, if it's not, show default
    let currentPaymentPlan = accountSubscription && accountSubscription.paymentPlan || (ALLOWED_EMAILS.includes(this.props.user.email) ? "prepaid" : "standard-monthly")

    const planData = PAYMENT_PLANS[currentPaymentPlan]
    const pricePerExtraText = planData.pricePerExtra ? ` + $${planData.pricePerExtra}/extra website` : ""
    const planPriceText = `($${planData.price}${pricePerExtraText})`
    const currentPaymentMethod = accountSubscription && accountSubscription.defaultSourceId ? `Credit card ending in ${accountSubscription.defaultSourceLastFour}` : "Payment method is not configured"

    if (!accountSubscription) {
      return <Icon name="spinner" size="5x"/>
    }

    const websiteQuantity = accountSubscription.websiteQuantity || 1

    return (
      <div>
        <div className={classes.formSection}>
          <Flexbox justify="space-between">
            <div className={classes.settingLabel}>Current Plan:&nbsp;</div>
            <div className={classes.settingValue}>
              <div>{planData.name}</div>
              <div>{planPriceText}</div>
              {false && <a href="#" className={classes.toggleButton} onClick={this.togglePlans}>View Payment Plans</a>}
            </div>
          </Flexbox>
          {this.state.plansVisible && <div className={classes.expandedForm}>
            <AccountSubscriptionPlans
              updatePlan={this.updatePlan}
            />
          </div>}
        </div>

        <div className={classes.formSection}>
          <Flexbox justify="space-between">
            <div className={classes.settingLabel}>Websites Allowed:&nbsp;</div>
            <div className={classes.settingValue}>
              <div>
                {this.state.updatingWebsiteQuantity ? (
                  <Input className={classes.inlineInput} onChange={this.updateWebsiteQuantityParam} value={this.state.websiteQuantityParam} type="number"/>
                ) : (
                  <div>{websiteQuantity} website{websiteQuantity > 1 ? "s" : ""}</div>
                )}
              </div>
              <div>(${planData.price + planData.pricePerExtra*(
                (this.state.updatingWebsiteQuantity ? this.state.websiteQuantityParam : websiteQuantity) - 1
              )}/month)</div>

              {this.state.updatingWebsiteQuantity && (
                <Button small={true} pending={this.state.pending} onClick={this.updateAccountSubscription}>Save</Button>
              )}
              <a href="#" className={classes.toggleButton} onClick={this.toggleUpdatingWebsiteQuantity.bind(this, !this.state.updatingWebsiteQuantity)}>{!this.state.updatingWebsiteQuantity ? "Edit" : "Cancel"}</a>
            </div>
          </Flexbox>
        </div>

        <div className={classes.formSection}>
          <Flexbox justify="space-between">
            <div className={classes.settingLabel}>Payment Method:&nbsp;</div>
            <div className={classes.settingValue}>
              <div>{currentPaymentMethod}</div>
              <a href="#" className={classes.toggleButton} onClick={this.toggleUpdatingCard.bind(this, !this.state.updatingCard)}>{!this.state.updatingCard ? "Update payment method" : "Cancel"}</a>
            </div>
          </Flexbox>
          {this.state.updatingCard && <div className={classes.expandedForm}>
            <PaymentDetailsWrapper
              submitCb={this.toggleUpdatingCard.bind(this, false)}
              toggleUpdatingCard={this.toggleUpdatingCard}
            />
          </div>}
        </div>

        {accountSubscription && currentPaymentPlan !== "prepaid" && accountSubscription.currentPeriodEnd && <div className={classes.formSection}>
          <Flexbox justify="space-between">
            <div className={classes.settingLabel}>Next payment scheduled:&nbsp;</div>
            <div className={classes.settingValue}>
              {!accountSubscription.endedAt && accountSubscription.cancelAtPeriodEnd && <div>Subscription ending at {moment(accountSubscription.currentPeriodEnd).format("MM-DD-YYYY")}</div>}
              {accountSubscription.endedAt && <div>Subscription endied at {moment(accountSubscription.endedAt).format("MM-DD-YYYY")}</div>}
              {!accountSubscription.endedAt && !accountSubscription.cancelAtPeriodEnd && <div>{moment(accountSubscription.currentPeriodEnd).format("MM-DD-YYYY")}</div>}

              {accountSubscription.cancelAtPeriodEnd || accountSubscription.endedAt ? (
                <a href="#" className={classes.toggleButton} onClick={this.reactivate}>Reactivate account</a>
              ) : (
                <a href="#" className={classes.toggleButton} onClick={this.toggleCancellingPayment.bind(this, !this.state.cancellingPayment)}>{!this.state.cancellingPayment ? "Cancel next payment" : "Cancel"}</a>
              )}
            </div>
          </Flexbox>

          {this.state.cancellingPayment && <div className={classes.expandedForm}>
            <div>Are you sure you want to do this? You will no longer be able to publish campaigns after {moment(accountSubscription.currentPeriodEnd).format("MM-DD-YYYY")}.</div>
            <Button style="danger" onClick={this.cancelPayment} pending={this.state.pending}>Confirm</Button>
          </div>}
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.user,
    accountSubscription: state.accountSubscription,
    websites: state.websites,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkStripeStatus: (cb, onFailure) => dispatch({type: CHECK_STRIPE_STATUS_REQUEST, cb, onFailure}),
    cancelPayment: (cb, onFailure) => dispatch({type: CANCEL_ACCOUNT_SUBSCRIPTION_REQUEST, cb, onFailure}),
    reactivateAccount: (cb, onFailure) => dispatch({type: REACTIVATE_ACCOUNT_SUBSCRIPTION_REQUEST, cb, onFailure}),
    updateAccountSubscription: (payload, cb, onFailure) => dispatch({type: UPDATE_ACCOUNT_SUBSCRIPTION_REQUEST, payload, cb, onFailure}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSubscription)

