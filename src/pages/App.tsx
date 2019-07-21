import * as React from "react";
import TopBar from "./layout/topbar";
import Home from "./home";
import My from "./my";
import { Route, Switch } from "react-router-dom"


class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <TopBar />
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/my" component={My} />
        </Switch>
      </>
    );
  }
}

export default App;
