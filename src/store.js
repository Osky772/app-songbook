// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension'


// export default function store() {
//     const middlewares = [thunk]
//     const middlewareEnhancer = applyMiddleware(...middlewares)

//     const enhancers = [middlewareEnhancer]
//     const composedEnhancers = composeWithDevTools(...enhancers)
//     return createStore(rootReducer, undefined, composedEnhancers)
// }