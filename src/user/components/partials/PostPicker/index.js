import { Component } from 'react';
import { connect } from 'react-redux'
import { Flexbox, Button, Icon } from 'shared/components/elements'
import { PostCard, ProviderCard } from 'user/components/partials'
import { SET_CURRENT_POST, SET_CURRENT_MODAL, UPDATE_PLAN_REQUEST  } from 'constants/actionTypes'
import { PROVIDERS } from 'constants/providers'
import {UTM_TYPES} from 'constants/posts'
import classes from './style.scss'

//shows up as buttons in mobile, or sidebar in browser?
//used in channels and send
class PostPicker extends Component {
  constructor() {
    super()

    this.state = {
      currentPost: null, //will be an index
    }

    this.removePost = this.removePost.bind(this)
    this.sortPostsByProvider = this.sortPostsByProvider.bind(this)
    this.setCurrentPost = this.setCurrentPost.bind(this)
  }

  removePost(post, index) {
    if (this.state.currentPost === index) {
      this.setState({currentPost: null})
    }

    const plan = Object.assign({}, this.props.currentPlan)
    const channelTemplates = Helpers.safeDataPath(plan, `channelConfigurations.${this.props.account.provider}.postTemplates`, [])

    this.props.updatePostRequest(plan)
    this.props.setCurrentPost(null)
  }

  //takes posts from all channels and accounts and organizes by provider
  sortPostsByProvider(posts) {
    const postsArray = _.values(posts)
    const sorted = {}
    const providers = Object.keys(this.props.providerAccounts)

    for (let i = 0; i < providers.length; i++) {
      let provider = providers[i]
      let accountsIdsForProvider = this.props.providerAccounts[provider].map((a) => a.id)
console.log(accountsIdsForProvider);

      sorted[provider] = []

      //iterate backwards so indices work
      for (let i = postsArray.length -1; i > -1; i--) {
        let post = postsArray[i]
        if (accountsIdsForProvider.includes(post.providerAccountId)) {
          sorted[provider].push(post)
          //so don't have to iterate over again
          postsArray.splice(i, 1)
        }
      }
    }

    return sorted
  }

  setCurrentPost(post) {
    //turn off adding a post when click on a card
    this.props.toggleAdding(false, false)
    this.props.setCurrentPost(post)
  }
  render() {
    if (this.props.hide) {
      return null
    }

    const sortedPosts = this.sortPostsByProvider(this.props.campaignPosts || [])
console.log(sortedPosts, this.props.campaignPosts);
    const providers = Object.keys(sortedPosts)

    let cards = []
    for (let provider of providers) {
      let providerPosts = sortedPosts[provider]
      cards.push(
        <ProviderCard
          key={provider}
          provider={provider}
          onClick={this.props.toggleAdding.bind(this, provider)}
          height="220px"
          maxWidth="220px"
          backgroundColor={provider.toLowerCase()}
        />
      )
      cards = cards.concat(
        providerPosts.map((post) =>
          <PostCard
            key={post.id}
            post={post}
            height="220px"
            maxWidth="220px"
            onClick={this.setCurrentPost.bind(this, post)}
          />
        )
      )
    }

    return (
      <div >
        <h3>Your posts:</h3>
        {!Object.keys(sortedPosts).length && <div>No posts yet</div>}
        <Flexbox flexWrap="wrap"  className={classes.postMenu}>
          {cards}
        </Flexbox>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    campaignPosts: Helpers.safeDataPath(state.forms, "Compose.posts.params", {}),
    user: state.user,
    providerAccounts: state.providerAccounts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentModal: (payload) => dispatch({type: SET_CURRENT_MODAL, payload}),
    setCurrentPost: (payload, options) => dispatch({type: SET_CURRENT_POST, payload, options}),
    updatePlanRequest: (payload) => {dispatch({type: UPDATE_PLAN_REQUEST, payload})},
  }
}

const ConnectedPostPicker = connect(mapStateToProps, mapDispatchToProps)(PostPicker)
export default ConnectedPostPicker

