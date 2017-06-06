import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, GET_DATA
} from '../actions'

export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(state = {
    isFetching: false, 
    didInvalidate: false,
    items: []
}, action) {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT: 
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS: 
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: true
            })
        case RECEIVE_POSTS: 
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state;
        
    }
}

export function postsBySubreddit(state = {}, action) {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

export function getData(state = {}, action) {
    switch(action.type) {
        case GET_DATA:
            return Object.assign({}, state, {
                rules: action.data
            })
        default:
            return state
    }
}