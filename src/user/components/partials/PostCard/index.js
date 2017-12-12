import { Component } from 'react';
import { connect } from 'react-redux'
import { PROVIDERS } from 'constants/providers'
import { UTM_TYPES } from 'constants/posts'
import { SET_CURRENT_POST} from 'constants/actionTypes'
import {
  withRouter,
} from 'react-router-dom'
import { Card, CardHeader, Flexbox, Button, Icon } from 'shared/components/elements'
import classes from './style.scss'

class PostCard extends Component {
  constructor() {
    super()

  }

  render () {
    const { post, selected, status, onClick, height, maxWidth, className, showUtms, showIcon, showLink, showImages, showText = true, subtitle} = this.props
    if (!post) {return null} //shouldn't happen, but whatever

    let sub
    switch(status) {
      case "toDelete":
        sub = "Ready to Delete"
        break
      case "toCreate":
        sub = "Ready to Create"
        break
      case "toUpdate":
        sub = "Ready to Update"
        break
    }

    const hasMultiple = Helpers.channelTypeHasMultiple(null, post.provider, post.channelType)
    const activeUtms = UTM_TYPES.filter((t) => post[t.type] && post[t.type].active && post[t.type].value)
    return (
      <Card selected={selected} onClick={onClick} height={height} maxWidth={maxWidth} className={`${className} ${classes[status]}`}>
        <CardHeader title={post.channelType.titleCase()} subtitle={subtitle || sub} icon={showIcon && post.provider.toLowerCase()} iconColor={post.provider.toLowerCase()}/>

        <Flexbox direction="column" >
          <div><span className={classes.cardLabel}>Account:</span>&nbsp;{(Helpers.accountFromPost(post) || {}).userName || "Error: Could not be found"}</div>
          {hasMultiple && post.channelId && (
            <div><span className={classes.cardLabel}>Channel:</span>&nbsp;{(Helpers.channelFromPost(post) || {}).name || "Error: Could not be found"}</div>
          )}
          <br/>

          {showText && <div><span className={classes.cardLabel}>Text:</span>&nbsp;{post.text || "(none)"}</div>}
          {showLink && <div><span className={classes.cardLabel}>Short Link:</span>&nbsp;{post.shortUrl || "(none)"}</div>}

          {showImages && <Flexbox>
            {post.uploadedContent && post.uploadedContent.map((upload) => {
              return <Flexbox key={upload.url} direction="column">
                <a
                  target="_blank"
                  style={{backgroundImage: `url(${upload.url})`}}
                  className={classes.imageLink}
                  href={upload.url}
                />
              </Flexbox>
            })}
          </Flexbox>}
          <br/>

          {showUtms && <Flexbox className={classes.utms} justify="flex-start" align="flex-start" direction="column">
            {activeUtms.map((utmType) => {
              //TODO want to extract for use with plan editor...if we have a plan editor
              const type = utmType.type
              const label = utmType.label.titleCase()
              return <div key={type} className={classes.utmField}>
                <span className={classes.cardLabel}>{label} UTM:</span>&nbsp;<span>{post[type].value}</span>
              </div>
            })}
          </Flexbox>}
        </Flexbox>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))
