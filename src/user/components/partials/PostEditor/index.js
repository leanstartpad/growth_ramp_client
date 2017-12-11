import { Component } from 'react';
import { connect } from 'react-redux'
import { Flexbox, Button, Input, Checkbox, Icon } from 'shared/components/elements'
import { DropImage } from 'shared/components/groups'
import {
  SET_CURRENT_POST,
  LIVE_UPDATE_POST_REQUEST,
  LIVE_UPDATE_POST_SUCCESS,
  LIVE_UPDATE_POST_FAILURE,
} from 'constants/actionTypes'
import { PROVIDERS } from 'constants/providers'
import { UTM_TYPES, URL_LENGTH } from 'constants/posts'
import {formActions} from 'shared/actions'
import classes from './style.scss'

//shows up as buttons in mobile, or sidebar in browser?
//used in channels and send
class PostEditor extends Component {
  constructor() {
    super()

    this.state = {
    }

    this.handleText = this.handleText.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onOverrideDrop = this.onOverrideDrop.bind(this)
    this.removeUpload = this.removeUpload.bind(this)
    this.onUpload = this.onUpload.bind(this)
  }

  updateUtm(utmType, settingKey = false, value, e) {
    //set the param
    let post = Object.assign({}, this.props.post)

    if (settingKey) {
      post[utmType].key = value

    } else {
      post[utmType].value = value
    }

    post.dirty = true
    //update the post form
    formActions.setParams("EditCampaign", "posts", {[post.id]: post})
  }

  toggleUtm(utmType, checked, e) {
    //update the post form
    let post = Object.assign({}, this.props.post)
    //let utmField = Object.assign({}, Helpers.safeDataPath(this.props.postParams, `${this.props.post.id}.${utmType}`, {}))
    post[utmType].active = checked
    post.dirty = true

    formActions.setParams("EditCampaign", "posts", {[post.id]: post})
  }

  //TODO debounce
  handleText(value) {
    //set the param
    let post = Object.assign({}, this.props.post)
    post.text = value
    post.dirty = true

    const maxCharacters = PROVIDERS[post.provider].channelTypes[post.channelType].maxCharacters
    const characterCount = Helpers.safeDataPath(post, "text", "").length + (post.contentUrl ? URL_LENGTH : 0)

    if (characterCount.length > maxCharacters) {
      alertActions.newAlert({
        title: "Warning:",
        message: "Character limit reached",
        level: "WARNING",
      })

    } else {
      //update the post form
      formActions.setParams("EditCampaign", "posts", {[post.id]: post})
    }
  }

  //NOTE: cannot save a file object in redux, at least not in a easy way.
  //Just upload here
  onDrop(acceptedFile, rejectedFile) {
    if (acceptedFile) {
      this.setState({pending: true})
    } else {
      console.log("failed to drop file");
    }
  }

  removeUpload(oldFileUrl){
    //TODO also remove from b2
    let uploadedFiles = [...this.props.uploadedFiles]
    _.remove(uploadedFiles, (f) => f === oldFileUrl)

    formActions.setParams("EditCampaign", "uploadedFiles", uploadedFiles)

    //update the post form
    let post = Object.assign({}, this.props.post)
    _.remove(post.uploadedContent, (c) => c.url === oldFileUrl)
    post.dirty = true
    formActions.setParams("EditCampaign", "posts", {[post.id]: post})
//console.log(post);
  }

  onOverrideDrop(oldFileUrl, acceptedFile, rejectedFile) {
    //remove the old file
    this.removeUpload(oldFileUrl)

    if (acceptedFile) {
      this.setState({pending: true})
    } else {
      console.log("failed to drop file");
    }
  }

  onUpload(result) {
    this.setState({pending: false})
    //is successful, a url
    if (typeof result === "string") {
      const fileUrl = result
      //update the uploadedFiles list...which I could use to clear out unused files
      let uploadedFiles = [...this.props.uploadedFiles]
      uploadedFiles.push(fileUrl)

      formActions.setParams("EditCampaign", "uploadedFiles", uploadedFiles)

      //update the post form
      let post = Object.assign({}, this.props.post)
      if (!post.uploadedContent) {
        post.uploadedContent = []
      }
      post.uploadedContent.push({url: fileUrl, type: "IMAGE"})
      post.dirty = true

      formActions.setParams("EditCampaign", "posts", {[post.id]: post})
    }

  }

