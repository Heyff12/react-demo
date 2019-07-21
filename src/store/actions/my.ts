import { My } from "../actionTypes"

export const setName = (name:string) => ({
  type: My.SET_NAME,
  name: name,
})