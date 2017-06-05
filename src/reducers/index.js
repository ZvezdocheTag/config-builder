import { combineReducers } from 'redux'
import  generator  from './generator'
import  {selectedSubreddit, postsBySubreddit}  from './fetching'

const rootReducer = combineReducers({
    generator,
    selectedSubreddit,
    postsBySubreddit
})

export default rootReducer

