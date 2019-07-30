import * as Immutable from "immutable"
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import my from './my'

let initState = Immutable.fromJS({ location: undefined })

export default (history) => combineReducers({
  my,
  router: connectRouter(history)
})
