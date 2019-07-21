import * as React from "react";

import { Hello } from "../../components/Hello";



class Home extends React.Component<{}, {}> {

  render() {
    return (
      <>
        <Hello compiler="TypeScript" framework="React" />
        <h1>Hello,world!第一次commit提交forCI---second--push--trigger---third-push-trigger-bwg</h1>
        <button>设置name</button>
        {/* <button onClick={this.props.setName(this.props.newName)}>设置name</button> */}
      </>
    );
  }
}

export default Home;

