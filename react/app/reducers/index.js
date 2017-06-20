import { combineReducers } from 'redux'
import userinfo from './userinfo'
import store from './store'
import comment from './comment'

// Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
// 只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
// combineReducers()做的就是产生一个整体的 Reducer 函数。
// 该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。
export default combineReducers({
    userinfo,
    store,
    comment
})