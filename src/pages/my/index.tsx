import * as React from "react";
import { connect } from 'react-redux'
import {setName} from '../../store/actions/my'

const mapStateToProps = (state: IMy) => {
  return {
    name: state.name,
  }
}

const mapDispatchToProps = (dispatch) => (
  {
  setName: (name:string) => dispatch(setName(name))
})

// type DispatchProps = typeof mapDispatchToProps

type Props = {
  name: string
  newName: string
} 

class My extends React.Component<{}, {}> {

  componentDidMount(){
    console.log('componentDidMount')
    // console.log(this.props.name)
  }

  render() {
    return (
      <>
        <h1>个人主页!</h1>
        <p>ip更换后测试</p>
        <p>ip更换后测试--第二次</p>
        <p>ip更换后测试--第san次aliyun2222--hook--ali</p>
        <p>ip更换后测试--jenkins ipd</p>
      </>
    );
  }
}

// export default My;
export default connect()(My)
// export default connect(mapStateToProps,mapDispatchToProps)(My);