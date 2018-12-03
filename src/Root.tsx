import * as React from "react"
import { Route, Switch,HashRouter as Router } from "react-router-dom"
import App from "./pages/App"


export default class Root extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <Route path="/" component={App} />
      </Router>
    )
  }
}
