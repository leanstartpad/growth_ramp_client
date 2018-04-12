import { Component } from 'react';
import { connect } from 'react-redux'
import {
} from 'constants/actionTypes'
import { Button, Flexbox, Icon, Form, Checkbox } from 'shared/components/elements'
import { Select, Popup } from 'shared/components/groups'
import { AuditListItemRow } from 'user/components/groups'
import { AUDIT_TESTS, getCustomListMetadata } from 'constants/auditTests'
import {DIMENSIONS_METRICS_FRIENDLY_NAME, METRICS_WITH_AVERAGES, } from 'constants/analytics'
import {formActions, alertActions} from 'shared/actions'
import {
  withRouter,
} from 'react-router-dom'
import classes from './style.scss'

class TestResult extends Component {
  constructor() {
    super()

    this.state = {
      viewingInfoPopup: "",
    }

  }

  //value should be string for that list key, so only one shows at a time
  toggleInfoPopup (value = "") {
    this.setState({viewingInfoPopup: value})
  }

  render () {
    const { listsArr, testKey, auditListItems, itemsToShowByList, user, currentAuditSection, currentAudit, previousAudit } = this.props
    const auditToCheck = currentAuditSection === "currentIssues" ? currentAudit : previousAudit
console.log("twists", listsArr);
    const testCustomLists = listsArr.filter((list) => list.isCustomList) // not checking a user's current custom lists, but the custom lists they had when the audit was ran. So check by AuditLists
    const defaultTestListTypesObj = AUDIT_TESTS[testKey].lists
    const defaultTestListTypesArr = Object.keys(defaultTestListTypesObj).map((key) => Object.assign({listKey: key}, defaultTestListTypesObj[key]))
    const allTestListTypesArr = defaultTestListTypesArr.concat(
      testCustomLists.map((customAuditListRecord) => {
        let listMetadata = getCustomListMetadata(customAuditListRecord)

        return listMetadata
      })
    )

    return (
      <div className={classes.testResult}>
        {allTestListTypesArr.map((listMetadata, index) => {
          let listKey = listMetadata.listKey
console.log("ok", listKey, listsArr.map((l) => l.listKey));
          const list = listsArr.find((list) => list.listKey === listKey)
          const listItemsArr = itemsToShowByList[list.id].filter((item) =>
            // filter out completed issues if that setting is set
            currentAuditSection !== "currentIssues" ||
            !user.settings || !user.settings.hideCompletedAuditItems ||
            !item.completed
          )

          const totals = list.summaryData.totals
          const infoIsOpen = this.state.viewingInfoPopup === listKey

          return <Flexbox key={listKey} className={`${classes.table}`} direction="column">
            <Flexbox justify="space-between">
              <h3>
                {listMetadata.header}
                &nbsp;
                <div className={classes.popupWrapper}>
                  <Icon name="info-circle" className={classes.helpBtn} onClick={this.toggleInfoPopup.bind(this, infoIsOpen ? false : listKey)}/>
                  <Popup
                    side="top"
                    float="center"
                    handleClickOutside={this.toggleInfoPopup.bind(this, false)}
                    show={infoIsOpen}
                    containerClass={classes.popupContainer}
                  >
                    <div className={classes.helpBox}>
                      <div className={classes.description}>
                        <div className={classes.title}>What's this issue?</div>
                        <div>{listMetadata.description}</div>
                      </div>
                    </div>
                  </Popup>
                </div>
              </h3>
            </Flexbox>
            {!listItemsArr.length ? (
              <div>Well done, nothing needs improvement right now!</div>
            ) : (
              <table>
                <tr className={`${classes.tableHeader}`}>
                  <th className={`${classes[`column0`]}`}>Done</th>
                  <th className={`${classes[`column1`]}`}>Issue</th>
                  {Object.keys(listMetadata.metrics).map((metricName, index) => {
                    const friendlyName = metricName.includes("goal") ? "Goal Completions"  : DIMENSIONS_METRICS_FRIENDLY_NAME[metricName]
console.log("mn", metricName);
                    const value = totals[metricName]
                    const totalType = METRICS_WITH_AVERAGES.includes(metricName) ? "Avg" : "Total"
                    return <th key={metricName} className={`${classes[`column${index +2}`]}`}>
                      {friendlyName}
                      <div className={classes.headerCaption}>({totalType}: {value})</div>
                    </th>
                  })}
                </tr>

                {listItemsArr.map((item, index) => {
                  let alternatingClass = (index % 2) == 1 ? "oddRow" : "evenRow"
                  return <AuditListItemRow
                    key={item.id}
                    item={item}
                    listMetadata={listMetadata}
                    classKey={alternatingClass}
                  />
                })}
              </table>
            )}

          </Flexbox>
        })}


      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = state => {
  return {
    currentAudit: state.currentAudit,
    previousAudit: state.previousAudit,
    currentAuditSection: state.currentAuditSection,
    auditListItems: state.auditListItems,
    user: state.user,
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestResult))