  render() {
    const post = this.props.post
    if (!post) {return null} //shouldn't happen, but whatever
    let utmFields = Object.assign({}, Helpers.safeDataPath(this.props.formOptions, `${post.id}.utms`, {}))

    const maxImages = PROVIDERS[post.provider].channelTypes[post.channelType].maxImages
    const imageCount = post.uploadedContent ? post.uploadedContent.length : 0

    const maxCharacters = PROVIDERS[post.provider].channelTypes[post.channelType].maxCharacters
    const characterCount = Helpers.safeDataPath(post, "text", "").length + (post.contentUrl ? URL_LENGTH : 0)

    return (
      <Flexbox direction="column" >
        <h2>{Helpers.providerFriendlyName(post.provider)} {post.channelType.titleCase()}</h2>
        {false && <div className={classes.disablePost}>
          <Checkbox
            value={post.active}
            onChange={this.disablePost}
          />&nbsp;Disable post
        </div>}

        <div className={classes.postFields}>
          <div>
            <Flexbox direction="column" justify="center" className={classes.textEditor}>
              <div>Maximum: {maxCharacters};&nbsp;Current Count: {characterCount} {post.contentUrl ? `(including ${URL_LENGTH} for the url length)` : ""}</div>
              <Input
                textarea={true}
                value={post.text}
                placeholder={`Your post`}
                onChange={this.handleText}
                type="text"
                maxLength={maxCharacters - URL_LENGTH}
             />

              {imageCount > maxImages && <label>(No more images allowed for this kind of post)</label>}
              <Flexbox>
                {imageCount < maxImages && <DropImage
                  user={this.props.user}
                  label="Upload an image"
                  onStart={this.onDrop}
                  onSuccess={this.onUpload}
                  onFailure={this.onUpload}
                  className={classes.dropImage}
                />}

                {post.uploadedContent && post.uploadedContent.map((upload) => {
                  return <Flexbox key={upload.url} direction="column">
                    <a
                      target="_blank"
                      style={{backgroundImage: `url(${upload.url})`}}
                      className={classes.dropImage}
                      href={upload.url}
                    />
                    <Icon name="close" onClick={this.removeUpload.bind(this, upload.url)} />
                  </Flexbox>
                })}
              </Flexbox>
            </Flexbox>

            <Flexbox className={classes.utms} justify="flex-start" align="flex-start" direction="column">
              {!post.contentUrl ? (
                <div>(Utms cannot be set when there is no content URL)</div>
              ) : (
                UTM_TYPES.map((utmType) => {
                  //TODO want to extract for use with plan editor...if we have a plan editor
                  const type = utmType.type
                  const label = utmType.label
                  const active = Helpers.safeDataPath(post, `${type}.active`, false)
                  const value = Helpers.safeDataPath(post, `${type}.value`, "")
                  const key = Helpers.safeDataPath(post, `${type}.key`, "")
                  return (
                    <div key={type} className={classes.utmField}>
                      <div className={classes.utmCheckbox}>
                        <Checkbox
                          value={active}
                          onChange={this.toggleUtm.bind(this, type)}
                          label={`${label.titleCase()} UTM`}
                        />&nbsp;
                      </div>

                      {active && <Input
                        placeholder={false ? `${label.titleCase()} utm for this template` : ""}
                        onChange={this.updateUtm.bind(this, type, false)}
                        value={value}
                      />}
                      {active && type === "customUtm" && <Input
                        placeholder={`Key for this utm`}
                        onChange={this.updateUtm.bind(this, type, "settingKey")}
                        value={key}
                      />}
                    </div>
                  )
                })
              )}
            </Flexbox>

          </div>
        </div>
      </Flexbox>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    uploadedFiles: Helpers.safeDataPath(state.forms, "EditCampaign.uploadedFiles", []),
    postsParams: Helpers.safeDataPath(state.forms, "EditCampaign.posts.params", {}),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //setCurrentModal: (payload) => dispatch({type: SET_CURRENT_MODAL, payload}),
  }
}

const ConnectedPostEditor = connect(mapStateToProps, mapDispatchToProps)(PostEditor)
export default ConnectedPostEditor

