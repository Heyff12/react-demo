import * as React from "react";
import { connect } from 'react-redux'

import { Hello } from "../../components/Hello";
import {setName} from '../../store/actions/my'

const mapStateToProps = (state: IMy) => {
  return {
    name: state.my.name,
  }
}

const mapDispatchToProps = (dispatch) => (
  {
  setName: (payload:IMy) => dispatch(setName(payload))
})

type Props = {
  name: string
  setName: () => void
} 

class Home extends React.Component<Props, {}> {

  render() {
    // console.log(this.props.match)
    // console.log(this.props.location)
    // console.log(this.props.history)
    return (
      <>
        <Hello compiler="TypeScript" framework="React" />
        <h1>Hello,world!第一次commit提交forCI---second--push--trigger---third-push-trigger-bwg</h1>
        <h2>name:{this.props.name}</h2>
        <button onClick={()=>this.props.setName({name:'newNameHAha'})}>设置name</button>
      </>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
