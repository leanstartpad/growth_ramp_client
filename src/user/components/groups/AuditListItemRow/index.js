import { Component } from 'react';
import { connect } from 'react-redux'
import {
  UPDATE_AUDIT_LIST_ITEM_REQUEST,
} from 'constants/actionTypes'
import { Button, Flexbox, Icon, Form, Checkbox } from 'shared/components/elements'
import { Select } from 'shared/components/groups'
import { AUDIT_TESTS } from 'constants/auditTests'
import {DIMENSIONS_METRICS_FRIENDLY_NAME, DIMENSIONS_WITH_PATHS} from 'constants/analytics'
import {formActions, alertActions} from 'shared/actions'
import {
  withRouter,
} from 'react-router-dom'
import classes from './style.scss'

class AuditListItemRow extends Component {
  constructor() {
    super()

    this.state = {
    }

    this.toggleCompleted = this.toggleCompleted.bind(this)
  }

  toggleCompleted (value) {
    const {item} = this.props
    this.props.updateAuditListItem({
      id: item.id,
      userId: item.userId,
      completed: value,
      completedAt: moment().format(),
    })
  }

  render () {
    const { item, listMetadata, currentWebsite, classKey } = this.props
    const dimensionIsPath = DIMENSIONS_WITH_PATHS.includes(listMetadata.primaryDimension)
    const externalLink = dimensionIsPath ? `${currentWebsite.gaSiteUrl}${item.dimension}` : null

    return (
      <tr className={`${classes.itemRow} ${classes[classKey]}`}>
        <td className={`${classes.column0}`} title={item.completed ? "Mark issue as incomplete" : "Mark issue as complete"}>
          <Checkbox onChange={this.toggleCompleted} value={item.completed} />
        </td>

        <td className={`${classes.column1} ${dimensionIsPath ? classes.pathColumn : ""}`}>
          <Flexbox justify="space-between">
            <Flexbox className={dimensionIsPath ? classes.dimensionLinkWrapper : classes.dimensionTextWrapper} align="center">
              &nbsp;
              <div className={dimensionIsPath ? classes.dimensionLink : classes.dimensionText} title={item.dimension}>{item.dimension}</div>
            </Flexbox>
            {externalLink && <a className={classes.externalLink} target="_blank" href={externalLink} title={`Open ${item.dimension} in new window`} ><Icon name="external-link"/></a>}
          </Flexbox>
        </td>

        {Object.keys(listMetadata.metrics).map((metric, index) =>
          <td key={metric} className={`${classes[`column${index + 2}`]}`}>{item.metrics[metric]}</td>
        )}
      </tr>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuditListItem: (payload) => dispatch({type: UPDATE_AUDIT_LIST_ITEM_REQUEST, payload})
  }
}

const mapStateToProps = state => {
  return {
    auditListItems: state.auditListItems,
    currentWebsite: state.currentWebsite,
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuditListItemRow))
