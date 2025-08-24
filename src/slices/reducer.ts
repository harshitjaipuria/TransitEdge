import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

// reducer files
import layoutReducer from './layout/reducer'

const rootReducer = combineReducers({
  Layout: layoutReducer,

})

const reducer = (state: ReturnType<typeof rootReducer> | undefined, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer,
  })

const store = makeStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
