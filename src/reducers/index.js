// importando el combine Reducers 
import { combineReducers } from 'redux'

// importando el reducers de posts
import postsReducer from './postsReducers'

export default combineReducers({
    posts: postsReducer
})