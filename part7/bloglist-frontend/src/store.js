import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogReducer'
import notiReducer from './reducers/notiReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  noti: notiReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
