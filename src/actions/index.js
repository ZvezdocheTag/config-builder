export const ADD_RULE = "ADD_RULE"
export const REMOVE_RULE = "REMOVE_RULE"
export const COUNT_CARD = "COUNT_CARD"
export const SET_RULES_TAB = "SET_RULES_TAB"

export const GET_DATA = "GET_DATA"
export const RECIEVE_CARD = "RECIEVE_CARD"

// ASYNC
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
// ASYNC END

export const getData = (data) => ({
    type: "GET_DATA",
    data
})

export const recieveCard = (data, json) => {
    return {
        type: RECIEVE_CARD,
        data,
        card: json
    }
}

export const addRule = (text) => ({
    type: "ADD_RULE",
    text
})

export const removeRule = (id) => ({
    type: "REMOVE_RULE",
    id
})

export const countCard = (id) => ({
    type: "COUNT_CARD",
    id
})

export const setRulesTab = (card) => ({
    type: "SET_RULES_TAB",
    card
})