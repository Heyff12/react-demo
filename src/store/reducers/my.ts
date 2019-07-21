import { My } from "../actionTypes"


const my = (state = 'haha', action) => {
    switch (action.type) {
      case My.SET_NAME:
        return action.name
      default:
        return state
    }
  }
  
  export default my