import { My } from "../actionTypes"

const myState:IMy = {
  name:'haha'
}

const my = (state = myState, action) => {
    switch (action.type) {
      case My.SET_NAME:
        return action.name
      default:
        return state
    }
  }
  
  export default my